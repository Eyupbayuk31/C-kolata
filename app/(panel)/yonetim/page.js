import Panel from "@/components/yonetim/Panel";
import { siteUrl } from "@/data/firma";

export default function YonetimSayfasi() {
  return <Panel varsayilanDepo={process.env.NEXT_PUBLIC_REPO || "Eyupbayuk31/C-kolata"} siteAdresi={siteUrl} />;
}
