import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site";

export type Crumb = { href: string; label: string };

type BreadcrumbsProps = {
  items: Crumb[];
  tone?: "dark" | "light";
  /** `seoOnly` emits BreadcrumbList JSON-LD without visible navigation. */
  mode?: "full" | "seoOnly";
};

export const Breadcrumbs = ({ items, tone = "dark", mode = "full" }: BreadcrumbsProps) => {
  const base = getSiteUrl();
  const trail = [{ href: "/", label: "Home" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${base}${c.href.startsWith("/") ? c.href : `/${c.href}`}`,
    })),
  };

  if (mode === "seoOnly") {
    return <JsonLd data={schema} />;
  }

  const muted = tone === "light" ? "text-muted-on-light" : "text-muted";
  const current = tone === "light" ? "text-foreground-on-light" : "text-foreground";
  const link = tone === "light" ? "text-foreground-on-light/90 hover:text-accent-dark" : "text-foreground/85 hover:text-accent";

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${muted}`}>
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((c, index) => (
          <li key={`${c.href}-${index}`} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden className={`select-none ${muted}`}>
                &raquo;
              </span>
            ) : null}
            {index === trail.length - 1 ? (
              <span className={`font-medium ${current}`}>{c.label}</span>
            ) : (
              <Link className={`${link} hover:underline`} href={c.href}>
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
