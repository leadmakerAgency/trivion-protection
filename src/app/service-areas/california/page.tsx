import Link from "next/link";
import type { Metadata } from "next";
import { ContentProse } from "@/components/ContentProse";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { SectionBand } from "@/components/SectionBand";
import { buildMetadata } from "@/lib/seo";
import { californiaAreas } from "@/lib/areas";

export const metadata: Metadata = buildMetadata({
  title: "California security guard service areas",
  description:
    "County and metro guides across California: property mixes, risk notes, planning checklists, recommended services, and FAQs—anchored on Los Angeles County operations.",
  path: "/service-areas/california",
});

export default function CaliforniaHubPage() {
  return (
    <InteriorPageShell
      breadcrumbs={[
        { href: "/service-areas", label: "Service areas" },
        { href: "/service-areas/california", label: "California" },
      ]}
      title="California service areas"
      description="Trivon Protection is built around Los Angeles County operations, with additional California
          coverage pages for counties and metros where clients commonly request multi-site programs."
      contentWidth="wide"
      contentClassName="pb-0"
    >
      <SectionBand tone="light" className="!pt-0 sm:!pt-0">
        <ContentProse tone="light" title="How to use these California pages">
          <p>
            Pick the geography that matches your footprint, then read the property archetypes and risk notes. Each
            page ends with a planning checklist you can forward to facilities, loss prevention, or your GC—so security
            scope conversations start with facts instead of slogans.
          </p>
        </ContentProse>
      </SectionBand>

      <SectionBand tone="dark" className="!border-t-0">
        <ul className="grid gap-4 md:grid-cols-2">
          {californiaAreas.map((a) => (
            <li key={a.slug} className="rounded-sm border border-edge bg-card p-5">
              <Link
                className="text-lg font-semibold text-foreground hover:underline"
                href={`/service-areas/california/${a.slug}`}
              >
                {a.name}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.metaDescription}</p>
              <p className="mt-3 text-xs text-muted">
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
