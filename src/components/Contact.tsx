import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { personalInfo } from '../data/resume';
import { GithubIcon, LinkedinIcon } from './ui/icons';

const SOCIAL_HOVER_CLASSES = {
  'tokyo-blue': 'hover:text-tokyo-blue hover:border-tokyo-blue/50 hover:shadow-[0_0_20px_rgba(122,162,247,0.4)]',
  'tokyo-purple': 'hover:text-tokyo-purple hover:border-tokyo-purple/50 hover:shadow-[0_0_20px_rgba(187,154,247,0.4)]',
  'tokyo-cyan': 'hover:text-tokyo-cyan hover:border-tokyo-cyan/50 hover:shadow-[0_0_20px_rgba(125,207,255,0.4)]',
} as const;

type SocialHoverColor = keyof typeof SOCIAL_HOVER_CLASSES;

interface SocialLinkProps {
  href: string;
  hoverColor: SocialHoverColor;
  icon: React.ReactNode;
  external?: boolean;
}

const SocialLink = ({ href, hoverColor, icon, external = true }: SocialLinkProps) => (
  <motion.a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noreferrer' : undefined}
    whileHover={{ y: -5, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ ease: 'easeOut', duration: 0.2 }}
    className={`text-tokyo-muted p-5 bg-tokyo-surface rounded-full shadow-lg border border-tokyo-surface ${SOCIAL_HOVER_CLASSES[hoverColor]}`}
  >
    {icon}
  </motion.a>
);

const Contact = () => {
  return (
    <section id="contact" className="min-h-[60vh] py-24 px-6 flex flex-col items-center justify-center bg-transparent relative overflow-hidden">
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
          <SocialLink
            href={personalInfo.github}
            hoverColor="tokyo-blue"
            icon={<GithubIcon size={28} />}
          />
          <SocialLink
            href={personalInfo.linkedin}
            hoverColor="tokyo-purple"
            icon={<LinkedinIcon size={28} />}
          />
          <SocialLink
            href={`mailto:${personalInfo.email}`}
            hoverColor="tokyo-cyan"
            icon={<Mail size={28} />}
            external={false}
          />
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
