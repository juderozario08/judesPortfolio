import { motion } from 'framer-motion';
import { personalInfo } from '../data/resume';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="fixed top-6 left-1/2 z-50 flex items-center justify-between w-[95%] max-w-6xl px-8 py-4 rounded-full backdrop-blur-md bg-tokyo-base/85 border border-tokyo-surface shadow-[0_5_20px_rgba(0,0,0,0.5)]"
    >
      <div className="text-2xl font-bold text-tokyo-purple tracking-tighter neon-text-purple">
        {"<Jude />"}
      </div>
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
    </motion.nav>
  );
};

export default Navbar;
