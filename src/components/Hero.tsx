import { motion } from 'framer-motion';
import { personalInfo } from '../data/resume';
import { scrollToSection } from '../utils/scrollTo';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-tokyo-base">
      <div className="z-10 text-center px-4 flex flex-col items-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 relative rounded-full p-1"
        >
          <img
            src="/assets/images/jude.jpg"
            alt="Jude Rozario"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-tokyo-surface shadow-sm"
          />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-tokyo-fg tracking-tight">
          Hi, I'm {personalInfo.name.split(' ')[0]}.
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: "easeOut", duration: 0.6 }}
          className="text-lg md:text-2xl text-tokyo-muted mb-12 font-mono"
        >
          {personalInfo.program.split(' ')[1]} {personalInfo.program.split(' ')[2]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, ease: "easeOut", duration: 0.6 }}
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects', { updateHash: true });
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="inline-block px-10 py-4 rounded-md border border-tokyo-cyan text-tokyo-cyan font-bold tracking-widest uppercase text-sm hover:bg-tokyo-cyan/10 cursor-pointer transition-colors"
          >
            View My Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
