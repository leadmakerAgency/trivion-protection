import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ContentProse } from "@/components/ContentProse";
import { FaqList } from "@/components/FaqList";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { PageAside } from "@/components/PageAside";
import { ResourceLinks } from "@/components/ResourceLinks";
import { SectionBand } from "@/components/SectionBand";
import { buildMetadata } from "@/lib/seo";
import { resolveMdxLinkPreviews } from "@/lib/mdx";
import { getServiceBySlug, services } from "@/lib/services";
import { serviceDetailImage } from "@/lib/site-images";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} in Los Angeles`,
    description: `${service.shortDescription} ${service.whoBenefits.slice(0, 140)}…`,
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

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "scenarios", label: "Where it helps" },
    { id: "deliverables", label: "What you receive" },
    { id: "staffing", label: "Staffing models" },
    ...(service.decisionAid ? [{ id: "decision", label: service.decisionAid.title }] : []),
    { id: "considerations", label: "Fit and tradeoffs" },
    { id: "faq", label: "FAQ" },
    ...(relatedReading.length ? [{ id: "reading", label: "Further reading" }] : []),
    { id: "related-services", label: "Related services" },
  ];

  return (
    <InteriorPageShell
      as="article"
      headerPadding="compact"
      breadcrumbs={[
        { href: "/services", label: "Services" },
        { href: `/services/${slug}`, label: service.title },
      ]}
      title={`${service.title} in Los Angeles County`}
      description={service.shortDescription}
      descriptionClassName="text-lg leading-relaxed"
      headerActions={
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" variant="primary">
            Request a quote
          </Button>
          <Button href="/service-areas/california/los-angeles-county" variant="secondary">
            Los Angeles County coverage
          </Button>
          <Button href="/industries" variant="secondary">
            Industries we serve
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
          imageSrc={serviceDetailImage(slug)}
          imageAlt={`${service.title} — field operations context for Los Angeles County programs.`}
          imageSizes="(max-width: 1024px) 100vw, min(896px, 75vw)" 
          imageClassName="object-cover object-center"
        >
          <div className="max-w-3xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Program snapshot</p>
            <p className="mt-4 text-lg leading-relaxed text-muted">{service.shortDescription}</p>
          </div>
        </SectionBand>

        <ContentProse id="overview" title="How this service fits Los Angeles operations">
          <p>{service.whoBenefits}</p>
          <p className="text-foreground/90">
            Looking for procurement guidance first? See{" "}
            <Link className="font-medium text-accent hover:underline" href="/our-process">
              our process
            </Link>{" "}
            or browse{" "}
            <Link className="font-medium text-accent hover:underline" href="/knowledge">
              knowledge articles
            </Link>{" "}
            before you scope posts.
          </p>
        </ContentProse>

        <section id="scenarios">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Where this program helps</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {service.scenarios.map((s) => (
              <div key={s.title} className="rounded-sm border border-edge bg-card p-5">
                <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="deliverables">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">What you should expect on paper and in the field</h2>
          <ul className="mt-4 space-y-2 rounded-sm border border-edge bg-card p-5 text-sm leading-relaxed text-muted">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="font-semibold text-accent" aria-hidden>
                  ·
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Highlights from your post orders day to day:{" "}
            <span className="text-foreground/90">{service.highlights.join(" · ")}</span>
          </p>
        </section>

        <section id="staffing">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Staffing models we plan against</h2>
          <div className="mt-4 space-y-4">
            {service.staffingModels.map((m) => (
              <div key={m.label} className="rounded-sm border border-edge bg-panel px-4 py-3">
                <h3 className="text-base font-semibold text-foreground">{m.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {service.decisionAid ? (
          <section id="decision">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{service.decisionAid.title}</h2>
            <div className="mt-4 overflow-x-auto rounded-sm border border-edge">
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-edge bg-panel">
                    <th className="px-3 py-2 font-semibold text-foreground">{service.decisionAid.headers[0]}</th>
                    <th className="px-3 py-2 font-semibold text-foreground">{service.decisionAid.headers[1]}</th>
                    <th className="px-3 py-2 font-semibold text-foreground">{service.decisionAid.headers[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {service.decisionAid.rows.map((row) => (
                    <tr key={row.feature} className="border-b border-edge last:border-b-0">
                      <td className="px-3 py-2 font-medium text-foreground">{row.feature}</td>
                      <td className="px-3 py-2 text-muted">{row.left}</td>
                      <td className="px-3 py-2 text-muted">{row.right}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <section id="considerations">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">When a different program may be smarter</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted">
            {service.considerations.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Still unsure?{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">
              Email or call with your site context
            </Link>{" "}
            — we respond with realistic options, not a generic brochure.
          </p>
        </section>

        <FaqList id="faq" items={service.faqs} />

        {relatedReading.length > 0 ? (
          <ResourceLinks id="reading" title="Further reading" items={relatedReading} />
        ) : null}

        <section id="related-services">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Related services</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Many Los Angeles programs combine services—static coverage plus patrol, construction access control plus
            fire watch, or warehouse gates plus yard routes.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <li key={s.slug}>
                  <Link
                    className="block rounded-sm border border-edge bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-panel hover:underline"
                    href={`/services/${s.slug}`}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </InteriorPageShell>
  );
}
