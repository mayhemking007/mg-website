import type { DocNavGroup } from "./types";

export const docsNavGroups: DocNavGroup[] = [
  {
    title: "Docs",
    items: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/quick-start", label: "Quick Start" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/environment-setup", label: "Environment Setup" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
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
      { href: "/docs/guides/chatbot-memory", label: "Build a Chatbot with Memory" },
      { href: "/docs/guides/ingest-text", label: "Ingest Text and Documents" },
      { href: "/docs/guides/recall-facts", label: "Recall Facts" },
      { href: "/docs/guides/graft-memory", label: "Graft Memory Between Sessions" },
      { href: "/docs/guides/studio", label: "Use Studio" },
      { href: "/docs/guides/queue-mode", label: "Use Queue Mode" },
      { href: "/docs/guides/fleet-memory", label: "Use Fleet Memory" },
      { href: "/docs/guides/custom-adapters", label: "Custom LLM and Embedder Adapters" },
      { href: "/docs/guides/production", label: "Production Setup" },
    ],
  },
  {
    title: "Reference",
    items: [
      { href: "/docs/api-reference/configuration", label: "Configuration" },
      { href: "/docs/api-reference/public-api", label: "Public API" },
      { href: "/docs/api-reference/cli", label: "CLI" },
      { href: "/docs/api-reference/data-model", label: "Data Model" },
      { href: "/docs/api-reference/storage-schema", label: "Storage Schema" },
      { href: "/docs/api-reference/troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    title: "Internals",
    items: [
      { href: "/docs/architecture", label: "Architecture" },
      { href: "/docs/internals/ingestion-pipeline", label: "Ingestion Pipeline" },
      { href: "/docs/internals/retrieval-and-grafting", label: "Retrieval and Grafting" },
      { href: "/docs/internals/storage-and-migrations", label: "Storage and Migrations" },
      { href: "/docs/internals/maintenance-crawler", label: "Maintenance Crawler" },
      { href: "/docs/internals/fleet-cli-studio", label: "Fleet, CLI, and Studio" },
      { href: "/docs/internals/tests", label: "Tests" },
    ],
  },
];

export const docsNavItems = docsNavGroups.flatMap((group) => group.items);
