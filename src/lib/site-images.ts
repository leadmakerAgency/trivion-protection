/**
 * Local stock in `/public/images` (Unsplash). Filenames are stable; swap files to refresh.
 * Roles map to marketing sections and service detail bands — see `serviceDetailImage`.
 *
 * Unsplash photo IDs (for attribution lookup): 2b7thBC3Cf8, 8FxJi5wuwKc, YQ9aFeawqeo,
 * _D6rTxw4HAI, lUA0Lr28pHE, zNxieNI-UMI (cctv-wall placeholder if download blocked),
 * pE4VY7r5bsg, arde7oXuA0I (control-room placeholder if download blocked).
 * Extra: guard-warehouse-aisle, guard-parking-lot (logistics / patrol context).
 */
export const siteImages = {
  heroPrimary: "/images/guard-entrance.jpg",
  guardEntrance: "/images/guard-entrance.jpg",
  guardGrayFloor: "/images/guard-gray-floor.jpg",
  guardEventTent: "/images/guard-event-tent.jpg",
  guardNightStreet: "/images/guard-night-street.jpg",
  guardHeadphones: "/images/guard-headphones.jpg",
  cctvWall: "/images/cctv-wall.jpg",
  cctvBuilding: "/images/cctv-building.jpg",
  controlRoom: "/images/control-room.jpg",
  guardWarehouseAisle: "/images/guard-warehouse-aisle.jpg",
  guardParkingLot: "/images/guard-parking-lot.jpg",
  corporateAccess: "/images/team.jpg",
  warehouse: "/images/warehouse.jpg",
  construction: "/images/construction.jpg",
  patrol: "/images/patrol.jpg",
  teamPersonnel: "/images/team.jpg",
  heroLegacy: "/images/hero.jpg",
} as const;

export type SiteImageKey = keyof typeof siteImages;

export const imageAttribution =
  "Photography: Unsplash (unsplash.com/license) — stored locally for fast, reliable loading.";

const serviceImageBySlug: Record<string, string> = {
  "armed-security-guards": siteImages.guardHeadphones,
  "unarmed-security-guards": siteImages.guardGrayFloor,
  "marked-vehicle-patrol-security": siteImages.guardNightStreet,
  "fire-watch-security-guards": siteImages.guardEventTent,
  "construction-site-security-guards": siteImages.construction,
  "warehouse-security-guards": siteImages.guardWarehouseAisle,
};

/** Full-width image band per service detail page */
export const serviceDetailImage = (slug: string): string =>
  serviceImageBySlug[slug] ?? siteImages.heroPrimary;
