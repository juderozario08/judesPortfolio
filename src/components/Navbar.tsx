import { motion } from 'framer-motion';
import { personalInfo } from '../data/resume';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md bg-tokyo-surface/70 border-b border-tokyo-surface/50 shadow-lg"
    >
      <div className="text-2xl font-bold text-tokyo-purple tracking-tighter neon-text-purple">
        {"<Jude />"}
      </div>
      <div className="hidden md:flex gap-6 text-sm font-mono text-tokyo-muted">
        <a href="#home" className="hover:text-tokyo-cyan transition-colors">Home</a>
        <a href="#about" className="hover:text-tokyo-cyan transition-colors">About</a>
        <a href="#skills" className="hover:text-tokyo-cyan transition-colors">Skills</a>
        <a href="#experience" className="hover:text-tokyo-cyan transition-colors">Experience</a>
        <a href="#projects" className="hover:text-tokyo-cyan transition-colors">Projects</a>
        <a href="#contact" className="hover:text-tokyo-cyan transition-colors">Contact</a>
      </div>
      <div className="hidden md:block">
        <a 
          href={personalInfo.github} 
          target="_blank" 
          rel="noreferrer"
          className="px-4 py-2 rounded-md border border-tokyo-surface text-tokyo-muted hover:text-tokyo-cyan hover:border-tokyo-cyan transition-all text-sm font-mono"
        >
          GitHub
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
