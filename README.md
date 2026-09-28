# Китайский ИИ

Справочник компаний и лабораторий искусственного интеллекта из материкового Китая. Интерфейс на русском, имена компаний и моделей не переводятся.

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000). Карточки лежат в `src/lib/companies.ts`.

## Публикация

Перед сборкой задайте домен без слэша в конце. Иначе канонические ссылки и `sitemap.xml` укажут на заглушку `https://example.com`.

```bash
NEXT_PUBLIC_SITE_URL=https://ваш-домен.example npm run build
```

Загрузите содержимое папки `out/` на хостинг. Затем отправьте `https://ваш-домен.example/sitemap.xml` в Google Search Console и Яндекс Вебмастер.
