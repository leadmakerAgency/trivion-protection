import type { MetadataRoute } from "next";
import { BLOG_STATIC_EXPORT_STUB_SLUG } from "@/lib/blog-static-export";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/llms.txt", "/llms-full.txt"],
      disallow: [`/blog/${BLOG_STATIC_EXPORT_STUB_SLUG}`, `/blog/${BLOG_STATIC_EXPORT_STUB_SLUG}/opengraph-image`],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
