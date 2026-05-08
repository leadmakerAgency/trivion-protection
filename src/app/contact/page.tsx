import type { Metadata } from "next";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";
import {
  getSiteAddressLines,
  getSiteContactEmail,
  getSitePhoneRaw,
  getSiteTelHref,
} from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact: request a security quote",
  description:
    "Contact Trivon Protection for Los Angeles County security guards: armed and unarmed posts, patrol, fire watch, construction, and warehouse programs.",
  path: "/contact",
});

export default function ContactPage() {
  const email = getSiteContactEmail();
  const telHref = getSiteTelHref();
  const addressLines = getSiteAddressLines();

  return (
    <InteriorPageShell
      surface="paper"
      breadcrumbs={[{ href: "/contact", label: "Contact" }]}
      title="Contact"
      description={
        <p>
          For quote requests or program questions, reach us using the phone or email below. Include site
          location, coverage hours, and the type of program you need so we can respond quickly.
        </p>
      }
    >
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
    </InteriorPageShell>
  );
}
