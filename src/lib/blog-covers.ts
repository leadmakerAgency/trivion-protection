import { siteImages } from "@/lib/site-images";

/** Default cover art per post when frontmatter `coverImage` is omitted */
export const blogCoverBySlug: Record<string, string> = {
  "construction-site-theft-prevention-los-angeles":
    "https://images.unsplash.com/photo-1599350686877-382a54114d2f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNlY3VyaXR5JTIwY2FtZXJhfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=1920",
  "los-angeles-private-security-hiring-checklist":
    "https://images.unsplash.com/photo-1495714096525-285e85481946?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlY3VyaXR5JTIwY2FtZXJhfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=1920",
};

export const resolveBlogCover = (slug: string, coverImage?: string): string =>
  coverImage ?? blogCoverBySlug[slug] ?? siteImages.heroPrimary;
