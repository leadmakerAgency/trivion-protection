import type { MetadataRoute } from "next";
import { allAreas } from "@/lib/areas";
import { getMdxSlugs } from "@/lib/mdx";
import { getSiteUrl } from "@/lib/site";
import { services } from "@/lib/services";

const staticPaths = [
  "/",
  "/about",
  "/careers",
  "/contact",
  "/industries",
  "/services",
  "/service-areas",
  "/service-areas/california",
  "/service-areas/texas",
  "/knowledge",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  services.forEach((s) => {
    routes.push({
      url: `${base}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  allAreas.forEach((a) => {
    routes.push({
      url: `${base}/service-areas/${a.state}/${a.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: a.slug === "los-angeles-county" ? 0.9 : 0.65,
    });
  });

  getMdxSlugs("knowledge").forEach((slug) => {
    routes.push({
      url: `${base}/knowledge/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  getMdxSlugs("blog").forEach((slug) => {
    routes.push({
      url: `${base}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.55,
    });
  });

  return routes;
}
