import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { ResourceLinks } from "@/components/ResourceLinks";
import { SectionBand } from "@/components/SectionBand";
import { industries } from "@/lib/industries";
import { resolveMdxLinkPreviews } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Industries we serve in Los Angeles",
  description:
    "Deep industry briefs for retail, corporate, logistics, construction, HOAs, healthcare, hospitality, and production—challenges, typical posts, reporting tips, and links to services and guides.",
  path: "/industries",
});

const industryImageById: Record<string, string> = {
  "retail-mixed-use": siteImages.corporateAccess,
  "corporate-offices": siteImages.guardHeadphones,
  "industrial-warehouse": siteImages.guardWarehouseAisle,
  construction: siteImages.construction,
  "residential-hoa": siteImages.patrol,
  healthcare: siteImages.teamPersonnel,
  hospitality: siteImages.guardEventTent,
  "film-production": siteImages.guardGrayFloor,
};

export default function IndustriesPage() {
  return (
    <InteriorPageShell
      breadcrumbs={[{ href: "/industries", label: "Industries" }]}
      title="Industries we serve"
      description="Los Angeles County is a portfolio of different risk profiles. These briefs translate how we
          staff, supervise, and report for each vertical—so procurement and operations share the same vocabulary."
      contentWidth="wide"
      contentPad="none"
      contentClassName="pb-0"
    >
      <div>
        {industries.map((industry, index) => {
          const img = industryImageById[industry.id] ?? siteImages.heroPrimary;
          const primary = getServiceBySlug(industry.primaryServiceSlug);
          const secondary = industry.secondaryServiceSlug
            ? getServiceBySlug(industry.secondaryServiceSlug)
            : null;
          const reading = resolveMdxLinkPreviews("knowledge", industry.relatedKnowledgeSlugs);
          const band: "light" | "dark" = index % 2 === 0 ? "light" : "dark";
          const imageFirst = index % 2 === 0;
          const imgBorder = band === "light" ? "border-surface-light-edge shadow-sm" : "border-edge";
          const h2 = band === "light" ? "text-foreground-on-light" : "text-foreground";
          const body = band === "light" ? "text-muted-on-light" : "text-muted";
          const eye = band === "light" ? "text-accent-dark" : "text-accent";
          const tipBox =
            band === "light"
              ? "rounded-sm border border-surface-light-edge bg-white p-4 shadow-sm"
              : "rounded-sm border border-edge bg-card p-4";

          return (
            <SectionBand key={industry.id} tone={band} id={industry.id}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <div
                  className={`relative min-h-[220px] overflow-hidden rounded-sm border lg:min-h-[280px] ${imgBorder} ${imageFirst ? "" : "lg:order-2"}`}
                >
                  <Image
                    src={img}
                    alt={`${industry.title} — security operations context`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
                <div className={imageFirst ? "" : "lg:order-1"}>
                  <h2 className={`text-3xl font-semibold tracking-tight ${h2}`}>{industry.title}</h2>
                  <p className={`mt-3 text-base leading-relaxed ${body}`}>{industry.summary}</p>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className={`text-sm font-semibold uppercase tracking-wide ${eye}`}>Challenges</h3>
                      <ul className={`mt-2 list-disc space-y-1 pl-4 text-sm ${body}`}>
                        {industry.challenges.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold uppercase tracking-wide ${eye}`}>Typical posts</h3>
                      <ul className={`mt-2 list-disc space-y-1 pl-4 text-sm ${body}`}>
                        {industry.typicalPosts.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`mt-6 ${tipBox}`}>
                    <h3 className={`text-sm font-semibold uppercase tracking-wide ${h2}`}>Reporting tips</h3>
                    <ul className={`mt-2 list-disc space-y-1 pl-4 text-sm ${body}`}>
                      {industry.reportingTips.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {primary ? (
                      <Button
                        href={`/services/${primary.slug}`}
                        variant="primary"
                        surface={band === "light" ? "light" : "dark"}
                      >
                        {primary.title}
                      </Button>
                    ) : null}
                    {secondary ? (
                      <Button
                        href={`/services/${secondary.slug}`}
                        variant="secondary"
                        surface={band === "light" ? "light" : "dark"}
                      >
                        {secondary.title}
                      </Button>
                    ) : null}
                    <Button href="/contact" variant="secondary" surface={band === "light" ? "light" : "dark"}>
                      Request a tailored proposal
                    </Button>
                  </div>

                  {reading.length > 0 ? (
                    <div className="mt-8">
                      <ResourceLinks title="Guides that pair with this industry" items={reading} tone={band} />
                    </div>
                  ) : null}
                </div>
              </div>
            </SectionBand>
          );
        })}
      </div>
    </InteriorPageShell>
  );
}
