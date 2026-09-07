import { motion, AnimatePresence } from 'framer-motion';
import { ListOrdered, X } from 'lucide-react';
import { TocNavList, type TocGroup } from './TocNavList';

interface MobileTocDrawerProps {
  hasToc: boolean;
  isDocked: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  groupedToc: TocGroup[];
  activeSectionId: string;
  onScrollToSection: (id: string) => void;
}

export const MobileTocDrawer = ({
  hasToc,
  isDocked,
  isOpen,
  setIsOpen,
  groupedToc,
  activeSectionId,
  onScrollToSection,
}: MobileTocDrawerProps) => {
  if (!hasToc || !isDocked) return null;

  return (
    <div className="2xl:hidden fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-tokyo-surface/95 backdrop-blur-md border border-tokyo-purple/50 shadow-2xl text-[11px] sm:text-xs font-mono font-bold text-tokyo-purple hover:bg-tokyo-purple hover:text-tokyo-base transition-all"
      >
        <ListOrdered size={15} />
        <span>TOC / Milestones</span>
      </motion.button>

      {/* Animated Slide-in Drawer from the LEFT */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 sm:w-80 max-w-[88vw] bg-tokyo-surface/95 backdrop-blur-xl border-r border-tokyo-surface p-4 sm:p-5 shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-tokyo-surface pb-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <ListOrdered size={16} className="text-tokyo-purple" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-tokyo-fg">
                    Roadmap
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-base transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
                <TocNavList
                  groupedToc={groupedToc}
                  activeSectionId={activeSectionId}
                  onScrollTo={(id) => {
                    onScrollToSection(id);
                    setIsOpen(false);
                  }}
                  variant="drawer"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
