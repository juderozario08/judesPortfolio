import { motion, AnimatePresence } from 'framer-motion';
import { ListOrdered, ChevronUp } from 'lucide-react';
import { TocNavList, type TocGroup } from './TocNavList';

interface DockedSidebarProps {
  isDocked: boolean;
  hasToc: boolean;
  publishedCount: number;
  totalCount: number;
  readProgress: number;
  groupedToc: TocGroup[];
  activeSectionId: string;
  onScrollToSection: (id: string) => void;
  onScrollToTop: () => void;
}

export const DockedSidebar = ({
  isDocked,
  hasToc,
  publishedCount,
  totalCount,
  readProgress,
  groupedToc,
  activeSectionId,
  onScrollToSection,
  onScrollToTop,
}: DockedSidebarProps) => {
  return (
    <AnimatePresence>
      {hasToc && isDocked && (
        <motion.aside
          key="docked-toc"
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="hidden 2xl:block fixed top-24 left-[max(1.5rem,calc(50vw-448px-19.5rem))] w-72 z-30 pointer-events-auto"
          aria-label="Table of contents side navigation"
        >
          <div className="rounded-2xl bg-tokyo-surface/90 backdrop-blur-xl border border-tokyo-surface/90  p-4 space-y-3 max-h-[calc(100vh-7.5rem)] flex flex-col">
            {/* Header */}
            <div className="border-b border-tokyo-surface/80 pb-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListOrdered size={15} className="text-tokyo-purple" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-tokyo-fg">
                    Roadmap
                  </span>
                </div>
                <span className="text-[10px] font-mono text-tokyo-cyan bg-tokyo-cyan/10 px-2 py-0.5 rounded border border-tokyo-cyan/20">
                  {publishedCount} / {totalCount} Parts
                </span>
              </div>

              {/* Mini Reading Progress */}
              <div className="mt-2.5 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-tokyo-muted">
                  <span>Reading Progress</span>
                  <span className="text-tokyo-purple font-bold">{Math.round(readProgress)}%</span>
                </div>
                <div className="w-full bg-tokyo-base rounded-full h-1 overflow-hidden border border-tokyo-surface">
                  <div
                    className="bg-gradient-to-r from-tokyo-purple to-tokyo-cyan h-full rounded-full transition-all duration-150"
                    style={{ width: `${readProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Scrollable Milestone Navigation */}
            <nav className="space-y-1 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              <TocNavList
                groupedToc={groupedToc}
                activeSectionId={activeSectionId}
                onScrollTo={onScrollToSection}
                variant="sidebar"
              />
            </nav>

            {/* Sidebar Footer */}
            <div className="pt-2 border-t border-tokyo-surface/80 flex items-center justify-between text-[10px] font-mono text-tokyo-muted">
              <button
                onClick={onScrollToTop}
                className="hover:text-tokyo-cyan transition-colors flex items-center gap-1"
              >
                <ChevronUp size={12} />
                <span>Top of Article</span>
              </button>
              <span className="text-tokyo-purple font-semibold">Radius Series</span>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
