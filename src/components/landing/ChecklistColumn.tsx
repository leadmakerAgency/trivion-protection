import { CircleCheck } from "lucide-react";

type ChecklistColumnProps = {
  items: string[];
  tone?: "onLight" | "onDark";
  className?: string;
};

export const ChecklistColumn = ({ items, tone = "onDark", className = "" }: ChecklistColumnProps) => {
  const iconClass = tone === "onLight" ? "text-accent-dark" : "text-accent";
  const textClass = tone === "onLight" ? "text-muted-on-light" : "text-muted";

  return (
    <ul className={`grid gap-x-12 gap-y-4 sm:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CircleCheck className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} strokeWidth={1.75} aria-hidden />
          <span className={`text-sm leading-relaxed sm:text-base ${textClass}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
};
