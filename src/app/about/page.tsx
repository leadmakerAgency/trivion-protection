import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  TbArrowRight,
  TbCertificate,
  TbClipboardList,
  TbMail,
  TbMapPin,
  TbPhone,
  TbShieldCheck,
} from "react-icons/tb";
import { Button } from "@/components/Button";
import { ImageTextBand } from "@/components/ImageTextBand";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";
import { OUR_PROCESS_STEPS } from "@/lib/our-process";
import { getSiteAddressLines, getSiteContactEmail, getSitePhoneRaw, getSiteTelHref, SITE_NAME } from "@/lib/site";
import { siteImages } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: `About ${SITE_NAME}`,
  description:
    "Learn how Trivon Protection delivers Los Angeles County security guard programs: supervision, BSIS-aligned licensing, reporting, and field leadership built for retail, logistics, construction, and corporate sites.",
  path: "/about",
});

const pillars = [
  {
    Icon: TbShieldCheck,
    title: "Accountability in the field",
    body:
      "Uniforms and a warm body are not a program. We build post orders, checkpoints, and supervision cadence so coverage is repeatable, especially across nights, weekends, and high-turnover environments.",
  },
  {
    Icon: TbClipboardList,
    title: "Reporting your team can use",
    body:
      "Daily activity logs, incident documentation, and escalation notes should help property and operations leaders make decisions, not sit unread in an inbox. We align formats to how you already review risk.",
  },
  {
    Icon: TbCertificate,
    title: "California compliance, clearly packaged",
    body:
      "Private security in California is regulated through BSIS requirements. We keep credentials and insurance confirmations organized for your procurement and legal partners with no placeholder license numbers on the web.",
  },
] as const;

const processPreview = OUR_PROCESS_STEPS.slice(0, 3);

const AboutPage = () => {
  const addressLines = getSiteAddressLines();
  const email = getSiteContactEmail();
  const phoneDisplay = getSitePhoneRaw();
  const telHref = getSiteTelHref();

  return (
    <InteriorPageShell
      surface="paper"
      contentWidth="wide"
      breadcrumbs={[{ href: "/about", label: "About" }]}
      title="About Trivon Protection"
      description={`${SITE_NAME} is a Los Angeles County security guard company built for operators who need programs that are easy to run: clear post orders, consistent supervision, and documentation that holds up when something goes wrong.`}
      contentClassName="space-y-16 sm:space-y-20 pb-20 text-sm leading-relaxed text-muted-on-light"
    >
      <section
        aria-label="Contact and related pages"
        className="rounded-xl border border-surface-light-edge bg-surface-light p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-on-light">At a glance</p>
            <ul className="mt-4 space-y-4 text-sm text-foreground-on-light">
              <li className="flex gap-3">
                <TbMapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" aria-hidden />
                <span className="space-y-1">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              {phoneDisplay ? (
                <li className="flex gap-3">
                  <TbPhone className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" aria-hidden />
                  {telHref ? (
                    <a className="font-medium hover:underline" href={telHref}>
                      {phoneDisplay}
                    </a>
                  ) : (
                    <span>{phoneDisplay}</span>
                  )}
                </li>
              ) : null}
              <li className="flex gap-3">
                <TbMail className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" aria-hidden />
                <a className="font-medium hover:underline" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="Related pages">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-on-light">Explore</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
                { href: "/services", label: "Services" },
                { href: "/industries", label: "Industries" },
                { href: "/service-areas", label: "Service areas" },
                { href: "/knowledge", label: "Knowledge base" },
                { href: "/careers", label: "Careers" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 font-medium text-accent-dark hover:underline"
                  >
                    {label}
                    <TbArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <ImageTextBand
        imageSrc={siteImages.teamPersonnel}
        imageAlt="Security professionals in uniform coordinating near a commercial building, team-based coverage and supervised field operations."
        imageSizes="(max-width: 1024px) 100vw, 40vw"
        imageClassName="object-cover object-[center_35%]"
        textTone="onLight"
        eyebrow={
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">Who we are</p>
        }
        title="Security that fits how Los Angeles properties operate"
      >
        <p>
          From retail edges and parking structures to logistics yards and construction phases, risk shows up as
          patterns: inconsistent patrol timing, unclear access rules, and reporting that does not reach the right
          people. We design programs around your hours, traffic flows, and tenant mix, then staff with leadership that
          enforces standards on shift.
        </p>
        <p>
          Our bias is toward clarity: armed and unarmed posts, mobile patrol routes, fire watch, and warehouse programs
          should all feel like one accountable vendor relationship, not a patchwork of personalities you have to manage
          yourself.
        </p>
      </ImageTextBand>

      <section aria-labelledby="pillars-heading">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">What we stand for</p>
          <h2
            id="pillars-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground-on-light sm:text-4xl"
          >
            Principles that shape every engagement
          </h2>
          <p className="mt-4 text-base leading-relaxed sm:text-lg">
            Whether you are standing up a new site or replacing a vendor that faded on supervision, these are the
            non-negotiables behind how we scope work and run the field.
          </p>
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ Icon, title, body }) => (
            <li
              key={title}
              className="flex flex-col gap-4 rounded-xl border border-surface-light-edge bg-white p-6 shadow-sm"
            >
              <Icon className="h-9 w-9 shrink-0 text-accent-dark" aria-hidden />
              <div>
                <h3 className="text-lg font-semibold text-foreground-on-light">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-on-light">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="overflow-hidden rounded-xl border border-surface-light-edge bg-surface-light shadow-sm"
        aria-labelledby="process-heading"
      >
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">How we work with you</p>
            <h2
              id="process-heading"
              className="mt-3 text-2xl font-semibold tracking-tight text-foreground-on-light sm:text-3xl"
            >
              From first conversation to steady-state operations
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-on-light">
              Good security procurement is not a single quote; it is alignment on hours, escalation paths, and what
              “good” looks like on paper and on camera. We walk sites when it helps, push back when assumptions are
              unsafe, and document the plan before boots are on the ground.
            </p>
            <ol className="mt-8 space-y-5">
              {processPreview.map((step, index) => (
                <li key={step.name} className="flex gap-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-surface-light-edge bg-white text-sm font-semibold text-accent-dark"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground-on-light">{step.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-on-light">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-muted-on-light">
              See the full lifecycle, including onboarding, supervision, and review cadence, on our{" "}
              <Link href="/#our-process" className="font-medium text-accent-dark hover:underline">
                homepage process section
              </Link>
              .
            </p>
          </div>
          <div className="relative min-h-[220px] lg:min-h-full">
            <Image
              src={siteImages.corporateAccess}
              alt="Corporate building lobby and access control context, professional environments where clear visitor rules and guard presence reduce incidents."
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2 lg:gap-12" aria-labelledby="licensing-heading">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">Licensing & insurance</p>
          <h2
            id="licensing-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-foreground-on-light sm:text-3xl"
          >
            Built for California procurement standards
          </h2>
          <p className="mt-4 text-base leading-relaxed">
            BSIS licensing, workers’ compensation, and liability coverage are baseline expectations for any serious
            vendor. We treat your risk transfer chain seriously: when you request a proposal packet, you receive the
            documentation your finance and legal teams expect, not marketing fluff.
          </p>
          <p className="mt-4 text-base leading-relaxed">
            If you have carrier-specific insurance certificates, additional insured language, or vendor onboarding
            questionnaires, bring them early. It is faster to resolve paperwork before start dates than during the first
            week of coverage.
          </p>
        </div>
        <div className="rounded-xl border border-surface-light-edge bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-lg font-semibold text-foreground-on-light">Who we tend to serve best</h3>
          <p className="mt-3 text-base leading-relaxed text-muted-on-light">
            We are strongest with teams that want a partner who can speak the language of operations: property managers,
            logistics leaders, construction supers, and corporate facilities groups across Los Angeles County who need
            predictable communication when something happens after hours.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-on-light">
            <li>Retail, mixed-use, and parking-adjacent sites with public foot traffic</li>
            <li>Warehouses, truck courts, and distribution edges targeted for organized theft</li>
            <li>Construction phases where access control and fire watch requirements shift weekly</li>
            <li>Corporate campuses and multi-tenant buildings that need polished front-desk presence</li>
          </ul>
          <p className="mt-6 text-sm text-muted-on-light">
            Browse{" "}
            <Link href="/industries" className="font-medium text-accent-dark hover:underline">
              industries
            </Link>{" "}
            and{" "}
            <Link href="/services" className="font-medium text-accent-dark hover:underline">
              program pages
            </Link>{" "}
            for scenarios that map to your property.
          </p>
        </div>
      </section>

      <section
        className="flex flex-col gap-6 rounded-xl border border-surface-light-edge bg-white px-6 py-8 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-2xl">
          <h2 id="cta-heading" className="text-2xl font-semibold tracking-tight text-foreground-on-light sm:text-3xl">
            Tell us about your site
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-on-light">
            Share hours, access rules, and what has gone wrong before. We will respond with a practical staffing approach
            and next steps.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button href="/contact" variant="primary" surface="light">
            Request a quote
          </Button>
          <Button href="/services" variant="secondary" surface="light">
            View services
          </Button>
        </div>
      </section>
    </InteriorPageShell>
  );
};

export default AboutPage;
