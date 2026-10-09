"use client";

import { useEffect, useState } from "react";
import { gorselHazirla } from "@/lib/gorselIsle";
import { slugYap } from "@/lib/slug";
import { yol } from "@/lib/yol";
import { Alan, DilSekmeleri, DilliGirdi, Onayli } from "./ortak";

const KATEGORILER = [
  ["basin", "Basında Biz"],
  ["ihracat", "İhracat"],
  ["fabrika", "Fabrika ve Üretim"],
  ["urun", "Ürün Haberleri"],
];

const bugun = () => new Date().toISOString().slice(0, 10);

const yeniHaber = () => ({
  slug: "",
  tarih: bugun(),
  kategori: "urun",
  gorsel: "",
  video: "",
  baslik: { tr: "", en: "", ar: "" },
  ozet: { tr: "", en: "", ar: "" },
  govde: { tr: "", en: "", ar: "" },
});

export default function HaberPaneli({ gh, kaydet, mesgul, bildir }) {
  const [liste, setListe] = useState(null);
  const [duzenle, setDuzenle] = useState(null);

  async function yukle() {
    try {
      const veri = await gh.jsonOku("data/haberler.json");
      setListe([...veri].sort((a, b) => b.tarih.localeCompare(a.tarih)));
    } catch (hata) {
      bildir({ tur: "hata", metin: hata.message });
    }
  }
  useEffect(() => {
    yukle();
  }, []);

  async function sil(haber) {
    const ok = await kaydet(
      {
        mesaj: `Panel: haber silindi (${haber.baslik.tr})`,
        json: { "data/haberler.json": (eski) => eski.filter((h) => h.slug !== haber.slug) },
        // yalnızca panelden yüklenen görseli sil; eski siteden gelenler başka sayfalarda kullanılıyor olabilir
        dosyalar: haber.gorsel === `/img/haber/${haber.slug}.webp` && haber.panelden ? [{ yol: `public/img/haber/${haber.slug}.webp`, sil: true }] : [],
      },
      "Haber silindi. Site 1-2 dakika içinde güncellenecek."
    );
    if (ok) yukle();
  }

  if (duzenle) {
    return (
      <HaberFormu
        baslangic={duzenle.haber}
        yeni={duzenle.yeni}
        liste={liste}
        mesgul={mesgul}
        kaydet={kaydet}
        bildir={bildir}
        kapat={(yenile) => {
          setDuzenle(null);
          if (yenile) yukle();
        }}
      />
    );
  }

  return (
    <section>
      <div className="baslik-satir">
        <h2>Haberler {liste && <small>({liste.length})</small>}</h2>
        <button type="button" className="birincil" onClick={() => setDuzenle({ yeni: true, haber: yeniHaber() })}>
          + Yeni haber
        </button>
      </div>

      {!liste ? (
        <p className="bos">Yükleniyor…</p>
      ) : (
        <ul className="satirlar">
          {liste.map((h) => (
            <li key={h.slug}>
              {h.gorsel ? (
                <img src={yol(h.gorsel)} alt="" width="84" height="56" loading="lazy" className="yatay" />
              ) : (
                <div className="gorsel-bos kucuk">Görsel yok</div>
              )}
              <div className="satir-yazi">
                <strong>{h.baslik.tr}</strong>
                <span>
                  {h.tarih} · {KATEGORILER.find((k) => k[0] === h.kategori)?.[1] || h.kategori}
                </span>
              </div>
              <div className="satir-islem">
                <button type="button" onClick={() => setDuzenle({ yeni: false, haber: structuredClone(h) })}>
                  Düzenle
                </button>
                <Onayli metin={`"${h.baslik.tr}" silinsin mi?`} onay={() => sil(h)} className="tehlike-hafif">
                  Sil
                </Onayli>
              </div>
            </li>
          ))}
          {liste.length === 0 && <li className="bos">Henüz haber yok.</li>}
        </ul>
      )}
    </section>
  );
}

function HaberFormu({ baslangic, yeni, liste, mesgul, kaydet, bildir, kapat }) {
  const [h, setH] = useState(baslangic);
  const [dil, setDil] = useState("tr");
  const [gorsel, setGorsel] = useState(null);
  const [isleniyor, setIsleniyor] = useState(false);

  const guncelle = (alan) => (deger) => setH((o) => ({ ...o, [alan]: deger }));

  async function gorselSec(e) {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    setIsleniyor(true);
    try {
      setGorsel(await gorselHazirla(dosya, { genislik: 1400 }));
    } catch (hata) {
      bildir({ tur: "hata", metin: hata.message });
    } finally {
      setIsleniyor(false);
    }
  }

  async function gonder(e) {
    e.preventDefault();
    if (!h.baslik.tr.trim()) return bildir({ tur: "hata", metin: "Türkçe başlık gerekli." });
    if (!h.govde.tr.trim()) return bildir({ tur: "hata", metin: "Türkçe haber metni gerekli." });

    let slug = h.slug;
    if (yeni) {
      const temel = slugYap(h.baslik.tr) || "haber";
      slug = temel;
      for (let n = 2; liste?.some((x) => x.slug === slug); n++) slug = `${temel}-${n}`;
    }
    const gorselYolu = gorsel ? `/img/haber/${slug}.webp` : h.gorsel;
    const kayit = { ...h, slug, gorsel: gorselYolu, ...(gorsel && { panelden: true }) };

    const ok = await kaydet({
      mesaj: `Panel: haber ${yeni ? "eklendi" : "güncellendi"} (${h.baslik.tr})`,
      json: {
        "data/haberler.json": (eski) => {
          const i = eski.findIndex((x) => x.slug === slug);
          if (i >= 0) {
            eski[i] = { ...eski[i], ...kayit };
            return eski;
          }
          return [...eski, kayit];
        },
      },
      dosyalar: gorsel ? [{ yol: `public/img/haber/${slug}.webp`, base64: gorsel.base64 }] : [],
    });
    if (ok) kapat(true);
  }

  const onizleme = gorsel?.onizleme || (h.gorsel ? yol(h.gorsel) : null);

  return (
    <form className="form-sayfa" onSubmit={gonder}>
      <div className="baslik-satir">
        <h2>{yeni ? "Yeni haber" : h.baslik.tr || "Haberi düzenle"}</h2>
        <button type="button" onClick={() => kapat(false)}>
          ← Listeye dön
        </button>
      </div>

      <div className="form-izgara">
        <div className="gorsel-kutu">
          {onizleme ? (
            <img src={onizleme} alt="Haber görseli" className="yatay" />
          ) : (
            <div className="gorsel-bos">Görsel yok</div>
          )}
          <label className="dosya-sec">
            {isleniyor ? "Hazırlanıyor…" : onizleme ? "Görseli değiştir" : "Görsel seç"}
            <input type="file" accept="image/*" onChange={gorselSec} hidden />
          </label>
          <small>İsteğe bağlı. Yatay bir fotoğraf en iyi sonucu verir.</small>
          {h.video && <small>Bu habere bir video da bağlı, korunur.</small>}
        </div>

        <div className="form-alanlar">
          <div className="iki">
            <Alan etiket="Tarih">
              <input type="date" value={h.tarih} onChange={(e) => guncelle("tarih")(e.target.value)} required />
            </Alan>
            <Alan etiket="Kategori">
              <select value={h.kategori} onChange={(e) => guncelle("kategori")(e.target.value)}>
                {KATEGORILER.map(([k, ad]) => (
                  <option key={k} value={k}>
                    {ad}
                  </option>
                ))}
              </select>
            </Alan>
          </div>

          <DilSekmeleri dil={dil} setDil={setDil} kontrol={[h.baslik, h.ozet, h.govde]} />
          <DilliGirdi etiket="Başlık" deger={h.baslik} degistir={guncelle("baslik")} dil={dil} gerekli />
          <DilliGirdi etiket="Kısa özet" ipucu="Haber listesinde başlığın altında görünür." deger={h.ozet} degistir={guncelle("ozet")} dil={dil} satir={2} />
          <DilliGirdi
            etiket="Haber metni"
            ipucu="Paragrafları boş satırla ayırın. “## ” ile başlayan satır ara başlık, “- ” ile başlayan satırlar madde işareti olur."
            deger={h.govde}
            degistir={guncelle("govde")}
            dil={dil}
            satir={12}
            gerekli
          />
        </div>
      </div>

      <div className="form-alt">
        <button type="submit" className="birincil" disabled={mesgul || isleniyor}>
          {mesgul ? "Kaydediliyor…" : "Kaydet"}
        </button>
        <button type="button" onClick={() => kapat(false)}>
          Vazgeç
        </button>
      </div>
    </form>
  );
}
