'use client';

import { cn } from '@archui/core';
import { HeroVideo } from '../blocks/hero';
import { MarqueeLogos, StatsSection, TestimonialsCarousel } from '../blocks/social-proof';
import { FeaturesGrid, FeaturesCompare } from '../blocks/features';
import { PricingMinimal } from '../blocks/pricing';
import { FAQAccordion } from '../blocks/faq';
import { CallToActionBanner } from '../blocks/misc';
import { FooterComplex } from '../blocks/footer';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconLeaf = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);
const IconDroplet = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
);
const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const MEDIA_LOGOS = [
  'https://placehold.co/120x36/fafaf9/78716c?text=Forbes',
  'https://placehold.co/120x36/fafaf9/78716c?text=Vogue',
  'https://placehold.co/120x36/fafaf9/78716c?text=NYT',
  'https://placehold.co/120x36/fafaf9/78716c?text=Allure',
  'https://placehold.co/120x36/fafaf9/78716c?text=Byrdie',
  'https://placehold.co/120x36/fafaf9/78716c?text=Well+&+Good',
];

const FEATURES = [
  {
    icon: <IconLeaf />,
    title: 'Plant-based actives',
    description: 'Formulated with clinically validated botanical extracts. No harsh synthetics — just ingredients that actually work with your skin.',
  },
  {
    icon: <IconDroplet />,
    title: 'Hyaluronic complex',
    description: 'Triple-weight hyaluronic acid binds moisture at every skin layer for 72-hour hydration that you can feel — not just measure.',
  },
  {
    icon: <IconSun />,
    title: 'SPF 40 protection',
    description: 'Mineral broad-spectrum protection that wears invisibly. Zero white cast. Zero greasy finish. Finally, SPF you\'ll actually use.',
  },
];

const STATS = [
  { value: 92, label: 'Saw measurable improvement in 28 days', suffix: '%' },
  { value: 340000, label: 'Satisfied customers', suffix: '+' },
  { value: 4.8, label: 'Average product rating', suffix: '/5', decimals: 1 },
  { value: 0, label: 'Synthetic fragrances', suffix: '' },
];

const TESTIMONIALS = [
  {
    quote: "I've tried everything. Prescription retinoids, expensive facials, the whole routine. Dusk is the first thing that actually cleared my skin without wrecking my barrier. Six months in — genuinely transformed.",
    name: 'Mara Chen',
    role: 'Customer',
    company: 'San Francisco, CA',
  },
  {
    quote: "I'm a complete skincare skeptic. My partner convinced me to try it. Three weeks later I'm the one reordering. My skin hasn't looked this good since I was 22.",
    name: 'Tobias Jensen',
    role: 'Customer',
    company: 'London, UK',
  },
  {
    quote: "As a dermatologist, I'm picky about what I recommend. The formulation is sound, the pH is correct, and the clinical data is real. My patients love it.",
    name: 'Dr. Priya Nair',
    role: 'Dermatologist',
    company: 'New York, NY',
  },
];

const PRICING_PLANS = [
  {
    name: 'Starter Kit',
    price: 68,
    billingLabel: 'one-time',
    description: 'Everything you need to start seeing results. The essential 3-step routine.',
    features: [
      'Morning Clarifying Cleanser (150ml)',
      'Triple-Hyaluronic Serum (30ml)',
      'Mineral SPF 40 Moisturiser (50ml)',
      'Free shipping on first order',
      '30-day satisfaction guarantee',
    ],
    cta: { label: 'Start my routine', href: '#' },
    highlighted: false,
  },
  {
    name: 'Complete System',
    price: 118,
    billingLabel: 'one-time',
    description: 'The full protocol. For people who are serious about their skin.',
    features: [
      'Everything in Starter Kit',
      'Evening Repair Concentrate (30ml)',
      'Weekly Resurfacing Mask (75ml)',
      'Eye Revive Treatment (15ml)',
      'Priority shipping',
      '60-day satisfaction guarantee',
      'Skincare consultation included',
    ],
    cta: { label: 'Get the complete system', href: '#' },
    highlighted: true,
  },
];

const FAQ_ITEMS = [
  {
    question: "Are all ingredients vegan and cruelty-free?",
    answer: "100%. Every ingredient is plant-derived or synthetic (non-animal). We're Leaping Bunny certified and never test on animals — or sell in markets that require it.",
  },
  {
    question: "When will I see results?",
    answer: "Most customers see initial improvement in skin texture and hydration within 7 days. For more significant changes — clarity, tone, reduced pores — 28 days is the meaningful checkpoint. That's why we offer a 30-day guarantee.",
  },
  {
    question: "Is this suitable for sensitive skin?",
    answer: "Yes, and specifically formulated for it. We avoid sulfates, synthetic fragrances, parabens, and known sensitizers. Patch test recommended for reactive skin — instructions included with every order.",
  },
  {
    question: "How does the satisfaction guarantee work?",
    answer: "If you're not satisfied after using the product as directed for the stated period, we'll refund you — no questions, no receipt required, no return shipping. Reach us by email or live chat.",
  },
  {
    question: "Do you ship internationally?",
    answer: "We ship to 42 countries. International shipping is calculated at checkout. Duties and customs fees may apply depending on your country — these are outside our control.",
  },
];

const FOOTER_GROUPS = [
  {
    title: 'Shop',
    links: [
      { label: 'Starter Kit', href: '#' },
      { label: 'Complete System', href: '#' },
      { label: 'Refills', href: '#' },
      { label: 'Gift sets', href: '#' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Ingredients', href: '#' },
      { label: 'Clinical study', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Reviews', href: '#' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface DtcBrandTemplateProps {
  className?: string;
}

/**
 * DTCBrand — Direct-to-consumer brand landing page (Allbirds / Graza / Noka aesthetic).
 *
 * Accent: Dusk (stone). Default mode: Light-dominant.
 *
 * Sections:
 *   Nav → HeroVideo → MarqueeLogos (media) → FeaturesGrid → FeaturesCompare →
 *   StatsSection → TestimonialsCarousel → PricingMinimal → FAQAccordion →
 *   CallToActionBanner → FooterComplex
 */
export function DtcBrandTemplate({ className }: DtcBrandTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-stone-50 dark:bg-stone-950 antialiased', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        logo={
          <span className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-100">
            dusk<span className="text-stone-400">.</span>
          </span>
        }
        links={[
          { label: 'Shop', href: '#' },
          { label: 'Ingredients', href: '#' },
          { label: 'Reviews', href: '#' },
          { label: 'Our story', href: '#' },
        ]}
        actions={
          <a
            href="#shop"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-200 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
          >
            Shop now
          </a>
        }
      />

      {/* ── Hero video ── */}
      <HeroVideo
        heading="Feel the difference, day one."
        subheading="Clinically validated skincare made from plants. Results in 28 days or your money back."
        videoSrc=""
        poster="https://placehold.co/1920x1080/292524/a8a29e?text=Dusk+Product+Film"
        primaryCta={{ label: 'Shop the collection', href: '#shop' }}
        secondaryCta={{ label: 'See the science', href: '#ingredients' }}
        overlayOpacity={55}
      />

      {/* ── As seen in ── */}
      <div className="bg-stone-100 dark:bg-stone-900">
        <MarqueeLogos
          heading="As seen in"
          logos={MEDIA_LOGOS.map((src, i) => ({ src, alt: `Media ${i + 1}` }))}
          speed="slow"
          pauseOnHover
        />
      </div>

      {/* ── Key benefits ── */}
      <FeaturesGrid
        badge="Formulation"
        heading="Ingredients with integrity"
        subheading="Every ingredient earns its place. No greenwashing, no mystery blends — just what works, clinically proven."
        features={FEATURES}
        columns={3}
      />

      {/* ── Before / After ── */}
      <FeaturesCompare
        badge="Results"
        heading="See the transformation"
        subheading="Average results after 28 days of consistent use, photographed under identical conditions."
        before={{
          label: 'Before — Day 1',
          image: { src: 'https://placehold.co/800x600/e7e5e4/78716c?text=Before', alt: 'Skin before using Dusk' },
        }}
        after={{
          label: 'After — Day 28',
          image: { src: 'https://placehold.co/800x600/d6d3d1/57534e?text=After', alt: 'Skin after 28 days of Dusk' },
        }}
        defaultPosition={42}
      />

      {/* ── Clinical stats ── */}
      <StatsSection
        heading="The science behind it"
        subheading="Third-party clinical study conducted by an independent dermatology research lab."
        stats={STATS}
        animated
      />

      {/* ── Testimonials ── */}
      <TestimonialsCarousel
        heading="Real people, real results"
        subheading="Unretouched testimonials from customers across six continents."
        testimonials={TESTIMONIALS}
        autoPlay={7000}
      />

      {/* ── Pricing / Product ── */}
      <PricingMinimal
        heading="Choose your kit"
        subheading="Everything ships with a 30-day satisfaction guarantee. No questions, no hassle."
        plans={PRICING_PLANS}
        currency="$"
      />

      {/* ── FAQ ── */}
      <FAQAccordion
        heading="Good to know"
        subheading="The questions we get asked most before people make the switch."
        items={FAQ_ITEMS}
        singleOpen
      />

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <CallToActionBanner
            heading="Start your 30-day trial. Free returns."
            subheading="If you don't see a difference after 30 days, we'll refund every penny. No forms, no return labels required."
            align="center"
            primaryAction={
              <a
                href="#shop"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-200 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
              >
                Try risk-free
              </a>
            }
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <FooterComplex
        logo={
          <span className="text-sm font-bold tracking-tight text-stone-900 dark:text-stone-100">
            dusk<span className="text-stone-400">.</span>
          </span>
        }
        tagline="Skincare with nothing to hide."
        groups={FOOTER_GROUPS}
        socials={[
          { label: 'Instagram', href: '#', icon: <IconInstagram /> },
          { label: 'Twitter', href: '#', icon: <IconTwitter /> },
        ]}
        newsletterHeading="Skin tips & early access"
        newsletterDescription="Formulation updates, skincare guidance, and early access to new products."
        copyright={`© ${new Date().getFullYear()} Dusk Skincare, Inc.`}
        legalLinks={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Shipping', href: '#' },
        ]}
      />
    </div>
  );
}
