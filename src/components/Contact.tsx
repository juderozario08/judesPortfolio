import { Mail } from 'lucide-react';
import { personalInfo } from '../data/resume';
import { Section } from './ui/Section';
import { GithubIcon, LinkedinIcon } from './ui/icons';

const links = [
  { label: 'Email me', href: `mailto:${personalInfo.email}`, icon: <Mail size={18} />, external: false, primary: true },
  { label: 'GitHub', href: personalInfo.github, icon: <GithubIcon size={18} />, external: true, primary: false },
  { label: 'LinkedIn', href: personalInfo.linkedin, icon: <LinkedinIcon size={18} />, external: true, primary: false },
];

const Contact = () => (
  <>
    <Section id="contact" title="Get in Touch">
      <div className="rounded-xl border border-tokyo-border bg-tokyo-card p-8 sm:p-10">
        <p className="text-tokyo-muted text-lg leading-relaxed max-w-2xl mb-2">
          I'm looking for new opportunities. If you have a role, a project, or just a question, email is the best way to
          reach me.
        </p>
        <p className="text-tokyo-comment text-sm mb-8 break-all">{personalInfo.email}</p>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                link.primary
                  ? 'bg-tokyo-purple text-tokyo-base hover:bg-tokyo-purple/85'
                  : 'border border-tokyo-border text-tokyo-fg hover:border-tokyo-purple hover:text-tokyo-purple'
              }`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
    <footer className="px-6 py-10 border-t border-tokyo-border">
      <p className="max-w-5xl mx-auto text-sm text-tokyo-comment">
        © {new Date().getFullYear()} {personalInfo.name}
      </p>
    </footer>
  </>
);

export default Contact;
