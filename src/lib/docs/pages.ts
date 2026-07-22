import type { DocPage } from "./types";
import { docsNavItems } from "./nav";
import {
  initCode,
  installCode,
  migrateCode,
  minimalAgentCode,
  studioCode,
} from "./examples";
import { expandedDocsPages } from "./expanded-pages";
import { apiReferencePages } from "./api-reference";
import { guidePages } from "./guide-pages";
import { additionalAdvancedPages } from "./advanced-pages";

const existingDocsPages: DocPage[] = [
  {
    slug: "",
    eyebrow: "Developer docs",
    title: "Structured memory for TypeScript chatbots.",
    description:
      "MemoGrafter records conversations as graph-backed memory, recalls relevant facts later, and can graft useful memory between sessions or agents.",
    sections: [
      {
        title: "What MemoGrafter is",
        body: [
          "MemoGrafter is a server-side TypeScript memory framework for chatbot applications. It stores message buffers, topic segments, topic nodes, memory nodes, graph edges, and graft provenance so applications can recall and transfer context without stuffing every old message into the prompt.",
        ],
      },
      {
        title: "Why MemoGrafter",
        body: [
          "Chatbot memory becomes hard to manage when every session is treated as a flat transcript. MemoGrafter turns conversation history into structured graph memory so applications can recall relevant facts, preserve provenance, and move useful context between sessions without replaying everything.",
        ],
        diagram: "intro-graph",
      },
    ],
  },
  {
    slug: "quick-start",
    eyebrow: "Quick start",
    title: "Add memory to a TypeScript chatbot in 5 minutes.",
    description:
      "Install MemoGrafter, initialize the project files, migrate the database, and run a minimal MemoGrafterAgent.",
    sections: [
      {
        title: "Minimal agent",
        body: [
          "Use `MemoGrafterAgent` when you want the simplest chatbot-facing API. It handles invoke-time recall, response generation, and background ingestion.",
        ],
        code: [{ label: "src/index.ts", code: minimalAgentCode }],
      },
      {
        title: "What happens",
        diagram: "invoke-flow",
        bullets: [
          "`invoke()` answers the current user message using recent raw history and any available recalled memory.",
          "Background ingestion turns conversation turns into topic segments, topic nodes, memory nodes, and graph edges.",
          "`recall()` retrieves relevant atomic facts later by meaning, confidence, lifecycle state, and token budget.",
        ],
      },
    ],
  },
  {
    slug: "installation",
    eyebrow: "Setup",
    title: "Install MemoGrafter and prepare the database.",
    description:
      "MemoGrafter runs server-side on Node.js and uses PostgreSQL with pgvector for the built-in storage backend.",
    sections: [
      {
        title: "Requirements",
        bullets: [
          "Node.js 18 or newer.",
          "TypeScript or modern JavaScript using ES modules.",
          "PostgreSQL with the `pgvector` extension for the built-in `PostgresGraphStore`.",
          "An LLM adapter and an embedding adapter.",
          "Redis only when enabling queue mode or the optional recall cache.",
        ],
      },
      {
        title: "Install the package",
        body: [
          "Install MemoGrafter from npm in the server-side package where your chatbot or memory workflow runs.",
        ],
        code: [{ label: "terminal", code: installCode }],
      },
      {
        title: "Initialize project files",
        body: [
          "Create the generated MemoGrafter config and schema files. These files live under `src/memo-grafter/` so they are easy to review and keep separate from your application code.",
        ],
        code: [{ label: "terminal", code: initCode }],
      },
      {
        title: "Create the database schema",
        body: [
          "Run the migration command after setting `DATABASE_URL`. MemoGrafter owns only its `mg_*` tables and required PostgreSQL extensions.",
        ],
        code: [{ label: "terminal", code: migrateCode }],
      },
      {
        title: "Migration boundary",
        body: [
          "`memo-grafter migrate` manages only MemoGrafter-owned `mg_*` tables and PostgreSQL extensions. Application tables remain in your existing Prisma, Drizzle, SQL, or custom migration workflow.",
        ],
      },
    ],
  },
  {
    slug: "environment-setup",
    eyebrow: "Setup",
    title: "Configure database, model, embedding, and optional Redis settings.",
    description:
      "MemoGrafter resolves database and Studio settings from CLI flags, environment variables, and generated config.",
    sections: [
      {
        title: "Environment variables",
        code: [
          {
            label: ".env",
            code: `# MemoGrafter stores graph memory in PostgreSQL.
DATABASE_URL=postgres://postgres:postgres@localhost:5432/memo_grafter
# Add only the providers your adapters use.
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
# Required only for queue mode or recall caching.
REDIS_URL=redis://localhost:6379`,
          },
        ],
      },
      {
        title: "Resolution order",
        bullets: [
          "Studio and migration use `--db` first.",
          "Then `.env` or `DATABASE_URL`.",
          "Then `src/memo-grafter/mg.config.ts`.",
          "The generated config can enable Studio Prompt Preview when `OPENAI_API_KEY` is set.",
        ],
      },
    ],
  },
  {
    slug: "concepts/how-it-works",
    eyebrow: "Core concepts",
    title: "How it works",
    description:
      "MemoGrafter turns conversation history into structured graph memory, then retrieves only the context an agent needs.",
    sections: [
      {
        title: "System overview",
        body: [
          "MemoGrafter sits between your application, its model, and a graph-backed store. During a conversation, it combines the current message with recent raw history and relevant long-term memories to produce a response. Afterward, it ingests new turns in the background so the memory graph stays current without delaying the reply.",
          "The graph keeps broad topics separate from atomic facts and connects them with edges. This structure lets MemoGrafter recall, maintain, and transfer useful context without replaying an entire transcript.",
        ],
        diagram: "memory-graph",
      },
      {
        title: "From conversation to memory",
        body: [
          "Ingestion starts with raw user and assistant messages. MemoGrafter detects topic changes, groups related turns into segments, summarizes each segment as a topic node, and extracts durable facts into memory nodes.",
        ],
        bullets: [
          "Messages preserve the original conversation turns.",
          "Segments mark contiguous ranges that discuss one topic.",
          "Topic nodes summarize those ranges and provide the graph backbone.",
          "Memory nodes store individual facts, insights, tasks, questions, and references.",
          "Graph edges preserve semantic, temporal, reentry, update, and graft relationships.",
        ],
      },
      {
        title: "From memory to context",
        body: [
          "When an agent needs context, MemoGrafter embeds the query, searches active memory nodes by meaning, filters out forgotten or suppressed records, ranks the remaining facts, and formats the best results within a token budget. The application receives concise, prompt-ready memory instead of a full conversation archive.",
        ],
        diagram: "invoke-flow",
      },
      {
        title: "Memory across sessions",
        body: [
          "Grafting moves relevant memory into another session or agent while preserving where it came from. Lifecycle controls can forget memories, suppress topics, restore them, or mark facts as decayed, conflicting, or superseded without deleting the underlying history by default.",
        ],
        bullets: [
          "Recall retrieves relevant facts for the current request.",
          "Grafting selects or copies useful context across sessions with provenance.",
          "Lifecycle and maintenance keep active context accurate while retaining an auditable history.",
        ],
      },
    ],
  },
  {
    slug: "concepts/messages",
    eyebrow: "Core concepts",
    title: "Messages are the raw source of conversation memory.",
    description:
      "A message is one system, user, or assistant turn that can be stored in the message buffer and used for segmentation.",
    sections: [
      {
        title: "Why messages matter",
        body: [
          "Messages are the only part of the system that exactly mirrors the chat transcript. MemoGrafter keeps them as source material, then derives more durable graph memory from them in the background.",
          "A developer usually touches messages through `invoke()`, `getHistory()`, or direct ingestion tests. Most long-term behavior comes from the graph records created from these turns, not from replaying every raw message forever.",
        ],
      },
      {
        title: "Shape",
        code: [
          {
            label: "types.ts",
            code: `// Messages preserve the original chat turn before graph memory is derived.
export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}`,
          },
        ],
      },
      {
        title: "How MemoGrafter uses messages",
        body: [
          "The message buffer acts like an append-only staging area. The ingestion cursor records which ranges have already been processed so queue retries and repeated invokes do not duplicate graph memory.",
        ],
        bullets: [
          "`MemoGrafterAgent` keeps public chat history for the current session.",
          "Ingestion stores messages in `mg_message_buffer`.",
          "The ingest cursor tracks which message ranges have already produced graph memory.",
          "Invoke-time prompts use recalled facts plus a recent raw history window.",
        ],
      },
    ],
  },
  {
    slug: "concepts/segments",
    eyebrow: "Core concepts",
    title: "Segments split long history into topical units.",
    description:
      "MemoGrafter detects topic drift and stores contiguous message ranges as topic segments.",
    sections: [
      {
        title: "Why segments exist",
        body: [
          "A segment is a range of messages that belong to one topic. It keeps long conversations from becoming one undifferentiated memory blob.",
          "Think of segments as the boundary between raw chat and graph memory. They preserve where a topic started and ended, which makes later recall, Studio inspection, and graft provenance easier to explain.",
        ],
        code: [{ label: "example", code: `messages 0-4 -> Japan travel planning
messages 5-8 -> cover letter writing` }],
      },
      {
        title: "Drift signals",
        body: [
          "MemoGrafter uses embedding distance and optional intent signals to decide when a conversation has moved to a new topic. Short acknowledgements and filler turns are dampened so they do not accidentally create noisy segments.",
        ],
        bullets: [
          "Embedding distance from the current topic.",
          "Structural phrases like `by the way` or `going back to`.",
          "Short-message dampening for filler turns.",
          "Optional LLM ambiguity detection and reentry detection.",
        ],
      },
    ],
  },
  {
    slug: "concepts/topic-nodes",
    eyebrow: "Core concepts",
    title: "Topic nodes are the graph backbone.",
    description:
      "Each topic node summarizes a segment, carries an embedding, and participates in topic-level recall and grafting.",
    sections: [
      {
        title: "How topic nodes organize memory",
        body: [
          "A topic node is the durable summary of a segment. It lets MemoGrafter search for a broad theme before choosing the more specific memory facts attached to it.",
          "Developers usually see topic nodes in Studio, graft previews, graph snapshots, and advanced retrieval debugging. They are the backbone that gives memory shape instead of leaving facts as a flat list.",
        ],
      },
      {
        title: "Important fields",
        bullets: [
          "`label` and `summary` extracted from a segment.",
          "`embedding` for semantic topic search.",
          "`messageRange`, `topicOrder`, and `driftScore` for provenance.",
          "`tags` for project, planning, week, domain, or worker routing filters.",
          "`suppressed` lifecycle state for active read filtering.",
        ],
      },
    ],
  },
  {
    slug: "concepts/memory-nodes",
    eyebrow: "Core concepts",
    title: "Memory nodes are atomic recall facts.",
    description:
      "Memory nodes hold extracted facts, insights, tasks, questions, and references attached to topic nodes.",
    sections: [
      {
        title: "How memory nodes recall facts",
        body: [
          "A memory node is the smallest useful piece of long-term memory: one fact, task, insight, question, or reference that can be ranked, filtered, forgotten, superseded, or grafted.",
          "This is the level `recall()` usually returns to the prompt. Topic nodes explain the context; memory nodes provide the concrete facts the assistant should use.",
        ],
      },
      {
        title: "Memory triple",
        bullets: [
          "`subject`, `predicate`, and `value` describe the memory.",
          "`confidence` affects retrieval ranking.",
          "`memoryType` can be fact, insight, question, task, or reference.",
          "`forgotten`, `decayed`, `hasConflict`, and `supersededBy` control lifecycle and maintenance behavior.",
        ],
      },
    ],
  },
  {
    slug: "concepts/graph-edges",
    eyebrow: "Core concepts",
    title: "Graph edges preserve context and provenance.",
    description:
      "Topic and memory edges link related, temporal, reentry, grafted, conflicting, and updated memories.",
    sections: [
      {
        title: "Why edges exist",
        body: [
          "Edges explain how memories relate over time and meaning. They connect adjacent topics, similar topics, returned topics, grafted memory, conflicting facts, and updated facts.",
          "Without edges, recall would be a bag of matching rows. With edges, MemoGrafter can expand context, preserve provenance, and show why a fact traveled from one session into another.",
        ],
      },
      {
        title: "Topic edges",
        bullets: [
          "`temporal` edges connect adjacent topic nodes.",
          "`semantic` edges connect similar topic nodes.",
          "`reentry` edges connect a returned topic to an earlier matching topic.",
          "`grafted` edges preserve copied-memory provenance.",
        ],
      },
      {
        title: "Memory edges",
        bullets: [
          "Semantic memory edges link related facts inside a topic.",
          "Maintenance edges mark conflicts and updates.",
          "History and diff reads use existing rows and edges rather than a separate event store.",
        ],
      },
    ],
  },
  {
    slug: "concepts/grafting",
    eyebrow: "Core concepts",
    title: "Grafting moves useful memory between sessions.",
    description:
      "Grafting assembles prompt-ready context from selected topic nodes or copies active memory into another session with provenance.",
    sections: [
      {
        title: "When grafting helps",
        body: [
          "Grafting is for moving relevant memory into a new working context without copying an entire transcript. It is useful when a user changes sessions, a worker needs shared context, or an assistant needs only the parts of a graph that match a task.",
          "Every grafted path should remain explainable. MemoGrafter keeps provenance so Studio and debugging tools can show where copied memory came from.",
        ],
      },
      {
        title: "Two paths",
        bullets: [
          "Explicit grafting selects known topic IDs and formats them into a prompt.",
          "Semantic grafting finds topic seeds by query similarity before assembling the prompt.",
          "Absorption copies active topic nodes and active memory nodes into a target session.",
        ],
      },
      {
        title: "Graft flow",
        diagram: "graft-flow",
      },
    ],
  },
  {
    slug: "concepts/lifecycle",
    eyebrow: "Core concepts",
    title: "Lifecycle controls are soft-state memory management.",
    description:
      "MemoGrafter can forget memories, suppress topics, restore topics, and annotate memory quality without deleting graph rows by default.",
    sections: [
      {
        title: "Why lifecycle is soft state",
        body: [
          "Memory can be useful, outdated, suppressed, or wrong without needing to disappear from the database. MemoGrafter keeps lifecycle as state on records so recall can stay clean while Studio and audits still have history.",
          "Developers touch lifecycle controls when users ask to forget something, when a topic should stop appearing in active context, or when maintenance passes annotate low-quality memory.",
        ],
        diagram: "lifecycle-flow",
      },
      {
        title: "Controls",
        bullets: [
          "`forget(memoryId)` marks a memory inactive for recall, grafting, absorption, and maintenance.",
          "`forgetMany(memoryIds)` performs a bulk forget.",
          "`suppressTopic(topicId)` hides a topic from active reads and graph expansion.",
          "`restoreTopic(topicId)` makes a suppressed topic active again.",
        ],
      },
      {
        title: "Why soft state",
        body: [
          "Snapshots and Studio can still inspect inactive rows, which is important for audit, lifecycle display, memory history, and debugging.",
        ],
      },
    ],
  },
  {
    slug: "guides/chatbot-memory",
    eyebrow: "Guide",
    title: "Build a chatbot with memory.",
    description:
      "Use MemoGrafterAgent to recall relevant memory before an LLM call and ingest new turns afterward.",
    sections: [
      {
        title: "Use MemoGrafterAgent",
        code: [{ label: "agent.ts", code: minimalAgentCode }],
      },
      {
        title: "Invoke path",
        bullets: [
          "Checks whether the session already has topic nodes.",
          "Recalls relevant memory for the new user message.",
          "Calls the LLM with memory context and recent raw history.",
          "Schedules ingestion after the response.",
        ],
      },
    ],
  },
  {
    slug: "guides/ingest-text",
    eyebrow: "Guide",
    title: "Ingest text and documents without an assistant response.",
    description:
      "Use ingestText for editor content, document imports, transcripts, and notes.",
    sections: [
      {
        title: "Text ingestion",
        code: [
          {
            label: "ingest.ts",
            code: `// Ingest text directly when there is no assistant response to generate.
await agent.ingestText(editorContent, {
  // Replace previous imported content from the same source when re-syncing.
  replace: true,
  // Label and source make Studio/audits easier to read later.
  label: "Morning entry",
  source: "classic-editor",
});`,
          },
        ],
      },
      {
        title: "Behavior",
        bullets: [
          "Text is split into internal chunks by line, sentence, and max-size boundaries.",
          "The same drift detector and extraction pipeline creates topic and memory nodes.",
          "Raw text does not appear in `getHistory()` and does not trigger assistant generation.",
          "`remember(text)` is a convenience wrapper for explicit natural-language facts.",
        ],
      },
    ],
  },
  {
    slug: "guides/recall-facts",
    eyebrow: "Guide",
    title: "Recall relevant facts by meaning.",
    description:
      "Targeted recall searches memory nodes, filters inactive facts, ranks by similarity and confidence, and returns a prompt-ready memory block.",
    sections: [
      {
        title: "Recall",
        code: [
          {
            label: "recall.ts",
            code: `// Search graph memory for facts related to the current task.
const result = await agent.recall("deployment config", {
  limit: 8,
  minSimilarity: 0.55,
  // Keep the generated memory prompt within your model budget.
  tokenBudget: 1000,
  tags: ["project:memo-grafter"],
});

// facts are structured records; systemPrompt is ready to inject into an LLM call.
console.log(result.facts);
console.log(result.systemPrompt);`,
          },
        ],
      },
      {
        title: "Result",
        bullets: [
          "`facts`: matching memory nodes with similarity scores.",
          "`nodes`: parent topic nodes for included facts.",
          "`systemPrompt`: formatted memory context.",
          "`tokenCount` and `tokenBudget`: prompt size controls.",
        ],
      },
    ],
  },
  {
    slug: "guides/graft-memory",
    eyebrow: "Guide",
    title: "Graft memory between sessions.",
    description:
      "Preview topic memory as prompt context or copy active memory into another chatbot/session.",
    sections: [
      {
        title: "Preview a graft",
        code: [
          {
            label: "graft.ts",
            code: `// Preview transferable memory as prompt context.
const graft = await agent.graft();
console.log(graft.systemPrompt);

// Narrow the graft to topics relevant to a specific handoff.
const selected = await agent.graftByRelevance("authentication discussion", {
  topK: 5,
  minSimilarity: 0.6,
  hopDepth: 1,
});`,
          },
        ],
      },
      {
        title: "Absorb from another agent",
        code: [
          {
            label: "absorb.ts",
            code: `// Copy selected active memory from one agent/session into another.
await targetAgent.absorbFromAgent(sourceAgent, {
  query: "travel preferences",
  topK: 3,
});`,
          },
        ],
      },
    ],
  },
  {
    slug: "guides/studio",
    eyebrow: "Guide",
    title: "Use Studio to inspect graph memory.",
    description:
      "Studio is local developer tooling for sessions, graph inspection, table browsing, prompt preview, and supported lifecycle actions.",
    sections: [
      {
        title: "Launch Studio",
        body: [
          "Studio is intentionally separate from installation. Start it when you want to inspect sessions, graph memory, tables, and prompt previews during development.",
        ],
        code: [{ label: "terminal", code: studioCode }],
      },
      {
        title: "What Studio shows",
        bullets: [
          "Session list first, then on-demand tab data for the selected session.",
          "Graph tab with topic nodes as the backbone and memories for the selected topic.",
          "Tables tab for read-only `mg_*` table inspection.",
          "Prompt Preview for read-only graft or recall simulation.",
          "Supported lifecycle action: topic suppression.",
        ],
      },
    ],
  },
  {
    slug: "guides/queue-mode",
    eyebrow: "Guide",
    title: "Use queue mode for asynchronous ingestion.",
    description:
      "Queue mode moves ingestion work behind BullMQ and Redis while keeping the same incremental ingest contract.",
    sections: [
      {
        title: "Configure queue mode",
        code: [
          {
            label: "agent.ts",
            code: `const agent = new MemoGrafterAgent({
  db: { connectionString: process.env.DATABASE_URL! },
  llm,
  embedder,
  // Queue mode moves ingestion work to Redis/BullMQ.
  queue: {
    redisUrl: process.env.REDIS_URL!,
    // Keep queues tidy after each job settles.
    removeOnComplete: true,
    removeOnFail: true,
  },
});`,
          },
        ],
      },
      {
        title: "Operational notes",
        bullets: [
          "Queue mode is useful when ingestion becomes too slow to run inline.",
          "Redis connection problems are logged as warnings and normal chatbot invocation should keep going.",
          "The ingest cursor prevents queue retries from duplicating topic nodes for the same message range.",
        ],
      },
    ],
  },
  {
    slug: "guides/fleet-memory",
    eyebrow: "Guide",
    title: "Use shared fleet memory across workers.",
    description:
      "Fleets group color-scoped worker chatbots and let a conductor graft memory across workers.",
    sections: [
      {
        title: "Shared fleet memory",
        code: [
          {
            label: "fleet.ts",
            code: `// A fleet shares memory between related worker agents.
const fleet = new MemoGrafterFleet(config, {
  id: "support-fleet",
  defaultWorkerMemory: "both",
});

await fleet.initialize();
// Store a shared fact once so multiple workers can recall it.
await fleet.ingestToFleet("Refund policy: customers can request a refund within 30 days.");

const support = await fleet.createWorker({ color: "support" });
// Workers can search local memory, shared memory, or both.
const recall = await support.recall("refund policy", { memory: "both" });`,
          },
        ],
      },
      {
        title: "Fleet concepts",
        bullets: [
          "Shared fleet memory lives in a synthetic shared session.",
          "Workers can use local, shared, or combined memory modes.",
          "Conductors coordinate memory transfer between workers.",
        ],
      },
    ],
  },
  {
    slug: "guides/custom-adapters",
    eyebrow: "Guide",
    title: "Use custom LLM and embedder adapters.",
    description:
      "MemoGrafter core depends on adapter interfaces, not a single model provider.",
    sections: [
      {
        title: "Custom adapters",
        code: [
          {
            label: "adapters.ts",
            code: `import type { EmbedAdapter, LLMAdapter, Message } from "memo-grafter";

// Implement this interface to route completions to your provider of choice.
class MyLLMAdapter implements LLMAdapter {
  async complete(messages: Message[], system?: string): Promise<string> {
    return "Assistant response";
  }
}

// Embeddings must return vectors compatible with your storage backend.
class MyEmbedAdapter implements EmbedAdapter {
  async embed(text: string): Promise<number[]> {
    return [];
  }
}`,
          },
        ],
      },
    ],
  },
  {
    slug: "guides/production",
    eyebrow: "Guide",
    title: "Production setup notes.",
    description:
      "MemoGrafter is experimental. Treat it as a starting point for prototypes and evaluation before user-facing production use.",
    sections: [
      {
        title: "Checklist",
        bullets: [
          "Keep secrets in environment variables and never expose provider keys to browser code.",
          "Run `memo-grafter migrate` outside request handling.",
          "Tune `tokenBudget` to control prompt size and cost.",
          "Use queue mode if ingestion becomes slow.",
          "Use lifecycle APIs for user-controlled memory management.",
          "Store your own user/session mapping outside MemoGrafter.",
          "Call `close()` during graceful shutdown.",
          "Run your own evaluation before trusting memory transfer behavior in user-facing flows.",
        ],
      },
    ],
  },
  {
    slug: "api-reference/configuration",
    eyebrow: "Reference",
    title: "Configuration reference.",
    description:
      "The common configuration object wires database, adapters, drift, graph expansion, injection, queue, and cache behavior.",
    sections: [
      {
        title: "Shape",
        code: [
          {
            label: "config.ts",
            code: `const agent = new MemoGrafterAgent({
  db: { connectionString: process.env.DATABASE_URL! },
  llm,
  embedder,
  // Drift controls when a run of messages becomes a new topic segment.
  drift: {
    mode: "intent",
    driftSensitivity: "medium",
    minSegmentMessages: 3,
    reentryDetection: true,
  },
  // Graph expansion decides how far recall/grafting can walk related topics.
  graph: { topK: 5, hopDepth: 2 },
  // Injection controls how much memory is placed into the LLM prompt.
  inject: {
    bufferSize: 4,
    tokenBudget: 1500,
    recentWindowSize: 20,
    recallLimit: 6,
    recallMinSimilarity: 0.55,
  },
});`,
          },
        ],
      },
    ],
  },
  {
    slug: "api-reference/public-api",
    eyebrow: "Reference",
    title: "Public API overview.",
    description:
      "MemoGrafter exports high-level agent APIs, lower-level pipelines, storage contracts, provider adapters, fleet APIs, and maintenance APIs.",
    sections: [
      {
        title: "Main exports",
        bullets: [
          "`MemoGrafterAgent`, `MemoGrafter`, `MemoGrafterFleet`, `WorkerAgent`, `ConductorAgent`.",
          "`OpenAILLMAdapter`, `OpenAIEmbedAdapter`, `GeminiLLMAdapter`, `GeminiEmbedAdapter`, `AnthropicLLMAdapter`.",
          "`PostgresGraphStore`, `GraphStore`.",
          "`MemoGrafterCrawler`, `ConflictDetectionPass`, `DecayScoringPass`, `VersioningPass`.",
          "`GrafterPipeline`, `IngestPipeline`, `RetrieverPipeline`.",
        ],
      },
    ],
  },
  {
    slug: "api-reference/cli",
    eyebrow: "Reference",
    title: "CLI reference.",
    description:
      "The MemoGrafter CLI provides explicit setup, migration, and local Studio workflows.",
    sections: [
      {
        title: "Commands",
        bullets: [
          "`memo-grafter init`: creates `src/memo-grafter/mg-schema.ts` and `mg.config.ts`.",
          "`memo-grafter migrate`: creates or updates MemoGrafter-owned `mg_*` database infrastructure.",
          "`memo-grafter studio`: verifies schema and starts local Studio on `localhost:2891` or the next available port.",
        ],
        code: [{ label: "terminal", code: `${initCode}
${migrateCode}
${studioCode}` }],
      },
    ],
  },
  {
    slug: "api-reference/data-model",
    eyebrow: "Reference",
    title: "Data model reference.",
    description:
      "MemoGrafter stores raw turns, topic segments, topic nodes, memory nodes, topic edges, memory edges, graph snapshots, and lifecycle metadata.",
    sections: [
      {
        title: "Core records",
        bullets: [
          "`Message`: raw chat turn.",
          "`TopicSegment`: contiguous message range for one topic.",
          "`TopicNode`: graph-level topic summary and embedding.",
          "`MemoryNode`: atomic structured memory attached to a topic.",
          "`TopicEdge`: temporal, semantic, reentry, or grafted topic relationship.",
          "`MemoryEdge`: semantic, conflict, update, or related memory relationship.",
          "`GraphSnapshot`: inspection shape for graph and lifecycle views.",
        ],
      },
    ],
  },
  {
    slug: "api-reference/storage-schema",
    eyebrow: "Reference",
    title: "Storage schema reference.",
    description:
      "The built-in PostgreSQL store manages MemoGrafter-owned tables and pgvector indexes.",
    sections: [
      {
        title: "Managed tables",
        bullets: [
          "`mg_message_buffer`",
          "`mg_segments`",
          "`mg_topic_nodes`",
          "`mg_topic_edges`",
          "`mg_memory_nodes`",
          "`mg_memory_edges`",
          "`mg_session_ingest_state`",
          "`mg_graft_registry`",
          "`mg_fleets`",
          "`mg_fleet_agents`",
        ],
      },
      {
        title: "Important boundary",
        body: [
          "The CLI migration command is the recommended setup path. Direct `PostgresGraphStore.migrate()` remains an advanced fallback for CI, deploy, test, or constrained tooling.",
        ],
      },
    ],
  },
  {
    slug: "api-reference/troubleshooting",
    eyebrow: "Reference",
    title: "Troubleshooting.",
    description:
      "Common setup, ingestion, recall, grafting, Redis, and browser-runtime issues.",
    sections: [
      {
        title: "Common fixes",
        bullets: [
          "`DATABASE_URL is not reachable`: confirm PostgreSQL, connection string, and `pgvector`.",
          "No topic nodes: check conversation length, drift settings, adapters, and queue completion.",
          "Absorb copies zero nodes: check source session, lifecycle state, and semantic thresholds.",
          "Recall returns zero facts: lower `minSimilarity`, confirm ingestion finished, and inspect memory nodes in Studio.",
          "Duplicate topics: verify incremental ingest cursor behavior and queue retries.",
          "Redis warnings: queue/cache should warn and degrade rather than fail ordinary invocation.",
        ],
      },
    ],
  },
  {
    slug: "architecture",
    eyebrow: "Internals",
    title: "How MemoGrafter works.",
    description:
      "A shorter public architecture guide for the main runtime layers and flows.",
    sections: [
      {
        title: "Runtime layers",
        bullets: [
          "`MemoGrafterAgent` is the common chatbot-facing API.",
          "`MemoGrafter` wires storage, pipelines, adapters, queueing, and recall cache.",
          "`IngestPipeline` turns history or raw text into graph records.",
          "`RetrieverPipeline` and `GrafterPipeline` turn graph records back into prompt-ready memory.",
          "`GraphStore` is the persistence boundary; `PostgresGraphStore` is the built-in implementation.",
          "`MemoGrafterCrawler` annotates memory quality over time.",
        ],
      },
      {
        title: "Main flow",
        code: [{ label: "architecture", code: `user / assistant messages or raw text
-> message buffer
-> topic drift detection
-> topic segments
-> topic nodes
-> atomic memory nodes
-> graph edges
-> recall, injection, or grafting` }],
      },
    ],
  },
  {
    slug: "internals/ingestion-pipeline",
    eyebrow: "Internals",
    title: "Ingestion pipeline internals.",
    description:
      "Contributor-level notes for incremental graph construction, topic drift detection, segment processing, and queue-backed ingestion.",
    sections: [
      {
        title: "Main responsibilities",
        bullets: [
          "Save message buffers and ingest cursors.",
          "Embed new messages with a small overlap window.",
          "Detect topic segments and optional reentry matches.",
          "Persist topic segments, topic nodes, memory nodes, and edges.",
          "Update ingest cursor only after graph writes complete.",
        ],
      },
    ],
  },
  {
    slug: "internals/retrieval-and-grafting",
    eyebrow: "Internals",
    title: "Retrieval and grafting internals.",
    description:
      "Contributor-level notes for fact recall, semantic grafting, graph expansion, prompt assembly, and token budgets.",
    sections: [
      {
        title: "Recall path",
        bullets: [
          "Embed query.",
          "Search active memory-node vectors.",
          "Filter decayed, superseded, forgotten, and suppressed-topic memories.",
          "Rank by similarity and confidence.",
          "Group facts by parent topic node and format under token budget.",
        ],
      },
      {
        title: "Graft path",
        bullets: [
          "Select explicit or semantic seed topic nodes.",
          "Optionally expand through graph neighbours.",
          "Load source message context and active memory facts.",
          "Include maintenance notes when active facts supersede historical summaries.",
          "Trim to token budget.",
        ],
      },
    ],
  },
  {
    slug: "internals/storage-and-migrations",
    eyebrow: "Internals",
    title: "Storage and migrations internals.",
    description:
      "Contributor-level notes for GraphStore, PostgreSQL/pgvector, schema declarations, migrations, lifecycle filtering, and graft provenance.",
    sections: [
      {
        title: "Storage contract",
        bullets: [
          "`GraphStore` covers initialization, message buffers, ingest cursors, topic/memory records, lifecycle, vector search, graph traversal, graft registry, fleet metadata, and cleanup.",
          "`PostgresGraphStore` maps database rows into core types and owns pgvector SQL details.",
          "Schema changes require migration, schema declarations, tests, and docs updates.",
        ],
      },
    ],
  },
  {
    slug: "internals/maintenance-crawler",
    eyebrow: "Internals",
    title: "Maintenance crawler internals.",
    description:
      "Contributor-level notes for conflict detection, versioning, decay scoring, lifecycle semantics, memory history, and diff reads.",
    sections: [
      {
        title: "Passes",
        bullets: [
          "`ConflictDetectionPass` marks competing memory facts as conflicts.",
          "`VersioningPass` marks explicit replacements and supersession.",
          "`DecayScoringPass` marks low-scoring old memories as decayed.",
          "Passes annotate rows and edges; they do not physically delete graph data.",
        ],
      },
    ],
  },
  {
    slug: "internals/fleet-cli-studio",
    eyebrow: "Internals",
    title: "Fleet, CLI, and Studio internals.",
    description:
      "Contributor-level notes for multi-agent memory workflows, CLI setup, local Studio, examples, and DevEx ownership.",
    sections: [
      {
        title: "Owned areas",
        bullets: [
          "`MemoGrafterFleet`, `WorkerAgent`, `ConductorAgent`, and `FleetStore`.",
          "CLI commands: `init`, `migrate`, and `studio`.",
          "Studio local API, repository helpers, dependency-free frontend, and Prompt Preview service.",
          "Examples and onboarding docs.",
        ],
      },
    ],
  },
  {
    slug: "internals/tests",
    eyebrow: "Internals",
    title: "Testing guide.",
    description:
      "Contributor-level map of unit, core, fleet, and manual smoke tests.",
    sections: [
      {
        title: "Commands",
        bullets: [
          "`npm test`: Vitest default mode.",
          "`npm run test:run`: Vitest once.",
          "`npm run test:core`: integration-style core scripts with `.env`.",
          "`npm run test:fleet`: integration-style fleet scripts with `.env`.",
        ],
      },
      {
        title: "When to run what",
        bullets: [
          "Run unit tests for isolated API, pipeline, crawler, store, and CLI behavior.",
          "Run core tests when changing store, ingest, grafting, queue mode, or end-to-end agent flow.",
          "Run fleet tests when changing fleet store methods, cross-session search, or absorption behavior.",
          "Run manual provider tests only when validating live provider integrations.",
        ],
      },
    ],
  },
];

const lockedSlugs = new Set([
  "",
  "installation",
  "quick-start",
  "environment-setup",
  "concepts/how-it-works",
  "concepts/messages",
  "concepts/segments",
  "concepts/topic-nodes",
  "concepts/memory-nodes",
  "concepts/graph-edges",
  "concepts/grafting",
  "concepts/lifecycle",
]);

export const docsPages: DocPage[] = [
  ...existingDocsPages.filter((page) => lockedSlugs.has(page.slug)),
  ...expandedDocsPages.filter((page) => !page.slug.startsWith("api-reference/") && !page.slug.startsWith("guides/")),
  ...guidePages,
  ...additionalAdvancedPages,
  ...apiReferencePages,
];

const docPages = new Map(docsPages.map((page) => [page.slug, page]));

export function getDocPage(slug: string) {
  return docPages.get(slug);
}

export function getDocSlugs() {
  return docsPages.filter((page) => page.slug).map((page) => page.slug);
}

export function validateDocs() {
  const pageSlugs = new Set(docsPages.map((page) => page.slug));
  const navSlugs = docsNavItems.map((item) => item.href.replace(/^\/docs\/?/, ""));

  return navSlugs.filter((slug) => !pageSlugs.has(slug));
}

export function getAdjacentDocs(slug: string) {
  const orderedSlugs = docsNavItems.map((item) => item.href.replace(/^\/docs\/?/, ""));
  const index = orderedSlugs.indexOf(slug);

  return {
    previous: index > 0 ? docsNavItems[index - 1] : undefined,
    next: index >= 0 && index < docsNavItems.length - 1 ? docsNavItems[index + 1] : undefined,
  };
}
