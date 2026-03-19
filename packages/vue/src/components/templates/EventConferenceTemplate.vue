<script setup lang="ts">
/**
 * EventConferenceTemplate — Tech Conference & Event Platform (Summit).
 *
 * Palette: Slate + Amber. Mode: Light primary, dark dramatic for schedule/stats.
 *
 * Sections:
 *   Countdown Banner → Nav → Hero (dark/light split) → Speakers → Stats →
 *   Schedule (dark, multi-track) → Workshops → Venue (floor plan SVG) →
 *   Tickets (3-tier) → Sponsors (tiered) → Footer
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface Speaker {
  name: string;
  role: string;
  company: string;
  talk: string;
  keynote: boolean;
  avatar: string;
}

interface Session {
  time: string;
  title: string;
  speaker: string;
  stage: string;
  duration: string;
  avatar: string;
}

interface Workshop {
  title: string;
  facilitator: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  seatsRemaining: number;
  totalSeats: number;
}

interface Ticket {
  name: string;
  price: number;
  features: string[];
  badge?: string;
  urgent?: boolean;
}

interface Sponsor {
  name: string;
  tier: 'platinum' | 'gold' | 'silver';
}

interface FooterGroup {
  title: string;
  links: { label: string; href: string }[];
}

interface Props {
  class?: string;
}

const props = defineProps<Props>();

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const SPEAKERS: Speaker[] = [
  { name: 'Elena Rodriguez', role: 'VP of Product', company: 'Figma', talk: 'Designing at the speed of thought', keynote: true, avatar: 'https://placehold.co/200x200/18181b/fafafa?text=ER' },
  { name: 'James Chen', role: 'CTO', company: 'Vercel', talk: 'The future of frontend infrastructure', keynote: true, avatar: 'https://placehold.co/200x200/18181b/fafafa?text=JC' },
  { name: 'Ava Patel', role: 'Director of Engineering', company: 'Stripe', talk: 'Building reliable payment systems at scale', keynote: false, avatar: 'https://placehold.co/200x200/18181b/fafafa?text=AP' },
  { name: 'Marcus Kim', role: 'Head of Design', company: 'Linear', talk: 'Opinionated design systems that ship faster', keynote: false, avatar: 'https://placehold.co/200x200/18181b/fafafa?text=MK' },
  { name: 'Sophie Laurent', role: 'CPO', company: 'Notion', talk: 'From tool to platform: product evolution', keynote: false, avatar: 'https://placehold.co/200x200/18181b/fafafa?text=SL' },
  { name: 'David Okafor', role: 'Staff Engineer', company: 'GitHub', talk: 'Developer experience as a competitive moat', keynote: false, avatar: 'https://placehold.co/200x200/18181b/fafafa?text=DO' },
];

const DAY1_SESSIONS: Session[] = [
  { time: '09:00', title: 'Designing at the speed of thought', speaker: 'Elena Rodriguez', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=ER' },
  { time: '09:00', title: 'CSS architecture for scale', speaker: 'Mark Evans', stage: 'DESIGN', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=ME' },
  { time: '10:00', title: 'The future of frontend infrastructure', speaker: 'James Chen', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=JC' },
  { time: '10:00', title: 'Building reliable payment systems', speaker: 'Ava Patel', stage: 'ENGINEERING', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=AP' },
  { time: '10:00', title: 'Product metrics that matter', speaker: 'Lisa Wang', stage: 'PRODUCT', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=LW' },
  { time: '11:00', title: 'Opinionated design systems', speaker: 'Marcus Kim', stage: 'DESIGN', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=MK' },
  { time: '11:00', title: 'From tool to platform', speaker: 'Sophie Laurent', stage: 'PRODUCT', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=SL' },
  { time: '14:00', title: 'Developer experience as a competitive moat', speaker: 'David Okafor', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=DO' },
  { time: '14:00', title: 'Scaling teams without losing culture', speaker: 'Nina Brooks', stage: 'PRODUCT', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=NB' },
  { time: '15:00', title: 'Zero-downtime deployments at any scale', speaker: 'Tom Harris', stage: 'ENGINEERING', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=TH' },
];

const DAY2_SESSIONS: Session[] = [
  { time: '09:00', title: 'The next decade of design tools', speaker: 'Elena Rodriguez', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=ER' },
  { time: '09:00', title: 'Accessibility as a first-class feature', speaker: 'Kim Delgado', stage: 'DESIGN', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=KD' },
  { time: '10:00', title: 'AI-assisted product development', speaker: 'James Chen', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=JC' },
  { time: '10:00', title: 'Component architecture patterns', speaker: 'Sarah Lee', stage: 'ENGINEERING', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=SL' },
  { time: '11:00', title: 'Measuring design impact', speaker: 'Marcus Kim', stage: 'DESIGN', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=MK' },
  { time: '11:00', title: 'Growth without growth hacking', speaker: 'Sophie Laurent', stage: 'PRODUCT', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=SL' },
  { time: '14:00', title: 'Closing keynote: What we build next', speaker: 'David Okafor', stage: 'MAIN STAGE', duration: '60m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=DO' },
];

const WORKSHOPS: Workshop[] = [
  { title: 'Design System Architecture', facilitator: 'Marcus Kim', duration: '3 hours', level: 'Intermediate', seatsRemaining: 12, totalSeats: 30 },
  { title: 'Building with AI APIs', facilitator: 'James Chen', duration: '2 hours', level: 'Advanced', seatsRemaining: 3, totalSeats: 30 },
  { title: 'Product Strategy Frameworks', facilitator: 'Sophie Laurent', duration: '2 hours', level: 'Beginner', seatsRemaining: 18, totalSeats: 30 },
  { title: 'Performance Engineering', facilitator: 'Tom Harris', duration: '3 hours', level: 'Advanced', seatsRemaining: 8, totalSeats: 30 },
  { title: 'Figma to Code Pipeline', facilitator: 'Elena Rodriguez', duration: '2 hours', level: 'Intermediate', seatsRemaining: 2, totalSeats: 30 },
  { title: 'Growth Metrics Workshop', facilitator: 'Lisa Wang', duration: '2 hours', level: 'Beginner', seatsRemaining: 22, totalSeats: 30 },
];

const TICKETS: Ticket[] = [
  {
    name: 'Early Bird', price: 849, badge: 'Save $200', urgent: true,
    features: ['Full 2-day conference access', 'All 4 stages', 'Networking events', 'Lunch & refreshments', 'Conference swag bag', 'Session recordings (30-day access)'],
  },
  {
    name: 'General', price: 1199,
    features: ['Full 2-day conference access', 'All 4 stages', 'Networking events', 'Lunch & refreshments', 'Conference swag bag', 'Session recordings (90-day access)', 'Workshop priority registration'],
  },
  {
    name: 'VIP', price: 2499, badge: 'All-inclusive',
    features: ['Full 2-day conference access', 'All 4 stages + VIP lounge', 'Speaker dinner invitation', 'Priority front-row seating', 'Premium catering & bar', 'Lifetime session recordings', 'Workshop access (2 included)', '1-on-1 speaker meet & greet'],
  },
];

const SPONSORS: Sponsor[] = [
  { name: 'Vercel', tier: 'platinum' }, { name: 'Figma', tier: 'platinum' },
  { name: 'Stripe', tier: 'gold' }, { name: 'Linear', tier: 'gold' }, { name: 'Notion', tier: 'gold' }, { name: 'GitHub', tier: 'gold' },
  { name: 'Supabase', tier: 'silver' }, { name: 'Prisma', tier: 'silver' }, { name: 'Tailwind', tier: 'silver' },
  { name: 'Planetscale', tier: 'silver' }, { name: 'Railway', tier: 'silver' }, { name: 'Resend', tier: 'silver' },
];

const COMPANIES = ['Google', 'Figma', 'Vercel', 'Stripe', 'Linear', 'Notion', 'Shopify', 'GitHub'];

const VENUE_AMENITIES = [
  { label: '4 stages' }, { label: 'High-speed Wi-Fi' },
  { label: 'Full catering' }, { label: 'Hotel blocks' },
];

const FOOTER_GROUPS: FooterGroup[] = [
  { title: 'Conference', links: [{ label: 'Speakers', href: '#speakers' }, { label: 'Schedule', href: '#schedule' }, { label: 'Workshops', href: '#workshops' }, { label: 'Venue', href: '#venue' }] },
  { title: 'Attend', links: [{ label: 'Tickets', href: '#tickets' }, { label: 'Travel & Hotels', href: '#' }, { label: 'Scholarships', href: '#' }, { label: 'Group Discounts', href: '#' }] },
  { title: 'About', links: [{ label: 'Code of Conduct', href: '#' }, { label: 'Accessibility', href: '#' }, { label: 'Become a Sponsor', href: '#sponsors' }, { label: 'Contact', href: '#' }] },
];

const STAGES = ['MAIN STAGE', 'PRODUCT', 'ENGINEERING', 'DESIGN'];

const STAGE_COLORS: Record<string, string> = {
  'MAIN STAGE': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'PRODUCT': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'ENGINEERING': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'DESIGN': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

const LEVEL_COLORS: Record<string, string> = {
  'Beginner': 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  'Intermediate': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Advanced': 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const FLOOR_PLAN_STAGES = [
  { name: 'MAIN STAGE', x: 40, y: 30, w: 150, h: 100 },
  { name: 'PRODUCT', x: 210, y: 30, w: 150, h: 100 },
  { name: 'ENGINEERING', x: 40, y: 160, w: 150, h: 100 },
  { name: 'DESIGN', x: 210, y: 160, w: 150, h: 100 },
];

/* ------------------------------------------------------------------ */
/*  Reactive State                                                      */
/* ------------------------------------------------------------------ */

// Countdown timer
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let countdownTimer: ReturnType<typeof setInterval> | null = null;

function updateCountdown() {
  const target = new Date('2026-03-14T09:00:00-08:00');
  const now = new Date();
  const diff = Math.max(target.getTime() - now.getTime(), 0);
  countdown.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

onMounted(() => {
  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
});
onUnmounted(() => { if (countdownTimer) clearInterval(countdownTimer); });

// Schedule
const activeDay = ref<1 | 2>(1);
const savedSessions = ref<Set<string>>(new Set());

const currentSessions = computed(() => activeDay.value === 1 ? DAY1_SESSIONS : DAY2_SESSIONS);
const uniqueTimes = computed(() => Array.from(new Set(currentSessions.value.map(s => s.time))));

function toggleSave(title: string) {
  const next = new Set(savedSessions.value);
  if (next.has(title)) next.delete(title);
  else next.add(title);
  savedSessions.value = next;
}

// Venue floor plan
const activeStage = ref<string | null>(null);

// Nav scroll state
const scrolled = ref(false);
function handleScroll() { scrolled.value = window.scrollY > 20; }
onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

// Ticket progress
const ticketsClaimed = 600;
const totalEarlyBird = 1000;
const ticketPct = (ticketsClaimed / totalEarlyBird) * 100;

// Sponsors computed
const platinumSponsors = computed(() => SPONSORS.filter(s => s.tier === 'platinum'));
const goldSponsors = computed(() => SPONSORS.filter(s => s.tier === 'gold'));
const silverSponsors = computed(() => SPONSORS.filter(s => s.tier === 'silver'));

// Session count per stage for floor plan tooltip
function stageSessionCount(stageName: string) {
  return DAY1_SESSIONS.filter(s => s.stage === stageName).length;
}

function pad(n: number) { return String(n).padStart(2, '0'); }
</script>

<template>
  <div :class="cn('min-h-screen bg-white dark:bg-zinc-950 antialiased', props.class)">

    <!-- ═══════════ Countdown Banner ═══════════ -->
    <div class="w-full bg-zinc-950 dark:bg-zinc-900 text-zinc-50 py-2.5 px-4">
      <div class="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p class="text-xs sm:text-sm font-medium tracking-wide">
          Summit 2026: March 14–15, San Francisco
        </p>
        <div class="flex items-center gap-1.5 font-mono text-xs sm:text-sm tabular-nums">
          <span class="text-amber-400 font-bold">{{ pad(countdown.days) }}</span>
          <span class="text-zinc-500">d</span>
          <span class="text-amber-400 font-bold">{{ pad(countdown.hours) }}</span>
          <span class="text-zinc-500">h</span>
          <span class="text-amber-400 font-bold">{{ pad(countdown.minutes) }}</span>
          <span class="text-zinc-500">m</span>
          <span class="text-amber-400 font-bold">{{ pad(countdown.seconds) }}</span>
          <span class="text-zinc-500">s</span>
        </div>
      </div>
    </div>

    <!-- ═══════════ Navbar ═══════════ -->
    <header
      :class="cn(
        'w-full z-50 sticky top-0 transition-all duration-300',
        scrolled
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-white/[0.06] shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      )"
    >
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6">
        <div class="flex items-baseline gap-1 shrink-0">
          <span class="text-xl font-black tracking-tight text-zinc-950 dark:text-white" style="font-family: 'Bebas Neue', Impact, 'Arial Narrow', sans-serif">SUMMIT</span>
          <span class="font-mono text-[10px] text-zinc-400">2026</span>
        </div>
        <nav class="hidden md:flex items-center gap-1">
          <a v-for="link in ['Speakers','Schedule','Workshops','Venue','Sponsors']" :key="link"
            :href="`#${link.toLowerCase()}`"
            class="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors duration-150"
          >
            {{ link }}
          </a>
        </nav>
        <div class="flex items-center gap-3 shrink-0">
          <a href="#" class="hidden sm:inline-flex text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
            Sign in
          </a>
          <a href="#tickets" class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200">
            Get tickets
          </a>
        </div>
      </div>
    </header>

    <!-- ═══════════ Hero ═══════════ -->
    <section class="relative overflow-hidden">
      <!-- Zone 1: Dark headline -->
      <div class="relative bg-zinc-950 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div class="absolute inset-0 pointer-events-none" aria-hidden="true"
          :style="{ backgroundImage: 'radial-gradient(circle, rgba(161,161,170,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }"></div>
        <div class="relative mx-auto max-w-7xl px-6 text-center">
          <p class="font-mono text-xs sm:text-sm text-amber-400 tracking-[0.2em] uppercase mb-6">
            March 14–15, 2026 · San Francisco, CA
          </p>
          <h1 class="text-[clamp(6rem,18vw,14rem)] font-black leading-[0.9] tracking-tighter text-white select-none"
            style="font-family: 'Bebas Neue', Impact, 'Arial Narrow', sans-serif">
            SUMMIT
          </h1>
          <p class="mt-2 text-sm sm:text-base text-zinc-400 tracking-[0.2em] uppercase">
            The conference for product builders
          </p>
          <div class="mt-10 flex flex-col items-center gap-4">
            <a href="#tickets" class="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-amber-500 text-white hover:bg-amber-600 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200 shadow-lg shadow-amber-500/20">
              Get early bird tickets — Save $200
            </a>
            <p class="font-mono text-xs text-zinc-500">
              $849 Early Bird · Only {{ totalEarlyBird - ticketsClaimed }} tickets left at this price
            </p>
          </div>
          <div class="mt-6 mx-auto max-w-xs">
            <div class="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div class="h-full rounded-full bg-amber-400 transition-all duration-700" :style="{ width: `${ticketPct}%` }"></div>
            </div>
            <p class="mt-2 font-mono text-[10px] text-zinc-600">
              {{ ticketsClaimed }}/{{ totalEarlyBird }} early bird tickets claimed
            </p>
          </div>
        </div>
      </div>
      <!-- Zone 2: Speaker logos -->
      <div class="bg-white dark:bg-zinc-900 py-8 lg:py-10 border-t border-zinc-100 dark:border-zinc-800">
        <div class="mx-auto max-w-7xl px-6">
          <p class="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-6">80+ speakers from:</p>
          <div class="flex items-center justify-center gap-8 lg:gap-12 flex-wrap opacity-60 dark:opacity-40">
            <span v-for="co in COMPANIES" :key="co" class="text-sm font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase select-none">
              {{ co }}
            </span>
          </div>
          <p class="text-center mt-5">
            <a href="#speakers" class="text-sm font-medium text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
              View all speakers →
            </a>
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════ Speakers ═══════════ -->
    <section id="speakers" class="py-20 lg:py-28 bg-white dark:bg-zinc-950">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
          This year's speakers.
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 mb-12 max-w-xl">
          80+ speakers across 4 stages. Here are a few of the headliners.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="speaker in SPEAKERS" :key="speaker.name"
            :class="cn(
              'group relative rounded-2xl border overflow-hidden transition-all duration-300',
              'border-zinc-200 dark:border-zinc-800',
              'hover:border-amber-400 dark:hover:border-amber-500',
              'bg-white dark:bg-zinc-900'
            )">
            <div class="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <img :src="speaker.avatar" :alt="speaker.name"
                class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
              <span v-if="speaker.keynote"
                class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white">
                Keynote
              </span>
            </div>
            <div class="p-5">
              <h3 class="text-base font-bold text-zinc-950 dark:text-zinc-50">{{ speaker.name }}</h3>
              <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{{ speaker.role }}, {{ speaker.company }}</p>
              <p class="text-sm text-zinc-600 dark:text-zinc-300 italic mt-2">"{{ speaker.talk }}"</p>
              <p class="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <a href="#schedule" class="text-xs font-medium text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 inline-flex items-center gap-1">
                  View session →
                </a>
              </p>
            </div>
          </div>
        </div>
        <p class="text-center mt-10">
          <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
            View all 80+ speakers →
          </a>
        </p>
      </div>
    </section>

    <!-- ═══════════ Stats ═══════════ -->
    <section class="py-16 lg:py-20 bg-zinc-950">
      <div class="mx-auto max-w-5xl px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          <div v-for="stat in [
            { value: '2,000+', label: 'Attendees' },
            { value: '80+', label: 'Speakers' },
            { value: '4', label: 'Stages' },
            { value: '2', label: 'Days' },
          ]" :key="stat.label" class="text-center">
            <p class="font-mono text-4xl lg:text-5xl font-bold text-amber-500 dark:text-amber-400 tabular-nums">{{ stat.value }}</p>
            <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ Schedule ═══════════ -->
    <section id="schedule" class="py-20 lg:py-28 bg-zinc-950">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-4xl lg:text-5xl font-black tracking-tight text-white mb-4"
          style="font-family: 'Bebas Neue', Impact, 'Arial Narrow', sans-serif">
          THE PROGRAMME
        </h2>
        <p class="text-zinc-400 mb-8 max-w-xl">Two days of talks, panels, and deep dives across 4 stages.</p>
        <!-- Day tabs -->
        <div class="flex gap-2 mb-10">
          <button v-for="day in [1, 2]" :key="day" @click="activeDay = day as 1 | 2"
            :class="cn(
              'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200',
              activeDay === day
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
            )">
            Day {{ day }} — March {{ day === 1 ? '14' : '15' }}
          </button>
        </div>
        <!-- Stage headers (desktop) -->
        <div class="hidden lg:grid lg:grid-cols-4 gap-3 mb-4">
          <div v-for="stage in STAGES" :key="stage"
            :class="cn('px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-center border', STAGE_COLORS[stage])">
            {{ stage }}
          </div>
        </div>
        <!-- Sessions grouped by time -->
        <div class="space-y-3">
          <div v-for="time in uniqueTimes" :key="time" class="flex flex-col lg:flex-row gap-3">
            <div class="lg:hidden font-mono text-xs text-amber-400 mb-1 mt-4">{{ time }}</div>
            <template v-for="stage in STAGES" :key="stage + time">
              <div v-if="currentSessions.find(s => s.time === time && s.stage === stage)"
                :class="cn(
                  'flex-1 rounded-xl p-4 border transition-all duration-200',
                  'bg-zinc-900 border-zinc-800 hover:border-zinc-700',
                  savedSessions.has(currentSessions.find(s => s.time === time && s.stage === stage)!.title)
                    ? 'ring-1 ring-amber-500/50' : ''
                )">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="font-mono text-xs text-amber-400 hidden lg:inline">{{ time }}</span>
                      <span :class="cn('lg:hidden inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border', STAGE_COLORS[stage])">
                        {{ stage }}
                      </span>
                      <span class="font-mono text-[10px] text-zinc-600">
                        {{ currentSessions.find(s => s.time === time && s.stage === stage)!.duration }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2 mb-1.5">
                      <img :src="currentSessions.find(s => s.time === time && s.stage === stage)!.avatar" alt="" class="w-6 h-6 rounded-full flex-shrink-0" />
                      <span class="text-xs text-zinc-400 truncate">
                        {{ currentSessions.find(s => s.time === time && s.stage === stage)!.speaker }}
                      </span>
                    </div>
                    <h4 class="text-sm font-semibold text-white leading-snug">
                      {{ currentSessions.find(s => s.time === time && s.stage === stage)!.title }}
                    </h4>
                  </div>
                  <button
                    @click="toggleSave(currentSessions.find(s => s.time === time && s.stage === stage)!.title)"
                    :class="cn(
                      'mt-1 p-1.5 rounded-lg transition-all duration-200 flex-shrink-0',
                      savedSessions.has(currentSessions.find(s => s.time === time && s.stage === stage)!.title)
                        ? 'text-amber-400 bg-amber-400/10'
                        : 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800'
                    )"
                    :title="savedSessions.has(currentSessions.find(s => s.time === time && s.stage === stage)!.title) ? 'Saved' : 'Save to schedule'"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" :fill="savedSessions.has(currentSessions.find(s => s.time === time && s.stage === stage)!.title) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                </div>
              </div>
              <div v-else class="hidden lg:block flex-1"></div>
            </template>
          </div>
        </div>
        <!-- Saved count -->
        <div v-if="savedSessions.size > 0" class="mt-8 text-center">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium border border-amber-500/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            {{ savedSessions.size }} session{{ savedSessions.size > 1 ? 's' : '' }} saved to your schedule
          </span>
        </div>
      </div>
    </section>

    <!-- ═══════════ Workshops ═══════════ -->
    <section id="workshops" class="py-20 lg:py-28 bg-zinc-50 dark:bg-zinc-900">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2">
          Hands-on workshops
        </h2>
        <p class="text-zinc-500 dark:text-zinc-400 text-sm mb-12">
          Limited to 30 per session · Deep-dive, practical, and expert-led.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="ws in WORKSHOPS" :key="ws.title"
            class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col">
            <div class="flex items-start justify-between gap-3 mb-4">
              <span :class="cn('inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider', LEVEL_COLORS[ws.level])">
                {{ ws.level }}
              </span>
              <div class="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span class="font-mono">{{ ws.duration }}</span>
              </div>
            </div>
            <h3 class="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-1.5">{{ ws.title }}</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-4">by {{ ws.facilitator }}</p>
            <div class="mt-auto flex items-center justify-between">
              <span :class="cn(
                'text-xs font-mono',
                ws.seatsRemaining < 5 ? 'text-red-500 dark:text-red-400 font-bold' : 'text-zinc-500 dark:text-zinc-400'
              )">
                {{ ws.seatsRemaining }}/{{ ws.totalSeats }} seats left
              </span>
              <button class="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ Venue ═══════════ -->
    <section id="venue" class="py-20 lg:py-28 bg-white dark:bg-zinc-950">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div class="lg:w-1/2">
            <p class="text-xs font-mono text-amber-500 dark:text-amber-400 tracking-wider uppercase mb-3">Venue</p>
            <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2">Moscone Center</h2>
            <p class="text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              San Francisco, CA
            </p>
            <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
              Two days of sessions across 4 purpose-built stages, with dedicated networking areas,
              a sponsor expo hall, and VIP lounges. The venue is located in the heart of SoMa,
              walking distance from transit and partner hotels.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="a in VENUE_AMENITIES" :key="a.label" class="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <span class="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 inline-flex">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                {{ a.label }}
              </div>
            </div>
          </div>
          <div class="lg:w-1/2">
            <div class="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Floor Plan</p>
              <svg viewBox="0 0 400 300" class="w-full h-auto">
                <rect x="0" y="0" width="400" height="300" rx="12" class="fill-zinc-100 dark:fill-zinc-800" />
                <g v-for="st in FLOOR_PLAN_STAGES" :key="st.name" class="cursor-pointer"
                  @mouseenter="activeStage = st.name" @mouseleave="activeStage = null">
                  <rect :x="st.x" :y="st.y" :width="st.w" :height="st.h" rx="8"
                    :fill="activeStage === st.name ? 'rgba(245,158,11,0.15)' : ''"
                    :stroke="activeStage === st.name ? 'rgba(245,158,11,0.6)' : ''"
                    :stroke-width="activeStage === st.name ? 2 : 1"
                    :class="cn('transition-all duration-200', activeStage !== st.name ? 'fill-zinc-200 dark:fill-zinc-700 stroke-zinc-300 dark:stroke-zinc-600' : '')" />
                  <text :x="st.x + st.w / 2" :y="st.y + st.h / 2" text-anchor="middle" dominant-baseline="middle"
                    :class="cn('text-[10px] font-bold uppercase tracking-wider pointer-events-none', activeStage === st.name ? 'fill-amber-500 dark:fill-amber-400' : 'fill-zinc-500 dark:fill-zinc-400')">
                    {{ st.name }}
                  </text>
                  <text v-if="activeStage === st.name" :x="st.x + st.w / 2" :y="st.y + st.h / 2 + 16"
                    text-anchor="middle" dominant-baseline="middle"
                    class="text-[9px] fill-amber-400/70 dark:fill-amber-300/70 pointer-events-none">
                    {{ stageSessionCount(st.name) }}+ sessions
                  </text>
                </g>
                <text x="200" y="147" text-anchor="middle" class="text-[8px] fill-zinc-400 dark:fill-zinc-500 uppercase tracking-widest">
                  Networking Hall
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════ Tickets ═══════════ -->
    <section id="tickets" class="py-20 lg:py-28 bg-zinc-50 dark:bg-zinc-900">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">Get your ticket</h2>
          <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Two days of sessions, workshops, networking, and inspiration. Choose the experience that works for you.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <div v-for="(ticket, idx) in TICKETS" :key="ticket.name"
            :class="cn(
              'relative rounded-2xl border p-6 lg:p-8 flex flex-col',
              idx === 2
                ? 'border-amber-400 dark:border-amber-500 bg-white dark:bg-zinc-950 ring-1 ring-amber-400/30 dark:ring-amber-500/30'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950'
            )">
            <span v-if="ticket.badge" :class="cn(
              'absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
              idx === 2 ? 'bg-amber-500 text-white' : 'bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950'
            )">
              {{ ticket.badge }}
            </span>
            <h3 class="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-1">{{ ticket.name }}</h3>
            <div class="flex items-baseline gap-1 mb-6">
              <span class="font-mono text-4xl font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">${{ ticket.price.toLocaleString() }}</span>
              <span class="text-sm text-zinc-500 dark:text-zinc-400">/ticket</span>
            </div>
            <div v-if="ticket.urgent" class="mb-5">
              <div class="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div class="h-full rounded-full bg-amber-400 w-3/5 animate-pulse"></div>
              </div>
              <p class="mt-1.5 text-[10px] font-mono text-amber-500 dark:text-amber-400">400 tickets remaining at this price</p>
            </div>
            <ul class="space-y-3 mb-8 flex-1">
              <li v-for="f in ticket.features" :key="f" class="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                <span class="mt-0.5 text-amber-500 dark:text-amber-400 flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                {{ f }}
              </li>
            </ul>
            <a href="#" :class="cn(
              'inline-flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.97]',
              idx === 2
                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200'
            )">
              Get {{ ticket.name }} ticket
            </a>
          </div>
        </div>
        <div class="mt-10 text-center">
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            <span class="font-semibold text-zinc-700 dark:text-zinc-300">Bring your team</span> — 20% off groups of 5+.
            <a href="#" class="text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 font-medium ml-1">
              Contact for group pricing →
            </a>
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════ Sponsors ═══════════ -->
    <section id="sponsors" class="py-20 lg:py-28 bg-white dark:bg-zinc-950">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2 text-center">Our sponsors</h2>
        <p class="text-zinc-500 dark:text-zinc-400 text-center mb-14">Summit is made possible by these incredible partners.</p>
        <!-- Platinum -->
        <div class="mb-10">
          <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-5 text-center">Platinum</p>
          <div class="flex items-center justify-center flex-wrap gap-6 lg:gap-10">
            <span v-for="s in platinumSponsors" :key="s.name" class="text-2xl lg:text-3xl font-bold tracking-wide uppercase select-none text-zinc-300 dark:text-zinc-600">{{ s.name }}</span>
          </div>
        </div>
        <!-- Gold -->
        <div class="mb-10">
          <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-5 text-center">Gold</p>
          <div class="flex items-center justify-center flex-wrap gap-6 lg:gap-10">
            <span v-for="s in goldSponsors" :key="s.name" class="text-lg lg:text-xl font-bold tracking-wide uppercase select-none text-zinc-400 dark:text-zinc-600">{{ s.name }}</span>
          </div>
        </div>
        <!-- Silver -->
        <div class="mb-10">
          <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-5 text-center">Silver</p>
          <div class="flex items-center justify-center flex-wrap gap-6 lg:gap-10">
            <span v-for="s in silverSponsors" :key="s.name" class="text-sm font-bold tracking-wide uppercase select-none text-zinc-400 dark:text-zinc-600">{{ s.name }}</span>
          </div>
        </div>
        <p class="text-center mt-10">
          <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
            Become a sponsor →
          </a>
        </p>
      </div>
    </section>

    <!-- ═══════════ Footer ═══════════ -->
    <footer class="bg-zinc-950 border-t border-zinc-800 py-16 lg:py-20">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div class="col-span-2 md:col-span-1">
            <span class="text-2xl font-black text-white tracking-tight" style="font-family: 'Bebas Neue', Impact, 'Arial Narrow', sans-serif">SUMMIT</span>
            <span class="ml-1 font-mono text-xs text-zinc-500">2026</span>
            <p class="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">The conference for product builders. March 14–15, San Francisco.</p>
            <div class="flex items-center gap-3 mt-4">
              <a href="#" class="text-zinc-500 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              <a href="#" class="text-zinc-500 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>
          <div v-for="group in FOOTER_GROUPS" :key="group.title">
            <h4 class="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">{{ group.title }}</h4>
            <ul class="space-y-2.5">
              <li v-for="link in group.links" :key="link.label">
                <a :href="link.href" class="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-zinc-600">© {{ new Date().getFullYear() }} Summit Conference. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <a href="#" class="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Schedule PDF
            </a>
            <a href="#" class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Code of Conduct</a>
            <a href="#" class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Accessibility</a>
            <a href="#" class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Privacy</a>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-center gap-4">
          <a v-for="year in ['Summit 2025', 'Summit 2024', 'Summit 2023']" :key="year" href="#"
            class="text-[10px] font-mono text-zinc-600 hover:text-zinc-400 uppercase tracking-wider transition-colors">
            {{ year }}
          </a>
        </div>
      </div>
    </footer>

  </div>
</template>
