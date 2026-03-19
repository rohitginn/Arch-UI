'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface TemplateNavLink {
  label: string;
  href: string;
}

export interface TemplateNavProps {
  /** Brand logo / name element */
  logo: React.ReactNode;
  /** Navigation links */
  links?: TemplateNavLink[];
  /** Right-side slot (CTAs, icons, etc.) */
  actions?: React.ReactNode;
  /** Force dark surface regardless of theme */
  dark?: boolean;
  /** Make nav sticky */
  sticky?: boolean;
  /** Additional className */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * TemplateNav — The shared sticky navigation bar used across all ArchUI
 * website templates. Activates backdrop-blur once the page scrolls past 20px.
 */
export function TemplateNav({
  logo,
  links = [],
  actions,
  dark = false,
  sticky = true,
  className,
}: TemplateNavProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={cn(
        'w-full z-50 transition-all duration-300',
        sticky && 'sticky top-0',
        scrolled
          ? dark
            ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
            : 'bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent',
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6">
        {/* Logo */}
        <div className="shrink-0">{logo}</div>

        {/* Nav links */}
        {links.length > 0 && (
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150',
                  dark
                    ? 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Actions */}
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </header>
  );
}
