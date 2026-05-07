/**
 * Remote imagery (Imgur hero, Pexels, Unsplash). Loaded via `next/image`: see `next.config.ts` remotePatterns.
 * Roles map to marketing sections and service detail bands: see `serviceDetailImage`.
 */
export const siteImages = {
  heroPrimary: "https://i.imgur.com/hArFIQ3.png",
  guardEntrance:
    "https://images.pexels.com/photos/31594272/pexels-photo-31594272/free-photo-of-security-guard-at-modern-entrance-booth-outdoors.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200",
  guardGrayFloor:
    "https://images.unsplash.com/photo-1523294557-3637e1db3f33?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=1920",
  guardEventTent:
    "https://images.unsplash.com/photo-1587647069256-6ec77c96c2a4?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=1920",
  guardNightStreet:
    "https://images.unsplash.com/photo-1652739758426-56a564265f9e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VjdXJpdHklMjBndWFyZHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=1920",
  guardHeadphones:
    "https://images.unsplash.com/photo-1566245024852-04fbf7842ce9?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=1920",
  cctvWall:
    "https://images.pexels.com/photos/29866272/pexels-photo-29866272/free-photo-of-outdoor-security-camera-on-concrete-wall.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200",
  cctvBuilding:
    "https://images.unsplash.com/photo-1618482914248-29272d021005?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=1920",
  controlRoom:
    "https://images.unsplash.com/photo-1641762557527-97c36271e2f8?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VjdXJpdHklMjBjYW1lcmFzfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=1920",
  guardWarehouseAisle:
    "https://images.pexels.com/photos/34622629/pexels-photo-34622629/free-photo-of-security-personnel-patrolling-indoor-mall-area.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200",
  guardParkingLot:
    "https://images.unsplash.com/photo-1653592956557-48ae49fc5ef5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=1920",
  corporateAccess:
    "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VjdXJpdHklMjBndWFyZHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=1920",
  warehouse:
    "https://images.unsplash.com/photo-1563920443079-783e5c786b83?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlY3VyaXR5JTIwY2FtZXJhfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=1920",
  construction:
    "https://images.pexels.com/photos/33797919/pexels-photo-33797919/free-photo-of-black-and-white-security-gate-scene-outdoors.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200",
  patrol:
    "https://images.pexels.com/photos/33620193/pexels-photo-33620193/free-photo-of-security-guard-standing-outdoors-in-shanghai.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200",
  teamPersonnel:
    "https://images.unsplash.com/photo-1581568736305-49a04e012c13?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VjdXJpdHklMjBndWFyZHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=1920",
  heroLegacy:
    "https://images.pexels.com/photos/207574/pexels-photo-207574.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200",
} as const;

export type SiteImageKey = keyof typeof siteImages;

export const imageAttribution =
  "Photography: homepage hero image (i.imgur.com); stock photography from Pexels (pexels.com/license) and Unsplash (unsplash.com/license), optimized by Next.js.";

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
