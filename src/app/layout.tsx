import type { Metadata } from "next";
import { Noto_Sans_SC, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans-body",
});

const serif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif-display",
});

const zh = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zh-text",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: HOME_TITLE,
    template: "%s — Китайский ИИ",
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE_NAME,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: HOME_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${sans.variable} ${serif.variable} ${zh.variable}`}>
        {children}
      </body>
    </html>
  );
}
