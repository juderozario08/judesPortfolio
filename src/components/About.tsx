import { personalInfo } from '../data/resume';
import { Section } from './ui/Section';

const About = () => {
  return (
    <Section id="about" number="01" title="About Me" color="tokyo-purple">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 text-tokyo-muted text-lg leading-relaxed space-y-6">
          <p>
            I am a passionate Computer Science student at {personalInfo.university}, driven by a deep curiosity for how things work under the hood. I specialize in both systems-level programming and full-stack development, always looking to bridge the gap between low-level performance and high-level design.
          </p>
          <p>
            My approach to software engineering centers around <span className="text-tokyo-cyan font-semibold">clean architecture</span>, robust performance, and writing code that is as elegant as the user experiences it creates. Whether I'm tinkering with C++ or building fluid frontends in React, I strive for excellence in every line.
          </p>
          <p>
            When I'm not studying or coding, you can find me exploring new technologies, contributing to open-source, or endlessly optimizing my Neovim config.
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
