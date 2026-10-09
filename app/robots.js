import { firma } from "@/data/firma";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${firma.site}/sitemap.xml`,
  };
}
