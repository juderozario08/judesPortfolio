import { GraduationCap } from 'lucide-react';
import { personalInfo } from '../data/resume';
import { Section } from './ui/Section';

const About = () => (
  <Section id="about" title="About Me">
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 items-start">
      <div className="text-tokyo-muted text-lg leading-relaxed space-y-5">
        <p>
          I'm studying Computer Science at {personalInfo.university}. More than anything, I enjoy taking things apart to
          see how they work, whether that's C++ memory management at 2 AM or getting a React component structure right.
          I like building things from scratch.
        </p>
        <p>
          Right now I'm focused on writing clean, sensible code: the kind I won't be embarrassed by six months from now.
          I care a lot about performance, but if an app isn't pleasant to use, the speed doesn't matter much.
        </p>
        <p>
          Outside of class you'll usually find me trying a new framework, or breaking (and then fixing) my setup. I use
          Arch Linux and Neovim, btw.
        </p>
      </div>

      <div className="rounded-xl border border-tokyo-border bg-tokyo-card p-6">
        <div className="flex items-center gap-2 text-tokyo-purple mb-4">
          <GraduationCap size={20} aria-hidden />
          <h3 className="font-semibold text-tokyo-fg">Education</h3>
        </div>
        <p className="text-tokyo-fg font-medium">{personalInfo.university}</p>
        <p className="text-sm text-tokyo-purple mb-4">
          {personalInfo.program} · CGPA {personalInfo.cgpa}
        </p>
        <dl className="space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="text-tokyo-comment mb-0.5">Awards</dt>
            <dd className="text-tokyo-muted">{personalInfo.awards}</dd>
          </div>
          <div>
            <dt className="text-tokyo-comment mb-0.5">Relevant coursework</dt>
            <dd className="text-tokyo-muted">{personalInfo.coursework}</dd>
          </div>
        </dl>
      </div>
    </div>
  </Section>
);

export default About;
