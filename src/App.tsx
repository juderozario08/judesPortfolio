import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { BlogIndexPage } from './components/blog/BlogIndexPage';
import { BlogPostPage } from './components/blog/BlogPostPage';
import { scrollToSection } from './utils/scrollTo';

type View =
  | { type: 'home' }
  | { type: 'blog-index' }
  | { type: 'blog-post'; slug: string };

function App() {
  const [view, setView] = useState<View>({ type: 'home' });
  const pendingScrollRef = useRef<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#blog' || hash === '#blog/' || hash.startsWith('#blog?')) {
        setView({ type: 'blog-index' });
      } else if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '');
        setView({ type: 'blog-post', slug });
      } else if (hash.startsWith('#blog=')) {
        const slug = hash.replace('#blog=', '');
        setView({ type: 'blog-post', slug });
      } else {
        const targetSection = hash.replace(/^#/, '');
        setView((prev) => {
          if (prev.type === 'home') {
            if (targetSection) {
              setTimeout(() => scrollToSection(targetSection, true), 10);
            }
            return prev;
          }
          pendingScrollRef.current = targetSection || 'home';
          return { type: 'home' };
        });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // When switching to the homepage, ensure target section is scrolled into view once mounted
  useEffect(() => {
    if (view.type !== 'home') return;

    const target = pendingScrollRef.current || window.location.hash.replace(/^#/, '');
    if (!target) return;

    const attemptScroll = () => {
      if (scrollToSection(target, true)) {
        pendingScrollRef.current = null;
        return true;
      }
      return false;
    };

    if (!attemptScroll()) {
      const t1 = setTimeout(attemptScroll, 60);
      const t2 = setTimeout(attemptScroll, 180);
      const t3 = setTimeout(attemptScroll, 350);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [view]);

  const navigateHome = (targetSection = 'projects') => {
    const cleanTarget = targetSection.replace(/^#/, '') || 'home';
    pendingScrollRef.current = cleanTarget;
    window.location.hash = cleanTarget;

    if (view.type === 'home') {
      scrollToSection(cleanTarget, true);
      pendingScrollRef.current = null;
    } else {
      setView({ type: 'home' });
    }
  };

  const navigateBlogIndex = () => {
    setView({ type: 'blog-index' });
    window.location.hash = 'blog';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateBlogPost = (slug: string) => {
    setView({ type: 'blog-post', slug });
    window.location.hash = `blog/${slug}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (view.type === 'blog-index') {
    return (
      <BlogIndexPage
        onNavigateHome={(target = 'projects') => navigateHome(target)}
        onSelectPost={(slug) => navigateBlogPost(slug)}
      />
    );
  }

  if (view.type === 'blog-post') {
    return (
      <BlogPostPage
        slug={view.slug}
        onNavigateHome={(target = 'home') => navigateHome(target)}
        onNavigateBlogIndex={navigateBlogIndex}
        onSelectPost={(slug) => navigateBlogPost(slug)}
      />
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-tokyo-base text-tokyo-fg selection:bg-tokyo-purple selection:text-tokyo-base">
      {/* Moving Grid Background */}
      <div className="fixed inset-0 pointer-events-none bg-grid opacity-50"></div>

      <Navbar onOpenBlog={(slug) => (slug ? navigateBlogPost(slug) : navigateBlogIndex())} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects onOpenBlog={(slug) => navigateBlogPost(slug)} />
      <Contact />
    </div>
  );
}

export default App;
