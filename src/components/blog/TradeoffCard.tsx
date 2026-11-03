interface TradeoffProps {
  tradeoff: {
    choice: string;
    alternatives: string[];
    why: string;
    tradeoff: string;
  };
}

export const TradeoffCard = ({ tradeoff }: TradeoffProps) => (
  <aside className="relative my-6 rounded-lg border border-tokyo-border bg-tokyo-surface p-5 overflow-hidden">
    <span className="absolute inset-x-0 top-0 h-0.5 bg-tokyo-purple glow-purple" aria-hidden />
    <dl className="space-y-3 leading-relaxed">
      <div>
        <dt className="text-xs text-tokyo-comment mb-0.5">Decision</dt>
        <dd className="text-tokyo-purple font-medium">{tradeoff.choice}</dd>
      </div>
      <div>
        <dt className="text-xs text-tokyo-comment mb-0.5">Alternatives considered</dt>
        <dd className="text-tokyo-muted">{tradeoff.alternatives.join(', ')}</dd>
      </div>
      <div>
        <dt className="text-xs text-tokyo-comment mb-0.5">Why</dt>
        <dd className="text-tokyo-muted">{tradeoff.why}</dd>
      </div>
      <div>
        <dt className="text-xs text-tokyo-comment mb-0.5">What it cost</dt>
        <dd className="text-tokyo-muted">{tradeoff.tradeoff}</dd>
      </div>
    </dl>
  </aside>
);
