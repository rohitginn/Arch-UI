'use client';

import { cn } from '@archui/core';
import { HeroTerminal } from '../blocks/hero';
import { MarqueeLogos, StatsSection, TestimonialsGrid } from '../blocks/social-proof';
import { FeaturesGrid, FeaturesAlternating } from '../blocks/features';
import { BentoGrid, CallToActionBanner } from '../blocks/misc';
import { PricingCards } from '../blocks/pricing';
import { FAQAccordion } from '../blocks/faq';
import { FooterDark } from '../blocks/footer';
import { KineticTessellation } from '../backgrounds';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconServer = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);
const IconStream = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconCode = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const TERMINAL_LINES = [
  { text: 'curl -X POST https://api.inferai.dev/v1/chat \\', delay: 0 },
  { text: "  -H 'Authorization: Bearer $API_KEY' \\", isOutput: true, delay: 100 },
  { text: "  -d '{ \"model\": \"swift-3\", \"messages\": [{ \"role\": \"user\", \"content\": \"Explain async/await\" }] }'", isOutput: true, delay: 100 },
  { text: '', isOutput: true, delay: 600 },
  { text: '{ "id": "cmpl-a7f3b", "model": "swift-3", "choices": [{"message": {"content": "Async/await is syntactic sugar over Promises..."}, "finish_reason": "stop"}], "usage": { "prompt_tokens": 12, "total_tokens": 94 } }', isOutput: true, delay: 200 },
];

const LOGO_URLS = [
  'https://placehold.co/120x36/18181b/52525b?text=GitHub',
  'https://placehold.co/120x36/18181b/52525b?text=Vercel',
  'https://placehold.co/120x36/18181b/52525b?text=Supabase',
  'https://placehold.co/120x36/18181b/52525b?text=Replicate',
  'https://placehold.co/120x36/18181b/52525b?text=Hugging+Face',
  'https://placehold.co/120x36/18181b/52525b?text=Langchain',
];

const FEATURES_GRID = [
  { icon: <IconZap />, title: 'Sub-100ms latency', description: 'Optimized inference pipeline delivers responses in under 100ms P50 globally.' },
  { icon: <IconServer />, title: 'Elastic scale', description: 'Auto-scales from 0 to millions of requests per minute without configuration.' },
  { icon: <IconStream />, title: 'Real-time streaming', description: 'SSE streaming out of the box — first token in under 30ms for all models.' },
  { icon: <IconCode />, title: 'Native SDKs', description: 'Idiomatic clients for Python, TypeScript, Go, and Rust. Auto-generated from OpenAPI.' },
  { icon: <IconLock />, title: 'Private by default', description: 'Your prompts are never stored or used for training. SOC 2 Type II certified.' },
  { icon: <IconGlobe />, title: '18 global endpoints', description: 'Run inference closest to your users for consistently low latency worldwide.' },
];

const BENTO_ITEMS = [
  { title: '<100ms', description: 'P50 global inference latency for swift-3', span: { cols: 1 as const, rows: 1 as const } },
  { title: '2.4M tokens/sec', description: 'Peak throughput across all inference clusters', span: { cols: 1 as const, rows: 1 as const } },
  { title: '99.98% uptime', description: 'Production SLA backed by financial credits', span: { cols: 1 as const, rows: 1 as const } },
  { title: '12 models', description: 'From 7B to 70B — pick the right model for your budget', span: { cols: 1 as const, rows: 1 as const } },
];

const FEATURES_ALTERNATING = [
  {
    title: 'Integrate in minutes, not days',
    description:
      'Drop-in replacement for OpenAI. Switch your base URL, keep everything else. Our SDKs handle auth, retries, streaming, and rate limits so you don\'t have to.',
    image: { src: 'https://placehold.co/700x440/18181b/52525b?text=SDK+Integration', alt: 'SDK integration code sample' },
    bullets: [
      'OpenAI-compatible API surface — migrate in one line',
      'Auto-retry with exponential backoff built in',
      'TypeScript types auto-generated from OpenAPI spec',
    ],
  },
  {
    title: 'Streaming that actually works',
    description:
      'True server-sent events with mid-stream cancellation and per-chunk metadata. Stream tokens as fast as the model generates them — no buffer, no delay.',
    image: { src: 'https://placehold.co/700x440/18181b/52525b?text=Streaming+Response', alt: 'Streaming response visualization' },
    bullets: [
      'First token in <30ms across all model sizes',
      'Graceful mid-stream cancellation via AbortSignal',
      'Token usage metadata on every chunk',
    ],
  },
  {
    title: 'Rate limits that make sense',
    description:
      'Token-based rate limiting, not arbitrary request counts. Burst allowances, automatic queuing, and real-time limit visibility via the dashboard and API.',
    image: { src: 'https://placehold.co/700x440/18181b/52525b?text=Rate+Limits+Dashboard', alt: 'Rate limits dashboard' },
    bullets: [
      'Per-key and per-org rate limit configuration',
      'Automatic queue with full visibility into queue depth',
      'Webhook notification before limit is hit',
    ],
  },
];

const STATS = [
  { value: 2.4, label: 'Million tokens/sec peak', decimals: 1 },
  { value: 18, label: 'Global inference endpoints' },
  { value: 99.98, label: 'Uptime SLA', suffix: '%', decimals: 2 },
  { value: 12, label: 'Supported models' },
];

const PRICING_PLANS = [
  {
    name: 'Pay as you go',
    monthlyPrice: 0,
    description: 'Start immediately. Pay only for what you use.',
    features: [
      '$0.001 per 1K input tokens (swift-3)',
      '$0.003 per 1K output tokens',
      'All 12 models included',
      '100 RPM default (upgradeable)',
      'Community Discord support',
      '99.9% SLA',
    ],
    cta: { label: 'Get API key', href: '#' },
  },
  {
    name: 'Teams',
    monthlyPrice: 199,
    annualPrice: 159,
    description: 'Committed spend, volume discounts, and dedicated support.',
    features: [
      '40% volume discount on all tokens',
      'Included $100 credit monthly',
      '1,000 RPM default',
      'Priority support (4h SLA)',
      'Team management dashboard',
      '99.95% SLA',
      'Webhook + Slack alerts',
    ],
    cta: { label: 'Start free trial', href: '#' },
    recommended: true,
    badge: 'Best value',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    description: 'Dedicated infrastructure, compliance, and white-glove support.',
    features: [
      'Dedicated GPU cluster',
      'Custom model fine-tuning',
      'SOC 2, HIPAA, BAA',
      '99.99% SLA with credits',
      '24/7 dedicated support',
      'Private VPC deployment',
      'Custom contracts & invoicing',
    ],
    cta: { label: 'Talk to sales', href: '#' },
  },
];

const TESTIMONIALS = [
  {
    quote: "We replaced OpenAI and cut our inference costs by 60% with no degradation in quality. The migration took literally 4 lines of code.",
    name: 'Riya Joshi',
    role: 'ML Engineer',
    company: 'Loom',
    rating: 5,
  },
  {
    quote: "The streaming latency is genuinely impressive. First token in 28ms consistently — our users notice the difference.",
    name: 'Ben Clarke',
    role: 'CTO',
    company: 'Reflect',
    rating: 5,
  },
  {
    quote: "SOC 2 Type II with zero data retention was the requirement. InferAI was the only API provider that could check that box without a custom contract.",
    name: 'Annika Larsson',
    role: 'Head of Security',
    company: 'Descript',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    question: "Is this a drop-in OpenAI replacement?",
    answer: "For chat completion and embeddings — yes, completely. Just change the base URL and your existing SDK calls work as-is. We support the full OpenAI chat API surface.",
  },
  {
    question: "What models are available?",
    answer: "We host swift-3 (our flagship 32B model), swift-mini (7B, ultra-fast), plus Llama 3 70B/13B/8B, Mistral variants, and Mixtral. New models are added monthly.",
  },
  {
    question: "Is there a rate limit on the free tier?",
    answer: "Free tier starts at 100 RPM and 10K tokens/minute. You can request a limit increase via the dashboard — we approve most requests within 24 hours.",
  },
  {
    question: "Do you store my prompts?",
    answer: "No. We have a zero-retention policy: prompts, responses, and completions are never written to disk or used for any training. This is enforced at the infrastructure level.",
  },
  {
    question: "How is token pricing calculated?",
    answer: "Input and output tokens are billed separately. Pricing varies by model — our smallest models start at $0.0002/1K tokens. Price is shown per model in the dashboard before you use it.",
  },
];

const FOOTER_GROUPS = [
  {
    title: 'API',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'SDKs', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Models',
    links: [
      { label: 'swift-3', href: '#' },
      { label: 'swift-mini', href: '#' },
      { label: 'Llama 3', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface DevToolsApiTemplateProps {
  className?: string;
}

/**
 * DevToolsAPI — AI API Platform template (OpenAI / Replicate / Anthropic aesthetic).
 *
 * Accent: Graphite (zinc). Default mode: Dark-dominant.
 *
 * Sections:
 *   Nav → HeroTerminal → MarqueeLogos → FeaturesGrid → BentoGrid →
 *   FeaturesAlternating → StatsSection → PricingCards → TestimonialsGrid →
 *   FAQAccordion → CallToActionBanner → FooterDark
 */
export function DevToolsApiTemplate({ className }: DevToolsApiTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-zinc-950 dark antialiased', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        dark
        logo={
          <span className="font-mono text-sm font-bold text-white">
            infer<span className="text-zinc-400">ai</span>
          </span>
        }
        links={[
          { label: 'Docs', href: '#' },
          { label: 'API Reference', href: '#' },
          { label: 'Models', href: '#' },
          { label: 'Pricing', href: '#' },
        ]}
        actions={
          <a
            href="#"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-100 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
          >
            Get API key
          </a>
        }
      />

      {/* ── Hero ── */}
      <HeroTerminal
        badge="GPT-4 compatible API"
        heading="Production-grade inference. Millisecond latency."
        subheading="The AI inference API built for engineers who care about performance, privacy, and price."
        lines={TERMINAL_LINES}
        terminalTitle="bash"
        typingSpeed={28}
        primaryCta={{ label: 'Get API key', href: '#' }}
        background={
          <KineticTessellation
            tileSize={64}
            overlay={{ color: '#000000', opacity: 0.93 }}
          />
        }
      />

      {/* ── Trusted by / integrations ── */}
      <MarqueeLogos
        heading="Used by teams at"
        logos={LOGO_URLS.map((src, i) => ({ src, alt: `Integration ${i + 1}` }))}
        speed="slow"
        pauseOnHover
      />

      {/* ── Feature grid (6 capabilities) ── */}
      <FeaturesGrid
        badge="Capabilities"
        heading="Everything you need to build production AI"
        subheading="From raw inference to managed pipelines — the full stack for AI-powered products."
        features={FEATURES_GRID}
        columns={3}
      />

      {/* ── Bento metrics ── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-white">The numbers that matter at 3am</h2>
          </div>
          <BentoGrid items={BENTO_ITEMS} columns={4} gap="md" />
        </div>
      </section>

      {/* ── Features alternating (deep dives) ── */}
      <FeaturesAlternating
        badge="How it works"
        heading="Built for real production workloads"
        subheading="We sweat the details that matter when you're running at scale."
        features={FEATURES_ALTERNATING}
      />

      {/* ── Stats ── */}
      <StatsSection
        heading="Trusted at scale"
        subheading="Numbers from the API in production, measured continuously."
        stats={STATS}
        animated
      />

      {/* ── Pricing ── */}
      <PricingCards
        heading="Honest, usage-based pricing"
        subheading="Start for free. No credit card, no lock-in, no minimums."
        billingToggle
        plans={PRICING_PLANS}
        currency="$"
      />

      {/* ── Testimonials ── */}
      <TestimonialsGrid
        heading="Developers shipping with InferAI"
        subheading="Real feedback from engineering teams across the spectrum."
        testimonials={TESTIMONIALS}
        columns={3}
      />

      {/* ── FAQ ── */}
      <FAQAccordion
        heading="Technical questions, answered"
        subheading="The things engineers ask before switching their inference provider."
        items={FAQ_ITEMS}
        singleOpen
      />

      {/* ── CTA Banner ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <CallToActionBanner
            heading="Start building in 3 lines of code"
            subheading="Free forever. No credit card. Your first 1M tokens are on us."
            align="center"
            primaryAction={
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-100 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
              >
                <IconCode />
                Get API key
              </a>
            }
            secondaryAction={
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-medium border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
              >
                <IconGithub />
                View on GitHub
              </a>
            }
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <FooterDark
        logo={
          <span className="font-mono text-sm font-bold text-white">
            infer<span className="text-zinc-500">ai</span>
          </span>
        }
        tagline="The inference API engineers actually trust."
        groups={FOOTER_GROUPS}
        socials={[
          { label: 'GitHub', href: '#', icon: <IconGithub /> },
        ]}
        copyright={`© ${new Date().getFullYear()} InferAI, Inc.`}
        legalLinks={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Security', href: '#' },
        ]}
      />
    </div>
  );
}
