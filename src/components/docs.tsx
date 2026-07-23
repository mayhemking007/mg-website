import { ArrowLeft, ArrowRight, BookOpen, CircleDot, Clock3, Gauge } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { OnThisPage } from "@/components/on-this-page";
import { DocsHeader } from "@/components/docs-header";
import {
  CodeBlock,
  DocsSidebar,
  Footer,
  MobileDocsNav,
} from "@/components/site";
import {
  type DocPage,
  docsNavGroups,
  docsNavItems,
  getAdjacentDocs,
} from "@/lib/docs";
import { docsSearchIndex } from "@/lib/docs/search";
import { getDocSectionId } from "@/lib/docs/section-id";

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
      <DocsHeader searchRecords={docsSearchIndex} />

      <div className="docs-layout mx-auto grid max-w-[1680px] gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-8 xl:grid-cols-[250px_minmax(0,1fr)_220px] xl:gap-16">
        <div>
          <DocsSidebar groups={docsNavGroups} items={docsNavItems} activeHref={activeHref} />
          <MobileDocsNav groups={docsNavGroups} items={docsNavItems} activeHref={activeHref} />
        </div>

        <article id="docs-content" className="min-w-0">
          {children}
          <Footer contained />
        </article>

        <OnThisPage sections={tocSections} />
      </div>
    </main>
  );
}

export function DocsArticle({ page }: { page: DocPage }) {
  const activeHref = page.slug ? `/docs/${page.slug}` : "/docs";
  const adjacent = getAdjacentDocs(page.slug);
  const tocSections = page.sections.map((section) => ({
    id: getDocSectionId(section.title),
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
        {page.guideMeta ? (
          <div className="mt-6 grid max-w-3xl gap-3 rounded-lg border border-emerald-300/15 bg-emerald-300/[0.045] p-4 text-sm text-slate-300 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-emerald-300" />
              <span><span className="font-medium text-white">Estimated time:</span> {page.guideMeta.time}</span>
            </div>
            {page.guideMeta.difficulty ? (
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-sky-300" />
                <span><span className="font-medium text-white">Level:</span> {page.guideMeta.difficulty}</span>
              </div>
            ) : null}
            {page.guideMeta.prerequisites?.length ? (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:col-span-2">
                <span className="font-medium text-white">Prerequisites:</span>
                {page.guideMeta.prerequisites.map((item, index) => (
                  <span key={item.href}>
                    <Link className="text-sky-300 transition-colors hover:text-sky-200" href={item.href}>{item.label}</Link>
                    {index < page.guideMeta!.prerequisites!.length - 1 ? <span className="ml-2 text-slate-600">·</span> : null}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </header>

      <div>
        {page.sections.map((section) => (
          <section
            key={section.title}
            id={getDocSectionId(section.title)}
            className="docs-section border-b border-white/10 py-9 last:border-b-0"
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
                    <CircleDot className="mt-1.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <span>{renderInlineCode(item)}</span>
                  </div>
                ))}
              </div>
            ) : null}
            {section.links ? (
              <div className="mt-5 grid gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md border border-white/10 bg-white/[0.025] px-4 py-3 transition-colors hover:border-emerald-300/25 hover:bg-emerald-300/[0.05]"
                  >
                    <span className="block text-sm font-medium text-emerald-200">{link.label}</span>
                    {link.description ? <span className="mt-1 block text-sm leading-6 text-slate-400">{link.description}</span> : null}
                  </Link>
                ))}
              </div>
            ) : null}
            {section.diagram ? <DocsDiagram type={section.diagram} /> : null}
            {section.code ? (
              <div className="mt-6 grid gap-4">
                {section.code.map((block) => (
                  <CodeBlock
                    key={`${section.title}-${block.label}`}
                    label={block.label}
                    code={block.code}
                    language={block.language}
                  />
                ))}
              </div>
            ) : null}
          </section>
        ))}

        <nav className="grid gap-4 pb-10 pt-16 sm:grid-cols-2">
          {adjacent.previous ? (
            <Link className="panel docs-pager-link flex items-center gap-3 p-4 text-sm text-slate-300 hover:text-white" href={adjacent.previous.href}>
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
            <Link className="panel docs-pager-link flex items-center justify-between gap-3 p-4 text-sm text-slate-300 hover:text-white" href={adjacent.next.href}>
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
  if (type === "intro-graph") {
    return (
      <div className="docs-diagram docs-graph-diagram">
        <svg className="docs-graph-svg" viewBox="0 0 1120 260" role="img" aria-label="Messages are segmented into topic nodes, which produce structured memories, graph edges, and grafting; structured memories support recall.">
          <defs>
            <marker id="docs-intro-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>

          <path className="docs-graph-edge" d="M 200 130 H 250" />
          <path className="docs-graph-edge" d="M 430 130 H 480" />
          <path className="docs-graph-edge" d="M 620 130 C 650 130, 655 45, 700 45" />
          <path className="docs-graph-edge" d="M 620 130 H 700" />
          <path className="docs-graph-edge" d="M 620 130 C 650 175, 665 217, 715 217" />
          <path className="docs-graph-edge docs-graph-edge-dotted" d="M 880 45 H 930" />

          <g className="docs-graph-node docs-graph-node-source" transform="translate(20 104)">
            <rect width="180" height="52" rx="9" />
            <text x="90" y="27">Messages or raw text</text>
          </g>
          <g className="docs-graph-node docs-graph-node-segment" transform="translate(250 104)">
            <rect width="180" height="52" rx="9" />
            <text x="90" y="27">Topic segmentation</text>
          </g>
          <g className="docs-graph-node docs-graph-node-topic" transform="translate(480 104)">
            <rect width="140" height="52" rx="9" />
            <text x="70" y="27">Topic nodes</text>
          </g>
          <g className="docs-graph-node docs-graph-node-memory" transform="translate(700 19)">
            <rect width="180" height="52" rx="9" />
            <text x="90" y="27">Structured memories</text>
          </g>
          <g className="docs-graph-node docs-graph-node-edges" transform="translate(700 104)">
            <rect width="160" height="52" rx="9" />
            <text x="80" y="27">Graph edges</text>
          </g>
          <g className="docs-graph-node docs-graph-node-graft" transform="translate(715 191)">
            <rect width="130" height="52" rx="9" />
            <text x="65" y="27">Grafting</text>
          </g>
          <g className="docs-graph-node docs-graph-node-recall" transform="translate(930 19)">
            <rect width="130" height="52" rx="9" />
            <text x="65" y="27">Recall</text>
          </g>
        </svg>
      </div>
    );
  }

  const diagrams = {
    "memory-graph": ["Messages", "Segments", "Topic nodes", "Memory nodes", "Graph edges"],
    "invoke-flow": ["invoke()", "Recall facts", "LLM response", "Background ingest", "Graph memory"],
    "ingestion-flow": ["Raw text", "Segment", "Embed", "Store", "Link graph"],
    "graft-flow": ["Source memory", "Select topics", "Provenance", "Target session"],
    "lifecycle-flow": ["Active memory", "Forget or suppress", "Filtered recall", "Studio audit", "Restore"],
    "recall-graft-flow": ["Choose intent", "Recall facts", "Assemble topics", "Copy when needed"],
    "scope-flow": ["Application identity", "Session boundary", "Optional tags", "Authorized recall"],
    "streaming-flow": ["Recall first", "Start provider stream", "Collect final text", "Ingest completed turn"],
    "fleet-flow": ["Worker memory", "Fleet shared memory", "Conductor selection", "Target worker"],
    "reentry-flow": ["Original topic", "Different topic", "Return to subject", "Reentry edge"],
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
