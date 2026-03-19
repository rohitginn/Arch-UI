'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ================================================================== */
/*  Photography / Visual Arts Studio Template — "ELARA"                */
/*  Palette: Stone monochrome | Mode: Warm light + Cinematic dark       */
/*  Font: Cormorant Garamond (display), Inter (UI), EB Garamond (body) */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconArrowDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

const IconInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80&auto=format&fit=crop',
    project: 'Lumière Éternelle',
    client: 'Hermès — 2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80&auto=format&fit=crop',
    project: 'Still Horizons',
    client: 'Wallpaper* — 2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop',
    project: 'The Alpine Series',
    client: 'BMW — 2023',
  },
  {
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920&q=80&auto=format&fit=crop',
    project: 'Veil & Shadow',
    client: 'Saint Laurent — 2023',
  },
];

const PROJECTS = [
  {
    title: 'Lumière Éternelle',
    category: 'Campaign',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Still Horizons',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'The Alpine Series',
    category: 'Product',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Monochrome Dreams',
    category: 'Campaign',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Veil & Shadow',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Urban Grace',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format&fit=crop',
  },
];

const SERVICES = [
  { name: 'Campaign Photography', description: 'Full-scale fashion and luxury campaign production from concept to final delivery.' },
  { name: 'Editorial Direction', description: 'Visual storytelling for magazines, publications, and digital editorial platforms.' },
  { name: 'Product & Still Life', description: 'Precision product photography for e-commerce, catalogs, and brand assets.' },
  { name: 'Motion & Film', description: 'Short-form films, behind-the-scenes content, and motion brand assets.' },
  { name: 'Creative Direction', description: 'End-to-end creative strategy from mood boarding to post-production oversight.' },
  { name: 'Archive Licensing', description: 'License our extensive archive of editorial and campaign photography.' },
];

const CLIENTS = [
  'Vogue', 'Hermès', 'Wallpaper*', 'BMW', 'Saint Laurent', 'Le Monde',
  'Apple', 'Chanel', 'Net-a-Porter', 'The Row', 'Monocle', 'Bottega Veneta',
];

/* ------------------------------------------------------------------ */
/*  Custom Cursor                                                       */
/* ------------------------------------------------------------------ */

function CustomCursor() {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const posRef = React.useRef({ x: 0, y: 0 });
  const targetRef = React.useRef({ x: 0, y: 0 });
  const [label, setLabel] = React.useState('');
  const [size, setSize] = React.useState<'default' | 'view' | 'link'>('default');
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest('[data-cursor]');
      if (closest) {
        const cursorType = closest.getAttribute('data-cursor');
        if (cursorType === 'view') { setSize('view'); setLabel('VIEW'); }
        else if (cursorType === 'link') { setSize('link'); setLabel(''); }
        else if (cursorType === 'send') { setSize('view'); setLabel('SEND'); }
        else { setSize('default'); setLabel(''); }
      } else {
        setSize('default');
        setLabel('');
      }
    };

    const lerp = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(lerp);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    rafRef.current = requestAnimationFrame(lerp);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        'fixed top-0 left-0 z-[9999] pointer-events-none',
        'transition-[width,height,background-color,border,backdrop-filter] duration-200 ease-out',
        'rounded-full flex items-center justify-center',
        size === 'default' && 'w-[10px] h-[10px] bg-[#1a1714] dark:bg-[#f0ece6]',
        size === 'view' && 'w-14 h-14 bg-white/15 backdrop-blur-sm border border-white/30',
        size === 'link' && 'w-[6px] h-[6px] bg-[#1a1714] dark:bg-[#f0ece6]',
      )}
    >
      {label && (
        <span className="text-[8px] uppercase tracking-[0.2em] text-white font-light select-none">
          {label}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar — Invisible by design                                        */
/* ------------------------------------------------------------------ */

function PhotographyNav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [linksRevealed, setLinksRevealed] = React.useState(false);

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setLinksRevealed(true), 100);
      return () => { clearTimeout(timer); document.body.style.overflow = ''; };
    } else {
      setLinksRevealed(false);
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const navLinks = ['WORK', 'STUDIO', 'SERVICES', 'CONTACT'];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-[11px] font-light uppercase tracking-[0.3em] text-[#1a1714] dark:text-[#f0ece6] transition-colors duration-200"
            style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
          >
            ELARA
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                data-cursor="link"
                className="text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74] hover:text-[#1a1714] dark:hover:text-[#f0ece6] transition-colors duration-0"
                style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74]"
            style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
            data-cursor="link"
          >
            MENU
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1a1714]">
          <div className="flex h-full">
            {/* Left — Photo */}
            <div className="hidden sm:block w-[55%] h-full relative overflow-hidden">
              <img
                src={HERO_SLIDES[0].image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            </div>

            {/* Right — Links */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12">
              {/* Close */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-6 flex items-center gap-2 text-[10px] font-light uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors"
                style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
              >
                <IconClose /> CLOSE
              </button>

              <nav className="flex flex-col gap-6 sm:gap-8">
                {navLinks.map((link, i) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'text-4xl sm:text-5xl font-light italic text-white transition-all duration-[600ms]',
                      linksRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                    )}
                    style={{
                      fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif',
                      transitionDelay: `${i * 80}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                    }}
                  >
                    {link.charAt(0) + link.slice(1).toLowerCase()}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — Fullscreen Photography Slideshow                             */
/* ------------------------------------------------------------------ */

function PhotographyHero() {
  const [current, setCurrent] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const count = HERO_SLIDES.length;

  // Auto-advance slides every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, 5000);
    return () => clearInterval(interval);
  }, [count]);

  // Reset progress bar animation on slide change
  React.useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.animation = 'none';
      // eslint-disable-next-line no-void
      void progressRef.current.offsetHeight;
      progressRef.current.style.animation = 'elara-progress 5s linear forwards';
    }
  }, [current]);

  // Page load animation
  React.useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[#0d0b09]">
      {/* Camera shutter overlay */}
      <div
        className={cn(
          'absolute inset-0 z-30 bg-[#1a1714] transition-opacity',
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )}
        style={{ transitionDuration: '400ms', transitionDelay: '200ms' }}
      />

      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 transition-opacity duration-[800ms] ease-in-out',
            i === current ? 'opacity-100' : 'opacity-0',
          )}
        >
          <img
            src={slide.image}
            alt={slide.project}
            className="w-full h-full object-cover"
            data-cursor="view"
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Bottom-left: Project info */}
      <div
        className={cn(
          'absolute bottom-12 left-6 lg:left-10 z-20 transition-all duration-[600ms]',
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        )}
        style={{ transitionDelay: '600ms', transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
      >
        <h2
          className="text-white font-light italic leading-tight"
          style={{
            fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {HERO_SLIDES[current].project}
        </h2>
        <p
          className="mt-2 text-white/60 text-[10px] font-light uppercase tracking-[0.18em]"
          style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
        >
          {HERO_SLIDES[current].client}
        </p>
      </div>

      {/* Bottom-right: Slide counter + progress */}
      <div className="absolute bottom-12 right-6 lg:right-10 z-20 flex flex-col items-end gap-2">
        <div className="w-12 h-px bg-white/20 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-white/80"
            style={{ width: '0%', animation: 'elara-progress 5s linear forwards' }}
          />
        </div>
        <span
          className="text-white/40 text-[10px] font-light uppercase tracking-[0.18em]"
          style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
        >
          {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom-center: Explore CTA */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <span
          className="text-white text-[10px] font-light uppercase tracking-[0.18em]"
          style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
        >
          ↓ EXPLORE WORK
        </span>
        <div className="w-px bg-white/40 animate-[elara-descend_1.5s_ease-in-out_infinite]" />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes elara-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes elara-descend {
          0% { height: 0px; opacity: 0; }
          50% { height: 16px; opacity: 1; }
          100% { height: 16px; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1 — Project Grid (Asymmetric)                               */
/* ------------------------------------------------------------------ */

function ProjectGrid() {
  const [revealed, setRevealed] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Grid layout specs from the prompt
  const gridSpans = [
    'md:col-span-7 md:row-span-2',    // P1: large portrait
    'md:col-span-5',                    // P2: landscape top
    'md:col-span-5',                    // P3: landscape bottom
    'md:col-span-12 aspect-[21/9]',     // P4: full width cinematic
    'md:col-span-4 md:row-span-2',      // P5: tall
    'md:col-span-8',                    // P6: medium
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-[#f6f3ef] dark:bg-[#0d0b09]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section label */}
        <p
          className="mb-10 text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74]"
          style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
        >
          SELECTED WORK — 2022–2025
        </p>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className={cn(
                'group relative overflow-hidden cursor-pointer',
                'aspect-[4/5] md:aspect-auto',
                gridSpans[i] || '',
                'min-h-[240px]',
                'transition-all duration-500',
                revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              )}
              style={{ transitionDelay: revealed ? `${i * 100}ms` : '0ms' }}
              data-cursor="view"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              />

              {/* Hover scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Hover: Scale */}
              <div className="absolute inset-0 group-hover:scale-[1.04] transition-transform duration-700" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                <img
                  src={project.image}
                  alt=""
                  className="w-full h-full object-cover"
                  aria-hidden="true"
                />
              </div>

              {/* Hover info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300" style={{ transitionDelay: '100ms' }}>
                <h3
                  className="text-white text-xl lg:text-2xl font-light italic"
                  style={{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif' }}
                >
                  {project.title}
                </h3>
                <p
                  className="mt-1 text-white/70 text-[10px] font-light uppercase tracking-[0.18em]"
                  style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
                >
                  {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — Studio Statement                                        */
/* ------------------------------------------------------------------ */

function StudioStatement() {
  const [revealed, setRevealed] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="py-24 lg:py-40 bg-[#f6f3ef] dark:bg-[#0d0b09]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-start-4 lg:col-end-10">
            {/* Decorative circle */}
            <svg width="24" height="24" viewBox="0 0 24 24" className="mb-8 text-[#e2ddd7] dark:text-[#2a2420]">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* Opening line */}
            <h2
              className={cn(
                'text-2xl lg:text-3xl font-light italic text-[#1a1714] dark:text-[#f0ece6] mb-10',
                'transition-all duration-1000',
                revealed ? 'opacity-100' : 'opacity-0',
              )}
              style={{
                fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif',
                transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
              }}
            >
              We make images that last.
            </h2>

            {/* Body paragraphs with staggered clip-path reveal */}
            {[
              'ELARA is a commercial photography and visual direction studio. We work with fashion houses, editorial publications, and luxury brands to create images that transcend their medium. Our approach is rooted in classical composition, natural light, and an unwavering commitment to authenticity.',
              'Every project begins with a conversation — not a brief. We believe the best images emerge from genuine understanding: of the brand, the product, and the story behind it. Our team of photographers, art directors, and post-production specialists work as one integrated unit.',
              'We don\'t chase trends. We create images that feel as relevant in ten years as they do today. That\'s the standard we hold ourselves to, and it\'s what our clients return for, project after project.',
            ].map((text, i) => (
              <p
                key={i}
                className={cn(
                  'text-lg leading-[2] text-[#7a716a] dark:text-[#8a7e74] mb-8',
                  'transition-all duration-1000',
                  revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                )}
                style={{
                  fontFamily: 'EB Garamond, Georgia, serif',
                  transitionDelay: `${(i + 1) * 120}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                }}
              >
                {i === 0 && (
                  <span
                    className="float-left text-[4rem] leading-[0.8] mr-3 mt-1 font-light text-[#1a1714] dark:text-[#f0ece6]"
                    style={{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif' }}
                  >
                    {text.charAt(0)}
                  </span>
                )}
                {i === 0 ? text.slice(1) : text}
              </p>
            ))}

            {/* Pull quote */}
            <div
              className={cn(
                'my-12 py-8 border-t border-b border-[#e2ddd7] dark:border-[#2a2420] text-center',
                'transition-all duration-1000',
                revealed ? 'opacity-100' : 'opacity-0',
              )}
              style={{ transitionDelay: '500ms' }}
            >
              <blockquote
                className="text-xl lg:text-2xl font-light italic text-[#c0b8b0] dark:text-[#6a5e54]"
                style={{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif' }}
              >
                &ldquo;The camera is a machine that makes you see.&rdquo;
              </blockquote>
            </div>

            {/* Stats */}
            <div
              className={cn(
                'text-center transition-all duration-1000',
                revealed ? 'opacity-100' : 'opacity-0',
              )}
              style={{ transitionDelay: '600ms' }}
            >
              <p
                className="text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74]"
                style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
              >
                12 years · 84 campaigns · 31 countries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Services                                                */
/* ------------------------------------------------------------------ */

function ServicesSection() {
  const [expanded, setExpanded] = React.useState<number | null>(null);

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {SERVICES.map((service, i) => (
          <div
            key={i}
            className={cn(
              'group border-t border-[#e2ddd7] dark:border-[#2a2420] cursor-pointer',
              'transition-[background-color] duration-200',
              'hover:bg-[#f0ebe3] dark:hover:bg-[#181411]',
            )}
            onMouseEnter={() => setExpanded(i)}
            onMouseLeave={() => setExpanded(null)}
            data-cursor="link"
          >
            <div className="flex items-center justify-between py-4 lg:py-5 px-2">
              {/* Number */}
              <span
                className="w-12 text-sm font-light italic text-[#c0b8b0] dark:text-[#6a5e54]"
                style={{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Name */}
              <span
                className="flex-1 text-xl lg:text-2xl font-light text-[#1a1714] dark:text-[#f0ece6]"
                style={{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif' }}
              >
                {service.name}
              </span>

              {/* Arrow */}
              <span
                className={cn(
                  'text-[#e2ddd7] dark:text-[#2a2420] transition-all duration-200',
                  'group-hover:text-[#1a1714] dark:group-hover:text-[#f0ece6]',
                  'group-hover:translate-x-1.5',
                )}
              >
                <IconArrowRight />
              </span>
            </div>

            {/* Expandable description */}
            <div
              className={cn(
                'overflow-hidden transition-all duration-400 ease-out px-2',
                expanded === i ? 'max-h-20 pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0',
              )}
            >
              <p
                className="text-sm text-[#7a716a] dark:text-[#8a7e74] pl-12 max-w-xl leading-relaxed"
                style={{ fontFamily: 'EB Garamond, Georgia, serif' }}
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
        {/* Bottom border for last item */}
        <div className="border-t border-[#e2ddd7] dark:border-[#2a2420]" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Clients                                                 */
/* ------------------------------------------------------------------ */

function ClientsSection() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <p
          className="mb-10 text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74] text-center"
          style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
        >
          CLIENTS & COLLABORATORS
        </p>

        {/* Client names as typography — desktop: wrap, mobile: marquee */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-x-2 gap-y-3">
          {CLIENTS.map((client, i) => (
            <React.Fragment key={client}>
              <span
                className={cn(
                  'text-xl text-[#1a1714] dark:text-[#f0ece6] cursor-default transition-all duration-200',
                  hoveredIndex === i ? 'italic' : 'not-italic',
                )}
                style={{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif' }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-cursor="link"
              >
                {client}
              </span>
              {i < CLIENTS.length - 1 && (
                <span className="text-lg text-[#c0b8b0] dark:text-[#6a5e54] mx-1">·</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: horizontal marquee */}
        <div className="md:hidden overflow-hidden">
          <div className="flex gap-6 animate-[elara-marquee_20s_linear_infinite] whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <span
                key={i}
                className="text-lg text-[#1a1714] dark:text-[#f0ece6] inline-flex items-center gap-4"
                style={{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif' }}
              >
                {client}
                <span className="text-[#c0b8b0] dark:text-[#6a5e54]">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes elara-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Contact                                                 */
/* ------------------------------------------------------------------ */

function ContactSection() {
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const [fieldValues, setFieldValues] = React.useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  };

  const isActive = (name: string) => focusedField === name || (fieldValues[name] && fieldValues[name].length > 0);

  return (
    <section id="contact" className="min-h-dvh flex items-center py-20 bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div className="mx-auto max-w-xl px-6 lg:px-10 w-full text-center">
        {/* Headline */}
        <h2
          className="text-4xl lg:text-5xl font-light italic text-[#1a1714] dark:text-[#f0ece6] mb-6"
          style={{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif' }}
        >
          Let&apos;s work together.
        </h2>

        {/* Email */}
        <a
          href="mailto:studio@elara.co"
          className="inline-block text-2xl lg:text-3xl font-light text-[#1a1714] dark:text-[#f0ece6] relative group"
          style={{ fontFamily: 'Cormorant Garamond, Cormorant, Georgia, serif' }}
          data-cursor="link"
        >
          studio@elara.co
          <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1a1714] dark:bg-[#f0ece6] group-hover:w-full transition-all duration-300" />
        </a>

        {/* Location */}
        <p
          className="mt-4 mb-12 text-[10px] font-light uppercase tracking-[0.18em] text-[#7a716a] dark:text-[#8a7e74]"
          style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
        >
          Represented in London, Paris, New York
        </p>

        {/* Inquiry form */}
        <form
          className="space-y-6 text-left"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Floating label inputs */}
          {[
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'company', label: 'Company', type: 'text' },
          ].map((field) => (
            <div key={field.name} className="relative">
              <input
                type={field.type}
                name={field.name}
                value={fieldValues[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  'w-full bg-transparent border border-[#e2ddd7] dark:border-[#2a2420] px-4 py-3 pt-5',
                  'text-sm text-[#1a1714] dark:text-[#f0ece6]',
                  'outline-none transition-colors duration-200',
                  'focus:border-[#1a1714] dark:focus:border-[#f0ece6]',
                )}
                style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif', borderRadius: 0 }}
              />
              <label
                className={cn(
                  'absolute left-4 transition-all duration-200 pointer-events-none',
                  'text-[#7a716a] dark:text-[#8a7e74]',
                  isActive(field.name)
                    ? 'top-1 text-[9px] uppercase tracking-[0.15em]'
                    : 'top-3.5 text-sm',
                )}
                style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
              >
                {field.label}
              </label>
            </div>
          ))}

          {/* Selects */}
          {[
            { name: 'projectType', label: 'Project Type', options: ['Campaign', 'Editorial', 'Product', 'Motion', 'Creative Direction', 'Other'] },
            { name: 'budget', label: 'Budget Range', options: ['Under $10K', '$10K – $25K', '$25K – $50K', '$50K – $100K', '$100K+'] },
          ].map((field) => (
            <div key={field.name} className="relative">
              <select
                name={field.name}
                value={fieldValues[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  'w-full bg-transparent border border-[#e2ddd7] dark:border-[#2a2420] px-4 py-3 pt-5',
                  'text-sm text-[#1a1714] dark:text-[#f0ece6] appearance-none',
                  'outline-none transition-colors duration-200',
                  'focus:border-[#1a1714] dark:focus:border-[#f0ece6]',
                )}
                style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif', borderRadius: 0 }}
              >
                <option value="" disabled />
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <label
                className={cn(
                  'absolute left-4 transition-all duration-200 pointer-events-none',
                  'text-[#7a716a] dark:text-[#8a7e74]',
                  isActive(field.name)
                    ? 'top-1 text-[9px] uppercase tracking-[0.15em]'
                    : 'top-3.5 text-sm',
                )}
                style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
              >
                {field.label}
              </label>
            </div>
          ))}

          {/* Message textarea */}
          <div className="relative">
            <textarea
              name="message"
              rows={4}
              value={fieldValues.message || ''}
              onChange={(e) => handleChange('message', e.target.value)}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className={cn(
                'w-full bg-transparent border border-[#e2ddd7] dark:border-[#2a2420] px-4 py-3 pt-5',
                'text-sm text-[#1a1714] dark:text-[#f0ece6] resize-none',
                'outline-none transition-colors duration-200',
                'focus:border-[#1a1714] dark:focus:border-[#f0ece6]',
              )}
              style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif', borderRadius: 0 }}
            />
            <label
              className={cn(
                'absolute left-4 transition-all duration-200 pointer-events-none',
                'text-[#7a716a] dark:text-[#8a7e74]',
                isActive('message')
                  ? 'top-1 text-[9px] uppercase tracking-[0.15em]'
                  : 'top-3.5 text-sm',
              )}
              style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
            >
              Message
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            data-cursor="send"
            className={cn(
              'w-full py-3.5 bg-[#1a1714] dark:bg-[#f0ece6] text-white dark:text-[#1a1714]',
              'text-[10px] font-light uppercase tracking-[0.25em]',
              'transition-colors duration-200',
              'hover:bg-[#3d3630] dark:hover:bg-[#d9d4cc]',
            )}
            style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif', borderRadius: 0 }}
          >
            SEND INQUIRY
          </button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

function PhotographyFooter() {
  return (
    <footer className="border-t border-[#e2ddd7] dark:border-[#2a2420] bg-[#f6f3ef] dark:bg-[#0d0b09]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-[10px] font-light uppercase tracking-[0.18em] text-[#c0b8b0] dark:text-[#6a5e54]"
          style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
        >
          © ELARA {new Date().getFullYear()}
        </span>

        <span
          className="text-[10px] font-light uppercase tracking-[0.18em] text-[#c0b8b0] dark:text-[#6a5e54]"
          style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
        >
          London · Paris · New York
        </span>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-[10px] font-light uppercase tracking-[0.18em] text-[#c0b8b0] dark:text-[#6a5e54] hover:text-[#7a716a] dark:hover:text-[#8a7e74] transition-colors"
            style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
            data-cursor="link"
          >
            @elara.studio
          </a>
          <span className="text-[#c0b8b0] dark:text-[#6a5e54] text-[10px]">·</span>
          <a
            href="#"
            className="text-[10px] font-light uppercase tracking-[0.18em] text-[#c0b8b0] dark:text-[#6a5e54] hover:text-[#7a716a] dark:hover:text-[#8a7e74] transition-colors"
            style={{ fontFamily: 'Inter, Helvetica Neue, sans-serif' }}
            data-cursor="link"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  Template                                                            */
/* ================================================================== */

export interface PhotographyStudioTemplateProps {
  className?: string;
}

/**
 * PhotographyStudio — Commercial photography & visual arts studio portfolio template ("ELARA").
 *
 * Palette: Stone monochrome. Mode: Warm light primary, cinematic dark secondary.
 *
 * Sections:
 *   Nav (transparent floating) → Hero (fullscreen slideshow, 5s auto-advance, cross-dissolve) →
 *   Project Grid (asymmetric editorial layout) → Studio Statement (serif editorial) →
 *   Services (expandable numbered list) → Clients (typographic marquee) →
 *   Contact (full-vh centered, floating label form) → Footer (minimal single row)
 *
 * Features: Custom lerp cursor, camera-shutter page load, staggered clip-path reveals,
 *   service row expansion, client name italic toggle, progress bar slideshow counter.
 *
 * Typography: Cormorant Garamond (display), Inter/Helvetica Neue (UI micro-uppercase), EB Garamond (body).
 */
export function PhotographyStudioTemplate({ className }: PhotographyStudioTemplateProps) {
  return (
    <div
      className={cn(
        'min-h-screen antialiased',
        'bg-[#f6f3ef] dark:bg-[#0d0b09]',
        'text-[#1a1714] dark:text-[#f0ece6]',
        className,
      )}
    >
      {/* Google Fonts preconnect */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap');
      `}</style>

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <PhotographyNav />

      {/* Hero — Fullscreen slideshow */}
      <PhotographyHero />

      {/* Project Grid — Asymmetric editorial */}
      <ProjectGrid />

      {/* Studio Statement — Serif editorial */}
      <StudioStatement />

      {/* Services — Expandable numbered list */}
      <ServicesSection />

      {/* Clients — Typographic display */}
      <ClientsSection />

      {/* Contact — Full-vh centered */}
      <ContactSection />

      {/* Footer — Minimal */}
      <PhotographyFooter />
    </div>
  );
}
