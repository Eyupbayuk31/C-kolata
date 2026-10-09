import Anasayfa from "@/views/Anasayfa";
import { sayfaMetasi } from "@/lib/sayfalar";

export const metadata = sayfaMetasi("ana", "tr");

export default function Sayfa() {
  return <Anasayfa lang="tr" />;
}
