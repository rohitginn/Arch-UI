'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface TimelineMilestone {
  /** Event title */
  title: string;
  /** Date or time label */
  date: string;
  /** Description */
  description?: string;
  /** Icon rendered inside the circle */
  icon?: React.ReactNode;
  /** Status indicator */
  status?: 'completed' | 'current' | 'upcoming';
}

export interface TimelineSectionProps {
  /** Milestones to display */
  milestones: TimelineMilestone[];
  /** Layout direction */
  layout?: 'vertical' | 'alternating';
  /** Additional className */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const TimelineSection = React.forwardRef<HTMLDivElement, TimelineSectionProps>(
  ({ milestones, layout = 'vertical', className }, ref) => {
    const isAlternating = layout === 'alternating';

    return (
      <div ref={ref} className={cn('relative mx-auto max-w-3xl', className)}>
        {/* Central line */}
        <div
          className={cn(
            'absolute top-0 bottom-0 w-px bg-[var(--glass-edge)]',
            isAlternating ? 'left-1/2 -translate-x-1/2' : 'left-5',
          )}
          aria-hidden="true"
        />

        <div className="relative space-y-12">
          {milestones.map((m, i) => {
            const isLeft = isAlternating && i % 2 === 0;
            const isRight = isAlternating && i % 2 !== 0;

            return (
              <div
                key={i}
                className={cn(
                  'relative flex items-start',
                  isAlternating ? 'justify-center' : '',
                )}
              >
                {/* ── Left content (alternating) ──────────────── */}
                {isAlternating && (
                  <div className={cn('w-[calc(50%-24px)]', isLeft ? 'text-right pr-8' : 'order-last pl-8')}>
                    {isLeft && <MilestoneContent milestone={m} align="right" />}
                    {isRight && <MilestoneContent milestone={m} align="left" />}
                  </div>
                )}

                {/* ── Dot / Icon ──────────────────────────────── */}
                <div
                  className={cn(
                    'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2',
                    'transition-all duration-300',
                    m.status === 'completed'
                      ? 'border-[var(--glass-accent)] bg-[var(--glass-accent)] text-white'
                      : m.status === 'current'
                        ? 'border-[var(--glass-accent)] bg-[var(--glass-surface)] text-[var(--glass-accent)]'
                        : 'border-[var(--glass-edge)] bg-[var(--glass-surface)] text-[var(--glass-text)]/40',
                  )}
                >
                  {m.icon ? (
                    <span className="[&_svg]:h-4 [&_svg]:w-4">{m.icon}</span>
                  ) : (
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full',
                        m.status === 'completed'
                          ? 'bg-white'
                          : m.status === 'current'
                            ? 'bg-[var(--glass-accent)]'
                            : 'bg-[var(--glass-text)]/20',
                      )}
                    />
                  )}
                </div>

                {/* ── Right content (alternating spacer) ──────── */}
                {isAlternating && (
                  <div className={cn('w-[calc(50%-24px)]', isLeft ? 'order-last pl-8' : 'text-right pr-8')}>
                    {/* opposite side is empty */}
                  </div>
                )}

                {/* ── Content (vertical) ──────────────────────── */}
                {!isAlternating && (
                  <div className="ml-6 pt-0.5">
                    <MilestoneContent milestone={m} align="left" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

TimelineSection.displayName = 'TimelineSection';

/* ------------------------------------------------------------------ */
/*  Milestone content sub-component                                     */
/* ------------------------------------------------------------------ */

function MilestoneContent({
  milestone: m,
  align,
}: {
  milestone: TimelineMilestone;
  align: 'left' | 'right';
}) {
  return (
    <div className={cn(align === 'right' && 'items-end', 'flex flex-col')}>
      <span
        className={cn(
          'mb-1 text-xs font-medium',
          m.status === 'completed' || m.status === 'current'
            ? 'text-[var(--glass-accent)]'
            : 'text-[var(--glass-text)]/40',
        )}
      >
        {m.date}
      </span>
      <h3
        className={cn(
          'text-sm font-semibold',
          m.status === 'upcoming' ? 'text-[var(--glass-text)]/50' : 'text-[var(--glass-text)]',
        )}
      >
        {m.title}
      </h3>
      {m.description && (
        <p
          className={cn(
            'mt-1 text-xs leading-relaxed',
            m.status === 'upcoming' ? 'text-[var(--glass-text)]/30' : 'text-[var(--glass-text)]/60',
          )}
        >
          {m.description}
        </p>
      )}
    </div>
  );
}
