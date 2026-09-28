"use client";

import { useMemo, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import type { CategoryId, Company } from "@/lib/types";
import { CompanyCard } from "./company-card";

function haystack(company: Company): string {
  return [
    company.nameEn,
    company.nameZh,
    company.summary,
    company.headquarters.text,
    ...company.models.map((item) => item.name),
    ...company.products.map((item) => item.name),
  ]
    .join(" ")
    .toLowerCase();
}

export function Catalog({ companies }: { companies: Company[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CategoryId[]>([]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return companies.filter((company) => {
      const matchesCategory =
        selected.length === 0 || selected.some((category) => company.categories.includes(category));
      const matchesQuery = needle.length === 0 || haystack(company).includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [companies, query, selected]);

  function toggle(category: CategoryId) {
    setSelected((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  return (
    <section>
      <div className="toolbar">
        <label className="sr-only" htmlFor="company-search">
          Поиск по компаниям и моделям
        </label>
        <input
          id="company-search"
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск: DeepSeek, 通义, видео, Пекин"
          type="search"
        />
        <div className="filters" role="group" aria-label="Категории">
          {CATEGORIES.map((category) => {
            const pressed = selected.includes(category.id);
            return (
              <button
                key={category.id}
                type="button"
                className="chip"
                aria-pressed={pressed}
                onClick={() => toggle(category.id)}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
      <p className="result-meta">
        <span>
          Показано {filtered.length} из {companies.length}
        </span>
        {selected.length > 0 || query ? (
          <button
            type="button"
            className="chip"
            onClick={() => {
              setQuery("");
              setSelected([]);
            }}
          >
            Сбросить
          </button>
        ) : (
          <span>Достаточно одной выбранной категории</span>
        )}
      </p>
      {filtered.length === 0 ? (
        <p className="empty">Ничего не найдено. Измените запрос или снимите фильтр.</p>
      ) : (
        <div className="grid">
          {filtered.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>
      )}
    </section>
  );
}
