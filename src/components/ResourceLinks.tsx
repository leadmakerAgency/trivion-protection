import Link from "next/link";
import type { MdxLinkPreview } from "@/lib/mdx";

type ResourceLinksProps = {
  title: string;
  items: MdxLinkPreview[];
  id?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
};

export const ResourceLinks = ({ title, items, id, tone = "dark", align = "left" }: ResourceLinksProps) => {
  if (items.length === 0) return null;

  const h2 = tone === "light" ? "text-foreground-on-light" : "text-foreground";
  const hover = tone === "light" ? "hover:border-accent-dark/30 hover:bg-white" : "hover:border-edge hover:bg-panel";
  const titleLink = tone === "light" ? "text-foreground-on-light group-hover:text-accent-dark" : "text-foreground";
  const desc = tone === "light" ? "text-muted-on-light" : "text-muted";

  const centered = align === "center";

  return (
    <section id={id} className={`scroll-mt-28 ${centered ? "text-center" : ""}`}>
      <h2
        className={`text-2xl font-semibold tracking-tight ${h2} ${centered ? "mx-auto max-w-3xl text-balance" : ""}`}
      >
        {title}
      </h2>
      <ul className={`mt-8 space-y-4 ${centered ? "mx-auto max-w-3xl text-left" : ""}`}>
        {items.map((item) => (
          <li key={`${item.segment}-${item.slug}`}>
            <Link
              href={item.href}
              className={`group block rounded-sm border border-transparent px-1 py-1 ${hover}`}
            >
              <span className={`text-sm font-semibold group-hover:underline ${titleLink}`}>
                {item.title}
              </span>
              <span className={`mt-1 block text-sm ${desc}`}>{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
