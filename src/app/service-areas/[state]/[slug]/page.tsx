import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { FaqList } from "@/components/FaqList";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { PageAside } from "@/components/PageAside";
import { SectionBand } from "@/components/SectionBand";
import { buildMetadata } from "@/lib/seo";
import { allAreas, type ServiceAreaState } from "@/lib/areas";
import { getServiceBySlug } from "@/lib/services";
import { siteImages } from "@/lib/site-images";

type PageProps = {
  params: Promise<{ state: string; slug: string }>;
};

const isState = (value: string): value is ServiceAreaState =>
  value === "california" || value === "texas";

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

  const toc = [
    { id: "local-focus", label: "Local focus" },
    { id: "property-types", label: "Property types" },
    { id: "risks", label: "Risk notes" },
    { id: "services", label: "Recommended services" },
    { id: "planning", label: "Planning checklist" },
    ...(area.subMarkets?.length ? [{ id: "submarkets", label: "Local depth" }] : []),
    { id: "next-step", label: "Next step" },
    { id: "faq", label: "FAQ" },
    { id: "popular-services", label: "Popular services" },
  ];

  return (
    <InteriorPageShell
      as="article"
      breadcrumbs={[
        { href: "/service-areas", label: "Service areas" },
        { href: `/service-areas/${state}`, label: stateLabel },
        { href: `/service-areas/${state}/${slug}`, label: area.name },
      ]}
      title={`Security guards in ${area.name}`}
      description={area.intro}
      descriptionClassName="text-lg leading-relaxed"
      headerActions={
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" variant="primary">
            Request a quote
          </Button>
          <Button href="/services" variant="secondary">
            View services
          </Button>
          <Button href="/industries#retail-mixed-use" variant="secondary">
            Industries
          </Button>
        </div>
      }
      sidebar={<PageAside toc={toc} />}
    >
      <div className="space-y-12 pt-2">
        <SectionBand
          tone="darkImage"
          className="!py-0 sm:!py-0"
          innerClassName="max-w-none px-0 sm:px-0 lg:px-0"
          imageSrc={heroImage}
          imageAlt={`Security operations context for ${area.name} — patrol and access programs.`}
          imageSizes="(max-width: 1024px) 100vw, min(896px, 75vw)"
          imageClassName="object-cover object-[center_40%]"
        >
          <div className="max-w-3xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Field context</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              How we plan coverage in {area.name}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Property mixes, risk notes, and service pairings below mirror how we brief teams before deployment.
            </p>
          </div>
        </SectionBand>

        <section id="local-focus">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Local focus points</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted">
            {area.focusBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        <section id="property-types">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Property types we often support</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {area.commonPropertyTypes.map((t) => (
              <li key={t} className="rounded-sm border border-edge bg-card px-3 py-2 text-sm text-foreground/90">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section id="risks">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Risk notes for staffing conversations</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {area.riskNotes.map((r) => (
              <li key={r} className="border-l-2 border-accent pl-3">
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section id="services">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Recommended service mix</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            These programs pair well with what we typically see in {area.name}. Final staffing always follows your
            hours, access points, and incident history.
          </p>
          <ul className="mt-4 space-y-2">
            {area.recommendedServiceSlugs.map((svcSlug) => {
              const svc = getServiceBySlug(svcSlug);
              if (!svc) return null;
              return (
                <li key={svcSlug}>
                  <Link
                    href={`/services/${svcSlug}`}
                    className="block rounded-sm border border-edge bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-panel"
                  >
                    <span className="text-foreground">{svc.title}</span>
                    <span className="mt-1 block text-xs font-normal text-muted">{svc.bestFor}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="planning">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Planning checklist</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm leading-relaxed text-muted">
            {area.planningChecklist.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        {area.subMarkets && area.subMarkets.length > 0 ? (
          <section id="submarkets">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Neighborhood and sub-market coverage
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {area.name} is not one uniform risk profile. We tune post orders to asset type, access points, tenant
              mix, and peak windows.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {area.subMarkets.map((b) => (
                <div key={b.title} className="rounded-sm border border-edge bg-card p-5">
                  <h3 className="text-lg font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{b.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section id="next-step">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Next step</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{area.closing}</p>
        </section>

        <FaqList id="faq" items={area.faqs} />

        <section id="popular-services">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Popular services in this region</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            <li>
              <Link className="text-accent hover:underline" href="/services/unarmed-security-guards">
                Unarmed security guards
              </Link>
            </li>
            <li>
              <Link className="text-accent hover:underline" href="/services/marked-vehicle-patrol-security">
                Marked vehicle patrol security
              </Link>
            </li>
            <li>
              <Link className="text-accent hover:underline" href="/services/construction-site-security-guards">
                Construction site security guards
              </Link>
            </li>
            <li>
              <Link className="text-accent hover:underline" href="/services/warehouse-security-guards">
                Warehouse security guards
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </InteriorPageShell>
  );
}
