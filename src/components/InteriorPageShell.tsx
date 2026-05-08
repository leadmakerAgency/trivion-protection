import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

export type InteriorPageShellProps = {
  breadcrumbs: Crumb[];
  title: string;
  description?: ReactNode;
  children: ReactNode;
  /** Max width when no sidebar. `full` = full-bleed sections (no outer max-width). */
  contentWidth?: "narrow" | "wide" | "full";
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
   * `archive`: contrasting header + main column (use with `surface="paper"` for all-light blog).
   * `default`: standard interior body under the header.
   */
  pageTone?: "default" | "archive";
  /** When `light`, header sits on paper tone with on-light typography (use with care sitewide). */
  headerTone?: "dark" | "light";
  /** White marketing interior: light header + paper body (navbar “main” pages). */
  surface?: "default" | "paper";
  /** `seoOnly` keeps BreadcrumbList structured data without showing the trail. */
  breadcrumbMode?: "full" | "seoOnly";
  /** Omit visible H1 and description: use when the first content block renders the lone <h1> (marketing hero). */
  suppressVisibleTitle?: boolean;
};

const contentMax: Record<Exclude<InteriorPageShellProps["contentWidth"], undefined>, string> = {
  narrow: "max-w-4xl",
  wide: "max-w-7xl",
  full: "max-w-none",
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
  surface = "default",
  breadcrumbMode = "full",
  suppressVisibleTitle = false,
}: InteriorPageShellProps) => {
  const isPaper = surface === "paper";
  const effectiveHeaderTone = isPaper ? "light" : headerTone;

  const headerPy =
    suppressVisibleTitle ? "py-0" : headerPadding === "compact" ? "py-10" : "py-12";
  const titleMargin =
    meta != null ? (breadcrumbMode === "seoOnly" ? "mt-6" : "mt-2") : "mt-6";
  const contentPx =
    contentPad === "default" ? "px-5 sm:px-8 lg:px-10" : "";

  const isArchive = pageTone === "archive";
  const crumbTone = effectiveHeaderTone === "light" ? "light" : "dark";
  const titleColor =
    effectiveHeaderTone === "light" ? "text-foreground-on-light" : "text-foreground";
  const descColor =
    effectiveHeaderTone === "light" ? "text-muted-on-light" : "text-muted";

  const useLightMainText = isArchive || isPaper;

  const mainColumn = (
    <div className={`min-w-0 ${useLightMainText ? "text-foreground-on-light" : ""}`}>
      <div className={contentWidth === "narrow" ? "max-w-4xl" : ""}>{children}</div>
    </div>
  );

  const asideColumn = sidebar ? (
    <aside
      className={
        isArchive
          ? isPaper
            ? "rounded-lg border border-surface-light-edge bg-surface-light px-5 py-6 text-sm text-foreground-on-light shadow-sm lg:self-start"
            : "rounded-sm border border-edge bg-panel px-5 py-6 text-sm text-foreground shadow-content lg:self-start"
          : "border-t border-edge pt-8 text-sm text-muted lg:self-start lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
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
      className={
        contentWidth === "full"
          ? `w-full pb-16 ${contentPx} ${contentClassName} ${useLightMainText ? "text-foreground-on-light" : ""}`
          : `mx-auto ${contentMax[contentWidth]} pb-16 ${contentPx} ${contentClassName} ${useLightMainText ? "text-foreground-on-light" : ""}`
      }
    >
      {children}
    </div>
  );

  const rootBg = isPaper ? "bg-white" : effectiveHeaderTone === "light" ? "bg-surface-light" : "bg-surface";

  const headerChrome = suppressVisibleTitle ? (
    <div className="sr-only">
      <Breadcrumbs items={breadcrumbs} tone={crumbTone} mode={breadcrumbMode} />
    </div>
  ) : (
    <div className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${headerPy} ${headerClassName}`}>
      <Breadcrumbs items={breadcrumbs} tone={crumbTone} mode={breadcrumbMode} />
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
  );

  const archiveBodyShell = isPaper ? "bg-white" : "bg-surface-light";

  return (
    <Root className={`${rootBg} ${className}`}>
      {headerChrome}
      {isArchive ? <div className={archiveBodyShell}>{body}</div> : body}
    </Root>
  );
};
