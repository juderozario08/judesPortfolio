import { useEffect, useState, useRef, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts, type BlogPost } from '../../data/blogs';
import { fastScrollTo } from '../../utils/scrollTo';
import { CodeBlock } from './CodeBlock';
import { TradeoffCard } from './TradeoffCard';
import { CalloutBox } from './CalloutBox';
import { ERDiagram } from './ERDiagram';
import { BlogPostHeader } from './BlogPostHeader';
import { BlogPostHero } from './BlogPostHero';
import { InlineTableOfContents } from './InlineTableOfContents';
import { DockedSidebar } from './DockedSidebar';
import { MobileTocDrawer } from './MobileTocDrawer';
import type { TocGroup } from './TocNavList';

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

    const groups: TocGroup[] = [];

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

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
  const hasToc = Boolean(post.tableOfContents && post.tableOfContents.length > 0);

  return (
    <div className="relative min-h-screen w-full bg-tokyo-base text-tokyo-fg selection:bg-tokyo-purple selection:text-tokyo-base pb-32">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid opacity-50 z-0" />

      {/* Top Sticky Header */}
      <BlogPostHeader
        slug={post.slug}
        readProgress={readProgress}
        onNavigateHome={onNavigateHome}
        onNavigateBlogIndex={onNavigateBlogIndex}
      />

      {/* Floating Animated Left-Side Rail (≥2xl screens) */}
      <DockedSidebar
        isDocked={isDocked}
        hasToc={hasToc}
        publishedCount={post.tableOfContents?.filter((t) => t.status === 'published').length || 0}
        totalCount={post.tableOfContents?.length || 0}
        readProgress={readProgress}
        groupedToc={groupedToc}
        activeSectionId={activeSectionId}
        onScrollToSection={scrollToSection}
        onScrollToTop={() => fastScrollTo(0, 240)}
      />

      {/* Main Full-Page Centered Article Container */}
      <main className="relative z-10 max-w-3xl 2xl:max-w-4xl mx-auto px-3 sm:px-6 md:px-8 pt-6 sm:pt-10 md:pt-14 space-y-8 sm:space-y-12">
        {/* Hero Meta, Title, Metrics, Summary */}
        <BlogPostHero post={post} />

        {/* Inline Table of Contents & Roadmap */}
        {hasToc && (
          <InlineTableOfContents
            inlineTocRef={inlineTocRef}
            totalMilestones={post.tableOfContents!.length}
            publishedCount={publishedGroups.length}
            publishedGroups={publishedGroups}
            upcomingGroups={upcomingGroups}
            onScrollToSection={scrollToSection}
          />
        )}

        {/* Article Sections */}
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

      {/* Floating Left Drawer for Mobile (<2xl screens) */}
      <MobileTocDrawer
        hasToc={hasToc}
        isDocked={isDocked}
        isOpen={mobileDrawerOpen}
        setIsOpen={setMobileDrawerOpen}
        groupedToc={groupedToc}
        activeSectionId={activeSectionId}
        onScrollToSection={scrollToSection}
      />
    </div>
  );
};
