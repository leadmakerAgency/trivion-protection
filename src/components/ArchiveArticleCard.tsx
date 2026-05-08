import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type ArchiveArticleCardProps = {
  href: string;
  title: string;
  description: string;
  /** ISO date string */
  date: string;
  imageSrc: string;
  imageAlt: string;
  readLabel?: string;
  /** `minimal` = flatter card (blog index); `default` = richer archive card */
  variant?: "default" | "minimal";
};

export const ArchiveArticleCard = ({
  href,
  title,
  description,
  date,
  imageSrc,
  imageAlt,
  readLabel = "Read article",
  variant = "default",
}: ArchiveArticleCardProps) => {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isMinimal = variant === "minimal";
  const cardClass = isMinimal
    ? "focus-ring-on-light group flex h-full flex-col overflow-hidden rounded-xl border border-surface-light-edge bg-white outline-none transition hover:border-accent-dark/45"
    : "focus-ring-on-light group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-light-edge bg-white shadow-sm outline-none transition hover:border-accent-dark/35 hover:shadow-md";
  const imageWrapClass = isMinimal
    ? "relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface-light"
    : "relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface-light";
  const imageMotion = isMinimal
    ? "object-cover object-center transition duration-200 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
    : "object-cover object-center transition duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.03]";
  const bodyPad = isMinimal ? "p-5" : "p-6";
  const titleClass = isMinimal
    ? "mt-2 text-lg font-semibold tracking-tight text-foreground-on-light group-hover:text-accent-dark"
    : "mt-3 text-xl font-semibold tracking-tight text-foreground-on-light group-hover:text-accent-dark";
  const descClass = isMinimal
    ? "mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-on-light"
    : "mt-2 flex-1 text-sm leading-relaxed text-muted-on-light";
  const footerClass = isMinimal
    ? "mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-accent-dark"
    : "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-dark";

  return (
    <article>
      <Link href={href} className={cardClass}>
        <div className={imageWrapClass}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={imageMotion}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className={`flex flex-1 flex-col ${bodyPad}`}>
          <time
            dateTime={date}
            className="text-xs font-semibold uppercase tracking-wide text-accent-dark"
          >
            {formatted}
          </time>
          <h2 className={titleClass}>{title}</h2>
          <p className={descClass}>{description}</p>
          <span className={footerClass}>
            {readLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
};
