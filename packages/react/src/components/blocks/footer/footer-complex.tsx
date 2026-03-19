'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterComplexProps {
  /** Logo / brand element */
  logo?: React.ReactNode;
  /** Tagline below logo */
  tagline?: string;
  /** Link columns */
  groups: FooterLinkGroup[];
  /** Social media links */
  socials?: FooterSocialLink[];
  /** Newsletter heading */
  newsletterHeading?: string;
  /** Newsletter description */
  newsletterDescription?: string;
  /** Called when newsletter form submits */
  onNewsletterSubmit?: (email: string) => void;
  /** Copyright text */
  copyright?: string;
  /** Bottom legal links */
  legalLinks?: { label: string; href: string }[];
  /** Additional className */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const FooterComplex = React.forwardRef<HTMLElement, FooterComplexProps>(
  (
    {
      logo,
      tagline,
      groups,
      socials,
      newsletterHeading = 'Subscribe',
      newsletterDescription,
      onNewsletterSubmit,
      copyright,
      legalLinks,
      className,
    },
    ref,
  ) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const email = fd.get('email') as string;
      if (email) onNewsletterSubmit?.(email);
    };

    return (
      <footer
        ref={ref}
        className={cn(
          'border-t border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-xl',
          className,
        )}
      >
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
            {/* ── Brand column ──────────────────────────────────── */}
            <div className="lg:col-span-3">
              {logo && <div className="mb-4">{logo}</div>}
              {tagline && (
                <p className="text-sm text-[var(--glass-text)]/60 leading-relaxed">
                  {tagline}
                </p>
              )}
              {socials && socials.length > 0 && (
                <div className="mt-6 flex gap-3">
                  {socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      aria-label={s.label}
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg',
                        'border border-[var(--glass-edge)] bg-[var(--glass-surface)]',
                        'text-[var(--glass-text)]/60 transition-all duration-200',
                        'hover:-translate-y-[1px] hover:text-[var(--glass-accent)] hover:border-[var(--glass-accent)]/30',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)]',
                      )}
                    >
                      <span className="[&_svg]:h-4 [&_svg]:w-4">{s.icon}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ── Link columns ─────────────────────────────────── */}
            {groups.map((group, gi) => (
              <div key={gi} className="lg:col-span-2">
                <h3 className="mb-4 text-sm font-semibold text-[var(--glass-text)]">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link, li) => (
                    <li key={li}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--glass-text)]/60 transition-colors hover:text-[var(--glass-accent)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* ── Newsletter ───────────────────────────────────── */}
            {onNewsletterSubmit && (
              <div className="lg:col-span-3">
                <h3 className="mb-2 text-sm font-semibold text-[var(--glass-text)]">
                  {newsletterHeading}
                </h3>
                {newsletterDescription && (
                  <p className="mb-4 text-sm text-[var(--glass-text)]/60">
                    {newsletterDescription}
                  </p>
                )}
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={cn(
                      'flex-1 rounded-lg border border-[var(--glass-edge)] bg-[var(--glass-depth-1,transparent)]',
                      'px-3 py-2 text-sm text-[var(--glass-text)] placeholder:text-[var(--glass-text)]/30',
                      'outline-none transition-all duration-200',
                      'focus:border-[var(--glass-accent)] focus:ring-2 focus:ring-[var(--glass-accent)]/20',
                    )}
                  />
                  <button
                    type="submit"
                    className={cn(
                      'shrink-0 rounded-lg bg-[var(--glass-accent)] px-4 py-2 text-sm font-medium text-white',
                      'transition-all duration-200',
                      'hover:-translate-y-[1px] hover:shadow-lg',
                      'active:scale-[0.97] active:transition-transform active:duration-75',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)] focus-visible:ring-offset-2',
                    )}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        {(copyright || (legalLinks && legalLinks.length > 0)) && (
          <div className="border-t border-[var(--glass-edge)]">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
              {copyright && (
                <p className="text-xs text-[var(--glass-text)]/40">{copyright}</p>
              )}
              {legalLinks && legalLinks.length > 0 && (
                <div className="flex gap-4">
                  {legalLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      className="text-xs text-[var(--glass-text)]/40 transition-colors hover:text-[var(--glass-text)]/70"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </footer>
    );
  },
);

FooterComplex.displayName = 'FooterComplex';
