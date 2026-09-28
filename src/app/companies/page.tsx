import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categoryShort } from "@/lib/categories";
import { companiesByName } from "@/lib/companies";

export const metadata: Metadata = {
  title: "Все компании",
  description: "Алфавитный указатель китайских ИИ-компаний.",
};

export default function CompaniesPage() {
  const companies = companiesByName();
  const groups = new Map<string, typeof companies>();

  for (const company of companies) {
    const letter = company.nameEn[0]?.toUpperCase() ?? "#";
    const bucket = groups.get(letter) ?? [];
    bucket.push(company);
    groups.set(letter, bucket);
  }

  const letters = [...groups.keys()];

  return (
    <>
      <SiteHeader current="/companies" />
      <main className="site-shell directory">
        <header className="page-intro">
          <p className="brand-kicker">Указатель</p>
          <h1>Компании</h1>
          <p className="lede">
            Алфавитный список по латинскому имени. Карточка открывает описание, модели и источники.
          </p>
        </header>
        <nav className="letter-nav" aria-label="Буквы">
          {letters.map((letter) => (
            <a key={letter} href={`#letter-${letter}`}>
              {letter}
            </a>
          ))}
        </nav>
        {[...groups.entries()].map(([letter, entries]) => (
          <section key={letter} id={`letter-${letter}`} className="letter-block">
            <h2>{letter}</h2>
            {entries.map((company) => (
              <Link key={company.slug} href={`/companies/${company.slug}`} className="row">
                <span className="row-zh zh">{company.nameZh}</span>
                <span className="row-en">{company.nameEn}</span>
                <span className="row-meta">
                  {company.headquarters.text}
                  {" · "}
                  {company.categories.map((category) => categoryShort(category)).join(", ")}
                </span>
              </Link>
            ))}
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
