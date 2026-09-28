import type { Metadata } from "next";
import { Noto_Sans_SC, Source_Sans_3, Source_Serif_4 } from "next/font/google";
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
  title: {
    default: "Китайский ИИ — справочник компаний",
    template: "%s — Китайский ИИ",
  },
  description:
    "Справочник компаний и лабораторий искусственного интеллекта из материкового Китая: модели, продукты и источники.",
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
