'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogFeaturedPost {
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  author?: { name: string; avatar?: string };
  readTime?: string;
  date?: string;
  href: string;
}

export interface BlogFeaturedProps {
  heading?: string;
  subheading?: string;
  /** Featured (hero) post */
  featured: BlogFeaturedPost;
  /** Grid posts below */
  posts: BlogFeaturedPost[];
  background?: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function BlogFeatured({
  heading,
  subheading,
  featured,
  posts,
  background,
  className,
}: BlogFeaturedProps) {
  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      {/* Featured hero card */}
      <a
        href={featured.href}
        className={cn(
          'group relative block mb-10 rounded-2xl overflow-hidden',
          'border border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-md',
          'transition-all duration-300 hover:shadow-xl'
        )}
      >
        <div className="grid md:grid-cols-2">
          {featured.image && (
            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex flex-col justify-center p-8 md:p-10">
            {featured.category && (
              <span className="mb-3 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]">
                {featured.category}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-bold text-[var(--glass-text)] mb-3 group-hover:text-[var(--glass-accent)] transition-colors">
              {featured.title}
            </h3>
            {featured.excerpt && (
              <p className="text-sm text-[var(--glass-text)]/60 mb-4 line-clamp-3">
                {featured.excerpt}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs text-[var(--glass-text)]/50">
              {featured.author?.name && <span>{featured.author.name}</span>}
              {featured.date && <span>· {featured.date}</span>}
              {featured.readTime && <span>· {featured.readTime}</span>}
            </div>
          </div>
        </div>
      </a>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="flex flex-1 flex-col p-5">
              {post.category && (
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
              <div className="flex items-center gap-2 text-xs text-[var(--glass-text)]/40 mt-auto">
                {post.author?.name && <span>{post.author.name}</span>}
                {post.date && <span>· {post.date}</span>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}

BlogFeatured.displayName = 'BlogFeatured';
export { BlogFeatured };
