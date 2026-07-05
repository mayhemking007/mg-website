export type DocCodeBlock = {
  code: string;
  label: string;
  language?: string;
};

export type DocSection = {
  title: string;
  body?: string[];
  bullets?: string[];
  code?: DocCodeBlock[];
  diagram?:
    | "intro-graph"
    | "memory-graph"
    | "invoke-flow"
    | "ingestion-flow"
    | "graft-flow"
    | "lifecycle-flow";
};

export type DocPage = {
  title: string;
  description: string;
  eyebrow: string;
  slug: string;
  sections: DocSection[];
};

export type DocNavGroup = {
  title: string;
  items: Array<{
    href: string;
    label: string;
  }>;
};
