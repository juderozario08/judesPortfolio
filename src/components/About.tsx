import { personalInfo } from '../data/resume';
import { Section } from './ui/Section';
import { TerminalHeader } from './ui/TerminalHeader';

const About = () => {
  return (
    <Section id="about" number="01" title="About Me" color="tokyo-purple">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 text-tokyo-muted text-lg leading-relaxed space-y-6">
          <p>
            Hey there! I'm currently studying Computer Science at {personalInfo.university}. More than anything, I just really enjoy tearing things apart to see how they tick. Whether that means wrestling with C++ memory management at 2 AM or obsessing over the perfect React component structure, I genuinely love the process of building things from scratch.
          </p>
          <p>
            My main goal right now is writing <span className="text-tokyo-cyan font-semibold">clean, sensible code</span>, the kind I won't be embarrassed to look at six months from now. I'm a bit of a performance nerd, but I also think that if an app isn't actually enjoyable to use, the speed doesn't matter much.
          </p>
          <p>
            Outside of classes and coding marathons, you can usually find me falling down a rabbit hole trying a new framework, or completely breaking (and then fixing) my setup. (I use Arch Linux and Neovim btw).
          </p>
        </div>
        <div className="flex-1 bg-tokyo-surface p-0 flex flex-col h-full border border-transparent rounded-xl">
          <TerminalHeader title="user@archlinux:~/education" />
          
          <div className="p-8 z-10 relative">
          <h3 className="text-2xl font-bold text-tokyo-fg mb-6">Education</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-semibold text-tokyo-blue">{personalInfo.university}</h4>
              <p className="text-tokyo-muted font-mono">{personalInfo.program}</p>
            </div>
            
            <div>
              <p className="text-tokyo-fg"><span className="text-tokyo-purple font-mono">CGPA:</span> {personalInfo.cgpa}</p>
            </div>
            
            <div>
              <p className="text-tokyo-cyan font-mono text-sm mb-1">Awards</p>
              <p className="text-tokyo-muted text-sm leading-relaxed">{personalInfo.awards}</p>
            </div>

            <div>
              <p className="text-tokyo-cyan font-mono text-sm mb-1">Relevant Coursework</p>
              <p className="text-tokyo-muted text-sm leading-relaxed">{personalInfo.coursework}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
