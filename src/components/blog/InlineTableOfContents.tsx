import React from 'react';
import { motion } from 'framer-motion';
import { ListOrdered, ArrowRight } from 'lucide-react';
import type { TableOfContentsItem } from '../../data/blogs';
import type { TocGroup } from './TocNavList';

interface InlineTableOfContentsProps {
  inlineTocRef: React.RefObject<HTMLDivElement | null>;
  totalMilestones: number;
  publishedCount: number;
  publishedGroups: TocGroup[];
  upcomingGroups: TocGroup[];
  onScrollToSection: (id: string) => void;
}

export const InlineTableOfContents = ({
  inlineTocRef,
  totalMilestones,
  publishedCount,
  publishedGroups,
  upcomingGroups,
  onScrollToSection,
}: InlineTableOfContentsProps) => {
  return (
    <div
      ref={inlineTocRef}
      className="rounded-2xl bg-tokyo-surface/60 border border-tokyo-surface p-3.5 sm:p-7 space-y-4 sm:space-y-5 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-tokyo-surface/80 pb-3 sm:pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 sm:p-2 rounded-xl bg-tokyo-purple/10 border border-tokyo-purple/30 text-tokyo-purple shrink-0">
            <ListOrdered size={16} className="sm:w-[18px] sm:h-[18px]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-base font-bold font-mono uppercase tracking-wider text-tokyo-fg">
              Engineering Roadmap & Table of Contents
            </h3>
            <p className="text-[11px] sm:text-xs text-tokyo-muted font-sans mt-0.5 hidden xs:block">
              Click any milestone to jump to its breakdown, or scroll down to follow the journey.
            </p>
          </div>
        </div>

        <span className="text-[10px] sm:text-[11px] font-mono text-tokyo-cyan bg-tokyo-cyan/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-tokyo-cyan/20 w-fit shrink-0">
          {publishedCount} / {totalMilestones} Milestones Published
        </span>
      </div>

      {/* Published Chapters */}
      <div className="space-y-4 pt-1">
        {publishedGroups.map((group) => (
          <div
            key={group.main.id}
            className="rounded-xl border border-tokyo-surface/90 bg-tokyo-base/60 p-3.5 sm:p-5 space-y-3.5 shadow-sm hover:border-tokyo-purple/50 transition-all"
          >
            {/* Main Chapter Header Card */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              onClick={() => onScrollToSection(group.main.id)}
              className="p-3 sm:p-4 rounded-xl bg-tokyo-surface/60 border border-tokyo-purple/30 hover:border-tokyo-purple/70 hover:bg-tokyo-surface/90 transition-all cursor-pointer group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-tokyo-purple bg-tokyo-purple/15 px-2 py-0.5 rounded-full border border-tokyo-purple/30">
                    Part {group.main.partNumber}
                  </span>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-tokyo-purple/90 bg-tokyo-purple/10 px-2 py-0.5 rounded border border-tokyo-purple/20">
                    Main Header
                  </span>
                  {group.subsections.length > 0 && (
                    <span className="text-[10px] font-mono text-tokyo-cyan bg-tokyo-cyan/10 px-2 py-0.5 rounded border border-tokyo-cyan/20">
                      {group.subsections.length} Sub-topics
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                    Published
                  </span>
                  <span className="text-[11px] font-mono text-tokyo-muted group-hover:text-tokyo-cyan transition-colors hidden sm:flex items-center gap-1">
                    Jump to chapter overview <ArrowRight size={12} />
                  </span>
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-bold font-sans text-tokyo-fg group-hover:text-tokyo-cyan transition-colors">
                {group.main.title}
              </h4>

              {group.main.description && (
                <p className="text-xs sm:text-sm text-tokyo-muted font-sans mt-1.5 leading-relaxed">
                  {group.main.description}
                </p>
              )}
            </motion.div>

            {/* Nested Subheaders Grid */}
            {group.subsections.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2.5 px-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-tokyo-cyan">
                    Subheaders in Part {group.main.partNumber}:
                  </span>
                  <div className="h-px bg-tokyo-surface/80 flex-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {group.subsections.map((sub: TableOfContentsItem) => (
                    <motion.div
                      key={sub.id}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => onScrollToSection(sub.id)}
                      className="p-3 sm:p-3.5 rounded-xl border border-tokyo-surface/70 bg-tokyo-surface/30 hover:bg-tokyo-surface/80 hover:border-tokyo-cyan/50 transition-all cursor-pointer flex flex-col justify-between group/sub shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-tokyo-cyan bg-tokyo-cyan/10 px-2 py-0.5 rounded border border-tokyo-cyan/25">
                          Subheader {sub.partNumber}
                        </span>
                        <span className="text-[10px] font-mono text-tokyo-muted group-hover/sub:text-tokyo-cyan transition-colors flex items-center gap-1">
                          <span>Read</span>
                          <ArrowRight size={10} />
                        </span>
                      </div>

                      <div className="mt-2">
                        <div className="text-xs sm:text-sm font-semibold font-sans text-tokyo-fg group-hover/sub:text-tokyo-cyan transition-colors">
                          {sub.title}
                        </div>
                        {sub.description && (
                          <p className="text-[11px] text-tokyo-muted font-sans mt-1 line-clamp-2 leading-relaxed">
                            {sub.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Upcoming Roadmap Chapters */}
      {upcomingGroups.length > 0 && (
        <div className="pt-3 border-t border-tokyo-surface/80 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-tokyo-fg">
                Upcoming Roadmap Chapters
              </span>
              <span className="text-[10px] font-mono text-tokyo-muted bg-tokyo-base px-2 py-0.5 rounded border border-tokyo-surface">
                {upcomingGroups.length} Planned
              </span>
            </div>
            <span className="text-[10px] font-mono text-tokyo-muted">
              Future releases in the Radius series
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {upcomingGroups.map(({ main: item }) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-tokyo-base/40 border border-tokyo-surface/40 opacity-60 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-tokyo-purple">
                    Part {item.partNumber}
                  </span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full border text-tokyo-muted bg-tokyo-base border-tokyo-surface">
                    Upcoming
                  </span>
                </div>
                <div className="mt-1.5">
                  <div className="text-xs font-semibold text-tokyo-muted">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-[10px] text-tokyo-muted/80 font-sans mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
