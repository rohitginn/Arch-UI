'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface CarouselTestimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
}

export interface TestimonialsCarouselProps {
  heading?: string;
  subheading?: string;
  testimonials: CarouselTestimonial[];
  /** Auto-play interval in ms (0 = disabled) */
  autoPlay?: number;
  background?: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function TestimonialsCarousel({
  heading,
  subheading,
  testimonials,
  autoPlay = 0,
  background,
  className,
}: TestimonialsCarouselProps) {
  const [active, setActive] = React.useState(0);
  /* -1 = entering from left (prev), +1 = entering from right (next) */
  const [direction, setDirection] = React.useState<-1 | 1>(1);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const count = testimonials.length;

  /* Slide to a specific index, tracking direction for the enter animation */
  const slideTo = React.useCallback(
    (index: number, dir: -1 | 1) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setActive(index);
      /* Allow CSS transition to complete before unlocking */
      setTimeout(() => setIsAnimating(false), 380);
    },
    [isAnimating]
  );

  const prev = () => slideTo((active - 1 + count) % count, -1);
  const next = () => slideTo((active + 1) % count, 1);

  /* Auto-play */
  React.useEffect(() => {
    if (autoPlay <= 0 || count <= 1) return;
    const id = setInterval(() => next(), autoPlay);
    return () => clearInterval(id);
  }, [autoPlay, count, active]);

  const t = testimonials[active];
  if (!t) return null;

  /* Enter from right (+1) or from left (-1) */
  const enterFrom = direction === 1 ? 'translate-x-12' : '-translate-x-12';

  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      <div className="relative mx-auto max-w-3xl">
        {/* Card â€” re-keyed on active so transition fires on each change */}
        <div className="overflow-hidden rounded-2xl">
          <div
            key={active}
            className={cn(
              'rounded-2xl border border-[var(--glass-edge,theme(colors.zinc.200))]',
              'dark:border-zinc-800',
              'p-8 md:p-12',
              'bg-[var(--glass-surface,white)] dark:bg-zinc-900 backdrop-blur-md',
              'text-center',
              /* Slide entrance from direction â€” no opacity-only fade */
              'animate-none',
              enterFrom,
              'opacity-0',
              'transition-none',
            )}
            style={{
              animation: `tc-enter-${direction === 1 ? 'right' : 'left'} 360ms cubic-bezier(0.4,0,0.2,1) both`,
            }}
          >
            {/* Quote icon */}
            <svg
              className="mx-auto mb-6 h-7 w-7 text-[var(--glass-accent,theme(colors.amber.500))]/30"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
            </svg>

            <blockquote className="text-lg md:text-xl leading-relaxed text-[var(--glass-text,theme(colors.zinc.700))]/80 dark:text-zinc-300 mb-8">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-3">
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--glass-edge,theme(colors.zinc.200))] dark:ring-zinc-700"
                />
              ) : (
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    'bg-[var(--glass-accent,theme(colors.amber.500))]/10',
                    'text-base font-semibold text-[var(--glass-accent,theme(colors.amber.600))]',
                  )}
                >
                  {t.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-sm font-semibold text-[var(--glass-text,theme(colors.zinc.900))] dark:text-zinc-100">
                  {t.name}
                </div>
                {(t.role || t.company) && (
                  <div className="mt-0.5 text-xs text-[var(--glass-text,theme(colors.zinc.500))]/60 dark:text-zinc-500">
                    {t.role}{t.role && t.company && ' Â· '}{t.company}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {count > 1 && (
          <>
            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              disabled={isAnimating}
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14',
                'flex h-10 w-10 items-center justify-center rounded-full',
                'border border-[var(--glass-edge,theme(colors.zinc.200))] dark:border-zinc-700',
                'bg-[var(--glass-surface,white)] dark:bg-zinc-900 backdrop-blur-md',
                'text-[var(--glass-text,theme(colors.zinc.700))] dark:text-zinc-300',
                'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
                'hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:-translate-x-5 hover:-translate-y-1/2',
                'dark:hover:border-zinc-600',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--glass-accent,theme(colors.amber.500))]',
                'disabled:opacity-50',
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              disabled={isAnimating}
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14',
                'flex h-10 w-10 items-center justify-center rounded-full',
                'border border-[var(--glass-edge,theme(colors.zinc.200))] dark:border-zinc-700',
                'bg-[var(--glass-surface,white)] dark:bg-zinc-900 backdrop-blur-md',
                'text-[var(--glass-text,theme(colors.zinc.700))] dark:text-zinc-300',
                'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
                'hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:translate-x-5 hover:-translate-y-1/2',
                'dark:hover:border-zinc-600',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--glass-accent,theme(colors.amber.500))]',
                'disabled:opacity-50',
              )}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Progress dots â€” active dot expands to pill */}
            <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, di) => (
                <button
                  key={di}
                  type="button"
                  role="tab"
                  aria-selected={di === active}
                  onClick={() => slideTo(di, di > active ? 1 : -1)}
                  aria-label={`Go to testimonial ${di + 1}`}
                  className={cn(
                    'h-1.5 rounded-full',
                    'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    di === active
                      ? 'w-8 bg-[var(--glass-accent,theme(colors.amber.500))]'
                      : 'w-1.5 bg-[var(--glass-text,theme(colors.zinc.400))]/25 hover:bg-[var(--glass-text)]/40',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Keyframes â€” directional slide, not a fade */}
      <style>{`
        @keyframes tc-enter-right {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes tc-enter-left {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes tc-enter-right { from { opacity: 0; } to { opacity: 1; } }
          @keyframes tc-enter-left  { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>
    </SectionWrapper>
  );
}

TestimonialsCarousel.displayName = 'TestimonialsCarousel';
export { TestimonialsCarousel };
