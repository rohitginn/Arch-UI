'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BlogContentBodyProps {
  /** HTML or JSX content — rendered via children */
  children: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * BlogContentBody — prose container with typographic styling for
 * rendered blog/article content. Supports headings, paragraphs,
 * blockquotes, lists, code blocks, and images.
 *
 * For raw HTML content, wrap in `dangerouslySetInnerHTML` yourself
 * and use the className export for styling.
 */
function BlogContentBody({ children, className }: BlogContentBodyProps) {
  return (
    <article
      className={cn(
        // Prose container
        'mx-auto max-w-[65ch]',

        // Base typography
        'text-base leading-relaxed text-[var(--glass-text)]/80',

        // Headings
        '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[var(--glass-text)] [&_h1]:mt-12 [&_h1]:mb-4',
        '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--glass-text)] [&_h2]:mt-10 [&_h2]:mb-3',
        '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--glass-text)] [&_h3]:mt-8 [&_h3]:mb-3',
        '[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[var(--glass-text)] [&_h4]:mt-6 [&_h4]:mb-2',

        // Paragraphs
        '[&_p]:mb-5',

        // Links
        '[&_a]:text-[var(--glass-accent)] [&_a]:underline [&_a]:underline-offset-2',
        '[&_a:hover]:text-[var(--glass-accent)]/80',

        // Lists
        '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-1',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-1',

        // Blockquote
        '[&_blockquote]:border-l-4 [&_blockquote]:border-[var(--glass-accent)]/30',
        '[&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[var(--glass-text)]/60',
        '[&_blockquote]:my-6',

        // Inline code
        '[&_:not(pre)>code]:rounded [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5',
        '[&_:not(pre)>code]:bg-[var(--glass-surface)] [&_:not(pre)>code]:text-sm',
        '[&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[var(--glass-accent)]',

        // Code blocks
        '[&_pre]:rounded-xl [&_pre]:border [&_pre]:border-[var(--glass-edge)]',
        '[&_pre]:bg-[var(--glass-surface)] [&_pre]:p-4 [&_pre]:my-6',
        '[&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:leading-relaxed',

        // Images
        '[&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full',

        // Horizontal rule
        '[&_hr]:my-10 [&_hr]:border-[var(--glass-edge)]/30',

        // Tables
        '[&_table]:w-full [&_table]:border-collapse [&_table]:my-6',
        '[&_th]:border [&_th]:border-[var(--glass-edge)] [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[var(--glass-text)]',
        '[&_td]:border [&_td]:border-[var(--glass-edge)] [&_td]:p-3',

        className
      )}
    >
      {children}
    </article>
  );
}

BlogContentBody.displayName = 'BlogContentBody';
export { BlogContentBody };
