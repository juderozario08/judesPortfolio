import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/resume';
import { BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenBlog?: (slug: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', num: '1' },
  { id: 'about', label: 'About', num: '2' },
  { id: 'skills', label: 'Skills', num: '3' },
  { id: 'experience', label: 'Experience', num: '4' },
  { id: 'projects', label: 'Projects', num: '5' },
];

const Navbar = ({ onOpenBlog }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#home');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="fixed top-6 left-1/2 z-40 flex items-center justify-between w-[95%] max-w-6xl px-6 md:px-8 py-4 rounded-full backdrop-blur-md bg-tokyo-base/85 border border-tokyo-surface shadow-[0_5_20px_rgba(0,0,0,0.5)]"
    >
      <a
        href="#home"
        onClick={(e) => handleNavClick(e, 'home')}
        className="text-2xl font-bold text-tokyo-purple tracking-tighter neon-text-purple cursor-pointer transition-opacity hover:opacity-80 select-none"
      >
        {"<Jude />"}
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-2 text-base font-mono font-bold">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className="px-4 py-1.5 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all"
          >
            <span className="text-tokyo-blue mr-2 opacity-70">{item.num}</span>
            {item.label}
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={() => onOpenBlog?.('')}
          className="px-4 py-2 rounded-full border border-tokyo-purple/50 bg-tokyo-purple/10 text-tokyo-purple hover:text-tokyo-base hover:bg-tokyo-purple transition-all text-sm font-mono font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(187,154,247,0.25)]"
          title="Read technical project case studies"
        >
          <BookOpen size={14} />
          <span>Blog</span>
        </button>

        <a 
          href={personalInfo.github} 
          target="_blank" 
          rel="noreferrer"
          className="px-5 py-2 rounded-full border border-tokyo-surface bg-tokyo-surface/50 text-tokyo-muted hover:text-tokyo-base hover:bg-tokyo-cyan hover:border-tokyo-cyan hover:shadow-[0_0_15px_rgba(125,207,255,0.4)] transition-all text-base font-mono font-bold"
        >
          GitHub
        </a>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-tokyo-fg hover:text-tokyo-cyan focus:outline-none transition-colors p-2"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-4 p-4 rounded-2xl bg-tokyo-base/95 backdrop-blur-xl border border-tokyo-surface shadow-2xl flex flex-col gap-2 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="px-4 py-3 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all font-mono font-bold text-lg"
              >
                <span className="text-tokyo-blue mr-3 opacity-70">{item.num}</span>
                {item.label}
              </a>
            ))}

            <button
              onClick={() => {
                closeMenu();
                onOpenBlog?.('');
              }}
              className="px-4 py-3 rounded-md text-tokyo-purple hover:bg-tokyo-surface transition-all font-mono font-bold text-lg flex items-center gap-2 text-left"
            >
              <BookOpen size={18} />
              <span>Engineering Blog</span>
            </button>

            <div className="h-px bg-tokyo-surface my-2 mx-2" />
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noreferrer"
              onClick={closeMenu}
              className="mt-2 mx-2 px-5 py-3 text-center rounded-full border border-tokyo-surface bg-tokyo-surface/50 text-tokyo-muted hover:text-tokyo-base hover:bg-tokyo-cyan hover:border-tokyo-cyan transition-all text-base font-mono font-bold"
            >
              GitHub
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
