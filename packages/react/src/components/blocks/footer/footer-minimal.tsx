'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FooterMinimalProps {
  /** Logo / brand element */
  logo?: React.ReactNode;
  /** Navigation links */
  links?: { label: string; href: string }[];
  /** Social icon links */
  socials?: { label: string; href: string; icon: React.ReactNode }[];
  /** Copyright text */
  copyright?: string;
  /** Additional className */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const FooterMinimal = React.forwardRef<HTMLElement, FooterMinimalProps>(
  ({ logo, links = [], socials = [], copyright, className }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          'border-t border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-xl',
          className,
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:justify-between">
          {/* Logo */}
          {logo && <div className="shrink-0">{logo}</div>}

          {/* Nav links */}
          {links.length > 0 && (
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-sm text-[var(--glass-text)]/60 transition-colors hover:text-[var(--glass-accent)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Socials */}
          {socials.length > 0 && (
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    'text-[var(--glass-text)]/50 transition-all duration-200',
                    'hover:text-[var(--glass-accent)] hover:-translate-y-[1px]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)]',
                  )}
                >
                  <span className="[&_svg]:h-4 [&_svg]:w-4">{s.icon}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Copyright */}
        {copyright && (
          <div className="border-t border-[var(--glass-edge)]">
            <p className="py-4 text-center text-xs text-[var(--glass-text)]/40">{copyright}</p>
          </div>
        )}
      </footer>
    );
  },
);

FooterMinimal.displayName = 'FooterMinimal';
