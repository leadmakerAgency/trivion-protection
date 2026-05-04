import { getSiteUrl, SITE_LOGO_PATH, SITE_NAME } from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export const JsonLd = ({ data }: JsonLdProps) => {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
};

export const organizationSchema = () => {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url,
    logo: `${url}${SITE_LOGO_PATH}`,
    sameAs: [],
    description:
      "Trivon Protection provides licensed security guard services in Los Angeles County, including armed and unarmed posts, patrol programs, fire watch, construction, and warehouse coverage.",
  };
};

export const websiteSchema = () => {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url,
  };
};
