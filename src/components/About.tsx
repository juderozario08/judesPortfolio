import { personalInfo } from '../data/resume';
import { Section } from './ui/Section';

const About = () => {
  return (
    <Section id="about" number="01" title="About Me" color="tokyo-purple">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 text-tokyo-muted text-lg leading-relaxed space-y-6">
          <p>
            I'm a Computer Science student at {personalInfo.university} who just really likes figuring out how things work. Whether it's digging into memory management in C++ or building a slick frontend in React, I love the whole process of turning an idea into something real.
          </p>
          <p>
            I try to focus on <span className="text-tokyo-cyan font-semibold">clean architecture</span> and writing code that I won't hate looking at 6 months from now. I care a lot about performance, but I care just as much about building things that actually feel good to use.
          </p>
          <p>
            When I'm not studying or deep into a project, I'm usually messing around with some new framework, contributing to open-source stuff, or spending way too much time tweaking my Neovim config.
          </p>
        </div>
        
        <div className="flex-1 bg-tokyo-surface/50 p-8 rounded-xl border border-tokyo-surface">
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
    </Section>
  );
};

export default About;
