import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

export type InteriorPageShellProps = {
  breadcrumbs: Crumb[];
  title: string;
  description?: ReactNode;
  children: ReactNode;
  /** Max width when no sidebar */
  contentWidth?: "narrow" | "wide";
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  headerPadding?: "default" | "compact";
  meta?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  headerActions?: ReactNode;
  as?: "div" | "article";
  sidebar?: ReactNode;
  /** When "none", content row has no horizontal padding (children supply their own). */
  contentPad?: "default" | "none";
  /**
   * `archive`: dark header, light main column, dark panel sidebar (blog/knowledge indexes).
   * `default`: unified dark surface for header and body.
   */
  pageTone?: "default" | "archive";
  /** When `light`, header sits on paper tone with on-light typography (use with care sitewide). */
  headerTone?: "dark" | "light";
};

const contentMax: Record<NonNullable<InteriorPageShellProps["contentWidth"]>, string> = {
  narrow: "max-w-4xl",
  wide: "max-w-7xl",
};

export const InteriorPageShell = ({
  breadcrumbs,
  title,
  description,
  children,
  contentWidth = "narrow",
  className = "",
  contentClassName = "",
  headerClassName = "",
  headerPadding = "default",
  meta,
  titleClassName = "",
  descriptionClassName = "",
  headerActions,
  as: Root = "div",
  sidebar,
  contentPad = "default",
  pageTone = "default",
  headerTone = "dark",
}: InteriorPageShellProps) => {
  const headerPy = headerPadding === "compact" ? "py-10" : "py-12";
  const titleMargin = meta ? "mt-2" : "mt-6";
  const contentPx =
    contentPad === "default" ? "px-5 sm:px-8 lg:px-10" : "";

  const isArchive = pageTone === "archive";
  const crumbTone = headerTone === "light" ? "light" : "dark";
  const titleColor =
    headerTone === "light" ? "text-foreground-on-light" : "text-foreground";
  const descColor =
    headerTone === "light" ? "text-muted-on-light" : "text-muted";

  const mainColumn = (
    <div className={`min-w-0 ${isArchive ? "text-foreground-on-light" : ""}`}>
      <div className={contentWidth === "narrow" ? "max-w-4xl" : ""}>{children}</div>
    </div>
  );

  const asideColumn = sidebar ? (
    <aside
      className={
        isArchive
          ? "rounded-sm border border-edge bg-panel px-5 py-6 text-sm text-foreground shadow-content lg:sticky lg:top-24 lg:self-start"
          : "border-t border-edge pt-8 text-sm text-muted lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
      }
    >
      {sidebar}
    </aside>
  ) : null;

  const body = sidebar ? (
    <div className={`mx-auto max-w-7xl pb-16 ${contentPx} ${contentClassName}`}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16.5rem] lg:items-start lg:gap-12">
        {mainColumn}
        {asideColumn}
      </div>
    </div>
  ) : (
    <div
      className={`mx-auto ${contentMax[contentWidth]} pb-16 ${contentPx} ${contentClassName}`}
    >
      {children}
    </div>
  );

  return (
    <Root className={`border-b border-edge ${headerTone === "light" ? "bg-surface-light" : "bg-surface"} ${className}`}>
      <div className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${headerPy} ${headerClassName}`}>
        <Breadcrumbs items={breadcrumbs} tone={crumbTone} />
        {meta ? <div className="mt-4">{meta}</div> : null}
        <h1
          className={`${titleMargin} text-4xl font-semibold tracking-tight ${titleColor} ${titleClassName}`}
        >
          {title}
        </h1>
        {description != null ? (
          <div
            className={`mt-4 max-w-4xl text-base leading-relaxed ${descColor} ${descriptionClassName}`}
          >
            {typeof description === "string" ? <p>{description}</p> : description}
          </div>
        ) : null}
        {headerActions ? <div className="mt-8">{headerActions}</div> : null}
      </div>
      {isArchive ? (
        <div className="border-t border-surface-light-edge bg-surface-light">{body}</div>
      ) : (
        body
      )}
    </Root>
  );
};
