<script setup lang="ts">
/**
 * LogisticsSaasTemplate — Supply Chain Intelligence Platform ("Nexflow").
 *
 * Palette: Slate + Amber. Mode: Light primary, dark dashboard sections.
 * Font: IBM Plex Sans / IBM Plex Mono.
 *
 * Sections:
 *   Nav → Hero (split with live supply chain map) → Platform Features →
 *   Interactive Demo → Integrations → ROI Calculator →
 *   Enterprise Proof (Case Studies) → CTA → Footer
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

export interface LogisticsSaasTemplateProps {
  class?: string;
}

const props = defineProps<LogisticsSaasTemplateProps>();

/* ------------------------------------------------------------------ */
/*  State                                                               */
/* ------------------------------------------------------------------ */

const scrolled = ref(false);
const mobileOpen = ref(false);
const activeIntCategory = ref('ERP');
const activeStep = ref(0);
const activeAlertIdx = ref(0);
const shipmentCount = ref(847);

// Slider state for ROI calc
const annualSpend = ref(500000);
const supplierCount = ref(200);
const disruptionFreq = ref(12);
const costPerDisruption = ref(50000);

// ROI computed values
const annualDisruptionCost = computed(() => disruptionFreq.value * costPerDisruption.value);
const potentialSavings = computed(() => Math.round(annualDisruptionCost.value * 0.67));
const roi = computed(() => Math.round((potentialSavings.value / (annualSpend.value * 0.03)) * 100));
const paybackMonths = computed(() => Math.max(1, Math.round(12 / (roi.value / 100))));

function formatCurrency(n: number) {
  return n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`;
}

let alertInterval: ReturnType<typeof setInterval>;
let shipmentInterval: ReturnType<typeof setInterval>;

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 20; };
  window.addEventListener('scroll', onScroll, { passive: true });

  alertInterval = setInterval(() => {
    activeAlertIdx.value = (activeAlertIdx.value + 1) % ALERTS.length;
  }, 5000);

  shipmentInterval = setInterval(() => {
    shipmentCount.value += Math.floor(Math.random() * 3);
  }, 4000);

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
    clearInterval(alertInterval);
    clearInterval(shipmentInterval);
  });
});

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

interface ShipmentRoute {
  id: string;
  from: { x: number; y: number; label: string };
  to: { x: number; y: number; label: string };
  status: 'on-time' | 'at-risk' | 'delayed';
}

const ROUTES: ShipmentRoute[] = [
  { id: 'r1', from: { x: 150, y: 130, label: 'Los Angeles' }, to: { x: 640, y: 120, label: 'Shanghai' }, status: 'on-time' },
  { id: 'r2', from: { x: 420, y: 90, label: 'Rotterdam' }, to: { x: 180, y: 140, label: 'New York' }, status: 'on-time' },
  { id: 'r3', from: { x: 640, y: 120, label: 'Shanghai' }, to: { x: 420, y: 90, label: 'Rotterdam' }, status: 'at-risk' },
  { id: 'r4', from: { x: 400, y: 150, label: 'Suez Canal' }, to: { x: 420, y: 90, label: 'Hamburg' }, status: 'delayed' },
  { id: 'r5', from: { x: 580, y: 160, label: 'Singapore' }, to: { x: 700, y: 290, label: 'Sydney' }, status: 'on-time' },
];

const ALERTS = [
  { type: 'warning' as const, icon: '⚠', text: 'ALERT: Suez Canal congestion affecting 4 shipments — ETA impact: +3-7 days', color: 'amber' },
  { type: 'success' as const, icon: '✓', text: 'Alternative route calculated: Rotterdam → Hamburg via rail', color: 'emerald' },
  { type: 'critical' as const, icon: '🔴', text: 'DISRUPTION: Supplier factory in Shenzhen — flood warning', color: 'red' },
  { type: 'success' as const, icon: '✓', text: 'Shipment #SH-4829 delivered ahead of schedule to Mumbai port', color: 'emerald' },
  { type: 'warning' as const, icon: '⚠', text: 'Port of Long Beach — 48hr delay reported on inbound containers', color: 'amber' },
];

const FEATURES = [
  { title: 'Real-time Tracking', description: 'Every shipment, every carrier, every handoff — tracked in real time across your entire supply chain network.', icon: 'shipment', metric: '847 active shipments monitored' },
  { title: 'Predictive Alerts', description: '72-hour advance notice of disruptions using AI-powered risk analysis across weather, geopolitical, and operational data.', icon: 'alert', metric: '72hr advance warning' },
  { title: 'Supplier Portal', description: 'Collaborative visibility with your supply base. Shared timelines, document exchange, and performance scorecards.', icon: 'globe', metric: '340+ suppliers connected' },
  { title: 'Analytics & Reporting', description: 'Carrier performance, lead time analysis, OTIF tracking, and cost optimization — all in customizable dashboards.', icon: 'chart', metric: '67% disruption reduction' },
];

const DEMO_STEPS = [
  { step: 1, title: 'Search a purchase order', description: 'Look up PO-2847 and see all associated shipments, documents, and milestones across carriers and legs.' },
  { step: 2, title: 'Identify at-risk shipment', description: 'Click the amber-flagged shipment to see the AI delay prediction, root cause analysis, and suggested alternatives.' },
  { step: 3, title: 'Set an alert', description: 'Configure proactive notifications for this shipment — email, SMS, or webhook to your Slack channel.' },
  { step: 4, title: 'Generate a report', description: 'Create a carrier performance report for Q4 with OTIF rates, average lead times, and cost benchmarks.' },
];

const INTEGRATIONS: Record<string, string[]> = {
  ERP: ['SAP', 'Oracle', 'Microsoft Dynamics', 'NetSuite'],
  TMS: ['Blue Yonder', 'Oracle TMS', 'MercuryGate', 'Descartes'],
  Carriers: ['FedEx', 'DHL', 'UPS', 'Maersk', '+200 more'],
  '3PL': ['XPO Logistics', 'C.H. Robinson', 'Kuehne + Nagel', 'DB Schenker'],
  EDI: ['SPS Commerce', 'TrueCommerce', 'Cleo', 'OpenText'],
};

const CASE_STUDIES = [
  { industry: 'Manufacturing', company: 'Global Automotive Parts', size: '2,400 suppliers', challenge: 'Multi-tier supply chain with zero visibility beyond Tier 1 suppliers, leading to $12M in annual disruption costs.', outcome: '67% reduction in disruption costs', metric: '$8.1M', label: 'annual savings', period: 'in 6 months' },
  { industry: 'Retail', company: 'National Consumer Goods', size: '800 SKUs, 14 DCs', challenge: 'Frequent stockouts and overstocks due to lack of real-time inventory visibility across distribution centers.', outcome: '43% improvement in OTIF delivery', metric: '98.2%', label: 'on-time delivery rate', period: 'in 90 days' },
  { industry: 'Food & Beverage', company: 'Premium Organics Co.', size: '120 cold-chain routes', challenge: 'Temperature excursion events causing $3M in spoiled goods annually with limited cold-chain monitoring.', outcome: '91% reduction in spoilage', metric: '91%', label: 'less waste', period: 'in 4 months' },
];

const FOOTER_GROUPS = [
  { title: 'Platform', links: ['Real-time Tracking', 'Predictive Alerts', 'Supplier Portal', 'Analytics', 'API'] },
  { title: 'Solutions', links: ['Manufacturing', 'Retail', 'Food & Beverage', '3PL', 'Government'] },
  { title: 'Resources', links: ['Documentation', 'API Reference', 'Blog', 'Case Studies', 'Webinars'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact', 'Partners', 'Trust Center'] },
];

const NAV_LINKS = ['Platform', 'Solutions', 'Integrations', 'Pricing', 'Resources'];
const COMPANY_NAMES = ['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Stark Industries', 'Wayne Enterprises'];
const LEGAL_LINKS = ['Privacy', 'Terms', 'Security', 'Trust Center'];

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function statusColor(status: string) {
  return status === 'on-time' ? '#22c55e' : status === 'at-risk' ? '#f59e0b' : '#ef4444';
}

function alertBorderClass(color: string) {
  if (color === 'amber') return 'border-amber-500/30 dark:border-amber-400/30';
  if (color === 'emerald') return 'border-emerald-500/30 dark:border-emerald-400/30';
  return 'border-red-500/30 dark:border-red-400/30';
}

function alertTextClass(color: string) {
  if (color === 'amber') return 'text-amber-600 dark:text-amber-400';
  if (color === 'emerald') return 'text-emerald-600 dark:text-emerald-400';
  return 'text-red-600 dark:text-red-400';
}

function routePath(route: ShipmentRoute) {
  const midX = (route.from.x + route.to.x) / 2;
  const midY = Math.min(route.from.y, route.to.y) - 40;
  return `M${route.from.x},${route.from.y} Q${midX},${midY} ${route.to.x},${route.to.y}`;
}

const visibleAlerts = computed(() => {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push(ALERTS[(activeAlertIdx.value + i) % ALERTS.length]);
  }
  return result;
});

const currentYear = new Date().getFullYear();
</script>

<template>
  <div
    :class="cn(
      'min-h-screen antialiased',
      'bg-zinc-50 text-zinc-950',
      'dark:bg-[#0d1117] dark:text-white',
      props.class
    )"
    style="font-family: 'IBM Plex Sans', sans-serif"
  >
    <!-- ── Navbar ── -->
    <header
      :class="cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b',
        scrolled
          ? 'bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-xl border-zinc-200 dark:border-white/5'
          : 'bg-white dark:bg-[#0d1117] border-zinc-100 dark:border-transparent'
      )"
    >
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <!-- Logo -->
        <div class="flex items-center gap-2.5">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700 dark:bg-slate-300">
            <svg class="w-4 h-4 text-white dark:text-slate-900" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
            </svg>
          </div>
          <span class="text-base font-bold tracking-tight text-zinc-950 dark:text-white" style="font-family: 'IBM Plex Sans', sans-serif">
            Nexflow
          </span>
        </div>

        <!-- Center nav — desktop -->
        <nav class="hidden md:flex items-center gap-6">
          <a
            v-for="link in NAV_LINKS"
            :key="link"
            :href="`#${link.toLowerCase()}`"
            class="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-150"
            style="font-family: 'IBM Plex Sans', sans-serif"
          >
            {{ link }}
          </a>
        </nav>

        <!-- Right — desktop -->
        <div class="hidden md:flex items-center gap-3">
          <a href="#contact" class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
            Contact sales
          </a>
          <a href="#demo" class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
            Request demo
          </a>
        </div>

        <!-- Mobile menu -->
        <button class="md:hidden flex items-center justify-center w-10 h-10 text-zinc-600 dark:text-zinc-400" @click="mobileOpen = !mobileOpen">
          <svg v-if="!mobileOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      </div>

      <!-- Mobile dropdown -->
      <div v-if="mobileOpen" class="md:hidden border-t border-zinc-100 dark:border-white/5 bg-white dark:bg-[#0d1117] px-6 py-4 space-y-3">
        <a v-for="link in NAV_LINKS" :key="link" :href="`#${link.toLowerCase()}`" class="block text-sm text-zinc-600 dark:text-zinc-400 py-2" @click="mobileOpen = false">{{ link }}</a>
        <div class="flex flex-col gap-2 pt-2">
          <a href="#contact" class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">Contact sales</a>
          <a href="#demo" class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900">Request demo</a>
        </div>
      </div>
    </header>

    <!-- ── Hero — Split Layout ── -->
    <section class="relative min-h-[90vh] flex items-center overflow-hidden">
      <!-- Background grid -->
      <div class="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.06]">
        <div class="w-full h-full" style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 24px 24px" />
      </div>

      <div class="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left — Copy -->
          <div>
            <span class="inline-flex items-center mb-6 rounded-full px-3.5 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Real-time supply chain intelligence
            </span>

            <h1 class="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.08] text-zinc-950 dark:text-white" style="font-family: 'IBM Plex Sans', sans-serif">
              See every shipment. <span class="text-slate-500 dark:text-slate-400">Prevent every disruption.</span>
            </h1>

            <p class="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl">
              Nexflow connects your entire supply chain — from PO to delivery — in a single live map.
              Know about disruptions 72 hours before they happen.
            </p>

            <div class="flex flex-wrap gap-4 mt-8">
              <a href="#demo" class="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                Request a demo
              </a>
              <a href="#platform" class="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                See it live →
              </a>
            </div>

            <!-- ROI callout box -->
            <div class="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
              <p class="text-sm font-medium text-amber-700 dark:text-amber-400">
                Customers reduce supply chain disruptions by <strong>67%</strong> in 90 days
              </p>
            </div>
          </div>

          <!-- Right — Live Supply Chain Map -->
          <div class="rounded-2xl bg-[#0d1117] dark:bg-[#161b22] border border-zinc-800 dark:border-zinc-700 overflow-hidden shadow-2xl shadow-black/20">
            <!-- Map header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-800 dark:border-zinc-700">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono text-zinc-400" style="font-family: 'IBM Plex Mono', monospace">NEXFLOW · LIVE</span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div class="text-[10px] font-mono text-amber-400" style="font-family: 'IBM Plex Mono', monospace">
                {{ shipmentCount }} active · 23 at risk · 4 critical
              </div>
            </div>

            <!-- Map -->
            <div class="relative aspect-[16/10] bg-[#0a0e14]">
              <!-- World map outline -->
              <svg viewBox="0 0 800 400" class="w-full h-full opacity-20 absolute inset-0" fill="none" stroke="currentColor" stroke-width="0.5">
                <path d="M120 80 L180 60 L220 80 L240 120 L220 160 L180 180 L140 200 L120 180 L100 140 L110 100Z" class="stroke-slate-500 dark:stroke-slate-600" fill="none" />
                <path d="M180 220 L200 200 L220 220 L230 280 L210 340 L190 360 L170 320 L160 260Z" class="stroke-slate-500 dark:stroke-slate-600" fill="none" />
                <path d="M380 60 L420 50 L440 70 L430 100 L410 110 L390 100 L380 80Z" class="stroke-slate-500 dark:stroke-slate-600" fill="none" />
                <path d="M400 140 L440 120 L460 150 L470 220 L450 300 L420 320 L390 280 L380 200Z" class="stroke-slate-500 dark:stroke-slate-600" fill="none" />
                <path d="M480 40 L600 30 L680 60 L700 120 L660 160 L600 180 L540 160 L500 120 L460 80Z" class="stroke-slate-500 dark:stroke-slate-600" fill="none" />
                <path d="M640 280 L700 270 L720 300 L700 330 L660 330 L640 310Z" class="stroke-slate-500 dark:stroke-slate-600" fill="none" />
              </svg>

              <!-- Routes + nodes -->
              <svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
                <template v-for="route in ROUTES" :key="route.id">
                  <!-- Route line -->
                  <path :d="routePath(route)" fill="none" :stroke="statusColor(route.status)" stroke-width="1" opacity="0.3" stroke-dasharray="4 4" />
                  <!-- Animated dot -->
                  <circle r="3" :fill="statusColor(route.status)">
                    <animateMotion dur="4s" repeatCount="indefinite" :path="routePath(route)" />
                  </circle>
                  <!-- From node -->
                  <template v-if="route.status !== 'on-time'">
                    <circle :cx="route.from.x" :cy="route.from.y" r="8" fill="none" :stroke="statusColor(route.status)" stroke-width="1" opacity="0.4">
                      <animate attributeName="r" values="4;12" :dur="route.status === 'delayed' ? '1.2s' : '1.5s'" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0" :dur="route.status === 'delayed' ? '1.2s' : '1.5s'" repeatCount="indefinite" />
                    </circle>
                  </template>
                  <circle :cx="route.from.x" :cy="route.from.y" r="4" :fill="statusColor(route.status)" />
                  <text :x="route.from.x" :y="route.from.y - 10" text-anchor="middle" class="text-[8px] fill-slate-400 dark:fill-slate-500" style="font-family: 'IBM Plex Mono', monospace">{{ route.from.label }}</text>
                  <!-- To node -->
                  <circle :cx="route.to.x" :cy="route.to.y" r="4" :fill="statusColor(route.status)" />
                  <text :x="route.to.x" :y="route.to.y - 10" text-anchor="middle" class="text-[8px] fill-slate-400 dark:fill-slate-500" style="font-family: 'IBM Plex Mono', monospace">{{ route.to.label }}</text>
                </template>
              </svg>

              <!-- Metrics overlay -->
              <div class="absolute top-3 right-3 text-right">
                <div class="text-xs font-mono text-zinc-400" style="font-family: 'IBM Plex Mono', monospace">47 arriving today</div>
              </div>
            </div>

            <!-- Alert Feed -->
            <div class="px-4 py-3 space-y-2 border-t border-zinc-800 dark:border-zinc-700 max-h-[140px] overflow-hidden">
              <div
                v-for="(alert, i) in visibleAlerts"
                :key="`${alert.text}-${i}`"
                :class="cn('flex items-start gap-2 px-3 py-2 rounded-lg border-l-2 text-xs', alertBorderClass(alert.color))"
                style="font-family: 'IBM Plex Mono', monospace"
              >
                <span :class="alertTextClass(alert.color)">{{ alert.icon }}</span>
                <span :class="cn('leading-relaxed', alertTextClass(alert.color))">{{ alert.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 1 — Platform Features ── -->
    <section id="platform" class="py-16 lg:py-24 border-t border-zinc-100 dark:border-zinc-800">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">One platform. Total visibility.</h2>
          <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            From raw material to final delivery — monitor, predict, and optimize every leg of your supply chain.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 gap-6">
          <div
            v-for="feature in FEATURES"
            :key="feature.title"
            class="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161b22] p-6 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/20 transition-all duration-300"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <!-- Shipment icon -->
                <svg v-if="feature.icon === 'shipment'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" /><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" /><circle cx="7" cy="18" r="2" /><path d="M15 18H9" /><circle cx="17" cy="18" r="2" /></svg>
                <!-- Alert icon -->
                <svg v-else-if="feature.icon === 'alert'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                <!-- Globe icon -->
                <svg v-else-if="feature.icon === 'globe'" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                <!-- Chart icon -->
                <svg v-else class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
              </div>
              <h3 class="text-lg font-bold text-zinc-950 dark:text-white" style="font-family: 'IBM Plex Sans', sans-serif">{{ feature.title }}</h3>
            </div>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4" style="font-family: 'IBM Plex Sans', sans-serif">{{ feature.description }}</p>
            <div class="rounded-lg bg-zinc-50 dark:bg-[#0d1117] border border-zinc-100 dark:border-zinc-800 p-3 group-hover:scale-[1.01] transition-transform duration-300">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span class="text-[10px] font-mono text-zinc-500" style="font-family: 'IBM Plex Mono', monospace">LIVE</span>
              </div>
              <div class="text-sm font-bold font-mono text-slate-700 dark:text-slate-300" style="font-family: 'IBM Plex Mono', monospace">{{ feature.metric }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 2 — Interactive Demo ── -->
    <section id="demo" class="py-16 lg:py-24 bg-white dark:bg-[#161b22] border-t border-zinc-100 dark:border-zinc-800">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">Experience Nexflow without signing up.</h2>
          <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">Walk through a guided product tour and see how supply chain teams use Nexflow every day.</p>
        </div>

        <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0d1117] overflow-hidden">
          <!-- Progress bar -->
          <div class="h-1 bg-zinc-200 dark:bg-zinc-800">
            <div class="h-full bg-amber-500 transition-all duration-500 ease-out" :style="{ width: `${((activeStep + 1) / DEMO_STEPS.length) * 100}%` }" />
          </div>

          <!-- Step content -->
          <div class="p-8 lg:p-12">
            <div class="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 text-sm font-bold font-mono" style="font-family: 'IBM Plex Mono', monospace">{{ DEMO_STEPS[activeStep].step }}</span>
                  <span class="text-xs font-mono text-zinc-500 uppercase tracking-wider" style="font-family: 'IBM Plex Mono', monospace">Step {{ activeStep + 1 }} of {{ DEMO_STEPS.length }}</span>
                </div>
                <h3 class="text-2xl font-bold text-zinc-950 dark:text-white mb-3">{{ DEMO_STEPS[activeStep].title }}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ DEMO_STEPS[activeStep].description }}</p>
                <div class="flex gap-3 mt-6">
                  <button @click="activeStep = Math.max(0, activeStep - 1)" :disabled="activeStep === 0" class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    ← Previous
                  </button>
                  <button @click="activeStep = Math.min(DEMO_STEPS.length - 1, activeStep + 1)" :disabled="activeStep === DEMO_STEPS.length - 1" class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    Next →
                  </button>
                </div>
              </div>

              <!-- Demo mockup -->
              <div class="rounded-xl bg-white dark:bg-[#161b22] border border-zinc-200 dark:border-zinc-800 p-4 min-h-[280px]">
                <div class="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div class="flex gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span class="text-[10px] font-mono text-zinc-400" style="font-family: 'IBM Plex Mono', monospace">nexflow-dashboard</span>
                </div>
                <div class="space-y-2 font-mono text-xs text-zinc-500 dark:text-zinc-400" style="font-family: 'IBM Plex Mono', monospace">
                  <template v-if="activeStep === 0">
                    <div><span class="text-amber-500">$</span> nexflow search PO-2847</div>
                    <div class="text-zinc-400">Found 3 shipments for PO-2847:</div>
                    <div class="pl-3 text-emerald-500">✓ SH-4829 — Shanghai → Rotterdam — In transit</div>
                    <div class="pl-3 text-amber-500">⚠ SH-4830 — Rotterdam → Hamburg — At risk</div>
                    <div class="pl-3 text-emerald-500">✓ SH-4831 — Hamburg → Munich — Scheduled</div>
                  </template>
                  <template v-if="activeStep === 1">
                    <div><span class="text-amber-500">$</span> nexflow inspect SH-4830</div>
                    <div class="text-amber-500">⚠ DELAY PREDICTION: +3-5 days</div>
                    <div class="text-zinc-400">Root cause: Port congestion at Rotterdam</div>
                    <div class="text-zinc-400">Confidence: 87%</div>
                    <div class="text-emerald-500">ALT ROUTE: Rotterdam → Hamburg via rail (-2 days)</div>
                  </template>
                  <template v-if="activeStep === 2">
                    <div><span class="text-amber-500">$</span> nexflow alert create --shipment SH-4830</div>
                    <div class="text-zinc-400">Alert type: [email, slack, webhook]</div>
                    <div class="text-emerald-500">✓ Alert configured for SH-4830</div>
                    <div class="text-zinc-400">Next check: 15 minutes</div>
                  </template>
                  <template v-if="activeStep === 3">
                    <div><span class="text-amber-500">$</span> nexflow report --type carrier --period Q4</div>
                    <div class="text-zinc-400">Generating carrier performance report...</div>
                    <div class="text-emerald-500">✓ Report ready</div>
                    <div class="pl-3 text-zinc-400">OTIF Rate: 94.2% (+3.1% vs Q3)</div>
                    <div class="pl-3 text-zinc-400">Avg Lead Time: 14.3 days (-1.7 days)</div>
                    <div class="pl-3 text-zinc-400">Cost/Shipment: $847 (-12%)</div>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- Step dots -->
          <div class="flex items-center justify-center gap-2 pb-6">
            <button
              v-for="(_, i) in DEMO_STEPS"
              :key="i"
              @click="activeStep = i"
              :class="cn('w-2 h-2 rounded-full transition-all duration-200', activeStep === i ? 'bg-amber-500 w-6' : 'bg-zinc-300 dark:bg-zinc-600')"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3 — Integrations ── -->
    <section id="integrations" class="py-16 lg:py-24 border-t border-zinc-100 dark:border-zinc-800">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">Connects to your entire stack.</h2>
          <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">No rip-and-replace. Average integration time: 2 weeks.</p>
        </div>

        <!-- Category tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-10">
          <button
            v-for="cat in Object.keys(INTEGRATIONS)"
            :key="cat"
            @click="activeIntCategory = cat"
            :class="cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeIntCategory === cat
                ? 'bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            )"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Integration grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div
            v-for="name in INTEGRATIONS[activeIntCategory]"
            :key="name"
            class="group flex items-center justify-center h-20 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161b22] hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-200"
          >
            <span class="text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">{{ name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 4 — ROI Calculator ── -->
    <section class="py-16 lg:py-24 bg-white dark:bg-[#161b22] border-t border-zinc-100 dark:border-zinc-800">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">Calculate your supply chain risk exposure.</h2>
          <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">Use your own numbers to see the potential impact of real-time supply chain intelligence.</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Inputs -->
          <div class="space-y-6">
            <div>
              <div class="flex justify-between mb-2">
                <label class="text-sm text-zinc-600 dark:text-zinc-400">Annual logistics spend</label>
                <span class="text-sm font-bold font-mono text-zinc-950 dark:text-white" style="font-family: 'IBM Plex Mono', monospace">{{ formatCurrency(annualSpend) }}</span>
              </div>
              <input type="range" min="100000" max="10000000" step="100000" v-model.number="annualSpend" class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-200 dark:bg-zinc-700 accent-slate-700 dark:accent-slate-300" />
            </div>
            <div>
              <div class="flex justify-between mb-2">
                <label class="text-sm text-zinc-600 dark:text-zinc-400">Number of suppliers</label>
                <span class="text-sm font-bold font-mono text-zinc-950 dark:text-white" style="font-family: 'IBM Plex Mono', monospace">{{ supplierCount }}</span>
              </div>
              <input type="range" min="10" max="2000" step="10" v-model.number="supplierCount" class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-200 dark:bg-zinc-700 accent-slate-700 dark:accent-slate-300" />
            </div>
            <div>
              <div class="flex justify-between mb-2">
                <label class="text-sm text-zinc-600 dark:text-zinc-400">Avg disruptions per year</label>
                <span class="text-sm font-bold font-mono text-zinc-950 dark:text-white" style="font-family: 'IBM Plex Mono', monospace">{{ disruptionFreq }}</span>
              </div>
              <input type="range" min="1" max="52" step="1" v-model.number="disruptionFreq" class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-200 dark:bg-zinc-700 accent-slate-700 dark:accent-slate-300" />
            </div>
            <div>
              <div class="flex justify-between mb-2">
                <label class="text-sm text-zinc-600 dark:text-zinc-400">Cost per disruption</label>
                <span class="text-sm font-bold font-mono text-zinc-950 dark:text-white" style="font-family: 'IBM Plex Mono', monospace">{{ formatCurrency(costPerDisruption) }}</span>
              </div>
              <input type="range" min="5000" max="500000" step="5000" v-model.number="costPerDisruption" class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-200 dark:bg-zinc-700 accent-slate-700 dark:accent-slate-300" />
            </div>
          </div>

          <!-- Results -->
          <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161b22] p-6 space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-4">Projected Results</h3>
            <div class="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800">
              <span class="text-sm text-zinc-600 dark:text-zinc-400">Annual disruption cost</span>
              <span class="text-xl font-bold text-red-600 dark:text-red-400" style="font-family: 'IBM Plex Mono', monospace">{{ formatCurrency(annualDisruptionCost) }}</span>
            </div>
            <div class="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800">
              <span class="text-sm text-zinc-600 dark:text-zinc-400">Potential savings with Nexflow</span>
              <span class="text-xl font-bold text-emerald-600 dark:text-emerald-400" style="font-family: 'IBM Plex Mono', monospace">{{ formatCurrency(potentialSavings) }}</span>
            </div>
            <div class="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800">
              <span class="text-sm text-zinc-600 dark:text-zinc-400">Estimated ROI</span>
              <span class="text-xl font-bold text-slate-700 dark:text-slate-300" style="font-family: 'IBM Plex Mono', monospace">{{ roi }}%</span>
            </div>
            <div class="flex items-center justify-between py-3">
              <span class="text-sm text-zinc-600 dark:text-zinc-400">Payback period</span>
              <span class="text-xl font-bold text-amber-600 dark:text-amber-400" style="font-family: 'IBM Plex Mono', monospace">{{ paybackMonths }} months</span>
            </div>
            <a href="#contact" class="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
              Get your detailed savings analysis →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 5 — Enterprise Proof / Case Studies ── -->
    <section class="py-16 lg:py-24 border-t border-zinc-100 dark:border-zinc-800">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">Trusted by supply chain leaders.</h2>
          <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">Real results from teams managing millions in logistics spend.</p>
        </div>

        <!-- Company logos -->
        <div class="flex flex-wrap items-center justify-center gap-8 mb-12 opacity-50">
          <span v-for="name in COMPANY_NAMES" :key="name" class="text-sm font-medium text-zinc-400 dark:text-zinc-600 hover:opacity-100 transition-opacity cursor-default">{{ name }}</span>
        </div>

        <!-- Case studies -->
        <div class="space-y-6">
          <div v-for="study in CASE_STUDIES" :key="study.industry" class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161b22] overflow-hidden">
            <div class="grid lg:grid-cols-5 gap-0">
              <div class="lg:col-span-3 p-6">
                <div class="flex items-center gap-2 mb-3">
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{{ study.industry }}</span>
                  <span class="text-xs text-zinc-500 font-mono" style="font-family: 'IBM Plex Mono', monospace">{{ study.size }}</span>
                </div>
                <h3 class="text-lg font-bold text-zinc-950 dark:text-white mb-2">{{ study.company }}</h3>
                <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{{ study.challenge }}</p>
                <a href="#" class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Read full case study →
                </a>
              </div>
              <div class="lg:col-span-2 bg-zinc-50 dark:bg-[#0d1117] p-6 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-zinc-100 dark:border-zinc-800">
                <div class="text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300" style="font-family: 'IBM Plex Mono', monospace">{{ study.metric }}</div>
                <div class="text-sm text-zinc-500 mt-1">{{ study.label }}</div>
                <div class="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5 font-mono" style="font-family: 'IBM Plex Mono', monospace">{{ study.period }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA Section ── -->
    <section id="contact" class="py-16 lg:py-24 bg-[#0d1117] dark:bg-[#0a0e14] border-t border-zinc-800">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">See your supply chain in real time.</h2>
        <p class="text-lg text-zinc-400 mb-8">
          Book a 30-minute call with our team. We'll show you how Nexflow connects to your existing stack and surfaces insights from day one.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#" class="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-medium bg-slate-300 text-slate-900 hover:bg-slate-200 transition-colors">Request a demo</a>
          <a href="#" class="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-medium border border-zinc-700 text-zinc-300 hover:bg-white/5 transition-colors">Contact sales</a>
        </div>
        <p class="mt-6 text-xs text-zinc-600">No commitment · 2-week integration · See results in 90 days</p>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-zinc-50 dark:bg-[#0d1117]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid sm:grid-cols-5 gap-8">
          <div>
            <div class="flex items-center gap-2.5 mb-4">
              <div class="flex items-center justify-center w-7 h-7 rounded-md bg-slate-700 dark:bg-slate-300">
                <svg class="w-3.5 h-3.5 text-white dark:text-slate-900" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
                </svg>
              </div>
              <span class="text-sm font-bold text-zinc-950 dark:text-white">Nexflow</span>
            </div>
            <p class="text-xs text-zinc-500 leading-relaxed">Supply chain intelligence for enterprise operations.</p>
          </div>
          <div v-for="group in FOOTER_GROUPS" :key="group.title">
            <h4 class="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 mb-3">{{ group.title }}</h4>
            <ul class="space-y-2">
              <li v-for="link in group.links" :key="link">
                <a href="#" class="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-zinc-400 dark:text-zinc-600">© {{ currentYear }} Nexflow. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <a v-for="link in LEGAL_LINKS" :key="link" href="#" class="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-950 dark:hover:text-white transition-colors">{{ link }}</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
