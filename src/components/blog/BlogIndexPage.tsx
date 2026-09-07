import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight, Search, Terminal } from 'lucide-react';
import { blogPosts } from '../../data/blogs';

interface BlogIndexPageProps {
  onNavigateHome: (targetSection?: string) => void;
  onSelectPost: (slug: string) => void;
}

export const BlogIndexPage = ({ onNavigateHome, onSelectPost }: BlogIndexPageProps) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all unique tags
  const allTags = ['all', ...Array.from(new Set(blogPosts.flatMap((p) => p.tags)))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="relative min-h-screen w-full bg-tokyo-base text-tokyo-fg selection:bg-tokyo-purple selection:text-tokyo-base pb-24">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid opacity-50 z-0" />

      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-tokyo-base/90 border-b border-tokyo-surface px-3 sm:px-6 md:px-8 py-3 sm:py-3.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={() => onNavigateHome('home')}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-mono text-tokyo-muted hover:text-tokyo-cyan transition-colors group shrink-0"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span><span className="hidden xs:inline">Back to </span>Portfolio</span>
          </button>

          <div
            onClick={() => onNavigateHome('home')}
            className="flex items-center gap-1.5 sm:gap-2 select-none cursor-pointer hover:opacity-80 transition-opacity"
            title="Go to Homepage"
          >
            <span className="text-sm sm:text-base font-bold font-mono text-tokyo-purple neon-text-purple">
              {"<Jude />"}
            </span>
            <span className="text-xs font-mono text-tokyo-muted opacity-50 hidden sm:inline">/</span>
            <span className="text-xs font-mono text-tokyo-cyan font-semibold hidden sm:inline">engineering-blog</span>
          </div>

          <button
            onClick={() => onNavigateHome('projects')}
            className="text-xs font-mono font-semibold text-tokyo-muted hover:text-tokyo-cyan bg-tokyo-surface/80 hover:bg-tokyo-surface px-2.5 sm:px-3 py-1 rounded-full border border-tokyo-surface transition-colors hidden sm:inline shrink-0"
          >
            Projects
          </button>
        </div>
      </header>

      {/* Header Banner */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-tokyo-purple/10 border border-tokyo-purple/30 text-tokyo-purple text-[10px] sm:text-xs font-mono font-semibold">
          <Terminal size={13} />
          <span>TECHNICAL ARCHITECTURE & CASE STUDIES</span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-tokyo-fg leading-tight break-words">
            Engineering Logs & Deep-Dives
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-tokyo-muted font-sans max-w-3xl leading-relaxed break-words">
            In-depth technical writeups detailing real-world engineering tradeoffs, system architecture, low-level data structures, and production lessons across my projects.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between border-y border-tokyo-surface py-4 sm:py-5">
          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-all capitalize ${
                  selectedTag === tag
                    ? 'bg-tokyo-purple text-tokyo-base font-bold shadow-[0_0_12px_rgba(187,154,247,0.4)]'
                    : 'bg-tokyo-surface/60 text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-surface border border-tokyo-surface'
                }`}
              >
                {tag === 'all' ? 'All Topics' : `#${tag}`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-60">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-tokyo-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies..."
              className="w-full bg-tokyo-surface/70 border border-tokyo-surface focus:border-tokyo-purple rounded-xl pl-9 pr-3 py-1.5 text-xs font-mono text-tokyo-fg placeholder:text-tokyo-muted/60 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Post Grid */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-tokyo-surface/30 rounded-2xl border border-tokyo-surface space-y-3">
            <p className="font-mono text-sm text-tokyo-muted">No case studies found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-tokyo-cyan hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="group rounded-2xl bg-tokyo-surface/60 border border-tokyo-surface hover:border-tokyo-purple/50 p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-4 sm:space-y-6"
            >
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono text-tokyo-muted">
                <span className="font-semibold text-tokyo-purple px-2 py-0.5 rounded bg-tokyo-purple/10 border border-tokyo-purple/20">
                  {post.projectTitle}
                </span>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-tokyo-cyan" /> {post.date}
                  </span>
                  <span className="text-tokyo-surface">•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-tokyo-purple" /> {post.readTime}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1.5 sm:space-y-2">
                <h2
                  onClick={() => onSelectPost(post.slug)}
                  className="text-lg sm:text-2xl md:text-3xl font-bold font-sans text-tokyo-fg group-hover:text-tokyo-cyan transition-colors cursor-pointer leading-tight tracking-tight break-words"
                >
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-tokyo-muted font-sans leading-relaxed break-words">
                  {post.subtitle}
                </p>
              </div>

              {/* Metrics Highlights */}
              {post.metrics && post.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 p-3 sm:p-3.5 rounded-xl bg-tokyo-base/60 border border-tokyo-surface">
                  {post.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-tokyo-muted truncate">
                        {m.label}
                      </div>
                      <div className="text-xs sm:text-base font-mono font-bold text-tokyo-purple mt-0.5 truncate">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Executive Summary Snippet */}
              <p className="text-xs sm:text-sm text-tokyo-fg/80 font-sans leading-relaxed line-clamp-3">
                {post.heroSummary}
              </p>

              {/* Footer: Tags & Read Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-tokyo-surface/70">
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {post.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] sm:text-[11px] font-mono text-tokyo-cyan bg-tokyo-cyan/10 px-2 py-0.5 rounded border border-tokyo-cyan/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectPost(post.slug)}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 rounded-xl bg-tokyo-purple text-tokyo-base font-mono text-xs font-bold hover:bg-tokyo-purple/90 transition-all flex items-center justify-center gap-2 group/btn shadow-[0_0_15px_rgba(187,154,247,0.3)] shrink-0"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))
        )}
      </main>
    </div>
  );
};
