import {
  ArrowRight,
  Bot,
  Braces,
  BrainCircuit,
  CheckCircle2,
  Code2,
  DatabaseZap,
  GitBranch,
  Layers3,
  LockKeyhole,
  MessageSquareCode,
  Network,
  PlugZap,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import {
  CodeBlock,
  FeatureCard,
  Footer,
  GraphMockup,
  Header,
  Pipeline,
  SectionHeading,
  StudioMockup,
} from "@/components/site";

const whyCards = [
  {
    icon: BrainCircuit,
    title: "Memory that survives deployments",
    text: "Store durable user facts, preferences, goals, and interaction notes without tying them to a single prompt template.",
  },
  {
    icon: GitBranch,
    title: "Grafting, not guesswork",
    text: "Attach the right memories to the next turn using typed selectors, confidence signals, and traceable provenance.",
  },
  {
    icon: ShieldCheck,
    title: "Designed for production control",
    text: "Keep write policies, retention, review queues, and redaction close to the memory pipeline instead of scattering them through app code.",
  },
];

const featureCards = [
  {
    icon: Bot,
    title: "Conversation facts",
    text: "Capture stable facts and user preferences from natural chat without turning every transcript into prompt baggage.",
  },
  {
    icon: LockKeyhole,
    title: "Policy gates",
    text: "Require consent, redact sensitive fields, and set retention by memory type before anything becomes durable.",
  },
  {
    icon: Code2,
    title: "Tool-aware writes",
    text: "Preserve outcomes from CRM, ticketing, search, and workflow tools as structured memories with provenance.",
  },
  {
    icon: Sparkles,
    title: "Prompt-ready grafts",
    text: "Return concise, scored context blocks that fit the model budget and explain why they were attached.",
  },
];

const useCases = [
  "Customer support copilots with long-lived account context",
  "Personal AI assistants that remember preferences without prompt bloat",
  "Research and tutoring agents that connect concepts across sessions",
  "Internal workflow bots that preserve project and role-specific context",
];

const installSnippet = `npm install memo-grafter
npx memo-grafter init
npx memo-grafter migrate`;

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

await agent.invoke("I am planning a Japan trip.");
await agent.invoke("I like quiet towns and local cafes.");

const recall = await agent.recall("travel preferences");
console.log(recall.facts);`;

export default function Home() {
  return (
    <main className="site-shell">
      <Header />

      <section className="relative border-b border-white/10">
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-1 text-sm text-emerald-200">
              <Network className="h-4 w-4" />
              Graph-native memory for TypeScript agents
            </div>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              MemoGrafter
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl">
              Build chatbots that remember like a product system, not a longer
              prompt. MemoGrafter extracts, stores, reviews, and grafts memory
              into future agent turns with typed APIs and an operator studio.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" href="/docs/quick-start">
                Quick start <ArrowRight className="h-4 w-4" />
              </Link>
              <a className="btn-secondary" href="#quickstart">
                <Terminal className="h-4 w-4" /> Install package
              </a>
            </div>
          </div>

          <div className="grid min-w-0 gap-5">
            <CodeBlock id="quickstart" label="terminal" code={installSnippet} />
            <GraphMockup />
          </div>
        </div>
      </section>

      <section id="why" className="site-section">
        <SectionHeading
          eyebrow="Why MemoGrafter"
          title="A memory layer engineers can reason about"
          text="MemoGrafter treats memory as data with lifecycle, lineage, and review paths. Your app decides what to write, what to retrieve, and what the model sees."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {whyCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section id="pipeline" className="border-y border-white/10 bg-white/[0.025]">
        <div className="site-section">
          <SectionHeading
            eyebrow="How it works"
            title="Extract, normalize, graft, observe"
            text="The pipeline separates memory writes from memory reads, so your assistant can learn continuously without turning every conversation into an unbounded context dump."
          />
          <div className="mt-10">
            <Pipeline
              steps={[
                {
                  icon: MessageSquareCode,
                  title: "Capture",
                  text: "Observe turns, tool results, and explicit user updates.",
                },
                {
                  icon: Braces,
                  title: "Extract",
                  text: "Convert raw conversation into typed memory candidates.",
                },
                {
                  icon: DatabaseZap,
                  title: "Persist",
                  text: "Deduplicate, score, redact, and store graph edges.",
                },
                {
                  icon: PlugZap,
                  title: "Graft",
                  text: "Inject only relevant memory into the next agent call.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section id="api" className="site-section grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="TypeScript-first API"
            title="Write memory code that looks like app code"
            text="Use a small set of explicit primitives instead of stitching together vector search, summaries, and one-off prompt fragments."
            align="left"
          />
          <div className="mt-8 grid gap-3 text-sm text-slate-300">
            {[
              "Typed memory schemas for facts, preferences, tasks, and entities",
              "Composable graft selectors for persona, account, and workflow context",
              "Trace objects that explain why a memory was attached",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <CodeBlock label="agent.ts" code={apiSnippet} />
      </section>

      <section id="studio" className="border-y border-white/10 bg-slate-950/70">
        <div className="site-section grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <StudioMockup />
          <div>
            <SectionHeading
              eyebrow="Studio"
              title="Inspect and curate what your agent knows"
              text="MemoGrafter Studio gives teams a control plane for memory review, graph navigation, redaction, retention, and graft debugging."
              align="left"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                compact
                icon={Layers3}
                title="Review queues"
                text="Approve sensitive writes before they become durable memory."
              />
              <FeatureCard
                compact
                icon={RefreshCcw}
                title="Replay grafts"
                text="See which memories were attached to a response and why."
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="site-section">
        <SectionHeading
          eyebrow="Chatbot memory"
          title="The practical pieces real assistants need"
          text="From explicit user corrections to quiet preference learning, MemoGrafter keeps the memory loop understandable."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card) => (
            <FeatureCard key={card.title} compact {...card} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="site-section grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Use cases"
            title="Useful anywhere context compounds"
            text="MemoGrafter is built for products where the assistant should get better at helping a specific person, team, or account over time."
            align="left"
          />
          <div className="grid gap-3">
            {useCases.map((item) => (
              <div key={item} className="panel flex items-start gap-3 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
                <span className="text-sm leading-6 text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="overflow-hidden rounded-lg border border-emerald-300/20 bg-emerald-300/8 p-6 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-balance text-3xl font-semibold text-white">
                Start with a memory pipeline you can debug.
              </h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Build the first graft in minutes, then add review policies and
                Studio workflows as your assistant matures.
              </p>
            </div>
            <Link className="btn-primary" href="/docs/quick-start">
              Open quick start <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
