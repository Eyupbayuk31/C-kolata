import Urunler from "@/views/Urunler";
import { sayfaMetasi } from "@/lib/sayfalar";

export const metadata = sayfaMetasi("urunler", "tr");

export default function Sayfa() {
  return <Urunler lang="tr" />;
}
