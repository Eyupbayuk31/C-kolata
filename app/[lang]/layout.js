import Kabuk from "@/components/Kabuk";
import { anaMeta } from "@/lib/seo";
import { diller, varsayilanDil } from "@/lib/dil";

// /en ve /ar. Türkçe kökte durduğu için burada yok.
export const dynamicParams = false;

export function generateStaticParams() {
  return diller.filter((d) => d !== varsayilanDil).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return anaMeta(lang);
}

export default async function DilLayout({ children, params }) {
  const { lang } = await params;
  return <Kabuk lang={lang}>{children}</Kabuk>;
}
