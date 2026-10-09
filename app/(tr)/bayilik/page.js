import Bayilik from "@/views/Bayilik";
import { sayfaMetasi } from "@/lib/sayfalar";

export const metadata = sayfaMetasi("bayilik", "tr");

export default function Sayfa() {
  return <Bayilik lang="tr" />;
}
