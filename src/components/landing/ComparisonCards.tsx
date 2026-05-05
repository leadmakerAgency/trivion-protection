type ComparisonRow = { feature: string; left: string; right: string };

type ComparisonCardsProps = {
  headers: [string, string, string];
  rows: ComparisonRow[];
  tone?: "onLight" | "onDark";
};

export const ComparisonCards = ({ headers, rows, tone = "onDark" }: ComparisonCardsProps) => {
  const cardShell =
    tone === "onLight"
      ? "rounded-xl bg-white p-5 ring-1 ring-surface-light-edge sm:p-6"
      : "rounded-xl bg-card/70 p-5 ring-1 ring-edge/60 sm:p-6";
  const featureClass = tone === "onLight" ? "text-foreground-on-light" : "text-foreground";
  const labelClass = tone === "onLight" ? "text-muted-on-light" : "text-muted";
  const valueClass = tone === "onLight" ? "text-foreground-on-light/95" : "text-foreground/95";

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.feature} className={cardShell}>
          <p className={`text-base font-semibold tracking-tight sm:text-lg ${featureClass}`}>{row.feature}</p>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wide ${labelClass}`}>{headers[1]}</p>
              <p className={`mt-2 text-sm leading-relaxed sm:text-base ${valueClass}`}>{row.left}</p>
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wide ${labelClass}`}>{headers[2]}</p>
              <p className={`mt-2 text-sm leading-relaxed sm:text-base ${valueClass}`}>{row.right}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
