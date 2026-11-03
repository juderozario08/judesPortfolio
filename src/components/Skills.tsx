import { skills } from '../data/resume';
import { Section } from './ui/Section';
import { TechChip } from './ui/TechChip';

const groups = [
  { title: 'Languages', items: skills.languages },
  { title: 'Backend', items: skills.backend },
  { title: 'Frontend', items: skills.frontend },
  { title: 'Systems', items: skills.systems },
  { title: 'ML & Data', items: skills.ml },
  { title: 'Tools', items: skills.tools },
];

const Skills = () => (
  <Section id="skills" title="Skills & Technologies" accent="green">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {groups.map((group) => (
        <div key={group.title} className="rounded-xl border border-tokyo-border bg-tokyo-card p-5 transition-colors hover:border-tokyo-purple/50">
          <h3 className="font-semibold text-tokyo-fg mb-4">{group.title}</h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <TechChip key={item} name={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;
