import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ComparisonCards } from "@/components/landing/ComparisonCards";
import { ChecklistColumn } from "@/components/landing/ChecklistColumn";
import { IconFeatureCard } from "@/components/landing/IconFeatureCard";
import { LandingMarketingHero } from "@/components/landing/LandingMarketingHero";
import { MarketingSectionHeader } from "@/components/landing/MarketingSectionHeader";
import { ProgramLinkCard } from "@/components/landing/ProgramLinkCard";
import { StaffingModelCard } from "@/components/landing/StaffingModelCard";
import { FaqList } from "@/components/FaqList";
import { ImageTextBand } from "@/components/ImageTextBand";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { JsonLd } from "@/components/JsonLd";
import { ResourceLinks } from "@/components/ResourceLinks";
import { SectionBand } from "@/components/SectionBand";
import { buildServicePageStructuredData } from "@/lib/jsonld/service-page";
import { buildMetadata, clipMetaDescription } from "@/lib/seo";
import { getScenarioIcon, getStaffingIcon } from "@/lib/service-landing-icons";
import { resolveMdxLinkPreviews } from "@/lib/mdx";
import { getRelatedServiceSlugs, getServiceBySlug, services, type ServiceCategory } from "@/lib/services";
import { serviceDetailImage, siteImages } from "@/lib/site-images";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const overviewImageForCategory = (category: ServiceCategory): string => {
  switch (category) {
    case "static":
      return siteImages.guardGrayFloor;
    case "mobile":
      return siteImages.patrol;
    case "specialized":
      return siteImages.construction;
    default:
      return siteImages.heroPrimary;
  }
};

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} in Los Angeles`,
    description: clipMetaDescription(`${service.shortDescription} ${service.bestFor}`, 158),
    path: `/services/${slug}`,
  });
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const knowledgeResources = resolveMdxLinkPreviews("knowledge", service.relatedKnowledgeSlugs);
  const blogResources = resolveMdxLinkPreviews("blog", service.relatedBlogSlugs);
  const relatedReading = [...knowledgeResources, ...blogResources];

  const relatedSlugs = getRelatedServiceSlugs(service.slug, 4);

  const pageTitle = `${service.title} in Los Angeles County`;

  return (
    <>
      <JsonLd data={buildServicePageStructuredData(service, slug, service.faqs)} />
      <InteriorPageShell
        as="article"
        surface="paper"
        className="border-b-0"
        headerPadding="compact"
        headerTone="light"
        breadcrumbMode="seoOnly"
        suppressVisibleTitle
        breadcrumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${slug}`, label: service.title },
        ]}
        title={pageTitle}
        contentWidth="full"
        contentPad="none"
      >
      <div className="space-y-0">
        <LandingMarketingHero
          variant="service"
          eyebrow="Los Angeles County program"
          title={pageTitle}
          subtitle={service.shortDescription}
          imageSrc={serviceDetailImage(slug)}
          imageAlt={`${service.title}: field operations context for Los Angeles County programs.`}
        />

        <SectionBand tone="light" divider={false}>
          <div id="overview" className="scroll-mt-28">
            <ImageTextBand
              imageSrc={overviewImageForCategory(service.category)}
              imageAlt={`${service.title}: operations context for Los Angeles County.`}
              imageSizes="(max-width: 1024px) 100vw, 50vw"
              imageClassName="object-cover object-center"
              imageFirst={false}
              textTone="onLight"
              textAlign="center"
              eyebrow={
                <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">Overview</span>
              }
              title="How this service fits Los Angeles operations"
            >
              <p>{service.whoBenefits}</p>
              <p className="text-foreground-on-light/90">
                We scope every engagement through consultation, an on-site walkthrough when it clarifies blind spots, a
                written proposal with armed or unarmed assumptions and supervision cadence, onboarding with finalized
                post orders, field leadership that replaces callouts and enforces standards, and activity reporting your
                team can review. Verticals, from retail and offices through logistics yards, construction phases,
                residential amenities, healthcare adjacency, hospitality nights, and production sets, change where we
                place emphasis; your plan reflects that mix instead of a generic lobby template.
              </p>
            </ImageTextBand>
          </div>
        </SectionBand>

        <SectionBand tone="light" divider={false}>
          <div id="scenarios" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              eyebrow="Use cases"
              title="Where this program helps"
              description="Two common Los Angeles deployments. Your site may blend elements of both."
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {service.scenarios.map((s, index) => {
                const ScenarioIcon = getScenarioIcon(slug, index);
                return (
                  <IconFeatureCard key={s.title} icon={ScenarioIcon} title={s.title} tone="onLight">
                    {s.body}
                  </IconFeatureCard>
                );
              })}
            </div>
          </div>
        </SectionBand>

        <SectionBand tone="light" divider={false}>
          <div id="deliverables" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              align="center"
              eyebrow="Deliverables"
              title="What you should expect on paper and in the field"
              description="Clear documentation and supervision touchpoints, not vague ‘security presence’ language."
            />
            <div className="mt-8 flex justify-center">
              <ChecklistColumn className="max-w-2xl" items={service.deliverables} tone="onLight" />
            </div>
            <p className="mt-8 text-center text-sm leading-relaxed text-muted-on-light sm:text-base">
              <span className="font-medium text-foreground-on-light">Day-to-day highlights: </span>
              <span>{service.highlights.join(" · ")}</span>
            </p>
          </div>
        </SectionBand>

        <SectionBand tone="light" divider={false}>
          <div id="staffing" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              eyebrow="Staffing models"
              title="How we structure coverage before the first shift"
              description="Models map to hours, geography, and how much continuous access control you truly need."
            />
            <div className="mt-8 grid gap-4 sm:gap-5">
              {service.staffingModels.map((m, index) => {
                const StaffIcon = getStaffingIcon(index, m.label);
                return (
                  <StaffingModelCard
                    key={m.label}
                    icon={StaffIcon}
                    label={m.label}
                    description={m.description}
                    tone="onLight"
                  />
                );
              })}
            </div>
          </div>
        </SectionBand>

        {service.decisionAid ? (
          <SectionBand tone="light" divider={false}>
            <div id="decision" className="scroll-mt-28">
              <MarketingSectionHeader
                tone="onLight"
                align="center"
                eyebrow="Compare"
                title={service.decisionAid.title}
                description="Same facts, two program shapes, pick the posture that matches your risk and public interaction."
              />
              <div className="mt-8">
                <ComparisonCards
                  headers={service.decisionAid.headers}
                  rows={service.decisionAid.rows}
                  tone="onLight"
                />
              </div>
            </div>
          </SectionBand>
        ) : null}

        <SectionBand tone="light" divider={false}>
          <div id="considerations" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              eyebrow="Fit and tradeoffs"
              title="When a different program may be smarter"
              description="Honest boundaries help you avoid paying for the wrong posture, or under-scoping something critical."
            />
            <ul className="mt-8 max-w-3xl space-y-5">
              {service.considerations.map((c) => (
                <li key={c} className="flex gap-4 text-muted-on-light">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" aria-hidden />
                  <span className="text-sm leading-relaxed sm:text-base">{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-muted-on-light sm:text-base">
              Still unsure?{" "}
              <Link href="/contact" className="font-medium text-accent-dark hover:underline">
                Email or call with your site context
              </Link>
              . We respond with realistic options, not a generic brochure.
            </p>
          </div>
        </SectionBand>

        <SectionBand tone="light" divider={false}>
          <div id="faq" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              align="center"
              eyebrow="FAQ"
              title="Questions teams ask before they buy"
              description="Straight answers about how we scope, deploy, and report in Los Angeles County."
            />
            <div className="mx-auto mt-8 max-w-2xl">
              <FaqList showHeading={false} variant="landing" items={service.faqs} />
            </div>
          </div>
        </SectionBand>

        {relatedReading.length > 0 ? (
          <SectionBand tone="light" divider={false}>
            <ResourceLinks id="reading" align="center" title="Further reading" items={relatedReading} tone="light" />
          </SectionBand>
        ) : null}

        <SectionBand tone="light" divider={false}>
          <section id="related-services" className="scroll-mt-28">
            <MarketingSectionHeader
              tone="onLight"
              align="center"
              eyebrow="Programs"
              title="Related services"
              description="Los Angeles sites often blend static posts, patrol, and specialized coverage in one footprint."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {relatedSlugs.map((relatedSlug) => {
                const s = getServiceBySlug(relatedSlug);
                if (!s) return null;
                return (
                  <ProgramLinkCard
                    key={relatedSlug}
                    href={`/services/${relatedSlug}`}
                    title={s.title}
                    description={s.bestFor}
                    tone="onLight"
                  />
                );
              })}
            </div>
          </section>
        </SectionBand>

        <section className="bg-surface-light py-16 sm:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8 lg:px-10">
            <h2 className="text-2xl font-semibold text-foreground-on-light sm:text-3xl">Ready for a quote?</h2>
            <p className="mt-4 max-w-2xl text-base text-muted-on-light sm:text-lg">
              Share hours, access points, and incident history. We respond with realistic staffing options for{" "}
              {service.title.toLowerCase()} programs in Los Angeles County.
            </p>
            <Button href="/contact" variant="primary" surface="light" className="mt-8 shrink-0">
              Contact Trivon Protection
            </Button>
          </div>
        </section>
      </div>
    </InteriorPageShell>
    </>
  );
}
