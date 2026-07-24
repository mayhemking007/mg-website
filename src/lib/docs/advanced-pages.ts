import type { DocPage, DocSection } from "./types";

function advanced(slug: string, title: string, description: string, sections: DocSection[]): DocPage {
  return { slug: `advanced/${slug}`, title, description, eyebrow: "Advanced", sections };
}

export const additionalAdvancedPages: DocPage[] = [
  advanced("long-running-agents", "Long-running agents", "Keep an agent useful through extended work, restarts, and large histories without replaying every turn.", [
    { title: "Design the memory boundary", body: ["Use an application-owned stable job or conversation identifier with the lower-level `MemoGrafter` API when work must be reopened across process lifetimes. `MemoGrafterAgent` owns a generated session and is best reused while that active agent instance lives."] },
    { title: "Checkpoint durable knowledge", bullets: ["Ingest completed decisions, results, and meaningful checkpoints rather than transient progress noise.", "Attach source and project tags so later recall can recover the right scope.", "Keep raw operational state in the application’s job store; MemoGrafter is memory infrastructure, not a scheduler."] },
    { title: "Recall before planning", code: [{ label: "planning-cycle.ts", language: "ts", code: `const memory = await memo.graftByRelevance(sessionId, nextTask, {
  topK: 5,
  minSimilarity: 0.55,
  hopDepth: 1,
});
const plan = await llm.complete(
  [{ role: "user", content: nextTask }],
  memory.systemPrompt,
);` }] },
    { title: "Control growth", bullets: ["Bound retrieved facts and prompt context with limits and token budgets.", "Use recent raw history for immediate continuity and graph memory for older relevant context.", "Review extraction quality before increasing retrieval breadth.", "Run crawler maintenance and reviewed lifecycle actions outside the response-critical path."] },
    { title: "Queue and cache", body: ["Queue mode can move extraction off the foreground path. Recall caching helps repeated queries over stable memory, but neither feature replaces job state, retries, monitoring, or authorization in the host application."], links: [{ label: "Queued Ingestion", href: "/docs/advanced/queued-ingestion", description: "Understand worker timing and visibility." }, { label: "Retrieval Tuning", href: "/docs/advanced/retrieval-tuning", description: "Bound relevance and prompt size." }] },
    { title: "Operational checklist", bullets: ["Use globally unique session identifiers.", "Make worker shutdown call `close()`.", "Measure invoke latency, ingestion lag, queue failures, prompt size, and empty recall rate.", "Do not create a new `MemoGrafterAgent` on every planning cycle.", "Keep tenant authorization outside MemoGrafter."] },
  ]),

  advanced("conflict-detection-versioning", "Conflict detection & versioning", "Understand how supported crawler maintenance distinguishes competing facts, explicit updates, supersession, and decay.", [
    { title: "Memory quality model", body: ["`MemoGrafterCrawler` runs deterministic, non-destructive passes over active memory. It annotates rows and creates edges; it does not delete graph nodes or rewrite historical topic summaries."] },
    { title: "Conflict versus update", bullets: ["A conflict contains competing normalized values for the same subject and predicate without an explicit update cue.", "A version update requires language such as “actually,” “now,” “changed to,” or “instead” on the newest value.", "Plain disagreement keeps both facts active and marks conflict; recency alone does not make one fact current.", "Broad topic memories are conservatively filtered to reduce false-positive conflict groups."] },
    { title: "Graph representation", bullets: ["Conflicting facts receive `hasConflict: true` and an idempotent `conflicts` memory edge.", "An older replaced fact receives `supersededBy` pointing to the newer fact.", "The update edge direction is `newer_memory --updates--> older_memory`.", "Decay marks stale active memory as `decayed` using confidence-weighted exponential recency."] },
    { title: "Run supported maintenance", code: [{ label: "crawler.ts", language: "ts", code: `const memo = new MemoGrafter(config);
await memo.initialize();

const crawler = new MemoGrafterCrawler({
  store: memo.store,
  intervalMs: 60_000,
});
const report = await crawler.runOnce();
console.log(report);
crawler.start();
// During shutdown:
crawler.stop();
await memo.close();` }] },
    { title: "Historical summaries", body: ["Topic summaries describe the segment that produced them and remain historical. When active memory supersedes a detail in an older summary, graft prompt assembly adds deterministic maintenance notes and active facts so the downstream model knows what to prefer."] },
    { title: "Lifecycle interaction", bullets: ["Forgotten memories and memories attached to suppressed topics are skipped.", "Already superseded or decayed rows are not treated as active candidates.", "Maintenance annotations remain visible in snapshots and history.", "Existing false-positive edges are not automatically deleted by later crawler runs."] },
    { title: "Related documentation", links: [{ label: "MemoGrafterCrawler", href: "/docs/api-reference/maintenance/memo-grafter-crawler", description: "Configure the supported maintenance orchestrator." }, { label: "Inspecting & Reviewing Memory", href: "/docs/guides/inspecting-reviewing-memory", description: "Review status, history, and memory edges." }, { label: "Pruning Memory Safely", href: "/docs/guides/pruning", description: "Choose an application lifecycle policy." }] },
  ]),

  advanced("retrieval-tuning", "Retrieval tuning", "Tune semantic recall using representative queries, lifecycle-aware inspection, and bounded prompt budgets.", [
    { title: "Start with an evaluation set", body: ["Collect representative queries, expected facts, acceptable alternatives, and known negative examples. Tune against this set rather than one successful demo query."] },
    { title: "Primary controls", bullets: ["`limit`: maximum memory candidates fetched before final prompt selection.", "`minSimilarity`: vector-search floor; lowering it increases recall and noise.", "`tokenBudget`: maximum approximate fact-block tokens assembled into the prompt.", "`similarityWeight`: how strongly semantic match affects ranking.", "`confidenceWeight`: how strongly extraction confidence affects ranking.", "`tags`, `tagMode`, and `scope`: which memory population is eligible."] },
    { title: "Tune in order", code: [{ label: "tuning.ts", language: "ts", code: `const result = await agent.recall(query, {
  limit: 10,
  minSimilarity: 0.55,
  tokenBudget: 1200,
  scoring: {
    similarityWeight: 0.7,
    confidenceWeight: 0.3,
  },
});` }], bullets: ["Confirm ingestion produced the expected atomic memory.", "Confirm session, tags, and lifecycle state.", "Inspect raw similarities using a moderately permissive threshold.", "Adjust ranking weights only after candidate quality is understood.", "Set the token budget from downstream prompt constraints."] },
    { title: "Debug missing recall", bullets: ["Wait for inline or queued ingestion to complete.", "Check whether extraction created memory nodes, not only a topic summary.", "Use the vocabulary of the stored fact in a diagnostic query.", "Inspect forgotten, decayed, superseded, and suppressed states in a snapshot.", "Check tag normalization and recall scope.", "Use Studio Prompt Preview with the same query and settings."] },
    { title: "Recall caching", body: ["When configured, MemoGrafter caches only raw vector-search results, not final prompts or complete retrieval results. Keys include session, limits, threshold, scope, tag mode, normalized tags, and an embedding hash. TTL defaults to 90 seconds and is clamped to 60–120 seconds."], bullets: ["Redis failures fall back to PostgreSQL search.", "Successful lifecycle changes clear recall cache entries.", "Different token budgets still assemble fresh prompt output.", "Caching helps repeated stable queries; it does not solve slow ingestion or poor embeddings."] },
    { title: "Measure", bullets: ["Fact precision and recall against expected results.", "Empty-result and irrelevant-result rates.", "Prompt token count and downstream answer quality.", "Vector-search latency and cache hit behavior.", "Performance across tenants, tags, and session sizes."] },
    { title: "Related documentation", links: [{ label: "recall()", href: "/docs/api-reference/memo-grafter-agent/recall", description: "Review the retrieval contract." }, { label: "Prompt Preview", href: "/docs/studio/prompt-preview", description: "Inspect exact prompt output and token usage." }, { label: "Tags & Memory Scope", href: "/docs/guides/tags-memory-scope", description: "Choose the eligible memory population." }] },
  ]),

  advanced("graph-expansion-topic-reentry", "Graph expansion & topic re-entry", "Control how semantic topic seeds expand through the graph and how returned subjects connect to earlier conversation topics.", [
    { title: "Topic graph roles", bullets: ["Temporal edges link adjacent topics.", "Semantic edges connect similar topic nodes.", "Reentry edges connect a later return to an earlier related subject.", "Grafted edges preserve relationships to copied source topics."] },
    { title: "Semantic seed selection", body: ["`graftByRelevance()` embeds the query and selects similar topic nodes. Those seed nodes are then passed to the same graft assembly path used for explicit topic IDs."] },
    { title: "Expansion controls", code: [{ label: "graph-expansion.ts", language: "ts", code: `const context = await agent.graftByRelevance("database reliability", {
  topK: 4,
  minSimilarity: 0.6,
  hopDepth: 1,
  expansionStrategy: "graph",
});` }], bullets: ["`topK` limits semantic seed topics.", "`minSimilarity` filters weak topic matches.", "`hopDepth` controls neighbour traversal distance.", "`expansionStrategy: none` formats only seed topics.", "`expansionStrategy: graph` includes reachable neighbours within the hop depth."] },
    { title: "Topic re-entry", diagram: "reentry-flow", body: ["A conversation may discuss databases, switch to authentication, and later return to connection pooling. Reentry detection links the later database topic back to the earlier one instead of merging or rewriting either historical segment."] },
    { title: "Reentry configuration", bullets: ["`reentryDetection` enables or disables reentry linking and defaults to enabled.", "`reentryThreshold` controls the required embedding similarity and defaults to 0.85.", "Reentry can connect new nodes to durable earlier nodes or to earlier segments in the same ingestion run."] },
    { title: "Tradeoffs", bullets: ["Higher hop depth can recover useful context but increase distraction and prompt size.", "Seed-only expansion is easier to reason about for user-selected topics.", "Semantic similarity does not imply authorization; scope the source graph first.", "Evaluate graph expansion using downstream answers, not only visually plausible neighbours."] },
    { title: "Related documentation", links: [{ label: "Grafting Memory", href: "/docs/guides/grafting-memory", description: "Apply graph expansion in a transfer workflow." }, { label: "graftByRelevance()", href: "/docs/api-reference/memo-grafter-agent/graft-by-relevance", description: "Review query and expansion options." }, { label: "Graph Edges", href: "/docs/concepts/graph-edges", description: "Understand the graph relationship types." }] },
  ]),

  advanced("queued-ingestion", "Queued ingestion", "Move graph construction behind BullMQ and Redis while preserving correct visibility, retries, and shutdown behavior.", [
    { title: "When queue mode helps", body: ["Use queue mode when segmentation, extraction, and embedding make foreground response latency unacceptable. The LLM response can complete while workers build graph memory afterward."] },
    { title: "Configure the queue", code: [{ label: "queue-config.ts", language: "ts", code: `const agent = new MemoGrafterAgent({
  db: { connectionString: process.env.DATABASE_URL! },
  llm,
  embedder,
  queue: {
    redisUrl: process.env.REDIS_URL!,
    removeOnComplete: true,
    removeOnFail: false,
  },
});` }] },
    { title: "Acceptance versus visibility", body: ["In queue mode, an awaited ingestion call confirms that the job was accepted. It does not mean topic and memory nodes are already searchable. Reads must wait for the relevant worker job to complete before assuming new memory is visible."] },
    { title: "Retry safety", bullets: ["The stored ingest cursor prevents reprocessing message ranges already committed successfully.", "The cursor advances only after graph writes succeed.", "Keep failed jobs long enough to inspect their errors.", "Design application retries around job identity and observed completion rather than arbitrary delays."] },
    { title: "Worker operations", bullets: ["Run workers with the same database, provider, embedding, and Redis configuration as producers.", "Monitor queue depth, job age, failures, provider latency, and database errors.", "Use deliberate concurrency limits to protect providers and PostgreSQL.", "Close queue and worker resources during graceful shutdown."] },
    { title: "Failure behavior", body: ["Redis connection problems are warnings in normal chatbot invocation paths, but production systems still need alerting because accepted-looking conversations may not become graph memory. Required database or provider failures during worker execution should surface through failed-job monitoring."] },
    { title: "Common mistakes", bullets: ["Expecting immediate recall after an enqueue.", "Removing failed jobs before recording their errors.", "Running workers with a different embedding model or dimension.", "Using sleep timers instead of job completion state.", "Stopping a process without closing queue resources."] },
    { title: "Related documentation", links: [{ label: "Streaming Responses", href: "/docs/guides/streaming-responses", description: "Queue the completed streamed exchange." }, { label: "Scaling", href: "/docs/advanced/scaling", description: "Plan distributed workers and stores." }, { label: "enqueueIngest()", href: "/docs/api-reference/memo-grafter/enqueue-ingest", description: "Submit explicit conversation ingestion." }] },
  ]),

  advanced("production-deployment", "Production deployment", "Deploy MemoGrafter as server-side memory infrastructure with deliberate migrations, isolation, workers, shutdown, and observability.", [
    { title: "Deployment boundary", body: ["MemoGrafter is server-only and experimental. Keep database credentials, provider keys, memory authorization, and lifecycle actions behind application-controlled server boundaries."] },
    { title: "Prepare the database", bullets: ["Run `memo-grafter init` during project setup.", "Run `memo-grafter migrate` as an intentional deployment step, not on every request or application startup.", "Provide PostgreSQL with `pgvector` and `pgcrypto` support.", "Use connection pooling appropriate for application and worker concurrency.", "Back up and monitor MemoGrafter-owned `mg_*` tables according to retention policy."] },
    { title: "Process topology", bullets: ["Run web or API processes for foreground recall and response generation.", "Run BullMQ workers separately when queue mode is enabled.", "Choose one deliberate owner for scheduled crawler maintenance in multi-instance deployments.", "Keep Studio local to trusted development environments."] },
    { title: "Isolation and privacy", bullets: ["Use globally unique application-owned session identifiers where the lower-level API is used.", "Authorize users, tenants, tags, and source/destination sessions before memory reads or transfer.", "Treat tags as filters, not access controls.", "Define soft-forget, hard-delete, backup, log, and export policies together.", "Avoid logging raw private memory unless required and protected."] },
    { title: "Graceful shutdown", code: [{ label: "shutdown.ts", language: "ts", code: `async function shutdown() {
  crawler?.stop();
  await fleet?.close();
  await agent?.close();
  await memo?.close();
}
process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);` }], body: ["Only close resources owned by the current component; avoid closing the same shared core through several wrappers."] },
    { title: "Observability", bullets: ["Foreground invoke latency and first-token time.", "Recall latency, empty-result rate, selected fact count, and prompt size.", "Ingestion lag, queue depth, failed jobs, and retry count.", "Provider request latency, rate limits, and usage.", "Database pool saturation, vector-search latency, and migration status.", "Lifecycle actions and cross-session transfer audit events."] },
    { title: "Readiness checklist", bullets: ["Evaluate retrieval and transfer behavior on representative private and adversarial examples.", "Test provider, Redis, and database failure paths.", "Verify lifecycle cache invalidation.", "Test shutdown with pending ingestion.", "Confirm Studio is not publicly exposed.", "Document the installed experimental version and upgrade procedure."] },
    { title: "Related documentation", links: [{ label: "CLI migrations", href: "/docs/cli/migrate", description: "Prepare MemoGrafter-owned database infrastructure." }, { label: "Queued Ingestion", href: "/docs/advanced/queued-ingestion", description: "Operate background graph construction." }, { label: "Performance", href: "/docs/advanced/performance", description: "Measure latency, prompts, and throughput." }, { label: "Forgetting & Privacy", href: "/docs/guides/forgetting-privacy", description: "Design lifecycle and retention workflows." }] },
  ]),
];
