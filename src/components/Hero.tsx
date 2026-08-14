import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo } from '../data/resume';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-tokyo-purple/20 rounded-full blur-[80px] will-change-transform"
        />
        <motion.div 
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-tokyo-blue/20 rounded-full blur-[100px] will-change-transform"
        />
      </div>

      {/* Floating geometric shape */}
      <motion.div 
        animate={{ 
          y: [-15, 15, -15],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
        className="mb-12 text-tokyo-cyan opacity-80 drop-shadow-[0_0_15px_rgba(125,207,255,0.5)] will-change-transform"
      >
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="50" cy="50" r="48" />
          <ellipse cx="50" cy="50" rx="48" ry="16" />
          <ellipse cx="50" cy="50" rx="16" ry="48" />
          <ellipse cx="50" cy="50" rx="48" ry="16" transform="rotate(45 50 50)" />
          <ellipse cx="50" cy="50" rx="48" ry="16" transform="rotate(-45 50 50)" />
          <line x1="2" y1="50" x2="98" y2="50" />
          <line x1="50" y1="2" x2="50" y2="98" />
          <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Text Content */}
      <div className="z-10 text-center px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 relative rounded-full p-1 bg-gradient-to-tr from-tokyo-purple via-tokyo-blue to-tokyo-cyan"
        >
          <img 
            src="/assets/images/jude.jpg" 
            alt="Jude Rozario" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-tokyo-base"
          />
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 min-h-[90px] md:min-h-[110px] tracking-tight">
          <TypeAnimation
            sequence={[
              `Hi, I'm ${personalInfo.name.split(' ')[0]}.`,
              1000,
            ]}
            wrapper="span"
            speed={40}
            className="text-tokyo-fg"
            cursor={true}
            repeat={1}
          />
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, ease: "easeOut", duration: 0.6 }}
          className="text-lg md:text-2xl text-tokyo-muted mb-12 font-mono"
        >
          {personalInfo.program.split(' ')[1]} {personalInfo.program.split(' ')[2]} | {personalInfo.cgpa.split(' ')[0]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, ease: "easeOut", duration: 0.6 }}
        >
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(125, 207, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="inline-block px-10 py-4 rounded-md border border-tokyo-cyan text-tokyo-cyan font-bold tracking-widest uppercase text-sm shadow-[0_0_10px_rgba(125,207,255,0.2)] bg-tokyo-surface/30 backdrop-blur-sm hover:bg-tokyo-cyan/10"
          >
            View My Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
