import { diller, dilYol, dilBilgi, varsayilanDil } from "@/lib/dil";
import { siteUrl } from "@/data/firma";
import { ui, doldur, ortak } from "@/lib/ui";

// GitHub Pages'te sayfalar /yol/ biçiminde (sonda eğik çizgi) açılıyor, canonical da öyle olsun
const sonEgik = process.env.NEXT_PUBLIC_SLASH === "1";

export function adres(dil, yol = "/") {
  let p = dilYol(dil, yol);
  if (sonEgik && p !== "/" && !p.endsWith("/")) p += "/";
  return p;
}

function dilAlternatifleri(yol) {
  const dosya = Object.fromEntries(diller.map((d) => [d, adres(d, yol)]));
  dosya["x-default"] = adres(varsayilanDil, yol);
  return dosya;
}

// Her sayfa için başlık, açıklama, canonical ve hreflang.
// Next, bir sayfanın openGraph'ını üst layout'unkiyle birleştirmediği için görseli burada da veriyoruz.
export function sayfaMeta(dil, yol, { baslik, aciklama, gorsel, tur = "website", tarih, mutlak = false } = {}) {
  const resim = gorsel ? [{ url: gorsel }] : [{ url: "/opengraph-image.png", width: 1200, height: 630 }];
  return {
    title: mutlak ? { absolute: baslik } : baslik,
    description: aciklama,
    alternates: { canonical: adres(dil, yol), languages: dilAlternatifleri(yol) },
    openGraph: {
      type: tur,
      title: baslik,
      description: aciklama,
      url: adres(dil, yol),
      locale: dilBilgi[dil].og,
      siteName: "MB Çikolata",
      ...(tarih && { publishedTime: tarih }),
      images: resim,
    },
    twitter: { card: "summary_large_image", title: baslik, description: aciklama, images: resim.map((r) => r.url) },
  };
}

// Tüm sayfalarda geçerli taban meta
export function anaMeta(dil) {
  const t = ui(dil);
  const degerler = ortak(dil);
  const baslik = doldur(t.meta.ana.baslik, degerler);
  const aciklama = doldur(t.meta.ana.aciklama, degerler);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: baslik, template: "%s | MB Çikolata" },
    description: aciklama,
    alternates: { canonical: adres(dil, "/"), languages: dilAlternatifleri("/") },
    openGraph: {
      type: "website",
      locale: dilBilgi[dil].og,
      siteName: "MB Çikolata",
      title: baslik,
      description: aciklama,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: ["/opengraph-image.png"] },
    icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
  };
}
