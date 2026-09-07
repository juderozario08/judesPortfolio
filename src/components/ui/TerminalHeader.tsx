import React from 'react';

interface TerminalHeaderProps {
  title?: string;
  centerTitle?: boolean;
  children?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}

export const TerminalHeader = ({
  title = 'user@archlinux:~',
  centerTitle = true,
  children,
  rightSlot,
  className = '',
}: TerminalHeaderProps) => {
  return (
    <div
      className={`bg-tokyo-base/80 border-b border-tokyo-base flex items-center justify-between px-3 sm:px-4 py-2 relative z-10 ${className}`}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
        </div>
        {children}
      </div>

      {centerTitle && title && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-tokyo-muted text-xs font-mono opacity-50 px-16 truncate">
          {title}
        </div>
      )}

      {rightSlot && (
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
          {rightSlot}
        </div>
      )}
    </div>
  );
};
