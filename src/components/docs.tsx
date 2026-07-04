import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { OnThisPage } from "@/components/on-this-page";
import {
  CodeBlock,
  DocsSidebar,
  Footer,
  Header,
  MobileDocsNav,
} from "@/components/site";
import {
  type DocPage,
  docsNavGroups,
  docsNavItems,
  getAdjacentDocs,
} from "@/lib/docs";

export function DocsFrame({
  activeHref,
  children,
  tocSections,
}: {
  activeHref: string;
  children: React.ReactNode;
  tocSections: Array<{ id: string; title: string }>;
}) {
  return (
    <main className="site-shell">
      <Header ctaHref="/docs/quick-start" ctaLabel="Quick Start" />

      <div className="docs-layout mx-auto grid max-w-[1500px] gap-7 px-4 py-7 sm:px-6 lg:grid-cols-[250px_minmax(0,820px)] lg:px-8 lg:py-8 xl:grid-cols-[250px_minmax(0,820px)_220px]">
        <div>
          <DocsSidebar groups={docsNavGroups} items={docsNavItems} activeHref={activeHref} />
          <MobileDocsNav groups={docsNavGroups} items={docsNavItems} activeHref={activeHref} />
        </div>

        <article className="min-w-0">{children}</article>

        <OnThisPage sections={tocSections} />
      </div>

      <Footer />
    </main>
  );
}

export function DocsArticle({ page }: { page: DocPage }) {
  const activeHref = page.slug ? `/docs/${page.slug}` : "/docs";
  const adjacent = getAdjacentDocs(page.slug);
  const tocSections = page.sections.map((section) => ({
    id: sectionId(section.title),
    title: section.title,
  }));

  return (
    <DocsFrame activeHref={activeHref} tocSections={tocSections}>
      <header className="pb-6 pt-2 lg:pt-5">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/docs" className="transition-colors hover:text-slate-300">
            Docs
          </Link>
          <span>/</span>
          <span className="text-slate-300">{page.slug ? page.title.replace(/\.$/, "") : "Introduction"}</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/8 px-3 py-1 text-sm text-sky-200">
          <BookOpen className="h-4 w-4" />
          {page.eyebrow}
        </div>
        <h1 className="mt-5 max-w-4xl text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{page.description}</p>
      </header>

      <div>
        {page.sections.map((section) => (
          <section
            key={section.title}
            id={sectionId(section.title)}
            className="docs-section scroll-mt-28 border-b border-white/10 py-9 last:border-b-0"
          >
            <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
            {section.body ? (
              <div className="mt-5 space-y-4 text-base leading-7 text-slate-300">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{renderInlineCode(paragraph)}</p>
                ))}
              </div>
            ) : null}
            {section.bullets ? (
              <div className="mt-5 grid gap-3 text-base leading-7 text-slate-300">
                {section.bullets.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                    <span>{renderInlineCode(item)}</span>
                  </div>
                ))}
              </div>
            ) : null}
            {section.diagram ? <DocsDiagram type={section.diagram} /> : null}
            {section.code ? (
              <div className="mt-6 grid gap-4">
                {section.code.map((block) => (
                  <CodeBlock key={`${section.title}-${block.label}`} label={block.label} code={block.code} />
                ))}
              </div>
            ) : null}
          </section>
        ))}

        <nav className="grid gap-4 py-10 sm:grid-cols-2">
          {adjacent.previous ? (
            <Link className="panel flex items-center gap-3 p-4 text-sm text-slate-300 hover:text-white" href={adjacent.previous.href}>
              <ArrowLeft className="h-4 w-4 text-sky-300" />
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Previous</span>
                {adjacent.previous.label}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {adjacent.next ? (
            <Link className="panel flex items-center justify-between gap-3 p-4 text-sm text-slate-300 hover:text-white" href={adjacent.next.href}>
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Next</span>
                {adjacent.next.label}
              </span>
              <ArrowRight className="h-4 w-4 text-emerald-300" />
            </Link>
          ) : null}
        </nav>
      </div>
    </DocsFrame>
  );
}

function DocsDiagram({ type }: { type: NonNullable<DocPage["sections"][number]["diagram"]> }) {
  const diagrams = {
    "memory-graph": ["Messages", "Segments", "Topic nodes", "Memory nodes", "Graph edges"],
    "invoke-flow": ["invoke()", "Recall facts", "LLM response", "Background ingest", "Graph memory"],
    "ingestion-flow": ["Raw text", "Segment", "Embed", "Store", "Link graph"],
    "graft-flow": ["Source memory", "Select topics", "Provenance", "Target session"],
    "lifecycle-flow": ["Active memory", "Forget or suppress", "Filtered recall", "Studio audit", "Restore"],
  } satisfies Record<string, string[]>;

  const nodes = diagrams[type];

  return (
    <div className="docs-diagram" aria-label={`${type} diagram`}>
      <div className="docs-diagram-track">
        {nodes.map((node, index) => (
          <div key={node} className="docs-diagram-step">
            <span className="docs-diagram-node">{node}</span>
            {index < nodes.length - 1 ? <span className="docs-diagram-arrow" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={part} className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-sm text-sky-200">
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}
