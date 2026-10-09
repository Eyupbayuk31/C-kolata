import Haberler from "@/views/Haberler";
import { sayfaMetasi } from "@/lib/sayfalar";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return sayfaMetasi("haberler", lang);
}

export default async function Sayfa({ params }) {
  const { lang } = await params;
  return <Haberler lang={lang} />;
}
