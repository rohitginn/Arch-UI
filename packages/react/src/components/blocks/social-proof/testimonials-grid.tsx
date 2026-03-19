'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  /** Quoted text */
  quote: string;
  /** Person's name */
  name: string;
  /** Role / position */
  role?: string;
  /** Company name */
  company?: string;
  /** Avatar image URL */
  avatar?: string;
  /** Star rating (1-5) */
  rating?: number;
}

export interface TestimonialsGridProps {
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** Testimonial items */
  testimonials: Testimonial[];
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

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook (inline)                                        */
/* ------------------------------------------------------------------ */

function useScrollReveal() {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); ob.disconnect(); } },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.05 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return [ref, inView] as const;
}

function TestimonialsGrid({
  heading,
  subheading,
  testimonials,
  columns = 3,
  background,
  className,
}: TestimonialsGridProps) {
  const [gridRef, inView] = useScrollReveal();

  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      <div
        ref={gridRef}
        className={cn(
          'grid gap-6',
          columns === 2 && 'md:grid-cols-2 max-w-4xl mx-auto',
          columns === 3 && 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'
        )}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={cn(
              'flex flex-col rounded-2xl p-6',
              'border border-[var(--glass-edge,theme(colors.zinc.200))]',
              'dark:border-zinc-800',
              'bg-[var(--glass-surface,white)] dark:bg-zinc-900 backdrop-blur-md',
              /* Lift + border accent on hover — physical feel, no bounce */
              'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
              'hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
              'dark:hover:border-zinc-700',
              /* Scroll-reveal stagger — translate from below, not opacity only */
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              'duration-500',
            )}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            {/* Rating */}
            {t.rating && (
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg
                    key={si}
                    className={cn(
                      'h-4 w-4',
                      si < t.rating! ? 'text-amber-400' : 'text-[var(--glass-text)]/20'
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}

            {/* Quote */}
            <blockquote className="flex-1 text-sm leading-relaxed text-[var(--glass-text)]/80 mb-4">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3">
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--glass-edge)]"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-sm font-semibold text-[var(--glass-accent)]">
                  {t.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-sm font-semibold text-[var(--glass-text)]">
                  {t.name}
                </div>
                {(t.role || t.company) && (
                  <div className="text-xs text-[var(--glass-text)]/50">
                    {t.role}
                    {t.role && t.company && ' · '}
                    {t.company}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

TestimonialsGrid.displayName = 'TestimonialsGrid';
export { TestimonialsGrid };
