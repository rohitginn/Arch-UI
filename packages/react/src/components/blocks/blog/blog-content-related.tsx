'use client';

import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface RelatedPost {
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  href: string;
}

export interface BlogContentRelatedProps {
  /** Section title */
  heading?: string;
  /** Related posts (2-3 recommended) */
  posts: RelatedPost[];
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function BlogContentRelated({
  heading = 'Related articles',
  posts,
  className,
}: BlogContentRelatedProps) {
  return (
    <section className={cn('py-12', className)}>
      <h2 className="text-xl font-bold text-[var(--glass-text)] mb-6 text-center">
        {heading}
      </h2>

      <div
        className={cn(
          'grid gap-6',
          posts.length === 1 && 'max-w-md mx-auto',
          posts.length === 2 && 'md:grid-cols-2 max-w-3xl mx-auto',
          posts.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3'
        )}
      >
        {posts.map((post, i) => (
          <a
            key={i}
            href={post.href}
            className={cn(
              'group flex flex-col rounded-2xl overflow-hidden',
              'border border-[var(--glass-edge)]',
              'bg-[var(--glass-surface)] backdrop-blur-md',
              'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
            )}
          >
            {post.image && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-5">
              {post.category && (
                <span className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]">
                  {post.category}
                </span>
              )}
              <h3 className="text-sm font-semibold text-[var(--glass-text)] line-clamp-2 group-hover:text-[var(--glass-accent)] transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-1 text-xs text-[var(--glass-text)]/60 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

BlogContentRelated.displayName = 'BlogContentRelated';
export { BlogContentRelated };
