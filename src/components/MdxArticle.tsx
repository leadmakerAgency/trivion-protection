import { MDXRemote } from "next-mdx-remote/rsc";

const mdxComponents = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="mt-10 text-4xl font-semibold tracking-tight text-foreground" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-10 text-3xl font-semibold tracking-tight text-foreground" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-8 text-2xl font-semibold text-foreground" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-accent underline-offset-4 hover:underline" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-4 border-solid border-accent bg-panel px-4 py-3 text-base text-foreground/90"
      {...props}
    />
  ),
  hr: (props: React.ComponentProps<"hr">) => (
    <hr className="my-10 border-0 border-t border-solid border-edge" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      className="rounded-sm border border-edge bg-panel px-1.5 py-0.5 font-mono text-[0.9em] text-foreground/95"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-sm border border-edge bg-panel p-4 font-mono text-sm text-foreground/95 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      {...props}
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="mt-6 overflow-x-auto rounded-sm border border-edge">
      <table className="w-full border-collapse text-left text-sm text-muted" {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => <thead className="bg-panel text-foreground" {...props} />,
  tbody: (props: React.ComponentProps<"tbody">) => <tbody {...props} />,
  tr: (props: React.ComponentProps<"tr">) => <tr className="border-t border-edge" {...props} />,
  th: (props: React.ComponentProps<"th">) => (
    <th className="border border-edge px-3 py-2 text-xs font-semibold uppercase tracking-wide" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border border-edge px-3 py-2 align-top" {...props} />
  ),
};

type MdxArticleProps = {
  source: string;
};

export const MdxArticle = ({ source }: MdxArticleProps) => {
  return (
    <article className="prose-custom mx-auto max-w-4xl">
      <MDXRemote source={source} components={mdxComponents} />
    </article>
  );
};
