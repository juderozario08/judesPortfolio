import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ListOrdered,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layers,
  FileText,
} from 'lucide-react';
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

export const InlineTableOfContents: React.FC<InlineTableOfContentsProps> = ({
  inlineTocRef,
  totalMilestones,
  publishedCount,
  publishedGroups,
  upcomingGroups,
  onScrollToSection,
}) => {
  const [isCompact, setIsCompact] = useState<boolean>(true);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(false);

  return (
    <div
      ref={inlineTocRef}
      className="rounded-2xl bg-tokyo-surface/60 border border-tokyo-surface p-3.5 sm:p-6 space-y-4 shadow-lg transition-all"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-tokyo-surface/80 pb-3 sm:pb-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-tokyo-purple/10 border border-tokyo-purple/30 text-tokyo-purple shrink-0">
            <ListOrdered size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-tokyo-fg truncate">
                Engineering Roadmap & Table of Contents
              </h3>
              <span className="text-[10px] font-mono text-tokyo-cyan bg-tokyo-cyan/10 px-2 py-0.5 rounded-full border border-tokyo-cyan/20 shrink-0">
                {publishedCount} / {totalMilestones} Parts Published
              </span>
            </div>
            <p className="text-[11px] text-tokyo-muted font-sans mt-0.5 hidden xs:block">
              Click any chapter or sub-topic chip to jump directly to its breakdown.
            </p>
          </div>
        </div>

        {/* View Mode Toggle: Compact vs Detailed */}
        <div className="flex items-center bg-tokyo-base rounded-lg p-0.5 border border-tokyo-surface shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsCompact(true)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
              isCompact
                ? 'bg-tokyo-purple text-white shadow-sm font-semibold'
                : 'text-tokyo-muted hover:text-tokyo-fg'
            }`}
          >
            <Layers size={12} />
            <span>Compact</span>
          </button>
          <button
            type="button"
            onClick={() => setIsCompact(false)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
              !isCompact
                ? 'bg-tokyo-purple text-white shadow-sm font-semibold'
                : 'text-tokyo-muted hover:text-tokyo-fg'
            }`}
          >
            <FileText size={12} />
            <span>Detailed</span>
          </button>
        </div>
      </div>

      {/* COMPACT MATRIX VIEW (Short & Space-Efficient) */}
      {isCompact ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
          {publishedGroups.map((group) => (
            <div
              key={group.main.id}
              className="rounded-xl border border-tokyo-surface/80 bg-tokyo-base/70 p-3 sm:p-3.5 space-y-2 hover:border-tokyo-purple/50 transition-all group flex flex-col justify-between"
            >
              {/* Top Row: Part Badge, Status & Main Jump */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-mono text-[11px] font-bold text-tokyo-purple bg-tokyo-purple/15 px-2 py-0.5 rounded-md border border-tokyo-purple/30 shrink-0">
                    Part {group.main.partNumber}
                  </span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full border text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shrink-0">
                    Live
                  </span>
                  {group.subsections.length > 0 && (
                    <span className="text-[9px] font-mono text-tokyo-muted hidden sm:inline-block truncate">
                      • {group.subsections.length} sub-topics
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onScrollToSection(group.main.id)}
                  className="text-[11px] font-mono text-tokyo-muted group-hover:text-tokyo-cyan transition-colors flex items-center gap-1 shrink-0"
                >
                  <span className="hidden xs:inline">Jump</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* Chapter Title */}
              <button
                type="button"
                onClick={() => onScrollToSection(group.main.id)}
                className="text-left font-sans text-xs sm:text-sm font-semibold text-tokyo-fg group-hover:text-tokyo-cyan transition-colors leading-snug"
              >
                {group.main.title}
              </button>

              {/* Sub-Topics Quick Jump Chips */}
              {group.subsections.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {group.subsections.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => onScrollToSection(sub.id)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-tokyo-surface/70 text-tokyo-muted hover:text-tokyo-cyan hover:bg-tokyo-surface hover:border-tokyo-cyan/40 border border-tokyo-surface/60 transition-colors flex items-center gap-1"
                    >
                      <span className="text-tokyo-cyan/80 font-bold">{sub.partNumber}</span>
                      <span className="truncate max-w-[120px] sm:max-w-[180px]">
                        {sub.title.replace(/^\d+\.\d+\s*/, '')}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* DETAILED ACCORDION VIEW (Long-form Narrative Cards) */
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
                      Jump to chapter <ArrowRight size={12} />
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
      )}

      {/* UPCOMING ROADMAP (Compact Chip Cloud with Collapsible Details) */}
      {upcomingGroups.length > 0 && (
        <div className="pt-3 border-t border-tokyo-surface/80 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowUpcoming(!showUpcoming)}
              className="flex items-center gap-2 text-left hover:text-tokyo-fg transition-colors group"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-tokyo-fg group-hover:text-tokyo-purple transition-colors">
                Upcoming Roadmap ({upcomingGroups.length} Planned Chapters)
              </span>
              <span className="p-0.5 rounded bg-tokyo-base text-tokyo-muted group-hover:text-tokyo-purple border border-tokyo-surface transition-colors">
                {showUpcoming ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </span>
            </button>

            <span className="text-[10px] font-mono text-tokyo-muted">
              {showUpcoming ? 'Click to collapse' : 'Click to preview planned parts'}
            </span>
          </div>

          {/* Quick Chip Cloud (Always visible in compact mode) */}
          {!showUpcoming && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {upcomingGroups.map(({ main: item }) => (
                <div
                  key={item.id}
                  className="px-2 py-1 rounded-md bg-tokyo-base/60 border border-tokyo-surface/60 text-[10px] font-mono text-tokyo-muted flex items-center gap-1.5 opacity-70"
                >
                  <span className="text-tokyo-purple font-bold">P{item.partNumber}</span>
                  <span className="truncate max-w-[150px]">{item.title}</span>
                </div>
              ))}
            </div>
          )}

          {/* Expanded Roadmap Grid */}
          <AnimatePresence>
            {showUpcoming && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1 overflow-hidden"
              >
                {upcomingGroups.map(({ main: item }) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-tokyo-base/40 border border-tokyo-surface/40 opacity-70 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-tokyo-purple">
                        Part {item.partNumber}
                      </span>
                      <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded-full border text-tokyo-muted bg-tokyo-base border-tokyo-surface">
                        Planned
                      </span>
                    </div>
                    <div className="mt-1">
                      <div className="text-xs font-semibold text-tokyo-muted">
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="text-[10px] text-tokyo-muted/70 font-sans mt-0.5 line-clamp-2 leading-relaxed">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
