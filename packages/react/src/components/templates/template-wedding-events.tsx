'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ================================================================== */
/*  WEDDING & LUXURY EVENTS — "Maison Eventail"                        */
/*  Ultra-luxury wedding planning & event design studio                 */
/*  Palette: Stone + Champagne gold                                     */
/*  Mode: Light warm-editorial primary, dark dramatic accent            */
/*  Typography: Libre Baskerville (display) + EB Garamond (prose)       */
/*               + Inter (nav/ui micro-caps) + DM Mono (dates/numbers)  */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/*  Inline SVG Icons                                                    */
/* ------------------------------------------------------------------ */

const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const IconInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Decorative SVG: Ornamental Divider (leaf ring motif)                */
/* ------------------------------------------------------------------ */

const OrnamentalDivider = ({ className }: { className?: string }) => (
  <svg
    width="60" height="16" viewBox="0 0 60 16" fill="none"
    className={className}
  >
    <path d="M0 8h18" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <circle cx="22" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="30" cy="8" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="38" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
    <path d="M42 8h18" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Design Token Utilities                                              */
/* ------------------------------------------------------------------ */

/** Micro-uppercase style: Inter weight 300, tracking-[0.15em], text-[10px] */
const microCaps = 'uppercase tracking-[0.15em] text-[10px] font-light';

/* ------------------------------------------------------------------ */
/*  Data — Portfolio                                                    */
/* ------------------------------------------------------------------ */

const PORTFOLIO_IMAGES = [
  { id: 1, title: 'Sophie & James', location: 'Château de Mireille, Provence', aspect: 'landscape-wide', image: 'https://placehold.co/1400x600/faf7f3/c5a96e?text=Sophie+%26+James' },
  { id: 2, title: 'Amara & Leo', location: 'Villa Cimbrone, Ravello', aspect: 'portrait', image: 'https://placehold.co/600x800/faf7f3/c5a96e?text=Amara+%26+Leo' },
  { id: 3, title: 'Isabella & Marc', location: 'Le Mas de Pierre, Grasse', aspect: 'landscape', image: 'https://placehold.co/800x600/faf7f3/c5a96e?text=Isabella+%26+Marc' },
  { id: 4, title: 'Elena & Thomas', location: 'Domaine de Fontenille, Luberon', aspect: 'square', image: 'https://placehold.co/500x500/faf7f3/c5a96e?text=Elena+%26+Thomas' },
  { id: 5, title: 'Clara & William', location: 'Château La Coste, Aix', aspect: 'square', image: 'https://placehold.co/500x500/faf7f3/c5a96e?text=Clara+%26+William' },
  { id: 6, title: 'Noémie & Arthur', location: 'Bastide de Gordes', aspect: 'square', image: 'https://placehold.co/500x500/faf7f3/c5a96e?text=No%C3%A9mie+%26+Arthur' },
];

/* ------------------------------------------------------------------ */
/*  Data — Services                                                     */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    title: 'Full Planning',
    subtitle: 'From first meeting to final dance.',
    description: 'We manage every element of your celebration — venue selection, vendor curation, design concept, timeline, logistics, and on-the-day coordination. Your only task is to arrive and be present.',
    image: 'https://placehold.co/1200x700/faf7f3/c5a96e?text=Full+Planning',
  },
  {
    title: 'Partial Planning',
    subtitle: 'For couples who need expert guidance on the final mile.',
    description: 'You\'ve started the journey, and we\'ll help you complete it beautifully. Three months of intensive support to refine your vision, manage vendors, and ensure a flawless execution.',
    image: 'https://placehold.co/1200x700/faf7f3/c5a96e?text=Partial+Planning',
  },
  {
    title: 'Design & Styling',
    subtitle: 'The aesthetic vision and creative direction of your celebration.',
    description: 'Colour palette, floral design, table setting, stationery, lighting — we craft the visual identity of your wedding day. Every detail is considered, every moment anticipated.',
    image: 'https://placehold.co/1200x700/faf7f3/c5a96e?text=Design+%26+Styling',
  },
];

/* ------------------------------------------------------------------ */
/*  Data — Venues                                                       */
/* ------------------------------------------------------------------ */

const VENUES = [
  { name: 'Château de Mireille', region: 'Provence', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Ch%C3%A2teau+de+Mireille' },
  { name: 'Domaine de Fontenille', region: 'Luberon', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Domaine+de+Fontenille' },
  { name: 'Bastide de Gordes', region: 'Vaucluse', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Bastide+de+Gordes' },
  { name: 'Villa Cimbrone', region: 'Ravello', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Villa+Cimbrone' },
  { name: 'Château La Coste', region: 'Aix-en-Provence', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Ch%C3%A2teau+La+Coste' },
  { name: 'Le Mas de Pierre', region: 'Grasse', image: 'https://placehold.co/480x360/faf7f3/c5a96e?text=Le+Mas+de+Pierre' },
];

/* ------------------------------------------------------------------ */
/*  Data — Testimonials                                                 */
/* ------------------------------------------------------------------ */

const TESTIMONIALS = [
  {
    quote: "From our first meeting in their sun-filled Aups studio to the final dance under the olive trees, Maison Eventail made us feel like the only couple in the world. They didn't plan a wedding — they composed a love letter in flowers, light, and sound. Our guests still talk about the evening two years later.",
    name: 'Sophie & James Beaumont',
    detail: 'Provence, June 2024',
  },
  {
    quote: "We came to them with nothing more than a feeling — 'intimate, timeless, alive.' They translated that into a three-day celebration across two venues that felt like stepping into a painting. The attention to detail was breathtaking: handwritten place cards, a string quartet playing our first date's playlist, lavender from the garden lining every aisle.",
    name: 'Amara & Leo Chen-Williams',
    detail: 'Ravello, September 2023',
  },
  {
    quote: "Having planned events professionally for fifteen years, I knew what to look for — and what to avoid. Maison Eventail exceeded every standard I'd set. Their vendor relationships in Provence are unmatched, their aesthetic is effortlessly refined, and their calm under pressure on the day itself was extraordinary. I cannot recommend them more wholeheartedly.",
    name: 'Isabella Laurent & Marc Duval',
    detail: 'Grasse, May 2024',
  },
];

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */

function WeddingNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Weddings', 'Events', 'Portfolio', 'About', 'Contact'];

  return (
    <>
      {/* Top gold border — signature detail */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-px bg-[#c5a96e]/20 dark:bg-[#c5a96e]/20" />

      {/* Main nav */}
      <header className="fixed top-px left-0 right-0 z-50">
        <div className="mx-auto flex items-center justify-between px-6 lg:px-12 py-5 max-w-[1400px]">
          {/* Logo */}
          <a
            href="#"
            className={cn(
              microCaps, 'tracking-[0.3em] text-[11px] transition-colors duration-300',
              scrolled
                ? 'text-[#1c1714] dark:text-[#c5a96e]'
                : 'text-[#c5a96e]',
            )}
          >
            MAISON EVENTAIL
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={cn(
                  microCaps, 'transition-colors duration-200',
                  scrolled
                    ? 'text-[#7a6e63] dark:text-[#9a8a7a] hover:text-[#c5a96e] dark:hover:text-[#c5a96e]'
                    : 'text-[#7a6e63] hover:text-[#c5a96e]',
                )}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              microCaps, 'md:hidden transition-colors duration-200',
              scrolled ? 'text-[#1c1714] dark:text-[#c5a96e]' : 'text-[#c5a96e]',
            )}
          >
            {mobileOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] flex">
          {/* Left side — images */}
          <div className="hidden sm:block w-[55%] relative overflow-hidden bg-[#1c1714]">
            <img
              src="https://placehold.co/800x1200/1c1714/c5a96e?text=Wedding+Gallery"
              alt="Wedding"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          </div>
          {/* Right side — links */}
          <div className="flex flex-col justify-center px-10 sm:w-[45%] w-full bg-[#faf7f3] dark:bg-[#1c1714]">
            {links.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="font-serif italic text-2xl py-4 border-b border-[#c5a96e]/10 hover:text-[#c5a96e] transition-colors duration-200 text-[#1c1714] dark:text-[#f8f3ec]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link}
              </a>
            ))}
            <div className="mt-12 font-mono text-[10px] text-[#c5a96e]/60">
              +33 (0)4 94 70 12 34
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — First Impression as Art Direction                            */
/* ------------------------------------------------------------------ */

function WeddingHero() {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden bg-[#faf7f3] dark:bg-[#1c1714]">
      {/* Fullscreen wedding photograph */}
      <div className="absolute inset-0">
        <img
          src="https://placehold.co/1920x1080/e8ddd0/c5a96e?text=Golden+Hour+Wedding"
          alt="Wedding at golden hour"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(28,23,20,0) 30%, rgba(28,23,20,0.35) 100%)',
        }}
      />

      {/* Bottom gradient transition */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--wedding-bg, #faf7f3), transparent)',
        }}
      />

      {/* Content overlay — lower third */}
      <div className="relative z-10 text-center pb-20 px-6 max-w-3xl mx-auto">
        {/* Gold rule */}
        <div className="w-[60px] h-px bg-[#c5a96e]/40 mx-auto mb-8" />

        {/* Headline */}
        <h1
          className="font-serif italic font-light text-white leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          Where love becomes art.
        </h1>

        {/* Subtitle */}
        <p className={cn(microCaps, 'text-white/60 mb-10')}>
          SOUTH OF FRANCE · BESPOKE WEDDINGS · EST. 2009
        </p>

        {/* CTA */}
        <a
          href="#contact"
          className={cn(
            microCaps, 'text-[11px] text-[#c5a96e] inline-flex items-center gap-2 group relative',
          )}
        >
          Begin your story
          <IconArrowRight />
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c5a96e] transition-all duration-300 group-hover:w-full" />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1 — The Studio                                              */
/* ------------------------------------------------------------------ */

function StudioSection() {
  return (
    <section id="about" className="py-24 lg:py-36 bg-[#faf7f3] dark:bg-[#1c1714]">
      <div className="max-w-xl mx-auto px-6 text-center">
        {/* Ornamental divider */}
        <OrnamentalDivider className="mx-auto mb-12 text-[#c5a96e]" />

        {/* Opening prose */}
        <p
          className="font-serif italic text-xl lg:text-2xl text-[#7a6e63] dark:text-[#9a8a7a] leading-[2] mb-10"
          style={{ fontFamily: "'EB Garamond', 'Georgia', serif" }}
        >
          We believe a wedding is the most personal expression of a love story — and it deserves to be told with the same care as a great novel.
        </p>

        {/* Paragraphs */}
        <div className="space-y-6 text-left">
          <p
            className="text-sm leading-relaxed text-[#7a6e63] dark:text-[#9a8a7a]"
            style={{ fontFamily: "'EB Garamond', 'Georgia', serif", fontSize: '1.05rem', lineHeight: '1.9' }}
          >
            Maison Eventail was founded in the lavender fields of Provence with a simple conviction: that the most memorable celebrations are not produced — they are composed. Each wedding we design is a bespoke work of art, shaped by the couple's story, their desires, and the landscape that holds them.
          </p>
          <p
            className="text-sm leading-relaxed text-[#7a6e63] dark:text-[#9a8a7a]"
            style={{ fontFamily: "'EB Garamond', 'Georgia', serif", fontSize: '1.05rem', lineHeight: '1.9' }}
          >
            Our approach is intimate by design. We take only fifteen weddings per year, ensuring that each couple receives our full attention, our deepest creativity, and our unwavering commitment to perfection. From the first conversation to the last farewell, we are present.
          </p>
          <p
            className="text-sm leading-relaxed text-[#7a6e63] dark:text-[#9a8a7a]"
            style={{ fontFamily: "'EB Garamond', 'Georgia', serif", fontSize: '1.05rem', lineHeight: '1.9' }}
          >
            We work with the finest artisans, florists, chefs, and musicians in the South of France — relationships built over fifteen years of shared dedication to beauty and craft.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote className="mt-14 mb-10">
          <p
            className="font-serif italic text-2xl lg:text-3xl text-[#c5a96e] leading-snug"
          >
            &ldquo;Every detail is considered. Every moment, anticipated.&rdquo;
          </p>
        </blockquote>

        {/* Stats */}
        <p className={cn(microCaps, 'text-[#7a6e63] dark:text-[#9a8a7a]')}>
          15 years · 240 weddings · 18 countries
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — Portfolio                                               */
/* ------------------------------------------------------------------ */

function PortfolioSection() {
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 lg:py-36 bg-[#faf7f3] dark:bg-[#1c1714]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <h2 className={cn(microCaps, 'text-[#c5a96e] mb-16 text-center')}>
          OUR WORK
        </h2>

        {/* Asymmetric grid */}
        <div className="space-y-4">
          {/* Row 1: Full-width cinematic landscape */}
          <div
            className="relative overflow-hidden rounded-sm group cursor-pointer"
            style={{ aspectRatio: '21/9' }}
            onMouseEnter={() => setHoveredId(1)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <img
              src={PORTFOLIO_IMAGES[0].image}
              alt={PORTFOLIO_IMAGES[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              style={{ transitionTimingFunction: 'ease-in-out' }}
            />
            {/* Scrim + text on hover */}
            <div className={cn(
              'absolute inset-0 bg-gradient-to-t from-[#1c1714]/60 to-transparent transition-opacity duration-400',
              hoveredId === 1 ? 'opacity-100' : 'opacity-0',
            )}>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-serif italic text-xl text-white mb-1">{PORTFOLIO_IMAGES[0].title}</h3>
                <p className={cn(microCaps, 'text-white/60')}>{PORTFOLIO_IMAGES[0].location}</p>
              </div>
            </div>
          </div>

          {/* Row 2: Two columns (portrait + landscape) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PORTFOLIO_IMAGES.slice(1, 3).map((img) => (
              <div
                key={img.id}
                className="relative overflow-hidden rounded-sm group cursor-pointer"
                style={{ aspectRatio: img.aspect === 'portrait' ? '3/4' : '4/3' }}
                onMouseEnter={() => setHoveredId(img.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: 'ease-in-out' }}
                />
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-t from-[#1c1714]/60 to-transparent transition-opacity duration-400',
                  hoveredId === img.id ? 'opacity-100' : 'opacity-0',
                )}>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-serif italic text-xl text-white mb-1">{img.title}</h3>
                    <p className={cn(microCaps, 'text-white/60')}>{img.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Three-column squares */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PORTFOLIO_IMAGES.slice(3, 6).map((img) => (
              <div
                key={img.id}
                className="relative overflow-hidden rounded-sm group cursor-pointer aspect-square"
                onMouseEnter={() => setHoveredId(img.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: 'ease-in-out' }}
                />
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-t from-[#1c1714]/60 to-transparent transition-opacity duration-400',
                  hoveredId === img.id ? 'opacity-100' : 'opacity-0',
                )}>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-serif italic text-lg text-white mb-1">{img.title}</h3>
                    <p className={cn(microCaps, 'text-white/60')}>{img.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View full portfolio link */}
        <div className="text-center mt-12">
          <a
            href="#"
            className={cn(
              microCaps, 'text-[11px] text-[#c5a96e] inline-flex items-center gap-2 group relative',
            )}
          >
            VIEW FULL PORTFOLIO
            <IconArrowRight />
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c5a96e] transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Services                                                */
/* ------------------------------------------------------------------ */

function ServicesSection() {
  return (
    <section id="weddings" className="bg-[#faf7f3] dark:bg-[#1c1714]">
      {SERVICES.map((service, i) => (
        <div key={service.title} className="relative group">
          {/* Full-bleed image with Ken Burns */}
          <div className="relative overflow-hidden" style={{ height: '60vh', minHeight: '400px' }}>
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[12000ms] group-hover:scale-[1.04]"
              style={{ transitionTimingFunction: 'ease-in-out' }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1714]/70 via-[#1c1714]/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
            <h3 className="font-serif italic text-3xl lg:text-4xl text-[#1c1714] dark:text-[#f8f3ec] mb-2">
              {service.title}
            </h3>
            <p className={cn(microCaps, 'text-[#c5a96e] mb-4')}>
              {service.subtitle}
            </p>
            <p
              className="text-[#7a6e63] dark:text-[#9a8a7a] max-w-xl leading-relaxed"
              style={{ fontFamily: "'EB Garamond', 'Georgia', serif", fontSize: '1.05rem', lineHeight: '1.9' }}
            >
              {service.description}
            </p>
            {/* Gold rule */}
            {i < SERVICES.length - 1 && (
              <div className="w-[60px] h-px bg-[#c5a96e]/40 mt-10" />
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Venues (Horizontal Scroll)                              */
/* ------------------------------------------------------------------ */

function VenuesSection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <section id="events" className="py-24 lg:py-36 bg-[#f5f0ea] dark:bg-[#261e18]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 className={cn(microCaps, 'text-[#c5a96e] mb-16 text-center')}>
          OUR VENUES
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {VENUES.map((venue) => (
            <div
              key={venue.name}
              className="snap-start shrink-0 w-[300px] lg:w-[340px] group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-sm mb-4 aspect-[4/3]">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                />
              </div>
              {/* Name */}
              <h3 className="font-serif italic text-lg text-[#1c1714] dark:text-[#f8f3ec] group-hover:text-[#c5a96e] transition-colors duration-200 mb-1">
                {venue.name}
              </h3>
              {/* Region */}
              <span className={cn(microCaps, 'text-[#b5a89c] dark:text-[#9a8a7a]')}>
                {venue.region}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Client Words (Testimonials)                             */
/* ------------------------------------------------------------------ */

function TestimonialsSection() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [paused]);

  const t = TESTIMONIALS[active];

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-[#faf7f3] dark:bg-[#1c1714] px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-3xl text-center relative">
        {/* Large decorative quote mark */}
        <span
          className="font-serif text-[#c5a96e]/10 select-none pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2"
          style={{ fontSize: '10rem', lineHeight: 1 }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Quote */}
        <blockquote className="relative z-10">
          <p
            className="font-serif italic text-lg lg:text-xl text-[#1c1714] dark:text-[#f8f3ec] leading-[1.9] mb-10"
            style={{ fontFamily: "'EB Garamond', 'Georgia', serif" }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer>
            <cite className="not-italic">
              <span className={cn(microCaps, 'text-[#c5a96e] block mb-1')}>{t.name}</span>
              <span className={cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44]')}>{t.detail}</span>
            </cite>
          </footer>
        </blockquote>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'w-8 h-px transition-all duration-[800ms]',
                i === active ? 'bg-[#c5a96e]' : 'bg-[#c5a96e]/20',
              )}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Contact                                                 */
/* ------------------------------------------------------------------ */

function ContactSection() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <section id="contact" className="py-24 lg:py-36 bg-[#faf7f3] dark:bg-[#1c1714]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className={cn(microCaps, 'text-[#c5a96e] mb-6')}>
          LET&apos;S BEGIN YOUR STORY
        </h2>
        <p className="font-serif italic text-2xl lg:text-3xl text-[#1c1714] dark:text-[#f8f3ec] font-light mb-4">
          We take only 15 enquiries per year — availability is limited.
        </p>

        {/* Ornamental divider */}
        <OrnamentalDivider className="mx-auto my-10 text-[#c5a96e]" />

        {/* Form */}
        <form
          className="space-y-6 text-left max-w-lg mx-auto"
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        >
          <div>
            <label className={cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')}>Names</label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
              placeholder="Your names"
            />
          </div>
          <div>
            <label className={cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')}>Wedding date</label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
              placeholder="Approximate date (e.g. June 2027)"
            />
          </div>
          <div>
            <label className={cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')}>Location in mind</label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
              placeholder="Region or venue"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')}>Guest count</label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
                placeholder="e.g. 80"
              />
            </div>
            <div>
              <label className={cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')}>Budget range</label>
              <select className="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors appearance-none">
                <option value="" className="bg-[#faf7f3] dark:bg-[#1c1714]">Select range</option>
                <option value="150-300" className="bg-[#faf7f3] dark:bg-[#1c1714]">€150,000 – €300,000</option>
                <option value="300-500" className="bg-[#faf7f3] dark:bg-[#1c1714]">€300,000 – €500,000</option>
                <option value="500-1m" className="bg-[#faf7f3] dark:bg-[#1c1714]">€500,000 – €1,000,000</option>
                <option value="1m+" className="bg-[#faf7f3] dark:bg-[#1c1714]">€1,000,000+</option>
              </select>
            </div>
          </div>
          <div>
            <label className={cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44] block mb-1.5')}>Message</label>
            <textarea
              rows={3}
              className="w-full bg-transparent border-b border-[#e2ddd7] dark:border-[#3a2e24] text-[#1c1714] dark:text-[#f8f3ec] text-sm py-2.5 outline-none focus:border-[#c5a96e]/50 transition-colors resize-none placeholder:text-[#b5a89c] dark:placeholder:text-[#5a4e44]"
              placeholder="Tell us about your vision"
            />
          </div>

          <button
            type="submit"
            className={cn(
              microCaps, 'text-[11px] mt-4 w-full py-3.5',
              'bg-[#c5a96e] text-white rounded-sm',
              'hover:bg-[#b89258] transition-colors duration-200',
              submitted && 'bg-[#b89258]',
            )}
          >
            {submitted ? '✓ ENQUIRY SENT' : 'SEND YOUR ENQUIRY'}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

function WeddingFooter() {
  return (
    <footer className="py-10 bg-[#faf7f3] dark:bg-[#1c1714]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Ornamental divider */}
        <OrnamentalDivider className="mx-auto mb-8 text-[#c5a96e]" />

        <div className="flex flex-col items-center gap-3 text-center">
          <span className={cn(microCaps, 'text-[#b5a89c] dark:text-[#5a4e44]')}>
            MAISON EVENTAIL · AUPS, PROVENCE · FRANCE
          </span>
          <span className="font-mono text-[10px] text-[#b5a89c] dark:text-[#5a4e44]">
            hello@maison-eventail.com · +33 (0)4 94 70 12 34
          </span>
          <a
            href="#"
            className={cn(
              microCaps,
              'text-[#b5a89c] dark:text-[#5a4e44] hover:text-[#c5a96e] dark:hover:text-[#c5a96e] transition-colors inline-flex items-center gap-1.5',
            )}
          >
            <IconInstagram /> @maison.eventail
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  Main Template Export                                                 */
/* ================================================================== */

export interface WeddingEventsTemplateProps {
  /** Optional additional className */
  className?: string;
}

/**
 * WeddingEventsTemplate — Ultra-luxury wedding planning & event design template ("Maison Eventail").
 *
 * Palette: Stone + Champagne gold (#c5a96e) · Light warm-editorial primary
 *
 * Typography:
 *   Display: Libre Baskerville (serif italic, light weight)
 *   Prose: EB Garamond (serif, flowing body text)
 *   UI/Nav: Inter (micro-uppercase, tracking-[0.15em], 10px)
 *   Dates: DM Mono (numbers, contact details)
 *
 * Sections:
 *   WeddingNav (fixed, transparent, gold top border) → WeddingHero (fullscreen photo, lower-third text) →
 *   StudioSection (centered prose, pull-quote) → PortfolioSection (asymmetric grid) →
 *   ServicesSection (3 full-bleed Ken Burns) → VenuesSection (horizontal scroll) →
 *   TestimonialsSection (15s auto-advance, cross-dissolve) → ContactSection (inquiry form) →
 *   WeddingFooter (ornamental, minimal)
 *
 * Light mode: Warm cream (#faf7f3) with champagne gold (#c5a96e) accents
 * Dark mode: Warm dark editorial (#1c1714) with same gold accent
 */
export function WeddingEventsTemplate({ className }: WeddingEventsTemplateProps) {
  return (
    <div
      className={cn(
        'min-h-screen antialiased',
        'bg-[#faf7f3] dark:bg-[#1c1714]',
        className,
      )}
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        // CSS custom property for gradient transitions
        ['--wedding-bg' as string]: '#faf7f3',
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');

        .font-serif {
          font-family: 'Libre Baskerville', 'Georgia', serif;
        }
        .font-mono {
          font-family: 'DM Mono', 'Menlo', monospace;
        }

        /* Hide scrollbar for venues filmstrip */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* Gold ornamental rule draw animation */
        @keyframes goldRuleDraw {
          0% { width: 0; }
          100% { width: 60px; }
        }

        /* Dark mode bg override for CSS property */
        .dark {
          --wedding-bg: #1c1714;
        }
      `}</style>

      <WeddingNav />
      <WeddingHero />
      <StudioSection />
      <PortfolioSection />
      <ServicesSection />
      <VenuesSection />
      <TestimonialsSection />
      <ContactSection />
      <WeddingFooter />
    </div>
  );
}

WeddingEventsTemplate.displayName = 'WeddingEventsTemplate';
