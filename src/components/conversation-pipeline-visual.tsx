"use client";

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ConversationPipelineVisual() {
  const [phase, setPhase] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      if (media.matches) setPhase(8);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setPhase((current) => (current >= 8 ? 1 : current + 1)), phase >= 8 ? 2800 : 1350);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  const selectedStage = phase < 3 ? 0 : phase < 5 ? 1 : phase < 8 ? 2 : 3;

  return (
    <div className="pipeline-experience">
      <figure className="horizontal-pipeline" data-phase={phase} aria-label="A user first sets a ₹1.5 lakh budget, later updates it to ₹2 lakh, MemoGrafter versions the fact, preserves the older value, and recalls only the current budget.">
        <PipelineBox stage="conversation" number="01" title="Conversation" active={selectedStage === 0}>
          <Message> I prefer <mark>quiet areas</mark> in <mark>Kyoto</mark>.</Message>
          <Message>My budget is <mark>₹1.5 lakh</mark>.</Message>
          <Message update>Actually, my budget is now <mark>₹2 lakh</mark>.</Message>
        </PipelineBox>

        <AnimatedConnector label="structure" active={phase >= 2} />

        <PipelineBox stage="extract" number="02" title="Extract" active={selectedStage === 1}>
          <dl className="extract-values"><div><dt>Destination</dt><dd>Kyoto</dd></div><div><dt>Preference</dt><dd>Quiet areas</dd></div><div className="budget-field"><dt>Budget</dt><dd>₹1.5 lakh</dd></div></dl>
          <p className="processing-label">Processing updated budget…</p>
        </PipelineBox>

        <AnimatedConnector label="update" active={phase >= 5} />

        <PipelineBox stage="evolve" number="03" title="Evolve" active={selectedStage === 2}>
          <div className="incoming-update"><span>Incoming update</span><p>Actually, my budget is now ₹2 lakh.</p><small>Matches existing budget fact</small></div>
          <div className="version-change old"><span>−</span><p>Budget: ₹1.5 lakh</p><b>v1 · Superseded</b></div>
          <div className="version-change new"><span>+</span><p>Budget: ₹2 lakh</p><b>v2 · Active</b></div>
          <p className="evolve-explanation">The new message updates the existing budget memory while preserving the previous version.</p>
        </PipelineBox>

        <AnimatedConnector label="retrieve" active={phase >= 7} />

        <PipelineBox stage="recall" number="04" title="Recall" active={selectedStage === 3}>
          <p className="recall-pipeline-prompt">Plan a quiet Kyoto trip within my current budget.</p>
          <div className="selected-context"><span>Selected agent context</span><p><Check />Destination: Kyoto</p><p><Check />Preference: Quiet areas</p><p><Check />Budget: ₹2 lakh</p></div>
          <p className="excluded-context"><X />Favourite language: TypeScript <b>Excluded</b></p>
        </PipelineBox>
      </figure>
    </div>
  );
}

function PipelineBox({ stage, number, title, active, children }: { stage: string; number: string; title: string; active: boolean; children: React.ReactNode }) {
  return <article className={`pipeline-box pipeline-${stage}`} data-active={active}><header><span>{number}</span><h3>{title}</h3></header><div className="pipeline-box-content">{children}</div></article>;
}

function Message({ update = false, children }: { update?: boolean; children: React.ReactNode }) {
  return <p className={update ? "conversation-row update-message" : "conversation-row"}>{children}</p>;
}

function AnimatedConnector({ label, active }: { label: string; active: boolean }) {
  return <div className="animated-connector" data-active={active} aria-hidden="true"><span>{label}</span><svg viewBox="0 0 72 20" preserveAspectRatio="none"><defs><marker id={`arrow-${label}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" /></marker></defs><path className="connector-base" d="M1 10H68" markerEnd={`url(#arrow-${label})`} /><path className="connector-active" d="M1 10H68" /></svg></div>;
}
