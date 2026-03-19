'use client';

import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogContentHeaderProps {
  /** Article title */
  title: string;
  /** Category label */
  category?: string;
  /** Hero / cover image */
  image?: string;
  /** Author info */
  author?: {
    name: string;
    avatar?: string;
  };
  /** Published date */
  date?: string;
  /** Read time */
  readTime?: string;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function BlogContentHeader({
  title,
  category,
  image,
  author,
  date,
  readTime,
  className,
}: BlogContentHeaderProps) {
  return (
    <header className={cn('relative', className)}>
      {/* Hero image */}
      {image && (
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl mb-8">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        {/* Category badge */}
        {category && (
          <span className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]">
            {category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--glass-text)] mb-6">
          {title}
        </h1>

        {/* Author info row */}
        {(author || date || readTime) && (
          <div className="flex items-center gap-3 pb-8 border-b border-[var(--glass-edge)]/30">
            {author && (
              <>
                {author.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--glass-edge)]"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-sm font-semibold text-[var(--glass-accent)]">
                    {author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-[var(--glass-text)]">
                    {author.name}
                  </div>
                  <div className="flex gap-2 text-xs text-[var(--glass-text)]/50">
                    {date && <span>{date}</span>}
                    {readTime && <span>· {readTime}</span>}
                  </div>
                </div>
              </>
            )}
            {!author && (date || readTime) && (
              <div className="text-sm text-[var(--glass-text)]/50">
                {date}{date && readTime && ' · '}{readTime}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

BlogContentHeader.displayName = 'BlogContentHeader';
export { BlogContentHeader };
