import type { BlogPost } from '../../data/blogs';

interface BlogPostHeroProps {
  post: BlogPost;
}

const METRIC_COLORS = [
  'text-tokyo-purple text-glow-purple',
  'text-tokyo-cyan text-glow-cyan',
  'text-tokyo-green text-glow-green',
  'text-tokyo-blue text-glow-blue',
];

export const BlogPostHero = ({ post }: BlogPostHeroProps) => (
  <header className="space-y-5">
    <p className="text-sm text-tokyo-comment">
      <span className="text-tokyo-purple font-medium">{post.projectTitle}</span> · {post.date} · {post.readTime}
    </p>
    <h1 className="text-3xl sm:text-4xl font-bold text-tokyo-fg tracking-tight leading-tight">{post.title}</h1>
    <p className="text-lg text-tokyo-muted leading-relaxed">{post.subtitle}</p>
    <p className="text-sm text-tokyo-comment">{post.tags.join(' · ')}</p>

    {post.metrics && post.metrics.length > 0 && (
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-tokyo-border">
        {post.metrics.map((m, i) => (
          <div key={m.label}>
            <dt className="text-xs text-tokyo-comment mb-1">{m.label}</dt>
            <dd className={`font-semibold ${METRIC_COLORS[i % METRIC_COLORS.length]}`}>{m.value}</dd>
          </div>
        ))}
      </dl>
    )}

    <p className="text-tokyo-fg/90 leading-relaxed">{post.heroSummary}</p>
  </header>
);
