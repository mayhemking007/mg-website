import { ConversationPipelineVisual } from "@/components/conversation-pipeline-visual";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-section scroll-mt-20">
      <div className="how-section-inner">
        <div className="how-copy" data-reveal>
          <p className="eyebrow">How it works</p>
          <h2>From conversation to useful context</h2>
          <p className="how-intro">A focused pipeline turns raw dialogue into structured memory that can evolve without losing its history.</p>
        </div>
        <div data-reveal data-reveal-delay="1"><ConversationPipelineVisual /></div>
      </div>
    </section>
  );
}
