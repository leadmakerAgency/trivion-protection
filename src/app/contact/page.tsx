import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { parseAreaKey } from "@/lib/contact-payload";
import { allAreas, getArea } from "@/lib/areas";
import { buildMetadata } from "@/lib/seo";
import {
  getSiteAddressLines,
  getSiteContactEmail,
  getSitePhoneRaw,
  getSiteTelHref,
} from "@/lib/site";
import { getServiceBySlug, services } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Contact: request a security quote",
  description:
    "Contact Trivon Protection for Los Angeles County security guards: armed and unarmed posts, patrol, fire watch, construction, and warehouse programs.",
  path: "/contact",
});

type PageProps = {
  searchParams: Promise<{ service?: string | string[]; area?: string | string[] }>;
};

const firstParam = (value: string | string[] | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const serviceParam = firstParam(sp.service)?.trim();
  const areaParam = firstParam(sp.area)?.trim();

  const defaultServiceSlug =
    serviceParam && getServiceBySlug(serviceParam) ? serviceParam : undefined;

  let defaultAreaKey: string | undefined;
  if (areaParam) {
    const parsed = parseAreaKey(areaParam);
    if (parsed && getArea(parsed.state, parsed.slug)) {
      defaultAreaKey = `${parsed.state}:${parsed.slug}`;
    }
  }

  const email = getSiteContactEmail();
  const telHref = getSiteTelHref();
  const addressLines = getSiteAddressLines();

  const serviceOptions = services.map(({ slug, title }) => ({ slug, title }));
  const areaOptions = allAreas.map(({ state, slug, name }) => ({ state, slug, name }));

  return (
    <InteriorPageShell
      surface="paper"
      breadcrumbs={[{ href: "/contact", label: "Contact" }]}
      title="Contact"
      description={
        <p>
          For quote requests or program questions, use the form below or reach us using the phone or email in this
          page. Include site location, coverage hours, and the type of program you need so we can respond quickly.
        </p>
      }
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <section
          aria-labelledby="contact-form-heading"
          className="rounded-xl border border-surface-light-edge bg-surface-light p-6 text-sm leading-relaxed text-muted-on-light shadow-sm"
        >
          <h2 id="contact-form-heading" className="text-lg font-semibold text-foreground-on-light">
            Request a quote
          </h2>
          <p className="mt-2 text-muted-on-light">
            Required fields are marked with an asterisk. We route submissions to our team for follow-up.
          </p>
          <div className="mt-6">
            <ContactForm
              services={serviceOptions}
              areas={areaOptions}
              defaultServiceSlug={defaultServiceSlug}
              defaultAreaKey={defaultAreaKey}
            />
          </div>
        </section>

        <section
          aria-labelledby="contact-methods-heading"
          className="space-y-6 rounded-xl border border-surface-light-edge bg-surface-light p-6 text-sm leading-relaxed text-muted-on-light shadow-sm"
        >
          <h2 id="contact-methods-heading" className="text-lg font-semibold text-foreground-on-light">
            How to reach us
          </h2>
          <ul className="space-y-3">
            <li>
              <span className="font-medium text-foreground-on-light">Email: </span>
              <a
                href={`mailto:${encodeURIComponent(email)}`}
                className="font-medium text-accent-dark underline decoration-accent-dark/35 underline-offset-2 hover:decoration-accent-dark"
              >
                {email}
              </a>
            </li>
            {telHref ? (
              <li>
                <span className="font-medium text-foreground-on-light">Phone: </span>
                <a
                  href={telHref}
                  className="font-medium text-accent-dark underline decoration-accent-dark/35 underline-offset-2 hover:decoration-accent-dark"
                >
                  {getSitePhoneRaw()}
                </a>
              </li>
            ) : null}
          </ul>
          {addressLines.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold text-foreground-on-light">Mailing / office</h3>
              <address className="mt-2 not-italic text-muted-on-light">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          ) : null}
        </section>
      </div>
    </InteriorPageShell>
  );
}
