import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { personalInfo } from '../data/resume';
import { GithubIcon, LinkedinIcon } from './ui/icons';

const links = [
  { label: 'Email', href: `mailto:${personalInfo.email}`, icon: <Mail size={16} />, external: false },
  { label: 'GitHub', href: personalInfo.github, icon: <GithubIcon size={16} />, external: true },
  { label: 'LinkedIn', href: personalInfo.linkedin, icon: <LinkedinIcon size={16} />, external: true },
];

const Hero = () => (
  <section id="home" className="px-6 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative max-w-5xl mx-auto flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-12"
    >
      <div className="max-w-2xl">
        <p className="text-tokyo-purple font-medium mb-2">Hi, I'm</p>
        <h1 className="text-5xl md:text-6xl font-bold text-tokyo-fg tracking-tight mb-5">{personalInfo.name}</h1>
        <p className="text-lg md:text-xl text-tokyo-muted leading-relaxed">{personalInfo.tagline}</p>

        <div className="flex flex-wrap gap-3 mt-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-lg border border-tokyo-border bg-tokyo-card px-4 py-2 text-sm text-tokyo-fg hover:border-tokyo-purple hover:text-tokyo-purple hover:-translate-y-0.5 transition-all"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="relative shrink-0 self-start md:self-auto">
        <div className="absolute -inset-6 rounded-full bg-tokyo-purple/25 blur-3xl" aria-hidden />
        <img
          src="/assets/images/jude.jpg"
          alt={personalInfo.name}
          className="relative w-36 h-36 md:w-56 md:h-56 rounded-full object-cover border-4 border-tokyo-purple/40"
        />
      </div>
    </motion.div>
  </section>
);

export default Hero;
