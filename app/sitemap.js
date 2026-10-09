import { urunler } from "@/data/urunler";
import { haberler } from "@/data/haberler";
import { firma } from "@/data/firma";

export default function sitemap() {
  const sabit = ["", "/urunler", "/hakkimizda", "/haberler", "/bayilik", "/iletisim", "/kvkk", "/gizlilik-politikasi", "/cerez-politikasi"];

  return [
    ...sabit.map((yol) => ({
      url: `${firma.site}${yol}`,
      priority: yol === "" ? 1 : 0.7,
    })),
    ...urunler.map((u) => ({
      url: `${firma.site}/urun/${u.slug}`,
      priority: 0.8,
    })),
    ...haberler.map((h) => ({
      url: `${firma.site}/haberler/${h.slug}`,
      lastModified: h.tarih,
      priority: 0.5,
    })),
  ];
}
