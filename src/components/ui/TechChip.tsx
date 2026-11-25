import type { IconType } from 'react-icons';
import {
  SiCplusplus, SiC, SiGo, SiRust, SiTypescript, SiPython, SiLinux, SiCmake, SiDotnet, SiGin,
  SiNodedotjs, SiPostgresql, SiRedis, SiMongodb, SiReact, SiTailwindcss, SiBootstrap, SiHtml5,
  SiPytorch, SiScikitlearn, SiPandas, SiGit, SiNeovim, SiJavascript, SiNumpy,
  SiDjango, SiCelery, SiDocker, SiKotlin, SiAndroid, SiApple,
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';
import { TbBrandCSharp, TbPlugConnected, TbSql } from 'react-icons/tb';
import { VscAzure } from 'react-icons/vsc';

const ICONS: Record<string, IconType> = {
  'C++': SiCplusplus,
  C: SiC,
  Go: SiGo,
  'Go (Gin)': SiGo,
  Rust: SiRust,
  'TypeScript/JavaScript': SiTypescript,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  'C#': TbBrandCSharp,
  Java: FaJava,
  Python: SiPython,
  SQL: TbSql,
  Linux: SiLinux,
  CMake: SiCmake,
  'ASP.NET Core': SiDotnet,
  'Entity Framework': SiDotnet,
  Gin: SiGin,
  'Node.js/Express': SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  'SQL Server': FaDatabase,
  MongoDB: SiMongodb,
  WebSockets: TbPlugConnected,
  React: SiReact,
  'React Native': SiReact,
  Tailwind: SiTailwindcss,
  Bootstrap: SiBootstrap,
  'HTML/CSS': SiHtml5,
  PyTorch: SiPytorch,
  'scikit-learn': SiScikitlearn,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  'Git/GitHub': SiGit,
  Azure: VscAzure,
  Neovim: SiNeovim,
  Django: SiDjango,
  Celery: SiCelery,
  Docker: SiDocker,
  Kotlin: SiKotlin,
  Android: SiAndroid,
  macOS: SiApple,
};

export type ChipAccent = 'purple' | 'cyan' | 'green' | 'blue';

const ACCENT: Record<ChipAccent, { border: string; icon: string }> = {
  purple: { border: 'border-tokyo-purple/40', icon: 'text-tokyo-purple' },
  cyan: { border: 'border-tokyo-cyan/40', icon: 'text-tokyo-cyan' },
  green: { border: 'border-tokyo-green/40', icon: 'text-tokyo-green' },
  blue: { border: 'border-tokyo-blue/40', icon: 'text-tokyo-blue' },
};

/** Small outlined pill with the technology's logo, used in skill cards, project stacks and the timeline. */
export const TechChip = ({ name, accent = 'purple' }: { name: string; accent?: ChipAccent }) => {
  const Icon = ICONS[name];
  const colors = ACCENT[accent];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${colors.border} bg-tokyo-base/40 px-2.5 py-1 text-xs text-tokyo-fg`}
    >
      {Icon && <Icon className={`${colors.icon} shrink-0`} aria-hidden />}
      {name}
    </span>
  );
};
