<script setup lang="ts">
/**
 * FitnessAppTemplate — Fitness & Sports Performance App template (Apex).
 *
 * Palette: Crimson (Red) #dc2626 + Iron (Zinc).
 * Mode: Dark-performance primary with light mode support.
 *
 * Sections:
 *   Nav → Hero (athlete status + action shot) → Training Dashboard →
 *   Performance Metrics (6-panel bento) → AI Coaching → Device Integrations →
 *   Athlete Stories → Pricing → Footer
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface WorkoutType {
  name: string;
  color: string;
  duration: string;
  intensity: string;
  day: string;
}

interface Metric {
  title: string;
  value: string;
  unit: string;
  trend: string;
  data: number[];
  color: string;
}

interface Integration {
  name: string;
  connections: string;
}

interface Testimonial {
  name: string;
  sport: string;
  avatar: string;
  quote: string;
  pr: string;
  prLabel: string;
  improvement: string;
}

interface Props {
  class?: string;
}

const props = defineProps<Props>();

/* ------------------------------------------------------------------ */
/*  Reactive State                                                      */
/* ------------------------------------------------------------------ */

const billingAnnual = ref(true);
const mobileMenuOpen = ref(false);
const heroHRV = ref(67);

// Simulate live HRV flicker
let hrvInterval: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  hrvInterval = setInterval(() => {
    heroHRV.value = 67 + Math.floor(Math.random() * 3) - 1;
  }, 2000);
});
onUnmounted(() => {
  if (hrvInterval) clearInterval(hrvInterval);
});

// AI Chat typewriter
const chatRef = ref<HTMLDivElement | null>(null);
const aiResponse = "Based on your recent training data, your aerobic base is strong but your lactate threshold pace needs work. I've added 2 threshold sessions per week for the next 4 weeks. Here's your updated plan:";
const visibleChars = ref(0);
const chatStarted = ref(false);
let chatInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  if (!chatRef.value) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !chatStarted.value) {
        chatStarted.value = true;
        chatInterval = setInterval(() => {
          if (visibleChars.value >= aiResponse.length) {
            if (chatInterval) clearInterval(chatInterval);
            return;
          }
          visibleChars.value++;
        }, 25);
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(chatRef.value);
  onUnmounted(() => {
    observer.disconnect();
    if (chatInterval) clearInterval(chatInterval);
  });
});

const displayedAiText = computed(() => aiResponse.substring(0, visibleChars.value));
const showPlanCards = computed(() => visibleChars.value >= aiResponse.length);

/* ------------------------------------------------------------------ */
/*  SVG chart helpers                                                   */
/* ------------------------------------------------------------------ */

function buildPoints(data: number[], width: number, height: number): string {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(' ');
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const WORKOUT_TYPES: WorkoutType[] = [
  { name: 'Easy Run', color: '#3b82f6', duration: '45 min', intensity: 'Zone 2', day: 'Mon' },
  { name: 'Strength', color: '#dc2626', duration: '60 min', intensity: 'Zone 3-4', day: 'Tue' },
  { name: 'Tempo Run', color: '#f59e0b', duration: '50 min', intensity: 'Zone 3', day: 'Wed' },
  { name: 'Rest', color: '#4a4a4a', duration: '—', intensity: 'Recovery', day: 'Thu' },
  { name: 'Intervals', color: '#dc2626', duration: '55 min', intensity: 'Zone 4-5', day: 'Fri' },
  { name: 'Easy Run', color: '#3b82f6', duration: '40 min', intensity: 'Zone 2', day: 'Sat' },
  { name: 'Long Run', color: '#10b981', duration: '90 min', intensity: 'Zone 2-3', day: 'Sun' },
];

const METRICS: Metric[] = [
  { title: 'VO₂ Max', value: '52.4', unit: 'ml/kg/min', trend: '+2.1', data: [42, 43, 44, 44.5, 46, 47, 48, 49, 50, 51, 51.5, 52.4], color: '#10b981' },
  { title: 'Resting HR', value: '52', unit: 'bpm', trend: '-4', data: [58, 57, 56, 55, 56, 55, 54, 53, 53, 52, 52, 52], color: '#dc2626' },
  { title: 'HRV', value: '67', unit: 'ms', trend: '+8', data: [48, 50, 52, 54, 55, 58, 60, 62, 63, 64, 66, 67], color: '#3b82f6' },
  { title: 'Training Load', value: '847', unit: 'TSS/wk', trend: '+12%', data: [620, 650, 700, 730, 760, 780, 790, 800, 810, 820, 835, 847], color: '#f59e0b' },
  { title: 'Sleep Score', value: '89', unit: '/100', trend: '+5', data: [72, 75, 78, 80, 82, 84, 85, 86, 87, 88, 88, 89], color: '#8b5cf6' },
  { title: 'Power Output', value: '285', unit: 'watts FTP', trend: '+15', data: [240, 245, 250, 255, 260, 265, 270, 273, 277, 280, 283, 285], color: '#ec4899' },
];

const INTEGRATIONS: Integration[] = [
  { name: 'Garmin', connections: '280K+' },
  { name: 'Wahoo', connections: '120K+' },
  { name: 'Apple Watch', connections: '340K+' },
  { name: 'WHOOP', connections: '95K+' },
  { name: 'Oura', connections: '88K+' },
  { name: 'Strava', connections: '390K+' },
  { name: 'Zwift', connections: '75K+' },
  { name: 'Polar', connections: '60K+' },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Jake Thornton', sport: 'Marathon Runner',
    avatar: 'https://placehold.co/64x64/181818/dc2626?text=JT',
    quote: "Dropped my marathon time by 18 minutes in 6 months. Apex's AI coach identified that I was overtraining on tempo runs and undertraining my aerobic base. The data-driven adjustment changed everything.",
    pr: '2:47:12', prLabel: 'Marathon PR', improvement: '18 min improvement',
  },
  {
    name: 'Maria Santos', sport: 'Triathlete',
    avatar: 'https://placehold.co/64x64/181818/dc2626?text=MS',
    quote: "My VO₂ Max went from 44 to 52 in 8 months. The recovery monitoring prevented me from burning out during Ironman training. I finished my first 70.3 feeling strong, not destroyed.",
    pr: '4:52:30', prLabel: '70.3 Finish', improvement: '+8 VO₂ Max points',
  },
  {
    name: 'Ryan Chen', sport: 'Cyclist',
    avatar: 'https://placehold.co/64x64/181818/dc2626?text=RC',
    quote: "My FTP jumped 40 watts in 4 months. The power curve analysis showed I was ignoring sweet spot training entirely. Apex rebuilt my plan around it and the gains were immediate.",
    pr: '310W', prLabel: 'FTP Record', improvement: '+40W in 4 months',
  },
];

const PRICING_FREE = [
  'Basic workout tracking',
  'Weekly training summary',
  '3 standard training plans',
  'Community forums',
  'Strava sync',
];

const PRICING_ATHLETE = [
  'Everything in Free',
  'AI-powered training plans',
  'Advanced performance analytics',
  'HRV & recovery monitoring',
  'Sleep quality tracking',
  'Unlimited device syncs',
  'Race-day pacing strategy',
  'Monthly progress reports',
];

const PRICING_ELITE = [
  'Everything in Athlete',
  '1:1 certified coach access',
  'Custom periodization',
  'Nutrition planning',
  'Race strategy sessions',
  'Priority support',
  'Video form analysis',
  'Unlimited plan revisions',
];

const FOOTER_LINKS = [
  { title: 'Training', links: ['Plans', 'Workouts', 'Coaching', 'Race Calendar'] },
  { title: 'Analytics', links: ['Performance', 'Recovery', 'Sleep', 'Trends'] },
  { title: 'Community', links: ['Forums', 'Challenges', 'Leaderboards', 'Athletes'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
];

const AI_PLAN_CARDS = ['Tempo run — 6mi', 'Threshold intervals', 'Long run — 16mi', 'Recovery — 4mi'];
const NAV_LINKS = ['Training', 'Analytics', 'Recovery', 'Community', 'Coaches'];
const AI_FEATURES = [
  'Adapts to your daily readiness score',
  'Race-specific periodization',
  'Overtraining prevention alerts',
  'Data-backed recovery recommendations',
];

const athletePriceMonthly = '14.99';
const athletePriceAnnual = '10.49';
const elitePriceMonthly = '29.99';
const elitePriceAnnual = '20.99';

const currentYear = new Date().getFullYear();
</script>

<template>
  <div
    :class="cn(
      'min-h-screen antialiased font-sans',
      'bg-[#080808] text-[#f5f5f5]',
      'dark:bg-[#080808] dark:text-[#f5f5f5]',
      props.class
    )"
  >
    <!-- ── Navbar ── -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-xl border-b border-white/5">
      <div class="mx-auto max-w-7xl flex items-center justify-between h-16 px-6">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <span class="text-[#dc2626] font-bold text-lg select-none">/</span>
          <span class="font-black text-lg tracking-[0.1em] uppercase select-none">APEX</span>
        </div>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="link in NAV_LINKS"
            :key="link"
            :href="`#${link.toLowerCase()}`"
            class="px-3 py-1.5 text-sm text-[#888888] hover:text-[#f5f5f5] transition-colors duration-150"
          >
            {{ link }}
          </a>
        </div>

        <!-- Desktop actions -->
        <div class="hidden md:flex items-center gap-3">
          <a href="#" class="text-sm text-[#888888] hover:text-[#f5f5f5] transition-colors duration-150">Log in</a>
          <a href="#pricing" class="inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors duration-200">
            Start free trial
          </a>
        </div>

        <!-- Mobile menu button -->
        <button
          class="md:hidden text-[#888888] hover:text-[#f5f5f5] transition-colors"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <template v-if="mobileMenuOpen">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </template>
            <template v-else>
              <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
            </template>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-white/5 bg-[#080808] px-6 py-6 space-y-4">
        <a
          v-for="link in NAV_LINKS"
          :key="link"
          :href="`#${link.toLowerCase()}`"
          class="block text-base text-[#f5f5f5] py-2"
          @click="mobileMenuOpen = false"
        >
          {{ link }}
        </a>
        <hr class="border-white/10" />
        <a href="#" class="block text-base text-[#888888] py-2">Log in</a>
        <a href="#pricing" class="block text-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#dc2626] text-white">
          Start free trial
        </a>
      </div>
    </nav>

    <!-- ── Hero ── -->
    <section class="relative min-h-screen flex items-center overflow-hidden pt-16">
      <!-- Right side athlete image -->
      <div class="absolute right-0 top-0 bottom-0 w-[60%] hidden lg:block">
        <div class="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent z-10" />
        <div
          class="absolute inset-0 bg-cover bg-center"
          style="background-image: url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=900&fit=crop')"
        />
      </div>

      <div class="relative z-20 mx-auto max-w-7xl px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <!-- Athlete status -->
          <div class="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#111111] border border-[#242424]">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
            </span>
            <span class="text-[10px] uppercase tracking-[0.15em] text-[#888888] font-mono">Athlete Status: Training Peak</span>
          </div>

          <!-- Live metrics -->
          <div class="flex items-center gap-6">
            <div class="text-center">
              <span class="text-xs text-[#888888] font-mono uppercase tracking-wider">HRV</span>
              <p class="text-xl font-mono font-bold text-[#f5f5f5] tabular-nums">{{ heroHRV }}</p>
            </div>
            <div class="w-px h-8 bg-[#242424]" />
            <div class="text-center">
              <span class="text-xs text-[#888888] font-mono uppercase tracking-wider">Recovery</span>
              <p class="text-xl font-mono font-bold text-[#10b981] tabular-nums">89%</p>
            </div>
            <div class="w-px h-8 bg-[#242424]" />
            <div class="text-center">
              <span class="text-xs text-[#888888] font-mono uppercase tracking-wider">Readiness</span>
              <p class="text-xl font-mono font-bold text-[#10b981] tabular-nums">HIGH</p>
            </div>
          </div>

          <!-- Headline -->
          <h1 class="text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
            TRAIN<br />
            <span class="text-[#dc2626]">SMARTER.</span><br />
            PERFORM<br />
            <span class="text-[#dc2626]">BETTER.</span>
          </h1>

          <!-- Sub -->
          <p class="text-lg text-[#888888] max-w-md leading-relaxed">
            Apex delivers elite-level programming, real-time analytics, and AI-powered recovery guidance — so you can train harder and stay healthier.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap items-center gap-4">
            <a href="#pricing" class="inline-flex items-center px-8 py-4 rounded-lg text-base font-bold bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors duration-200">
              Start your free 14-day trial
            </a>
            <a href="#dashboard" class="inline-flex items-center gap-2 px-6 py-4 rounded-lg text-base font-medium border border-[#242424] text-[#f5f5f5] hover:border-[#888888] transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              See the app
            </a>
          </div>

          <!-- Social proof -->
          <p class="text-sm text-[#4a4a4a]">
            Used by <span class="text-[#888888]">400,000+</span> serious athletes · Avg <span class="text-[#dc2626]">12%</span> performance improvement in 8 weeks
          </p>
        </div>
      </div>
    </section>

    <!-- ── Section 1: Training Dashboard ── -->
    <section id="dashboard" class="py-24 bg-[#111111]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <span class="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Your Weekly Plan</span>
          <h2 class="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">TRAINING DASHBOARD</h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          <div
            v-for="(workout, i) in WORKOUT_TYPES"
            :key="workout.day"
            :class="cn(
              'group rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02]',
              i === 4
                ? 'bg-[#dc2626]/10 border-[#dc2626]/30 ring-1 ring-[#dc2626]/20'
                : 'bg-[#181818] border-[#242424] hover:border-[#888888]/30'
            )"
          >
            <span class="text-[10px] uppercase tracking-wider text-[#4a4a4a] font-mono">{{ workout.day }}</span>
            <p class="mt-2 text-sm font-semibold text-[#f5f5f5]">{{ workout.name }}</p>
            <p class="mt-1 text-xs font-mono text-[#888888]">{{ workout.duration }}</p>
            <div class="mt-2 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: workout.color }" />
              <span class="text-[10px] text-[#4a4a4a] font-mono">{{ workout.intensity }}</span>
            </div>
          </div>
        </div>

        <!-- AI insight -->
        <div class="flex items-start gap-4 p-4 rounded-xl bg-[#181818] border border-[#242424]">
          <div class="w-8 h-8 rounded-lg bg-[#dc2626]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
            </svg>
          </div>
          <div>
            <p class="text-xs uppercase tracking-wider text-[#dc2626] font-mono mb-1">AI Insight</p>
            <p class="text-sm text-[#888888]">
              Based on your HRV trend, consider an easy day tomorrow. Your training load has been elevated for 3 consecutive days. Recovery quality will determine Thursday's session intensity.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 2: Performance Metrics (Bento Grid) ── -->
    <section id="analytics" class="py-24 bg-[#080808]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <span class="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Performance Analytics</span>
          <h2 class="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">KNOW YOUR NUMBERS.</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="metric in METRICS"
            :key="metric.title"
            class="group rounded-2xl bg-[#111111] border border-[#242424] p-6 hover:border-[#dc2626]/30 transition-all duration-300"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <span class="text-xs text-[#4a4a4a] uppercase tracking-wider font-mono">{{ metric.title }}</span>
                <div class="flex items-baseline gap-2 mt-1">
                  <span class="text-3xl font-mono font-bold text-[#f5f5f5] tabular-nums">{{ metric.value }}</span>
                  <span class="text-xs text-[#4a4a4a] font-mono">{{ metric.unit }}</span>
                </div>
              </div>
              <span class="text-xs font-mono px-2 py-1 rounded-md text-[#10b981] bg-[#10b981]/10">{{ metric.trend }}</span>
            </div>
            <svg :viewBox="`0 0 200 60`" class="w-full h-12" fill="none" preserveAspectRatio="none">
              <polyline
                :points="buildPoints(metric.data, 200, 60)"
                :stroke="metric.color"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3: AI Coaching ── -->
    <section class="py-24 bg-[#111111]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">AI Coach</span>
            <h2 class="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">
              YOUR AI COACH<br />
              <span class="text-[#dc2626]">NEVER SLEEPS.</span>
            </h2>
            <p class="mt-6 text-lg text-[#888888] leading-relaxed max-w-md">
              Get personalized training adjustments based on your biometric data, performance history, and goals. Apex AI analyzes every session and adapts your plan in real-time.
            </p>
            <div class="mt-8 space-y-4">
              <div v-for="feature in AI_FEATURES" :key="feature" class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-[#dc2626]/10 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span class="text-sm text-[#888888]">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- AI Chat demo -->
          <div ref="chatRef" class="max-w-lg mx-auto space-y-4">
            <!-- Athlete message -->
            <div class="flex justify-end">
              <div class="bg-[#dc2626]/10 border border-[#dc2626]/20 rounded-2xl rounded-br-md px-4 py-3 max-w-[85%]">
                <p class="text-sm text-[#f5f5f5]">I have a marathon in 12 weeks and my long run pace feels slow.</p>
              </div>
            </div>
            <!-- AI response -->
            <div class="flex justify-start">
              <div class="bg-[#181818] border border-[#242424] rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%]">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-5 h-5 rounded-full bg-[#dc2626] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
                      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
                    </svg>
                  </div>
                  <span class="text-[10px] uppercase tracking-widest text-[#888888] font-mono">Apex AI</span>
                </div>
                <p class="text-sm text-[#f5f5f5]">
                  {{ displayedAiText }}<span v-if="visibleChars < aiResponse.length" class="animate-pulse">▊</span>
                </p>
                <div v-if="showPlanCards" class="mt-3 grid grid-cols-2 gap-2">
                  <div
                    v-for="workout in AI_PLAN_CARDS"
                    :key="workout"
                    class="px-3 py-2 rounded-lg bg-[#111111] border border-[#242424] text-xs text-[#888888] font-mono"
                  >
                    {{ workout }}
                  </div>
                </div>
              </div>
            </div>
            <p class="text-[10px] text-[#4a4a4a] text-center font-mono">Based on your last 47 runs · 12-week marathon plan</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 4: Device Integrations ── -->
    <section class="py-24 bg-[#080808]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <span class="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Ecosystem</span>
          <h2 class="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">SYNCS WITH EVERYTHING.</h2>
          <p class="mt-4 text-[#888888] max-w-md mx-auto">Connect your favorite devices and platforms. Apex works with the gear you already use.</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            v-for="device in INTEGRATIONS"
            :key="device.name"
            class="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#111111] border border-[#242424] hover:border-[#888888]/30 transition-all duration-300"
          >
            <div class="w-12 h-12 rounded-xl bg-[#181818] border border-[#242424] flex items-center justify-center group-hover:border-[#dc2626]/30 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#888888] group-hover:text-[#f5f5f5] transition-colors">
                <circle cx="12" cy="12" r="7" /><polyline points="12 9 12 12 13.5 13.5" />
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-[#f5f5f5]">{{ device.name }}</span>
            <span class="text-[10px] text-[#4a4a4a] font-mono uppercase tracking-wider">{{ device.connections }} synced</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 5: Athlete Stories ── -->
    <section class="py-24 bg-[#111111]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <span class="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Real Results</span>
          <h2 class="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">ATHLETE STORIES.</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="t in TESTIMONIALS"
            :key="t.name"
            class="rounded-2xl bg-[#181818] border border-[#242424] p-6 hover:border-[#dc2626]/20 transition-colors duration-300"
          >
            <!-- PR highlight -->
            <div class="mb-6 p-4 rounded-xl bg-[#111111] border border-[#242424] text-center">
              <span class="text-3xl font-mono font-black text-[#dc2626] tabular-nums">{{ t.pr }}</span>
              <p class="text-[10px] uppercase tracking-widest text-[#4a4a4a] font-mono mt-1">{{ t.prLabel }}</p>
              <p class="text-xs text-[#10b981] font-mono mt-1">{{ t.improvement }}</p>
            </div>
            <p class="text-sm text-[#888888] leading-relaxed mb-6">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3">
              <img :src="t.avatar" :alt="t.name" class="w-10 h-10 rounded-full" />
              <div>
                <p class="text-sm font-semibold text-[#f5f5f5]">{{ t.name }}</p>
                <p class="text-xs text-[#4a4a4a]">{{ t.sport }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 6: Pricing ── -->
    <section id="pricing" class="py-24 bg-[#080808]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-12">
          <span class="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Pricing</span>
          <h2 class="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">CHOOSE YOUR PLAN.</h2>
        </div>

        <!-- Billing toggle -->
        <div class="flex items-center justify-center gap-4 mb-12">
          <span :class="['text-sm transition-colors', !billingAnnual ? 'text-[#f5f5f5]' : 'text-[#4a4a4a]']">Monthly</span>
          <button
            :class="['relative w-12 h-6 rounded-full transition-colors duration-200', billingAnnual ? 'bg-[#dc2626]' : 'bg-[#242424]']"
            @click="billingAnnual = !billingAnnual"
          >
            <span :class="['absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200', billingAnnual && 'translate-x-6']" />
          </button>
          <span :class="['text-sm transition-colors', billingAnnual ? 'text-[#f5f5f5]' : 'text-[#4a4a4a]']">
            Annual <span class="text-[#dc2626] font-mono text-xs">Save 30%</span>
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <!-- Free -->
          <div class="rounded-2xl bg-[#111111] border border-[#242424] p-8">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-[#888888]">Free</h3>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-4xl font-mono font-black text-[#f5f5f5]">$0</span>
              <span class="text-sm text-[#4a4a4a] font-mono">/mo</span>
            </div>
            <p class="mt-2 text-sm text-[#4a4a4a]">Get started with the basics.</p>
            <a href="#" class="mt-6 block text-center py-3 rounded-lg border border-[#242424] text-sm font-semibold text-[#f5f5f5] hover:border-[#888888] transition-colors">
              Get started
            </a>
            <ul class="mt-8 space-y-3">
              <li v-for="f in PRICING_FREE" :key="f" class="flex items-start gap-3 text-sm text-[#888888]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ f }}
              </li>
            </ul>
          </div>

          <!-- Athlete — highlighted -->
          <div class="rounded-2xl bg-[#181818] border-2 border-[#dc2626] p-8 relative">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#dc2626] text-[10px] uppercase tracking-wider font-bold text-white">
              Most Popular
            </div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-[#dc2626]">Athlete</h3>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-4xl font-mono font-black text-[#f5f5f5]">
                ${{ billingAnnual ? '10' : '14' }}<span class="text-2xl">.{{ billingAnnual ? '49' : '99' }}</span>
              </span>
              <span class="text-sm text-[#4a4a4a] font-mono">/mo</span>
            </div>
            <p class="mt-2 text-sm text-[#4a4a4a]">For dedicated athletes.</p>
            <a href="#" class="mt-6 block text-center py-3 rounded-lg bg-[#dc2626] text-sm font-bold text-white hover:bg-[#b91c1c] transition-colors">
              Start free trial
            </a>
            <ul class="mt-8 space-y-3">
              <li v-for="f in PRICING_ATHLETE" :key="f" class="flex items-start gap-3 text-sm text-[#888888]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ f }}
              </li>
            </ul>
          </div>

          <!-- Elite -->
          <div class="rounded-2xl bg-[#111111] border border-[#242424] p-8">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-[#888888]">Elite</h3>
            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-4xl font-mono font-black text-[#f5f5f5]">
                ${{ billingAnnual ? '20' : '29' }}<span class="text-2xl">.99</span>
              </span>
              <span class="text-sm text-[#4a4a4a] font-mono">/mo</span>
            </div>
            <p class="mt-2 text-sm text-[#4a4a4a]">With personal coaching.</p>
            <a href="#" class="mt-6 block text-center py-3 rounded-lg border border-[#242424] text-sm font-semibold text-[#f5f5f5] hover:border-[#888888] transition-colors">
              Start free trial
            </a>
            <ul class="mt-8 space-y-3">
              <li v-for="f in PRICING_ELITE" :key="f" class="flex items-start gap-3 text-sm text-[#888888]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ f }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="py-16 border-t border-[#242424]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-[#dc2626] font-bold text-lg">/</span>
              <span class="font-black text-lg tracking-[0.1em] uppercase">APEX</span>
            </div>
            <p class="text-sm text-[#4a4a4a] leading-relaxed">
              Train smarter.<br />Perform better.
            </p>
          </div>
          <div v-for="group in FOOTER_LINKS" :key="group.title">
            <h4 class="text-sm font-semibold text-[#f5f5f5] uppercase tracking-wider mb-4">{{ group.title }}</h4>
            <ul class="space-y-2.5">
              <li v-for="link in group.links" :key="link">
                <a href="#" class="text-sm text-[#4a4a4a] hover:text-[#888888] transition-colors duration-150">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-[#4a4a4a]">© {{ currentYear }} Apex Sports Technology, Inc. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <a href="#" class="text-xs text-[#4a4a4a] hover:text-[#888888] transition-colors">Privacy</a>
            <a href="#" class="text-xs text-[#4a4a4a] hover:text-[#888888] transition-colors">Terms</a>
            <a href="#" class="text-xs text-[#4a4a4a] hover:text-[#888888] transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
