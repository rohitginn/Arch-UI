'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG)                                                  */
/* ------------------------------------------------------------------ */

const IconLayers = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconUsers = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconCode = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconSparkles = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
  </svg>
);

const IconLayout = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const IconGitBranch = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const IconMonitor = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const IconMessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconPlay = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="6,4 20,12 6,20" />
  </svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconStar = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  colSpan: number;
  rowSpan: number;
}

const NAV_LINKS = ['Features', 'Templates', 'Pricing', 'Changelog', 'Docs'];

const FEATURES: Feature[] = [
  {
    id: 'collab',
    title: 'Real-time collaboration',
    description: 'Work simultaneously with your entire team. See live cursors, edits, and comments — all in real-time.',
    icon: IconUsers,
    color: '#60a5fa',
    colSpan: 7,
    rowSpan: 2,
  },
  {
    id: 'design-system',
    title: 'Design system management',
    description: 'Centralize your tokens, components, and patterns. Keep every project consistent without manual syncing.',
    icon: IconLayers,
    color: '#fb7185',
    colSpan: 5,
    rowSpan: 1,
  },
  {
    id: 'ai-suggest',
    title: 'AI component suggestions',
    description: 'Describe what you need and Canvas generates production-ready components instantly.',
    icon: IconSparkles,
    color: '#fbbf24',
    colSpan: 5,
    rowSpan: 2,
  },
  {
    id: 'code-export',
    title: 'Code export',
    description: 'Export any design to clean React, Vue, or CSS code. One click, no plugins, zero config.',
    icon: IconCode,
    color: '#34d399',
    colSpan: 7,
    rowSpan: 1,
  },
  {
    id: 'comments',
    title: 'Comments & handoff',
    description: 'Structured feedback threads pinned to exact pixels. Developers get everything they need without a meeting.',
    icon: IconMessageSquare,
    color: '#60a5fa',
    colSpan: 4,
    rowSpan: 1,
  },
  {
    id: 'versioning',
    title: 'Version history',
    description: 'Every change is tracked. Compare, branch, and restore any previous state of your design.',
    icon: IconGitBranch,
    color: '#fb7185',
    colSpan: 4,
    rowSpan: 1,
  },
  {
    id: 'responsive',
    title: 'Responsive preview',
    description: 'Preview your design at every breakpoint simultaneously. No guesswork, no surprises.',
    icon: IconMonitor,
    color: '#34d399',
    colSpan: 4,
    rowSpan: 1,
  },
];

interface AiCapability {
  id: string;
  title: string;
  description: string;
  prompt: string;
  result: string;
}

const AI_CAPABILITIES: AiCapability[] = [
  {
    id: 'generate',
    title: 'Generate components from description',
    description: 'Type what you need in natural language and watch Canvas build it in real-time.',
    prompt: 'Create a pricing card with a monthly toggle, feature list, and a highlighted "Popular" badge.',
    result: 'Generated PricingCard with 3 variants, toggle state, and responsive layout.',
  },
  {
    id: 'detect',
    title: 'Detect design inconsistencies',
    description: 'AI scans your entire file and flags spacing, color, and typography inconsistencies against your design tokens.',
    prompt: 'Scan dashboard.canvas for token violations',
    result: 'Found 7 inconsistencies: 3 spacing issues, 2 color mismatches, 2 font-weight deviations.',
  },
  {
    id: 'improve',
    title: 'Suggest design improvements',
    description: 'Get AI-powered recommendations to improve accessibility, visual hierarchy, and layout balance.',
    prompt: 'Analyze the hero section and suggest improvements',
    result: 'Suggested: Increase heading contrast ratio (4.2→7.1), add more whitespace below CTA, align badge with grid.',
  },
];

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  preview: string;
}

const TEMPLATE_CATEGORIES = ['All', 'Mobile Apps', 'Dashboards', 'Websites', 'Email', 'Presentations'];

const TEMPLATES: TemplateItem[] = [
  { id: 't1', name: 'SaaS Dashboard', category: 'Dashboards', preview: 'https://placehold.co/400x300/18181b/334155?text=SaaS+Dashboard' },
  { id: 't2', name: 'E-Commerce Mobile', category: 'Mobile Apps', preview: 'https://placehold.co/400x300/18181b/334155?text=E-Commerce' },
  { id: 't3', name: 'Marketing Website', category: 'Websites', preview: 'https://placehold.co/400x300/18181b/334155?text=Marketing' },
  { id: 't4', name: 'Analytics Dashboard', category: 'Dashboards', preview: 'https://placehold.co/400x300/18181b/334155?text=Analytics' },
  { id: 't5', name: 'Fitness Tracker', category: 'Mobile Apps', preview: 'https://placehold.co/400x300/18181b/334155?text=Fitness' },
  { id: 't6', name: 'Newsletter Email', category: 'Email', preview: 'https://placehold.co/400x300/18181b/334155?text=Newsletter' },
  { id: 't7', name: 'Startup Landing', category: 'Websites', preview: 'https://placehold.co/400x300/18181b/334155?text=Startup' },
  { id: 't8', name: 'Pitch Deck', category: 'Presentations', preview: 'https://placehold.co/400x300/18181b/334155?text=Pitch+Deck' },
  { id: 't9', name: 'Banking App', category: 'Mobile Apps', preview: 'https://placehold.co/400x300/18181b/334155?text=Banking' },
  { id: 't10', name: 'CRM Dashboard', category: 'Dashboards', preview: 'https://placehold.co/400x300/18181b/334155?text=CRM' },
  { id: 't11', name: 'Portfolio Site', category: 'Websites', preview: 'https://placehold.co/400x300/18181b/334155?text=Portfolio' },
  { id: 't12', name: 'Onboarding Flow', category: 'Mobile Apps', preview: 'https://placehold.co/400x300/18181b/334155?text=Onboarding' },
];

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  { name: 'Sarah Kim', role: 'Design Lead', company: 'Linear', quote: 'Canvas replaced Figma for our entire design team. The real-time collaboration is on another level — we shipped our redesign 3 weeks ahead of schedule.', avatar: 'https://placehold.co/48x48/334155/94a3b8?text=SK' },
  { name: 'Marcus Rivera', role: 'Staff Engineer', company: 'Vercel', quote: 'The code export is unreal. I get production-ready React components from our designers — no more manual translation.', avatar: 'https://placehold.co/48x48/334155/94a3b8?text=MR' },
  { name: 'Priya Mehta', role: 'VP Design', company: 'Notion', quote: 'Our design system has never been more consistent. Canvas is the connective tissue between design and engineering.', avatar: 'https://placehold.co/48x48/334155/94a3b8?text=PM' },
  { name: 'James Chen', role: 'Product Manager', company: 'Stripe', quote: 'We cut our design-to-dev handoff time by 60%. The AI suggestions alone saved us hundreds of hours.', avatar: 'https://placehold.co/48x48/334155/94a3b8?text=JC' },
];

interface PricingPlan {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'For individuals exploring design.',
    features: ['3 active projects', 'Unlimited viewer seats', 'Basic components library', 'Community support', 'PNG/SVG export'],
    cta: 'Start free',
  },
  {
    name: 'Pro',
    price: { monthly: 15, annual: 12 },
    description: 'For professional designers and small teams.',
    features: ['Unlimited projects', 'Unlimited viewer seats', 'Full component library', 'AI suggestions (100/mo)', 'Code export (React, Vue, CSS)', 'Version history (90 days)', 'Priority support'],
    highlighted: true,
    badge: 'Most popular',
    cta: 'Start free trial',
  },
  {
    name: 'Organization',
    price: { monthly: 30, annual: 25 },
    description: 'For teams and enterprises that need scale.',
    features: ['Everything in Pro', 'Unlimited AI suggestions', 'Design system analytics', 'SSO & SAML', 'Version history (unlimited)', 'Dedicated CSM', 'Custom integrations', 'SLA guarantee'],
    cta: 'Contact sales',
  },
];

const STACK_LOGOS = [
  { name: 'React', text: 'R' },
  { name: 'Vue', text: 'V' },
  { name: 'Next.js', text: 'N' },
  { name: 'Figma', text: 'F' },
  { name: 'GitHub', text: 'G' },
  { name: 'Storybook', text: 'S' },
];

const STATS = [
  { value: '200K+', label: 'designers & engineers' },
  { value: '4.2M', label: 'files created' },
  { value: '890K', label: 'components published' },
  { value: '12K', label: 'companies on Canvas' },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

/* ── Animated dot grid background ── */
function InfiniteCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-[-100%] w-[300%] h-[300%] animate-[canvasScroll_60s_linear_infinite]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <style>{`
        @keyframes canvasScroll {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-24px, -24px); }
        }
      `}</style>
    </div>
  );
}

/* ── Collaboration cursors (animated) ── */
function CollaborationCursors() {
  const cursors = [
    { name: 'Sarah', color: '#60a5fa', path: 'cursor1' },
    { name: 'Liam', color: '#fb7185', path: 'cursor2' },
    { name: 'Priya', color: '#fbbf24', path: 'cursor3' },
  ];

  return (
    <>
      {cursors.map((cursor, i) => (
        <div
          key={cursor.name}
          className="absolute pointer-events-none animate-[cursorFloat_8s_ease-in-out_infinite]"
          style={{
            left: `${20 + i * 28}%`,
            top: `${30 + (i % 2) * 20}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${6 + i * 2}s`,
          }}
        >
          {/* Cursor SVG */}
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M1 1L6 18L8.5 10.5L15 8.5L1 1Z" fill={cursor.color} stroke="white" strokeWidth="1.5" />
          </svg>
          {/* Name label */}
          <span
            className="ml-3 -mt-1 text-[10px] font-semibold text-white px-1.5 py-0.5 rounded whitespace-nowrap"
            style={{ backgroundColor: cursor.color }}
          >
            {cursor.name}
          </span>
        </div>
      ))}
      <style>{`
        @keyframes cursorFloat {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(30px, -20px); }
          50% { transform: translate(-15px, 25px); }
          75% { transform: translate(20px, 10px); }
        }
      `}</style>
    </>
  );
}

/* ── Browser chrome frame ── */
function BrowserFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl overflow-hidden border', 'border-zinc-200 dark:border-zinc-800', 'shadow-2xl shadow-black/10 dark:shadow-black/40', className)}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-1 rounded-md bg-zinc-200/60 dark:bg-zinc-800/60 text-[10px] text-zinc-500 dark:text-zinc-500 font-mono">
            canvas.design/editor
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="relative bg-white dark:bg-zinc-950">
        {children}
      </div>
    </div>
  );
}

/* ── Product mockup ── */
function ProductMockup() {
  const [calloutsVisible, setCalloutsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setCalloutsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserFrame className="max-w-5xl mx-auto">
      <div className="relative aspect-[16/10] bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
        {/* Simulated editor layout */}
        <div className="absolute inset-0 flex">
          {/* Left panel — component library */}
          <div className="w-[200px] border-r border-zinc-200 dark:border-zinc-800 p-3 hidden sm:block">
            <p className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-2">Components</p>
            {['Button', 'Card', 'Input', 'Modal', 'Tabs', 'Avatar', 'Badge', 'Alert'].map((c) => (
              <div key={c} className="flex items-center gap-2 py-1.5 px-2 rounded text-[11px] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-default">
                <div className="w-3 h-3 rounded border border-zinc-300 dark:border-zinc-700" />
                {c}
              </div>
            ))}
          </div>

          {/* Center — canvas */}
          <div className="flex-1 relative bg-zinc-50 dark:bg-zinc-950 p-6 flex items-center justify-center">
            {/* Design preview element — mobile app mockup */}
            <div className="w-[180px] sm:w-[220px] bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="h-6 bg-zinc-100 dark:bg-zinc-800" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-full" />
                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6" />
                <div className="h-8 bg-slate-700 dark:bg-slate-300 rounded-lg mt-3" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
                  <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Live cursors */}
            <CollaborationCursors />
          </div>

          {/* Right panel — collaboration */}
          <div className="w-[180px] border-l border-zinc-200 dark:border-zinc-800 p-3 hidden md:block">
            <p className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-2">Online — 3</p>
            {[
              { name: 'Sarah K.', color: '#60a5fa' },
              { name: 'Liam W.', color: '#fb7185' },
              { name: 'Priya M.', color: '#fbbf24' },
            ].map((u) => (
              <div key={u.name} className="flex items-center gap-2 py-1.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold" style={{ backgroundColor: u.color }}>
                  {u.name[0]}
                </div>
                <span className="text-[11px] text-zinc-600 dark:text-zinc-400">{u.name}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 ml-auto" />
              </div>
            ))}
            <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-2">Comments</p>
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-2">
                <p className="text-[10px] text-blue-700 dark:text-blue-400 font-medium">Sarah K.</p>
                <p className="text-[10px] text-blue-600 dark:text-blue-500 mt-0.5">Can we increase the CTA contrast?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature callouts */}
        {[
          { label: '4,000+ components in your design system', left: '3%', top: '15%', delay: 0 },
          { label: '3 teammates editing simultaneously', left: '55%', top: '20%', delay: 200 },
          { label: 'Export to React, Vue, CSS in one click', left: '8%', top: '78%', delay: 400 },
        ].map((callout, i) => (
          <div
            key={i}
            className={cn(
              'absolute hidden lg:flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-medium transition-all duration-500',
              'bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950',
              'shadow-lg',
              calloutsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            )}
            style={{
              left: callout.left,
              top: callout.top,
              transitionDelay: `${callout.delay}ms`,
            }}
          >
            <span className="text-[10px]">→</span> {callout.label}
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

/* ── Feature bento card ── */
function FeatureBentoCard({ feature }: { feature: Feature }) {
  const [hovered, setHovered] = React.useState(false);
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        'group relative rounded-xl overflow-hidden transition-all duration-300 p-6 cursor-default',
        'bg-white dark:bg-zinc-900',
        'border border-zinc-200 dark:border-zinc-800',
        'hover:border-zinc-300 dark:hover:border-zinc-700',
        'hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20',
      )}
      style={{
        gridColumn: `span ${Math.min(feature.colSpan, 12)}`,
        gridRow: `span ${feature.rowSpan}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300',
          hovered && 'scale-110',
        )}
        style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{feature.description}</p>

      {/* Demo area for large cards */}
      {feature.rowSpan >= 2 && feature.id === 'collab' && (
        <div className="mt-4 relative h-32 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <CollaborationCursors />
        </div>
      )}
      {feature.rowSpan >= 2 && feature.id === 'ai-suggest' && (
        <div className="mt-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 font-mono text-[11px]">
          <p className="text-zinc-400 dark:text-zinc-600">$ Generate a toggle switch</p>
          <p className="text-amber-500 mt-1">✨ Creating ToggleSwitch with 3 variants...</p>
          <div className="mt-2 h-8 bg-amber-400/10 rounded animate-pulse" />
        </div>
      )}
    </div>
  );
}

/* ── AI Demo Card ── */
function AiDemoCard({ capability }: { capability: AiCapability }) {
  const [typed, setTyped] = React.useState('');
  const [showResult, setShowResult] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (!isActive) return;
    let i = 0;
    setTyped('');
    setShowResult(false);
    const interval = setInterval(() => {
      if (i < capability.prompt.length) {
        setTyped(capability.prompt.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowResult(true), 400);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isActive, capability.prompt]);

  return (
    <div
      className={cn(
        'rounded-xl border p-6 transition-all duration-300 cursor-pointer',
        'bg-zinc-900 dark:bg-zinc-900',
        'border-zinc-800 dark:border-zinc-800',
        isActive ? 'ring-2 ring-amber-400/40 border-amber-400/20' : 'hover:border-zinc-700',
      )}
      onClick={() => setIsActive(!isActive)}
    >
      <h3 className="text-lg font-bold text-white mb-2">{capability.title}</h3>
      <p className="text-sm text-zinc-400 mb-4">{capability.description}</p>

      {/* Terminal demo */}
      <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] min-h-[80px]">
        <p className="text-zinc-600">
          <span className="text-amber-400">canvas</span>
          <span className="text-zinc-600"> &gt; </span>
          <span className="text-zinc-300">{isActive ? typed : capability.prompt}</span>
          {isActive && !showResult && <span className="animate-pulse text-amber-400">▋</span>}
        </p>
        {(showResult || !isActive) && (
          <p className="text-emerald-400 mt-2 text-[11px]">
            ✓ {capability.result}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Pricing Card ── */
function PricingCard({
  plan,
  isAnnual,
}: {
  plan: PricingPlan;
  isAnnual: boolean;
}) {
  const price = isAnnual ? plan.price.annual : plan.price.monthly;

  return (
    <div
      className={cn(
        'relative rounded-xl p-6 transition-all duration-300',
        plan.highlighted
          ? 'bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950 border-2 border-slate-600 dark:border-slate-400 shadow-xl shadow-slate-700/25 dark:shadow-slate-300/25 scale-[1.02]'
          : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800',
      )}
    >
      {plan.badge && (
        <span className={cn(
          'absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
          'bg-amber-400 text-black',
        )}>
          {plan.badge}
        </span>
      )}

      <h3 className={cn(
        'text-xl font-bold mb-1',
        plan.highlighted ? 'text-white dark:text-zinc-950' : 'text-zinc-950 dark:text-white'
      )}>
        {plan.name}
      </h3>
      <p className={cn(
        'text-sm mb-4',
        plan.highlighted ? 'text-white/70 dark:text-zinc-950/70' : 'text-zinc-500 dark:text-zinc-500'
      )}>
        {plan.description}
      </p>

      <div className="mb-6">
        <span className={cn(
          'text-4xl font-extrabold font-mono tabular-nums',
          plan.highlighted ? 'text-white dark:text-zinc-950' : 'text-zinc-950 dark:text-white'
        )}>
          ${price}
        </span>
        {price > 0 && (
          <span className={cn(
            'text-sm ml-1',
            plan.highlighted ? 'text-white/60 dark:text-zinc-950/60' : 'text-zinc-500'
          )}>
            /editor/mo
          </span>
        )}
      </div>

      <ul className="space-y-2 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <IconCheck className={cn(
              'w-4 h-4 mt-0.5 flex-shrink-0',
              plan.highlighted ? 'text-amber-300 dark:text-amber-600' : 'text-emerald-500'
            )} />
            <span className={plan.highlighted ? 'text-white/90 dark:text-zinc-950/90' : 'text-zinc-600 dark:text-zinc-400'}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={cn(
          'w-full py-2.5 rounded-lg text-sm font-semibold transition-colors',
          plan.highlighted
            ? 'bg-white text-slate-700 hover:bg-zinc-100 dark:bg-zinc-950 dark:text-slate-300 dark:hover:bg-zinc-900'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700',
        )}
      >
        {plan.cta}
      </button>

      {price > 0 && <p className={cn(
        'text-center text-[10px] mt-2',
        plan.highlighted ? 'text-white/50 dark:text-zinc-950/50' : 'text-zinc-400 dark:text-zinc-600'
      )}>
        Viewer seats always free
      </p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface DesignToolTemplateProps {
  /** Additional className for the page wrapper */
  className?: string;
}

/**
 * DesignToolTemplate — Design Tool / Creative SaaS website template (Figma / Penpot aesthetic).
 *
 * Palette: Slate + Amber. Mode: Light primary + dark secondary, both fully specified.
 * Font: Geist (headings), Inter (body), Geist Mono (code).
 *
 * Sections:
 *   Nav → Hero (with product mockup + collaboration cursors) → Features Bento Grid →
 *   AI Features (dark) → Templates Gallery → Social Proof (stats + testimonials) →
 *   Pricing → CTA → Footer
 */
export function DesignToolTemplate({ className }: DesignToolTemplateProps) {
  const [isAnnual, setIsAnnual] = React.useState(true);
  const [activeTemplateCategory, setActiveTemplateCategory] = React.useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const filteredTemplates = activeTemplateCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeTemplateCategory);

  return (
    <div
      className={cn(
        'min-h-screen antialiased',
        'bg-white text-zinc-950',
        'dark:bg-zinc-950 dark:text-zinc-50',
        className,
      )}
    >
      {/* ── Navbar ── */}
      <NavBar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
        {/* Background infinite dot grid */}
        <div className="absolute inset-0 text-zinc-300/[0.04] dark:text-zinc-700/[0.06]">
          <InfiniteCanvas />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full pt-12 pb-8">
          {/* Center copy */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 mb-6 rounded-full px-3.5 py-1.5 text-xs font-medium bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-400/20">
              <IconSparkles className="w-3.5 h-3.5" />
              Now with AI component generation
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-zinc-950 dark:text-white"
              style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}
            >
              Design together.{' '}
              <span className="text-slate-500 dark:text-slate-400">Ship faster.</span>
            </h1>

            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Canvas is the collaborative design tool built for the pace of modern product teams. Real-time, component-first, and code-ready.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="#pricing"
                className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg shadow-slate-700/25 dark:shadow-slate-300/25"
              >
                Start designing free
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <IconPlay className="w-4 h-4" />
                Watch 2-min demo
              </a>
            </div>
          </div>
        </div>

        {/* Product mockup */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-8">
          <ProductMockup />
        </div>

        {/* Stack logos */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16">
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-600 mb-4">Works with your stack</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {STACK_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[11px] font-bold text-zinc-500 dark:text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                title={logo.name}
              >
                {logo.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 1 — Collaboration Showcase ── */}
      <section className="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-500 mb-2 block">Real-time collaboration</span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}>
              See every change as it happens.
            </h2>
            <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              No more "did you save?" or version confusion. Everyone works on the same source of truth, at the same time.
            </p>
          </div>

          <BrowserFrame className="max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center overflow-hidden">
              {/* Simulated collaboration scene */}
              <div className="w-64 h-40 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mb-2" />
                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-full mb-1.5" />
                <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6 mb-3" />
                <div className="h-8 bg-slate-700 dark:bg-slate-300 rounded-lg" />
              </div>

              {/* Comment thread */}
              <div className="absolute right-8 top-8 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[7px] flex items-center justify-center font-bold">S</div>
                  <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">Sarah</span>
                  <span className="text-[9px] text-zinc-400 ml-auto">2m ago</span>
                </div>
                <p className="text-[10px] text-zinc-600 dark:text-zinc-400">Love this layout! Can we try a bolder CTA?</p>
                <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-rose-500 text-white text-[7px] flex items-center justify-center font-bold">L</div>
                    <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">Liam</span>
                    <span className="text-[9px] text-zinc-400 ml-auto">just now</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-1">On it! Updating now ✨</p>
                </div>
              </div>

              <CollaborationCursors />
            </div>
          </BrowserFrame>
        </div>
      </section>

      {/* ── Section 2 — Features Bento Grid ── */}
      <section className="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}>
              Everything you need to design.
            </h2>
            <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Every feature built for speed. No bloat, no plugins, no workarounds.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-auto">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  'col-span-1',
                  feature.colSpan >= 7 ? 'sm:col-span-2 lg:col-span-7' : feature.colSpan >= 5 ? 'sm:col-span-1 lg:col-span-5' : 'sm:col-span-1 lg:col-span-4',
                )}
              >
                <FeatureBentoCard feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 — AI Features (dark section) ── */}
      <section className="py-20 lg:py-32 bg-zinc-950 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <IconSparkles className="w-3.5 h-3.5" />
              AI-powered
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}>
              Design AI that accelerates your workflow.
            </h2>
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              Not a gimmick. Real AI that understands your design system and generates production-ready components.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {AI_CAPABILITIES.map((cap) => (
              <AiDemoCard key={cap.id} capability={cap} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 — Templates Gallery ── */}
      <section className="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}>
                Start faster with 400+ templates.
              </h2>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Professionally designed, fully editable, ready to customize.
              </p>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTemplateCategory(cat)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
                  activeTemplateCategory === cat
                    ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 cursor-pointer"
              >
                <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-700/90 px-4 py-2 rounded-lg">
                      Open in Canvas
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{template.name}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-500">{template.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5 — Social Proof ── */}
      <section className="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}>
              Trusted by 200,000 designers and engineers.
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-xl p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="w-3.5 h-3.5 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role} at {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6 — Pricing ── */}
      <section id="pricing" className="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}>
              Simple pricing. No surprises.
            </h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400">
              Free to start. Scale when you're ready.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={cn('text-sm font-medium', !isAnnual ? 'text-zinc-950 dark:text-white' : 'text-zinc-400')}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={cn(
                  'relative w-12 h-6 rounded-full transition-colors duration-200',
                  isAnnual ? 'bg-slate-700 dark:bg-slate-300' : 'bg-zinc-300 dark:bg-zinc-700',
                )}
              >
                <div className={cn(
                  'absolute top-0.5 w-5 h-5 rounded-full bg-white dark:bg-zinc-950 transition-transform duration-200 shadow-sm',
                  isAnnual ? 'translate-x-6' : 'translate-x-0.5',
                )} />
              </button>
              <span className={cn('text-sm font-medium', isAnnual ? 'text-zinc-950 dark:text-white' : 'text-zinc-400')}>
                Annual
                <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  Save 2 months
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 lg:py-32 bg-zinc-950 dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}>
            Ready to design differently?
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-xl mx-auto">
            Join 200,000+ designers and engineers already building with Canvas. Free forever for individual use.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="#"
              className="inline-flex items-center px-8 py-3.5 rounded-lg text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-100 transition-colors shadow-lg"
            >
              Start designing free <IconArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center px-8 py-3.5 rounded-lg text-sm font-medium border border-zinc-700 text-zinc-300 hover:bg-zinc-900 transition-colors"
            >
              Schedule a demo
            </a>
          </div>
          <p className="mt-6 text-xs text-zinc-600">
            No credit card required · Free tier available forever · SOC 2 compliant
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <IconLayout className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <span className="text-sm font-bold text-zinc-950 dark:text-white" style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}>
                  Canvas
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                The collaborative design tool for modern product teams.
              </p>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit">
                <IconStar className="w-3 h-3 text-amber-400" />
                <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">8.2k</span>
                <span className="text-[10px] text-zinc-400">on GitHub</span>
              </div>
            </div>

            {/* Link groups */}
            {[
              { title: 'Product', links: ['Features', 'Templates', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Resources', links: ['Documentation', 'Tutorials', 'Community', 'Blog', 'Status'] },
              { title: 'Company', links: ['About', 'Careers', 'Press Kit', 'Contact', 'Legal'] },
              { title: 'Developers', links: ['API Reference', 'Plugin SDK', 'GitHub', 'npm package', 'Integrations'] },
            ].map((group) => (
              <div key={group.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600 mb-3">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-400">© {new Date().getFullYear()} Canvas Design, Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors">Security</a>
              <a href="#" className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Navbar (extracted) ── */
function NavBar({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <IconLayout className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <span
              className="text-sm font-bold text-zinc-950 dark:text-white"
              style={{ fontFamily: "'Inter', 'Geist', system-ui, sans-serif" }}
            >
              Canvas
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* GitHub stars */}
            <a
              href="#"
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <IconStar className="w-3 h-3 text-amber-400" /> 8.2k
            </a>
            <a
              href="#"
              className="hidden sm:inline-flex text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Log in
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              Start designing free
            </a>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-600 dark:text-zinc-400"
            >
              {mobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-20 px-6 md:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="py-3 text-lg font-medium text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="mt-6 space-y-3">
            <a href="#" className="block text-center py-3 rounded-lg text-sm font-semibold bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950">
              Start designing free
            </a>
            <a href="#" className="block text-center py-3 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
              Log in
            </a>
          </div>
        </div>
      )}
    </>
  );
}

DesignToolTemplate.displayName = 'DesignToolTemplate';
