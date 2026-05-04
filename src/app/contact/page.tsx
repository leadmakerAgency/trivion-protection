import type { Metadata } from "next";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { QuoteForm } from "@/components/QuoteForm";
import { buildMetadata } from "@/lib/seo";
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PHONE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — request a security quote",
  description:
    "Request a quote for Los Angeles County security guards: armed and unarmed posts, patrol, fire watch, construction, and warehouse programs.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <InteriorPageShell
      breadcrumbs={[{ href: "/contact", label: "Contact" }]}
      title="Request a quote"
      description={
        <p>
          Share your site details, hours, and service needs. If email delivery is not configured yet
          in your deployment, you can still reach us at {PLACEHOLDER_PHONE} or {PLACEHOLDER_EMAIL}.
        </p>
      }
    >
      <QuoteForm />
    </InteriorPageShell>
  );
}
