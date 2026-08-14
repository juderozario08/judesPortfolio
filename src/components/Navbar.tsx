import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/resume';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="fixed top-6 left-1/2 z-50 flex items-center justify-between w-[95%] max-w-6xl px-6 md:px-8 py-4 rounded-full backdrop-blur-md bg-tokyo-base/85 border border-tokyo-surface shadow-[0_5_20px_rgba(0,0,0,0.5)]"
    >
      <div className="text-2xl font-bold text-tokyo-purple tracking-tighter neon-text-purple">
        {"<Jude />"}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-2 text-base font-mono font-bold">
        <a href="#home" className="px-4 py-1.5 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all">
          <span className="text-tokyo-blue mr-2 opacity-70">1</span>Home
        </a>
        <a href="#about" className="px-4 py-1.5 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all">
          <span className="text-tokyo-blue mr-2 opacity-70">2</span>About
        </a>
        <a href="#skills" className="px-4 py-1.5 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all">
          <span className="text-tokyo-blue mr-2 opacity-70">3</span>Skills
        </a>
        <a href="#experience" className="px-4 py-1.5 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all">
          <span className="text-tokyo-blue mr-2 opacity-70">4</span>Experience
        </a>
        <a href="#projects" className="px-4 py-1.5 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all">
          <span className="text-tokyo-blue mr-2 opacity-70">5</span>Projects
        </a>
      </div>

      <div className="hidden md:block">
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
        <button onClick={toggleMenu} className="text-tokyo-fg hover:text-tokyo-cyan focus:outline-none transition-colors p-2">
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
            <a href="#home" onClick={closeMenu} className="px-4 py-3 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all font-mono font-bold text-lg">
              <span className="text-tokyo-blue mr-3 opacity-70">1</span>Home
            </a>
            <a href="#about" onClick={closeMenu} className="px-4 py-3 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all font-mono font-bold text-lg">
              <span className="text-tokyo-blue mr-3 opacity-70">2</span>About
            </a>
            <a href="#skills" onClick={closeMenu} className="px-4 py-3 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all font-mono font-bold text-lg">
              <span className="text-tokyo-blue mr-3 opacity-70">3</span>Skills
            </a>
            <a href="#experience" onClick={closeMenu} className="px-4 py-3 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all font-mono font-bold text-lg">
              <span className="text-tokyo-blue mr-3 opacity-70">4</span>Experience
            </a>
            <a href="#projects" onClick={closeMenu} className="px-4 py-3 rounded-md text-tokyo-muted hover:bg-tokyo-surface hover:text-tokyo-cyan transition-all font-mono font-bold text-lg">
              <span className="text-tokyo-blue mr-3 opacity-70">5</span>Projects
            </a>
            <div className="h-px bg-tokyo-surface my-2 mx-2"></div>
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
