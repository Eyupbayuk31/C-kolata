import YasalSayfa from "@/components/YasalSayfa";
import { sayfaMetasi } from "@/lib/sayfalar";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return sayfaMetasi("cerez", lang);
}

export default async function Sayfa({ params }) {
  const { lang } = await params;
  return <YasalSayfa lang={lang} anahtar="cerez" />;
}
