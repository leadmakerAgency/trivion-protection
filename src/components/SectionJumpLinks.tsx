import Link from "next/link";

export type JumpLinkItem = { id: string; label: string };

type SectionJumpLinksProps = {
  items: JumpLinkItem[];
  className?: string;
  /** `hero`: translucent chips on imagery; `inline`: quieter ghost pills on solid sections */
  surface?: "hero" | "inline";
};

export const SectionJumpLinks = ({
  items,
  className = "",
  surface = "hero",
}: SectionJumpLinksProps) => {
  if (items.length === 0) return null;

  const heroLink =
    "rounded-full px-3 py-1.5 text-sm font-medium text-foreground/90 ring-1 ring-white/25 bg-background/35 backdrop-blur-sm transition hover:bg-background/50 hover:ring-accent/40 focus-visible:focus-ring";
  const inlineLink =
    "rounded-full px-3 py-1.5 text-sm font-medium text-muted ring-1 ring-edge/70 bg-panel/40 transition hover:text-accent hover:ring-accent/35 focus-visible:focus-ring";

  return (
    <nav aria-label="On this page" className={className}>
      <p
        className={
          surface === "hero"
            ? "text-xs font-semibold uppercase tracking-wide text-muted"
            : "text-xs font-semibold uppercase tracking-wide text-muted"
        }
      >
        Jump to
      </p>
      <ul className="-mx-1 mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <Link className={`block ${surface === "hero" ? heroLink : inlineLink}`} href={`#${item.id}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
