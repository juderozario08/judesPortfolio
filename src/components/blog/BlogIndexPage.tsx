import { blogPosts } from '../../data/blogs';
import { BlogTopBar } from './BlogTopBar';

interface BlogIndexPageProps {
  onNavigateHome: (targetSection?: string) => void;
  onSelectPost: (slug: string) => void;
}

export const BlogIndexPage = ({ onNavigateHome, onSelectPost }: BlogIndexPageProps) => (
  <div className="min-h-screen bg-tokyo-base text-tokyo-fg pb-24">
    <BlogTopBar onNavigateHome={onNavigateHome} />

    <main className="max-w-3xl mx-auto px-6 pt-16">
      <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
      <p className="text-lg text-tokyo-muted leading-relaxed mb-12">
        Notes on how I built my projects: the design decisions, what went wrong, and what I'd change.
      </p>

      <div className="divide-y divide-tokyo-border">
        {blogPosts.map((post) => (
          <article key={post.slug} className="py-8 first:pt-0">
            <p className="text-sm text-tokyo-comment mb-2">
              {post.date} · {post.readTime} · {post.projectTitle}
            </p>
            <h2 className="text-2xl font-semibold leading-snug mb-2">
              <button
                onClick={() => onSelectPost(post.slug)}
                className="text-left text-tokyo-fg hover:text-tokyo-purple transition-colors"
              >
                {post.title}
              </button>
            </h2>
            <p className="text-tokyo-muted leading-relaxed mb-3">{post.subtitle}</p>
            <button onClick={() => onSelectPost(post.slug)} className="text-sm text-tokyo-purple hover:underline">
              Read →
            </button>
          </article>
        ))}
      </div>
    </main>
  </div>
);
