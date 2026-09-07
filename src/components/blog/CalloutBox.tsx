import { AlertTriangle, Lightbulb, Info } from 'lucide-react';

interface CalloutProps {
  callout: {
    type: 'tip' | 'warning' | 'insight';
    title: string;
    message: string;
  };
}

export const CalloutBox = ({ callout }: CalloutProps) => {
  const config = {
    tip: {
      border: 'border-[#27c93f]/30',
      bg: 'bg-[#27c93f]/5',
      icon: <Lightbulb size={18} className="text-[#27c93f] shrink-0" />,
      titleColor: 'text-[#27c93f]'
    },
    warning: {
      border: 'border-[#ff5f56]/30',
      bg: 'bg-[#ff5f56]/5',
      icon: <AlertTriangle size={18} className="text-[#ff5f56] shrink-0" />,
      titleColor: 'text-[#ff5f56]'
    },
    insight: {
      border: 'border-tokyo-cyan/30',
      bg: 'bg-tokyo-cyan/5',
      icon: <Info size={18} className="text-tokyo-cyan shrink-0" />,
      titleColor: 'text-tokyo-cyan'
    }
  }[callout.type];

  return (
    <div className={`my-5 p-3.5 sm:p-4 rounded-xl border ${config.border} ${config.bg} flex items-start gap-2.5 sm:gap-3.5`}>
      <div className="mt-0.5 shrink-0">{config.icon}</div>
      <div className="min-w-0 flex-1">
        <h5 className={`text-[11px] sm:text-xs font-mono uppercase font-bold tracking-wider mb-1 ${config.titleColor} break-words`}>
          {callout.title}
        </h5>
        <p className="text-xs sm:text-sm text-tokyo-fg/90 leading-relaxed font-sans break-words">
          {callout.message}
        </p>
      </div>
    </div>
  );
};
