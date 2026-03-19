<script setup lang="ts">
/**
 * CybersecurityTemplate — Enterprise cybersecurity SaaS (Sentinel).
 *
 * Palette: Iron (zinc) + crimson warning states. Dark-primary, clinical.
 * Font: IBM Plex Sans / IBM Plex Mono.
 *
 * Sections:
 *   Announcement bar → Nav → Hero (split with SOC dashboard) →
 *   Platform Capabilities → Threat Intelligence Feed →
 *   Enterprise Proof → Integration Ecosystem →
 *   Pricing → CTA → Footer
 */

import { ref, onMounted, onUnmounted } from 'vue';
import { cn } from '@archui/core';

export interface CybersecurityTemplateProps {
  class?: string;
}

const props = defineProps<CybersecurityTemplateProps>();

/* ------------------------------------------------------------------ */
/*  State                                                               */
/* ------------------------------------------------------------------ */

const scrolled = ref(false);
const activeCategory = ref('SIEM');
const threatCount = ref(4847);

// Threat map dots
const dots = ref<Array<{ id: number; x: number; y: number; age: number }>>([]);
let dotId = 0;

let threatInterval: ReturnType<typeof setInterval>;
let dotInterval: ReturnType<typeof setInterval>;

onMounted(() => {
  // Scroll listener
  const onScroll = () => { scrolled.value = window.scrollY > 20; };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Threat count increment
  threatInterval = setInterval(() => {
    threatCount.value += Math.floor(Math.random() * 8) + 1;
  }, 3000);

  // Threat map dots
  dotInterval = setInterval(() => {
    dots.value = dots.value
      .map(d => ({ ...d, age: d.age + 1 }))
      .filter(d => d.age < 8);
    dots.value.push({
      id: dotId++,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70,
      age: 0,
    });
  }, 3500);

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
    clearInterval(threatInterval);
    clearInterval(dotInterval);
  });
});

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const COMPLIANCE_BADGES = ['SOC 2 Type II', 'ISO 27001', 'FedRAMP', 'HIPAA', 'PCI DSS'];
const DEPLOYMENT_OPTIONS = ['Cloud', 'On-Premise', 'Hybrid', 'Air-Gapped'];

const COMPANY_LOGOS = [
  'https://placehold.co/120x36/111/888?text=Acme+Corp',
  'https://placehold.co/120x36/111/888?text=Globex',
  'https://placehold.co/120x36/111/888?text=Initech',
  'https://placehold.co/120x36/111/888?text=Umbrella',
  'https://placehold.co/120x36/111/888?text=Stark+Ind',
  'https://placehold.co/120x36/111/888?text=Wayne+Ent',
];

const SEVERITY_FEED = [
  { level: 'CRITICAL', text: 'CVE-2024-8847 — 192.168.1.104 — Blocked', time: '2s ago' },
  { level: 'HIGH', text: 'Brute force attempt — admin@corp.com', time: '12s ago' },
  { level: 'MEDIUM', text: 'Unusual auth pattern — 8 accounts', time: '34s ago' },
  { level: 'INFO', text: 'New device registered — Seattle, WA', time: '1m ago' },
  { level: 'HIGH', text: 'SQL injection attempt — /api/users', time: '2m ago' },
  { level: 'CRITICAL', text: 'CVE-2024-9214 — CVSS 9.8 — Patched', time: '3m ago' },
] as const;

const CAPABILITIES = [
  {
    title: 'Threat Detection & Response',
    icon: 'shield',
    description: 'AI-powered threat engine correlates signals across endpoints, network, and cloud to identify attacks in real time. Automated containment reduces the blast radius instantly.',
    metric: '< 4 minute mean time to respond',
    code: `# sentinel-detection-rule.yaml
rule:
  name: lateral_movement_detection
  severity: critical
  condition:
    - event.type == "authentication"
    - event.outcome == "success"
    - source.geo != target.geo
    - timeframe: 5m
  action: isolate_endpoint`,
  },
  {
    title: 'Zero Trust Access',
    icon: 'lock',
    description: 'Continuous identity verification at every access point. Device posture, behavioral biometrics, and contextual signals determine trust — not VPN status.',
    metric: '99.8% unauthorized access blocked',
    diagram: true,
  },
  {
    title: 'Compliance Automation',
    icon: 'clipboard',
    description: 'Automated evidence collection and continuous monitoring for SOC 2 Type II, ISO 27001, FedRAMP, HIPAA, and PCI DSS. Audit prep time drops from weeks to hours.',
    metric: '87% reduction in audit prep time',
    compliance: true,
  },
];

const THREAT_INTEL_EVENTS = [
  { time: '2024-11-15 14:23:07 UTC', actor: 'Lazarus Group', detail: 'C2 infrastructure', extra: '2 new IOCs', level: 'CRITICAL' },
  { time: '2024-11-15 14:22:51 UTC', actor: 'Vulnerability', detail: 'CVE-2024-9214 · CVSS: 9.8', extra: 'Patch available', level: 'CRITICAL' },
  { time: '2024-11-15 14:21:33 UTC', actor: 'Phishing campaign', detail: 'Targeting Finance sector', extra: '14 new domains', level: 'HIGH' },
  { time: '2024-11-15 14:19:12 UTC', actor: 'Malware', detail: 'New Cobalt Strike variant', extra: 'Signature updated', level: 'HIGH' },
  { time: '2024-11-15 14:17:45 UTC', actor: 'Reconnaissance', detail: 'Port scanning from AS12345', extra: '3 target ranges', level: 'MEDIUM' },
  { time: '2024-11-15 14:15:02 UTC', actor: 'Intel update', detail: 'CISA advisory AA24-320B', extra: 'Review recommended', level: 'INFO' },
] as const;

const CASE_STUDIES = [
  { industry: 'Healthcare', size: '8,400 endpoints', threat: 'Ransomware attack via compromised VPN credentials', outcome: 'Stopped in 47 seconds', metric: '47s' },
  { industry: 'Financial Services', size: '12,000 endpoints', threat: 'APT targeting customer PII via supply chain compromise', outcome: 'Zero data exfiltrated', metric: '0 bytes' },
  { industry: 'Manufacturing', size: '3,200 endpoints', threat: 'OT network lateral movement from compromised IT system', outcome: 'Contained before OT impact', metric: '2.1min' },
];

const INTEGRATIONS: Record<string, string[]> = {
  SIEM: ['Splunk', 'Microsoft Sentinel', 'QRadar', 'Elastic SIEM'],
  Cloud: ['AWS', 'Azure', 'GCP', 'Oracle Cloud'],
  Identity: ['Okta', 'Azure AD', 'Ping Identity', 'OneLogin'],
  Endpoint: ['CrowdStrike', 'SentinelOne', 'Carbon Black', 'Defender'],
  Ticketing: ['Jira', 'ServiceNow', 'PagerDuty', 'Opsgenie'],
};

const PRICING_TIERS = [
  {
    name: 'Essentials', scope: 'Up to 500 endpoints', highlight: false, cta: 'Start free trial',
    features: ['Threat detection', 'Automated response', '24/7 monitoring', 'SOC 2 compliance', 'Email support', 'Cloud deployment'],
  },
  {
    name: 'Professional', scope: 'Up to 5,000 endpoints', highlight: true, cta: 'Request demo',
    features: ['Everything in Essentials', 'Zero trust access', 'SIEM integration', 'Custom detection rules', 'Dedicated CSM', 'On-premise option'],
  },
  {
    name: 'Enterprise', scope: 'Unlimited endpoints', highlight: false, cta: 'Contact sales',
    features: ['Everything in Professional', 'Threat intelligence feed', 'Compliance automation', 'Custom integrations', 'Air-gapped deployment', '24/7 incident response'],
  },
];

const FOOTER_GROUPS = [
  { title: 'Platform', links: [{ label: 'Threat Detection', href: '#' }, { label: 'Zero Trust', href: '#' }, { label: 'Incident Response', href: '#' }, { label: 'Compliance', href: '#' }, { label: 'Integrations', href: '#' }] },
  { title: 'Solutions', links: [{ label: 'Healthcare', href: '#' }, { label: 'Financial Services', href: '#' }, { label: 'Government', href: '#' }, { label: 'Manufacturing', href: '#' }, { label: 'Technology', href: '#' }] },
  { title: 'Resources', links: [{ label: 'Documentation', href: '#' }, { label: 'API Reference', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Threat Reports', href: '#' }, { label: 'Webinars', href: '#' }] },
  { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '#' }, { label: 'Partners', href: '#' }, { label: 'Trust Center', href: '#' }] },
];

const COMPLIANCE_CHECKS = [
  { name: 'SOC 2 Type II', status: 'pass' },
  { name: 'ISO 27001', status: 'pass' },
  { name: 'HIPAA', status: 'warn' },
  { name: 'PCI DSS', status: 'pass' },
];

const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Security', 'Trust Center'];

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function severityColor(level: string) {
  const colors: Record<string, string> = {
    CRITICAL: 'bg-red-500/15 text-red-500 dark:bg-red-500/20 dark:text-red-400',
    HIGH: 'bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    MEDIUM: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/15 dark:text-amber-400',
    INFO: 'bg-blue-500/15 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400',
  };
  return colors[level] || '';
}
</script>

<template>
  <div
    :class="cn(
      'min-h-screen antialiased',
      'bg-[#f5f5f5] dark:bg-[#090909]',
      'text-[#111111] dark:text-[#f0f0f0]',
      props.class
    )"
    style="font-family: 'IBM Plex Sans', system-ui, sans-serif"
  >
    <!-- ── Announcement Bar ── -->
    <div class="w-full bg-[#111111] dark:bg-[#0d0d0d] border-b border-[#1a1a1a]">
      <div class="mx-auto max-w-7xl flex items-center justify-center py-1.5 px-4">
        <span
          class="text-[11px] tracking-wide text-red-500/70"
          style="font-family: 'IBM Plex Mono', monospace"
        >
          Emergency Response: +1-800-SENTINEL · 24/7
        </span>
      </div>
    </div>

    <!-- ── Navigation ── -->
    <header
      :class="cn(
        'w-full z-50 sticky top-0 transition-all duration-300',
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
          : 'bg-transparent'
      )"
    >
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6">
        <!-- Logo -->
        <div class="flex items-center gap-2 shrink-0">
          <span class="inline-block w-2 h-2 bg-red-500 flex-shrink-0" />
          <span
            class="text-sm font-bold tracking-[0.1em] text-[#f0f0f0]"
            style="font-family: 'IBM Plex Sans', sans-serif"
          >SENTINEL</span>
        </div>

        <!-- Nav links -->
        <nav class="hidden md:flex items-center gap-1">
          <a
            v-for="link in ['Platform', 'Solutions', 'Integrations', 'Resources', 'Pricing']"
            :key="link"
            :href="'#' + link.toLowerCase()"
            class="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
          >{{ link }}</a>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-3 shrink-0">
          <a
            href="#"
            class="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-[13px] font-medium border border-zinc-700 text-zinc-300 rounded hover:border-zinc-500 transition-colors"
          >Contact Sales</a>
          <a
            href="#"
            class="inline-flex items-center justify-center px-4 py-1.5 text-[13px] font-semibold rounded bg-zinc-200 text-[#090909] hover:bg-white transition-colors"
          >Request Demo</a>
        </div>
      </div>
    </header>

    <!-- ── Hero — The Operations Center ── -->
    <section class="relative w-full overflow-hidden">
      <!-- Dot grid background -->
      <div
        class="absolute inset-0 opacity-[0.06]"
        :style="{
          backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }"
      />

      <div class="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          <!-- Left -->
          <div class="flex flex-col">
            <span
              class="inline-flex items-center gap-2 text-xs text-green-500 mb-6 tracking-wide"
              style="font-family: 'IBM Plex Mono', monospace"
            >
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              NOW MONITORING: 4,200+ enterprise customers
            </span>

            <h1
              class="font-bold tracking-tight leading-[1.1] text-[#111] dark:text-[#f0f0f0]"
              style="font-family: 'IBM Plex Sans', sans-serif; font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700"
            >
              Stop threats before they become incidents.
            </h1>

            <p class="mt-5 text-base lg:text-lg leading-relaxed text-[#555] dark:text-[#808080] max-w-xl">
              Sentinel's AI threat engine detects, correlates, and responds to cyberattacks in real time — before your security team even knows to look.
            </p>

            <div class="flex flex-wrap gap-3 mt-8">
              <a
                href="#"
                class="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded bg-zinc-200 text-[#090909] hover:bg-white transition-colors"
              >Request a demo</a>
              <a
                href="#"
                class="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded border border-zinc-400 dark:border-zinc-600 text-[#555] dark:text-zinc-400 hover:border-zinc-600 dark:hover:border-zinc-400 hover:text-[#111] dark:hover:text-zinc-200 transition-colors"
              >See the platform</a>
            </div>

            <!-- Compliance badges -->
            <div class="flex flex-wrap gap-2 mt-8">
              <span
                v-for="cert in COMPLIANCE_BADGES"
                :key="cert"
                :class="cn(
                  'inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase',
                  'border border-zinc-300 text-zinc-500 bg-zinc-100',
                  'dark:border-zinc-700 dark:text-zinc-400 dark:bg-zinc-800/50'
                )"
              >{{ cert }}</span>
            </div>
          </div>

          <!-- Right — Dashboard mockup -->
          <div class="w-full">
            <div :class="cn(
              'w-full rounded-lg border overflow-hidden shadow-2xl shadow-black/30',
              'bg-[#111111] border-[#242424]'
            )">
              <!-- Top bar -->
              <div class="flex items-center justify-between px-4 py-2.5 border-b border-[#242424]">
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-bold tracking-wider text-zinc-200" style="font-family: 'IBM Plex Mono', monospace">SENTINEL SOC — LIVE</span>
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                </div>
                <span class="text-[10px] text-green-500/80" style="font-family: 'IBM Plex Mono', monospace">All systems normal</span>
              </div>

              <!-- Content: Map + Feed -->
              <div class="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-0">
                <!-- Threat map -->
                <div class="p-3">
                  <div class="relative w-full min-h-[140px] bg-[#0a0a0a] rounded overflow-hidden">
                    <svg viewBox="0 0 200 100" class="absolute inset-0 w-full h-full opacity-20">
                      <path d="M30,25 Q35,20 45,22 L50,20 Q55,18 60,22 L65,25 Q60,35 55,40 L45,38 Q35,32 30,25Z" stroke="#333" fill="none" stroke-width="0.5" />
                      <path d="M55,40 Q58,45 60,55 L55,65 Q50,60 48,50 Q50,45 55,40Z" stroke="#333" fill="none" stroke-width="0.5" />
                      <path d="M70,20 Q80,15 95,18 L100,22 Q105,28 110,25 L120,22 Q130,18 140,22 L145,30 Q150,40 145,50 L135,45 Q130,40 120,42 L110,38 Q100,35 90,38 L80,35 Q72,30 70,20Z" stroke="#333" fill="none" stroke-width="0.5" />
                      <path d="M145,50 Q150,55 160,52 L170,55 Q175,60 170,65 L160,70 Q155,72 150,68 L145,60 Q142,55 145,50Z" stroke="#333" fill="none" stroke-width="0.5" />
                      <path d="M15,40 Q20,38 30,42 L35,48 Q30,55 25,52 L18,48 Q14,45 15,40Z" stroke="#333" fill="none" stroke-width="0.5" />
                    </svg>
                    <span
                      v-for="dot in dots"
                      :key="dot.id"
                      class="absolute"
                      :style="{ left: dot.x + '%', top: dot.y + '%', transform: 'translate(-50%, -50%)' }"
                    >
                      <span v-if="dot.age < 2" class="relative flex h-2.5 w-2.5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
                        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                      </span>
                      <span v-else class="inline-flex rounded-full h-1 w-1 bg-red-500/60" />
                    </span>
                  </div>
                </div>

                <!-- Severity feed -->
                <div class="border-l border-[#242424] p-3">
                  <p class="text-[9px] uppercase tracking-widest text-zinc-500 mb-2" style="font-family: 'IBM Plex Mono', monospace">Recent Events</p>
                  <div class="flex flex-col gap-1.5 overflow-hidden max-h-[180px]" style="mask-image: linear-gradient(to bottom, black 70%, transparent 100%)">
                    <div
                      v-for="(event, idx) in SEVERITY_FEED"
                      :key="idx"
                      class="flex items-start gap-2 text-[11px] leading-relaxed"
                      style="font-family: 'IBM Plex Mono', monospace"
                    >
                      <span :class="cn('inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase', severityColor(event.level))">
                        {{ event.level }}
                      </span>
                      <span class="text-zinc-400">{{ event.text }}</span>
                      <span class="ml-auto text-zinc-600 whitespace-nowrap">{{ event.time }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bottom metrics -->
              <div class="flex items-center justify-between px-4 py-2.5 border-t border-[#242424] bg-[#0d0d0d]">
                <span class="text-[11px] text-zinc-300 tabular-nums" style="font-family: 'IBM Plex Mono', monospace">
                  Threats blocked today: <span class="text-zinc-100 font-semibold">{{ threatCount.toLocaleString() }}</span>
                </span>
                <span class="text-[11px] text-zinc-500 hidden sm:inline" style="font-family: 'IBM Plex Mono', monospace">Events processed: 2.1M · MTTR: 4.2min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Trusted By ── -->
    <section class="border-y border-zinc-200 dark:border-[#1a1a1a]">
      <div class="mx-auto max-w-7xl px-6 py-8">
        <p class="text-center text-[11px] uppercase tracking-widest text-zinc-400 dark:text-[#4a4a4a] mb-6" style="font-family: 'IBM Plex Mono', monospace">
          Trusted by enterprise security teams
        </p>
        <div class="flex items-center justify-center flex-wrap gap-8 opacity-50 dark:opacity-30">
          <img v-for="(logo, i) in COMPANY_LOGOS" :key="i" :src="logo" :alt="'Company ' + (i + 1)" class="h-8 object-contain grayscale" />
        </div>
      </div>
    </section>

    <!-- ── Section 1 — Platform Capabilities ── -->
    <section id="platform" class="py-16 lg:py-24 bg-white dark:bg-[#090909]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-14">
          <span class="inline-block text-[11px] uppercase tracking-widest text-zinc-400 dark:text-[#4a4a4a] mb-4" style="font-family: 'IBM Plex Mono', monospace">Platform</span>
          <h2 class="text-2xl lg:text-3xl font-bold text-[#111] dark:text-[#f0f0f0]" style="font-family: 'IBM Plex Sans', sans-serif">
            Enterprise-grade security, unified
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            v-for="(cap, idx) in CAPABILITIES"
            :key="idx"
            :class="cn(
              'flex flex-col p-6 border rounded-lg hover:border-zinc-300 dark:hover:border-[#333] transition-colors',
              'bg-white dark:bg-[#181818] border-zinc-200 dark:border-[#242424]'
            )"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="text-zinc-600 dark:text-zinc-400">
                <!-- Shield icon -->
                <svg v-if="cap.icon === 'shield'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <!-- Lock icon -->
                <svg v-else-if="cap.icon === 'lock'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <!-- Clipboard icon -->
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  <path d="M9 14l2 2 4-4" />
                </svg>
              </div>
              <h3 class="text-base font-bold text-[#111] dark:text-[#f0f0f0]" style="font-family: 'IBM Plex Sans', sans-serif">{{ cap.title }}</h3>
            </div>

            <p class="text-sm leading-relaxed text-[#555] dark:text-[#808080] mb-4">{{ cap.description }}</p>

            <div class="mt-auto text-xs font-semibold text-zinc-200 bg-zinc-800 px-3 py-2 rounded" style="font-family: 'IBM Plex Mono', monospace">
              {{ cap.metric }}
            </div>

            <!-- Code snippet -->
            <div v-if="cap.code" class="mt-4 rounded bg-[#0d0d0d] border border-[#242424] overflow-hidden">
              <div class="flex items-center justify-between px-3 py-1.5 border-b border-[#242424]">
                <span class="text-[9px] uppercase tracking-widest text-zinc-500" style="font-family: 'IBM Plex Mono', monospace">YAML</span>
              </div>
              <pre class="p-3 text-[11px] text-zinc-400 overflow-x-auto leading-relaxed" style="font-family: 'IBM Plex Mono', monospace">{{ cap.code }}</pre>
            </div>

            <!-- Zero trust diagram -->
            <div v-if="cap.diagram" class="mt-4 flex items-center justify-center gap-2 p-4 rounded bg-[#0d0d0d] border border-[#242424]" style="font-family: 'IBM Plex Mono', monospace">
              <span class="text-[11px] text-zinc-400">User</span>
              <span class="text-zinc-600">→</span>
              <span class="px-2 py-1 text-[10px] border border-zinc-600 rounded text-zinc-300">verified?</span>
              <span class="text-zinc-600">→</span>
              <div class="flex flex-col gap-1">
                <span class="flex items-center gap-1 text-[10px] text-green-500">✓ Application</span>
                <span class="flex items-center gap-1 text-[10px] text-red-500">✗ Blocked</span>
              </div>
            </div>

            <!-- Compliance checks -->
            <div v-if="cap.compliance" class="mt-4 flex flex-col gap-1.5 p-4 rounded bg-[#0d0d0d] border border-[#242424]">
              <div
                v-for="(check, i) in COMPLIANCE_CHECKS"
                :key="i"
                class="flex items-center justify-between text-[11px]"
                style="font-family: 'IBM Plex Mono', monospace"
              >
                <span class="text-zinc-400">{{ check.name }}</span>
                <span :class="check.status === 'pass' ? 'text-green-500' : 'text-amber-500'">
                  {{ check.status === 'pass' ? '● Passing' : '● Review needed' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 2 — Threat Intelligence Feed ── -->
    <section class="py-16 lg:py-24 bg-[#f0f0f0] dark:bg-[#090909] border-y border-zinc-200 dark:border-[#1a1a1a]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex items-center gap-3 mb-8">
          <h2 class="text-lg font-bold tracking-wider uppercase text-[#111] dark:text-[#f0f0f0]" style="font-family: 'IBM Plex Sans', sans-serif">
            Global Threat Feed
          </h2>
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span class="text-[10px] text-green-500/70 ml-1" style="font-family: 'IBM Plex Mono', monospace">LIVE</span>
        </div>

        <div class="rounded-lg border bg-white dark:bg-[#0d0d0d] border-zinc-200 dark:border-[#1a1a1a] overflow-hidden" style="font-family: 'IBM Plex Mono', monospace">
          <div
            v-for="(event, idx) in THREAT_INTEL_EVENTS"
            :key="idx"
            :class="cn(
              'flex flex-wrap items-start gap-x-4 gap-y-1 px-4 py-3 text-[12px] leading-relaxed',
              idx !== THREAT_INTEL_EVENTS.length - 1 && 'border-b border-zinc-100 dark:border-[#1a1a1a]'
            )"
          >
            <span class="text-zinc-400 dark:text-[#4a4a4a] whitespace-nowrap">{{ event.time }}</span>
            <span :class="cn('inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase', severityColor(event.level))">{{ event.level }}</span>
            <span class="text-zinc-600 dark:text-zinc-400">{{ event.actor }}: {{ event.detail }}</span>
            <span class="text-zinc-400 dark:text-zinc-500">{{ event.extra }}</span>
            <span
              v-if="event.level === 'CRITICAL'"
              class="ml-auto text-[10px] text-green-500/80 bg-green-500/10 px-2 py-0.5 rounded-sm whitespace-nowrap"
            >Sentinel customers: PROTECTED</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 3 — Enterprise Proof ── -->
    <section id="solutions" class="py-16 lg:py-24 bg-white dark:bg-[#090909]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-14">
          <h2 class="text-2xl lg:text-3xl font-bold text-[#111] dark:text-[#f0f0f0]" style="font-family: 'IBM Plex Sans', sans-serif">
            Trusted by enterprise security teams
          </h2>
          <p class="mt-3 text-sm text-[#555] dark:text-[#808080]">
            Real incidents. Real outcomes. Measured in seconds, not hours.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(cs, idx) in CASE_STUDIES"
            :key="idx"
            :class="cn('flex flex-col p-6 border rounded-lg', 'bg-[#fafafa] dark:bg-[#111111] border-zinc-200 dark:border-[#242424]')"
          >
            <div class="flex items-center gap-2 mb-4">
              <span class="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-[#4a4a4a]" style="font-family: 'IBM Plex Mono', monospace">{{ cs.industry }}</span>
              <span class="text-zinc-300 dark:text-zinc-600">·</span>
              <span class="text-[10px] text-zinc-400 dark:text-[#4a4a4a]" style="font-family: 'IBM Plex Mono', monospace">{{ cs.size }}</span>
            </div>
            <p class="text-sm text-[#555] dark:text-[#808080] mb-4 flex-1">{{ cs.threat }}</p>
            <div class="border-t border-zinc-200 dark:border-[#242424] pt-4">
              <span class="block text-2xl font-bold text-[#111] dark:text-zinc-200 tabular-nums" style="font-family: 'IBM Plex Mono', monospace">{{ cs.metric }}</span>
              <span class="text-[11px] text-[#555] dark:text-[#808080]">{{ cs.outcome }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Section 4 — Integration Ecosystem ── -->
    <section id="integrations" class="py-16 lg:py-24 bg-[#fafafa] dark:bg-[#0d0d0d] border-y border-zinc-200 dark:border-[#1a1a1a]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-10">
          <h2 class="text-2xl lg:text-3xl font-bold text-[#111] dark:text-[#f0f0f0]" style="font-family: 'IBM Plex Sans', sans-serif">
            Works with your existing stack
          </h2>
          <p class="mt-3 text-sm text-[#555] dark:text-[#808080]">
            Native integrations with the security tools your team already uses.
          </p>
        </div>

        <!-- Category tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-10">
          <button
            v-for="category in Object.keys(INTEGRATIONS)"
            :key="category"
            @click="activeCategory = category"
            :class="cn(
              'px-4 py-1.5 text-xs uppercase tracking-wider rounded transition-all',
              activeCategory === category
                ? 'bg-[#111] dark:bg-zinc-200 text-white dark:text-[#090909]'
                : 'bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500'
            )"
            style="font-family: 'IBM Plex Mono', monospace"
          >{{ category }}</button>
        </div>

        <!-- Integration cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div
            v-for="(name, idx) in INTEGRATIONS[activeCategory]"
            :key="idx"
            :class="cn(
              'flex items-center justify-center p-4 rounded-lg border text-sm font-medium',
              'bg-white dark:bg-[#181818] border-zinc-200 dark:border-[#242424]',
              'text-[#111] dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-[#333] transition-colors'
            )"
          >{{ name }}</div>
        </div>
      </div>
    </section>

    <!-- ── Section 5 — Pricing ── -->
    <section id="pricing" class="py-16 lg:py-24 bg-white dark:bg-[#090909]">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-14">
          <h2 class="text-2xl lg:text-3xl font-bold text-[#111] dark:text-[#f0f0f0]" style="font-family: 'IBM Plex Sans', sans-serif">
            Enterprise pricing, no surprises
          </h2>
          <p class="mt-3 text-sm text-[#555] dark:text-[#808080]">30-day free trial. No credit card required.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div
            v-for="(tier, idx) in PRICING_TIERS"
            :key="idx"
            :class="cn(
              'flex flex-col p-6 border rounded-lg',
              tier.highlight
                ? 'bg-[#111] dark:bg-[#181818] border-zinc-600 dark:border-zinc-500 ring-1 ring-zinc-500/20'
                : 'bg-[#fafafa] dark:bg-[#111111] border-zinc-200 dark:border-[#242424]'
            )"
          >
            <h3
              :class="cn('text-lg font-bold', tier.highlight ? 'text-white dark:text-[#f0f0f0]' : 'text-[#111] dark:text-[#f0f0f0]')"
              style="font-family: 'IBM Plex Sans', sans-serif"
            >{{ tier.name }}</h3>
            <span
              :class="cn('text-[11px] mt-1', tier.highlight ? 'text-zinc-400' : 'text-zinc-500 dark:text-[#4a4a4a]')"
              style="font-family: 'IBM Plex Mono', monospace"
            >{{ tier.scope }}</span>

            <ul class="mt-6 flex flex-col gap-2.5 flex-1">
              <li
                v-for="(f, i) in tier.features"
                :key="i"
                :class="cn('flex items-start gap-2 text-sm', tier.highlight ? 'text-zinc-300' : 'text-[#555] dark:text-[#808080]')"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" :stroke="tier.highlight ? '#22c55e' : '#808080'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 flex-shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ f }}
              </li>
            </ul>

            <a
              href="#"
              :class="cn(
                'mt-8 inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded transition-colors',
                tier.highlight
                  ? 'bg-zinc-200 text-[#090909] hover:bg-white'
                  : 'border border-zinc-300 dark:border-zinc-700 text-[#111] dark:text-zinc-300 hover:border-zinc-500 dark:hover:border-zinc-500'
              )"
            >{{ tier.cta }}</a>
          </div>
        </div>

        <!-- Deployment badges -->
        <div class="flex flex-wrap items-center justify-center gap-3 mt-10">
          <span class="text-[11px] text-zinc-400 dark:text-[#4a4a4a] mr-2" style="font-family: 'IBM Plex Mono', monospace">
            Deployment options:
          </span>
          <span
            v-for="opt in DEPLOYMENT_OPTIONS"
            :key="opt"
            :class="cn(
              'inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase',
              'border border-zinc-300 text-zinc-500 bg-zinc-100',
              'dark:border-zinc-700 dark:text-zinc-400 dark:bg-zinc-800/50'
            )"
          >{{ opt }}</span>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="py-16 lg:py-24 bg-[#111] dark:bg-[#0d0d0d] border-y border-zinc-800 dark:border-[#1a1a1a]">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <h2 class="text-2xl lg:text-3xl font-bold text-white" style="font-family: 'IBM Plex Sans', sans-serif">
          Your infrastructure is under attack right now.
        </h2>
        <p class="mt-4 text-base text-zinc-400 max-w-xl mx-auto">
          The question isn't whether you'll face a breach — it's whether you'll detect it in seconds or discover it in months.
        </p>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <a href="#" class="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold rounded bg-zinc-200 text-[#090909] hover:bg-white transition-colors">
            Request a demo
          </a>
          <a href="#" class="inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded border border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white transition-colors">
            Talk to an expert
          </a>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="bg-[#fafafa] dark:bg-[#090909] border-t border-zinc-200 dark:border-[#1a1a1a]">
      <div class="mx-auto max-w-7xl px-6 py-14">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
          <!-- Brand -->
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2 mb-4">
              <span class="inline-block w-2 h-2 bg-red-500" />
              <span class="text-sm font-bold tracking-[0.1em] text-[#111] dark:text-[#f0f0f0]" style="font-family: 'IBM Plex Sans', sans-serif">SENTINEL</span>
            </div>
            <p class="text-xs text-[#555] dark:text-[#808080] leading-relaxed max-w-[200px]">
              Enterprise cybersecurity that detects, responds, and adapts.
            </p>
            <div class="flex items-center gap-3 mt-4">
              <a href="#" class="text-zinc-400 dark:text-zinc-600 hover:text-[#111] dark:hover:text-zinc-300 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" class="text-zinc-400 dark:text-zinc-600 hover:text-[#111] dark:hover:text-zinc-300 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          <!-- Link columns -->
          <div v-for="(group, idx) in FOOTER_GROUPS" :key="idx">
            <p class="text-[11px] font-bold uppercase tracking-widest text-[#111] dark:text-zinc-300 mb-3" style="font-family: 'IBM Plex Sans', sans-serif">{{ group.title }}</p>
            <ul class="flex flex-col gap-2">
              <li v-for="(link, i) in group.links" :key="i">
                <a :href="link.href" class="text-sm text-[#555] dark:text-[#808080] hover:text-[#111] dark:hover:text-zinc-200 transition-colors">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom -->
        <div class="mt-12 pt-6 border-t border-zinc-200 dark:border-[#1a1a1a] flex flex-wrap items-center justify-between gap-4">
          <span class="text-xs text-zinc-400 dark:text-[#4a4a4a]">
            © {{ new Date().getFullYear() }} Sentinel Security, Inc. All rights reserved.
          </span>
          <div class="flex items-center gap-4">
            <a
              v-for="(label, i) in LEGAL_LINKS"
              :key="i"
              href="#"
              class="text-xs text-zinc-400 dark:text-[#4a4a4a] hover:text-[#111] dark:hover:text-zinc-300 transition-colors"
            >{{ label }}</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
