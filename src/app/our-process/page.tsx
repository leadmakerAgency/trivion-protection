import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our process — from assessment to deployment",
  description:
    "How Trivon Protection scopes Los Angeles security programs: consultation, site review, proposal, onboarding, supervision, and continuous reporting.",
  path: "/our-process",
});

const steps = [
  {
    name: "Consultation",
    detail:
      "We capture hours, access points, incident history, tenant mix, and reporting expectations. If you already have post orders, we review what works and what creates gaps.",
  },
  {
    name: "Site assessment",
    detail:
      "For many Los Angeles properties, a walkthrough clarifies blind spots: dock flows, parking structure risk, perimeter breaches, and camera coverage gaps.",
  },
  {
    name: "Proposal",
    detail:
      "You receive a staffing plan with clear assumptions: armed vs unarmed, patrol design, start dates, supervision cadence, and pricing structure—without hidden fees buried in fine print.",
  },
  {
    name: "Onboarding",
    detail:
      "We align communication channels, escalation paths, and documentation standards with your property team. Post orders are finalized before the first shift.",
  },
  {
    name: "Operations and supervision",
    detail:
      "Field leadership checks quality, replaces callouts, and enforces standards. You should feel the difference in consistency—not just uniforms on site.",
  },
  {
    name: "Reporting and review",
    detail:
      "Daily activity reporting supports management reviews. For evolving sites (especially construction), we adjust post orders as phases change.",
  },
];

export default function OurProcessPage() {
  return (
    <InteriorPageShell
      breadcrumbs={[{ href: "/our-process", label: "Process" }]}
      title="Our process"
      description='A disciplined process is what separates professional Los Angeles security guard companies from
          “warm bodies in uniforms.” Trivon Protection is built for operators who need accountability.'
      contentClassName="space-y-6"
    >
      {steps.map((s, idx) => (
        <section key={s.name} className="rounded-sm border border-edge bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Step {idx + 1}</p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">{s.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{s.detail}</p>
        </section>
      ))}
      <Button href="/contact" variant="primary" className="mt-4">
        Start with a quote
      </Button>
    </InteriorPageShell>
  );
}
