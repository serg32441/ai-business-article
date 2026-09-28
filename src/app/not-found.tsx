import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "Такой страницы в справочнике китайских ИИ-компаний нет.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="site-shell about">
        <h1>Страница не найдена</h1>
        <p>
          Такой карточки нет. Вернитесь к <Link href="/">списку компаний</Link>.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
