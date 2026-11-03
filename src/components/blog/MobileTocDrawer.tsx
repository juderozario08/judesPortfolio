import { TocNavList, type TocGroup } from './TocNavList';

interface MobileTocDrawerProps {
  hasToc: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  groupedToc: TocGroup[];
  activeSectionId: string;
  onScrollToSection: (id: string) => void;
}

/** "Contents" button + slide-in panel for screens too narrow for the sidebar. */
export const MobileTocDrawer = ({
  hasToc,
  isOpen,
  setIsOpen,
  groupedToc,
  activeSectionId,
  onScrollToSection,
}: MobileTocDrawerProps) => {
  if (!hasToc) return null;

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-5 z-40 px-4 py-2 rounded-md bg-tokyo-surface border border-tokyo-border text-sm text-tokyo-fg hover:border-tokyo-purple transition-colors"
      >
        Contents
      </button>

      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 z-50" />
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-tokyo-base border-r border-tokyo-border p-5 z-50 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-tokyo-fg">Contents</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-tokyo-muted hover:text-tokyo-fg"
                aria-label="Close contents"
              >
                Close
              </button>
            </div>
            <nav className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
              <TocNavList
                groupedToc={groupedToc}
                activeSectionId={activeSectionId}
                onScrollTo={(id) => {
                  onScrollToSection(id);
                  setIsOpen(false);
                }}
              />
            </nav>
          </div>
        </>
      )}
    </div>
  );
};
