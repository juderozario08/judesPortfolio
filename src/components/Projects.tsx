import { ArrowRight } from 'lucide-react';
import { projects, type Accent } from '../data/resume';
import { Section } from './ui/Section';
import { TechChip } from './ui/TechChip';
import { GithubIcon } from './ui/icons';

interface ProjectsProps {
  onOpenBlog: (slug: string) => void;
}

const ACCENT: Record<Accent, { text: string; hoverText: string }> = {
  purple: { text: 'text-tokyo-purple', hoverText: 'hover:text-tokyo-purple' },
  cyan: { text: 'text-tokyo-cyan', hoverText: 'hover:text-tokyo-cyan' },
  green: { text: 'text-tokyo-green', hoverText: 'hover:text-tokyo-green' },
  blue: { text: 'text-tokyo-blue', hoverText: 'hover:text-tokyo-blue' },
};

const Projects = ({ onOpenBlog }: ProjectsProps) => (
  <Section id="projects" title="Projects" accent="cyan">
    <div className="space-y-6">
      {projects.map((project) => {
        const accent = ACCENT[project.accent];
        const { blogSlug } = project;
        const linkClass = `group self-start inline-flex items-center gap-1.5 text-sm font-medium ${accent.text} hover:text-tokyo-fg transition-colors`;
        return (
          <article
            key={project.id}
            className="rounded-xl border border-tokyo-border bg-tokyo-card p-6 sm:p-7 grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6 md:gap-8 transition-colors hover:border-tokyo-comment"
          >
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="w-full aspect-video object-cover rounded-lg border border-tokyo-border"
            />

            <div className="flex flex-col min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-2xl font-semibold text-tokyo-fg">{project.title}</h3>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-tokyo-muted ${accent.hoverText} transition-colors p-1 -m-1 shrink-0`}
                  aria-label={`${project.title} source on GitHub`}
                  title="Source on GitHub"
                >
                  <GithubIcon size={22} />
                </a>
              </div>
              <p className="text-tokyo-muted leading-relaxed mb-4">{project.description}</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-tokyo-muted leading-relaxed marker:text-tokyo-comment mb-5">
                {project.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((tech) => (
                  <TechChip key={tech} name={tech} accent={project.accent} />
                ))}
              </div>
              {blogSlug ? (
                <button onClick={() => onOpenBlog(blogSlug)} className={linkClass}>
                  Read the write-up
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <a href={project.github} target="_blank" rel="noreferrer" className={linkClass}>
                  View on GitHub
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  </Section>
);

export default Projects;
