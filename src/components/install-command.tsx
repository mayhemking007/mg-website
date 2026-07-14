"use client";

import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

const command = "npm install memo-grafter";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return <div className="install-command"><Terminal className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" /><code>{command}</code><button type="button" onClick={copy} aria-label={copied ? "Install command copied" : "Copy install command"}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}<span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span></button></div>;
}
