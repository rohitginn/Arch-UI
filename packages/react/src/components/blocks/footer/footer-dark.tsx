'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FooterDarkLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterDarkProps {
  /** Logo / brand element */
  logo?: React.ReactNode;
  /** Tagline below logo */
  tagline?: string;
  /** Link columns */
  groups: FooterDarkLinkGroup[];
  /** Social icon links */
  socials?: { label: string; href: string; icon: React.ReactNode }[];
  /** Newsletter submit handler (shows newsletter form when provided) */
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

export const FooterDark = React.forwardRef<HTMLElement, FooterDarkProps>(
  (
    {
      logo,
      tagline,
      groups,
      socials,
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
          /* Force dark regardless of current theme */
          'bg-zinc-950 text-zinc-300',
          'border-t border-zinc-800',
          className,
        )}
      >
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
            {/* ── Brand column ──────────────────────────────────── */}
            <div className="lg:col-span-3">
              {logo && <div className="mb-4">{logo}</div>}
              {tagline && (
                <p className="text-sm text-zinc-400 leading-relaxed">{tagline}</p>
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
                        'border border-zinc-800 bg-zinc-900',
                        'text-zinc-400 transition-all duration-200',
                        'hover:-translate-y-[1px] hover:text-white hover:border-zinc-700',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500',
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
                <h3 className="mb-4 text-sm font-semibold text-zinc-200">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.links.map((link, li) => (
                    <li key={li}>
                      <a
                        href={link.href}
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
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
                <h3 className="mb-2 text-sm font-semibold text-zinc-200">Subscribe</h3>
                <p className="mb-4 text-sm text-zinc-400">
                  Get the latest updates straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={cn(
                      'flex-1 rounded-lg border border-zinc-800 bg-zinc-900',
                      'px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600',
                      'outline-none transition-all duration-200',
                      'focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700',
                    )}
                  />
                  <button
                    type="submit"
                    className={cn(
                      'shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900',
                      'transition-all duration-200',
                      'hover:-translate-y-[1px] hover:shadow-lg',
                      'active:scale-[0.97] active:transition-transform active:duration-75',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
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
          <div className="border-t border-zinc-800">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
              {copyright && <p className="text-xs text-zinc-500">{copyright}</p>}
              {legalLinks && legalLinks.length > 0 && (
                <div className="flex gap-4">
                  {legalLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
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

FooterDark.displayName = 'FooterDark';
