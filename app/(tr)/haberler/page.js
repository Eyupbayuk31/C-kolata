import Haberler from "@/views/Haberler";
import { sayfaMetasi } from "@/lib/sayfalar";

export const metadata = sayfaMetasi("haberler", "tr");

export default function Sayfa() {
  return <Haberler lang="tr" />;
}
