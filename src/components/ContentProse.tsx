import type { ReactNode } from "react";

type ContentProseProps = {
  id?: string;
  title: string;
  children: ReactNode;
  /** Smaller heading for nested sections */
  level?: "h2" | "h3";
  className?: string;
  tone?: "dark" | "light";
};

export const ContentProse = ({
  id,
  title,
  children,
  level = "h2",
  className = "",
  tone = "dark",
}: ContentProseProps) => {
  const Heading = level;
  const h =
    tone === "light"
      ? level === "h2"
        ? "text-2xl font-semibold tracking-tight text-foreground-on-light"
        : "text-xl font-semibold text-foreground-on-light"
      : level === "h2"
        ? "text-2xl font-semibold tracking-tight text-foreground"
        : "text-xl font-semibold text-foreground";
  const body = tone === "light" ? "text-muted-on-light" : "text-muted";

  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      <Heading className={h}>{title}</Heading>
      <div className={`mt-4 space-y-4 text-base leading-relaxed ${body}`}>{children}</div>
    </section>
  );
};
