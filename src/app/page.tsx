import { ArrowRight, Check, GitBranch, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { InstallCommand } from "@/components/install-command";
import { MemoryLifecycleVisual } from "@/components/memory-lifecycle-visual";
import { CodeBlock, Footer, Header, SectionHeading } from "@/components/site";

const githubUrl = "https://github.com/mayhemking007/memo-grafter";

const apiSnippet = `import {
  MemoGrafterAgent,
  OpenAIEmbedAdapter,
  OpenAILLMAdapter,
} from "memo-grafter";

const agent = new MemoGrafterAgent({
  db: { connectionString: process.env.DATABASE_URL! },
  llm: new OpenAILLMAdapter("gpt-4o"),
  embedder: new OpenAIEmbedAdapter("text-embedding-3-small"),
});

await agent.initialize();
await agent.invoke("I prefer quiet areas in Kyoto.");

const memory = await agent.recall("Japan travel preferences");
console.log(memory.facts);`;

const capabilities = [
  "TypeScript-first",
  "Graph-native recall",
  "Lifecycle management",
  "Operator review",
  "PostgreSQL + pgvector",
];

const lifecycle = [
  ["Extracted", "A candidate fact is identified."],
  ["Active", "The fact is eligible for recall."],
  ["Updated", "New information changes the fact."],
  ["Superseded", "The earlier version stays inspectable."],
  ["Decayed", "Relevance can reduce over time."],
  ["Pruned", "Lifecycle rules remove noise."],
];

export default function Home() {
  return (
    <main className="site-shell">
      <Header githubUrl={githubUrl} />

      <section className="hero-section border-b border-white/10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:min-h-[calc(100vh-76px)] lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
          <div className="max-w-2xl">
            <p className="eyebrow">Lifecycle-managed memory for AI agents</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
              Memory that evolves with your AI agents.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-slate-300">
              Turn conversations into structured, versioned memory that agents can retrieve,
              review, and update across sessions. Built for TypeScript with typed pipelines,
              lifecycle controls, a CLI, and MemoGrafter Studio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" href="/docs/quick-start">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
              <a className="btn-secondary" href={githubUrl} target="_blank" rel="noreferrer">
                View on GitHub <GitBranch className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-5 max-w-sm">
              <InstallCommand />
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2" aria-label="Key capabilities">
              {capabilities.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <span className="h-1 w-1 rounded-full bg-emerald-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <MemoryLifecycleVisual />
        </div>
      </section>

      <section id="how-it-works" className="site-section scroll-mt-24">
        <SectionHeading eyebrow="How it works" title="From conversation to useful context" text="A focused pipeline turns raw dialogue into memory that can change without losing its history." />
        <div className="how-grid mt-12">
          {[
            ["01", "Extract", "Convert conversations into topics and atomic memories."],
            ["02", "Evolve", "Detect conflicts, version facts, supersede stale information, and apply lifecycle rules."],
            ["03", "Recall", "Retrieve only relevant active memories and graft them into the agent context."],
          ].map(([number, title, text]) => (
            <article className="how-step" key={title}>
              <span className="how-number">{number}</span>
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-white/10 bg-white/[0.018] scroll-mt-24">
        <div className="site-section">
          <SectionHeading eyebrow="The difference" title="Memory is not just stored. It changes." text="MemoGrafter treats changing knowledge as a lifecycle, not an ever-growing pile of retrieval chunks." />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <ComparisonPanel title="Traditional memory storage" muted items={["Stores chunks", "Accumulates duplicates", "Returns stale facts", "Offers limited inspection"]} />
            <ComparisonPanel title="MemoGrafter" items={["Extracts atomic memories", "Connects related knowledge", "Versions changing facts", "Detects conflicts", "Supports operator review", "Retrieves active, relevant memory"]} />
          </div>
        </div>
      </section>

      <section className="site-section">
        <SectionHeading eyebrow="Memory lifecycle" title="Every fact has a history" text="Memories are not blindly deleted. State changes keep active recall clean while historical evolution remains available for inspection." />
        <ol className="lifecycle-track mt-12">
          {lifecycle.map(([title, text], index) => (
            <li className="lifecycle-step" key={title}>
              <div className="lifecycle-marker"><span>{index + 1}</span></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-white/10 bg-[#090d10]">
        <div className="site-section grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <SectionHeading align="left" eyebrow="TypeScript-first" title="A small API for the whole memory loop" text="Initialize an agent, process conversation turns, and recall prompt-ready graph memory with typed server-side primitives." />
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="tech-pill">Typed adapters</span><span className="tech-pill">CLI workflows</span><span className="tech-pill">Inspectable recall</span>
            </div>
            <p className="mt-7 text-sm leading-6 text-slate-500">Launch the local inspector when you need it: <code className="text-slate-300">npx memo-grafter studio</code></p>
          </div>
          <CodeBlock label="agent.ts" code={apiSnippet} />
        </div>
      </section>

      <section id="studio" className="site-section scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <SectionHeading align="left" eyebrow="MemoGrafter Studio" title="Inspect and operate on memory" text="Search topics, review facts, inspect lifecycle history, resolve conflicts, and preview exactly what reaches the model." />
            <div className="mt-8 grid gap-3 text-sm text-slate-300">
              {["Trace each memory to its topic and source", "Review lifecycle changes before they affect recall", "Preview the exact token-budgeted context"].map((item) => <div className="flex gap-3" key={item}><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{item}</div>)}
            </div>
          </div>
          <StudioPreview />
        </div>
      </section>

      <section className="site-section pt-4 sm:pt-6">
        <div className="final-cta">
          <div>
            <p className="eyebrow">Start building</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white sm:text-4xl">Give your agents memory they can trust.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link className="btn-primary" href="/docs">Read the docs <ArrowRight className="h-4 w-4" /></Link>
            <a className="btn-secondary" href={githubUrl} target="_blank" rel="noreferrer">View on GitHub</a>
          </div>
          <div className="lg:col-span-2 lg:max-w-md"><InstallCommand /></div>
        </div>
      </section>
      <Footer githubUrl={githubUrl} />
    </main>
  );
}

function ComparisonPanel({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return <article className={`comparison-panel ${muted ? "comparison-muted" : "comparison-active"}`}><div className="flex items-center gap-3"><span className="comparison-icon">{muted ? <Search className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}</span><h3 className="text-xl font-semibold text-white">{title}</h3></div><ul className="mt-7 grid gap-3 sm:grid-cols-2">{items.map((item) => <li className="flex items-center gap-3 text-sm text-slate-300" key={item}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{item}</li>)}</ul></article>;
}

function StudioPreview() {
  return <div className="studio-preview" aria-label="Stylized MemoGrafter Studio interface preview"><div className="studio-topbar"><span className="flex items-center gap-2 font-medium text-slate-200"><span className="h-2 w-2 rounded-full bg-emerald-300" />Studio</span><span className="text-slate-500">Session / japan-planning</span></div><div className="studio-layout"><div className="studio-graph graph-grid"><span className="studio-topic">Japan trip</span><span className="studio-node studio-node-a">Quiet areas</span><span className="studio-node studio-node-b">Kyoto</span><span className="studio-node studio-node-c">Budget ₹2L</span><svg aria-hidden="true" viewBox="0 0 400 220"><path d="M195 105 L86 54 M195 105 L304 51 M195 105 L310 173" /></svg></div><div className="studio-detail"><span className="status-badge active">Active</span><p className="mt-4 text-xs text-slate-500">MEMORY DETAIL</p><h3 className="mt-2 text-base font-semibold text-white">Budget increased to ₹2 lakh</h3><dl className="mt-5 grid gap-3 text-xs"><div><dt>Topic</dt><dd>Japan trip planning</dd></div><div><dt>Version</dt><dd>v2 · Updated</dd></div></dl><div className="studio-actions"><button type="button">Supersede</button><button type="button">Forget</button></div></div><div className="studio-prompt"><span className="text-xs font-medium text-emerald-200">PROMPT PREVIEW</span><p className="mt-3 text-sm text-slate-300">User prefers quiet areas, is interested in Kyoto, and has a ₹2 lakh budget.</p></div></div></div>;
}
