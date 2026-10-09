import { urunler } from "@/data/urunler";
import { haberler } from "@/data/haberler";
import { siteUrl } from "@/data/firma";

export const dynamic = "force-static";

export default function sitemap() {
  const sabit = ["", "/urunler", "/hakkimizda", "/haberler", "/bayilik", "/iletisim", "/kvkk", "/gizlilik-politikasi", "/cerez-politikasi"];

  return [
    ...sabit.map((yol) => ({
      url: `${siteUrl}${yol}`,
      priority: yol === "" ? 1 : 0.7,
    })),
    ...urunler.map((u) => ({
      url: `${siteUrl}/urun/${u.slug}`,
      priority: 0.8,
    })),
    ...haberler.map((h) => ({
      url: `${siteUrl}/haberler/${h.slug}`,
      lastModified: h.tarih,
      priority: 0.5,
    })),
  ];
}
