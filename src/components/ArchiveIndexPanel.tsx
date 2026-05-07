import Link from "next/link";
import { Button } from "@/components/Button";

export type ArchiveIndexPanelItem = { slug: string; title: string };

type ArchiveIndexPanelProps = {
  segment: "blog" | "knowledge";
  recent: ArchiveIndexPanelItem[];
  surface?: "dark" | "light";
};

export const ArchiveIndexPanel = ({ segment, recent, surface = "dark" }: ArchiveIndexPanelProps) => {
  const otherHref = segment === "blog" ? "/knowledge" : "/blog";
  const otherLabel = segment === "blog" ? "Knowledge" : "Blog";
  const recentHeading = segment === "blog" ? "Recent posts" : "Recent articles";

  const isLight = surface === "light";
  const label = isLight
    ? "text-xs font-semibold uppercase tracking-wide text-foreground-on-light"
    : "text-xs font-semibold uppercase tracking-wide text-foreground/80";
  const muted = isLight ? "text-muted-on-light" : "text-muted";
  const linkClass = isLight
    ? "text-foreground-on-light hover:text-accent-dark hover:underline"
    : "text-foreground/90 hover:underline";

  return (
    <div
      className={`mb-10 rounded-xl border border-surface-light-edge p-6 shadow-sm sm:p-8 ${
        isLight ? "bg-surface-light" : "bg-panel"
      } ${muted}`}
    >
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
        <div>
          <p className={label}>Get in touch</p>
          <Button
            href="/contact"
            variant="primary"
            surface={isLight ? "light" : "dark"}
            className="mt-3 w-full justify-center text-sm sm:w-auto"
          >
            Request a quote
          </Button>
        </div>
        <nav aria-label="Browse">
          <p className={label}>Browse</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link className={linkClass} href="/service-areas">
                Service areas
              </Link>
            </li>
            <li>
              <Link className={linkClass} href="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className={linkClass} href={otherHref}>
                {otherLabel}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="min-w-0">
          <p className={label}>{recentHeading}</p>
          <ul className="mt-3 space-y-2">
            {recent.map((p) => (
              <li key={p.slug}>
                <Link
                  className={`${linkClass} line-clamp-2 sm:line-clamp-none`}
                  href={segment === "blog" ? `/blog/${p.slug}` : `/knowledge/${p.slug}`}
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
