import Image from "next/image";
import Link from "next/link";
import {
  TbBuildingSkyscraper,
  TbBuildingWarehouse,
  TbCar4Wd,
  TbClipboardCheck,
  TbClock,
  TbCrane,
  TbHeartRateMonitor,
  TbHomeShield,
  TbMapPin,
  TbMovie,
  TbPhoneCall,
  TbReportSearch,
  TbShieldCheck,
  TbShoppingCart,
  TbTruckDelivery,
} from "react-icons/tb";
import { Button } from "@/components/Button";
import { FaqList } from "@/components/FaqList";
import { ImageTextBand } from "@/components/ImageTextBand";
import { JsonLd } from "@/components/JsonLd";
import { SectionBand } from "@/components/SectionBand";
import { StatStrip } from "@/components/StatStrip";
import { homeFaq } from "@/lib/faq";
import { services } from "@/lib/services";
import { californiaAreas, texasAreas } from "@/lib/areas";
import { homeDescription, homeTitle } from "@/lib/seo";
import { siteImages } from "@/lib/site-images";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const trustItems: { text: string; Icon: typeof TbClipboardCheck }[] = [
  {
    Icon: TbClipboardCheck,
    text: "California-licensed professionals (details confirmed on proposal)",
  },
  {
    Icon: TbReportSearch,
    text: "Supervision, reporting, and clear escalation paths",
  },
  {
    Icon: TbBuildingSkyscraper,
    text: "Programs for retail, logistics, construction, HOAs, and corporate sites",
  },
];

const industryTiles: { label: string; href: string; Icon: typeof TbShoppingCart }[] = [
  { label: "Retail and mixed-use", href: "/industries#retail-mixed-use", Icon: TbShoppingCart },
  { label: "Corporate offices", href: "/industries#corporate-offices", Icon: TbBuildingSkyscraper },
  { label: "Warehouses and logistics", href: "/industries#industrial-warehouse", Icon: TbTruckDelivery },
  { label: "Construction sites", href: "/industries#construction", Icon: TbCrane },
  { label: "Residential communities / HOAs", href: "/industries#residential-hoa", Icon: TbHomeShield },
  { label: "Healthcare and clinics", href: "/industries#healthcare", Icon: TbHeartRateMonitor },
  { label: "Hospitality", href: "/industries#hospitality", Icon: TbBuildingWarehouse },
  { label: "Film and production support", href: "/industries#film-production", Icon: TbMovie },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="border-b border-edge bg-background">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2 lg:items-stretch">
          <div className="order-2 flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:order-1 lg:px-10 lg:py-20">
            <div className="max-w-2xl xl:max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent sm:text-base">
                Security guard company — Los Angeles County
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Los Angeles security guards with a disciplined, field-first approach
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
                Trivon Protection helps businesses reduce theft, trespass, and disruption through
                professional armed and unarmed coverage, marked patrol programs, fire watch, and
                post orders your team can run day to day.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/contact" variant="primary">
                  Get a quote
                </Button>
                <Button href="/services" variant="secondary">
                  Explore services
                </Button>
              </div>
            </div>
          </div>
          <div className="relative order-1 min-h-[220px] sm:min-h-[280px] lg:order-2 lg:min-h-[min(100vh-8rem,640px)]">
            <Image
              src={siteImages.heroPrimary}
              alt="Uniformed security guard at a commercial building entrance—access control for businesses and multi-tenant sites."
              fill
              priority
              className="object-cover object-[center_35%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <SectionBand tone="light" id="why-trivon">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">Why operators choose Trivon</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground-on-light sm:text-4xl">
            Field programs built for how Los Angeles sites actually run
          </h2>
        </div>
        <ul className="mt-12 grid gap-10 sm:grid-cols-3">
          {trustItems.map(({ text, Icon }) => (
            <li key={text} className="flex flex-col gap-3 border-t border-surface-light-edge pt-6 sm:border-t-0 sm:pt-0">
              <Icon className="h-8 w-8 shrink-0 text-accent-dark" aria-hidden />
              <p className="text-base leading-relaxed text-muted-on-light">{text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact" surface="light" variant="primary">
            Get a quote
          </Button>
          <Button href="/our-process" surface="light" variant="secondary">
            How we onboard
          </Button>
        </div>
      </SectionBand>

      <SectionBand
        tone="darkImage"
        imageSrc={siteImages.guardNightStreet}
        imageAlt="Security officer on an urban street at night—overnight visibility and patrol-ready posture."
        imageSizes="100vw"
        imageClassName="object-cover object-[center_40%]"
      >
        <div className="max-w-3xl py-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Overnight & logistics</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Coverage that respects truck courts, laydown yards, and after-hours risk
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Organized theft and trespass often follow predictable patterns—quiet windows, blind corners, and
            inconsistent patrol timing. We align posts, routes, and reporting with your receiving hours and
            access rules so leadership sees security that matches operations.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            From industrial corridors to mixed-use edges, we staff with clear escalation paths and documentation
            your insurer and legal partners can follow.
          </p>
          <div className="mt-8">
            <Button href="/services/warehouse-security-guards" variant="secondary">
              Warehouse security
            </Button>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">Services</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground-on-light sm:text-5xl">
            Security guard services designed for real Los Angeles risk profiles
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-on-light">
            Choose a service to see typical post duties, ideal industries, and how we align staffing to your hours
            and access points.
          </p>
        </div>
        <div className="mt-12">
          <div className="relative mb-12 aspect-[21/9] max-h-[280px] overflow-hidden rounded-sm border border-surface-light-edge shadow-sm sm:max-h-[320px]">
            <Image
              src={siteImages.guardParkingLot}
              alt="Uniformed security officer beside a vehicle on asphalt—mobile patrol, parking structures, and route-based checks."
              fill
              className="object-cover object-[center_55%]"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div
              className="absolute inset-y-0 left-0 z-[1] w-[min(52%,20rem)] bg-surface-light sm:w-[min(45%,24rem)]"
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 z-[2] flex items-center gap-2 rounded-sm border border-surface-light-edge bg-white px-3 py-2 text-foreground-on-light shadow-sm">
              <TbCar4Wd className="h-7 w-7 shrink-0 text-accent-dark" aria-hidden />
              <span className="max-w-[12rem] text-xs font-semibold uppercase leading-tight tracking-wide text-muted-on-light">
                Mobile & marked patrol
              </span>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-sm border border-surface-light-edge bg-white px-6 py-6 shadow-sm transition-colors hover:border-accent-dark/35"
              >
                <h3 className="text-xl font-semibold text-foreground-on-light group-hover:underline">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-foreground-on-light/90">{s.bestFor}</p>
                <p className="mt-3 text-base leading-relaxed text-muted-on-light">{s.shortDescription}</p>
                <p className="mt-5 text-base font-semibold text-accent-dark">Open the full guide</p>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/services" surface="light" variant="secondary">
              All services
            </Button>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="dark">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Operations</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What you can expect from our field programs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We avoid vanity metrics. Below are practical commitments we build proposals around—specific numbers
            vary by site and are confirmed in writing.
          </p>
        </div>
        <div className="mt-12">
          <StatStrip
            items={[
              {
                icon: <TbMapPin />,
                headline: "Los Angeles County",
                label: "California-first programs with regional playbooks when you operate in multiple metros.",
              },
              {
                icon: <TbPhoneCall />,
                headline: "24/7 coordination line",
                label: "A staffed path for urgent shift changes, incidents, and escalation—not a dead voicemail box.",
              },
              {
                icon: <TbClock />,
                headline: "Hours matched to your operation",
                label: "Static posts, randomized patrol routes, and fire watch built around your real peak windows.",
              },
              {
                icon: <TbShieldCheck />,
                headline: "Supervised deployments",
                label: "Field leadership, spot checks, and replacement coverage when callouts happen.",
              },
            ]}
          />
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <ImageTextBand
          imageSrc={siteImages.construction}
          imageAlt="Crews in hard hats on an active construction site—gate control, delivery verification, and perimeter coverage for building projects."
          imageSizes="(max-width: 1024px) 100vw, 45vw"
          imageFirst={false}
          eyebrow={
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">Industries</p>
          }
          title="Where Trivon Protection is strongest in Los Angeles County"
        >
          <p>
            Construction and industrial programs need disciplined gate control, delivery verification, and
            after-hours integrity checks—not generic lobby templates. The same field-first mindset extends to
            retail, corporate, and HOA sites where reporting and supervision have to match how your operation
            actually runs.
          </p>
        </ImageTextBand>
        <div className="mt-12 flex flex-wrap gap-2">
          {industryTiles.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              className="focus-ring-on-light inline-flex items-center gap-2 rounded-full border border-surface-light-edge bg-white px-4 py-2 text-sm font-medium text-foreground-on-light shadow-sm hover:border-accent-dark/40 hover:text-accent-dark"
            >
              <Icon className="h-4 w-4 shrink-0 text-accent-dark" aria-hidden />
              {label}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/industries" surface="light" variant="secondary">
            View industries we serve
          </Button>
        </div>
      </SectionBand>

      <SectionBand tone="dark">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Service areas</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            California-first coverage with Texas regional programs
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Explore county and metro pages for localized intent—each page links back to core services so visitors
            (and search engines) understand what you offer on the ground.
          </p>
        </div>
        <div className="mt-12 grid gap-12 border-t border-edge pt-12 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground">California</h3>
            <ul className="mt-4 grid gap-2 text-base">
              {californiaAreas.map((a) => (
                <li key={a.slug}>
                  <Link className="text-muted hover:text-accent hover:underline" href={`/service-areas/california/${a.slug}`}>
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href="/service-areas/california" variant="primary">
                All areas in California
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Texas</h3>
            <p className="mt-3 text-base text-muted">
              Regional programs for operators with multi-state footprints. If your scope is primarily Los Angeles,
              start with a California plan—we align reporting and supervision expectations across regions when
              needed.
            </p>
            <ul className="mt-4 grid gap-2 text-base">
              {texasAreas.map((a) => (
                <li key={a.slug}>
                  <Link className="text-muted hover:text-accent hover:underline" href={`/service-areas/texas/${a.slug}`}>
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href="/service-areas/texas" variant="secondary">
                All areas in Texas
              </Button>
            </div>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="light">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">Process</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground-on-light sm:text-4xl">
            A straightforward onboarding path from first call to first shift
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-on-light">
            We keep procurement simple: clear scope, documented post orders, and accountable field leadership.
          </p>
        </div>
        <ol className="mt-10 max-w-4xl divide-y divide-surface-light-edge border-t border-surface-light-edge">
          {[
            {
              title: "Discovery and risk review",
              body: "We align on hours, access points, incident history, and reporting expectations.",
            },
            {
              title: "Proposal and staffing plan",
              body: "You get a practical schedule with armed/unarmed recommendations—not generic filler.",
            },
            {
              title: "Deployment and supervision",
              body: "We onboard your team, set communication channels, and maintain quality checks.",
            },
          ].map((step, idx) => (
            <li key={step.title} className="flex gap-6 py-8 first:pt-6">
              <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark">Step {idx + 1}</span>
              <div>
                <h3 className="text-xl font-semibold text-foreground-on-light">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-on-light">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-4">
          <Button href="/our-process" surface="light" variant="ghost" className="px-0 text-accent-dark hover:bg-transparent">
            Read our full process
          </Button>
        </div>
      </SectionBand>

      <SectionBand tone="light" innerClassName="max-w-5xl">
        <FaqList id="faq" variant="light" title="Frequently asked questions" items={homeFaq} />
      </SectionBand>

      <section className="border-t border-edge bg-background py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8 lg:px-10">
          <div>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Ready for a quote?</h2>
            <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
              Tell us about your site(s), hours, and risks. We will respond with realistic options for Los Angeles
              County security guard coverage.
            </p>
          </div>
          <Button href="/contact" variant="primary" className="shrink-0">
            Contact Trivon Protection
          </Button>
        </div>
      </section>
    </>
  );
}
