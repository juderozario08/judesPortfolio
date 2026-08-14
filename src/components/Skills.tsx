import { skills } from '../data/resume';
import { Section } from './ui/Section';

import { 
  SiCplusplus, SiRust, SiGo, SiC, SiLinux, SiCmake, SiVim,
  SiDotnet, SiNodedotjs, SiMongodb, SiPython,
  SiReact, SiTypescript, SiTailwindcss, SiBootstrap,
  SiGit, SiMysql
} from 'react-icons/si';
import { FaJava, FaDatabase, FaCss3Alt } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { TbBrandCSharp } from 'react-icons/tb';

const iconMap: Record<string, React.ReactNode> = {
  "C++": <SiCplusplus />,
  "Rust": <SiRust />,
  "Go": <SiGo />,
  "C": <SiC />,
  "Linux/Unix": <SiLinux />,
  "CMake": <SiCmake />,
  "Vim": <SiVim />,
  "ASP.NET Core": <SiDotnet />,
  "Entity Framework": <SiDotnet />, 
  "Node.js/Express": <SiNodedotjs />,
  "SQL Server": <FaDatabase />,
  "MongoDB": <SiMongodb />,
  "React Native": <SiReact />,
  "TypeScript/JavaScript": <SiTypescript />, 
  "Tailwind": <SiTailwindcss />,
  "Bootstrap": <SiBootstrap />,
  "HTML/CSS": <FaCss3Alt />,
  "Git/GitHub": <SiGit />,
  "Azure": <VscAzure />,
  "Java": <FaJava />,
  "C#": <TbBrandCSharp />,
  "Python": <SiPython />,
  "SQL": <SiMysql />
};

const SkillCategory = ({ title, items }: { title: string, items: string[] }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold text-tokyo-fg mb-4 border-b border-tokyo-surface pb-2">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {items.map((skill, i) => (
        <span key={i} className="flex items-center gap-2 text-sm font-mono text-tokyo-muted bg-tokyo-surface px-4 py-2 rounded-md border border-transparent hover:border-tokyo-purple/50 hover:text-tokyo-purple transition-colors">
          {iconMap[skill] && <span className="text-lg opacity-80">{iconMap[skill]}</span>}
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <Section id="skills" number="02" title="Technical Skills" color="tokyo-cyan">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <div>
          <SkillCategory title="Systems & Low-Level" items={skills.systems} />
          <SkillCategory title="Backend & APIs" items={skills.backend} />
        </div>
        <div>
          <SkillCategory title="Frontend" items={skills.frontend} />
          <SkillCategory title="Tools & Cloud" items={skills.tools} />
          <SkillCategory title="Other" items={skills.other} />
        </div>
      </div>
    </Section>
  );
};

export default Skills;
