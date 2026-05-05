import type { ReactNode } from "react";

type MarketingSectionHeaderProps = {
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  tone?: "onLight" | "onDark";
  /** `center` aligns eyebrow, heading, and supporting line (content blocks below stay full width unless you constrain them). */
  align?: "left" | "center";
  className?: string;
};

export const MarketingSectionHeader = ({
  eyebrow,
  title,
  description,
  tone = "onDark",
  align = "left",
  className = "",
}: MarketingSectionHeaderProps) => {
  const eyebrowClass =
    tone === "onLight" ? "text-accent-dark" : "text-accent";
  const titleClass =
    tone === "onLight" ? "text-foreground-on-light" : "text-foreground";
  const descClass =
    tone === "onLight" ? "text-muted-on-light" : "text-muted";

  const headAlign = align === "center" ? "text-center" : "text-left";
  const descBox = align === "center" ? "mx-auto max-w-3xl text-balance" : "max-w-3xl";

  return (
    <header className={`${headAlign} ${className}`}>
      {eyebrow != null ? (
        <div className={`mb-3 ${align === "center" ? "flex justify-center" : ""}`}>
          {typeof eyebrow === "string" ? (
            <p className={`text-sm font-semibold uppercase tracking-wide ${eyebrowClass}`}>{eyebrow}</p>
          ) : (
            eyebrow
          )}
        </div>
      ) : null}
      <h2
        className={`text-2xl font-semibold tracking-tight sm:text-3xl ${titleClass} ${align === "center" ? "mx-auto max-w-3xl text-balance" : ""}`}
      >
        {title}
      </h2>
      {description != null ? (
        <div className={`mt-3 ${descBox} text-base leading-relaxed sm:text-lg ${descClass}`}>
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>
      ) : null}
    </header>
  );
};
