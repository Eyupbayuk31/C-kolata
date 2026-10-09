import Kabuk from "@/components/Kabuk";
import { anaMeta } from "@/lib/seo";

export const metadata = anaMeta("tr");

export default function TurkceLayout({ children }) {
  return <Kabuk lang="tr">{children}</Kabuk>;
}
