import { projects } from '../data/resume';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { GithubIcon } from './ui/icons';
import { FolderGit2, BookOpen } from 'lucide-react';

type ProjectItem = (typeof projects)[number];

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpenBlog?: (slug: string) => void;
}

const ProjectCard = ({ project, index, onOpenBlog }: ProjectCardProps) => {
  const blogSlug = 'blogSlug' in project ? project.blogSlug : undefined;
  const hasBlog = Boolean(blogSlug);

  return (
    <Card index={index} hoverColor={project.color as "tokyo-blue" | "tokyo-purple" | "tokyo-cyan"}>
      <div className="flex justify-between items-center mb-6">
        <FolderGit2 size={36} className={`text-${project.color} group-hover:text-tokyo-cyan transition-colors`} />
        
        <div className="flex items-center gap-3">
          {hasBlog && blogSlug && (
            <button
              onClick={() => onOpenBlog?.(blogSlug)}
              className="px-3 py-1.5 rounded-lg border border-tokyo-purple/50 bg-tokyo-purple/15 text-tokyo-purple hover:bg-tokyo-purple hover:text-tokyo-base text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_12px_rgba(187,154,247,0.4)]"
              title="Read technical blog post"
            >
              <BookOpen size={14} />
              <span>Read Blog</span>
            </button>
          )}

          <a 
            href={project.github} 
            className="text-tokyo-muted hover:text-tokyo-cyan transition-colors p-1" 
            target="_blank" 
            rel="noreferrer"
            title="View GitHub Repository"
          >
            <GithubIcon size={22} />
          </a>
        </div>
      </div>
      
      <h3 
        onClick={() => hasBlog && blogSlug && onOpenBlog?.(blogSlug)}
        className={`text-2xl font-bold text-tokyo-fg mb-3 group-hover:text-${project.color} transition-colors ${
          hasBlog ? "cursor-pointer hover:underline" : ""
        }`}
      >
        {project.title}
      </h3>

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

      {/* Prominent Blog Action Banner */}
      {hasBlog && blogSlug && (
        <div className="mb-4">
          <button
            onClick={() => onOpenBlog?.(blogSlug)}
            className="w-full py-2.5 px-4 rounded-xl border border-tokyo-purple/40 bg-tokyo-purple/10 hover:bg-tokyo-purple/20 text-tokyo-purple hover:text-tokyo-cyan font-mono text-xs font-bold transition-all flex items-center justify-between group/btn shadow-inner"
          >
            <span className="flex items-center gap-2">
              <BookOpen size={15} />
              <span>Read Technical Deep-Dive & Tradeoffs</span>
            </span>
            <span className="text-tokyo-cyan group-hover/btn:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      )}
      
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

interface ProjectsProps {
  onOpenBlog?: (slug: string) => void;
}

const Projects = ({ onOpenBlog }: ProjectsProps) => {
  return (
    <Section id="projects" number="04" title="Technical Projects" color="tokyo-blue">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <ProjectCard 
            key={i} 
            project={project} 
            index={i} 
            onOpenBlog={onOpenBlog}
          />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
