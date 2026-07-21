import type { DocNavGroup } from "./types";

export const docsNavGroups: DocNavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/quick-start", label: "Quick Start" },
      { href: "/docs/environment-setup", label: "Environment Setup" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { href: "/docs/concepts/how-it-works", label: "How it works" },
      { href: "/docs/concepts/messages", label: "Messages" },
      { href: "/docs/concepts/segments", label: "Segments" },
      { href: "/docs/concepts/topic-nodes", label: "Topic Nodes" },
      { href: "/docs/concepts/memory-nodes", label: "Memory Nodes" },
      { href: "/docs/concepts/graph-edges", label: "Graph Edges" },
      { href: "/docs/concepts/grafting", label: "Grafting" },
      { href: "/docs/concepts/lifecycle", label: "Lifecycle" },
    ],
  },
  {
    title: "Guides",
    items: [
      { href: "/docs/guides/chatbot-memory", label: "Chatbot Memory" },
      { href: "/docs/guides/long-running-agents", label: "Long-running Agents" },
      { href: "/docs/guides/knowledge-extraction", label: "Knowledge Extraction" },
      { href: "/docs/guides/multi-session-memory", label: "Multi-session Memory" },
      { href: "/docs/guides/streaming-responses", label: "Streaming Responses" },
      { href: "/docs/guides/memory-review", label: "Memory Review" },
      { href: "/docs/guides/pruning", label: "Pruning" },
      { href: "/docs/guides/forget-memory", label: "Forget Memory" },
      { href: "/docs/guides/conversation-summaries", label: "Conversation Summaries" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { href: "/docs/api-reference/memo-grafter-agent", label: "MemoGrafterAgent" },
      { href: "/docs/api-reference/invoke", label: "invoke()" },
      { href: "/docs/api-reference/ingest", label: "ingest()" },
      { href: "/docs/api-reference/recall", label: "recall()" },
      { href: "/docs/api-reference/graft", label: "graft()" },
      { href: "/docs/api-reference/forget", label: "forget()" },
      { href: "/docs/api-reference/history", label: "history()" },
      { href: "/docs/api-reference/studio-api", label: "Studio API" },
      { href: "/docs/api-reference/types", label: "Types" },
      { href: "/docs/api-reference/errors", label: "Errors" },
    ],
  },
  {
    title: "Adapters",
    items: [
      { href: "/docs/adapters/openai", label: "OpenAI" },
      { href: "/docs/adapters/anthropic", label: "Anthropic" },
      { href: "/docs/adapters/gemini", label: "Gemini" },
      { href: "/docs/adapters/custom-adapter", label: "Custom Adapter" },
      { href: "/docs/adapters/embeddings", label: "Embeddings" },
      { href: "/docs/adapters/custom-llm", label: "Custom LLM" },
    ],
  },
  {
    title: "Studio",
    items: [
      { href: "/docs/studio/launching-studio", label: "Launching Studio" },
      { href: "/docs/studio/graph-view", label: "Graph View" },
      { href: "/docs/studio/memory-table", label: "Memory Table" },
      { href: "/docs/studio/prompt-preview", label: "Prompt Preview" },
      { href: "/docs/studio/lifecycle-actions", label: "Lifecycle Actions" },
      { href: "/docs/studio/search", label: "Search" },
      { href: "/docs/studio/troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    title: "CLI",
    items: [
      { href: "/docs/cli/installation", label: "Installation" },
      { href: "/docs/cli/studio", label: "studio" },
      { href: "/docs/cli/init", label: "init" },
      { href: "/docs/cli/migrate", label: "migrate" },
      { href: "/docs/cli/config", label: "config" },
      { href: "/docs/cli/environment-variables", label: "Environment Variables" },
    ],
  },
  {
    title: "Examples",
    items: [
      { href: "/docs/examples/simple-chatbot", label: "Simple Chatbot" },
      { href: "/docs/examples/customer-support", label: "Customer Support" },
      { href: "/docs/examples/personal-assistant", label: "Personal Assistant" },
      { href: "/docs/examples/journal-memory", label: "Journal Memory" },
      { href: "/docs/examples/research-assistant", label: "Research Assistant" },
      { href: "/docs/examples/multi-agent-memory", label: "Multi-agent Memory" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { href: "/docs/advanced/architecture", label: "Architecture" },
      { href: "/docs/advanced/memory-pipeline", label: "Memory Pipeline" },
      { href: "/docs/advanced/retrieval-pipeline", label: "Retrieval Pipeline" },
      { href: "/docs/advanced/graph-store", label: "Graph Store" },
      { href: "/docs/advanced/performance", label: "Performance" },
      { href: "/docs/advanced/scaling", label: "Scaling" },
      { href: "/docs/advanced/prompt-design", label: "Prompt Design" },
      { href: "/docs/advanced/custom-pipelines", label: "Custom Pipelines" },
    ],
  },
];

export const docsNavItems = docsNavGroups.flatMap((group) => group.items);
