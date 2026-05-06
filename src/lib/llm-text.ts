import { allAreas, californiaAreas, texasAreas } from "@/lib/areas";
import { industries } from "@/lib/industries";
import {
  getBlogIndex,
  getKnowledgeIndex,
  getMdxSource,
} from "@/lib/mdx";
import { homeDescription } from "@/lib/seo";
import { services, type ServiceItem } from "@/lib/services";
import { SITE_NAME, SITE_TAGLINE, getSiteUrl } from "@/lib/site";

const absUrl = (path: string) => {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
};

const getServiceTitle = (slug: string): string =>
  services.find((s) => s.slug === slug)?.title ?? slug;

const stripTrailingPeriod = (text: string) => text.replace(/\s+$/, "");

const oneLine = (text: string) =>
  stripTrailingPeriod(text.replace(/\s+/g, " ").trim());

const linkLine = (label: string, url: string, summary: string) =>
  `- [${label}](${url}): ${oneLine(summary)}`;

const heading = (level: 1 | 2 | 3, text: string) =>
  `${"#".repeat(level)} ${text}`;

export const buildLlmsTxt = (): string => {
  const lines: string[] = [];

  lines.push(heading(1, SITE_NAME));
  lines.push(`> ${oneLine(homeDescription)}`);
  lines.push("");

  lines.push(heading(2, "Services"));
  services.forEach((s) => {
    lines.push(
      linkLine(
        s.title,
        absUrl(`/services/${s.slug}`),
        s.shortDescription,
      ),
    );
  });
  lines.push("");

  lines.push(heading(2, "Service Areas"));
  lines.push(
    linkLine(
      "California — service areas",
      absUrl("/service-areas/california"),
      "California counties and metros covered by Trivon Protection programs.",
    ),
  );
  californiaAreas.forEach((a) => {
    lines.push(
      linkLine(
        a.name,
        absUrl(`/service-areas/california/${a.slug}`),
        a.metaDescription,
      ),
    );
  });
  lines.push(
    linkLine(
      "Texas — service areas",
      absUrl("/service-areas/texas"),
      "Texas regional service areas supported by Trivon Protection.",
    ),
  );
  texasAreas.forEach((a) => {
    lines.push(
      linkLine(
        a.name,
        absUrl(`/service-areas/texas/${a.slug}`),
        a.metaDescription,
      ),
    );
  });
  lines.push("");

  lines.push(heading(2, "Industries"));
  industries.forEach((i) => {
    lines.push(
      linkLine(i.title, absUrl(`/industries#${i.id}`), i.summary),
    );
  });
  lines.push("");

  const knowledge = getKnowledgeIndex();
  if (knowledge.length > 0) {
    lines.push(heading(2, "Knowledge"));
    knowledge.forEach((k) => {
      lines.push(
        linkLine(k.title, absUrl(`/knowledge/${k.slug}`), k.description),
      );
    });
    lines.push("");
  }

  const blog = getBlogIndex();
  if (blog.length > 0) {
    lines.push(heading(2, "Blog"));
    blog.forEach((b) => {
      lines.push(
        linkLine(b.title, absUrl(`/blog/${b.slug}`), b.description),
      );
    });
    lines.push("");
  }

  lines.push(heading(2, "Company"));
  lines.push(
    linkLine(
      "About",
      absUrl("/about"),
      `Background, posture, and operating principles for ${SITE_NAME}.`,
    ),
  );
  lines.push(
    linkLine(
      "Our Process",
      absUrl("/our-process"),
      "How engagements start: site walk, post orders, mobilization, and ongoing supervision.",
    ),
  );
  lines.push(
    linkLine(
      "Careers",
      absUrl("/careers"),
      "Open roles for licensed officers and supervisors.",
    ),
  );
  lines.push(
    linkLine(
      "Contact",
      absUrl("/contact"),
      "Request a written quote or talk to operations.",
    ),
  );
  lines.push("");

  lines.push(heading(2, "Optional"));
  lines.push(
    linkLine(
      "llms-full.txt",
      absUrl("/llms-full.txt"),
      "Full long-form content (services, service areas, industries, knowledge, and blog) concatenated as a single markdown document for offline AI ingestion.",
    ),
  );
  lines.push(
    linkLine(
      "Sitemap",
      absUrl("/sitemap.xml"),
      "Machine-readable list of all indexable URLs.",
    ),
  );
  lines.push("");

  return lines.join("\n");
};

const formatBullets = (items: string[]) =>
  items.map((item) => `- ${oneLine(item)}`).join("\n");

const formatLabeledBullets = (
  items: { label: string; description: string }[],
) =>
  items
    .map((item) => `- **${item.label}** — ${oneLine(item.description)}`)
    .join("\n");

const formatScenarios = (items: { title: string; body: string }[]) =>
  items
    .map((item) => `- **${item.title}** — ${oneLine(item.body)}`)
    .join("\n");

const formatFaqs = (items: { question: string; answer: string }[]) =>
  items
    .map(
      (item) =>
        `**Q: ${item.question}**\n\n${oneLine(item.answer)}`,
    )
    .join("\n\n");

const formatService = (s: ServiceItem): string => {
  const sections: string[] = [];
  sections.push(heading(3, s.title));
  sections.push(`Source: ${absUrl(`/services/${s.slug}`)}`);
  sections.push(`Category: ${s.category}`);
  sections.push("");
  sections.push(s.whoBenefits);
  sections.push("");
  sections.push(`**Best for**\n\n${oneLine(s.bestFor)}`);
  sections.push("");
  sections.push(`**Short description**\n\n${oneLine(s.shortDescription)}`);
  sections.push("");
  sections.push(`**Highlights**\n\n${formatBullets(s.highlights)}`);
  sections.push("");
  sections.push(`**Scenarios**\n\n${formatScenarios(s.scenarios)}`);
  sections.push("");
  sections.push(`**Deliverables**\n\n${formatBullets(s.deliverables)}`);
  sections.push("");
  sections.push(
    `**Staffing models**\n\n${formatLabeledBullets(s.staffingModels)}`,
  );
  sections.push("");
  sections.push(`**Considerations**\n\n${formatBullets(s.considerations)}`);
  sections.push("");
  sections.push(`**FAQ**\n\n${formatFaqs(s.faqs)}`);

  if (s.decisionAid) {
    const { title, headers, rows } = s.decisionAid;
    const tableHeader = `| ${headers.join(" | ")} |`;
    const tableSep = `| ${headers.map(() => "---").join(" | ")} |`;
    const tableRows = rows
      .map((r) => `| ${r.feature} | ${r.left} | ${r.right} |`)
      .join("\n");
    sections.push("");
    sections.push(`**Decision aid: ${title}**`);
    sections.push("");
    sections.push([tableHeader, tableSep, tableRows].join("\n"));
  }

  return sections.join("\n");
};

const formatArea = (
  area: (typeof allAreas)[number],
): string => {
  const sections: string[] = [];
  sections.push(heading(3, area.name));
  sections.push(
    `Source: ${absUrl(`/service-areas/${area.state}/${area.slug}`)}`,
  );
  sections.push("");
  sections.push(area.intro);
  sections.push("");
  sections.push(`**Focus**\n\n${formatBullets(area.focusBullets)}`);
  sections.push("");
  sections.push(
    `**Common property types**\n\n${formatBullets(area.commonPropertyTypes)}`,
  );
  sections.push("");
  sections.push(`**Risk notes**\n\n${formatBullets(area.riskNotes)}`);
  sections.push("");

  const recommended = area.recommendedServiceSlugs.map((slug) => {
    const title = getServiceTitle(slug);
    return `- [${title}](${absUrl(`/services/${slug}`)})`;
  });
  if (recommended.length > 0) {
    sections.push(`**Recommended services**\n\n${recommended.join("\n")}`);
    sections.push("");
  }

  sections.push(
    `**Planning checklist**\n\n${formatBullets(area.planningChecklist)}`,
  );
  sections.push("");

  if (area.subMarkets && area.subMarkets.length > 0) {
    sections.push("**Sub-markets**");
    sections.push("");
    sections.push(formatScenarios(area.subMarkets));
    sections.push("");
  }

  sections.push(`**FAQ**\n\n${formatFaqs(area.faqs)}`);
  sections.push("");
  sections.push(area.closing);

  return sections.join("\n");
};

const formatIndustry = (
  industry: (typeof industries)[number],
): string => {
  const sections: string[] = [];
  sections.push(heading(3, industry.title));
  sections.push(`Source: ${absUrl(`/industries#${industry.id}`)}`);
  sections.push("");
  sections.push(industry.summary);
  sections.push("");
  sections.push(`**Challenges**\n\n${formatBullets(industry.challenges)}`);
  sections.push("");
  sections.push(
    `**Typical posts**\n\n${formatBullets(industry.typicalPosts)}`,
  );
  sections.push("");
  sections.push(
    `**Reporting tips**\n\n${formatBullets(industry.reportingTips)}`,
  );
  sections.push("");

  const primary = `- Primary service: [${getServiceTitle(industry.primaryServiceSlug)}](${absUrl(`/services/${industry.primaryServiceSlug}`)})`;
  const secondary = industry.secondaryServiceSlug
    ? `- Secondary service: [${getServiceTitle(industry.secondaryServiceSlug)}](${absUrl(`/services/${industry.secondaryServiceSlug}`)})`
    : null;
  sections.push(`**Recommended services**\n\n${[primary, secondary]
    .filter((x): x is string => Boolean(x))
    .join("\n")}`);

  return sections.join("\n");
};

const formatMdxArticle = (
  segment: "knowledge" | "blog",
  slug: string,
): string | null => {
  const post = getMdxSource(segment, slug);
  if (!post) return null;
  const url = absUrl(`/${segment}/${slug}`);
  const meta = post.meta;
  const headerLines = [
    heading(3, meta.title),
    `Source: ${url}`,
    meta.date ? `Published: ${meta.date}` : null,
    meta.author ? `Author: ${meta.author}` : null,
  ]
    .filter((x): x is string => Boolean(x))
    .join("\n");
  return [headerLines, "", oneLine(meta.description), "", post.content.trim()]
    .join("\n");
};

export const buildLlmsFullTxt = (): string => {
  const sections: string[] = [];

  sections.push(heading(1, `${SITE_NAME} — Full Content`));
  sections.push(
    `> ${SITE_NAME}: ${SITE_TAGLINE}. Generated ${new Date()
      .toISOString()
      .slice(0, 10)}. Source: ${getSiteUrl()}.`,
  );
  sections.push("");

  sections.push(heading(2, "About"));
  sections.push(homeDescription);
  sections.push("");
  sections.push(
    `${SITE_NAME} is a Los Angeles County security guard company. We document risk, write post orders that fit how a site actually operates, and run programs with supervision and reporting that hold up in operations and legal review.`,
  );
  sections.push("");

  sections.push(heading(2, "Services"));
  services.forEach((s) => {
    sections.push(formatService(s));
    sections.push("");
  });

  sections.push(heading(2, "Service Areas"));
  sections.push(heading(3, "California"));
  sections.push(
    `Hub: ${absUrl("/service-areas/california")} — counties and metros covered.`,
  );
  sections.push("");
  californiaAreas.forEach((a) => {
    sections.push(formatArea({ ...a, state: "california" }));
    sections.push("");
  });
  sections.push(heading(3, "Texas"));
  sections.push(
    `Hub: ${absUrl("/service-areas/texas")} — Texas regional coverage.`,
  );
  sections.push("");
  texasAreas.forEach((a) => {
    sections.push(formatArea({ ...a, state: "texas" }));
    sections.push("");
  });

  sections.push(heading(2, "Industries"));
  industries.forEach((i) => {
    sections.push(formatIndustry(i));
    sections.push("");
  });

  const knowledge = getKnowledgeIndex();
  if (knowledge.length > 0) {
    sections.push(heading(2, "Knowledge"));
    knowledge.forEach((k) => {
      const article = formatMdxArticle("knowledge", k.slug);
      if (article) {
        sections.push(article);
        sections.push("");
      }
    });
  }

  const blog = getBlogIndex();
  if (blog.length > 0) {
    sections.push(heading(2, "Blog"));
    blog.forEach((b) => {
      const article = formatMdxArticle("blog", b.slug);
      if (article) {
        sections.push(article);
        sections.push("");
      }
    });
  }

  return sections.join("\n");
};
