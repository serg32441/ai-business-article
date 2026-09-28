import Link from "next/link";

const links = [
  { href: "/", label: "Главная" },
  { href: "/companies", label: "Компании" },
  { href: "/about", label: "О справочнике" },
];

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="site-shell masthead">
      <Link href="/" className="brand">
        <span className="seal zh" aria-hidden="true">
          录
        </span>
        <span>
          <p className="brand-kicker">Справочник</p>
          <p className="brand-title">Китайский ИИ</p>
        </span>
      </Link>
      <nav className="nav-links" aria-label="Разделы">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
