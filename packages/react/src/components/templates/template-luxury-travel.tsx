'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ================================================================== */
/*  LUXURY TRAVEL & TOURISM — "Voyage Atelier"                        */
/*  Ultra-luxury bespoke travel design agency                          */
/*  Palette: Dusk (Stone) + Gold                                       */
/*  Mode: Dark cinematic primary, warm light secondary                 */
/*  Typography: Libre Baskerville (display) + Inter (UI/nav)           */
/*                + DM Mono (coordinates/numbers)                      */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/*  Inline SVG Icons                                                    */
/* ------------------------------------------------------------------ */

const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Design Token Utilities                                              */
/* ------------------------------------------------------------------ */

/** Micro-uppercase style: Inter weight 300, tracking-[0.15em], text-[11px] */
const microCaps = 'uppercase tracking-[0.15em] text-[11px] font-light';

/* ------------------------------------------------------------------ */
/*  Data — Destinations                                                 */
/* ------------------------------------------------------------------ */

const COORDINATES = [
  "23°46'N · 90°22'E",
  "4°10'S · 55°30'E",
  "35°01'N · 135°46'E",
  "51°28'S · 69°09'W",
  "3°24'S · 36°41'E",
  "48°52'N · 2°21'E",
];

const DESTINATIONS = [
  {
    name: 'Patagonia',
    type: 'Remote Wilderness',
    coords: "51°28'S · 69°09'W",
    image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Patagonia',
  },
  {
    name: 'Maldives',
    type: 'Private Island',
    coords: "4°10'N · 73°30'E",
    image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Maldives',
  },
  {
    name: 'Kyoto',
    type: 'Cultural Immersion',
    coords: "35°01'N · 135°46'E",
    image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Kyoto',
  },
  {
    name: 'Serengeti',
    type: 'Remote Wilderness',
    coords: "2°20'S · 34°50'E",
    image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Serengeti',
  },
  {
    name: 'Amalfi Coast',
    type: 'Private Charter',
    coords: "40°38'N · 14°36'E",
    image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Amalfi',
  },
  {
    name: 'Iceland',
    type: 'Expedition',
    coords: "64°08'N · 21°56'W",
    image: 'https://placehold.co/480x640/0a0806/c49a5c?text=Iceland',
  },
];

/* ------------------------------------------------------------------ */
/*  Data — Process Steps                                                */
/* ------------------------------------------------------------------ */

const PROCESS_STEPS = [
  { number: '01', name: 'Consultation', description: 'We begin with a conversation, not a booking form.' },
  { number: '02', name: 'Curation', description: 'Our regional specialists design your itinerary from scratch.' },
  { number: '03', name: 'Refinement', description: 'We iterate until every detail feels right.' },
  { number: '04', name: 'Departure', description: 'We remain your point of contact throughout your journey.' },
];

/* ------------------------------------------------------------------ */
/*  Data — Experiences                                                  */
/* ------------------------------------------------------------------ */

const EXPERIENCES = [
  {
    title: 'Private Islands',
    subtitle: 'Exclusive retreats beyond the reach of the ordinary',
    description: 'Secluded archipelagos and private atolls, staffed and styled to your exacting preferences. Complete privacy, absolute luxury.',
    image: 'https://placehold.co/1920x800/0a0806/c49a5c?text=Private+Islands',
  },
  {
    title: 'Expedition Yachts',
    subtitle: 'Navigate the world\'s most remote coastlines',
    description: 'Bespoke marine expeditions aboard 60m+ explorer yachts. Your itinerary, your captain, your pace.',
    image: 'https://placehold.co/1920x800/0a0806/c49a5c?text=Expedition+Yachts',
  },
  {
    title: 'Cultural Immersions',
    subtitle: 'Access that cannot be purchased — only arranged',
    description: 'Private temple ceremonies, artisan workshops, dinner with local masters. Deep cultural access, respectfully curated.',
    image: 'https://placehold.co/1920x800/0a0806/c49a5c?text=Cultural+Immersions',
  },
  {
    title: 'Remote Wilderness',
    subtitle: 'Earth\'s last untouched frontiers, made accessible',
    description: 'Fly-in safaris, polar expeditions, and desert camps in locations that appear on no brochure.',
    image: 'https://placehold.co/1920x800/0a0806/c49a5c?text=Remote+Wilderness',
  },
];

/* ------------------------------------------------------------------ */
/*  Data — Testimonials                                                 */
/* ------------------------------------------------------------------ */

const TESTIMONIALS = [
  {
    quote: "Voyage Atelier designed a three-week journey through Japan that exceeded every expectation we'd set — and we had high expectations. Each day revealed something we would never have found on our own: hidden gardens, private tea ceremonies, a kaiseki chef who prepared dinner in our ryokan solely for the two of us.",
    name: 'Elisabeth & Charles Whitmore',
    detail: 'Journey: Japan, Autumn 2024',
  },
  {
    quote: "We've used several luxury travel agencies over the years. Voyage Atelier is the first that actually listened. They didn't sell us a package — they asked what kind of people we are, then built something around the answer. Our Patagonia trip was the most meaningful two weeks of our lives.",
    name: 'Dr. Alessandro Rinaldi',
    detail: 'Journey: Patagonia, March 2024',
  },
  {
    quote: "From the first conversation to the final evening in the Maldives, we felt genuinely cared for — not as clients, but as guests. The attention to detail was extraordinary. They remembered my wife's birthday and arranged a private beach dinner with a local string quartet.",
    name: 'James & Priya Ashworth',
    detail: 'Journey: Maldives, January 2025',
  },
];

/* ------------------------------------------------------------------ */
/*  Data — Journal Entries                                              */
/* ------------------------------------------------------------------ */

const JOURNAL_ENTRIES = [
  {
    title: 'A Season of Light in the Arctic Circle',
    destination: 'Svalbard, Norway',
    readingTime: '8 min read',
    image: 'https://placehold.co/600x400/0a0806/c49a5c?text=Arctic+Light',
  },
  {
    title: 'Lost Temples of the Irrawaddy',
    destination: 'Myanmar',
    readingTime: '12 min read',
    image: 'https://placehold.co/600x400/0a0806/c49a5c?text=Myanmar+Temples',
  },
  {
    title: 'The Vintner\'s Table: Burgundy in Harvest',
    destination: 'Burgundy, France',
    readingTime: '6 min read',
    image: 'https://placehold.co/600x400/0a0806/c49a5c?text=Burgundy+Harvest',
  },
];

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */

function TravelNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Destinations', 'Experiences', 'About', 'Journal', 'Contact'];

  return (
    <>
      {/* Phone bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex justify-end px-6 lg:px-12 py-2">
        <span className={cn(
          'font-mono text-[10px] transition-colors duration-300',
          scrolled ? 'text-[#1a1410]/60 dark:text-[#c49a5c]/60' : 'text-[#c49a5c]/60',
        )}>
          +44 20 7123 4567 · Available 24/7
        </span>
      </div>

      {/* Main nav */}
      <header className={cn(
        'fixed top-6 left-0 right-0 z-50 transition-all duration-500',
        scrolled && 'border-b border-[#c49a5c]/20',
      )}>
        <div className="mx-auto flex items-center justify-between px-6 lg:px-12 py-3 max-w-[1400px]">
          {/* Logo */}
          <a href="#" className={cn(
            microCaps, 'tracking-[0.25em] transition-colors duration-300',
            scrolled
              ? 'text-[#1a1410] dark:text-[#c49a5c]'
              : 'text-[#c49a5c]',
          )}>
            VOYAGE ATELIER
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={cn(
                  microCaps, 'transition-colors duration-200 hover:text-[#f5ede0]',
                  scrolled
                    ? 'text-[#6a5e54] dark:text-[#9a8878] hover:text-[#1a1410] dark:hover:text-[#f5ede0]'
                    : 'text-[#9a8878] hover:text-[#f5ede0]',
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
              scrolled ? 'text-[#1a1410] dark:text-[#c49a5c]' : 'text-[#c49a5c]',
            )}
          >
            {mobileOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] bg-[#0a0806]/98 flex">
          {/* Left side — image */}
          <div className="hidden sm:block w-[55%] relative overflow-hidden">
            <img
              src="https://placehold.co/800x1200/0a0806/c49a5c?text=Voyage"
              alt="Travel"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          </div>
          {/* Right side — links */}
          <div className="flex flex-col justify-center px-10 sm:w-[45%] w-full">
            {links.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="text-[#f5ede0] text-2xl font-light py-4 border-b border-[#c49a5c]/10 hover:text-[#c49a5c] transition-colors duration-200"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link}
              </a>
            ))}
            <div className="mt-12 font-mono text-[10px] text-[#c49a5c]/60">
              +44 20 7123 4567
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — The World as Your Canvas                                     */
/* ------------------------------------------------------------------ */

function TravelHero() {
  const [coordIndex, setCoordIndex] = React.useState(0);
  const [fadeClass, setFadeClass] = React.useState('opacity-100');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('opacity-0');
      setTimeout(() => {
        setCoordIndex((prev) => (prev + 1) % COORDINATES.length);
        setFadeClass('opacity-100');
      }, 400);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0806] dark:bg-[#0a0806]">
      {/* Video placeholder (dark cinematic background) */}
      <div className="absolute inset-0">
        <img
          src="https://placehold.co/1920x1080/0a0806/1c1610?text=Cinematic+Aerial+Video"
          alt="Aerial landscape"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Overlay 1: Noise texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
      />

      {/* Overlay 2: Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,8,6,0.6) 100%)' }}
      />

      {/* Overlay 3: Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0a0806, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        {/* Geographic coordinates */}
        <p className={cn(
          'font-mono text-xs text-[#c49a5c]/60 mb-8 transition-opacity duration-400',
          fadeClass,
        )}>
          {COORDINATES[coordIndex]}
        </p>

        {/* Headline */}
        <h1 className="font-serif italic font-light text-[#f5ede0] leading-[1.1] mb-8"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}>
          Every journey, a singular story.
        </h1>

        {/* Subheadline */}
        <p className="font-serif text-lg lg:text-xl text-[#9a8878] max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ fontFamily: "'EB Garamond', 'Georgia', serif" }}>
          We design journeys for those who've seen everything and seek to feel something. Private, unhurried, unrepeatable.
        </p>

        {/* CTA link */}
        <a
          href="#contact"
          className={cn(
            microCaps, 'text-[12px] text-[#c49a5c] inline-flex items-center gap-2',
            'group relative',
          )}
        >
          Begin your journey
          <IconArrowRight />
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c49a5c] transition-all duration-300 group-hover:w-full" />
        </a>

        {/* Destination pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {['Patagonia', 'Maldives', 'Kyoto'].map((dest) => (
            <a
              key={dest}
              href="#destinations"
              className={cn(
                microCaps, 'text-[#c49a5c] px-4 py-1.5 rounded-full',
                'border border-[#c49a5c]/20 hover:border-[#c49a5c]/50 transition-colors duration-200',
              )}
            >
              ⬡ {dest}
            </a>
          ))}
        </div>
      </div>

      {/* Video credit */}
      <span className="absolute bottom-4 right-6 text-[9px] text-[#f5ede0]/30 font-light">
        Cinematography: Thomas Heaton
      </span>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1 — Destinations Filmstrip                                  */
/* ------------------------------------------------------------------ */

function DestinationsSection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section id="destinations" className="py-20 lg:py-32 bg-[#0a0806] dark:bg-[#0a0806]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <h2 className={cn(microCaps, 'text-[#c49a5c] mb-12')}>
          CURATED DESTINATIONS
        </h2>

        {/* Scroll controls */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-[#1c1610]/80 text-[#c49a5c] hover:bg-[#1c1610] transition-colors"
          >
            <IconChevronLeft />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-[#1c1610]/80 text-[#c49a5c] hover:bg-[#1c1610] transition-colors"
          >
            <IconChevronRight />
          </button>

          {/* Filmstrip */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.name}
                className="snap-start shrink-0 w-[280px] sm:w-[300px] lg:w-[260px] xl:w-[280px] group relative overflow-hidden rounded-lg cursor-pointer"
                style={{ aspectRatio: '2/3' }}
              >
                {/* Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                />

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.7)] via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {/* Coords */}
                  <span className="font-mono text-[10px] text-[#c49a5c]/70 block mb-1">
                    {dest.coords}
                  </span>
                  {/* Name */}
                  <h3 className="font-serif italic text-xl lg:text-2xl text-white mb-1">
                    {dest.name}
                  </h3>
                  {/* Type */}
                  <span className={cn(microCaps, 'text-[#9a8878] block mb-3')}>
                    {dest.type}
                  </span>
                  {/* Gold rule */}
                  <div className="h-px bg-[#c49a5c]/30 mb-3 w-12 transition-all duration-500 group-hover:w-20" />
                  {/* Explore link */}
                  <span className={cn(
                    microCaps, 'text-[#9a8878] inline-flex items-center gap-1.5',
                    'group-hover:text-[#c49a5c] transition-colors duration-200',
                  )}>
                    Explore <IconArrowRight />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — The Atelier Process                                     */
/* ------------------------------------------------------------------ */

function ProcessSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#1c1610] dark:bg-[#1c1610]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <h2 className="font-serif text-3xl lg:text-4xl font-light text-[#f5ede0] mb-4">
          How We Craft Your Journey
        </h2>
        <p className={cn(microCaps, 'text-[#c49a5c] mb-16')}>
          THE ATELIER PROCESS
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-4 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#c49a5c]/20" />

          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="relative text-center md:text-left">
              {/* Number dot */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="w-4 h-4 rounded-full border border-[#c49a5c]/40 bg-[#1c1610] relative z-10 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c49a5c]" />
                </span>
                <span className="font-mono text-sm text-[#c49a5c]">{step.number}</span>
              </div>
              {/* Step name */}
              <h3 className={cn(microCaps, 'text-[#f5ede0] mb-3')}>{step.name}</h3>
              {/* Description */}
              <p className="font-serif text-sm text-[#9a8878] leading-relaxed max-w-[220px] mx-auto md:mx-0"
                style={{ fontFamily: "'EB Garamond', 'Georgia', serif" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Experiences                                             */
/* ------------------------------------------------------------------ */

function ExperiencesSection() {
  return (
    <section id="experiences" className="bg-[#0a0806] dark:bg-[#0a0806]">
      {EXPERIENCES.map((exp) => (
        <div
          key={exp.title}
          className="relative overflow-hidden group"
          style={{ height: '80vh', minHeight: '500px' }}
        >
          {/* Background image */}
          <img
            src={exp.image}
            alt={exp.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            style={{ transform: 'scale(1.01)' }}
          />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.3)] to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 max-w-[1400px] mx-auto">
            <span className={cn(microCaps, 'text-[#c49a5c] block mb-2')}>
              {exp.subtitle}
            </span>
            <h3 className="font-serif italic text-4xl lg:text-6xl text-[#f5ede0] mb-4">
              {exp.title}
            </h3>
            <p className="font-serif text-lg text-[#9a8878] max-w-xl leading-relaxed mb-6"
              style={{ fontFamily: "'EB Garamond', 'Georgia', serif" }}>
              {exp.description}
            </p>
            <a
              href="#contact"
              className={cn(
                microCaps, 'text-[12px] text-[#c49a5c] inline-flex items-center gap-2 group/link relative',
              )}
            >
              Inquire about this experience
              <IconArrowRight />
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c49a5c] transition-all duration-300 group-hover/link:w-full" />
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Testimonials                                            */
/* ------------------------------------------------------------------ */

function TestimonialsSection() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [paused]);

  const t = TESTIMONIALS[active];

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-[#0a0806] dark:bg-[#0a0806] px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-3xl text-center relative">
        {/* Large decorative quote */}
        <span
          className="font-serif text-[#c49a5c]/15 select-none pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2"
          style={{ fontSize: '12rem', lineHeight: 1 }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Quote */}
        <blockquote className="relative z-10">
          <p className="font-serif italic text-lg lg:text-xl text-[#f5ede0] leading-relaxed mb-10"
            style={{ fontFamily: "'EB Garamond', 'Georgia', serif" }}>
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer>
            <cite className="not-italic">
              <span className={cn(microCaps, 'text-[#c49a5c] block mb-1')}>{t.name}</span>
              <span className={cn(microCaps, 'text-[#5a4e44]')}>{t.detail}</span>
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
                'w-8 h-px transition-all duration-500',
                i === active ? 'bg-[#c49a5c]' : 'bg-[#c49a5c]/20',
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
/*  Section 5 — The Journal                                             */
/* ------------------------------------------------------------------ */

function JournalSection() {
  return (
    <section id="journal" className="py-20 lg:py-32 bg-[#0a0806] dark:bg-[#0a0806]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 className={cn(microCaps, 'text-[#c49a5c] mb-12')}>THE JOURNAL</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOURNAL_ENTRIES.map((entry) => (
            <a
              key={entry.title}
              href="#"
              className="group block"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-[3/2]">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              {/* Destination */}
              <span className={cn(microCaps, 'text-[#c49a5c]/70 block mb-2')}>
                {entry.destination}
              </span>
              {/* Title */}
              <h3 className="font-serif italic text-xl text-[#f5ede0] group-hover:text-[#c49a5c] transition-colors duration-200 mb-2">
                {entry.title}
              </h3>
              {/* Reading time */}
              <span className="font-mono text-[10px] text-[#5a4e44]">{entry.readingTime}</span>
              {/* Link */}
              <span className={cn(
                microCaps, 'text-[#c49a5c] mt-3 inline-flex items-center gap-1.5 relative',
              )}>
                Read the journey <IconArrowRight />
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c49a5c] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Concierge Contact                                       */
/* ------------------------------------------------------------------ */

function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-[#141008] dark:bg-[#141008]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Headline */}
        <h2 className="font-serif italic text-3xl lg:text-5xl text-[#f5ede0] font-light text-center max-w-2xl mx-auto mb-16">
          Your journey begins with a conversation.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Phone */}
          <div className="text-center lg:text-left">
            <h3 className={cn(microCaps, 'text-[#c49a5c] mb-6')}>CALL US</h3>
            <p className="font-mono text-2xl lg:text-3xl text-[#c49a5c] mb-4">
              +44 20 7123 4567
            </p>
            <p className="font-serif text-sm text-[#9a8878] leading-relaxed max-w-sm"
              style={{ fontFamily: "'EB Garamond', 'Georgia', serif" }}>
              Available 24/7 for existing clients. New inquiries by appointment.
            </p>
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              <a href="#" className="w-8 h-8 rounded-full border border-[#c49a5c]/20 flex items-center justify-center text-[#c49a5c]/60 hover:text-[#c49a5c] hover:border-[#c49a5c]/50 transition-colors">
                <IconInstagram />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#c49a5c]/20 flex items-center justify-center text-[#c49a5c]/60 hover:text-[#c49a5c] hover:border-[#c49a5c]/50 transition-colors">
                <IconMail />
              </a>
            </div>
          </div>

          {/* Right: Inquiry form */}
          <div>
            <h3 className={cn(microCaps, 'text-[#c49a5c] mb-6')}>SEND AN INQUIRY</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className={cn(microCaps, 'text-[#5a4e44] block mb-1.5')}>Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors placeholder:text-[#5a4e44]"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className={cn(microCaps, 'text-[#5a4e44] block mb-1.5')}>Where do you dream of going?</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors placeholder:text-[#5a4e44]"
                  placeholder="Destination or region"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={cn(microCaps, 'text-[#5a4e44] block mb-1.5')}>Preferred dates</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors placeholder:text-[#5a4e44]"
                    placeholder="e.g. March 2026"
                  />
                </div>
                <div>
                  <label className={cn(microCaps, 'text-[#5a4e44] block mb-1.5')}>Party size</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors placeholder:text-[#5a4e44]"
                    placeholder="2 adults"
                  />
                </div>
              </div>
              <div>
                <label className={cn(microCaps, 'text-[#5a4e44] block mb-1.5')}>Budget range</label>
                <select className="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors appearance-none">
                  <option value="" className="bg-[#141008]">Select range</option>
                  <option value="25-50" className="bg-[#141008]">$25,000 – $50,000</option>
                  <option value="50-100" className="bg-[#141008]">$50,000 – $100,000</option>
                  <option value="100-250" className="bg-[#141008]">$100,000 – $250,000</option>
                  <option value="250+" className="bg-[#141008]">$250,000+</option>
                </select>
              </div>
              <div>
                <label className={cn(microCaps, 'text-[#5a4e44] block mb-1.5')}>Message</label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b border-[#2a2018] text-[#f5ede0] text-sm py-2.5 outline-none focus:border-[#c49a5c]/50 transition-colors resize-none placeholder:text-[#5a4e44]"
                  placeholder="Tell us about your ideal journey"
                />
              </div>
              <button
                type="submit"
                className={cn(
                  microCaps, 'text-[12px] mt-4 w-full py-3.5',
                  'bg-[#c49a5c] text-[#0a0806] rounded-sm',
                  'hover:bg-[#d4aa6a] transition-colors duration-200',
                )}
              >
                SEND YOUR INQUIRY
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

function TravelFooter() {
  return (
    <footer className="py-8 bg-[#0a0806] dark:bg-[#0a0806] border-t border-[#c49a5c]/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className={cn(microCaps, 'text-[#5a4e44]')}>
          © VOYAGE ATELIER {new Date().getFullYear()}
        </span>
        <span className={cn(microCaps, 'text-[#5a4e44]')}>
          London · Paris · New York
        </span>
        <div className="flex items-center gap-4">
          <a href="#" className={cn(microCaps, 'text-[#5a4e44] hover:text-[#c49a5c] transition-colors')}>
            @voyageatelier
          </a>
          <a href="#" className={cn(microCaps, 'text-[#5a4e44] hover:text-[#c49a5c] transition-colors')}>
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  LIGHT MODE VARIANT                                                  */
/*  Wraps all sections with light-palette overrides                     */
/* ================================================================== */

function LightHero() {
  const [coordIndex, setCoordIndex] = React.useState(0);
  const [fadeClass, setFadeClass] = React.useState('opacity-100');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('opacity-0');
      setTimeout(() => {
        setCoordIndex((prev) => (prev + 1) % COORDINATES.length);
        setFadeClass('opacity-100');
      }, 400);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f4ee]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://placehold.co/1920x1080/f8f4ee/e8e0d4?text=Cinematic+Aerial+Video"
          alt="Aerial landscape"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #f8f4ee, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <p className={cn(
          'font-mono text-xs text-[#9a7840]/60 mb-8 transition-opacity duration-400',
          fadeClass,
        )}>
          {COORDINATES[coordIndex]}
        </p>

        <h1 className="font-serif italic font-light text-[#1a1410] leading-[1.1] mb-8"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}>
          Every journey, a singular story.
        </h1>

        <p className="font-serif text-lg lg:text-xl text-[#6a5e54] max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ fontFamily: "'EB Garamond', 'Georgia', serif" }}>
          We design journeys for those who've seen everything and seek to feel something. Private, unhurried, unrepeatable.
        </p>

        <a
          href="#contact"
          className={cn(
            microCaps, 'text-[12px] text-[#9a7840] inline-flex items-center gap-2 group relative',
          )}
        >
          Begin your journey
          <IconArrowRight />
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#9a7840] transition-all duration-300 group-hover:w-full" />
        </a>

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {['Patagonia', 'Maldives', 'Kyoto'].map((dest) => (
            <a
              key={dest}
              href="#destinations"
              className={cn(
                microCaps, 'text-[#9a7840] px-4 py-1.5 rounded-full',
                'border border-[#9a7840]/20 hover:border-[#9a7840]/50 transition-colors duration-200',
              )}
            >
              ⬡ {dest}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Main Template Export                                                 */
/* ================================================================== */

export interface LuxuryTravelTemplateProps {
  /** Optional additional className */
  className?: string;
}

/**
 * LuxuryTravel — Ultra-luxury bespoke travel agency template ("Voyage Atelier").
 *
 * Palette: Dusk (Stone) + Gold · Dark cinematic primary, warm light secondary
 *
 * Typography:
 *   Display: Libre Baskerville (serif italic)
 *   Body: EB Garamond (serif)
 *   UI/Nav: Inter (micro-uppercase, tracking-wide)
 *   Numbers: DM Mono (coordinates, phone)
 *
 * Sections:
 *   TravelNav (fixed, transparent) → TravelHero (fullscreen video + coordinates) →
 *   DestinationsSection (horizontal filmstrip) → ProcessSection (4 connected steps) →
 *   ExperiencesSection (full-bleed stacked) → TestimonialsSection (auto-advance) →
 *   JournalSection (3-col grid) → ContactSection (phone + inquiry form) →
 *   TravelFooter (minimal)
 *
 * Dark mode: Primary — warm cinematic black (#0a0806) with gold accent (#c49a5c)
 * Light mode: Warm parchment (#f8f4ee) with deeper gold (#9a7840)
 */
export function LuxuryTravelTemplate({ className }: LuxuryTravelTemplateProps) {
  return (
    <div
      className={cn(
        'min-h-screen antialiased',
        // Dark mode is primary for this template
        'bg-[#0a0806] dark:bg-[#0a0806]',
        // Light mode override
        'light:bg-[#f8f4ee]',
        className,
      )}
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Google Fonts link for serif typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');

        .font-serif {
          font-family: 'Libre Baskerville', 'Georgia', serif;
        }
        .font-mono {
          font-family: 'DM Mono', 'Menlo', monospace;
        }

        /* Hide scrollbar for filmstrip */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* Gold loading line animation */
        @keyframes goldSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
      `}</style>

      {/* Gold loading sweep line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[70] overflow-hidden pointer-events-none">
        <div
          className="h-full w-[40%] bg-gradient-to-r from-transparent via-[#c49a5c] to-transparent"
          style={{
            animation: 'goldSweep 0.6s ease-out forwards',
          }}
        />
      </div>

      <TravelNav />
      <TravelHero />
      <DestinationsSection />
      <ProcessSection />
      <ExperiencesSection />
      <TestimonialsSection />
      <JournalSection />
      <ContactSection />
      <TravelFooter />
    </div>
  );
}
