type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  /** Paper-tone sections: headings and subtitle use on-light palette */
  tone?: "dark" | "light";
};

export const Section = ({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  tone = "dark",
}: SectionProps) => {
  const h2 = tone === "light" ? "text-foreground-on-light" : "text-foreground";
  const sub = tone === "light" ? "text-muted-on-light" : "text-muted";
  const eye = tone === "light" ? "text-accent-dark" : "text-accent";

  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-5xl">
          {eyebrow ? (
            <p className={`text-sm font-semibold uppercase tracking-wide ${eye}`}>{eyebrow}</p>
          ) : null}
          <h2 className={`mt-4 text-4xl font-semibold tracking-tight sm:text-5xl ${h2}`}>
            {title}
          </h2>
          {subtitle ? (
            <p className={`mt-5 text-lg leading-relaxed ${sub}`}>{subtitle}</p>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
};
