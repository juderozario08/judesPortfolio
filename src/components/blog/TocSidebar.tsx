import { TocNavList, type TocGroup } from './TocNavList';

interface TocSidebarProps {
  groupedToc: TocGroup[];
  upcomingGroups: TocGroup[];
  activeSectionId: string;
  onScrollToSection: (id: string) => void;
  onScrollToTop: () => void;
}

/** Contents column on the left of the article (lg and up). Stays in view while reading. */
export const TocSidebar = ({
  groupedToc,
  upcomingGroups,
  activeSectionId,
  onScrollToSection,
  onScrollToTop,
}: TocSidebarProps) => (
  <aside aria-label="Contents" className="hidden lg:block sticky top-24 self-start">
    <p className="text-sm font-semibold text-tokyo-fg mb-3">Contents</p>
    <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 custom-scrollbar">
      <TocNavList groupedToc={groupedToc} activeSectionId={activeSectionId} onScrollTo={onScrollToSection} />

      {upcomingGroups.length > 0 && (
        <details className="mt-5 text-sm">
          <summary className="cursor-pointer text-tokyo-comment hover:text-tokyo-fg">
            Coming later ({upcomingGroups.length})
          </summary>
          <ol className="mt-2 space-y-1.5 text-tokyo-comment leading-snug">
            {upcomingGroups.map(({ main }) => (
              <li key={main.id}>
                {main.partNumber}. {main.title}
              </li>
            ))}
          </ol>
        </details>
      )}
    </nav>
    <button onClick={onScrollToTop} className="mt-4 text-sm text-tokyo-comment hover:text-tokyo-fg transition-colors">
      ↑ Back to top
    </button>
  </aside>
);
