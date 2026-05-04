type FaqItem = { question: string; answer: string };

type FaqListProps = {
  title?: string;
  items: FaqItem[];
  id?: string;
  variant?: "dark" | "light";
};

export const FaqList = ({
  title = "Frequently asked questions",
  items,
  id,
  variant = "dark",
}: FaqListProps) => {
  const isLight = variant === "light";
  const titleClass = isLight ? "text-foreground-on-light" : "text-foreground";
  const shell = isLight
    ? "divide-y divide-surface-light-edge rounded-sm border border-surface-light-edge bg-white shadow-sm"
    : "divide-y divide-edge rounded-sm border border-edge bg-card";
  const summaryFocus = isLight ? "focus-ring-on-light" : "focus-ring";
  const qClass = isLight ? "text-foreground-on-light" : "text-foreground";
  const chevron = isLight ? "text-muted-on-light" : "text-muted";
  const answerBorder = isLight ? "border-surface-light-edge" : "border-edge";
  const answerText = isLight ? "text-muted-on-light" : "text-muted";

  return (
    <section id={id} className="scroll-mt-28">
      <h2 className={`text-2xl font-semibold tracking-tight ${titleClass}`}>{title}</h2>
      <div className={`mt-4 ${shell}`}>
        {items.map((item) => (
          <details key={item.question} className="group px-4 py-3">
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
