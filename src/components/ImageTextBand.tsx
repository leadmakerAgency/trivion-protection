import Image from "next/image";
import type { ReactNode } from "react";

type ImageTextBandProps = {
  imageSrc: string;
  imageAlt: string;
  imageSizes: string;
  imageClassName?: string;
  /** When true, image column appears first on large screens */
  imageFirst?: boolean;
  /** Match surrounding section: paper bands use onLight; dark bands use onDark */
  textTone?: "onLight" | "onDark";
  eyebrow?: ReactNode;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** Text column alignment (`center` stacks well under centered section intros). */
  textAlign?: "left" | "center";
};

export const ImageTextBand = ({
  imageSrc,
  imageAlt,
  imageSizes,
  imageClassName = "object-cover object-center",
  imageFirst = true,
  textTone = "onLight",
  eyebrow,
  title,
  children,
  footer,
  className = "",
  textAlign = "left",
}: ImageTextBandProps) => {
  const bodyText = textTone === "onLight" ? "text-muted-on-light" : "text-muted";
  const colAlign = textAlign === "center" ? "text-center lg:text-left" : "text-left";
  const imageBorder =
    textTone === "onLight" ? "border-surface-light-edge shadow-sm" : "border-edge";

  const imageCol = (
    <div
      className={`relative min-h-[220px] overflow-hidden rounded-sm border sm:min-h-[280px] lg:min-h-[320px] ${imageBorder} ${imageFirst ? "" : "lg:order-2"}`}
    >
      <Image src={imageSrc} alt={imageAlt} fill className={imageClassName} sizes={imageSizes} />
    </div>
  );

  const textCol = (
    <div className={`${imageFirst ? "" : "lg:order-1"} ${colAlign}`}>
      {eyebrow ? (
        <div className={`mb-3 ${textAlign === "center" ? "flex justify-center lg:justify-start" : ""}`}>
          {eyebrow}
        </div>
      ) : null}
      <div
        className={`text-3xl font-semibold tracking-tight sm:text-4xl ${textTone === "onLight" ? "text-foreground-on-light" : "text-foreground"}`}
      >
        {title}
      </div>
      <div className={`mt-5 space-y-4 text-base leading-relaxed sm:text-lg ${bodyText}`}>
        {children}
      </div>
      {footer ? <div className="mt-8">{footer}</div> : null}
    </div>
  );

  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${className}`}
    >
      {imageCol}
      {textCol}
    </div>
  );
};
