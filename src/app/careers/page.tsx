import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers: join our team",
  description:
    "Careers at Trivon Protection: hiring paths for licensed security professionals supporting Los Angeles County client programs.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <InteriorPageShell
      surface="paper"
      breadcrumbs={[{ href: "/careers", label: "Careers" }]}
      title="Careers"
      description="We are building a Los Angeles team that values professionalism, punctuality, and clear
          communication. If you are a California-licensed security professional or you are working
          toward licensure, introduce yourself and we will route you to the right conversation."
      contentClassName="space-y-6 text-sm leading-relaxed text-muted-on-light"
    >
      <section className="rounded-xl border border-surface-light-edge bg-surface-light p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground-on-light">How to apply</h2>
        <p className="mt-3">
          Send your resume, guard card status, and preferred work areas through the contact form with
          the subject line “Careers.” For fastest routing, include availability (days/nights) and any
          armed qualification details if applicable.
        </p>
      </section>
      <Button href="/contact" variant="primary" surface="light">
        Contact hiring
      </Button>
    </InteriorPageShell>
  );
}
