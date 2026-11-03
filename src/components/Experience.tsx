import { experience, leadership } from '../data/resume';
import { Section } from './ui/Section';
import { Entry } from './ui/Entry';

export const Experience = () => (
  <Section id="experience" title="Experience" accent="blue">
    {experience.map((item, i) => (
      <Entry
        key={item.title + item.company}
        title={item.title}
        org={item.company}
        date={item.date}
        bullets={item.bullets}
        tech={item.tech}
        isLast={i === experience.length - 1}
      />
    ))}
  </Section>
);

export const Leadership = () => (
  <Section id="leadership" title="Leadership" accent="orange">
    {leadership.map((item, i) => (
      <Entry
        key={item.title + item.organization}
        title={item.title}
        org={item.organization}
        date={item.date}
        bullets={item.bullets}
        isLast={i === leadership.length - 1}
      />
    ))}
  </Section>
);
