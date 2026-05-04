import type { ReactNode } from "react";
import Image from "next/image";

export type SectionBandTone = "dark" | "light" | "darkImage";

type SectionBandProps = {
  tone: SectionBandTone;
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Required when tone is darkImage */
  imageSrc?: string;
  imageAlt?: string;
  imageSizes?: string;
  imageClassName?: string;
  imagePriority?: boolean;
};

const toneShell: Record<SectionBandTone, string> = {
  dark: "border-b border-edge bg-background text-foreground",
  light: "border-b border-surface-light-edge bg-surface-light text-foreground-on-light",
  darkImage:
    "relative min-h-[280px] border-b border-edge bg-background text-foreground sm:min-h-[360px]",
};

export const SectionBand = ({
  tone,
  id,
  children,
  className = "",
  innerClassName = "",
  imageSrc,
  imageAlt = "",
  imageSizes = "100vw",
  imageClassName = "object-cover object-center",
  imagePriority = false,
}: SectionBandProps) => {
  return (
    <section id={id} className={`scroll-mt-28 py-16 sm:py-20 ${toneShell[tone]} ${className}`}>
      {tone === "darkImage" && imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={imagePriority}
            className={`z-0 ${imageClassName}`}
            sizes={imageSizes}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-background/80"
            aria-hidden
          />
        </>
      ) : null}
      <div
        className={`relative z-[2] mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};
