export function MemoryLifecycleVisual() {
  return (
    <figure className="memory-visual graph-grid" aria-labelledby="memory-visual-title">
      <figcaption id="memory-visual-title" className="sr-only">Animated graph showing a conversation becoming structured memory, an older budget being superseded, and relevant memories entering agent context.</figcaption>
      <div className="visual-toolbar"><span className="flex items-center gap-2"><span className="visual-live-dot" />Memory lifecycle</span><span>Session 04</span></div>
      <div className="incoming-message"><span>New message</span><p>“Actually, my budget is now ₹2 lakh.”</p></div>
      <svg className="memory-edges" aria-hidden="true" viewBox="0 0 680 500" preserveAspectRatio="none"><defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6Z" /></marker></defs><path className="edge edge-1" d="M200 245 C270 245 270 150 350 150" /><path className="edge edge-2" d="M200 245 C275 245 275 245 350 245" /><path className="edge edge-muted" d="M200 245 C275 245 275 340 350 340" /><path className="edge edge-updated" d="M200 245 C300 245 325 410 445 410" /><path className="edge edge-context" markerEnd="url(#arrow)" d="M480 170 C565 180 540 255 605 265" /><path className="edge edge-context edge-context-2" markerEnd="url(#arrow)" d="M480 410 C565 395 540 320 605 310" /></svg>
      <button className="memory-card topic-card" type="button"><span className="card-kind">TOPIC</span><strong>Japan trip planning</strong><small>4 connected memories</small></button>
      <button className="memory-card memory-quiet" type="button"><span className="status-badge active">Active</span><strong>Prefers quiet areas</strong><small>Preference</small></button>
      <button className="memory-card memory-kyoto" type="button"><span className="status-badge active">Active</span><strong>Interested in Kyoto</strong><small>Interest</small></button>
      <button className="memory-card memory-old" type="button"><span className="status-badge superseded">Superseded</span><strong>Budget under ₹1.5 lakh</strong><small>Version 1</small></button>
      <button className="memory-card memory-new" type="button"><span className="status-badge updated">Updated</span><strong>Budget increased to ₹2 lakh</strong><small>Version 2</small></button>
      <div className="retrieval-pulse" aria-hidden="true"><span />Recall</div>
      <div className="agent-context"><span className="card-kind">AGENT CONTEXT</span><p>Prefers quiet areas</p><p>Interested in Kyoto</p><p>Budget: ₹2 lakh</p></div>
      <p className="visual-prompt"><span>Prompt</span> “Plan a calm 7-day Japan trip.”</p>
    </figure>
  );
}
