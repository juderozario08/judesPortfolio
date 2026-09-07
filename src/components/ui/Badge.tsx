import React from 'react';

export type BadgeVariant = 'cyan' | 'purple' | 'muted' | 'emerald' | 'amber';

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  cyan: 'text-tokyo-cyan bg-tokyo-cyan/10 border-tokyo-cyan/25',
  purple: 'text-tokyo-purple bg-tokyo-purple/10 border-tokyo-purple/20',
  muted: 'text-tokyo-muted bg-tokyo-base border-tokyo-surface',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  amber: 'text-[#ffbd2e] bg-[#ffbd2e]/10 border-[#ffbd2e]/20',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  onClick?: () => void;
}

export const Badge = ({
  children,
  variant = 'cyan',
  className = '',
  onClick,
}: BadgeProps) => {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border transition-colors ${
        VARIANT_STYLES[variant]
      } ${className}`}
    >
      {children}
    </span>
  );
};
