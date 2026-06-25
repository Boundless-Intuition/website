import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";

/** True when a paragraph wraps a single <em> — our figure-caption convention. */
function isCaption(node: unknown): boolean {
  const children = (node as { children?: Array<{ tagName?: string; type?: string }> })?.children;
  const real = children?.filter((c) => !(c.type === "text" && !(c as { value?: string }).value?.trim()));
  return real?.length === 1 && real[0].tagName === "em";
}

function buildComponents(assetBase: string): Components {
  return {
    h2: ({ children }) => (
      <h2
        className="mt-16 mb-5 scroll-mt-24 text-balance text-2xl leading-tight tracking-tight md:text-3xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="mt-10 mb-4 text-xl leading-snug tracking-tight md:text-2xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-3 text-base font-semibold tracking-tight">{children}</h4>
    ),
    p: ({ children, node }) => {
      if (isCaption(node)) {
        return (
          <p className="mx-auto mt-3 mb-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            {children}
          </p>
        );
      }
      return <p className="my-5 text-[1.05rem] leading-[1.8] text-foreground/90">{children}</p>;
    },
    a: ({ children, href }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-6 text-[1.05rem] leading-[1.8] text-foreground/90 marker:text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-5 list-decimal space-y-3 pl-6 text-[1.05rem] leading-[1.8] text-foreground/90 marker:text-muted-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    hr: () => <hr className="my-12 border-0 border-t border-border" />,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-foreground/30 pl-5 italic text-foreground/80">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => {
      const resolved =
        typeof src === "string" && !src.startsWith("http") && !src.startsWith("/")
          ? `${assetBase}/${src.replace(/^\.?\//, "")}`
          : src;
      return (
        <img
          src={resolved as string}
          alt={alt ?? ""}
          loading="lazy"
          className="mx-auto mt-10 w-full rounded-lg border border-border bg-background shadow-sm"
        />
      );
    },
    code: ({ className, children }) => {
      const isBlock = /language-/.test(className ?? "");
      if (isBlock) {
        return <code className={`${className ?? ""} font-mono text-sm`}>{children}</code>;
      }
      return (
        <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-foreground/[0.035] p-5 text-sm leading-relaxed dark:bg-foreground/[0.04]">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-foreground/[0.04]">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b border-border last:border-0">{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 align-top text-foreground/90 tabular-nums">{children}</td>
    ),
  };
}

export function Markdown({
  content,
  assetBase,
}: {
  content: string;
  assetBase: string;
}): ReactNode {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(assetBase)}>
      {content}
    </ReactMarkdown>
  );
}
