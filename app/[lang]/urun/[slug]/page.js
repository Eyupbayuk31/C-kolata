import UrunDetay from "@/views/UrunDetay";
import { urunYollari, urunMetasi } from "@/lib/sayfalar";
import { diller, varsayilanDil } from "@/lib/dil";

export const dynamicParams = false;

export function generateStaticParams() {
  return urunYollari(diller.filter((d) => d !== varsayilanDil));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  return urunMetasi(slug, lang);
}

export default async function Sayfa({ params }) {
  const { lang, slug } = await params;
  return <UrunDetay lang={lang} slug={slug} />;
}
