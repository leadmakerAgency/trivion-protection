import type { ReactNode } from "react";

export type StatStripItem = {
  icon: ReactNode;
  headline: string;
  label: string;
};

type StatStripProps = {
  items: StatStripItem[];
  id?: string;
  className?: string;
};

export const StatStrip = ({ items, id, className = "" }: StatStripProps) => {
  return (
    <div
      id={id}
      className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-3">
          <div className="text-accent [&>svg]:h-8 [&>svg]:w-8" aria-hidden>
            {item.icon}
          </div>
          <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {item.headline}
          </p>
          <p className="text-sm leading-relaxed text-muted">{item.label}</p>
        </div>
      ))}
    </div>
  );
};
