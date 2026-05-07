import { getSiteUrl } from "@/lib/site";

/** Default OG / Twitter landscape image routes (see `src/app/opengraph-image.tsx`). */
export const defaultOpenGraphImagePath = "/opengraph-image";

export const defaultOpenGraphImageUrl = (): string => `${getSiteUrl()}${defaultOpenGraphImagePath}`;
