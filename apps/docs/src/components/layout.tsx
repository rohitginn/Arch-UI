import { Outlet, Link, useLocation } from 'react-router-dom';
import { Github, Moon, Sun, Menu, X, Search, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalSearch } from './global-search';

interface LayoutProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

import { Logo } from '@archui/react';

const NAV_LINKS = [
  { label: 'Docs', to: '/docs/introduction' },
  { label: 'Components', to: '/docs/components/glass-button' },
  { label: 'Changelog', to: '/docs/changelog' },
];

export function Layout({ isDark, setIsDark }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
          ? 'border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-[hsl(var(--background))]/70'
          : 'border-transparent bg-[hsl(var(--background))]/95 backdrop-blur-sm'
          }`}
      >
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4">

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5 text-[hsl(var(--foreground))]">
            <Logo size={24} />
            <span className="font-bold tracking-tight">ArchUI</span>
            <span className="hidden items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))] sm:inline-flex">
              v0.1.0
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV_LINKS.map(({ label, to }) => {
              const isActive = location.pathname.startsWith(to.replace(/\/[^/]+$/, ''));
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-3 py-1.5 rounded-md font-medium transition-colors ${isActive
                    ? 'text-[hsl(var(--foreground))]'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                    }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-md bg-[hsl(var(--accent))]"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              GitHub
              <ExternalLink className="h-3 w-3 opacity-50" />
            </a>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="mr-1 hidden h-8 items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 pl-2.5 pr-1.5 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))] md:flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="min-w-[120px] text-left">Search docs…</span>
              <kbd className="ml-1 inline-flex h-5 items-center gap-0.5 rounded border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-1.5 font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                <span>⌘</span>K
              </kbd>
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))] md:hidden"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"
            >
              <Github className="h-4.5 w-4.5" />
            </a>

            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <Sun className="h-4.5 w-4.5" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Moon className="h-4.5 w-4.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--accent))] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]"
            >
              <nav className="flex flex-col gap-1 p-3">
                {NAV_LINKS.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <Outlet />

      {/* Global Search Dialog */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
