import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, MapPinned } from "lucide-react";
import { Button } from "@/components/Button";
import { ChecklistColumn } from "@/components/landing/ChecklistColumn";
import { IconFeatureCard } from "@/components/landing/IconFeatureCard";
import { LandingMarketingHero } from "@/components/landing/LandingMarketingHero";
import { MarketingSectionHeader } from "@/components/landing/MarketingSectionHeader";
import { ProgramLinkCard } from "@/components/landing/ProgramLinkCard";
import { FaqList } from "@/components/FaqList";
import { ImageTextBand } from "@/components/ImageTextBand";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { SectionBand } from "@/components/SectionBand";
import { buildMetadata } from "@/lib/seo";
import { getAreaLandingSectionIcon } from "@/lib/service-landing-icons";
import { allAreas, type ServiceAreaState } from "@/lib/areas";
import { getServiceBySlug } from "@/lib/services";
import { siteImages } from "@/lib/site-images";

type PageProps = {
  params: Promise<{ state: string; slug: string }>;
};

const isState = (value: string): value is ServiceAreaState =>
  value === "california" || value === "texas";

const POPULAR_SERVICE_SLUGS = [
  "unarmed-security-guards",
  "marked-vehicle-patrol-security",
  "construction-site-security-guards",
  "warehouse-security-guards",
] as const;

export const generateStaticParams = () =>
  allAreas.map((a) => ({ state: a.state, slug: a.slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { state, slug } = await params;
  if (!isState(state)) return {};
  const area = allAreas.find((a) => a.state === state && a.slug === slug);
  if (!area) return {};
  return buildMetadata({
    title: `${area.name} security guards`,
    description: `${area.metaDescription} ${area.intro.slice(0, 100)}…`,
    path: `/service-areas/${state}/${slug}`,
  });
};

export default async function ServiceAreaDetailPage({ params }: PageProps) {
  const { state, slug } = await params;
  if (!isState(state)) notFound();
  const area = allAreas.find((a) => a.state === state && a.slug === slug);
  if (!area) notFound();

  const stateLabel = state === "california" ? "California" : "Texas";
  const heroImage = state === "california" ? siteImages.guardEntrance : siteImages.guardNightStreet;
  const focusBandImage =
    state === "california" ? siteImages.guardParkingLot : siteImages.guardWarehouseAisle;

  const programSlugs = [...new Set([...area.recommendedServiceSlugs, ...POPULAR_SERVICE_SLUGS])];

  const LocalFocusIcon = getAreaLandingSectionIcon("local-focus");
  const RiskIcon = getAreaLandingSectionIcon("risks");
  const PlanningIcon = getAreaLandingSectionIcon("planning");

  const pageTitle = `Security guards in ${area.name}`;

  return (
    <InteriorPageShell
      as="article"
      surface="paper"
      className="border-b-0"
      headerTone="light"
      breadcrumbMode="seoOnly"
      suppressVisibleTitle
      breadcrumbs={[
        { href: "/service-areas", label: "Service areas" },
        { href: `/service-areas/${state}`, label: stateLabel },
        { href: `/service-areas/${state}/${slug}`, label: area.name },
      ]}
      title={pageTitle}
      contentWidth="full"
      contentPad="none"
    >
      <div className="space-y-0">
        <LandingMarketingHero
          variant="area"
          eyebrow={`${stateLabel} coverage`}
          title={pageTitle}
          subtitle={area.intro}
          imageSrc={heroImage}
          imageAlt={`Security operations context for ${area.name} — patrol and access programs.`}
          footnote={
            <span>
              Briefings cover the property archetypes you run—retail and mixed-use, corporate workplaces, logistics and
              yards, active construction, HOAs, healthcare adjacency, hospitality, and production equipment zones—so
              post orders match tenant mix and peak windows, not a one-size template.
            </span>
          }
        />

        <SectionBand tone="light" divider={false}>
          <div id="local-focus" className="scroll-mt-28">
            <ImageTextBand
              imageSrc={focusBandImage}
              imageAlt={`Local operations and patrol context in ${area.name}.`}
              imageSizes="(max-width: 1024px) 100vw, 50vw"
              imageClassName="object-cover object-center"
              imageFirst
              textTone="onLight"
              textAlign="center"
              eyebrow={
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent-dark">
                  <LocalFocusIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  Local focus
                </span>
              }
              title={`What we weight on every ${area.name} scope`}
            >
              <p className="text-foreground-on-light/95">
                These points shape post orders, supervision touchpoints, and how we pair static coverage with patrol.
              </p>
              <ChecklistColumn className="mt-6" items={area.focusBullets} tone="onLight" />
            </ImageTextBand>
          </div>
        </SectionBand>

        <SectionBand tone="light" divider={false}>
          <div id="property-types" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              align="center"
              eyebrow="Property mix"
              title="Sites and programs we support here"
              description="Archetypes we see most often—your footprint may combine several of these."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {area.commonPropertyTypes.map((t) => (
                <IconFeatureCard key={t} icon={Building2} title={t} tone="onLight" />
              ))}
            </div>
          </div>
        </SectionBand>

        <SectionBand tone="light" divider={false}>
          <div id="risks" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              eyebrow={
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent-dark">
                  <RiskIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                  Risk notes
                </span>
              }
              title="What to flag in staffing conversations"
              description="Plain-language context so procurement and field leadership stay aligned before the first shift."
            />
            <ul className="mt-8 max-w-3xl space-y-5">
              {area.riskNotes.map((r) => (
                <li key={r} className="flex gap-4 text-muted-on-light">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" aria-hidden />
                  <span className="text-sm leading-relaxed sm:text-base">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionBand>

        <SectionBand tone="light" divider={false}>
          <div id="services" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              align="center"
              eyebrow="Programs"
              title="Recommended service mix"
              description={`Pairings that fit what we typically see in ${area.name}. Final staffing always follows your hours, access points, and incident history.`}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {programSlugs.map((svcSlug) => {
                const svc = getServiceBySlug(svcSlug);
                if (!svc) return null;
                return (
                  <ProgramLinkCard
                    key={svcSlug}
                    href={`/services/${svcSlug}`}
                    title={svc.title}
                    description={svc.bestFor}
                    tone="onLight"
                  />
                );
              })}
            </div>
          </div>
        </SectionBand>

        <SectionBand tone="light" divider={false}>
          <div id="planning" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              eyebrow={
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent-dark">
                  <PlanningIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                  Checklist
                </span>
              }
              title="Planning steps that keep momentum"
              description="Forward this short list to facilities, LP, or your GC so scope conversations start with facts."
            />
            <ol className="mt-8 max-w-3xl space-y-5">
              {area.planningChecklist.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-accent-dark shadow-sm ring-1 ring-surface-light-edge"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1.5 text-sm leading-relaxed text-muted-on-light sm:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </SectionBand>

        {area.subMarkets && area.subMarkets.length > 0 ? (
          <SectionBand tone="light" divider={false}>
            <div id="submarkets" className="scroll-mt-28">
              <MarketingSectionHeader
                tone="onLight"
                align="center"
                eyebrow="Sub-markets"
                title="Neighborhood and local depth"
                description={`${area.name} is not one uniform risk profile—we tune post orders to asset type, access points, tenant mix, and peak windows.`}
              />
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {area.subMarkets.map((b) => (
                  <IconFeatureCard key={b.title} icon={MapPinned} title={b.title} tone="onLight">
                    <p>{b.body}</p>
                  </IconFeatureCard>
                ))}
              </div>
            </div>
          </SectionBand>
        ) : null}

        <SectionBand tone="light" divider={false}>
          <div id="next-step" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              align="center"
              eyebrow="Next step"
              title="Tell us how the site actually runs"
              description={area.closing}
            />
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-on-light sm:text-base">
              When you are ready to compare static posts, marked patrol, and specialized coverage for this footprint, we
              walk through the tradeoffs on your scope call—bring hours, access points, and any recent incident notes.{" "}
              <Link href="/contact" className="font-medium text-accent-dark hover:underline">
                Request a quote
              </Link>{" "}
              when you want staffing options in writing.
            </p>
          </div>
        </SectionBand>

        <SectionBand tone="light" divider={false}>
          <div id="faq" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              align="center"
              eyebrow="FAQ"
              title="Questions about coverage in this area"
              description="Short answers grounded in how we brief teams—not generic security marketing."
            />
            <div className="mx-auto mt-8 max-w-2xl">
              <FaqList showHeading={false} variant="landing" items={area.faqs} />
            </div>
          </div>
        </SectionBand>

        <section className="bg-surface-light py-16 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8 lg:px-10">
            <h2 className="text-2xl font-semibold text-foreground-on-light sm:text-3xl">
              Ready for coverage in this area?
            </h2>
            <p className="mt-4 max-w-2xl text-base text-muted-on-light sm:text-lg">
              Tell us about your site footprint and schedules—we reply with staffing options grounded in {area.name}{" "}
              realities.
            </p>
            <Button href="/contact" variant="primary" surface="light" className="mt-8 shrink-0">
              Contact Trivon Protection
            </Button>
          </div>
        </section>
      </div>
    </InteriorPageShell>
  );
}
