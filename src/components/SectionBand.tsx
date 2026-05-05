import type { ReactNode } from "react";
import Image from "next/image";

export type SectionBandTone = "dark" | "light" | "darkImage" | "lightImage";

type SectionBandProps = {
  tone: SectionBandTone;
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Hide bottom divider between stacked marketing sections. */
  divider?: boolean;
  /** Required when tone is darkImage or lightImage */
  imageSrc?: string;
  imageAlt?: string;
  imageSizes?: string;
  imageClassName?: string;
  imagePriority?: boolean;
};

const toneBase: Record<SectionBandTone, string> = {
  dark: "bg-background text-foreground",
  light: "bg-surface-light text-foreground-on-light",
  darkImage: "relative min-h-[280px] bg-background text-foreground sm:min-h-[360px]",
  lightImage:
    "relative min-h-[280px] bg-surface-light text-foreground-on-light sm:min-h-[360px]",
};

const toneDivider: Record<SectionBandTone, string> = {
  dark: "border-b border-edge",
  light: "border-b border-surface-light-edge",
  darkImage: "border-b border-edge",
  lightImage: "border-b border-surface-light-edge",
};

export const SectionBand = ({
  tone,
  id,
  children,
  className = "",
  innerClassName = "",
  divider = true,
  imageSrc,
  imageAlt = "",
  imageSizes = "100vw",
  imageClassName = "object-cover object-center",
  imagePriority = false,
}: SectionBandProps) => {
  const dividerClass = divider ? toneDivider[tone] : "";

  return (
    <section id={id} className={`scroll-mt-28 py-16 sm:py-20 ${toneBase[tone]} ${dividerClass} ${className}`}>
      {(tone === "darkImage" || tone === "lightImage") && imageSrc ? (
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
            className={
              tone === "lightImage"
                ? "pointer-events-none absolute inset-0 z-[1] bg-surface-light/85"
                : "pointer-events-none absolute inset-0 z-[1] bg-background/80"
            }
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
