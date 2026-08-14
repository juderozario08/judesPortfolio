import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { personalInfo } from '../data/resume';

const GithubIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="min-h-[60vh] py-24 px-6 flex flex-col items-center justify-center bg-tokyo-base relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ ease: "easeOut", duration: 0.6 }}
        className="text-center max-w-2xl z-10"
      >
        <p className="text-tokyo-cyan font-mono mb-4 text-sm tracking-widest">05. What's Next?</p>
        <h2 className="text-4xl md:text-6xl font-bold text-tokyo-fg mb-8">Let's Connect</h2>
        <p className="text-tokyo-muted text-lg mb-12 leading-relaxed">
          I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open!
        </p>
        
        <div className="flex justify-center gap-8">
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="text-tokyo-muted hover:text-tokyo-blue p-5 bg-tokyo-surface rounded-full shadow-lg border border-tokyo-surface hover:border-tokyo-blue/50 hover:shadow-[0_0_20px_rgba(122,162,247,0.4)]"
          >
            <GithubIcon size={28} />
          </motion.a>
          
          <motion.a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="text-tokyo-muted hover:text-tokyo-purple p-5 bg-tokyo-surface rounded-full shadow-lg border border-tokyo-surface hover:border-tokyo-purple/50 hover:shadow-[0_0_20px_rgba(187,154,247,0.4)]"
          >
            <LinkedinIcon size={28} />
          </motion.a>
          
          <motion.a
            href={`mailto:${personalInfo.email}`}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className="text-tokyo-muted hover:text-tokyo-cyan p-5 bg-tokyo-surface rounded-full shadow-lg border border-tokyo-surface hover:border-tokyo-cyan/50 hover:shadow-[0_0_20px_rgba(125,207,255,0.4)]"
          >
            <Mail size={28} />
          </motion.a>
        </div>
      </motion.div>
      
      <div className="mt-32 text-tokyo-muted text-sm font-mono flex flex-col items-center z-10">
        <p>Built with React & Framer Motion</p>
        <p className="mt-2 text-xs opacity-50">Tokyo Night Theme</p>
      </div>
    </section>
  );
};

export default Contact;
