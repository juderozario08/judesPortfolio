import { Calendar, Clock, Terminal } from 'lucide-react';
import type { BlogPost } from '../../data/blogs';
import { Badge } from '../ui/Badge';

interface BlogPostHeroProps {
  post: BlogPost;
}

export const BlogPostHero = ({ post }: BlogPostHeroProps) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Project Tag & Meta */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono text-tokyo-muted pb-3 sm:pb-4 border-b border-tokyo-surface">
          <span className="text-tokyo-purple font-bold flex items-center gap-2">
            <Terminal size={14} />
            {post.projectTitle}
          </span>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 bg-tokyo-base px-2 sm:px-2.5 py-1 rounded-full border border-tokyo-surface text-tokyo-cyan">
              <Calendar size={12} className="sm:w-[13px] sm:h-[13px]" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 bg-tokyo-base px-2 sm:px-2.5 py-1 rounded-full border border-tokyo-surface text-tokyo-purple">
              <Clock size={12} className="sm:w-[13px] sm:h-[13px]" /> {post.readTime}
            </span>
          </div>
        </div>

        <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold font-sans text-tokyo-fg tracking-tight leading-tight pt-1 sm:pt-2 break-words">
          {post.title}
        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-tokyo-muted font-sans leading-relaxed break-words">
          {post.subtitle}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
          {post.tags.map((tag, i) => (
            <Badge key={i} variant="cyan">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Metrics Dashboard Row */}
      {post.metrics && post.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-tokyo-surface/50 border border-tokyo-surface shadow-inner">
          {post.metrics.map((m, i) => (
            <div key={i} className="text-left">
              <div className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider text-tokyo-muted truncate">
                {m.label}
              </div>
              <div className="text-sm sm:text-lg font-mono font-bold text-tokyo-purple mt-0.5 truncate">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hero Executive Summary */}
      <div className="p-4 sm:p-6 rounded-xl bg-tokyo-surface/40 border-l-4 border-tokyo-purple text-tokyo-fg/90 font-sans leading-relaxed text-xs sm:text-base shadow-sm break-words">
        {post.heroSummary}
      </div>
    </div>
  );
};
