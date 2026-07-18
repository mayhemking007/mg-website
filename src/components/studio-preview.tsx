"use client";

import { useEffect, useState } from "react";

const memories = {
  quiet: { label: "Quiet areas", title: "Prefers quiet neighborhoods", version: "v1 · Active", prompt: "User prefers quiet areas when choosing where to stay." },
  kyoto: { label: "Kyoto", title: "Interested in Kyoto", version: "v1 · Active", prompt: "User is interested in Kyoto and prefers quiet areas." },
  budget: { label: "Budget ₹2L", title: "Budget increased to ₹2 lakh", version: "v2 · Updated", prompt: "User prefers quiet areas, is interested in Kyoto, and has a ₹2 lakh budget." },
} as const;
type MemoryKey = keyof typeof memories;
const keys = Object.keys(memories) as MemoryKey[];

export function StudioPreview() {
  const [active, setActive] = useState<MemoryKey>("budget");
  const [interacting, setInteracting] = useState(false);
  useEffect(() => { if (interacting || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const timer = window.setInterval(() => setActive((value) => keys[(keys.indexOf(value) + 1) % keys.length]), 1100); return () => window.clearInterval(timer); }, [interacting]);
  const memory = memories[active];
  return <div className="studio-preview" data-active={active} aria-label="Interactive MemoGrafter Studio memory preview" onMouseLeave={() => setInteracting(false)}>
    <div className="studio-topbar"><span className="flex items-center gap-2 font-medium text-slate-200"><span className="h-2 w-2 rounded-full bg-emerald-300" />Studio</span><span>Session / japan-planning</span></div>
    <div className="studio-layout"><div className="studio-graph graph-grid"><span className="studio-topic">Japan trip</span>{keys.map((key) => <button key={key} type="button" className={`studio-node studio-node-${key}`} data-selected={active === key} onMouseEnter={() => { setActive(key); setInteracting(true); }} onFocus={() => { setActive(key); setInteracting(true); }} onBlur={() => setInteracting(false)}>{memories[key].label}</button>)}<svg aria-hidden="true" viewBox="0 0 400 220"><path className="edge-quiet" d="M195 105 L86 54" /><path className="edge-kyoto" d="M195 105 L304 51" /><path className="edge-budget" d="M195 105 L310 173" /></svg></div>
      <div className="studio-detail" aria-live="polite"><span className="status-badge active">Active</span><p className="studio-label">Memory detail</p><h3>{memory.title}</h3><dl><div><dt>Topic</dt><dd>Japan trip planning</dd></div><div><dt>Version</dt><dd>{memory.version}</dd></div></dl><div className="studio-actions"><button type="button">Supersede</button><button type="button">Forget</button></div></div>
      <div className="studio-prompt"><span>Prompt preview</span><p>{memory.prompt}</p></div></div>
  </div>;
}
