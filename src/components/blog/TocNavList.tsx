import type { TableOfContentsItem } from '../../data/blogs';

export interface TocGroup {
  main: TableOfContentsItem;
  subsections: TableOfContentsItem[];
}

interface TocNavListProps {
  groupedToc: TocGroup[];
  activeSectionId: string;
  onScrollTo: (id: string) => void;
}

const itemClass = (active: boolean) =>
  `w-full text-left py-1 pl-3 -ml-px border-l transition-colors ${
    active
      ? 'border-tokyo-purple text-tokyo-purple text-glow-purple [border-left-width:2px]'
      : 'border-transparent text-tokyo-muted hover:text-tokyo-fg'
  }`;

/** Compact list of published sections, used by the desktop sidebar and the mobile drawer. */
export const TocNavList = ({ groupedToc, activeSectionId, onScrollTo }: TocNavListProps) => (
  <ol className="border-l border-tokyo-border text-sm leading-snug space-y-1">
    {groupedToc
      .filter((group) => group.main.status === 'published')
      .map((group) => (
        <li key={group.main.id}>
          <button onClick={() => onScrollTo(group.main.id)} className={itemClass(activeSectionId === group.main.id)}>
            {group.main.partNumber}. {group.main.title}
          </button>
          {group.subsections.length > 0 && (
            <ol className="space-y-0.5">
              {group.subsections
                .filter((sub) => sub.status === 'published')
                .map((sub) => (
                  <li key={sub.id}>
                    <button
                      onClick={() => onScrollTo(sub.id)}
                      className={`${itemClass(activeSectionId === sub.id)} pl-6 text-[13px]`}
                    >
                      {sub.partNumber} {sub.title}
                    </button>
                  </li>
                ))}
            </ol>
          )}
        </li>
      ))}
  </ol>
);
