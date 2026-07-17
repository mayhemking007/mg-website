import { ArrowRight, Check, GitBranch } from "lucide-react";
import Link from "next/link";
import { DifferenceSection } from "@/components/difference-section";
import { InstallCommand } from "@/components/install-command";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { MemoryLifecycleVisual } from "@/components/memory-lifecycle-visual";
import { CodeBlock, Footer, Header, SectionHeading } from "@/components/site";

const githubUrl = "https://github.com/mayhemking007/memo-grafter";

const apiSnippet = `import { MemoGrafterAgent } from "memo-grafter";
// Create an agent
const agent = new MemoGrafterAgent({ /* config */ });
await agent.initialize();
// Learn from conversations
await agent.invoke("I prefer quiet areas in Kyoto.");
// Recall relevant memory
const memory = await agent.recall("Japan travel preferences");
console.log(memory.facts);`;

const capabilities = [
  "TypeScript-first",
  "Graph-native recall",
  "Lifecycle management",
  "Operator review",
  "PostgreSQL + pgvector",
];

export default function Home() {
  return (
    <main className="site-shell">
      <Header githubUrl={githubUrl} />

      <section id="home" className="hero-section scroll-mt-20 border-b border-white/10">
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

      <HowItWorksSection />

      <DifferenceSection />

      <section className="code-environment border-y border-white/10">
        <div className="api-section site-section">
          <div className="api-heading">
            <p className="eyebrow">TypeScript first</p>
            <h2>Build memory into your agent in a few lines.</h2>
          </div>
          {/* <ol className="api-workflow" aria-label="MemoGrafter API workflow">
            <li><span>01</span><div><h3>Learn</h3><p>Store useful context from conversations.</p></div></li>
            <li><span>02</span><div><h3>Recall</h3><p>Retrieve only the memories relevant to the current request.</p></div></li>
            <li><span>03</span><div><h3>Inspect</h3><p>Review facts, versions, and prompt context in Studio.</p></div></li>
          </ol> */}
          <div className="api-code-wrap"><CodeBlock label="agent.ts" code={apiSnippet} /></div>
          <ul className="api-capabilities" aria-label="MemoGrafter capabilities">
            {["TypeScript-first", "OpenAI, Anthropic & Gemini", "Graph-native memory", "MemoGrafter Studio"].map((item) => <li key={item}><Check className="h-4 w-4" />{item}</li>)}
          </ul>
          <Link className="api-docs-link" href="/docs/quick-start">View full example in the docs <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section id="studio" className="studio-environment site-section scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <SectionHeading align="left" eyebrow="MemoGrafter Studio" title="Inspect and operate on memory" text="Search topics, review facts, inspect lifecycle history, resolve conflicts, and preview exactly what reaches the model." />
            <div className="mt-8 grid gap-3 text-sm text-slate-300">
              {["Trace each memory to its topic and source", "Active recall stays clean while older versions remain available for review", "Preview the exact token-budgeted context"].map((item) => <div className="flex gap-3" key={item}><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{item}</div>)}
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

function StudioPreview() {
  return <div className="studio-preview" aria-label="Stylized MemoGrafter Studio interface preview"><div className="studio-topbar"><span className="flex items-center gap-2 font-medium text-slate-200"><span className="h-2 w-2 rounded-full bg-emerald-300" />Studio</span><span className="text-slate-500">Session / japan-planning</span></div><div className="studio-layout"><div className="studio-graph graph-grid"><span className="studio-topic">Japan trip</span><span className="studio-node studio-node-a">Quiet areas</span><span className="studio-node studio-node-b">Kyoto</span><span className="studio-node studio-node-c">Budget ₹2L</span><svg aria-hidden="true" viewBox="0 0 400 220"><path d="M195 105 L86 54 M195 105 L304 51 M195 105 L310 173" /></svg></div><div className="studio-detail"><span className="status-badge active">Active</span><p className="mt-4 text-xs text-slate-500">MEMORY DETAIL</p><h3 className="mt-2 text-base font-semibold text-white">Budget increased to ₹2 lakh</h3><dl className="mt-5 grid gap-3 text-xs"><div><dt>Topic</dt><dd>Japan trip planning</dd></div><div><dt>Version</dt><dd>v2 · Updated</dd></div></dl><div className="studio-actions"><button type="button">Supersede</button><button type="button">Forget</button></div></div><div className="studio-prompt"><span className="text-xs font-medium text-emerald-200">PROMPT PREVIEW</span><p className="mt-3 text-sm text-slate-300">User prefers quiet areas, is interested in Kyoto, and has a ₹2 lakh budget.</p></div></div></div>;
}
