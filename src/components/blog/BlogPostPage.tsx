import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, ListOrdered, Share2, Check, Terminal, X, ChevronUp } from 'lucide-react';
import { blogPosts, type BlogPost } from '../../data/blogs';
import { CodeBlock } from './CodeBlock';
import { TradeoffCard } from './TradeoffCard';
import { CalloutBox } from './CalloutBox';
import { ERDiagram } from './ERDiagram';

interface BlogPostPageProps {
  slug: string;
  onNavigateHome: (targetSection?: string) => void;
  onNavigateBlogIndex: () => void;
  onSelectPost: (slug: string) => void;
}

export const BlogPostPage = ({
  slug,
  onNavigateHome,
  onNavigateBlogIndex,
  onSelectPost,
}: BlogPostPageProps) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [isDocked, setIsDocked] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const inlineTocRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const post: BlogPost | undefined = blogPosts.find(
    (p) => p.slug === slug || (slug === 'radius-real-time-websockets' && p.projectId === 'radius')
  );

  // Group table of contents into main chapters and subheaders
  const { publishedGroups, upcomingGroups, groupedToc } = useMemo(() => {
    if (!post?.tableOfContents) {
      return { publishedGroups: [], upcomingGroups: [], groupedToc: [] };
    }

    const groups: {
      main: (typeof post.tableOfContents)[0];
      subsections: (typeof post.tableOfContents)[0][];
    }[] = [];

    for (const item of post.tableOfContents) {
      const isSub = String(item.partNumber).includes('.');
      if (!isSub) {
        groups.push({ main: item, subsections: [] });
      } else {
        const parentNum = String(item.partNumber).split('.')[0];
        const parentGroup = groups.find((g) => String(g.main.partNumber) === parentNum);
        if (parentGroup) {
          parentGroup.subsections.push(item);
        } else {
          groups.push({ main: item, subsections: [] });
        }
      }
    }

    const published = groups.filter((g) => g.main.status === 'published');
    const upcoming = groups.filter((g) => g.main.status === 'upcoming');

    return { publishedGroups: published, upcomingGroups: upcoming, groupedToc: groups };
  }, [post?.tableOfContents]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Scroll listener for reading progress, docking state, and active section
  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      // 1. Reading progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadProgress(progress);
      }

      // 2. Docking state: when the user scrolls past the inline Table of Contents
      if (inlineTocRef.current) {
        const rect = inlineTocRef.current.getBoundingClientRect();
        // Dock when the bottom of inline TOC has scrolled past the top header
        setIsDocked(rect.bottom < 80);
      } else {
        setIsDocked(window.scrollY > 450);
      }

      // 3. Active section scroll spy (suppressed during programmatic smooth scroll to avoid jitter)
      if (isProgrammaticScrollRef.current) return;

      const headerOffset = 180;
      let currentActive = post.sections[0]?.id || '';
      for (let i = post.sections.length - 1; i >= 0; i--) {
        const section = post.sections[i];
        if (section.id) {
          const el = document.getElementById(section.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= headerOffset) {
              currentActive = section.id;
              break;
            }
          }
        }
      }
      setActiveSectionId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const fastScrollTo = (targetY: number, duration = 240) => {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Snappy deceleration curve (cubic ease out)
      const ease = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startY + diff * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Lock scroll spy while smooth scroll is animating to destination
      isProgrammaticScrollRef.current = true;
      setActiveSectionId(id);
      setMobileDrawerOpen(false);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      fastScrollTo(offsetPosition, 240);

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 250);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-tokyo-base text-tokyo-fg flex flex-col items-center justify-center space-y-4">
        <p className="font-mono text-base text-tokyo-muted">Article not found.</p>
        <button
          onClick={onNavigateBlogIndex}
          className="px-4 py-2 rounded-xl bg-tokyo-purple text-tokyo-base font-mono text-xs font-bold"
        >
          Return to Blog Directory
        </button>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="relative min-h-screen w-full bg-tokyo-base text-tokyo-fg selection:bg-tokyo-purple selection:text-tokyo-base pb-32">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid opacity-50 z-0" />

      {/* Top Sticky Navigation Bar with Progress Line */}
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
            user@archlinux:~/blog/{post.slug}.md
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

      {/* Floating Animated Left-Side Rail (Appears smoothly when scrolled past inline TOC) */}
      <AnimatePresence>
        {post.tableOfContents && post.tableOfContents.length > 0 && isDocked && (
          <motion.aside
            key="docked-toc"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="hidden 2xl:block fixed top-24 left-[max(1.5rem,calc(50vw-448px-19.5rem))] w-72 z-30 pointer-events-auto"
            aria-label="Table of contents side navigation"
          >
            <div className="rounded-2xl bg-tokyo-surface/90 backdrop-blur-xl border border-tokyo-surface/90 shadow-[0_10px_35px_rgba(0,0,0,0.6)] p-4 space-y-3 max-h-[calc(100vh-7.5rem)] flex flex-col">
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
                    {post.tableOfContents.filter((t) => t.status === 'published').length} / {post.tableOfContents.length} Parts
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
                {groupedToc.map((group) => {
                  const isMainPublished = group.main.status === 'published';
                  const isMainActive = activeSectionId === group.main.id;

                  return (
                    <div key={group.main.id} className="space-y-0.5">
                      {/* Main Chapter Item */}
                      <div className="relative">
                        {isMainActive && isMainPublished && (
                          <motion.div
                            layoutId="activeDockedPill"
                            className="absolute inset-0 rounded-xl bg-tokyo-purple/15 border border-tokyo-purple/50 shadow-[0_0_16px_rgba(187,154,247,0.25)] pointer-events-none"
                            transition={{
                              type: 'tween',
                              ease: [0.16, 1, 0.3, 1],
                              duration: 0.12,
                            }}
                          />
                        )}

                        <button
                          onClick={() => isMainPublished && scrollToSection(group.main.id)}
                          disabled={!isMainPublished}
                          className={`relative z-10 w-full text-left p-2 rounded-xl transition-colors duration-100 flex items-start gap-2 ${
                            !isMainPublished
                              ? 'opacity-35 cursor-default'
                              : isMainActive
                              ? 'text-tokyo-fg font-semibold'
                              : 'text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-base/60 cursor-pointer'
                          }`}
                        >
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 transition-colors duration-100 ${
                              isMainActive
                                ? 'bg-tokyo-purple text-tokyo-base shadow-sm'
                                : isMainPublished
                                ? 'bg-tokyo-base text-tokyo-purple border border-tokyo-surface'
                                : 'bg-tokyo-base/50 text-tokyo-muted border border-tokyo-surface/40'
                            }`}
                          >
                            P{group.main.partNumber}
                          </span>

                          <div className="flex-1 min-w-0">
                            <span
                              className={`text-xs line-clamp-2 leading-snug transition-colors duration-100 font-medium ${
                                isMainActive ? 'text-tokyo-cyan font-bold' : ''
                              }`}
                            >
                              {group.main.title}
                            </span>
                          </div>
                        </button>
                      </div>

                      {/* Subsections indented underneath */}
                      {group.subsections.length > 0 && (
                        <div className="ml-2.5 pl-2 border-l border-tokyo-surface/80 space-y-0.5 my-0.5">
                          {group.subsections.map((sub) => {
                            const isSubPublished = sub.status === 'published';
                            const isSubActive = activeSectionId === sub.id;

                            return (
                              <div key={sub.id} className="relative">
                                {isSubActive && isSubPublished && (
                                  <motion.div
                                    layoutId="activeDockedSubPill"
                                    className="absolute inset-0 rounded-lg bg-tokyo-cyan/15 border border-tokyo-cyan/50 shadow-[0_0_12px_rgba(125,207,255,0.2)] pointer-events-none"
                                    transition={{
                                      type: 'tween',
                                      ease: [0.16, 1, 0.3, 1],
                                      duration: 0.12,
                                    }}
                                  />
                                )}

                                <button
                                  onClick={() => isSubPublished && scrollToSection(sub.id)}
                                  disabled={!isSubPublished}
                                  className={`relative z-10 w-full text-left px-2 py-1.5 rounded-lg transition-colors duration-100 flex items-start gap-1.5 ${
                                    !isSubPublished
                                      ? 'opacity-35 cursor-default'
                                      : isSubActive
                                      ? 'text-tokyo-fg font-medium'
                                      : 'text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-base/60 cursor-pointer'
                                  }`}
                                >
                                  <span
                                    className={`text-[8px] font-mono font-bold px-1 py-0.5 rounded shrink-0 mt-0.5 transition-colors duration-100 ${
                                      isSubActive
                                        ? 'bg-tokyo-cyan text-tokyo-base shadow-sm'
                                        : isSubPublished
                                        ? 'bg-tokyo-base text-tokyo-cyan border border-tokyo-surface'
                                        : 'bg-tokyo-base/50 text-tokyo-muted'
                                    }`}
                                  >
                                    {sub.partNumber}
                                  </span>

                                  <div className="flex-1 min-w-0">
                                    <span
                                      className={`text-[11px] line-clamp-2 leading-snug transition-colors duration-100 ${
                                        isSubActive ? 'text-tokyo-cyan font-semibold' : ''
                                      }`}
                                    >
                                      {sub.title}
                                    </span>
                                  </div>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Sidebar Footer */}
              <div className="pt-2 border-t border-tokyo-surface/80 flex items-center justify-between text-[10px] font-mono text-tokyo-muted">
                <button
                  onClick={() => fastScrollTo(0, 240)}
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

      {/* Main Full-Page Centered Article Container */}
      <main className="relative z-10 max-w-3xl 2xl:max-w-4xl mx-auto px-3 sm:px-6 md:px-8 pt-6 sm:pt-10 md:pt-14 space-y-8 sm:space-y-12">
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
              <span
                key={i}
                className="text-[11px] sm:text-xs font-mono text-tokyo-cyan bg-tokyo-cyan/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-tokyo-cyan/20"
              >
                #{tag}
              </span>
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

        {/* 1. Inline Table of Contents & Roadmap (Starts along with the article) */}
        {post.tableOfContents && post.tableOfContents.length > 0 && (
          <div
            ref={inlineTocRef}
            className="rounded-2xl bg-tokyo-surface/60 border border-tokyo-surface p-3.5 sm:p-7 space-y-4 sm:space-y-5 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-tokyo-surface/80 pb-3 sm:pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 sm:p-2 rounded-xl bg-tokyo-purple/10 border border-tokyo-purple/30 text-tokyo-purple shrink-0">
                  <ListOrdered size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base font-bold font-mono uppercase tracking-wider text-tokyo-fg">
                    Engineering Roadmap & Table of Contents
                  </h3>
                  <p className="text-[11px] sm:text-xs text-tokyo-muted font-sans mt-0.5 hidden xs:block">
                    Click any milestone to jump to its breakdown, or scroll down to follow the journey.
                  </p>
                </div>
              </div>

              <span className="text-[10px] sm:text-[11px] font-mono text-tokyo-cyan bg-tokyo-cyan/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-tokyo-cyan/20 w-fit shrink-0">
                {post.tableOfContents.filter((t) => t.status === 'published').length} / {post.tableOfContents.length} Milestones Published
              </span>
            </div>

            {/* Published Chapters (With Prominent Main Headers and Distinct Subheaders) */}
            <div className="space-y-4 pt-1">
              {publishedGroups.map((group) => (
                <div
                  key={group.main.id}
                  className="rounded-xl border border-tokyo-surface/90 bg-tokyo-base/60 p-3.5 sm:p-5 space-y-3.5 shadow-sm hover:border-tokyo-purple/50 transition-all"
                >
                  {/* Main Chapter Header Card */}
                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => scrollToSection(group.main.id)}
                    className="p-3 sm:p-4 rounded-xl bg-tokyo-surface/60 border border-tokyo-purple/30 hover:border-tokyo-purple/70 hover:bg-tokyo-surface/90 transition-all cursor-pointer group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-tokyo-purple bg-tokyo-purple/15 px-2 py-0.5 rounded-full border border-tokyo-purple/30">
                          Part {group.main.partNumber}
                        </span>
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-tokyo-purple/90 bg-tokyo-purple/10 px-2 py-0.5 rounded border border-tokyo-purple/20">
                          Main Header
                        </span>
                        {group.subsections.length > 0 && (
                          <span className="text-[10px] font-mono text-tokyo-cyan bg-tokyo-cyan/10 px-2 py-0.5 rounded border border-tokyo-cyan/20">
                            {group.subsections.length} Sub-topics
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                          Published
                        </span>
                        <span className="text-[11px] font-mono text-tokyo-muted group-hover:text-tokyo-cyan transition-colors hidden sm:flex items-center gap-1">
                          Jump to chapter overview <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold font-sans text-tokyo-fg group-hover:text-tokyo-cyan transition-colors">
                      {group.main.title}
                    </h4>

                    {group.main.description && (
                      <p className="text-xs sm:text-sm text-tokyo-muted font-sans mt-1.5 leading-relaxed">
                        {group.main.description}
                      </p>
                    )}
                  </motion.div>

                  {/* Nested Subheaders Grid */}
                  {group.subsections.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-2.5 px-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-tokyo-cyan">
                          Subheaders in Part {group.main.partNumber}:
                        </span>
                        <div className="h-px bg-tokyo-surface/80 flex-1" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {group.subsections.map((sub) => (
                          <motion.div
                            key={sub.id}
                            whileHover={{ y: -2, scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => scrollToSection(sub.id)}
                            className="p-3 sm:p-3.5 rounded-xl border border-tokyo-surface/70 bg-tokyo-surface/30 hover:bg-tokyo-surface/80 hover:border-tokyo-cyan/50 transition-all cursor-pointer flex flex-col justify-between group/sub shadow-sm"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-mono font-bold text-tokyo-cyan bg-tokyo-cyan/10 px-2 py-0.5 rounded border border-tokyo-cyan/25">
                                Subheader {sub.partNumber}
                              </span>
                              <span className="text-[10px] font-mono text-tokyo-muted group-hover/sub:text-tokyo-cyan transition-colors flex items-center gap-1">
                                <span>Read</span>
                                <ArrowRight size={10} />
                              </span>
                            </div>

                            <div className="mt-2">
                              <div className="text-xs sm:text-sm font-semibold font-sans text-tokyo-fg group-hover/sub:text-tokyo-cyan transition-colors">
                                {sub.title}
                              </div>
                              {sub.description && (
                                <p className="text-[11px] text-tokyo-muted font-sans mt-1 line-clamp-2 leading-relaxed">
                                  {sub.description}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Upcoming Roadmap Chapters */}
            {upcomingGroups.length > 0 && (
              <div className="pt-3 border-t border-tokyo-surface/80 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-tokyo-fg">
                      Upcoming Roadmap Chapters
                    </span>
                    <span className="text-[10px] font-mono text-tokyo-muted bg-tokyo-base px-2 py-0.5 rounded border border-tokyo-surface">
                      {upcomingGroups.length} Planned
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-tokyo-muted">
                    Future releases in the Radius series
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {upcomingGroups.map(({ main: item }) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-tokyo-base/40 border border-tokyo-surface/40 opacity-60 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-bold text-tokyo-purple">
                          Part {item.partNumber}
                        </span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full border text-tokyo-muted bg-tokyo-base border-tokyo-surface">
                          Upcoming
                        </span>
                      </div>
                      <div className="mt-1.5">
                        <div className="text-xs font-semibold text-tokyo-muted">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-[10px] text-tokyo-muted/80 font-sans mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Article Sections */}
        <div className="space-y-12 sm:space-y-16 pt-2">
          {post.sections.map((section, idx) => (
            <article key={idx} id={section.id} className="space-y-4 sm:space-y-5 scroll-mt-20 sm:scroll-mt-24">
              {(section.badge || section.partNumber) && (
                <div className="flex items-center gap-2">
                  {section.badge && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-tokyo-cyan bg-tokyo-cyan/10 border border-tokyo-cyan/30 px-2 sm:px-2.5 py-0.5 rounded">
                      {section.badge}
                    </span>
                  )}
                  {section.partNumber && (
                    <span className="text-[10px] font-mono text-tokyo-muted">
                      PART {section.partNumber}
                    </span>
                  )}
                </div>
              )}

              <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-tokyo-fg font-sans border-b border-tokyo-surface/60 pb-2.5 sm:pb-3 break-words">
                {section.title}
              </h2>

              <div className="space-y-3.5 sm:space-y-4 text-tokyo-fg/90 leading-relaxed font-sans text-xs sm:text-base break-words">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.id === 'part-1-database-pgx' ? (
                <ERDiagram />
              ) : section.image ? (
                <div className="my-5 sm:my-6 rounded-xl overflow-hidden border border-tokyo-surface/80 bg-tokyo-base/60 p-2 sm:p-4 shadow-xl">
                  <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                    <img
                      src={section.image.src}
                      alt={section.image.alt}
                      className="w-full h-auto rounded-lg object-contain max-h-[520px] mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                      onClick={() => window.open(section.image?.src, '_blank')}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-tokyo-purple/0 group-hover:bg-tokyo-purple/5 transition-colors pointer-events-none" />
                  </div>
                  {section.image.caption && (
                    <p className="text-center text-[11px] sm:text-xs font-mono text-tokyo-muted mt-2 sm:mt-3 flex items-center justify-center gap-1.5 flex-wrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-tokyo-purple inline-block shrink-0" />
                      <span>{section.image.caption}</span>
                      <span
                        className="text-[10px] text-tokyo-purple/80 underline cursor-pointer"
                        onClick={() => window.open(section.image?.src, '_blank')}
                      >
                        (view full size)
                      </span>
                    </p>
                  )}
                </div>
              ) : null}

              {section.tradeoff && <TradeoffCard tradeoff={section.tradeoff} />}

              {section.codeSnippet && (
                <CodeBlock
                  fileName={section.codeSnippet.fileName}
                  language={section.codeSnippet.language}
                  code={section.codeSnippet.code}
                  explanation={section.codeSnippet.explanation}
                />
              )}

              {section.callout && <CalloutBox callout={section.callout} />}
            </article>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 sm:pt-12 border-t border-tokyo-surface flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {prevPost ? (
            <button
              onClick={() => onSelectPost(prevPost.slug)}
              className="flex items-center gap-2 text-xs font-mono text-tokyo-muted hover:text-tokyo-cyan transition-colors w-full sm:w-auto text-left p-2 rounded-lg hover:bg-tokyo-surface/40"
            >
              <ArrowLeft size={15} className="shrink-0" />
              <div className="min-w-0">
                <span className="opacity-60 block text-[10px]">Previous Case Study</span>
                <span className="text-tokyo-fg font-semibold line-clamp-1 break-words">{prevPost.title}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onNavigateBlogIndex}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-tokyo-surface hover:bg-tokyo-base border border-tokyo-surface hover:border-tokyo-purple text-xs font-mono font-bold text-tokyo-fg hover:text-tokyo-purple transition-all shadow-sm text-center shrink-0"
          >
            All Case Studies
          </button>

          {nextPost ? (
            <button
              onClick={() => onSelectPost(nextPost.slug)}
              className="flex items-center gap-2 text-xs font-mono text-tokyo-muted hover:text-tokyo-cyan transition-colors w-full sm:w-auto text-right justify-end p-2 rounded-lg hover:bg-tokyo-surface/40"
            >
              <div className="min-w-0">
                <span className="opacity-60 block text-[10px]">Next Case Study</span>
                <span className="text-tokyo-fg font-semibold line-clamp-1 break-words">{nextPost.title}</span>
              </div>
              <ArrowRight size={15} className="shrink-0" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </main>

      {/* Floating Left Drawer Button for Mobile / Tablet / Mid Laptops (< 2xl) */}
      {post.tableOfContents && post.tableOfContents.length > 0 && isDocked && (
        <div className="2xl:hidden fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-tokyo-surface/95 backdrop-blur-md border border-tokyo-purple/50 shadow-2xl text-[11px] sm:text-xs font-mono font-bold text-tokyo-purple hover:bg-tokyo-purple hover:text-tokyo-base transition-all"
          >
            <ListOrdered size={15} />
            <span>TOC / Milestones</span>
          </motion.button>

          {/* Animated Slide-in Drawer from the LEFT */}
          <AnimatePresence>
            {mobileDrawerOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileDrawerOpen(false)}
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
                      onClick={() => setMobileDrawerOpen(false)}
                      className="p-1 rounded-lg text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-base transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                    {groupedToc.map((group) => {
                      const isMainPublished = group.main.status === 'published';
                      const isMainActive = activeSectionId === group.main.id;

                      return (
                        <div key={group.main.id} className="space-y-1">
                          {/* Main Header Item */}
                          <button
                            onClick={() => {
                              if (isMainPublished) {
                                scrollToSection(group.main.id);
                                setMobileDrawerOpen(false);
                              }
                            }}
                            disabled={!isMainPublished}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                              !isMainPublished
                                ? 'opacity-40 cursor-default bg-tokyo-base/20 border border-tokyo-surface/30'
                                : isMainActive
                                ? 'bg-tokyo-purple/20 text-tokyo-cyan border border-tokyo-purple/50 font-semibold'
                                : 'text-tokyo-fg hover:bg-tokyo-base/80 bg-tokyo-base/50 border border-tokyo-surface/70'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-0.5 shrink-0 mt-0.5">
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-tokyo-purple text-tokyo-base">
                                P{group.main.partNumber}
                              </span>
                              <span className="text-[7px] font-mono uppercase font-bold text-tokyo-purple">
                                MAIN
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-semibold leading-snug line-clamp-2 break-words">
                                {group.main.title}
                              </span>
                            </div>
                          </button>

                          {/* Subsections indented underneath */}
                          {group.subsections.length > 0 && (
                            <div className="ml-3 pl-2.5 border-l-2 border-tokyo-purple/30 space-y-1 my-1">
                              {group.subsections.map((sub) => {
                                const isSubPublished = sub.status === 'published';
                                const isSubActive = activeSectionId === sub.id;

                                return (
                                  <button
                                    key={sub.id}
                                    onClick={() => {
                                      if (isSubPublished) {
                                        scrollToSection(sub.id);
                                        setMobileDrawerOpen(false);
                                      }
                                    }}
                                    disabled={!isSubPublished}
                                    className={`w-full text-left p-2 rounded-lg transition-all flex items-start gap-2 ${
                                      !isSubPublished
                                        ? 'opacity-40 cursor-default'
                                        : isSubActive
                                        ? 'bg-tokyo-cyan/20 text-tokyo-cyan border border-tokyo-cyan/40 font-medium'
                                        : 'text-tokyo-muted hover:text-tokyo-fg hover:bg-tokyo-base/60'
                                    }`}
                                  >
                                    <span className="text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-tokyo-base text-tokyo-cyan border border-tokyo-cyan/30 shrink-0 mt-0.5">
                                      {sub.partNumber}
                                    </span>
                                    <span className="text-[11px] leading-snug line-clamp-2 break-words">
                                      {sub.title}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
