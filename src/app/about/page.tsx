import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: `About ${SITE_NAME}`,
  description:
    "Trivon Protection provides Los Angeles County security guard services with a focus on disciplined post orders, supervision, and clear reporting for commercial operators.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <InteriorPageShell
      breadcrumbs={[{ href: "/about", label: "About" }]}
      title="About Trivon Protection"
      description={`${SITE_NAME} exists for a simple reason: Los Angeles businesses deserve security programs that
          are easy to run, legally sound, and actually reduce incidents. We emphasize training,
          supervision, and documentation—because deterrence without accountability does not hold up in
          the real world.`}
      contentClassName="space-y-8 text-sm leading-relaxed text-muted"
    >
      <section>
        <h2 className="text-xl font-semibold text-foreground">What we believe</h2>
        <p className="mt-3">
          Security is operations. The best programs integrate with your team’s workflows: clear
          escalation paths, predictable reporting, and field leadership that fixes problems instead
          of hiding them.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-foreground">California licensing</h2>
        <p className="mt-3">
          Private security in California is regulated through BSIS licensing requirements. We do not
          publish placeholder license numbers on the web; your proposal packet will include the
          correct credentials and insurance confirmations for your files.
        </p>
      </section>
      <Button href="/contact" variant="primary">
        Speak with our team
      </Button>
    </InteriorPageShell>
  );
}
