import { GitCompare, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface TradeoffProps {
  tradeoff: {
    choice: string;
    alternatives: string[];
    why: string;
    tradeoff: string;
  };
}

export const TradeoffCard = ({ tradeoff }: TradeoffProps) => {
  return (
    <div className="my-6 rounded-xl border border-tokyo-purple/30 bg-tokyo-surface/90 p-4 sm:p-5 md:p-6 shadow-sm relative overflow-hidden">
      {/* Decorative Accent Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-tokyo-purple/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-tokyo-surface">
        <GitCompare size={16} className="text-tokyo-purple shrink-0" />
        <h4 className="text-[11px] sm:text-xs uppercase font-mono font-bold tracking-wider sm:tracking-widest text-tokyo-purple truncate">
          Technical Decision & Tradeoff Analysis
        </h4>
      </div>

      <div className="space-y-4">
        {/* Selected Architecture */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <CheckCircle2 size={16} className="text-[#27c93f] mt-1 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-tokyo-muted mb-0.5">Selected Approach</div>
            <div className="text-sm sm:text-base font-semibold text-tokyo-fg font-mono break-words">{tradeoff.choice}</div>
          </div>
        </div>

        {/* Alternatives Considered */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <HelpCircle size={16} className="text-tokyo-blue mt-1 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-tokyo-muted mb-1">Alternatives Evaluated</div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tradeoff.alternatives.map((alt, i) => (
                <span
                  key={i}
                  className="text-[11px] sm:text-xs font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-tokyo-base text-tokyo-muted border border-tokyo-surface"
                >
                  {alt}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* The Why and The Tradeoff in 2-column or stacked grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-1">
          <div className="p-3 sm:p-3.5 rounded-lg bg-tokyo-base/70 border border-tokyo-cyan/20">
            <div className="text-[11px] sm:text-xs font-mono font-bold text-tokyo-cyan mb-1 flex items-center gap-1.5">
              <span>🎯</span> Why I Made This Call
            </div>
            <p className="text-xs sm:text-sm text-tokyo-fg/90 leading-relaxed font-sans break-words">
              {tradeoff.why}
            </p>
          </div>

          <div className="p-3 sm:p-3.5 rounded-lg bg-tokyo-base/70 border border-[#ffbd2e]/20">
            <div className="text-[11px] sm:text-xs font-mono font-bold text-[#ffbd2e] mb-1.5 flex items-center gap-1.5">
              <AlertCircle size={14} /> The Tradeoff / Cost Paid
            </div>
            <p className="text-xs md:text-sm text-tokyo-fg/90 leading-relaxed font-sans break-words">
              {tradeoff.tradeoff}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
