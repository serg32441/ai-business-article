import { companies } from "@/lib/companies";

export function SiteFooter() {
  return (
    <footer className="site-shell footer">
      <p>Справочник китайских ИИ-компаний. {companies.length} карточек по открытым источникам.</p>
      <p>Названия компаний и моделей не переводятся.</p>
    </footer>
  );
}
