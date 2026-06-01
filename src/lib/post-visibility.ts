const truthyEnv = (value: string | undefined): boolean => {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
};

export const envShowsDrafts = (): boolean => truthyEnv(process.env.SHOW_DRAFTS);

export const envShowsFuture = (): boolean => truthyEnv(process.env.SHOW_FUTURE);

/**
 * Parses frontmatter `date` for build-time publishability checks.
 * Date-only values are treated as UTC midnight.
 */
export const getPublishInstant = (dateInput: unknown): number | null => {
  if (dateInput == null || dateInput === "") return null;
  if (dateInput instanceof Date) return dateInput.getTime();
  const value = String(dateInput).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return Date.UTC(year, month - 1, day, 0, 0, 0, 0);
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
};

export const isDraft = (data: Record<string, unknown>): boolean => data.draft === true;

export const isPublishedForSite = (data: Record<string, unknown>): boolean => {
  if (isDraft(data) && !envShowsDrafts()) return false;

  const publishInstant = getPublishInstant(data.date);
  if (publishInstant != null && publishInstant > Date.now() && !envShowsFuture()) {
    return false;
  }

  return true;
};
