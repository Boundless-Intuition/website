import type { ReactNode } from "react";

// Shared typographic primitives for long-form research posts. Every blog
// content file composes these instead of hand-rolling Tailwind classes per
// element, so paragraph rhythm, heading scale, and table/code treatment stay
// identical across posts.

export function Prose({ children }: { children: ReactNode }) {
  return <div className="min-w-0 max-w-[70ch]">{children}</div>;
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mb-8 text-[18px] leading-[1.65] text-foreground/90">
      {children}
    </p>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-[16px] leading-[1.75] text-foreground/85">
      {children}
    </p>
  );
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-4 mt-14 scroll-mt-24 font-display text-[25px] font-medium leading-tight tracking-tight text-foreground md:text-[28px]"
    >
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="mb-3 mt-9 scroll-mt-24 font-display text-[18.5px] font-medium tracking-tight text-foreground"
    >
      {children}
    </h3>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-foreground/85">
      {children}
    </ul>
  );
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="mb-5 list-decimal space-y-2 pl-5 text-[16px] leading-[1.7] text-foreground/85">
      {children}
    </ol>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.86em] text-foreground">
      {children}
    </code>
  );
}

export function CodeBlock({
  children,
  lang,
}: {
  children: string;
  lang?: string;
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-sm border border-border">
      {lang && (
        <div className="border-b border-border bg-muted px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {lang}
        </div>
      )}
      <pre className="overflow-x-auto bg-ink p-4 font-mono text-[13px] leading-relaxed text-ink-foreground">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
  note,
}: {
  headers: string[];
  rows: ReactNode[][];
  note?: ReactNode;
}) {
  return (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-[14px]">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border border-border bg-muted px-3 py-2 text-left font-display font-medium text-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-border px-3 py-2 text-foreground/85"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {note && (
        <p className="mt-2 text-[12.5px] text-muted-foreground">{note}</p>
      )}
    </div>
  );
}

// Figures in the source reports referenced static image assets that were
// never shipped. Instead of a broken <img>, each figure now renders a real,
// interactive chart (hover for exact values) built from the numbers already
// in the post, with the original caption kept as the note underneath.
export function Figure({
  n,
  caption,
  children,
}: {
  n: number;
  caption: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="mb-6 overflow-hidden rounded-sm border border-border bg-muted/20">
      <div className="p-4 pt-5 md:p-6">{children}</div>
      <figcaption className="border-t border-border px-4 py-3 text-[13.5px] leading-relaxed text-muted-foreground md:px-6">
        <span className="mr-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/60">
          Fig. {n}
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}

export function Details({
  summary,
  children,
}: {
  summary: ReactNode;
  children: ReactNode;
}) {
  return (
    <details className="group mb-6 rounded-sm border border-border bg-muted/30 px-4 py-3">
      <summary className="cursor-pointer list-none font-display text-[14.5px] font-medium text-foreground">
        <span className="mr-2 inline-block text-muted-foreground transition-transform group-open:rotate-90">
          ›
        </span>
        {summary}
      </summary>
      <div className="mt-3 text-[14.5px] leading-relaxed text-foreground/80 [&>p:last-child]:mb-0">
        {children}
      </div>
    </details>
  );
}

export function Hr() {
  return <hr className="my-12 border-border" />;
}

export function FootnoteRef({ id }: { id: string }) {
  return (
    <sup>
      <a
        href={`#fn-${id}`}
        id={`fnref-${id}`}
        className="text-accent no-underline"
      >
        [{id}]
      </a>
    </sup>
  );
}

export function Notes({ children }: { children: ReactNode }) {
  return (
    <ol className="space-y-3 text-[13.5px] leading-relaxed text-muted-foreground">
      {children}
    </ol>
  );
}

export function Note({ id, children }: { id: string; children: ReactNode }) {
  return (
    <li id={`fn-${id}`} className="flex gap-2">
      <span className="shrink-0 text-foreground/60">[{id}]</span>
      <span>
        {children}{" "}
        <a href={`#fnref-${id}`} className="ml-1 text-accent">
          ↩
        </a>
      </span>
    </li>
  );
}

export function References({ children }: { children: ReactNode }) {
  return (
    <ol className="mb-5 list-decimal space-y-3 pl-5 text-[14px] leading-relaxed text-muted-foreground">
      {children}
    </ol>
  );
}
