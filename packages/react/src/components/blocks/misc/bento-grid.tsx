'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface BentoGridItem {
  /** Card title */
  title: string;
  /** Card description */
  description?: string;
  /** Icon rendered in the card header */
  icon?: React.ReactNode;
  /** Optional cover image */
  image?: string;
  /** Grid span — defaults to { cols: 1, rows: 1 } */
  span?: { cols: 1 | 2; rows: 1 | 2 };
  /** Custom content to render inside the card */
  children?: React.ReactNode;
  /** Additional className for this cell */
  className?: string;
}

export interface BentoGridProps {
  /** Grid items */
  items: BentoGridItem[];
  /** Number of base columns */
  columns?: 2 | 3 | 4;
  /** Gap between cells */
  gap?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

const colsMap = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
} as const;

const gapMap = { sm: 'gap-3', md: 'gap-5', lg: 'gap-8' } as const;

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ items, columns = 3, gap = 'md', className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('grid auto-rows-[minmax(180px,1fr)] grid-cols-1', colsMap[columns], gapMap[gap], className)}
      >
        {items.map((item, i) => {
          const colSpan = item.span?.cols === 2 ? 'md:col-span-2' : '';
          const rowSpan = item.span?.rows === 2 ? 'md:row-span-2' : '';

          return (
            <div
              key={i}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl',
                'border border-[var(--glass-edge)]',
                'bg-[var(--glass-surface)] backdrop-blur-md',
                'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
                colSpan,
                rowSpan,
                item.className,
              )}
            >
              {/* Image */}
              {item.image && (
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    {item.icon && (
                      <span className="mb-2 inline-block text-white/80 [&_svg]:h-5 [&_svg]:w-5">
                        {item.icon}
                      </span>
                    )}
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    {item.description && (
                      <p className="mt-1 text-xs text-white/70 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* No-image card */}
              {!item.image && (
                <div className="flex flex-1 flex-col p-6">
                  {item.icon && (
                    <span className="mb-3 text-[var(--glass-accent)] [&_svg]:h-6 [&_svg]:w-6">
                      {item.icon}
                    </span>
                  )}
                  <h3 className="text-sm font-semibold text-[var(--glass-text)]">{item.title}</h3>
                  {item.description && (
                    <p className="mt-2 text-xs text-[var(--glass-text)]/60 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  {item.children && <div className="mt-auto pt-4">{item.children}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

BentoGrid.displayName = 'BentoGrid';
