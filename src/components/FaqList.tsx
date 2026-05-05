type FaqItem = { question: string; answer: string };

type FaqListProps = {
  title?: string;
  items: FaqItem[];
  id?: string;
  variant?: "dark" | "light" | "landing";
  /** When false, only the accordion list renders (pair with MarketingSectionHeader). */
  showHeading?: boolean;
};

export const FaqList = ({
  title = "Frequently asked questions",
  items,
  id,
  variant = "dark",
  showHeading = true,
}: FaqListProps) => {
  const isLight = variant === "light" || variant === "landing";
  const isLanding = variant === "landing";
  const titleClass = isLight ? "text-foreground-on-light" : "text-foreground";
  const shell = isLanding
    ? "divide-y divide-surface-light-edge/80 rounded-xl bg-white/95 p-1 ring-1 ring-surface-light-edge shadow-sm sm:p-2"
    : isLight
      ? "divide-y divide-surface-light-edge rounded-sm border border-surface-light-edge bg-white shadow-sm"
      : "divide-y divide-edge rounded-sm border border-edge bg-card";
  const summaryFocus = isLight ? "focus-ring-on-light" : "focus-ring";
  const qClass = isLight ? "text-foreground-on-light" : "text-foreground";
  const chevron = isLight ? "text-muted-on-light" : "text-muted";
  const answerBorder = isLight ? "border-surface-light-edge" : "border-edge";
  const answerText = isLight ? "text-muted-on-light" : "text-muted";

  return (
    <section id={id} className="scroll-mt-28">
      {showHeading ? (
        <h2 className={`text-2xl font-semibold tracking-tight ${titleClass}`}>{title}</h2>
      ) : null}
      <div className={`${showHeading ? "mt-4 " : ""}${shell}`}>
        {items.map((item) => (
          <details
            key={item.question}
            className={`group ${isLanding ? "rounded-lg px-4 py-4 sm:px-5 sm:py-4" : "px-4 py-3"}`}
          >
            <summary
              className={`${summaryFocus} cursor-pointer list-none rounded-sm text-left text-base font-medium marker:content-none [&::-webkit-details-marker]:hidden ${qClass}`}
            >
              <span className="inline-flex w-full items-center justify-between gap-2">
                <span>{item.question}</span>
                <span className={`shrink-0 transition-transform group-open:rotate-180 ${chevron}`} aria-hidden>
                  ▾
                </span>
              </span>
            </summary>
            <p className={`mt-3 border-t pt-3 text-sm leading-relaxed ${answerBorder} ${answerText}`}>
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};
