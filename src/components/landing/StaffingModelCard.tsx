import type { LucideIcon } from "lucide-react";

type StaffingModelCardProps = {
  icon: LucideIcon;
  label: string;
  description: string;
  tone?: "onLight" | "onDark";
};

export const StaffingModelCard = ({
  icon: Icon,
  label,
  description,
  tone = "onDark",
}: StaffingModelCardProps) => {
  const shell =
    tone === "onLight"
      ? "rounded-xl bg-white/90 p-5 ring-1 ring-surface-light-edge sm:p-6"
      : "rounded-xl bg-panel/60 p-5 ring-1 ring-edge/50 sm:p-6";
  const iconClass = tone === "onLight" ? "text-accent-dark" : "text-accent";
  const titleClass = tone === "onLight" ? "text-foreground-on-light" : "text-foreground";
  const bodyClass = tone === "onLight" ? "text-muted-on-light" : "text-muted";

  return (
    <div className={shell}>
      <div className="flex items-start gap-4">
        <Icon className={`mt-0.5 h-6 w-6 shrink-0 ${iconClass}`} strokeWidth={1.65} aria-hidden />
        <div>
          <h3 className={`text-base font-semibold tracking-tight sm:text-lg ${titleClass}`}>{label}</h3>
          <p className={`mt-2 text-sm leading-relaxed sm:text-base ${bodyClass}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};
