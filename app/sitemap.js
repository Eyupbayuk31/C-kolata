import { haberler } from "@/data/haberler";
import { urunler } from "@/data/urunler";
import { siteUrl } from "@/data/firma";
import { diller } from "@/lib/dil";
import { adres } from "@/lib/seo";

export const dynamic = "force-static";

const sabit = ["/", "/urunler", "/hakkimizda", "/haberler", "/bayilik", "/iletisim", "/kvkk", "/gizlilik-politikasi", "/cerez-politikasi"];

// her adres üç dilde, hepsi birbirinin alternatifi
function kayit(yol, oncelik, sonDegisiklik) {
  const dilBazli = Object.fromEntries(diller.map((d) => [d, `${siteUrl}${adres(d, yol)}`]));
  return diller.map((d) => ({
    url: dilBazli[d],
    priority: oncelik,
    ...(sonDegisiklik && { lastModified: sonDegisiklik }),
    alternates: { languages: dilBazli },
  }));
}

export default function sitemap() {
  return [
    ...sabit.flatMap((yol) => kayit(yol, yol === "/" ? 1 : 0.7)),
    ...urunler.flatMap((u) => kayit(`/urun/${u.slug}`, 0.8)),
    ...haberler.flatMap((h) => kayit(`/haberler/${h.slug}`, 0.5, h.tarih)),
  ];
}
