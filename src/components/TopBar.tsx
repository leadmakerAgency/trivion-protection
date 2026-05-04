import { Clock, Mail, Phone } from "lucide-react";
import {
  HOURS_LABEL,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_PHONE,
} from "@/lib/site";
import { Button } from "@/components/Button";

export const TopBar = () => {
  return (
    <div className="border-b border-edge bg-surface text-sm sm:text-base">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-muted sm:gap-x-3">
          <span className="inline-flex items-center gap-2 text-foreground/90">
            <Clock className="h-5 w-5 shrink-0 text-accent" aria-hidden />
            {HOURS_LABEL}
          </span>
          <span className="hidden text-muted sm:inline" aria-hidden>
            ·
          </span>
          <a
            className="inline-flex items-center gap-2 hover:text-accent hover:underline"
            href={`tel:${PLACEHOLDER_PHONE.replace(/[^\d+]/g, "")}`}
          >
            <Phone className="h-5 w-5 shrink-0 text-accent" aria-hidden />
            <span className="text-foreground/90">{PLACEHOLDER_PHONE}</span>
          </a>
          <span className="hidden text-muted sm:inline" aria-hidden>
            ·
          </span>
          <a
            className="inline-flex items-center gap-2 hover:text-accent hover:underline"
            href={`mailto:${PLACEHOLDER_EMAIL}`}
          >
            <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden />
            <span className="text-foreground/90">{PLACEHOLDER_EMAIL}</span>
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button href="/contact" variant="primary" className="px-4 py-2.5 text-sm sm:text-base">
            Get a quote
          </Button>
          <Button href="/careers" variant="secondary" className="px-4 py-2.5 text-sm sm:text-base">
            Join our team
          </Button>
        </div>
      </div>
    </div>
  );
};
