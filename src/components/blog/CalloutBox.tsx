interface CalloutProps {
  callout: {
    type: 'tip' | 'warning' | 'insight';
    title: string;
    message: string;
  };
}

const STYLE = {
  tip: { bar: 'bg-tokyo-green glow-green', title: 'text-tokyo-green' },
  warning: { bar: 'bg-tokyo-red glow-red', title: 'text-tokyo-red' },
  insight: { bar: 'bg-tokyo-blue glow-blue', title: 'text-tokyo-blue' },
} as const;

export const CalloutBox = ({ callout }: CalloutProps) => (
  <aside className="my-6 flex gap-4 rounded-r-lg bg-tokyo-surface/60 py-3 pr-4">
    <span className={`w-0.5 rounded-full shrink-0 ${STYLE[callout.type].bar}`} aria-hidden />
    <div className="min-w-0">
      <p className={`font-semibold mb-1 ${STYLE[callout.type].title}`}>{callout.title}</p>
      <p className="text-tokyo-muted leading-relaxed">{callout.message}</p>
    </div>
  </aside>
);
