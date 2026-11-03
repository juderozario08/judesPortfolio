import { useState } from 'react';
import { BlogTopBar } from './BlogTopBar';

interface BlogPostHeaderProps {
  readProgress: number;
  wide?: boolean;
  onNavigateHome: (targetSection?: string) => void;
  onNavigateBlogIndex: () => void;
}

export const BlogPostHeader = ({ readProgress, wide, onNavigateHome, onNavigateBlogIndex }: BlogPostHeaderProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BlogTopBar
      onNavigateHome={onNavigateHome}
      onNavigateBlogIndex={onNavigateBlogIndex}
      readProgress={readProgress}
      wide={wide}
      right={
        <button onClick={handleCopy} className="text-tokyo-muted hover:text-tokyo-fg transition-colors shrink-0">
          {copied ? 'Copied' : 'Copy link'}
        </button>
      }
    />
  );
};
