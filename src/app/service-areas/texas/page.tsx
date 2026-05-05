import Link from "next/link";
import type { Metadata } from "next";
import { ContentProse } from "@/components/ContentProse";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { SectionBand } from "@/components/SectionBand";
import { buildMetadata } from "@/lib/seo";
import { texasAreas } from "@/lib/areas";

export const metadata: Metadata = buildMetadata({
  title: "Texas security guard service areas",
  description:
    "DFW-area guides for Tarrant, Collin, Northeast DFW, and Denton counties—property context, risk notes, planning checklists, and recommended service mixes for regional programs.",
  path: "/service-areas/texas",
});

export default function TexasHubPage() {
  return (
    <InteriorPageShell
      surface="paper"
      breadcrumbMode="seoOnly"
      breadcrumbs={[
        { href: "/service-areas", label: "Service areas" },
        { href: "/service-areas/texas", label: "Texas" },
      ]}
      title="Texas service areas"
      description="Texas pages exist for clients who need aligned standards across regions. If your primary
          operations are in Los Angeles County, start with California coverage—we will still
          coordinate reporting formats for national teams."
      contentWidth="wide"
      contentClassName="pb-0"
    >
      <SectionBand tone="light" className="!pt-0 sm:!pt-0">
        <ContentProse tone="light" title="Regional programs without losing California discipline">
          <p>
            Each Texas page mirrors the California structure: property archetypes, risk notes, recommended services,
            planning checklists, and FAQs. That consistency helps national teams compare regions without relearning a
            new layout per state.
          </p>
        </ContentProse>
      </SectionBand>

      <SectionBand tone="light" divider={false} className="!border-t-0">
        <ul className="grid gap-4 md:grid-cols-2">
          {texasAreas.map((a) => (
            <li
              key={a.slug}
              className="rounded-xl border border-surface-light-edge bg-white p-5 shadow-sm transition hover:border-accent-dark/25"
            >
              <Link
                className="text-lg font-semibold text-foreground-on-light hover:text-accent-dark hover:underline"
                href={`/service-areas/texas/${a.slug}`}
              >
                {a.name}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-muted-on-light">{a.metaDescription}</p>
              <p className="mt-3 text-xs text-muted-on-light">
                Includes: {a.commonPropertyTypes.slice(0, 2).join(", ")}
                {a.commonPropertyTypes.length > 2 ? "…" : ""}
              </p>
            </li>
          ))}
        </ul>
      </SectionBand>
    </InteriorPageShell>
  );
}
