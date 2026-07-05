import { createHighlighter, type BundledLanguage } from "shiki";

const supportedLanguages = [
  "bash",
  "dotenv",
  "javascript",
  "json",
  "typescript",
] satisfies BundledLanguage[];

type CodeLanguage = BundledLanguage | "plain";

const highlighterPromise = createHighlighter({
  langs: supportedLanguages,
  themes: ["github-dark-default"],
});

export function inferCodeLanguage(label: string, language?: string): CodeLanguage {
  const normalized = (language ?? label).toLowerCase();

  if (normalized === "terminal" || normalized.endsWith(".sh") || normalized.includes("bash")) {
    return "bash";
  }

  if (normalized === ".env" || normalized.endsWith(".env") || normalized.includes("dotenv")) {
    return "dotenv";
  }

  if (normalized.endsWith(".ts") || normalized.endsWith(".tsx") || normalized.includes("typescript")) {
    return "typescript";
  }

  if (normalized.endsWith(".js") || normalized.endsWith(".jsx") || normalized.includes("javascript")) {
    return "javascript";
  }

  if (normalized.endsWith(".json")) {
    return "json";
  }

  return "plain";
}

export async function highlightCode(code: string, language: CodeLanguage) {
  if (language === "plain") {
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }

  const highlighter = await highlighterPromise;

  return highlighter.codeToHtml(code, {
    lang: language,
    theme: "github-dark-default",
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
