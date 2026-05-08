import Link from "next/link";
import type { Metadata } from "next";
import { ContentProse } from "@/components/ContentProse";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { ResourceLinks } from "@/components/ResourceLinks";
import { Section } from "@/components/Section";
import { SectionBand } from "@/components/SectionBand";
import { resolveMdxLinkPreviews } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { servicesByCategory, type ServiceCategory } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Security guard services in Los Angeles",
  description:
    "Compare armed and unarmed posts, marked vehicle patrol, fire watch, construction, and warehouse security programs, each with scenarios, staffing models, and FAQs for Los Angeles County operators.",
  path: "/services",
});

const categoryLabel: Record<ServiceCategory, string> = {
  static: "Static posts and site-based coverage",
  mobile: "Mobile coverage",
  specialized: "Specialized programs",
};

export default function ServicesIndexPage() {
  const guides = resolveMdxLinkPreviews([]);

  return (
    <InteriorPageShell
      surface="paper"
      breadcrumbMode="seoOnly"
      breadcrumbs={[{ href: "/services", label: "Services" }]}
      title="Security guard services"
      description="Trivon Protection provides Los Angeles County security guard services for properties that
          need disciplined access control, visible deterrence, and reporting your leadership can
          trust. Each program page walks through scenarios, deliverables, staffing models, and common
          questions so you never get just a thin brochure."
      contentWidth="wide"
      contentClassName="pb-0"
    >
      <SectionBand tone="light" className="!pt-0 sm:!pt-0">
        <ContentProse tone="light" title="How to choose a program without guessing">
          <p>
            Start with hours, access points, and the incidents you are trying to prevent, not the uniform color.
            Static posts excel when someone must always verify visitors; marked patrol excels when geography makes
            predictability dangerous; specialized programs like fire watch exist when compliance windows demand
            continuous rounds.
          </p>
          {guides.length > 0 ? (
            <p>
              Use the blog posts below when you are comparing vendors or building an RFP. Each program card summarizes who
              it fits, what it covers, and a concise field highlight to help you shortlist before you talk scope with us.
            </p>
          ) : (
            <p>
              Each program card summarizes who it fits, what it covers, and a concise field highlight to help you shortlist
              before you talk scope with us.
            </p>
          )}
        </ContentProse>

        {guides.length > 0 ? (
          <div className="mt-8">
            <ResourceLinks tone="light" title="Blog posts for procurement teams" items={guides} />
          </div>
        ) : null}
      </SectionBand>

      <SectionBand tone="light" divider={false} className="!border-t-0">
        <Section
          title="Programs by coverage type"
          subtitle="Each card spells out fit, coverage, and a representative field highlight so you can compare programs at a glance before opening a detail view."
          tone="light"
          className="!py-0"
        >
          {(["static", "mobile", "specialized"] as const).map((cat) => (
            <div key={cat} className="mb-12 last:mb-0">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-accent-dark">{categoryLabel[cat]}</h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {servicesByCategory(cat).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group rounded-xl border border-surface-light-edge bg-white p-6 shadow-sm transition hover:border-accent-dark/35 hover:shadow-md"
                  >
                    <h2 className="text-xl font-semibold text-foreground-on-light group-hover:text-accent-dark group-hover:underline">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-foreground-on-light">{s.bestFor}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-on-light">{s.shortDescription}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-on-light">
                      <span className="font-medium text-foreground-on-light">Field highlight: </span>
                      {s.highlights[0]}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Section>
      </SectionBand>
    </InteriorPageShell>
  );
}
