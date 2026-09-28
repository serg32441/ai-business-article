/** Used when NEXT_PUBLIC_SITE_URL is not set at build time. Not a real deployment. */
export const SITE_URL_PLACEHOLDER = "https://example.com";

export const SITE_NAME = "Китайский ИИ";

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const value = configured ? configured : SITE_URL_PLACEHOLDER;
  return value.replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${getSiteUrl()}/`;
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const isFile = /\.[a-z0-9]+$/i.test(withLeading);
  if (isFile) return `${getSiteUrl()}${withLeading}`;
  const withTrailing = withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
  return `${getSiteUrl()}${withTrailing}`;
}
