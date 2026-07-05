export const installCode = `# Add the MemoGrafter runtime to your server-side app.
npm install memo-grafter`;

export const initCode = `# Generate MemoGrafter config and schema files.
npx memo-grafter init`;

export const migrateCode = `# Create or update only MemoGrafter-owned database tables.
npx memo-grafter migrate`;

export const studioCode = `# Start the local graph inspector and prompt preview UI.
npx memo-grafter studio`;

export const quickStartCode = `# Install the package before creating an agent.
npm install memo-grafter`;

export const minimalAgentCode = `import "dotenv/config";

import {
  MemoGrafterAgent,
  OpenAIEmbedAdapter,
  OpenAILLMAdapter,
} from "memo-grafter";

// Create one agent for the chatbot session or workflow you want to remember.
const agent = new MemoGrafterAgent({
  // MemoGrafter stores graph memory in PostgreSQL.
  db: { connectionString: process.env.DATABASE_URL! },
  // The LLM generates responses; the embedder makes memory searchable by meaning.
  llm: new OpenAILLMAdapter("gpt-4o"),
  embedder: new OpenAIEmbedAdapter("text-embedding-3-small"),
});

// Prepare adapters, storage, and any pending graph state.
await agent.initialize();

// invoke() answers now and schedules background ingestion for memory later.
await agent.invoke("I am planning a Japan trip.");
await agent.invoke("I like quiet towns, bookstores, and local cafes.");

// recall() retrieves relevant structured facts from the memory graph.
const recall = await agent.recall("travel preferences");
console.log(recall.facts);

// Close database/provider resources during graceful shutdown.
await agent.close();`;

export const flowCode = `invoke() -> responds now
background ingestion -> builds graph memory
recall() -> retrieves relevant facts later`;
