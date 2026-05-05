import Link from "next/link";
import { Button } from "@/components/Button";

export type ArchiveSidebarItem = { slug: string; title: string };

type ArchiveSidebarProps = {
  segment: "blog" | "knowledge";
  recent: ArchiveSidebarItem[];
  surface?: "dark" | "light";
};

export const ArchiveSidebar = ({ segment, recent, surface = "dark" }: ArchiveSidebarProps) => {
  const otherHref = segment === "blog" ? "/knowledge" : "/blog";
  const otherLabel = segment === "blog" ? "Knowledge" : "Blog";
  const recentHeading = segment === "blog" ? "Recent posts" : "Recent articles";

  const isLight = surface === "light";
  const label = isLight ? "text-xs font-semibold uppercase tracking-wide text-foreground-on-light" : "text-xs font-semibold uppercase tracking-wide text-foreground/80";
  const muted = isLight ? "text-muted-on-light" : "text-muted";
  const linkClass = isLight ? "text-foreground-on-light hover:text-accent-dark hover:underline" : "text-foreground/90 hover:underline";
  const rule = isLight ? "border-t border-surface-light-edge" : "border-t border-edge";

  return (
    <div className={`space-y-8 ${muted}`}>
      <div>
        <p className={label}>Get in touch</p>
        <Button
          href="/contact"
          variant="primary"
          surface={isLight ? "light" : "dark"}
          className="mt-2 w-full justify-center text-sm"
        >
          Request a quote
        </Button>
      </div>
      <nav aria-label="Browse">
        <p className={label}>Browse</p>
        <ul className={`mt-2 space-y-2 pt-3 ${rule}`}>
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
      <div>
        <p className={label}>{recentHeading}</p>
        <ul className={`mt-2 space-y-2 pt-3 ${rule}`}>
          {recent.map((p) => (
            <li key={p.slug}>
              <Link
                className={linkClass}
                href={segment === "blog" ? `/blog/${p.slug}` : `/knowledge/${p.slug}`}
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
