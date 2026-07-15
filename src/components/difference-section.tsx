import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function DifferenceSection() {
  return (
    <section id="features" className="difference-section scroll-mt-20">
      <div className="site-section">
        <div className="difference-heading"><p className="eyebrow">The difference</p><h2>Memory is not just stored. It changes.</h2><p>Two updates enter the system. Only one approach knows which fact the agent should trust.</p></div>
        <div className="difference-input"><span>Conversation input</span><code>My budget is ₹1.5 lakh.</code><code>My budget is now ₹2 lakh.</code></div>
        <div className="difference-layout">
          <article className="traditional-side">
            <p className="comparison-kicker">Traditional memory</p>
            <div className="chunk-row"><span>Chunk 01</span><strong>Budget ₹1.5 lakh</strong></div>
            <div className="chunk-row"><span>Chunk 02</span><strong>Budget ₹2 lakh</strong></div>
            <div className="comparison-result warning"><AlertTriangle /><span><b>Two competing facts</b><small>No active version</small></span></div>
          </article>
          <article className="memografter-side">
            <p className="comparison-kicker">MemoGrafter</p>
            <div className="version-comparison old"><span>v1 · Superseded</span><strong>Budget ₹1.5 lakh</strong></div>
            <div className="version-comparison current"><span>v2 · Active</span><strong>Budget ₹2 lakh</strong></div>
            <div className="comparison-result success"><CheckCircle2 /><span><b>Recall returns ₹2 lakh</b><small>History remains inspectable</small></span></div>
          </article>
        </div>
      </div>
    </section>
  );
}
