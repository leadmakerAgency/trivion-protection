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
};

export const ArchiveArticleCard = ({
  href,
  title,
  description,
  date,
  imageSrc,
  imageAlt,
  readLabel = "Read article",
}: ArchiveArticleCardProps) => {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article>
      <Link
        href={href}
        className="focus-ring-on-light group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-light-edge bg-white shadow-sm outline-none transition hover:border-accent-dark/35 hover:shadow-md"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface-light">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center transition duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <time
            dateTime={date}
            className="text-xs font-semibold uppercase tracking-wide text-accent-dark"
          >
            {formatted}
          </time>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground-on-light group-hover:text-accent-dark">
            {title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-on-light">{description}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-dark">
            {readLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
};
