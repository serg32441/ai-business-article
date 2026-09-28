import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categoryLabel } from "@/lib/categories";
import { collectSources, companies, getCompany } from "@/lib/companies";
import type { SourceRef } from "@/lib/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return { title: "Компания не найдена" };
  return {
    title: `${company.nameEn} · ${company.nameZh}`,
    description: company.summary,
  };
}

function SourceAnchor({ source }: { source: SourceRef }) {
  return (
    <a className="source" href={source.url} target="_blank" rel="noreferrer">
      {source.label}
    </a>
  );
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const sources = collectSources(company);

  return (
    <>
      <SiteHeader />
      <main className="site-shell dossier">
        <aside className="facts">
          <dl>
            <div>
              <dt>Штаб-квартира</dt>
              <dd>
                {company.headquarters.text}{" "}
                <SourceAnchor source={company.headquarters.source} />
              </dd>
            </div>
            <div>
              <dt>Основана</dt>
              <dd>
                {company.founded ? (
                  <>
                    {company.founded.year} <SourceAnchor source={company.founded.source} />
                  </>
                ) : (
                  "Год в проверенных источниках не зафиксирован"
                )}
              </dd>
            </div>
            <div>
              <dt>Статус</dt>
              <dd>{company.status === "active" ? "Работает" : "Статус неясен"}</dd>
            </div>
            <div>
              <dt>Сайт</dt>
              <dd>
                <SourceAnchor source={company.website} />
              </dd>
            </div>
            <div>
              <dt>Категории</dt>
              <dd>{company.categories.map((category) => categoryLabel(category)).join(", ")}</dd>
            </div>
          </dl>
          <p>
            <Link href="/companies">Все компании</Link>
          </p>
        </aside>
        <article>
          <p className="brand-kicker">{company.categories.map(categoryLabel).join(" · ")}</p>
          <h1>{company.nameEn}</h1>
          <p className="zh-title zh">{company.nameZh}</p>
          <p className="lede">{company.summary}</p>
          <p className="prose">{company.description}</p>

          <h2 className="section-title">Модели</h2>
          {company.models.length === 0 ? (
            <p>Отдельная модельная линейка в источниках этой карточки не названа.</p>
          ) : (
            <ul className="item-list">
              {company.models.map((model) => (
                <li key={model.name}>
                  <strong>{model.name}</strong>
                  {model.note ? <p className="summary">{model.note}</p> : null}
                  <SourceAnchor source={model.source} />
                </li>
              ))}
            </ul>
          )}

          <h2 className="section-title">Продукты</h2>
          <ul className="item-list">
            {company.products.map((product) => (
              <li key={product.name}>
                <strong>{product.name}</strong>
                {product.note ? <p className="summary">{product.note}</p> : null}
                <SourceAnchor source={product.source} />
              </li>
            ))}
          </ul>

          {company.notes?.map((note) => (
            <p key={note.text} className="note">
              {note.text} <SourceAnchor source={note.source} />
            </p>
          ))}

          <h2 className="section-title">Источники</h2>
          <ul className="item-list">
            {sources.map((source) => (
              <li key={source.url}>
                <SourceAnchor source={source} />
              </li>
            ))}
          </ul>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
