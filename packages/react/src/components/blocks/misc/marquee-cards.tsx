'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface MarqueeCard {
  title: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  href?: string;
}

export interface MarqueeCardsProps {
  /** First row of cards (scrolls left) */
  topRow: MarqueeCard[];
  /** Second row of cards (scrolls right) */
  bottomRow?: MarqueeCard[];
  /** Animation speed */
  speed?: 'slow' | 'normal' | 'fast';
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Additional className */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Speed map                                                           */
/* ------------------------------------------------------------------ */

const speedMap = { slow: '60s', normal: '40s', fast: '20s' } as const;

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */

function Card({ card }: { card: MarqueeCard }) {
  const Tag = card.href ? 'a' : 'div';
  return (
    <Tag
      href={card.href as any}
      className={cn(
        'group relative flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl',
        'border border-[var(--glass-edge)]',
        'bg-[var(--glass-surface)] backdrop-blur-md',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
      )}
    >
      {card.image && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={card.image}
            alt={card.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-3">
          {card.icon && (
            <span className="shrink-0 text-[var(--glass-accent)] [&_svg]:h-5 [&_svg]:w-5">
              {card.icon}
            </span>
          )}
          <div>
            <h3 className="text-sm font-semibold text-[var(--glass-text)] line-clamp-1">
              {card.title}
            </h3>
            {card.description && (
              <p className="mt-1 text-xs text-[var(--glass-text)]/60 line-clamp-2">
                {card.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee Row                                                         */
/* ------------------------------------------------------------------ */

function Row({
  cards,
  reverse,
  duration,
  pauseOnHover,
}: {
  cards: MarqueeCard[];
  reverse?: boolean;
  duration: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative flex overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
      )}
    >
      <div
        className={cn(
          'flex shrink-0 gap-6 py-4',
          'animate-[marquee-scroll_var(--marquee-duration)_linear_infinite]',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        {[...cards, ...cards].map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const MarqueeCards = React.forwardRef<HTMLDivElement, MarqueeCardsProps>(
  ({ topRow, bottomRow, speed = 'normal', pauseOnHover = true, className }, ref) => {
    const duration = speedMap[speed];

    return (
      <div ref={ref} className={cn('space-y-4', className)}>
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>

        <Row cards={topRow} duration={duration} pauseOnHover={pauseOnHover} />
        {bottomRow && bottomRow.length > 0 && (
          <Row cards={bottomRow} reverse duration={duration} pauseOnHover={pauseOnHover} />
        )}
      </div>
    );
  },
);

MarqueeCards.displayName = 'MarqueeCards';
