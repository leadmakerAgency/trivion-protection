export const SITE_NAME = "Trivon Protection";
export const SITE_TAGLINE = "Los Angeles Security Guards";

/** Primary brand mark (PNG). Used in header, footer, favicon, and structured data. */
export const SITE_LOGO_PATH = "/trivon-logo.png";

export const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://trivonprotection.com";

export const PLACEHOLDER_PHONE = "(555) 000-0000";
export const PLACEHOLDER_EMAIL = "info@trivonprotection.com";
export const PLACEHOLDER_ADDRESS = "Los Angeles County, CA: full address coming soon";

export const HOURS_LABEL = "24/7: Around the clock";
