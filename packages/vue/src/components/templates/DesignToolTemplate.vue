<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

export interface DesignToolTemplateProps {
  class?: string;
}

const props = defineProps<DesignToolTemplateProps>();

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

interface Feature {
  id: string;
  title: string;
  description: string;
  iconType: string;
  color: string;
  colSpan: number;
  rowSpan: number;
}

interface AiCapability {
  id: string;
  title: string;
  description: string;
  prompt: string;
  result: string;
}

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  preview: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
}

interface Stat {
  value: string;
  label: string;
}

const NAV_LINKS = ['Features', 'Templates', 'Pricing', 'Changelog', 'Docs'];

const FEATURES: Feature[] = [
  {
    id: 'collab',
    title: 'Real-time collaboration',
    description: 'Work simultaneously with your entire team. See live cursors, edits, and comments — all in real-time.',
    iconType: 'users',
    color: '#60a5fa',
    colSpan: 7,
    rowSpan: 2,
  },
  {
    id: 'design-system',
    title: 'Design system management',
    description: 'Centralize your tokens, components, and patterns. Keep every project consistent without manual syncing.',
    iconType: 'layers',
    color: '#fb7185',
    colSpan: 5,
    rowSpan: 1,
  },
  {
    id: 'ai-suggest',
    title: 'AI component suggestions',
    description: 'Describe what you need and Canvas generates production-ready components instantly.',
    iconType: 'sparkles',
    color: '#fbbf24',
    colSpan: 5,
    rowSpan: 2,
  },
  {
    id: 'code-export',
    title: 'Code export',
    description: 'Export any design to clean React, Vue, or CSS code. One click, no plugins, zero config.',
    iconType: 'code',
    color: '#34d399',
    colSpan: 7,
    rowSpan: 1,
  },
  {
    id: 'comments',
    title: 'Comments & handoff',
    description: 'Structured feedback threads pinned to exact pixels. Developers get everything they need without a meeting.',
    iconType: 'message',
    color: '#60a5fa',
    colSpan: 4,
    rowSpan: 1,
  },
  {
    id: 'versioning',
    title: 'Version history',
    description: 'Every change is tracked. Compare, branch, and restore any previous state of your design.',
    iconType: 'git',
    color: '#fb7185',
    colSpan: 4,
    rowSpan: 1,
  },
  {
    id: 'responsive',
    title: 'Responsive preview',
    description: 'Preview your design at every breakpoint simultaneously. No guesswork, no surprises.',
    iconType: 'monitor',
    color: '#34d399',
    colSpan: 4,
    rowSpan: 1,
  },
];

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

const TESTIMONIALS: Testimonial[] = [
  { name: 'Sarah Kim', role: 'Design Lead', company: 'Linear', quote: 'Canvas replaced Figma for our entire design team. The real-time collaboration is on another level — we shipped our redesign 3 weeks ahead of schedule.', avatar: 'https://placehold.co/48x48/334155/94a3b8?text=SK' },
  { name: 'Marcus Rivera', role: 'Staff Engineer', company: 'Vercel', quote: 'The code export is unreal. I get production-ready React components from our designers — no more manual translation.', avatar: 'https://placehold.co/48x48/334155/94a3b8?text=MR' },
  { name: 'Priya Mehta', role: 'VP Design', company: 'Notion', quote: 'Our design system has never been more consistent. Canvas is the connective tissue between design and engineering.', avatar: 'https://placehold.co/48x48/334155/94a3b8?text=PM' },
  { name: 'James Chen', role: 'Product Manager', company: 'Stripe', quote: 'We cut our design-to-dev handoff time by 60%. The AI suggestions alone saved us hundreds of hours.', avatar: 'https://placehold.co/48x48/334155/94a3b8?text=JC' },
];

const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Free',
    priceMonthly: 0,
    priceAnnual: 0,
    description: 'For individuals exploring design.',
    features: ['3 active projects', 'Unlimited viewer seats', 'Basic components library', 'Community support', 'PNG/SVG export'],
    cta: 'Start free',
  },
  {
    name: 'Pro',
    priceMonthly: 15,
    priceAnnual: 12,
    description: 'For professional designers and small teams.',
    features: ['Unlimited projects', 'Unlimited viewer seats', 'Full component library', 'AI suggestions (100/mo)', 'Code export (React, Vue, CSS)', 'Version history (90 days)', 'Priority support'],
    highlighted: true,
    badge: 'Most popular',
    cta: 'Start free trial',
  },
  {
    name: 'Organization',
    priceMonthly: 30,
    priceAnnual: 25,
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

const STATS: Stat[] = [
  { value: '200K+', label: 'designers & engineers' },
  { value: '4.2M', label: 'files created' },
  { value: '890K', label: 'components published' },
  { value: '12K', label: 'companies on Canvas' },
];

const COMPONENT_LIST = ['Button', 'Card', 'Input', 'Modal', 'Tabs', 'Avatar', 'Badge', 'Alert'];

const ONLINE_USERS = [
  { name: 'Sarah K.', color: '#60a5fa' },
  { name: 'Liam W.', color: '#fb7185' },
  { name: 'Priya M.', color: '#fbbf24' },
];

const CURSORS = [
  { name: 'Sarah', color: '#60a5fa' },
  { name: 'Liam', color: '#fb7185' },
  { name: 'Priya', color: '#fbbf24' },
];

const CALLOUTS = [
  { label: '4,000+ components in your design system', left: '3%', top: '15%', delay: 0 },
  { label: '3 teammates editing simultaneously', left: '55%', top: '20%', delay: 200 },
  { label: 'Export to React, Vue, CSS in one click', left: '8%', top: '78%', delay: 400 },
];

const FOOTER_GROUPS = [
  { title: 'Product', links: ['Features', 'Templates', 'Pricing', 'Changelog', 'Roadmap'] },
  { title: 'Resources', links: ['Documentation', 'Tutorials', 'Community', 'Blog', 'Status'] },
  { title: 'Company', links: ['About', 'Careers', 'Press Kit', 'Contact', 'Legal'] },
  { title: 'Developers', links: ['API Reference', 'Plugin SDK', 'GitHub', 'npm package', 'Integrations'] },
];

/* ------------------------------------------------------------------ */
/*  State                                                               */
/* ------------------------------------------------------------------ */

const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const isAnnual = ref(true);
const activeTemplateCategory = ref('All');
const calloutsVisible = ref(false);
const activeAiId = ref<string | null>(null);
const aiTypedText = ref('');
const aiShowResult = ref(false);

const filteredTemplates = computed(() =>
  activeTemplateCategory.value === 'All'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeTemplateCategory.value),
);

const currentYear = new Date().getFullYear();

/* ------------------------------------------------------------------ */
/*  Lifecycle                                                           */
/* ------------------------------------------------------------------ */

function onScroll() {
  scrolled.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  setTimeout(() => { calloutsVisible.value = true; }, 800);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});

/* ------------------------------------------------------------------ */
/*  AI demo interaction                                                 */
/* ------------------------------------------------------------------ */

let aiTimer: ReturnType<typeof setInterval> | null = null;

function toggleAiDemo(cap: AiCapability) {
  if (activeAiId.value === cap.id) {
    activeAiId.value = null;
    aiTypedText.value = '';
    aiShowResult.value = false;
    if (aiTimer) clearInterval(aiTimer);
    return;
  }

  activeAiId.value = cap.id;
  aiTypedText.value = '';
  aiShowResult.value = false;

  let i = 0;
  if (aiTimer) clearInterval(aiTimer);
  aiTimer = setInterval(() => {
    if (i < cap.prompt.length) {
      aiTypedText.value = cap.prompt.slice(0, i + 1);
      i++;
    } else {
      if (aiTimer) clearInterval(aiTimer);
      setTimeout(() => { aiShowResult.value = true; }, 400);
    }
  }, 40);
}

function getFeatureColClass(feature: Feature): string {
  if (feature.colSpan >= 7) return 'sm:col-span-2 lg:col-span-7';
  if (feature.colSpan >= 5) return 'sm:col-span-1 lg:col-span-5';
  return 'sm:col-span-1 lg:col-span-4';
}

function getPlanPrice(plan: PricingPlan): number {
  return isAnnual.value ? plan.priceAnnual : plan.priceMonthly;
}
</script>

<template>
  <div
    :class="cn(
      'min-h-screen antialiased',
      'bg-white text-zinc-950',
      'dark:bg-zinc-950 dark:text-zinc-50',
      props.class,
    )"
  >
    <!-- ─── Navbar ─── -->
    <header
      :class="cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent',
      )"
    >
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-slate-700 dark:text-slate-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          <span class="text-sm font-bold text-zinc-950 dark:text-white" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">Canvas</span>
        </div>

        <!-- Center nav -->
        <nav class="hidden md:flex items-center gap-1">
          <a
            v-for="link in NAV_LINKS"
            :key="link"
            :href="`#${link.toLowerCase()}`"
            class="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-150"
          >
            {{ link }}
          </a>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <a href="#" class="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <svg class="w-3 h-3 text-amber-400" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            8.2k
          </a>
          <a href="#" class="hidden sm:inline-flex text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Log in</a>
          <a href="#" class="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">Start designing free</a>
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden w-8 h-8 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
            <svg v-if="mobileMenuOpen" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-20 px-6 md:hidden">
      <nav class="flex flex-col gap-2">
        <a
          v-for="link in NAV_LINKS"
          :key="link"
          :href="`#${link.toLowerCase()}`"
          class="py-3 text-lg font-medium text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-900"
          @click="mobileMenuOpen = false"
        >
          {{ link }}
        </a>
      </nav>
      <div class="mt-6 space-y-3">
        <a href="#" class="block text-center py-3 rounded-lg text-sm font-semibold bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950">Start designing free</a>
        <a href="#" class="block text-center py-3 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">Log in</a>
      </div>
    </div>

    <!-- ─── Hero ─── -->
    <section class="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      <!-- Infinite dot grid -->
      <div class="absolute inset-0 text-zinc-300/[0.04] dark:text-zinc-700/[0.06] overflow-hidden pointer-events-none">
        <div class="absolute inset-[-100%] w-[300%] h-[300%] canvas-grid-scroll" />
      </div>

      <div class="relative z-10 mx-auto max-w-7xl px-6 w-full pt-12 pb-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="inline-flex items-center gap-1.5 mb-6 rounded-full px-3.5 py-1.5 text-xs font-medium bg-amber-400/10 text-amber-600 dark:text-amber-400 border border-amber-400/20">
            <svg class="w-3.5 h-3.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" /></svg>
            Now with AI component generation
          </span>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-zinc-950 dark:text-white" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">
            Design together. <span class="text-slate-500 dark:text-slate-400">Ship faster.</span>
          </h1>

          <p class="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Canvas is the collaborative design tool built for the pace of modern product teams. Real-time, component-first, and code-ready.
          </p>

          <div class="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#pricing" class="inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg shadow-slate-700/25 dark:shadow-slate-300/25">
              Start designing free
            </a>
            <a href="#" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20" /></svg>
              Watch 2-min demo
            </a>
          </div>
        </div>
      </div>

      <!-- Product mockup -->
      <div class="relative z-10 mx-auto max-w-6xl px-6 pb-8">
        <div :class="cn('rounded-xl overflow-hidden border shadow-2xl', 'border-zinc-200 dark:border-zinc-800', 'shadow-black/10 dark:shadow-black/40')">
          <!-- Browser chrome -->
          <div class="flex items-center gap-2 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-400/80" />
              <div class="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div class="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div class="flex-1 flex justify-center">
              <div class="px-3 py-1 rounded-md bg-zinc-200/60 dark:bg-zinc-800/60 text-[10px] text-zinc-500 font-mono">canvas.design/editor</div>
            </div>
          </div>
          <!-- Editor -->
          <div class="relative aspect-[16/10] bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            <div class="absolute inset-0 flex">
              <!-- Left panel -->
              <div class="w-[200px] border-r border-zinc-200 dark:border-zinc-800 p-3 hidden sm:block">
                <p class="text-[9px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-2">Components</p>
                <div v-for="c in COMPONENT_LIST" :key="c" class="flex items-center gap-2 py-1.5 px-2 rounded text-[11px] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-default">
                  <div class="w-3 h-3 rounded border border-zinc-300 dark:border-zinc-700" />
                  {{ c }}
                </div>
              </div>
              <!-- Center canvas -->
              <div class="flex-1 relative bg-zinc-50 dark:bg-zinc-950 p-6 flex items-center justify-center">
                <div class="w-[180px] sm:w-[220px] bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                  <div class="h-6 bg-zinc-100 dark:bg-zinc-800" />
                  <div class="p-3 space-y-2">
                    <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
                    <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-full" />
                    <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6" />
                    <div class="h-8 bg-slate-700 dark:bg-slate-300 rounded-lg mt-3" />
                    <div class="grid grid-cols-2 gap-2 mt-2">
                      <div class="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
                      <div class="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
                    </div>
                  </div>
                </div>
                <!-- Cursors -->
                <div
                  v-for="(cursor, ci) in CURSORS"
                  :key="cursor.name"
                  class="absolute pointer-events-none cursor-float-anim"
                  :style="{
                    left: `${20 + ci * 28}%`,
                    top: `${30 + (ci % 2) * 20}%`,
                    animationDelay: `${ci * 2}s`,
                    animationDuration: `${6 + ci * 2}s`,
                  }"
                >
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <path d="M1 1L6 18L8.5 10.5L15 8.5L1 1Z" :fill="cursor.color" stroke="white" stroke-width="1.5" />
                  </svg>
                  <span class="ml-3 -mt-1 text-[10px] font-semibold text-white px-1.5 py-0.5 rounded whitespace-nowrap" :style="{ backgroundColor: cursor.color }">{{ cursor.name }}</span>
                </div>
              </div>
              <!-- Right panel -->
              <div class="w-[180px] border-l border-zinc-200 dark:border-zinc-800 p-3 hidden md:block">
                <p class="text-[9px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-2">Online — 3</p>
                <div v-for="u in ONLINE_USERS" :key="u.name" class="flex items-center gap-2 py-1.5">
                  <div class="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold" :style="{ backgroundColor: u.color }">{{ u.name[0] }}</div>
                  <span class="text-[11px] text-zinc-600 dark:text-zinc-400">{{ u.name }}</span>
                  <div class="w-1.5 h-1.5 rounded-full bg-green-400 ml-auto" />
                </div>
                <div class="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <p class="text-[9px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-2">Comments</p>
                  <div class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-2">
                    <p class="text-[10px] text-blue-700 dark:text-blue-400 font-medium">Sarah K.</p>
                    <p class="text-[10px] text-blue-600 dark:text-blue-500 mt-0.5">Can we increase the CTA contrast?</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Feature callouts -->
            <div
              v-for="(callout, ci) in CALLOUTS"
              :key="ci"
              :class="cn(
                'absolute hidden lg:flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-medium transition-all duration-500',
                'bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950 shadow-lg',
                calloutsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
              )"
              :style="{ left: callout.left, top: callout.top, transitionDelay: `${callout.delay}ms` }"
            >
              <span class="text-[10px]">→</span> {{ callout.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- Stack logos -->
      <div class="relative z-10 mx-auto max-w-4xl px-6 pb-16">
        <p class="text-center text-xs text-zinc-400 dark:text-zinc-600 mb-4">Works with your stack</p>
        <div class="flex justify-center gap-4 flex-wrap">
          <div
            v-for="logo in STACK_LOGOS"
            :key="logo.name"
            class="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[11px] font-bold text-zinc-500 dark:text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            :title="logo.name"
          >
            {{ logo.text }}
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Section 1 — Collaboration Showcase ─── -->
    <section class="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <span class="text-xs font-semibold uppercase tracking-[0.15em] text-blue-500 mb-2 block">Real-time collaboration</span>
          <h2 class="text-3xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">
            See every change as it happens.
          </h2>
          <p class="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            No more "did you save?" or version confusion. Everyone works on the same source of truth, at the same time.
          </p>
        </div>

        <!-- Browser frame with collab demo -->
        <div :class="cn('rounded-xl overflow-hidden border shadow-2xl max-w-4xl mx-auto', 'border-zinc-200 dark:border-zinc-800 shadow-black/10 dark:shadow-black/40')">
          <div class="flex items-center gap-2 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <div class="flex gap-1.5"><div class="w-3 h-3 rounded-full bg-red-400/80" /><div class="w-3 h-3 rounded-full bg-yellow-400/80" /><div class="w-3 h-3 rounded-full bg-green-400/80" /></div>
            <div class="flex-1 flex justify-center"><div class="px-3 py-1 rounded-md bg-zinc-200/60 dark:bg-zinc-800/60 text-[10px] text-zinc-500 font-mono">canvas.design/editor</div></div>
          </div>
          <div class="relative aspect-[16/9] bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center overflow-hidden">
            <div class="w-64 h-40 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <div class="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mb-2" />
              <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-full mb-1.5" />
              <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6 mb-3" />
              <div class="h-8 bg-slate-700 dark:bg-slate-300 rounded-lg" />
            </div>
            <!-- Comment thread -->
            <div class="absolute right-8 top-8 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-3">
              <div class="flex items-center gap-1.5 mb-2">
                <div class="w-4 h-4 rounded-full bg-blue-500 text-white text-[7px] flex items-center justify-center font-bold">S</div>
                <span class="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">Sarah</span>
                <span class="text-[9px] text-zinc-400 ml-auto">2m ago</span>
              </div>
              <p class="text-[10px] text-zinc-600 dark:text-zinc-400">Love this layout! Can we try a bolder CTA?</p>
              <div class="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div class="flex items-center gap-1.5">
                  <div class="w-4 h-4 rounded-full bg-rose-500 text-white text-[7px] flex items-center justify-center font-bold">L</div>
                  <span class="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">Liam</span>
                  <span class="text-[9px] text-zinc-400 ml-auto">just now</span>
                </div>
                <p class="text-[10px] text-zinc-600 dark:text-zinc-400 mt-1">On it! Updating now ✨</p>
              </div>
            </div>
            <!-- Cursors -->
            <div
              v-for="(cursor, ci) in CURSORS"
              :key="'collab-' + cursor.name"
              class="absolute pointer-events-none cursor-float-anim"
              :style="{ left: `${20 + ci * 28}%`, top: `${30 + (ci % 2) * 20}%`, animationDelay: `${ci * 2}s`, animationDuration: `${6 + ci * 2}s` }"
            >
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M1 1L6 18L8.5 10.5L15 8.5L1 1Z" :fill="cursor.color" stroke="white" stroke-width="1.5" /></svg>
              <span class="ml-3 -mt-1 text-[10px] font-semibold text-white px-1.5 py-0.5 rounded whitespace-nowrap" :style="{ backgroundColor: cursor.color }">{{ cursor.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Section 2 — Features Bento Grid ─── -->
    <section class="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">
            Everything you need to design.
          </h2>
          <p class="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Every feature built for speed. No bloat, no plugins, no workarounds.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-auto">
          <div
            v-for="feature in FEATURES"
            :key="feature.id"
            :class="cn('col-span-1', getFeatureColClass(feature))"
          >
            <div
              :class="cn(
                'group relative rounded-xl overflow-hidden transition-all duration-300 p-6 cursor-default h-full',
                'bg-white dark:bg-zinc-900',
                'border border-zinc-200 dark:border-zinc-800',
                'hover:border-zinc-300 dark:hover:border-zinc-700',
                'hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20',
              )"
            >
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                :style="{ backgroundColor: `${feature.color}15`, color: feature.color }"
              >
                <!-- Icon based on type -->
                <svg v-if="feature.iconType === 'users'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                <svg v-else-if="feature.iconType === 'layers'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
                <svg v-else-if="feature.iconType === 'sparkles'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" /></svg>
                <svg v-else-if="feature.iconType === 'code'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                <svg v-else-if="feature.iconType === 'message'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                <svg v-else-if="feature.iconType === 'git'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>
                <svg v-else-if="feature.iconType === 'monitor'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
              </div>
              <h3 class="text-lg font-bold text-zinc-950 dark:text-white mb-2">{{ feature.title }}</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ feature.description }}</p>

              <!-- Demo area for collab card -->
              <div v-if="feature.rowSpan >= 2 && feature.id === 'collab'" class="mt-4 relative h-32 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div
                  v-for="(cursor, ci) in CURSORS"
                  :key="'bento-' + cursor.name"
                  class="absolute pointer-events-none cursor-float-anim"
                  :style="{ left: `${20 + ci * 28}%`, top: `${30 + (ci % 2) * 20}%`, animationDelay: `${ci * 2}s`, animationDuration: `${6 + ci * 2}s` }"
                >
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M1 1L6 18L8.5 10.5L15 8.5L1 1Z" :fill="cursor.color" stroke="white" stroke-width="1.5" /></svg>
                  <span class="ml-3 -mt-1 text-[10px] font-semibold text-white px-1.5 py-0.5 rounded whitespace-nowrap" :style="{ backgroundColor: cursor.color }">{{ cursor.name }}</span>
                </div>
              </div>

              <!-- Demo area for AI card -->
              <div v-if="feature.rowSpan >= 2 && feature.id === 'ai-suggest'" class="mt-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 font-mono text-[11px]">
                <p class="text-zinc-400 dark:text-zinc-600">$ Generate a toggle switch</p>
                <p class="text-amber-500 mt-1">✨ Creating ToggleSwitch with 3 variants...</p>
                <div class="mt-2 h-8 bg-amber-400/10 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Section 3 — AI Features (dark) ─── -->
    <section class="py-20 lg:py-32 bg-zinc-950 dark:bg-zinc-950">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <span class="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <svg class="w-3.5 h-3.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" /></svg>
            AI-powered
          </span>
          <h2 class="text-3xl lg:text-5xl font-extrabold text-white tracking-tight" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">
            Design AI that accelerates your workflow.
          </h2>
          <p class="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Not a gimmick. Real AI that understands your design system and generates production-ready components.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            v-for="cap in AI_CAPABILITIES"
            :key="cap.id"
            :class="cn(
              'rounded-xl border p-6 transition-all duration-300 cursor-pointer',
              'bg-zinc-900 border-zinc-800',
              activeAiId === cap.id ? 'ring-2 ring-amber-400/40 border-amber-400/20' : 'hover:border-zinc-700',
            )"
            @click="toggleAiDemo(cap)"
          >
            <h3 class="text-lg font-bold text-white mb-2">{{ cap.title }}</h3>
            <p class="text-sm text-zinc-400 mb-4">{{ cap.description }}</p>
            <div class="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] min-h-[80px]">
              <p class="text-zinc-600">
                <span class="text-amber-400">canvas</span>
                <span class="text-zinc-600"> &gt; </span>
                <span class="text-zinc-300">{{ activeAiId === cap.id ? aiTypedText : cap.prompt }}</span>
                <span v-if="activeAiId === cap.id && !aiShowResult" class="animate-pulse text-amber-400">▋</span>
              </p>
              <p v-if="aiShowResult && activeAiId === cap.id" class="text-emerald-400 mt-2 text-[11px]">✓ {{ cap.result }}</p>
              <p v-else-if="activeAiId !== cap.id" class="text-emerald-400 mt-2 text-[11px]">✓ {{ cap.result }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Section 4 — Templates Gallery ─── -->
    <section class="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 class="text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">Start faster with 400+ templates.</h2>
            <p class="mt-2 text-zinc-500 dark:text-zinc-400">Professionally designed, fully editable, ready to customize.</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-8">
          <button
            v-for="cat in TEMPLATE_CATEGORIES"
            :key="cat"
            :class="cn(
              'px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
              activeTemplateCategory === cat
                ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800',
            )"
            @click="activeTemplateCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="template in filteredTemplates"
            :key="template.id"
            class="group relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 cursor-pointer"
          >
            <div class="aspect-[4/3] bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
              <img :src="template.preview" :alt="template.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span class="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-700/90 px-4 py-2 rounded-lg">Open in Canvas</span>
              </div>
            </div>
            <div class="p-3">
              <p class="text-sm font-semibold text-zinc-900 dark:text-white">{{ template.name }}</p>
              <p class="text-[11px] text-zinc-500">{{ template.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Section 5 — Social Proof ─── -->
    <section class="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">
            Trusted by 200,000 designers and engineers.
          </h2>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div v-for="stat in STATS" :key="stat.label" class="text-center">
            <div class="text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white font-mono tabular-nums">{{ stat.value }}</div>
            <div class="text-sm text-zinc-500 mt-1">{{ stat.label }}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="t in TESTIMONIALS" :key="t.name" class="rounded-xl p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div class="flex items-center gap-0.5 mb-4">
              <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5 text-amber-400" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3">
              <img :src="t.avatar" :alt="t.name" class="w-10 h-10 rounded-full" />
              <div>
                <p class="text-sm font-semibold text-zinc-900 dark:text-white">{{ t.name }}</p>
                <p class="text-xs text-zinc-500">{{ t.role }} at {{ t.company }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Section 6 — Pricing ─── -->
    <section id="pricing" class="py-20 lg:py-32 border-t border-zinc-100 dark:border-zinc-900">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">Simple pricing. No surprises.</h2>
          <p class="mt-3 text-zinc-500 dark:text-zinc-400">Free to start. Scale when you're ready.</p>

          <!-- Toggle -->
          <div class="flex items-center justify-center gap-3 mt-8">
            <span :class="cn('text-sm font-medium', !isAnnual ? 'text-zinc-950 dark:text-white' : 'text-zinc-400')">Monthly</span>
            <button
              :class="cn('relative w-12 h-6 rounded-full transition-colors duration-200', isAnnual ? 'bg-slate-700 dark:bg-slate-300' : 'bg-zinc-300 dark:bg-zinc-700')"
              @click="isAnnual = !isAnnual"
            >
              <div :class="cn('absolute top-0.5 w-5 h-5 rounded-full bg-white dark:bg-zinc-950 transition-transform duration-200 shadow-sm', isAnnual ? 'translate-x-6' : 'translate-x-0.5')" />
            </button>
            <span :class="cn('text-sm font-medium', isAnnual ? 'text-zinc-950 dark:text-white' : 'text-zinc-400')">
              Annual
              <span class="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">Save 2 months</span>
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div
            v-for="plan in PRICING_PLANS"
            :key="plan.name"
            :class="cn(
              'relative rounded-xl p-6 transition-all duration-300',
              plan.highlighted
                ? 'bg-slate-700 dark:bg-slate-300 text-white dark:text-zinc-950 border-2 border-slate-600 dark:border-slate-400 shadow-xl shadow-slate-700/25 dark:shadow-slate-300/25 scale-[1.02]'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800',
            )"
          >
            <span v-if="plan.badge" class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-black">{{ plan.badge }}</span>
            <h3 :class="cn('text-xl font-bold mb-1', plan.highlighted ? 'text-white dark:text-zinc-950' : 'text-zinc-950 dark:text-white')">{{ plan.name }}</h3>
            <p :class="cn('text-sm mb-4', plan.highlighted ? 'text-white/70 dark:text-zinc-950/70' : 'text-zinc-500')">{{ plan.description }}</p>
            <div class="mb-6">
              <span :class="cn('text-4xl font-extrabold font-mono tabular-nums', plan.highlighted ? 'text-white dark:text-zinc-950' : 'text-zinc-950 dark:text-white')">${{ getPlanPrice(plan) }}</span>
              <span v-if="getPlanPrice(plan) > 0" :class="cn('text-sm ml-1', plan.highlighted ? 'text-white/60 dark:text-zinc-950/60' : 'text-zinc-500')">/editor/mo</span>
            </div>
            <ul class="space-y-2 mb-6">
              <li v-for="f in plan.features" :key="f" class="flex items-start gap-2 text-sm">
                <svg :class="cn('w-4 h-4 mt-0.5 flex-shrink-0', plan.highlighted ? 'text-amber-300 dark:text-amber-600' : 'text-emerald-500')" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span :class="plan.highlighted ? 'text-white/90 dark:text-zinc-950/90' : 'text-zinc-600 dark:text-zinc-400'">{{ f }}</span>
              </li>
            </ul>
            <button
              :class="cn(
                'w-full py-2.5 rounded-lg text-sm font-semibold transition-colors',
                plan.highlighted
                  ? 'bg-white text-slate-700 hover:bg-zinc-100 dark:bg-zinc-950 dark:text-slate-300 dark:hover:bg-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700',
              )"
            >
              {{ plan.cta }}
            </button>
            <p v-if="getPlanPrice(plan) > 0" :class="cn('text-center text-[10px] mt-2', plan.highlighted ? 'text-white/50 dark:text-zinc-950/50' : 'text-zinc-400 dark:text-zinc-600')">Viewer seats always free</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA Section ─── -->
    <section class="py-20 lg:py-32 bg-zinc-950 dark:bg-zinc-950">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <h2 class="text-3xl lg:text-5xl font-extrabold text-white tracking-tight" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">Ready to design differently?</h2>
        <p class="mt-4 text-lg text-zinc-400 max-w-xl mx-auto">Join 200,000+ designers and engineers already building with Canvas. Free forever for individual use.</p>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <a href="#" class="inline-flex items-center px-8 py-3.5 rounded-lg text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-100 transition-colors shadow-lg">
            Start designing free
            <svg class="ml-2 w-4 h-4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <a href="#" class="inline-flex items-center px-8 py-3.5 rounded-lg text-sm font-medium border border-zinc-700 text-zinc-300 hover:bg-zinc-900 transition-colors">Schedule a demo</a>
        </div>
        <p class="mt-6 text-xs text-zinc-600">No credit card required · Free tier available forever · SOC 2 compliant</p>
      </div>
    </section>

    <!-- ─── Footer ─── -->
    <footer class="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8">
          <div class="col-span-2 sm:col-span-4 lg:col-span-1">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-slate-700 dark:text-slate-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
              <span class="text-sm font-bold text-zinc-950 dark:text-white" style="font-family: 'Inter', 'Geist', system-ui, sans-serif">Canvas</span>
            </div>
            <p class="text-xs text-zinc-500 leading-relaxed mb-4">The collaborative design tool for modern product teams.</p>
            <div class="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit">
              <svg class="w-3 h-3 text-amber-400" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <span class="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">8.2k</span>
              <span class="text-[10px] text-zinc-400">on GitHub</span>
            </div>
          </div>
          <div v-for="group in FOOTER_GROUPS" :key="group.title">
            <h4 class="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600 mb-3">{{ group.title }}</h4>
            <ul class="space-y-2">
              <li v-for="link in group.links" :key="link">
                <a href="#" class="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-zinc-400">© {{ currentYear }} Canvas Design, Inc. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <a href="#" class="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" class="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors">Terms</a>
            <a href="#" class="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors">Security</a>
            <a href="#" class="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.canvas-grid-scroll {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
  animation: canvasScrollVue 60s linear infinite;
}

@keyframes canvasScrollVue {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-24px, -24px); }
}

.cursor-float-anim {
  animation: cursorFloatVue 8s ease-in-out infinite;
}

@keyframes cursorFloatVue {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(30px, -20px); }
  50% { transform: translate(-15px, 25px); }
  75% { transform: translate(20px, 10px); }
}
</style>
