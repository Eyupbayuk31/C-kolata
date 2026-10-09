import Hakkimizda from "@/views/Hakkimizda";
import { sayfaMetasi } from "@/lib/sayfalar";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return sayfaMetasi("hakkimizda", lang);
}

export default async function Sayfa({ params }) {
  const { lang } = await params;
  return <Hakkimizda lang={lang} />;
}
