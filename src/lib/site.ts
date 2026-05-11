export const SITE_NAME = "Trivon Protection";
export const SITE_TAGLINE = "Los Angeles Security Guards";

/** Primary brand mark (PNG). Used in header and footer. */
export const SITE_LOGO_PATH = "https://i.imgur.com/7JC2Y9R.png";

/** Same-origin favicon / app icon route (`src/app/icon.tsx`). Used in JSON-LD `logo` for search. */
export const SITE_ICON_PATH = "/icon";

export const getSiteIconAbsoluteUrl = (): string => `${getSiteUrl()}${SITE_ICON_PATH}`;

/** Absolute URL for the header/footer image when `SITE_LOGO_PATH` is relative. */
export const getSiteLogoAbsoluteUrl = (): string => {
  if (/^https?:\/\//i.test(SITE_LOGO_PATH)) return SITE_LOGO_PATH;
  const base = getSiteUrl();
  const path = SITE_LOGO_PATH.startsWith("/") ? SITE_LOGO_PATH : `/${SITE_LOGO_PATH}`;
  return `${base}${path}`;
};

/**
 * Canonical site origin (no trailing slash).
 * 1) `NEXT_PUBLIC_SITE_URL` when set (use for production custom domain, e.g. `https://trivonprotection.com`).
 * 2) On Vercel, `VERCEL_URL` is set automatically (e.g. `trivion-protection.vercel.app`); we prefix `https://`
 *    so preview/production deployments get correct metadata without extra env until you add a custom domain.
 * 3) Otherwise local / non-Vercel fallback for development.
 */
export const getSiteUrl = () => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "").trim();
  if (explicit) return explicit;

  const vercelHost = process.env.VERCEL_URL?.replace(/\/$/, "").trim();
  if (vercelHost) return `https://${vercelHost}`;

  return "https://trivonprotection.com";
};

const trim = (v: string | undefined) => (typeof v === "string" ? v.trim() : undefined);

/** Public contact email. Override via `NEXT_PUBLIC_CONTACT_EMAIL`. */
export const getSiteContactEmail = () =>
  trim(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "info@trivonprotection.com";

/** E.164 or display phone from `NEXT_PUBLIC_CONTACT_PHONE`; omit digits from schema/footer when unset. */
export const getSitePhoneRaw = () => trim(process.env.NEXT_PUBLIC_CONTACT_PHONE);

/** `tel:` link when a phone number is configured. */
export const getSiteTelHref = (): string | undefined => {
  const raw = getSitePhoneRaw();
  if (!raw) return undefined;
  const compact = raw.replace(/[^\d+]/g, "");
  if (!compact) return undefined;
  if (compact.startsWith("+")) return `tel:${compact}`;
  if (/^\d{10}$/.test(compact)) return `tel:+1${compact}`;
  if (/^1\d{10}$/.test(compact)) return `tel:+${compact}`;
  return `tel:${compact}`;
};

export type SitePostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
};

/**
 * Structured mailing / HQ address for schema and footer when street + locality are set via env.
 * Use `NEXT_PUBLIC_ORG_STREET`, `NEXT_PUBLIC_ORG_ADDRESS_LOCALITY`, `NEXT_PUBLIC_ORG_ADDRESS_REGION` (default CA),
 * optional `NEXT_PUBLIC_ORG_POSTAL_CODE`, optional `NEXT_PUBLIC_ORG_LAT` / `NEXT_PUBLIC_ORG_LNG` for GeoCoordinates.
 */
export const getPostalAddressDetails = (): SitePostalAddress | null => {
  const streetAddress = trim(process.env.NEXT_PUBLIC_ORG_STREET);
  const addressLocality = trim(process.env.NEXT_PUBLIC_ORG_ADDRESS_LOCALITY);
  const addressRegion = trim(process.env.NEXT_PUBLIC_ORG_ADDRESS_REGION) || "CA";
  const addressCountry = trim(process.env.NEXT_PUBLIC_ORG_ADDRESS_COUNTRY) || "US";
  const postalCode = trim(process.env.NEXT_PUBLIC_ORG_POSTAL_CODE);
  if (!streetAddress || !addressLocality) return null;
  return {
    streetAddress,
    addressLocality,
    addressRegion,
    ...(postalCode ? { postalCode } : {}),
    addressCountry,
  };
};

export const getPostalGeo = (): { latitude: number; longitude: number } | null => {
  const latRaw = trim(process.env.NEXT_PUBLIC_ORG_LAT);
  const lngRaw = trim(process.env.NEXT_PUBLIC_ORG_LNG);
  if (!latRaw || !lngRaw) return null;
  const latitude = Number(latRaw);
  const longitude = Number(lngRaw);
  if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;
  return { latitude, longitude };
};

/** Google Business Profile, LinkedIn, etc. — comma- or newline-separated URLs in `NEXT_PUBLIC_ORG_SAME_AS`. */
export const getOrganizationSameAs = (): string[] => {
  const raw = trim(process.env.NEXT_PUBLIC_ORG_SAME_AS);
  if (!raw) return [];
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
};

/** Lines shown in footer and “about” contact blocks — matches structured data where address is configured. */
export const getSiteAddressLines = (): string[] => {
  const postal = getPostalAddressDetails();
  if (postal) {
    const hasZip = (postal.postalCode?.length ?? 0) > 0;
    const line2 = hasZip
      ? `${postal.addressLocality}, ${postal.addressRegion} ${postal.postalCode}`
      : `${postal.addressLocality}, ${postal.addressRegion}`;
    return [postal.streetAddress, line2, postal.addressCountry !== "US" ? postal.addressCountry : ""].filter(
      Boolean,
    );
  }
  return [
    "Los Angeles County, California",
    "Headquarters mailing address is provided with proposals and vendor onboarding.",
  ];
};

export const hoursLabelToOpeningSpecification = (): {
  opens: string;
  closes: string;
  dayOfWeek: string[];
} => {
  return {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  };
};

export const HOURS_LABEL = "24/7: Around the clock";

/** When true, emits LocalBusiness + full postal in schema; Organization still emits when partial. */
export const siteHasPostalAddressForLocalBusiness = () => getPostalAddressDetails() != null;

export const ORGANIZATION_SCHEMA_ID = () => `${getSiteUrl()}#organization`;
export const WEBSITE_SCHEMA_ID = () => `${getSiteUrl()}#website`;
export const LOCAL_BUSINESS_SCHEMA_ID = () => `${getSiteUrl()}#localBusiness`;

/** Legacy names — kept for gradual migration; prefer `getSiteContactEmail`. */
export const PLACEHOLDER_EMAIL = getSiteContactEmail();
export const PLACEHOLDER_ADDRESS = getSiteAddressLines().join(" · ");
