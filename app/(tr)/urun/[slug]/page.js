import UrunDetay from "@/views/UrunDetay";
import { urunler } from "@/data/urunler";
import { urunMetasi } from "@/lib/sayfalar";

export const dynamicParams = false;

export function generateStaticParams() {
  return urunler.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return urunMetasi(slug, "tr");
}

export default async function Sayfa({ params }) {
  const { slug } = await params;
  return <UrunDetay lang="tr" slug={slug} />;
}
