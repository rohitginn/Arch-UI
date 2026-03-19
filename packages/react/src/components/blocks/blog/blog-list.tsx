'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogListPost {
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  author?: { name: string; avatar?: string };
  readTime?: string;
  date?: string;
  href: string;
}

export interface BlogListProps {
  heading?: string;
  subheading?: string;
  posts: BlogListPost[];
  background?: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function BlogList({
  heading,
  subheading,
  posts,
  background,
  className,
}: BlogListProps) {
  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      <div className="mx-auto max-w-4xl space-y-6">
        {posts.map((post, i) => (
          <a
            key={i}
            href={post.href}
            className={cn(
              'group flex flex-col sm:flex-row gap-5 rounded-2xl p-4',
              'border border-[var(--glass-edge)]',
              'bg-[var(--glass-surface)] backdrop-blur-md',
              'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg'
            )}
          >
            {/* Thumbnail */}
            {post.image && (
              <div className="relative w-full sm:w-48 md:w-56 shrink-0 aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            {/* Copy */}
            <div className="flex flex-1 flex-col justify-center py-1">
              {post.category && (
                <span className="mb-2 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]">
                  {post.category}
                </span>
              )}
              <h3 className="text-base font-semibold text-[var(--glass-text)] mb-1 line-clamp-2 group-hover:text-[var(--glass-accent)] transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-[var(--glass-text)]/60 line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-[var(--glass-text)]/40 mt-auto">
                {post.author && (
                  <div className="flex items-center gap-1.5">
                    {post.author.avatar ? (
                      <img src={post.author.avatar} alt={post.author.name} className="h-5 w-5 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-[8px] font-semibold text-[var(--glass-accent)]">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                    <span>{post.author.name}</span>
                  </div>
                )}
                {post.date && <span>· {post.date}</span>}
                {post.readTime && <span>· {post.readTime}</span>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}

BlogList.displayName = 'BlogList';
export { BlogList };
