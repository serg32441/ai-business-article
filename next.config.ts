import type { NextConfig } from "next";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const globalForSeo = globalThis as typeof globalThis & { __seoSiteUrlWarned?: boolean };
if (!configuredSiteUrl && !globalForSeo.__seoSiteUrlWarned) {
  globalForSeo.__seoSiteUrlWarned = true;
  console.warn(
    "[seo] NEXT_PUBLIC_SITE_URL is unset. Canonical URLs and the sitemap use the placeholder https://example.com.",
  );
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
