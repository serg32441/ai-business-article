import { Catalog } from "@/components/catalog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { companies } from "@/lib/companies";

export default function HomePage() {
  return (
    <>
      <SiteHeader current="/" />
      <main className="site-shell">
        <section className="hero">
          <div>
            <p className="brand-kicker">Материковый Китай</p>
            <h1>Компании искусственного интеллекта</h1>
            <p className="lede">
              Справочник лабораторий и компаний, которые разрабатывают модели, чипы и прикладные
              системы. Названия оставлены в привычной латинской и китайской записи, пояснения — на
              русском. У каждого неочевидного факта есть ссылка на открытый источник.
            </p>
          </div>
          <aside className="hero-aside">
            <strong>{companies.length}</strong>
            <span>компаний и лабораторий в этой редакции. Это не полный список рынка.</span>
          </aside>
        </section>
        <Catalog companies={companies} />
      </main>
      <SiteFooter />
    </>
  );
}
