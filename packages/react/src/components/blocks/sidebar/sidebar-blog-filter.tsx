'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogFilterCategory {
  label: string;
  value: string;
  count?: number;
}

export interface BlogFilterTag {
  label: string;
  value: string;
}

export interface BlogFilterRecentPost {
  title: string;
  date?: string;
  href: string;
  image?: string;
}

export interface SidebarBlogFilterProps {
  /** Category checkbox list */
  categories?: BlogFilterCategory[];
  /** Tag cloud */
  tags?: BlogFilterTag[];
  /** Recent posts */
  recentPosts?: BlogFilterRecentPost[];
  /** Controlled selected categories */
  selectedCategories?: string[];
  /** Controlled selected tags */
  selectedTags?: string[];
  /** Search value */
  searchValue?: string;
  /** Called when categories change */
  onCategoriesChange?: (categories: string[]) => void;
  /** Called when tags change */
  onTagsChange?: (tags: string[]) => void;
  /** Called when search value changes */
  onSearchChange?: (value: string) => void;
  /** Additional className */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const SidebarBlogFilter = React.forwardRef<HTMLElement, SidebarBlogFilterProps>(
  (
    {
      categories = [],
      tags = [],
      recentPosts = [],
      selectedCategories = [],
      selectedTags = [],
      searchValue = '',
      onCategoriesChange,
      onTagsChange,
      onSearchChange,
      className,
    },
    ref,
  ) => {
    const toggleCategory = (value: string) => {
      const next = selectedCategories.includes(value)
        ? selectedCategories.filter((c) => c !== value)
        : [...selectedCategories, value];
      onCategoriesChange?.(next);
    };

    const toggleTag = (value: string) => {
      const next = selectedTags.includes(value)
        ? selectedTags.filter((t) => t !== value)
        : [...selectedTags, value];
      onTagsChange?.(next);
    };

    return (
      <aside
        ref={ref}
        className={cn(
          'w-72 space-y-8 rounded-2xl p-5',
          'border border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-xl',
          className,
        )}
      >
        {/* ── Search ──────────────────────────────────────────────── */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
            Search
          </label>
          <input
            type="text"
            placeholder="Search posts…"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className={cn(
              'w-full rounded-lg border border-[var(--glass-edge)] bg-[var(--glass-depth-1,transparent)]',
              'px-3 py-2 text-sm text-[var(--glass-text)] placeholder:text-[var(--glass-text)]/30',
              'outline-none transition-all duration-200',
              'focus:border-[var(--glass-accent)] focus:ring-2 focus:ring-[var(--glass-accent)]/20',
            )}
          />
        </div>

        {/* ── Categories ──────────────────────────────────────────── */}
        {categories.length > 0 && (
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
              Categories
            </span>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.value}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--glass-text)]/70 hover:text-[var(--glass-text)] transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.value)}
                      onChange={() => toggleCategory(cat.value)}
                      className="h-4 w-4 rounded border-[var(--glass-edge)] accent-[var(--glass-accent)]"
                    />
                    <span className="flex-1">{cat.label}</span>
                    {cat.count != null && (
                      <span className="text-xs text-[var(--glass-text)]/40">{cat.count}</span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Tag Cloud ───────────────────────────────────────────── */}
        {tags.length > 0 && (
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
              Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => toggleTag(tag.value)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                    'border border-[var(--glass-edge)]',
                    'hover:-translate-y-[1px]',
                    'active:scale-[0.97] active:transition-transform active:duration-75',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)] focus-visible:ring-offset-2',
                    selectedTags.includes(tag.value)
                      ? 'bg-[var(--glass-accent)] text-white border-transparent'
                      : 'bg-[var(--glass-surface)] text-[var(--glass-text)]/60 hover:bg-[var(--glass-accent)]/10',
                  )}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Recent Posts ────────────────────────────────────────── */}
        {recentPosts.length > 0 && (
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
              Recent Posts
            </span>
            <ul className="space-y-3">
              {recentPosts.map((post, i) => (
                <li key={i}>
                  <a
                    href={post.href}
                    className="group flex items-start gap-3 text-sm transition-colors"
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="line-clamp-2 font-medium text-[var(--glass-text)]/70 group-hover:text-[var(--glass-accent)] transition-colors">
                        {post.title}
                      </p>
                      {post.date && (
                        <span className="text-xs text-[var(--glass-text)]/40">{post.date}</span>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    );
  },
);

SidebarBlogFilter.displayName = 'SidebarBlogFilter';
