import Hakkimizda from "@/views/Hakkimizda";
import { sayfaMetasi } from "@/lib/sayfalar";

export const metadata = sayfaMetasi("hakkimizda", "tr");

export default function Sayfa() {
  return <Hakkimizda lang="tr" />;
}
