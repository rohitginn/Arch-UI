'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface ContactMinimalProps {
  /** Large headline */
  heading?: string;
  /** Sub-copy text */
  description?: string;
  /** Email address for primary CTA */
  email?: string;
  /** CTA button label */
  ctaLabel?: string;
  /** Social links */
  socials?: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function ContactMinimal({
  heading = "Let's talk",
  description,
  email = 'hello@example.com',
  ctaLabel = 'Send us an email',
  socials,
  background,
  className,
}: ContactMinimalProps) {
  return (
    <SectionWrapper padding="hero" background={background} className={className}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--glass-text)] mb-4">
          {heading}
        </h2>

        {description && (
          <p className="text-lg text-[var(--glass-text)]/60 mb-8 max-w-lg mx-auto">
            {description}
          </p>
        )}

        <a
          href={`mailto:${email}`}
          className={cn(
            'inline-flex items-center justify-center rounded-xl px-8 py-4',
            'bg-[var(--glass-accent)] text-white text-base font-semibold',
            'transition-all duration-200 hover:brightness-110',
            'hover:-translate-y-[1px] hover:shadow-lg',
            'active:scale-[0.97] active:transition-transform active:duration-75',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          )}
        >
          {ctaLabel}
        </a>

        {socials && socials.length > 0 && (
          <div className="mt-10 flex justify-center gap-4">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  'border border-[var(--glass-edge)] bg-[var(--glass-surface)]',
                  'text-[var(--glass-text)]/60 hover:text-[var(--glass-accent)]',
                  'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
                )}
              >
                {social.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}

ContactMinimal.displayName = 'ContactMinimal';
export { ContactMinimal };
