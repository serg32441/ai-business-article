import Link from "next/link";
import { categoryShort } from "@/lib/categories";
import type { Company } from "@/lib/types";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Link href={`/companies/${company.slug}`} className="card">
      <div className="card-top">
        <h2 className="zh">{company.nameZh}</h2>
      </div>
      <p className="en">{company.nameEn}</p>
      <p className="meta">
        {company.headquarters.text}
        {company.founded ? ` · ${company.founded.year}` : ""}
      </p>
      <p className="summary">{company.summary}</p>
      <div className="tags">
        {company.categories.map((category) => (
          <span key={category} className="tag">
            {categoryShort(category)}
          </span>
        ))}
      </div>
    </Link>
  );
}
