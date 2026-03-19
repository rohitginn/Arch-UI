'use client';

import { cn } from '@archui/core';
import { FeaturesAlternating } from '../blocks/features';
import { BentoGrid, MarqueeCards } from '../blocks/misc';
import { StatsSection, TestimonialsCarousel } from '../blocks/social-proof';
import { ContactSplit } from '../blocks/contact';
import { FooterDark } from '../blocks/footer';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    title: 'Brand Identity',
    description:
      'We craft identities that outlast trends. Research-led, principle-driven brand systems that scale from a business card to a billboard and everything in between.',
    image: { src: 'https://placehold.co/700x460/0f172a/475569?text=Brand+Identity+Work', alt: 'Brand identity projects' },
    bullets: [
      'Visual identity systems and brand guidelines',
      'Naming, messaging, and brand voice',
      'Typography, color, and iconography',
    ],
  },
  {
    title: 'Digital Products',
    description:
      'Products people actually want to use. We design and build web and mobile experiences that balance beautiful aesthetics with ruthlessly clear usability.',
    image: { src: 'https://placehold.co/700x460/0f172a/475569?text=Digital+Product+Work', alt: 'Digital product design' },
    bullets: [
      'Product strategy and UX research',
      'High-fidelity prototyping and design systems',
      'Full-stack engineering and CMS integration',
    ],
  },
  {
    title: 'Motion & Campaign',
    description:
      'Moving images that move people. From launch films to animated brand systems, we bring brands to life in motion — for screen, social, and beyond.',
    image: { src: 'https://placehold.co/700x460/0f172a/475569?text=Motion+Work', alt: 'Motion and campaign work' },
    bullets: [
      'Brand films and product launches',
      'Social content templating systems',
      'Title sequences and UI motion design',
    ],
  },
];

const BENTO_WORK = [
  {
    title: 'Meridian — Fintech Rebrand',
    description: 'Brand identity + digital product design for a B2B fintech challenger',
    image: 'https://placehold.co/600x400/1e293b/475569?text=Meridian',
    span: { cols: 2 as const, rows: 1 as const },
    className: 'group cursor-pointer',
  },
  {
    title: 'Solstice — Mobile App',
    description: 'D2C wellness app: strategy, design, and engineering',
    image: 'https://placehold.co/400x400/1e293b/475569?text=Solstice',
    span: { cols: 1 as const, rows: 1 as const },
    className: 'group cursor-pointer',
  },
  {
    title: 'Dwell — Real Estate Brand',
    description: 'Property brand system for a luxury residential developer',
    image: 'https://placehold.co/400x400/1e293b/475569?text=Dwell',
    span: { cols: 1 as const, rows: 1 as const },
    className: 'group cursor-pointer',
  },
  {
    title: 'Novo Foods — Campaign',
    description: 'Launch campaign for a plant-based DTC brand: film, social, OOH',
    image: 'https://placehold.co/600x400/1e293b/475569?text=Novo+Foods',
    span: { cols: 2 as const, rows: 1 as const },
    className: 'group cursor-pointer',
  },
];

const MARQUEE_CARDS = [
  { title: 'Stripe', description: 'Global payments infrastructure', href: '#' },
  { title: 'Figma', description: 'Collaborative design platform', href: '#' },
  { title: 'Notion', description: 'Connected workspace', href: '#' },
  { title: 'Linear', description: 'Issue tracking for exceptional teams', href: '#' },
  { title: 'Pitch', description: 'Modern presentation software', href: '#' },
  { title: 'Arc Browser', description: 'The browser company', href: '#' },
];

const STATS = [
  { value: 9, label: 'Years active', suffix: '' },
  { value: 140, label: 'Projects delivered', suffix: '+' },
  { value: 26, label: 'Countries', suffix: '' },
  { value: 7, label: 'Design awards', suffix: '' },
];

const TESTIMONIALS = [
  {
    quote: "Working with this studio was the best investment we made in our brand. They pushed us further than we thought possible — and the result shows in everything we do.",
    name: 'Clara Fontaine',
    role: 'CEO',
    company: 'Meridian',
  },
  {
    quote: "They don't just design how things look — they design how things work, feel, and communicate. Rare combination. Our conversion rate doubled after the rebrand.",
    name: 'Tom Reeves',
    role: 'Founder',
    company: 'Solstice',
  },
  {
    quote: "We came in with a vague brief and left with a brand system that's guided every decision we've made since. Worth every penny and then some.",
    name: 'Anya Petrov',
    role: 'CPO',
    company: 'Novo Foods',
  },
];

/* ------------------------------------------------------------------ */
/*  Hero Section (ultra-minimal, typographic)                           */
/* ------------------------------------------------------------------ */

function AgencyHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end px-6 lg:px-12 pb-20 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-5xl">
          <h1
            className={cn(
              'text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.96]',
              'text-slate-900 dark:text-white',
            )}
          >
            We build brands people{' '}
            <em className="italic not-italic text-slate-400">remember.</em>
          </h1>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Strategy. Identity. Digital experience.
            </p>
            <div className="h-px sm:w-16 sm:h-px w-full bg-slate-200 dark:bg-slate-800" />
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-0.5 hover:text-slate-500 dark:hover:text-slate-400 hover:border-slate-500 dark:hover:border-slate-400 transition-colors duration-200"
            >
              See our work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface CreativeAgencyTemplateProps {
  className?: string;
}

/**
 * CreativeAgency — Digital agency portfolio template (Resn / BASIC / Instrument aesthetic).
 *
 * Accent: Slate. Default mode: Light, dual-mode supported.
 *
 * Sections:
 *   Nav (ultra-minimal) → HeroMinimal (typographic) → FeaturesAlternating (Services) →
 *   BentoGrid (Selected Work) → MarqueeCards (Client logos) → StatsSection →
 *   TestimonialsCarousel → ContactSplit → FooterDark
 */
export function CreativeAgencyTemplate({ className }: CreativeAgencyTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-white dark:bg-zinc-950 antialiased', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        logo={
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-900 dark:text-white">
            Studio
          </span>
        }
        links={[]}
        actions={
          <a
            href="mailto:hello@studio.co"
            className="text-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-150 tracking-wide"
          >
            hello@studio.co
          </a>
        }
      />

      {/* ── Hero ── */}
      <AgencyHero />

      {/* ── Services ── */}
      <FeaturesAlternating
        badge="What we do"
        heading="Three disciplines. One creative lens."
        subheading="We operate at the intersection of brand, product, and motion. Most agencies pick one — we do all three, intentionally."
        features={SERVICES}
      />

      {/* ── Selected Work ── */}
      <section id="work" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 mb-4">
              Selected work
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              A few things we're proud of
            </h2>
          </div>
          <BentoGrid items={BENTO_WORK} columns={3} gap="lg" />
        </div>
      </section>

      {/* ── Client marquee ── */}
      <div className="py-12">
        <MarqueeCards topRow={MARQUEE_CARDS} bottomRow={[...MARQUEE_CARDS].reverse()} speed="slow" pauseOnHover />
      </div>

      {/* ── Stats ── */}
      <StatsSection
        heading="A track record that speaks"
        stats={STATS}
        animated
      />

      {/* ── Testimonials ── */}
      <TestimonialsCarousel
        heading="Before we work together"
        subheading="Hear from the founders and leaders we've partnered with."
        testimonials={TESTIMONIALS}
        autoPlay={6000}
      />

      {/* ── Contact ── */}
      <ContactSplit
        heading="Start a project"
        subheading="We take on 4–6 new projects each quarter. If you're ready to build something great, let's talk."
        contactInfo={[
          { icon: <IconMapPin />, label: 'Studio', value: 'London, UK + New York, US' },
          { icon: <IconMail />, label: 'Email', value: 'hello@studio.co', href: 'mailto:hello@studio.co' },
          { icon: <IconPhone />, label: 'Phone', value: '+44 20 1234 5678' },
        ]}
        socials={[
          { icon: <IconInstagram />, href: '#', label: 'Instagram' },
          { icon: <IconLinkedin />, href: '#', label: 'LinkedIn' },
        ]}
        fields={[
          { name: 'name', label: 'Your name', type: 'text', placeholder: 'Jane Smith', required: true },
          { name: 'email', label: 'Work email', type: 'email', placeholder: 'jane@company.com', required: true },
          { name: 'company', label: 'Company', type: 'text', placeholder: 'Company name' },
          { name: 'message', label: 'Tell us about the project', type: 'textarea', placeholder: 'What are you building? What\'s the timeline? Any context that helps.', required: true },
        ]}
        submitLabel="Send enquiry"
      />

      {/* ── Footer ── */}
      <FooterDark
        logo={
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">Studio</span>
        }
        tagline="Craft over volume. Always."
        groups={[
          { title: 'Work', links: [{ label: 'Brand Identity', href: '#' }, { label: 'Digital Products', href: '#' }, { label: 'Motion', href: '#' }] },
          { title: 'Studio', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Journal', href: '#' }] },
        ]}
        socials={[
          { label: 'Instagram', href: '#', icon: <IconInstagram /> },
          { label: 'LinkedIn', href: '#', icon: <IconLinkedin /> },
        ]}
        copyright={`© ${new Date().getFullYear()} Studio. All rights reserved.`}
      />
    </div>
  );
}
