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
      { source: "/docs/api-reference/configuration", destination: "/docs/api-reference", permanent: true },
      { source: "/docs/api-reference/public-api", destination: "/docs/api-reference", permanent: true },
      { source: "/docs/api-reference/cli", destination: "/docs/cli/installation", permanent: true },
      { source: "/docs/api-reference/data-model", destination: "/docs/api-reference/types/topic-node", permanent: true },
      { source: "/docs/api-reference/storage-schema", destination: "/docs/advanced/graph-store", permanent: true },
      { source: "/docs/api-reference/troubleshooting", destination: "/docs/api-reference/error-handling", permanent: true },
      { source: "/docs/api-reference/invoke", destination: "/docs/api-reference/memo-grafter-agent/invoke", permanent: true },
      { source: "/docs/api-reference/ingest", destination: "/docs/api-reference/memo-grafter/ingest", permanent: true },
      { source: "/docs/api-reference/recall", destination: "/docs/api-reference/memo-grafter-agent/recall", permanent: true },
      { source: "/docs/api-reference/graft", destination: "/docs/api-reference/memo-grafter-agent/graft", permanent: true },
      { source: "/docs/api-reference/forget", destination: "/docs/api-reference/memo-grafter-agent/forget", permanent: true },
      { source: "/docs/api-reference/history", destination: "/docs/api-reference/memo-grafter-agent/get-history", permanent: true },
      { source: "/docs/api-reference/studio-api", destination: "/docs/studio/prompt-preview", permanent: true },
      { source: "/docs/api-reference/pipelines/:path*", destination: "/docs/advanced/custom-pipelines", permanent: true },
      { source: "/docs/api-reference/graph-store/:path*", destination: "/docs/advanced/graph-store", permanent: true },
      { source: "/docs/api-reference/studio-preview/:path*", destination: "/docs/studio/prompt-preview", permanent: true },
      { source: "/docs/api-reference/schema/:path*", destination: "/docs/cli/migrate", permanent: true },
      { source: "/docs/api-reference/maintenance/conflict-detection-run", destination: "/docs/advanced/custom-pipelines", permanent: true },
      { source: "/docs/api-reference/maintenance/versioning-run", destination: "/docs/advanced/custom-pipelines", permanent: true },
      { source: "/docs/api-reference/maintenance/decay-scoring-run", destination: "/docs/advanced/custom-pipelines", permanent: true },
      { source: "/docs/api-reference/types", destination: "/docs/api-reference/types/message", permanent: true },
      { source: "/docs/api-reference/errors", destination: "/docs/api-reference/error-handling", permanent: true },
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
