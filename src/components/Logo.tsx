import Image from "next/image";
import Link from "next/link";
import { SITE_LOGO_PATH, SITE_NAME } from "@/lib/site";

type LogoProps = {
  /** Hides tagline for narrow headers (single-line nav). */
  compact?: boolean;
};

export const Logo = ({ compact = false }: LogoProps) => {
  return (
    <Link
      href="/"
      className={
        compact
          ? "group flex shrink-0 items-center"
          : "group flex shrink-0 flex-col gap-1.5"
      }
    >
      <Image
        src={SITE_LOGO_PATH}
        alt={SITE_NAME}
        width={720}
        height={200}
        sizes={compact ? "(max-width: 640px) 260px, 320px" : "(max-width: 640px) min(100vw - 2.5rem, 28rem), 32rem"}
        priority={compact}
        className={
          compact
            ? "h-9 w-auto max-w-[min(100%,min(90vw,17.5rem))] object-contain object-left sm:h-10 sm:max-w-[min(100%,20rem)]"
            : "h-auto w-full max-w-md object-contain object-left sm:max-w-lg"
        }
      />
      {!compact ? (
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[11px]">
          Reliance · Integrity · Protection
        </span>
      ) : null}
    </Link>
  );
};
