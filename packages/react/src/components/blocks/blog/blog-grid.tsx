'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  /** Post title */
  title: string;
  /** Short excerpt */
  excerpt?: string;
  /** Cover image URL */
  image?: string;
  /** Category label */
  category?: string;
  /** Author info */
  author?: {
    name: string;
    avatar?: string;
  };
  /** Read time (e.g. "5 min read") */
  readTime?: string;
  /** Published date string */
  date?: string;
  /** Link to full article */
  href: string;
}

export interface BlogGridProps {
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** Blog posts */
  posts: BlogPost[];
  /** Number of columns */
  columns?: 2 | 3;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function BlogGrid({
  heading,
  subheading,
  posts,
  columns = 3,
  background,
  className,
}: BlogGridProps) {
  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      <div
        className={cn(
          'grid gap-6',
          columns === 2 && 'md:grid-cols-2 max-w-4xl mx-auto',
          columns === 3 && 'md:grid-cols-2 lg:grid-cols-3'
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
              'transition-all duration-300',
              'hover:-translate-y-1 hover:shadow-lg'
            )}
          >
            {/* Cover image */}
            {post.image && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {post.category && (
                  <span className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)] text-white">
                    {post.category}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-1 flex-col p-5">
              {/* Category (if no image) */}
              {!post.image && post.category && (
                <span className="mb-2 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]">
                  {post.category}
                </span>
              )}

              <h3 className="text-base font-semibold text-[var(--glass-text)] mb-2 line-clamp-2 group-hover:text-[var(--glass-accent)] transition-colors">
                {post.title}
              </h3>

              {post.excerpt && (
                <p className="flex-1 text-sm text-[var(--glass-text)]/60 line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
              )}

              {/* Author row */}
              <div className="flex items-center gap-2 mt-auto">
                {post.author && (
                  <>
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-[10px] font-semibold text-[var(--glass-accent)]">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-xs font-medium text-[var(--glass-text)]/70">
                      {post.author.name}
                    </span>
                  </>
                )}
                {post.date && (
                  <span className="text-xs text-[var(--glass-text)]/40 ml-auto">
                    {post.date}
                  </span>
                )}
                {post.readTime && (
                  <span className="text-xs text-[var(--glass-text)]/40">
                    · {post.readTime}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}

BlogGrid.displayName = 'BlogGrid';
export { BlogGrid };
