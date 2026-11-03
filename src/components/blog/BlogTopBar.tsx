import { personalInfo } from '../../data/resume';

interface BlogTopBarProps {
  onNavigateHome: (targetSection?: string) => void;
  onNavigateBlogIndex?: () => void;
  right?: React.ReactNode;
  /** 0–100; renders a thin progress line under the bar when provided. */
  readProgress?: number;
  /** Match the wider article + sidebar layout. */
  wide?: boolean;
}

/** Shared top bar for the blog index and individual posts. */
export const BlogTopBar = ({ onNavigateHome, onNavigateBlogIndex, right, readProgress, wide }: BlogTopBarProps) => (
  <header className="sticky top-0 z-40 bg-tokyo-base/95 backdrop-blur border-b border-tokyo-border">
    <div className={`${wide ? 'max-w-6xl 3xl:max-w-[86rem]' : 'max-w-3xl 3xl:max-w-[63rem]'} mx-auto px-6 h-14 flex items-center justify-between gap-4 text-sm`}>
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={() => onNavigateHome('home')}
          className="font-semibold text-tokyo-fg hover:text-tokyo-purple transition-colors shrink-0"
        >
          {personalInfo.name}
        </button>
        <span className="text-tokyo-comment">/</span>
        {onNavigateBlogIndex ? (
          <button onClick={onNavigateBlogIndex} className="text-tokyo-muted hover:text-tokyo-fg transition-colors">
            Blog
          </button>
        ) : (
          <span className="text-tokyo-muted">Blog</span>
        )}
      </div>
      {right}
    </div>
    {readProgress !== undefined && (
      <div className="absolute bottom-0 left-0 h-0.5 bg-tokyo-purple glow-purple" style={{ width: `${readProgress}%` }} />
    )}
  </header>
);
