import type { ReactNode } from "react";
import { getBlogSlugStaticParams } from "@/lib/blog-static-export";

export function generateStaticParams() {
  return getBlogSlugStaticParams();
}

export default function BlogPostSlugLayout({ children }: { children: ReactNode }) {
  return children;
}
