import Anasayfa from "@/views/Anasayfa";
import { sayfaMetasi } from "@/lib/sayfalar";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return sayfaMetasi("ana", lang);
}

export default async function Sayfa({ params }) {
  const { lang } = await params;
  return <Anasayfa lang={lang} />;
}
