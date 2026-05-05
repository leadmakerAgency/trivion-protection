import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type IconFeatureCardProps = {
  icon: LucideIcon;
  title: string;
  children?: ReactNode;
  tone?: "onLight" | "onDark";
};

export const IconFeatureCard = ({ icon: Icon, title, children, tone = "onDark" }: IconFeatureCardProps) => {
  const shell =
    tone === "onLight"
      ? "rounded-xl bg-white p-6 shadow-sm ring-1 ring-surface-light-edge"
      : "rounded-xl bg-card/80 p-6 ring-1 ring-edge/60";
  const iconWrap =
    tone === "onLight"
      ? "flex h-11 w-11 items-center justify-center rounded-lg bg-surface-light text-accent-dark"
      : "flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent";
  const titleClass = tone === "onLight" ? "text-foreground-on-light" : "text-foreground";
  const bodyClass = tone === "onLight" ? "text-muted-on-light" : "text-muted";

  return (
    <div className={shell}>
      <div className="flex gap-4">
        <div className={iconWrap} aria-hidden>
          <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`text-lg font-semibold tracking-tight ${titleClass}`}>{title}</h3>
          {children != null ? (
            <div className={`mt-2 text-sm leading-relaxed sm:text-base ${bodyClass}`}>{children}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
