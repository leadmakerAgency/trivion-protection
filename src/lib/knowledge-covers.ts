import { siteImages } from "@/lib/site-images";

/** Default thumbnails for Knowledge posts when frontmatter omits coverImage */
export const knowledgeCoverBySlug: Record<string, string> = {
  "what-is-fire-watch-security":
    "https://images.pexels.com/photos/7508684/pexels-photo-7508684.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200",
  "armed-vs-unarmed-security-guards":
    "https://images.pexels.com/photos/13422379/pexels-photo-13422379.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1200",
  "how-much-do-security-guards-cost-los-angeles":
    "https://images.unsplash.com/photo-1517913451214-e22ce660e086?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNlY3VyaXR5JTIwZ3VhcmR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=1920",
};

export const resolveKnowledgeCover = (slug: string, coverImage?: string): string =>
  coverImage ?? knowledgeCoverBySlug[slug] ?? siteImages.heroPrimary;
