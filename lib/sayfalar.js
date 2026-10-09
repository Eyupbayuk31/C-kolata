import { urunler } from "@/data/urunler";
import { haberler } from "@/data/haberler";
import { yerel } from "@/lib/dil";
import { urunGorseli } from "@/lib/gorsel";
import { sayfaMeta } from "@/lib/seo";
import { doldur, ortak, ui } from "@/lib/ui";

const yollar = {
  ana: "/",
  urunler: "/urunler",
  hakkimizda: "/hakkimizda",
  haberler: "/haberler",
  iletisim: "/iletisim",
  bayilik: "/bayilik",
  kvkk: "/kvkk",
  gizlilik: "/gizlilik-politikasi",
  cerez: "/cerez-politikasi",
};

const yasalSayfalar = ["kvkk", "gizlilik", "cerez"];

// Düz sayfalar için başlık/açıklama sözlükten gelir
export function sayfaMetasi(anahtar, dil) {
  const t = ui(dil);
  const v = ortak(dil);

  if (yasalSayfalar.includes(anahtar)) {
    const y = t.yasal[anahtar];
    const ilk = y.blok.find(([tur]) => tur === "p")?.[1] || y.baslik;
    return sayfaMeta(dil, yollar[anahtar], { baslik: y.baslik, aciklama: doldur(ilk, v).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") });
  }

  const m = t.meta[anahtar];
  return sayfaMeta(dil, yollar[anahtar], {
    baslik: doldur(m.baslik, v),
    aciklama: doldur(m.aciklama, v),
    mutlak: anahtar === "ana",
  });
}

export function urunMetasi(slug, dil) {
  const urun = urunler.find((u) => u.slug === slug);
  if (!urun) return {};
  const t = ui(dil);
  const ad = yerel(urun.ad, dil);
  const kisa = yerel(urun.aciklama, dil).slice(0, 150).trim();
  return sayfaMeta(dil, `/urun/${slug}`, {
    baslik: doldur(t.meta.urunBaslik, { ad, gramaj: urun.gramaj }),
    aciklama: `${kisa}… ${t.meta.urunAciklamaSonu}`,
    gorsel: urunGorseli(urun),
  });
}

export function haberMetasi(slug, dil) {
  const haber = haberler.find((h) => h.slug === slug);
  if (!haber) return {};
  return sayfaMeta(dil, `/haberler/${slug}`, {
    baslik: yerel(haber.baslik, dil),
    aciklama: yerel(haber.ozet, dil),
    gorsel: haber.gorsel || undefined,
    tur: "article",
    tarih: haber.tarih,
  });
}

export const urunYollari = (diller) =>
  diller.flatMap((lang) => urunler.map((u) => ({ lang, slug: u.slug })));
export const haberYollari = (diller) =>
  diller.flatMap((lang) => haberler.map((h) => ({ lang, slug: h.slug })));
