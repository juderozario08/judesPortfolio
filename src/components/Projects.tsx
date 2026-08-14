import { projects } from '../data/resume';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { FolderGit2 } from 'lucide-react';

const GithubIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <Card index={index} hoverColor={project.color as "tokyo-blue" | "tokyo-purple" | "tokyo-cyan"}>
      <div className="flex justify-between items-center mb-6">
        <FolderGit2 size={36} className={`text-${project.color} group-hover:text-tokyo-cyan transition-colors`} />
        <div className="flex gap-4">
          <a href={project.github} className="text-tokyo-muted hover:text-tokyo-cyan transition-colors" target="_blank" rel="noreferrer">
            <GithubIcon size={22} />
          </a>
        </div>
      </div>
      
      <h3 className={`text-2xl font-bold text-tokyo-fg mb-3 group-hover:text-${project.color} transition-colors`}>{project.title}</h3>
      <p className="text-tokyo-muted mb-6 flex-grow leading-relaxed">
        {project.description}
      </p>
      
      <ul className="list-none space-y-2 text-sm text-tokyo-muted mb-6">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`text-${project.color} font-mono font-bold mt-0.5`}>{">"}</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-tokyo-surface/50">
        {project.tech.map((tech: string, i: number) => (
          <span key={i} className="text-xs font-mono text-tokyo-muted bg-tokyo-base px-2 py-1 rounded-md border border-tokyo-surface">
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
};

const Projects = () => {
  return (
    <Section id="projects" number="04" title="Technical Projects" color="tokyo-blue">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
