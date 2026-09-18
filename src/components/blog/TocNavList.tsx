import React from 'react';
import { motion } from 'framer-motion';
import type { TableOfContentsItem } from '../../data/blogs';

export interface TocGroup {
  main: TableOfContentsItem;
  subsections: TableOfContentsItem[];
}

interface TocNavListProps {
  groupedToc: TocGroup[];
  activeSectionId: string;
  onScrollTo: (id: string) => void;
  variant?: 'sidebar' | 'drawer';
}

export const TocNavList: React.FC<TocNavListProps> = ({
  groupedToc,
  activeSectionId,
  onScrollTo,
  variant = 'sidebar',
}) => {
  return (
    <div className={variant === 'drawer' ? 'space-y-2.5' : 'space-y-1'}>
      {groupedToc.map((group) => {
        const isMainPublished = group.main.status === 'published';
        const isMainActive = activeSectionId === group.main.id;

        if (variant === 'drawer') {
          return (
            <div key={group.main.id} className="space-y-1">
              {/* Main Header Item */}
              <button
                onClick={() => isMainPublished && onScrollTo(group.main.id)}
                disabled={!isMainPublished}
                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                  !isMainPublished
                    ? 'opacity-40 cursor-default bg-tokyo-base/20 border border-tokyo-surface/30'
                    : isMainActive
                    ? 'bg-tokyo-purple/20 text-tokyo-cyan border border-tokyo-purple/50 font-semibold'
                    : 'text-tokyo-fg hover:bg-tokyo-base/80 bg-tokyo-base/50 border border-tokyo-surface/70'
                }`}
              >
                <div className="flex flex-col items-center gap-0.5 shrink-0 mt-0.5">
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-tokyo-purple text-tokyo-base">
                    P{group.main.partNumber}
                  </span>
                  <span className="text-[7px] font-mono uppercase font-bold text-tokyo-purple">
                    MAIN
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold leading-snug line-clamp-2 break-words">
                    {group.main.title}
                  </span>
                </div>
              </button>

              {/* Subsections indented underneath */}
              {group.subsections.length > 0 && (
                <div className="ml-3 pl-2.5 border-l-2 border-tokyo-purple/30 space-y-1 my-1">
                  {group.subsections.map((sub) => {
                    const isSubPublished = sub.status === 'published';
                    const isSubActive = activeSectionId === sub.id;

                    return (
                      <button
                        key={sub.id}
                        onClick={() => isSubPublished && onScrollTo(sub.id)}
                        disabled={!isSubPublished}
                        className={`w-full text-left p-2 rounded-lg transition-all flex items-start gap-2 ${
                          !isSubPublished
                            ? 'opacity-40 cursor-default'
                            : isSubActive
                            ? 'bg-tokyo-cyan/20 text-tokyo-cyan border border-tokyo-cyan/40 font-medium'
                            : 'text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-base/60'
                        }`}
                      >
                        <span className="text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-tokyo-base text-tokyo-cyan border border-tokyo-cyan/30 shrink-0 mt-0.5">
                          {sub.partNumber}
                        </span>
                        <span className="text-[11px] leading-snug line-clamp-2 break-words">
                          {sub.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        // Default 'sidebar' variant
        return (
          <div key={group.main.id} className="space-y-0.5">
            {/* Main Chapter Item */}
            <div className="relative">
              {isMainActive && isMainPublished && (
                <motion.div
                  layoutId="activeDockedPill"
                  className="absolute inset-0 rounded-xl bg-tokyo-purple/15 border border-tokyo-purple/50  pointer-events-none"
                  transition={{
                    type: 'tween',
                    ease: [0.16, 1, 0.3, 1],
                    duration: 0.12,
                  }}
                />
              )}

              <button
                onClick={() => isMainPublished && onScrollTo(group.main.id)}
                disabled={!isMainPublished}
                className={`relative z-10 w-full text-left p-2 rounded-xl transition-colors duration-100 flex items-start gap-2 ${
                  !isMainPublished
                    ? 'opacity-35 cursor-default'
                    : isMainActive
                    ? 'text-tokyo-fg font-semibold'
                    : 'text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-base/60 cursor-pointer'
                }`}
              >
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 transition-colors duration-100 ${
                    isMainActive
                      ? 'bg-tokyo-purple text-tokyo-base shadow-sm'
                      : isMainPublished
                      ? 'bg-tokyo-base text-tokyo-purple border border-tokyo-surface'
                      : 'bg-tokyo-base/50 text-tokyo-muted border border-tokyo-surface/40'
                  }`}
                >
                  P{group.main.partNumber}
                </span>

                <div className="flex-1 min-w-0">
                  <span
                    className={`text-xs line-clamp-2 leading-snug transition-colors duration-100 font-medium ${
                      isMainActive ? 'text-tokyo-cyan font-bold' : ''
                    }`}
                  >
                    {group.main.title}
                  </span>
                </div>
              </button>
            </div>

            {/* Subsections indented underneath */}
            {group.subsections.length > 0 && (
              <div className="ml-2.5 pl-2 border-l border-tokyo-surface/80 space-y-0.5 my-0.5">
                {group.subsections.map((sub) => {
                  const isSubPublished = sub.status === 'published';
                  const isSubActive = activeSectionId === sub.id;

                  return (
                    <div key={sub.id} className="relative">
                      {isSubActive && isSubPublished && (
                        <motion.div
                          layoutId="activeDockedSubPill"
                          className="absolute inset-0 rounded-lg bg-tokyo-cyan/15 border border-tokyo-cyan/50  pointer-events-none"
                          transition={{
                            type: 'tween',
                            ease: [0.16, 1, 0.3, 1],
                            duration: 0.12,
                          }}
                        />
                      )}

                      <button
                        onClick={() => isSubPublished && onScrollTo(sub.id)}
                        disabled={!isSubPublished}
                        className={`relative z-10 w-full text-left px-2 py-1.5 rounded-lg transition-colors duration-100 flex items-start gap-1.5 ${
                          !isSubPublished
                            ? 'opacity-35 cursor-default'
                            : isSubActive
                            ? 'text-tokyo-fg font-medium'
                            : 'text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-base/60 cursor-pointer'
                        }`}
                      >
                        <span
                          className={`text-[8px] font-mono font-bold px-1 py-0.5 rounded shrink-0 mt-0.5 transition-colors duration-100 ${
                            isSubActive
                              ? 'bg-tokyo-cyan text-tokyo-base shadow-sm'
                              : isSubPublished
                              ? 'bg-tokyo-base text-tokyo-cyan border border-tokyo-surface'
                              : 'bg-tokyo-base/50 text-tokyo-muted'
                          }`}
                        >
                          {sub.partNumber}
                        </span>

                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-[11px] line-clamp-2 leading-snug transition-colors duration-100 ${
                              isSubActive ? 'text-tokyo-cyan font-semibold' : ''
                            }`}
                          >
                            {sub.title}
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
