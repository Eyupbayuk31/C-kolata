import YasalSayfa from "@/components/YasalSayfa";
import { sayfaMetasi } from "@/lib/sayfalar";

export const metadata = sayfaMetasi("gizlilik", "tr");

export default function Sayfa() {
  return <YasalSayfa lang="tr" anahtar="gizlilik" />;
}
