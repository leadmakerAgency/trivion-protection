import { ORGANIZATION_SCHEMA_ID, SITE_NAME, getSiteLogoAbsoluteUrl, getSiteUrl } from "@/lib/site";

type Segment = "blog" | "knowledge";

const resolveHeroImageUrl = (coverImageUrl: string | undefined, base: string, fallbackLogoUrl: string) => {
  if (!coverImageUrl) return fallbackLogoUrl;
  if (coverImageUrl.startsWith("http")) return coverImageUrl;
  return `${base}${coverImageUrl.startsWith("/") ? coverImageUrl : `/${coverImageUrl}`}`;
};

/** `BlogPosting` (blog) or `Article` (knowledge) with `publisher` → Organization `@id`. */
export const buildMdxArticleStructuredData = (
  segment: Segment,
  slug: string,
  headline: string,
  description: string,
  /** ISO timestamps */
  datePublished: string,
  dateModified: string,
  coverImageUrl?: string,
) => {
  const base = getSiteUrl();
  const pageUrl = `${base}/${segment}/${slug}`;
  const orgRef = ORGANIZATION_SCHEMA_ID();
  const publisherLogo = getSiteLogoAbsoluteUrl();
  const heroUrl = resolveHeroImageUrl(coverImageUrl, base, publisherLogo);
  const type = segment === "blog" ? "BlogPosting" : "Article";

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${pageUrl}#article`,
    headline,
    description,
    url: pageUrl,
    datePublished,
    dateModified,
    image: [{ "@type": "ImageObject", url: heroUrl }],
    author: {
      "@type": "Organization",
      "@id": orgRef,
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: publisherLogo },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
};
