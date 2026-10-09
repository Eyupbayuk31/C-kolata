import Iletisim from "@/views/Iletisim";
import { sayfaMetasi } from "@/lib/sayfalar";

export const metadata = sayfaMetasi("iletisim", "tr");

export default function Sayfa() {
  return <Iletisim lang="tr" />;
}
