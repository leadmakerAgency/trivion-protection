import Link from "next/link";
import { Button } from "@/components/Button";

type TocItem = { id: string; label: string };

type PageAsideProps = {
  toc?: TocItem[];
  quoteHref?: string;
};

export const PageAside = ({ toc = [], quoteHref = "/contact" }: PageAsideProps) => {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Next step</p>
        <Button href={quoteHref} variant="primary" className="mt-2 w-full justify-center text-sm">
          Request a quote
        </Button>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Share hours, access points, and incident history—we respond with realistic staffing options.
        </p>
      </div>
      {toc.length > 0 ? (
        <nav aria-label="On this page">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">On this page</p>
          <ul className="mt-2 space-y-1.5 border-t border-edge pt-3 text-sm">
            {toc.map((item) => (
              <li key={item.id}>
                <Link className="text-foreground/90 hover:text-accent hover:underline" href={`#${item.id}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Browse</p>
        <ul className="mt-2 space-y-1.5 border-t border-edge pt-3 text-sm text-muted">
          <li>
            <Link className="hover:text-accent hover:underline" href="/services">
              All services
            </Link>
          </li>
          <li>
            <Link className="hover:text-accent hover:underline" href="/service-areas">
              Service areas
            </Link>
          </li>
          <li>
            <Link className="hover:text-accent hover:underline" href="/knowledge">
              Knowledge base
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
