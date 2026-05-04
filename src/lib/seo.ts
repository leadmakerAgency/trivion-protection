import type { Metadata } from "next";
import { SITE_NAME, getSiteUrl } from "@/lib/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export const buildMetadata = ({
  title,
  description,
  path,
}: BuildMetadataInput): Metadata => {
  const base = getSiteUrl();
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${canonicalPath === "//" ? "/" : canonicalPath}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    robots: { index: true, follow: true },
  };
};

export const homeTitle = "Security guard company in Los Angeles";
export const homeDescription =
  "Licensed private security in Los Angeles County: armed and unarmed guards, marked vehicle patrol, fire watch, construction and warehouse coverage. Request a quote from Trivon Protection.";
