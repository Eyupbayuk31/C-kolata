import Bayilik from "@/views/Bayilik";
import { sayfaMetasi } from "@/lib/sayfalar";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return sayfaMetasi("bayilik", lang);
}

export default async function Sayfa({ params }) {
  const { lang } = await params;
  return <Bayilik lang={lang} />;
}
