import { experience, leadership } from '../data/resume';
import { Section } from './ui/Section';
import { Card } from './ui/Card';

const ExperienceItem = ({ item, index }: { item: typeof experience[0] | typeof leadership[0], index: number }) => (
  <Card index={index} hoverColor="tokyo-purple" className="mb-6">
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
      <div>
        <h3 className="text-2xl font-bold text-tokyo-fg group-hover:text-tokyo-purple transition-colors">{item.title}</h3>
        <h4 className="text-lg text-tokyo-blue font-mono">{'company' in item ? item.company : item.organization}</h4>
      </div>
      <span className="text-tokyo-muted font-mono text-sm shrink-0 bg-tokyo-base px-3 py-1 rounded-full border border-tokyo-surface">
        {item.date}
      </span>
    </div>
    <ul className="list-none space-y-3 text-tokyo-muted leading-relaxed">
      {item.bullets.map((bullet: string, i: number) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-tokyo-purple font-mono font-bold mt-1 text-sm">{">"}</span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  </Card>
);

const Experience = () => {
  return (
    <Section id="experience" number="03" title="Experience & Leadership" color="tokyo-purple">
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-tokyo-fg mb-8 pl-4 border-l-2 border-tokyo-blue">Work Experience</h3>
        {experience.map((item, index) => (
          <ExperienceItem key={index} item={item} index={index} />
        ))}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-tokyo-fg mb-8 pl-4 border-l-2 border-tokyo-cyan">Leadership & Extracurriculars</h3>
        {leadership.map((item, index) => (
          <ExperienceItem key={index} item={item} index={index + experience.length} />
        ))}
      </div>
    </Section>
  );
};

export default Experience;
