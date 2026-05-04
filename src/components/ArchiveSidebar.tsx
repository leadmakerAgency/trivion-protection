import Link from "next/link";
import { Button } from "@/components/Button";

export type ArchiveSidebarItem = { slug: string; title: string };

type ArchiveSidebarProps = {
  segment: "blog" | "knowledge";
  recent: ArchiveSidebarItem[];
};

export const ArchiveSidebar = ({ segment, recent }: ArchiveSidebarProps) => {
  const otherHref = segment === "blog" ? "/knowledge" : "/blog";
  const otherLabel = segment === "blog" ? "Knowledge" : "Blog";
  const recentHeading = segment === "blog" ? "Recent posts" : "Recent articles";

  return (
    <div className="space-y-8 text-muted">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80">Get in touch</p>
        <Button href="/contact" variant="primary" className="mt-2 w-full justify-center text-sm">
          Request a quote
        </Button>
      </div>
      <nav aria-label="Browse">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80">Browse</p>
        <ul className="mt-2 space-y-2 border-t border-edge pt-3">
          <li>
            <Link className="text-foreground/90 hover:underline" href="/service-areas">
              Service areas
            </Link>
          </li>
          <li>
            <Link className="text-foreground/90 hover:underline" href="/services">
              Services
            </Link>
          </li>
          <li>
            <Link className="text-foreground/90 hover:underline" href={otherHref}>
              {otherLabel}
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80">{recentHeading}</p>
        <ul className="mt-2 space-y-2 border-t border-edge pt-3">
          {recent.map((p) => (
            <li key={p.slug}>
              <Link
                className="text-foreground/90 hover:underline"
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
