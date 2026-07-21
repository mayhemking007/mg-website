import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/docs/guides/ingest-text", destination: "/docs/guides/knowledge-extraction", permanent: true },
      { source: "/docs/guides/recall-facts", destination: "/docs/api-reference/recall", permanent: true },
      { source: "/docs/guides/graft-memory", destination: "/docs/guides/multi-session-memory", permanent: true },
      { source: "/docs/guides/studio", destination: "/docs/studio/launching-studio", permanent: true },
      { source: "/docs/guides/queue-mode", destination: "/docs/advanced/scaling", permanent: true },
      { source: "/docs/guides/fleet-memory", destination: "/docs/examples/multi-agent-memory", permanent: true },
      { source: "/docs/guides/custom-adapters", destination: "/docs/adapters/custom-adapter", permanent: true },
      { source: "/docs/guides/production", destination: "/docs/advanced/scaling", permanent: true },
      { source: "/docs/api-reference/configuration", destination: "/docs/api-reference/memo-grafter-agent", permanent: true },
      { source: "/docs/api-reference/public-api", destination: "/docs/api-reference/memo-grafter-agent", permanent: true },
      { source: "/docs/api-reference/cli", destination: "/docs/cli/installation", permanent: true },
      { source: "/docs/api-reference/data-model", destination: "/docs/api-reference/types", permanent: true },
      { source: "/docs/api-reference/storage-schema", destination: "/docs/advanced/graph-store", permanent: true },
      { source: "/docs/api-reference/troubleshooting", destination: "/docs/api-reference/errors", permanent: true },
      { source: "/docs/architecture", destination: "/docs/advanced/architecture", permanent: true },
      { source: "/docs/internals/ingestion-pipeline", destination: "/docs/advanced/memory-pipeline", permanent: true },
      { source: "/docs/internals/retrieval-and-grafting", destination: "/docs/advanced/retrieval-pipeline", permanent: true },
      { source: "/docs/internals/storage-and-migrations", destination: "/docs/advanced/graph-store", permanent: true },
      { source: "/docs/internals/maintenance-crawler", destination: "/docs/advanced/custom-pipelines", permanent: true },
      { source: "/docs/internals/fleet-cli-studio", destination: "/docs/advanced/architecture", permanent: true },
      { source: "/docs/internals/tests", destination: "/docs/advanced/custom-pipelines", permanent: true },
    ];
  },
};

export default nextConfig;
