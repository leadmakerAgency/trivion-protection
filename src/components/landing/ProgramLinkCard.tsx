import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ProgramLinkCardProps = {
  href: string;
  title: string;
  description?: string;
  tone?: "onLight" | "onDark";
};

export const ProgramLinkCard = ({ href, title, description, tone = "onDark" }: ProgramLinkCardProps) => {
  const shell =
    tone === "onLight"
      ? "group flex items-start justify-between gap-4 rounded-xl bg-white p-5 ring-1 ring-surface-light-edge transition hover:ring-accent-dark/25"
      : "group flex items-start justify-between gap-4 rounded-xl bg-panel/40 p-5 ring-1 ring-edge/50 transition hover:ring-accent/30";
  const titleClass =
    tone === "onLight"
      ? "font-semibold text-foreground-on-light group-hover:text-accent-dark"
      : "font-semibold text-foreground group-hover:text-accent";
  const descClass = tone === "onLight" ? "text-muted-on-light" : "text-muted";
  const arrowClass =
    tone === "onLight"
      ? "mt-1 shrink-0 text-muted-on-light transition group-hover:translate-x-0.5 group-hover:text-accent-dark"
      : "mt-1 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent";

  return (
    <Link href={href} className={`${shell} focus-ring`}>
      <span className="min-w-0">
        <span className={`block text-base tracking-tight ${titleClass}`}>{title}</span>
        {description ? (
          <span className={`mt-1 block text-sm leading-relaxed ${descClass}`}>{description}</span>
        ) : null}
      </span>
      <ArrowRight className={`h-5 w-5 ${arrowClass}`} strokeWidth={1.75} aria-hidden />
    </Link>
  );
};
