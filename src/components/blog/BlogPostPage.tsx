import { useEffect, useState, useRef, useMemo } from 'react';
import { blogPosts, type BlogPost } from '../../data/blogs';
import { fastScrollTo } from '../../utils/scrollTo';
import { CodeBlock } from './CodeBlock';
import { TradeoffCard } from './TradeoffCard';
import { CalloutBox } from './CalloutBox';
import { ERDiagram } from './ERDiagram';
import { SystemArchitectureDiagram } from './SystemArchitectureDiagram';
import { BlogPostHeader } from './BlogPostHeader';
import { BlogPostHero } from './BlogPostHero';
import { TocSidebar } from './TocSidebar';
import { MobileTocDrawer } from './MobileTocDrawer';
import type { TocGroup } from './TocNavList';

interface BlogPostPageProps {
  slug: string;
  onNavigateHome: (targetSection?: string) => void;
  onNavigateBlogIndex: () => void;
  onSelectPost: (slug: string) => void;
}

// Heading bar colors cycle by top-level part, like the section accents on the homepage.
const PART_BARS = [
  'bg-tokyo-purple glow-purple',
  'bg-tokyo-blue glow-blue',
  'bg-tokyo-cyan glow-cyan',
  'bg-tokyo-green glow-green',
  'bg-tokyo-orange glow-orange',
];

const partBarClass = (sectionId: string | undefined, index: number) => {
  const part = Number(sectionId?.match(/^part-(\d+)/)?.[1] ?? index + 1);
  return PART_BARS[(part - 1) % PART_BARS.length];
};

const renderFormattedText = (text: string) => {
  // Parses inline code `code` and markdown bold **bold**
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="font-mono text-tokyo-cyan bg-tokyo-surface px-1.5 py-0.5 rounded text-[0.88em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-tokyo-fg">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const renderParagraphContent = (p: string, pIdx: number) => {
  // Check for bullet point starting with •, -, or *
  const bulletMatch = p.match(/^([•\-*]\s*)(.+)$/);
  if (bulletMatch) {
    const rawContent = bulletMatch[2];

    // Check if there is a double-colon pattern like "Tier 1: Client Frontends (React Native & Expo SDK 54): ..."
    // or "Part 8: Multi-Store Structure & Branch Management: ..."
    const doubleColonMatch = rawContent.match(/^((?:Tier|Part)\s+\d+:\s+[^:]+):\s+(.+)$/i);
    // General single colon pattern "Topic: Description"
    const singleColonMatch = rawContent.match(/^([^:]+):\s+(.+)$/);

    const colonMatch = doubleColonMatch || singleColonMatch;

    if (colonMatch) {
      const topic = colonMatch[1];
      const description = colonMatch[2];
      return (
        <div key={pIdx} className="flex items-start gap-3 pl-1">
          <span className="text-tokyo-comment select-none">•</span>
          <div className="flex-1">
            <span className="font-semibold text-tokyo-fg">{renderFormattedText(topic)}:</span>{' '}
            {renderFormattedText(description)}
          </div>
        </div>
      );
    }

    // Bullet without colon
    return (
      <div key={pIdx} className="flex items-start gap-3 pl-1">
        <span className="text-tokyo-comment select-none">•</span>
        <div className="flex-1">{renderFormattedText(rawContent)}</div>
      </div>
    );
  }

  // Regular paragraph
  return <p key={pIdx}>{renderFormattedText(p)}</p>;
};

export const BlogPostPage = ({
  slug,
  onNavigateHome,
  onNavigateBlogIndex,
  onSelectPost,
}: BlogPostPageProps) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const post: BlogPost | undefined = blogPosts.find(
    (p) => p.slug === slug || (slug === 'radius-real-time-websockets' && p.projectId === 'radius')
  );

  // Group table of contents into main chapters and subheaders
  const { upcomingGroups, groupedToc } = useMemo(() => {
    if (!post?.tableOfContents) {
      return { upcomingGroups: [], groupedToc: [] };
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

    const upcoming = groups.filter((g) => g.main.status === 'upcoming');

    return { upcomingGroups: upcoming, groupedToc: groups };
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

  // Scroll listener for reading progress and the active section
  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      // 1. Reading progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadProgress(progress);
      }

      // 2. Active section scroll spy (suppressed during programmatic smooth scroll to avoid jitter)
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
      <div className="min-h-screen bg-tokyo-base text-tokyo-fg flex flex-col items-center justify-center gap-3">
        <p className="text-tokyo-muted">Post not found.</p>
        <button onClick={onNavigateBlogIndex} className="text-tokyo-purple hover:underline">
          ← Back to all posts
        </button>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const hasToc = Boolean(post.tableOfContents && post.tableOfContents.length > 0);

  return (
    <div className="min-h-screen bg-tokyo-base text-tokyo-fg pb-32">
      <BlogPostHeader
        wide={hasToc}
        readProgress={readProgress}
        onNavigateHome={onNavigateHome}
        onNavigateBlogIndex={onNavigateBlogIndex}
      />

      <div
        className={`mx-auto px-6 pt-12 sm:pt-16 ${
          hasToc
            ? 'max-w-6xl lg:grid lg:grid-cols-[15rem_minmax(0,48rem)] lg:gap-14 lg:justify-center 3xl:max-w-[86rem] 3xl:grid-cols-[18rem_minmax(0,60rem)] 3xl:gap-20'
            : 'max-w-3xl 3xl:max-w-[63rem]'
        }`}
      >
        {hasToc && (
          <TocSidebar
            groupedToc={groupedToc}
            upcomingGroups={upcomingGroups}
            activeSectionId={activeSectionId}
            onScrollToSection={scrollToSection}
            onScrollToTop={() => fastScrollTo(0, 240)}
          />
        )}

        <main className="min-w-0 space-y-12">
          <BlogPostHero post={post} />

          <div className="space-y-14">
            {post.sections.map((section, idx) => (
              <section key={idx} id={section.id} className="space-y-5 scroll-mt-20">
                <h2 className="flex items-start gap-3 text-2xl 3xl:text-[1.75rem] font-semibold text-tokyo-fg leading-snug">
                  <span className={`mt-1 w-1.5 h-6 rounded-full shrink-0 ${partBarClass(section.id, idx)}`} aria-hidden />
                  {section.title}
                </h2>

                <div className="space-y-4 text-tokyo-fg/90 leading-relaxed text-[17px] 3xl:text-[19px] break-words">
                  {section.content.map((p, pIdx) => renderParagraphContent(p, pIdx))}
                </div>

                {section.id === 'part-1-system-architecture' || section.id === 'part-1-layered-architecture' ? (
                  <SystemArchitectureDiagram />
                ) : section.id === 'part-2-database-design' ? (
                  <ERDiagram />
                ) : section.image ? (
                  <figure className="my-6">
                    <a href={section.image.src} target="_blank" rel="noreferrer">
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className="w-full h-auto rounded-lg border border-tokyo-border object-contain max-h-[520px] 3xl:max-h-[680px] mx-auto"
                        loading="lazy"
                      />
                    </a>
                    {section.image.caption && (
                      <figcaption className="text-center text-sm text-tokyo-comment mt-3">{section.image.caption}</figcaption>
                    )}
                  </figure>
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
              </section>
            ))}
          </div>

          <nav className="pt-8 border-t border-tokyo-border grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              {prevPost && (
                <button onClick={() => onSelectPost(prevPost.slug)} className="text-left group">
                  <span className="block text-tokyo-comment mb-1">← Previous</span>
                  <span className="text-tokyo-fg group-hover:text-tokyo-purple transition-colors">{prevPost.title}</span>
                </button>
              )}
            </div>
            <div className="sm:text-right">
              {nextPost && (
                <button onClick={() => onSelectPost(nextPost.slug)} className="sm:text-right group">
                  <span className="block text-tokyo-comment mb-1">Next →</span>
                  <span className="text-tokyo-fg group-hover:text-tokyo-purple transition-colors">{nextPost.title}</span>
                </button>
              )}
            </div>
          </nav>
        </main>
      </div>

      <MobileTocDrawer
        hasToc={hasToc}
        isOpen={mobileDrawerOpen}
        setIsOpen={setMobileDrawerOpen}
        groupedToc={groupedToc}
        activeSectionId={activeSectionId}
        onScrollToSection={scrollToSection}
      />
    </div>
  );
};
