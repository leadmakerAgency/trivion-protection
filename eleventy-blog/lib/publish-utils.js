/**
 * Publish rules for drafts and scheduled (future-dated) posts.
 * Set SHOW_DRAFTS=1 and/or SHOW_FUTURE=1 locally to preview without emitting restrictions on listings vs pages — both use the same rules below for consistency.
 */

function truthyEnv(value) {
  if (value == null || value === "") return false;
  const v = String(value).trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

export function envShowsDrafts() {
  return truthyEnv(process.env.SHOW_DRAFTS);
}

export function envShowsFuture() {
  return truthyEnv(process.env.SHOW_FUTURE);
}

/**
 * @param {unknown} dateInput - YAML Date, ISO datetime string, or YYYY-MM-DD (date-only → UTC midnight)
 * @returns {number | null} UTC milliseconds for comparisons at build time
 */
export function getPublishInstant(dateInput) {
  if (dateInput == null || dateInput === "") return null;
  if (dateInput instanceof Date) return dateInput.getTime();
  const s = String(dateInput).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d, 0, 0, 0, 0);
  }
  const parsed = Date.parse(s);
  return Number.isNaN(parsed) ? null : parsed;
}

/**
 * Whether this post should appear in listings and receive an HTML output file.
 * @param {Record<string, unknown>} data - Template / page data (draft, date, …)
 */
export function isPublishedForSite(data) {
  const showDrafts = envShowsDrafts();
  const showFuture = envShowsFuture();

  const draft = data.draft === true;
  if (draft && !showDrafts) return false;

  const instant = getPublishInstant(data.date);
  const now = Date.now();
  if (instant != null && instant > now && !showFuture) return false;

  return true;
}
