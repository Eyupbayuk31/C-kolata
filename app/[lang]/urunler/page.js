import Urunler from "@/views/Urunler";
import { sayfaMetasi } from "@/lib/sayfalar";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return sayfaMetasi("urunler", lang);
}

export default async function Sayfa({ params }) {
  const { lang } = await params;
  return <Urunler lang={lang} />;
}
