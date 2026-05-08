import { ORGANIZATION_SCHEMA_ID, SITE_NAME, getSiteIconAbsoluteUrl, getSiteUrl } from "@/lib/site";

const resolveHeroImageUrl = (coverImageUrl: string | undefined, base: string, fallbackLogoUrl: string) => {
  if (!coverImageUrl) return fallbackLogoUrl;
  if (coverImageUrl.startsWith("http")) return coverImageUrl;
  return `${base}${coverImageUrl.startsWith("/") ? coverImageUrl : `/${coverImageUrl}`}`;
};

/** `BlogPosting` with `publisher` → Organization `@id`. */
export const buildMdxArticleStructuredData = (
  slug: string,
  headline: string,
  description: string,
  /** ISO timestamps */
  datePublished: string,
  dateModified: string,
  coverImageUrl?: string,
) => {
  const base = getSiteUrl();
  const pageUrl = `${base}/blog/${slug}`;
  const orgRef = ORGANIZATION_SCHEMA_ID();
  const publisherLogo = getSiteIconAbsoluteUrl();
  const heroUrl = resolveHeroImageUrl(coverImageUrl, base, publisherLogo);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
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
