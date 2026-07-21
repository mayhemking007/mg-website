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
    icon: DocNavIcon;
  }>;
};

export type DocNavIcon =
  | "archive"
  | "binary"
  | "blocks"
  | "book-open"
  | "bot"
  | "box"
  | "braces"
  | "calendar-check"
  | "circle-alert"
  | "combine"
  | "cpu"
  | "database"
  | "download"
  | "eye"
  | "file-plus"
  | "gauge"
  | "gem"
  | "git-branch"
  | "headphones"
  | "history"
  | "key-round"
  | "microscope"
  | "monitor-play"
  | "network"
  | "notebook-pen"
  | "package"
  | "panels"
  | "play"
  | "plug"
  | "radio"
  | "refresh"
  | "scan-text"
  | "scissors"
  | "search"
  | "search-check"
  | "search-code"
  | "settings"
  | "sliders"
  | "sparkles"
  | "split"
  | "square-terminal"
  | "table"
  | "tags"
  | "timer"
  | "trash"
  | "users"
  | "workflow"
  | "wrench"
  | "zap";
