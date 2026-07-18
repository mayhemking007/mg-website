import { ArrowRight, Check, GitBranch } from "lucide-react";
import Link from "next/link";
import { DifferenceSection } from "@/components/difference-section";
import { InstallCommand } from "@/components/install-command";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { LandingEffects } from "@/components/landing-effects";
import { MemoryLifecycleVisual } from "@/components/memory-lifecycle-visual";
import { StudioPreview } from "@/components/studio-preview";
import { CodeBlock, Footer, Header, SectionHeading } from "@/components/site";

const githubUrl = "https://github.com/mayhemking007/memo-grafter";
const apiSnippet = `import { MemoGrafterAgent, OpenAIEmbedAdapter, OpenAILLMAdapter } from "memo-grafter";
// Set DATABASE_URL and OPENAI_API_KEY in your environment
const agent = new MemoGrafterAgent({
  db: { connectionString: process.env.DATABASE_URL! },
  llm: new OpenAILLMAdapter("gpt-4o"),
  embedder: new OpenAIEmbedAdapter("text-embedding-3-small"),
});
// Initialize the agent and its memory store
await agent.initialize();
// Add memory from a conversation
await agent.invoke("I prefer quiet areas in Kyoto. My budget is ₹2 lakh.");
// Search for relevant memories
const memory = await agent.recall("Japan travel preferences");
console.log(memory.facts);`;
const capabilities = ["TypeScript-first", "Lifecycle-managed memory", "Studio included"];

export default function Home() {
  return <main className="site-shell">
    <LandingEffects />
    <Header githubUrl={githubUrl} />
    <section id="home" className="hero-section scroll-mt-20 border-b border-white/10">
      <div className="hero-inner mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8">
        <div className="hero-copy" data-reveal><p className="eyebrow">Lifecycle-managed memory for AI agents</p><h1 className="text-balance font-semibold tracking-[-0.035em] text-white">Memory that evolves with your AI agents.</h1><p className="hero-summary text-pretty">Structured memory that evolves, adapts, and stays useful across conversations.</p><div className="hero-actions"><Link className="btn-primary" href="/docs/quick-start">Get started <ArrowRight className="h-4 w-4" /></Link><a className="btn-secondary hero-github" href={githubUrl} target="_blank" rel="noreferrer"><GitBranch className="h-4 w-4" />GitHub</a></div><div className="hero-install"><InstallCommand /></div><ul className="hero-capabilities" aria-label="Key capabilities">{capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className="hero-visual-wrap" data-reveal data-reveal-delay="1"><MemoryLifecycleVisual /></div>
      </div>
    </section>
    <HowItWorksSection />
    <DifferenceSection />
    <section id="api" className="code-environment scroll-mt-24 border-y border-white/10"><div className="api-section site-section"><div className="api-heading" data-reveal><p className="eyebrow">TypeScript first</p><h2>Build memory into your agent in a few lines.</h2></div><div className="api-code-wrap" data-reveal data-reveal-delay="1"><CodeBlock label="agent.ts" code={apiSnippet} /></div><ul className="api-capabilities" aria-label="MemoGrafter capabilities">{["TypeScript-first", "OpenAI, Anthropic & Gemini", "Graph-native memory", "MemoGrafter Studio"].map((item) => <li key={item}><Check className="h-4 w-4" />{item}</li>)}</ul><Link className="api-docs-link" href="/docs/quick-start">View full example in the docs <ArrowRight className="h-4 w-4" /></Link></div></section>
    <section id="studio" className="studio-environment site-section scroll-mt-24"><div className="grid gap-10 lg:grid-cols-[0.92fr_1.18fr] lg:items-center"><div data-reveal><SectionHeading align="left" eyebrow="MemoGrafter Studio" title="Inspect and operate on memory" text="Search topics, review facts, inspect lifecycle history, resolve conflicts, and preview exactly what reaches the model." /><div className="studio-benefits mt-8 grid gap-4 text-slate-300">{["Trace each memory to its topic and source", "Active recall stays clean while older versions remain available for review", "Preview the exact token-budgeted context"].map((item) => <div className="flex gap-3" key={item}><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />{item}</div>)}</div></div><div data-reveal data-reveal-delay="1"><StudioPreview /></div></div></section>
    <section className="site-section cta-section"><div className="final-cta" data-reveal><div><p className="eyebrow">Start building</p><h2>Give your agents memory they can trust.</h2><p className="final-cta-copy">Start with TypeScript, keep every update inspectable, and recall only the context your agent needs.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:justify-end"><Link className="btn-primary" href="/docs/quick-start">Get started <ArrowRight className="h-4 w-4" /></Link><a className="btn-secondary" href={githubUrl} target="_blank" rel="noreferrer">View on GitHub</a></div><div className="lg:col-span-2 lg:max-w-md"><InstallCommand /></div></div></section>
    <Footer githubUrl={githubUrl} />
  </main>;
}
