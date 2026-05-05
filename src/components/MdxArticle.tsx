import { MDXRemote } from "next-mdx-remote/rsc";

type MdxTone = "dark" | "light";

const buildMdxComponents = (tone: MdxTone) => {
  const fg = tone === "light" ? "text-foreground-on-light" : "text-foreground";
  const muted = tone === "light" ? "text-muted-on-light" : "text-muted";
  const accent = tone === "light" ? "text-accent-dark" : "text-accent";
  const border = tone === "light" ? "border-surface-light-edge" : "border-edge";
  const subtleBg = tone === "light" ? "bg-surface-light" : "bg-panel";

  const linkClass =
    tone === "light"
      ? "text-accent-dark underline-offset-4 hover:underline"
      : "text-accent underline-offset-4 hover:underline";

  return {
    h1: (props: React.ComponentProps<"h1">) => (
      <h1 className={`mt-10 text-4xl font-semibold tracking-tight ${fg}`} {...props} />
    ),
    h2: (props: React.ComponentProps<"h2">) => (
      <h2 className={`mt-10 text-3xl font-semibold tracking-tight ${fg}`} {...props} />
    ),
    h3: (props: React.ComponentProps<"h3">) => (
      <h3 className={`mt-8 text-2xl font-semibold ${fg}`} {...props} />
    ),
    p: (props: React.ComponentProps<"p">) => (
      <p className={`mt-4 text-base leading-relaxed ${muted} sm:text-lg`} {...props} />
    ),
    ul: (props: React.ComponentProps<"ul">) => (
      <ul className={`mt-4 list-disc space-y-2 pl-6 ${muted}`} {...props} />
    ),
    ol: (props: React.ComponentProps<"ol">) => (
      <ol className={`mt-4 list-decimal space-y-2 pl-6 ${muted}`} {...props} />
    ),
    li: (props: React.ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
    a: ({ className, ...rest }: React.ComponentProps<"a">) => (
      <a className={`${linkClass} ${className ?? ""}`.trim()} {...rest} />
    ),
    strong: (props: React.ComponentProps<"strong">) => (
      <strong className={`font-semibold ${fg}`} {...props} />
    ),
    blockquote: (props: React.ComponentProps<"blockquote">) => (
      <blockquote
        className={
          tone === "light"
            ? "mt-6 border-l-4 border-solid border-accent-dark bg-surface-light px-4 py-3 text-base text-foreground-on-light/95"
            : "mt-6 border-l-4 border-solid border-accent bg-panel px-4 py-3 text-base text-foreground/90"
        }
        {...props}
      />
    ),
    hr: (props: React.ComponentProps<"hr">) => (
      <hr className={`my-10 border-0 border-t border-solid ${border}`} {...props} />
    ),
    code: (props: React.ComponentProps<"code">) => (
      <code
        className={`rounded-sm border ${border} px-1.5 py-0.5 font-mono text-[0.9em] ${subtleBg} ${fg}/95`}
        {...props}
      />
    ),
    pre: (props: React.ComponentProps<"pre">) => (
      <pre
        className={`mt-6 overflow-x-auto rounded-sm border ${border} p-4 font-mono text-sm ${subtleBg} ${fg}/95 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit`}
        {...props}
      />
    ),
    table: (props: React.ComponentProps<"table">) => (
      <div className={`mt-6 overflow-x-auto rounded-sm border ${border}`}>
        <table className={`w-full border-collapse text-left text-sm ${muted}`} {...props} />
      </div>
    ),
    thead: (props: React.ComponentProps<"thead">) => (
      <thead className={`${subtleBg} ${fg}`} {...props} />
    ),
    tbody: (props: React.ComponentProps<"tbody">) => <tbody {...props} />,
    tr: (props: React.ComponentProps<"tr">) => <tr className={`border-t ${border}`} {...props} />,
    th: (props: React.ComponentProps<"th">) => (
      <th
        className={`border ${border} px-3 py-2 text-xs font-semibold uppercase tracking-wide`}
        {...props}
      />
    ),
    td: (props: React.ComponentProps<"td">) => (
      <td className={`border ${border} px-3 py-2 align-top`} {...props} />
    ),
  };
};

type MdxArticleProps = {
  source: string;
  tone?: MdxTone;
};

export const MdxArticle = ({ source, tone = "dark" }: MdxArticleProps) => {
  const components = buildMdxComponents(tone);

  return (
    <article className="prose-custom mx-auto max-w-4xl">
      <MDXRemote source={source} components={components} />
    </article>
  );
};
