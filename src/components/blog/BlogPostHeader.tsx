import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Share2 } from 'lucide-react';

interface BlogPostHeaderProps {
  slug: string;
  readProgress: number;
  onNavigateHome: (targetSection?: string) => void;
  onNavigateBlogIndex: () => void;
}

export const BlogPostHeader = ({
  slug,
  readProgress,
  onNavigateHome,
  onNavigateBlogIndex,
}: BlogPostHeaderProps) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-tokyo-base/90 border-b border-tokyo-surface px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onNavigateBlogIndex}
            className="flex items-center gap-1.5 text-xs font-mono text-tokyo-muted hover:text-tokyo-cyan transition-colors"
          >
            <ArrowLeft size={15} />
            <span><span className="hidden xs:inline">All </span>Articles</span>
          </button>
          <span className="text-tokyo-surface text-xs hidden xs:inline">•</span>
          <button
            onClick={() => onNavigateHome('home')}
            className="text-xs font-mono text-tokyo-muted hover:text-tokyo-fg transition-colors hidden sm:inline"
          >
            Portfolio
          </button>
          <span className="text-tokyo-surface text-xs hidden md:inline">•</span>
          <button
            onClick={() => onNavigateHome('projects')}
            className="text-xs font-mono text-tokyo-muted hover:text-tokyo-cyan transition-colors hidden md:inline"
          >
            Projects
          </button>
        </div>

        <div className="text-xs font-mono text-tokyo-muted truncate max-w-xs md:max-w-md opacity-70 hidden md:block">
          user@archlinux:~/blog/{slug}.md
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-mono text-tokyo-muted hover:text-tokyo-purple bg-tokyo-surface/80 hover:bg-tokyo-surface px-2.5 sm:px-3 py-1 rounded-full border border-tokyo-surface transition-colors shrink-0"
          title="Copy direct article URL"
        >
          {copiedLink ? (
            <>
              <Check size={13} className="text-[#27c93f]" />
              <span className="text-[#27c93f]">Copied</span>
            </>
          ) : (
            <>
              <Share2 size={13} />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>
      </div>

      {/* Top Reading Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-tokyo-surface">
        <motion.div
          className="h-full bg-gradient-to-r from-tokyo-purple via-tokyo-cyan to-tokyo-blue"
          style={{ width: `${readProgress}%` }}
        />
      </div>
    </header>
  );
};
