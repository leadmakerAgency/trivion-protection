import Image from "next/image";
import { ShieldCheck, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";

export type LandingMarketingHeroProps = {
  variant: "service" | "area";
  /** Small label above headline (e.g. “Program” / “Coverage area”). */
  eyebrow: string;
  /** Visible page title: must be plain text wrapped in JSX for typography. Use as the only <h1> on the route. */
  title: ReactNode;
  subtitle: ReactNode;
  imageSrc: string;
  imageAlt: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Small line below CTAs (e.g. deep link). */
  footnote?: ReactNode;
};

export const LandingMarketingHero = ({
  variant,
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  primaryHref = "/contact",
  primaryLabel = "Get a quote",
  secondaryHref,
  secondaryLabel,
  footnote,
}: LandingMarketingHeroProps) => {
  const defaultSecondary =
    variant === "service"
      ? ({ href: "#overview", label: "Program details below" } as const)
      : ({ href: "#local-focus", label: "Area briefing below" } as const);

  const secHref = secondaryHref ?? defaultSecondary.href;
  const secLabel = secondaryLabel ?? defaultSecondary.label;

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface-light via-surface-light to-surface-light pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(29,191,115,0.12),transparent)] sm:h-96"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div className="text-center lg:max-w-none lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-dark">{eyebrow}</p>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground-on-light sm:text-5xl lg:mx-0 lg:max-w-[22ch] xl:text-[2.85rem]">
              {title}
            </h1>
            <div className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-on-light sm:text-xl lg:mx-0 lg:max-w-xl">
              {subtitle}
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-on-light lg:justify-start">
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 shrink-0 text-accent-dark" strokeWidth={1.6} aria-hidden />
                Licensed, field-first teams
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-accent-dark" strokeWidth={1.6} aria-hidden />
                {variant === "service" ? "Built for LA County deployments" : "Local context in every briefing"}
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button href={primaryHref} variant="primary" surface="light">
                {primaryLabel}
              </Button>
              <Button href={secHref} variant="secondary" surface="light">
                {secLabel}
              </Button>
            </div>
            {footnote ? (
              <div className="mx-auto mt-6 max-w-xl text-center text-sm text-muted-on-light lg:mx-0 lg:text-left">
                {footnote}
              </div>
            ) : null}
          </div>

          <div className="relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden rounded-2xl ring-1 ring-surface-light-edge shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)] lg:mx-0 lg:max-w-none lg:aspect-auto lg:h-[min(460px,calc(100vh-14rem))]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
