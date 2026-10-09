import HaberDetay from "@/views/HaberDetay";
import { haberYollari, haberMetasi } from "@/lib/sayfalar";
import { diller, varsayilanDil } from "@/lib/dil";

export const dynamicParams = false;

export function generateStaticParams() {
  return haberYollari(diller.filter((d) => d !== varsayilanDil));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  return haberMetasi(slug, lang);
}

export default async function Sayfa({ params }) {
  const { lang, slug } = await params;
  return <HaberDetay lang={lang} slug={slug} />;
}
