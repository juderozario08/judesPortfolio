import { useEffect, useState } from 'react';
import { personalInfo } from '../data/resume';
import { scrollToSection } from '../utils/scrollTo';

interface NavbarProps {
  onOpenBlog: () => void;
}

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

/** Id of the section currently under the navbar, so its link can be highlighted. */
const useActiveSection = () => {
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      let current = '';
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      // At the very bottom, the last section may be too short to reach the top.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = navItems[navItems.length - 1].id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return active;
};

const Navbar = ({ onOpenBlog }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(targetId, { updateHash: true });
  };

  const linkClass = (isActive: boolean) =>
    `transition-colors ${isActive ? 'text-tokyo-purple' : 'text-tokyo-muted hover:text-tokyo-fg'}`;

  const links = (
    <>
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleNavClick(e, item.id)}
          className={linkClass(active === item.id)}
        >
          {item.label}
        </a>
      ))}
      <button
        onClick={() => {
          setIsOpen(false);
          onOpenBlog();
        }}
        className={`${linkClass(false)} text-left`}
      >
        Blog
      </button>
    </>
  );

  return (
    <nav className="sticky top-0 z-40 bg-tokyo-base/90 backdrop-blur border-b border-tokyo-border">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-bold text-lg text-tokyo-purple hover:opacity-80 transition-opacity"
        >
          {personalInfo.name}
        </a>

        <div className="hidden md:flex items-center gap-7 text-[15px]">{links}</div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-tokyo-muted hover:text-tokyo-fg p-2 -mr-2"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-tokyo-border px-6 py-4 flex flex-col gap-4">{links}</div>
      )}
    </nav>
  );
};

export default Navbar;
