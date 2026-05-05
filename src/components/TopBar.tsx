import { Clock, Mail, Phone } from "lucide-react";
import {
  HOURS_LABEL,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_PHONE,
} from "@/lib/site";

export const TopBar = () => {
  return (
    <div className="border-b border-edge bg-surface text-[11px] leading-snug sm:text-xs">
      <div className="mx-auto flex max-w-7xl justify-end px-3 py-2 sm:px-5 sm:py-2.5 lg:px-7">
        <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-0.5 text-muted sm:gap-x-1.5">
          <span className="inline-flex items-center gap-1 text-foreground/90">
            <Clock className="h-3 w-3 shrink-0 text-accent sm:h-3.5 sm:w-3.5" aria-hidden />
            {HOURS_LABEL}
          </span>
          <span className="hidden text-muted sm:inline" aria-hidden>
            ·
          </span>
          <a
            className="inline-flex items-center gap-1 hover:text-accent hover:underline"
            href={`tel:${PLACEHOLDER_PHONE.replace(/[^\d+]/g, "")}`}
          >
            <Phone className="h-3 w-3 shrink-0 text-accent sm:h-3.5 sm:w-3.5" aria-hidden />
            <span className="text-foreground/90">{PLACEHOLDER_PHONE}</span>
          </a>
          <span className="hidden text-muted sm:inline" aria-hidden>
            ·
          </span>
          <a
            className="inline-flex items-center gap-1 hover:text-accent hover:underline"
            href={`mailto:${PLACEHOLDER_EMAIL}`}
          >
            <Mail className="h-3 w-3 shrink-0 text-accent sm:h-3.5 sm:w-3.5" aria-hidden />
            <span className="text-foreground/90">{PLACEHOLDER_EMAIL}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
