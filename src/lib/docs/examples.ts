export const installCode = `npm install memo-grafter`;

export const initCode = `npx memo-grafter init`;

export const migrateCode = `npx memo-grafter migrate`;

export const studioCode = `npx memo-grafter studio`;

export const quickStartCode = `npx install memo-grafter`;

export const minimalAgentCode = `import "dotenv/config";

import {
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
await agent.invoke("I like quiet towns, bookstores, and local cafes.");

const recall = await agent.recall("travel preferences");
console.log(recall.facts);

await agent.close();`;

export const flowCode = `invoke() -> responds now
background ingestion -> builds graph memory
recall() -> retrieves relevant facts later`;
