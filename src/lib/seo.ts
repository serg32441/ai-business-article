import type { Metadata } from "next";
import type { Company } from "./types";
import { absoluteUrl, SITE_NAME } from "./site";

export const HOME_TITLE = "Справочник китайских ИИ-компаний";
export const HOME_DESCRIPTION =
  "Каталог лабораторий и компаний искусственного интеллекта из материкового Китая: модели, продукты и ссылки на источники.";

export const INDEX_TITLE = "Указатель китайских ИИ-компаний";
export const INDEX_DESCRIPTION =
  "Алфавитный список компаний китайского ИИ со штаб-квартирой и категориями. Каждая строка ведёт на карточку с моделями и источниками.";

export const ABOUT_TITLE = "О справочнике китайских ИИ-компаний";
export const ABOUT_DESCRIPTION =
  "Какие китайские ИИ-компании входят в справочник, откуда взяты факты и какие лаборатории в эту редакцию не попали.";

const shareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Справочник китайских ИИ-компаний",
};

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "ru_RU",
      siteName: SITE_NAME,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
    other: {
      "twitter:url": url,
    },
  };
}

export function companyPageTitle(company: Company): string {
  return `${company.nameEn} · ${company.nameZh} — справочник китайского ИИ`;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: HOME_DESCRIPTION,
    url: absoluteUrl("/"),
    inLanguage: "ru",
  };
}

export function companyIndexJsonLd(companies: Company[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: INDEX_TITLE,
    description: INDEX_DESCRIPTION,
    url: absoluteUrl("/companies"),
    inLanguage: "ru",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: companies.length,
      itemListElement: companies.map((company, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${company.nameEn} (${company.nameZh})`,
        url: absoluteUrl(`/companies/${company.slug}`),
      })),
    },
  };
}

export function companyJsonLd(company: Company) {
  const pageUrl = absoluteUrl(`/companies/${company.slug}`);
  const organization: Record<string, unknown> = {
    "@type": "Organization",
    name: company.nameEn,
    alternateName: company.nameZh,
    description: company.description,
    url: company.website.url,
    location: {
      "@type": "Place",
      name: company.headquarters.text,
    },
  };

  if (company.founded) {
    organization.foundingDate = String(company.founded.year);
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Компании",
            item: absoluteUrl("/companies"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${company.nameEn} · ${company.nameZh}`,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
