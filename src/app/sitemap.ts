import type { MetadataRoute } from "next";
import { companies } from "@/lib/companies";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/companies") },
    { url: absoluteUrl("/about") },
    ...companies.map((company) => ({
      url: absoluteUrl(`/companies/${company.slug}`),
    })),
  ];
}
