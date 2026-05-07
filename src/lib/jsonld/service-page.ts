import { ORGANIZATION_SCHEMA_ID, getSiteUrl } from "@/lib/site";
import type { ServiceItem } from "@/lib/services";

type FaqItem = { question: string; answer: string };

/** `Service` + `FAQPage` JSON-LD for service landing URLs (paired with visible page content). */
export const buildServicePageStructuredData = (service: ServiceItem, slug: string, faqs: FaqItem[]) => {
  const base = getSiteUrl();
  const pageUrl = `${base}/services/${slug}`;
  const orgRef = ORGANIZATION_SCHEMA_ID();

  const payload: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: `${service.title} in Los Angeles County`,
      serviceType: service.title,
      description: service.shortDescription,
      provider: { "@id": orgRef },
      areaServed: [{ "@type": "AdministrativeArea", name: "Los Angeles County" }],
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return payload;
};
