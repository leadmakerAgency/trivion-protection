import type { Metadata } from "next";
import { defaultOpenGraphImageUrl } from "@/lib/og-config";
import { SITE_NAME, getSiteUrl } from "@/lib/site";

export const clipMetaDescription = (text: string, max = 158): string => {
  const trimmed = text.trim().replace(/\s+/g, " ");
  if (trimmed.length <= max) return trimmed;
  const cut = trimmed.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
};

export const homeTitle = "Security guard company in Los Angeles";
export const homeDescription =
  "Licensed private security in Los Angeles County: armed and unarmed guards, marked vehicle patrol, fire watch, construction and warehouse coverage. Request a quote from Trivon Protection.";

type ArticleMeta = {
  publishedTime?: string;
  modifiedTime?: string;
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Path or absolute URL for OG/Twitter; defaults to site default generated image. */
  ogImage?: string;
  ogImageAlt?: string;
  robots?: Metadata["robots"];
  openGraphType?: "website" | "article";
  article?: ArticleMeta;
};

const resolveOgImageFields = (input: Pick<BuildMetadataInput, "ogImage" | "ogImageAlt">): { url: string; alt: string }[] => {
  const base = getSiteUrl();
  const raw = input.ogImage ?? defaultOpenGraphImageUrl();
  const isAbsolute = /^https?:\/\//i.test(raw);
  const url = isAbsolute ? raw : `${base}${raw.startsWith("/") ? raw : `/${raw}`}`;
  const alt = input.ogImageAlt ?? SITE_NAME;
  return [{ url, alt }];
};

export const buildMetadata = ({
  title,
  description,
  path,
  ogImage,
  ogImageAlt,
  robots,
  openGraphType = "website",
  article,
}: BuildMetadataInput): Metadata => {
  const base = getSiteUrl();
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${canonicalPath === "//" ? "/" : canonicalPath}`;
  const ogTitle = `${title} | ${SITE_NAME}`;
  const images = resolveOgImageFields({ ogImage, ogImageAlt });

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: openGraphType,
      images,
      ...(openGraphType === "article" && article?.publishedTime
        ? { publishedTime: article.publishedTime }
        : {}),
      ...(openGraphType === "article" && article?.modifiedTime
        ? { modifiedTime: article.modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: images.map((i) => i.url),
    },
    robots: robots ?? { index: true, follow: true },
  };
};

/** Homepage metadata: canonical `/`, full OG/Twitter parity with `buildMetadata`. Root layout still supplies `title.default` / `template`; this export sets the runtime title + social fields for `/`. */
export const buildHomeMetadata = (): Metadata =>
  buildMetadata({
    title: homeTitle,
    description: homeDescription,
    path: "/",
    ogImageAlt: `${SITE_NAME} — ${homeTitle}`,
  });
