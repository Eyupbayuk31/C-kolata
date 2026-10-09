import HaberDetay from "@/views/HaberDetay";
import { haberler } from "@/data/haberler";
import { haberMetasi } from "@/lib/sayfalar";

export const dynamicParams = false;

export function generateStaticParams() {
  return haberler.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return haberMetasi(slug, "tr");
}

export default async function Sayfa({ params }) {
  const { slug } = await params;
  return <HaberDetay lang="tr" slug={slug} />;
}
