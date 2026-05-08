import {
  HOURS_LABEL,
  LOCAL_BUSINESS_SCHEMA_ID,
  ORGANIZATION_SCHEMA_ID,
  WEBSITE_SCHEMA_ID,
  getOrganizationSameAs,
  getPostalAddressDetails,
  getPostalGeo,
  getSiteContactEmail,
  getSitePhoneRaw,
  getSiteIconAbsoluteUrl,
  getSiteUrl,
  siteHasPostalAddressForLocalBusiness,
  SITE_NAME,
  hoursLabelToOpeningSpecification,
} from "@/lib/site";

const orgDescription =
  "Trivon Protection provides licensed security guard services in Los Angeles County, including armed and unarmed posts, patrol programs, fire watch, construction, and warehouse coverage.";

/** Single JSON-LD document for sitewide `Organization`, optional `LocalBusiness`, and `WebSite`. */
export const buildSiteStructuredDataGraph = (): Record<string, unknown> => {
  const url = getSiteUrl();
  const logoUrl = getSiteIconAbsoluteUrl();
  const orgId = ORGANIZATION_SCHEMA_ID();
  const siteId = WEBSITE_SCHEMA_ID();
  const postal = getPostalAddressDetails();
  const phone = getSitePhoneRaw();
  const email = getSiteContactEmail();
  const geo = getPostalGeo();
  const oh = hoursLabelToOpeningSpecification();
  const sameAs = getOrganizationSameAs();

  const organizationNode: Record<string, unknown> = {
    "@type": "Organization",
    "@id": orgId,
    name: SITE_NAME,
    url,
    logo: logoUrl,
    description: orgDescription,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email,
      ...(phone ? { telephone: phone } : {}),
      areaServed: "United States",
    },
    ...(sameAs.length ? { sameAs } : {}),
    ...(postal
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: postal.streetAddress,
            addressLocality: postal.addressLocality,
            addressRegion: postal.addressRegion,
            ...(postal.postalCode ? { postalCode: postal.postalCode } : {}),
            addressCountry: postal.addressCountry,
          },
        }
      : {
          areaServed: [{ "@type": "AdministrativeArea", name: "Los Angeles County" }],
        }),
  };

  const graph: Record<string, unknown>[] = [organizationNode];

  if (siteHasPostalAddressForLocalBusiness() && postal) {
    graph.push({
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": LOCAL_BUSINESS_SCHEMA_ID(),
      name: SITE_NAME,
      image: logoUrl,
      url,
      description: orgDescription,
      ...(phone ? { telephone: phone } : {}),
      ...(geo
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: geo.latitude,
              longitude: geo.longitude,
            },
          }
        : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: postal.streetAddress,
        addressLocality: postal.addressLocality,
        addressRegion: postal.addressRegion,
        ...(postal.postalCode ? { postalCode: postal.postalCode } : {}),
        addressCountry: postal.addressCountry,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: oh.dayOfWeek,
          opens: oh.opens,
          closes: oh.closes,
          description: HOURS_LABEL,
        },
      ],
      areaServed: [{ "@type": "AdministrativeArea", name: "Los Angeles County" }],
      parentOrganization: { "@id": orgId },
    });
  }

  graph.push({
    "@type": "WebSite",
    "@id": siteId,
    name: SITE_NAME,
    url,
    publisher: { "@id": orgId },
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};
