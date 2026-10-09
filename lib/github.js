import urunlerIlk from "@/data/urunler.json";
import haberlerIlk from "@/data/haberler.json";
import ayarlarIlk from "@/data/ayarlar.json";

// Yönetim panelinin GitHub ile konuşan katmanı. Sadece tarayıcıda çalışır.
// Veriler repodaki JSON dosyaları; kaydedince tek bir commit atılır, workflow siteyi yeniden yayınlar.
const API = process.env.NEXT_PUBLIC_GITHUB_API || "https://api.github.com";

export class GitHubHatasi extends Error {
  constructor(mesaj, durum = 0) {
    super(mesaj);
    this.durum = durum;
  }
}

function hataMesaji(durum, govde) {
  if (durum === 401) return "Erişim anahtarı geçersiz ya da süresi dolmuş. Yeni bir anahtar oluşturun.";
  if (durum === 403)
    return "Bu anahtarın bu işlem için izni yok ('Contents: Read and write' izni gerekli) ya da GitHub'ın istek sınırına takıldınız, biraz bekleyin.";
  if (durum === 404) return "Depo ya da dosya bulunamadı. Depo adını ve anahtarın bu depoya erişimi olup olmadığını kontrol edin.";
  if (durum === 409 || durum === 422)
    return "GitHub kaydı kabul etmedi, aynı anda başka bir değişiklik yapılmış olabilir. Sayfayı yenileyip tekrar deneyin.";
  return `GitHub hatası (${durum}). ${govde?.message || ""}`.trim();
}

// base64 <-> utf-8
export function utf8Coz(base64) {
  const ikili = atob(base64.replace(/\s/g, ""));
  return new TextDecoder().decode(Uint8Array.from(ikili, (c) => c.charCodeAt(0)));
}

export class GitHub {
  constructor(repo, token) {
    this.repo = repo;
    this.token = token;
    this.dal = "main";
  }

  async istek(yol, { method = "GET", govde } = {}) {
    let yanit;
    try {
      yanit = await fetch(`${API}/repos/${this.repo}${yol}`, {
        method,
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(govde && { "Content-Type": "application/json" }),
        },
        body: govde ? JSON.stringify(govde) : undefined,
      });
    } catch {
      throw new GitHubHatasi("GitHub'a ulaşılamadı. İnternet bağlantınızı kontrol edin.");
    }
    if (!yanit.ok) {
      let icerik = null;
      try {
        icerik = await yanit.json();
      } catch {}
      throw new GitHubHatasi(hataMesaji(yanit.status, icerik), yanit.status);
    }
    return yanit.status === 204 ? null : yanit.json();
  }

  // Anahtarı ve depoyu doğrular, varsayılan dalı öğrenir
  async baglan() {
    const depo = await this.istek("");
    this.dal = depo.default_branch;
    if (depo.permissions && !depo.permissions.push) {
      throw new GitHubHatasi("Bu anahtarla depoya yazma izni yok. Anahtarı 'Contents: Read and write' iziniyle oluşturun.", 403);
    }
    return depo;
  }

  async jsonOku(yol) {
    const dosya = await this.istek(`/contents/${yol}?ref=${encodeURIComponent(this.dal)}`);
    return JSON.parse(utf8Coz(dosya.content));
  }

  // json: { "data/urunler.json": (eski) => yeni }  — her kayıtta güncel dosya okunur, böylece
  //   iki kişi farklı ürünleri düzenlerken birbirinin değişikliğini ezmez.
  // dosyalar: [{ yol, base64 }, { yol, sil: true }]  — görsel, PDF gibi ek dosyalar
  async guncelle({ json = {}, dosyalar = [], mesaj }) {
    for (let deneme = 0; ; deneme++) {
      try {
        const eklenecek = [...dosyalar];
        for (const [yol, donustur] of Object.entries(json)) {
          const eski = await this.jsonOku(yol);
          eklenecek.push({ yol, metin: `${JSON.stringify(await donustur(eski), null, 2)}\n` });
        }
        return await this.#commitAt(eklenecek, mesaj);
      } catch (hata) {
        // dal bizden önce ilerlemişse (422/409) bir kez daha dene
        if ((hata.durum === 422 || hata.durum === 409) && deneme === 0) continue;
        throw hata;
      }
    }
  }

  async #commitAt(dosyalar, mesaj) {
    const ref = await this.istek(`/git/ref/heads/${encodeURIComponent(this.dal)}`);
    const ustSha = ref.object.sha;
    const ust = await this.istek(`/git/commits/${ustSha}`);

    const ogeler = [];
    for (const d of dosyalar) {
      if (d.sil) {
        ogeler.push({ path: d.yol, mode: "100644", type: "blob", sha: null });
        continue;
      }
      const blob = await this.istek("/git/blobs", {
        method: "POST",
        govde: d.base64 ? { content: d.base64, encoding: "base64" } : { content: d.metin, encoding: "utf-8" },
      });
      ogeler.push({ path: d.yol, mode: "100644", type: "blob", sha: blob.sha });
    }

    const agac = await this.istek("/git/trees", { method: "POST", govde: { base_tree: ust.tree.sha, tree: ogeler } });
    const yeni = await this.istek("/git/commits", {
      method: "POST",
      govde: { message: mesaj, tree: agac.sha, parents: [ustSha] },
    });
    await this.istek(`/git/refs/heads/${encodeURIComponent(this.dal)}`, { method: "PATCH", govde: { sha: yeni.sha } });
    return yeni.sha;
  }

  // Son yayın (Actions çalışması). Anahtarda "Actions: Read" izni yoksa null döner.
  async sonYayin() {
    try {
      const r = await this.istek(`/actions/runs?per_page=1&branch=${encodeURIComponent(this.dal)}`);
      const c = r.workflow_runs?.[0];
      if (!c) return null;
      return { sha: c.head_sha, durum: c.status, sonuc: c.conclusion, url: c.html_url };
    } catch {
      return null;
    }
  }
}

// Deneme modu: GitHub'a hiç bağlanmaz, anahtar istemez. Değişiklikler sadece bu sayfanın
// belleğinde durur; sayfa yenilenince ya da çıkış yapınca silinir, siteye ve depoya ulaşmaz.
export class DenemeGitHub {
  deneme = true;
  repo = "deneme-modu";
  dal = "main";

  #veri = {
    "data/urunler.json": structuredClone(urunlerIlk),
    "data/haberler.json": structuredClone(haberlerIlk),
    "data/ayarlar.json": structuredClone(ayarlarIlk),
  };

  async baglan() {}

  async jsonOku(yol) {
    return structuredClone(this.#veri[yol]);
  }

  async guncelle({ json = {} }) {
    for (const [yol, donustur] of Object.entries(json)) {
      this.#veri[yol] = await donustur(structuredClone(this.#veri[yol]));
    }
    await new Promise((r) => setTimeout(r, 350));
    return "deneme";
  }

  async sonYayin() {
    return null;
  }
}
