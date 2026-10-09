import Iletisim from "@/views/Iletisim";
import { sayfaMetasi } from "@/lib/sayfalar";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return sayfaMetasi("iletisim", lang);
}

export default async function Sayfa({ params }) {
  const { lang } = await params;
  return <Iletisim lang={lang} />;
}
