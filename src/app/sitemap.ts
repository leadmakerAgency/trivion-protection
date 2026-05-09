import type { MetadataRoute } from "next";
import { allAreas } from "@/lib/areas";
import { getTotalPages } from "@/lib/blog-pagination";
import { getMdxLastModified, getMdxSlugs } from "@/lib/mdx";
import { getSiteUrl } from "@/lib/site";
import { services } from "@/lib/services";

export const dynamic = "force-static";

const staticPaths = [
  "/",
  "/about",
  "/careers",
  "/contact",
  "/industries",
  "/services",
  "/our-process",
  "/service-areas",
  "/service-areas/california",
  "/service-areas/texas",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const fallbackLastMod = new Date();
  const staticLastModFromEnv = process.env.NEXT_PUBLIC_SITE_STATIC_LASTMOD_ISO;
  const staticLastModified =
    staticLastModFromEnv && !Number.isNaN(new Date(staticLastModFromEnv).getTime())
      ? new Date(staticLastModFromEnv)
      : fallbackLastMod;

  const routes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: staticLastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  services.forEach((s) => {
    routes.push({
      url: `${base}/services/${s.slug}`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  allAreas.forEach((a) => {
    routes.push({
      url: `${base}/service-areas/${a.state}/${a.slug}`,
      lastModified: staticLastModified,
      changeFrequency: "monthly",
      priority: a.slug === "los-angeles-county" ? 0.9 : 0.65,
    });
  });

  const blogSlugs = getMdxSlugs();
  blogSlugs.forEach((slug) => {
    routes.push({
      url: `${base}/blog/${slug}`,
      lastModified: getMdxLastModified(slug),
      changeFrequency: "monthly",
      priority: 0.55,
    });
  });

  const blogPageCount = getTotalPages(blogSlugs.length);
  if (blogPageCount > 1) {
    for (let page = 2; page <= blogPageCount; page += 1) {
      routes.push({
        url: `${base}/blog/page/${page}`,
        lastModified: staticLastModified,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  return routes;
}
