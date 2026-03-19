'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface TocHeading {
  /** Unique id matching the heading element's id attribute */
  id: string;
  /** Heading text */
  label: string;
  /** Nesting depth (2 = h2, 3 = h3, etc.) */
  depth: number;
}

export interface SidebarTableOfContentsProps {
  /** Array of heading objects */
  headings: TocHeading[];
  /** Title displayed above the list */
  title?: string;
  /** className for the wrapper */
  className?: string;
  /** Offset (px) from top before a heading is considered "active" */
  topOffset?: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const SidebarTableOfContents = React.forwardRef<HTMLElement, SidebarTableOfContentsProps>(
  ({ headings, title = 'On this page', className, topOffset = 100 }, ref) => {
    const [activeId, setActiveId] = React.useState<string | null>(null);

    /* ── IntersectionObserver: track which heading is visible ───── */
    React.useEffect(() => {
      if (typeof window === 'undefined' || headings.length === 0) return;

      const els = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      if (els.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          // Find the first intersecting entry (top-most visible heading)
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        },
        {
          rootMargin: `-${topOffset}px 0px -60% 0px`,
          threshold: 0,
        },
      );

      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, [headings, topOffset]);

    /* ── Scroll into view on click ─────────────────────────────── */
    const handleClick = (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - topOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActiveId(id);
      }
    };

    /* ── Depth → padding map ───────────────────────────────────── */
    const depthPadding: Record<number, string> = {
      2: 'pl-0',
      3: 'pl-4',
      4: 'pl-8',
      5: 'pl-12',
    };

    return (
      <aside
        ref={ref}
        className={cn(
          'sticky top-24 w-56 space-y-1 self-start',
          className,
        )}
      >
        {title && (
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
            {title}
          </span>
        )}
        <nav>
          <ul className="space-y-0.5 border-l border-[var(--glass-edge)]">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={handleClick(h.id)}
                  className={cn(
                    'block border-l-2 py-1 text-[13px] transition-all duration-200',
                    depthPadding[h.depth] ?? 'pl-0',
                    'pl-4',
                    activeId === h.id
                      ? 'border-[var(--glass-accent)] font-medium text-[var(--glass-accent)]'
                      : 'border-transparent text-[var(--glass-text)]/50 hover:text-[var(--glass-text)]/80 hover:border-[var(--glass-text)]/20',
                  )}
                >
                  {h.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  },
);

SidebarTableOfContents.displayName = 'SidebarTableOfContents';
