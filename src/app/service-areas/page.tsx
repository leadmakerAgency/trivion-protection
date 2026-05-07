import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { ContentProse } from "@/components/ContentProse";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { SectionBand } from "@/components/SectionBand";
import { buildMetadata } from "@/lib/seo";
import { californiaAreas, texasAreas } from "@/lib/areas";

export const metadata: Metadata = buildMetadata({
  title: "Service areas: California and Texas",
  description:
    "California-first localized pages for Los Angeles County and regional metros, plus Texas hubs for multi-state operators, each with property context, risk notes, and recommended service mixes.",
  path: "/service-areas",
});

export default function ServiceAreasIndexPage() {
  return (
    <InteriorPageShell
      surface="paper"
      breadcrumbMode="seoOnly"
      breadcrumbs={[{ href: "/service-areas", label: "Service areas" }]}
      title="Service areas"
      description="Use these pages when you need intent-specific coverage guidance, Los Angeles County security
          guards, Orange County mixed-use programs, Inland Empire logistics, or Texas regional standards for
          national teams."
      headerActions={
        <div className="flex flex-wrap gap-3">
          <Button href="/service-areas/california" variant="primary" surface="light">
            California hub
          </Button>
          <Button href="/service-areas/texas" variant="secondary" surface="light">
            Texas hub
          </Button>
        </div>
      }
      contentWidth="wide"
      contentClassName="pb-0"
    >
      <SectionBand tone="light" className="!pt-0 sm:!pt-0">
        <ContentProse tone="light" title="California versus Texas in this site">
          <p>
            California content is written around Los Angeles County operations first, with additional county and
            metro pages for the programs clients most often request. Texas pages exist so multi-state operators can
            align reporting and supervision expectations without pretending every post sits in LA.
          </p>
          <p>
            Each localized page includes property archetypes, risk notes, a planning checklist, recommended service
            mixes, and FAQs, so your team can compare regions with the same structure.
          </p>
        </ContentProse>
      </SectionBand>

      <SectionBand tone="light" divider={false} className="!border-t-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-foreground-on-light">California</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-on-light">
              County and metro guides with intros, focus bullets, and recommended services drawn from local risk
              patterns.
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              {californiaAreas.map((a) => (
                <li
                  key={a.slug}
                  className="border-t border-surface-light-edge pt-4 first:border-t-0 first:pt-0"
                >
                  <Link
                    className="text-base font-semibold text-foreground-on-light hover:text-accent-dark hover:underline"
                    href={`/service-areas/california/${a.slug}`}
                  >
                    {a.name}
                  </Link>
                  <p className="mt-1 text-muted-on-light">{a.metaDescription}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground-on-light">Texas</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-on-light">
              Regional hubs for DFW-area programs with patrol, access control, and construction options aligned to
              multi-state governance.
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              {texasAreas.map((a) => (
                <li
                  key={a.slug}
                  className="border-t border-surface-light-edge pt-4 first:border-t-0 first:pt-0"
                >
                  <Link
                    className="text-base font-semibold text-foreground-on-light hover:text-accent-dark hover:underline"
                    href={`/service-areas/texas/${a.slug}`}
                  >
                    {a.name}
                  </Link>
                  <p className="mt-1 text-muted-on-light">{a.metaDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionBand>
    </InteriorPageShell>
  );
}
