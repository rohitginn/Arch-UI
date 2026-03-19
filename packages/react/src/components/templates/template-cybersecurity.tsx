'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG — no external icon lib)                          */
/* ------------------------------------------------------------------ */

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconClipboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Live Pulse Dot                                                      */
/* ------------------------------------------------------------------ */

function PulseDot({ color = 'bg-green-500' }: { color?: string }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', color)} />
      <span className={cn('relative inline-flex rounded-full h-2 w-2', color)} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Severity Tag                                                        */
/* ------------------------------------------------------------------ */

function SeverityTag({ level }: { level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO' }) {
  const colors = {
    CRITICAL: 'bg-red-500/15 text-red-500 dark:bg-red-500/20 dark:text-red-400',
    HIGH: 'bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    MEDIUM: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/15 dark:text-amber-400',
    INFO: 'bg-blue-500/15 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400',
  };
  return (
    <span className={cn('inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase', colors[level])}>
      {level}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Compliance Badge                                                    */
/* ------------------------------------------------------------------ */

function ComplianceBadge({ label }: { label: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase',
      'border border-zinc-700 text-zinc-400 bg-zinc-800/50',
      'dark:border-zinc-700 dark:text-zinc-400 dark:bg-zinc-800/50',
      'light:border-zinc-300 light:text-zinc-500 light:bg-zinc-100',
    )}>
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Threat Map (simplified SVG)                                         */
/* ------------------------------------------------------------------ */

function ThreatMap() {
  const [dots, setDots] = React.useState<Array<{ id: number; x: number; y: number; age: number }>>([]);
  const nextId = React.useRef(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        const newDots = prev
          .map(d => ({ ...d, age: d.age + 1 }))
          .filter(d => d.age < 8);
        newDots.push({
          id: nextId.current++,
          x: 10 + Math.random() * 80,
          y: 15 + Math.random() * 70,
          age: 0,
        });
        return newDots;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[140px] bg-[#0a0a0a] dark:bg-[#0a0a0a] rounded overflow-hidden">
      {/* Simplified world map outline */}
      <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-20">
        {/* Continents as simplified paths */}
        <path d="M30,25 Q35,20 45,22 L50,20 Q55,18 60,22 L65,25 Q60,35 55,40 L45,38 Q35,32 30,25Z" stroke="#333" fill="none" strokeWidth="0.5" />
        <path d="M55,40 Q58,45 60,55 L55,65 Q50,60 48,50 Q50,45 55,40Z" stroke="#333" fill="none" strokeWidth="0.5" />
        <path d="M70,20 Q80,15 95,18 L100,22 Q105,28 110,25 L120,22 Q130,18 140,22 L145,30 Q150,40 145,50 L135,45 Q130,40 120,42 L110,38 Q100,35 90,38 L80,35 Q72,30 70,20Z" stroke="#333" fill="none" strokeWidth="0.5" />
        <path d="M145,50 Q150,55 160,52 L170,55 Q175,60 170,65 L160,70 Q155,72 150,68 L145,60 Q142,55 145,50Z" stroke="#333" fill="none" strokeWidth="0.5" />
        <path d="M15,40 Q20,38 30,42 L35,48 Q30,55 25,52 L18,48 Q14,45 15,40Z" stroke="#333" fill="none" strokeWidth="0.5" />
      </svg>

      {/* Threat dots */}
      {dots.map(dot => (
        <span
          key={dot.id}
          className="absolute"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {dot.age < 2 ? (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
          ) : (
            <span className="inline-flex rounded-full h-1 w-1 bg-red-500/60" />
          )}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Threat Feed (scrolling events)                                      */
/* ------------------------------------------------------------------ */

const INITIAL_EVENTS = [
  { level: 'CRITICAL' as const, text: 'CVE-2024-8847 — 192.168.1.104 — Blocked', time: '2s ago' },
  { level: 'HIGH' as const, text: 'Brute force attempt — admin@corp.com', time: '12s ago' },
  { level: 'MEDIUM' as const, text: 'Unusual auth pattern — 8 accounts', time: '34s ago' },
  { level: 'INFO' as const, text: 'New device registered — Seattle, WA', time: '1m ago' },
  { level: 'HIGH' as const, text: 'SQL injection attempt — /api/users', time: '2m ago' },
  { level: 'CRITICAL' as const, text: 'CVE-2024-9214 — CVSS 9.8 — Patched', time: '3m ago' },
];

function ThreatFeed() {
  return (
    <div className="flex flex-col gap-1.5 overflow-hidden max-h-[180px]" style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}>
      {INITIAL_EVENTS.map((event, idx) => (
        <div key={idx} className="flex items-start gap-2 text-[11px] font-mono leading-relaxed">
          <SeverityTag level={event.level} />
          <span className="text-zinc-400 dark:text-zinc-400">{event.text}</span>
          <span className="ml-auto text-zinc-600 dark:text-zinc-600 whitespace-nowrap">{event.time}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Live Threat Dashboard Mockup                                        */
/* ------------------------------------------------------------------ */

function ThreatDashboard() {
  const [threatCount, setThreatCount] = React.useState(4847);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => prev + Math.floor(Math.random() * 8) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(
      'w-full rounded-lg border overflow-hidden',
      'bg-[#111111] border-[#242424]',
      'dark:bg-[#111111] dark:border-[#242424]',
      'shadow-2xl shadow-black/30',
    )}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#242424]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold tracking-wider text-zinc-200">SENTINEL SOC — LIVE</span>
          <PulseDot color="bg-green-500" />
        </div>
        <span className="text-[10px] font-mono text-green-500/80">All systems normal</span>
      </div>

      {/* Content: Map + Feed */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,280px] gap-0">
        {/* Threat map */}
        <div className="p-3">
          <ThreatMap />
        </div>

        {/* Severity feed */}
        <div className="border-l border-[#242424] p-3">
          <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Recent Events</p>
          <ThreatFeed />
        </div>
      </div>

      {/* Bottom metrics */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#242424] bg-[#0d0d0d]">
        <span className="text-[11px] font-mono text-zinc-300 tabular-nums">
          Threats blocked today: <span className="text-zinc-100 font-semibold">{threatCount.toLocaleString()}</span>
        </span>
        <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">Events processed: 2.1M · MTTR: 4.2min</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Threat Intelligence Feed                                            */
/* ------------------------------------------------------------------ */

const THREAT_INTEL_EVENTS = [
  { time: '2024-11-15 14:23:07 UTC', actor: 'Lazarus Group', detail: 'C2 infrastructure', extra: '2 new IOCs', level: 'CRITICAL' as const },
  { time: '2024-11-15 14:22:51 UTC', actor: 'Vulnerability', detail: 'CVE-2024-9214 · CVSS: 9.8', extra: 'Patch available', level: 'CRITICAL' as const },
  { time: '2024-11-15 14:21:33 UTC', actor: 'Phishing campaign', detail: 'Targeting Finance sector', extra: '14 new domains', level: 'HIGH' as const },
  { time: '2024-11-15 14:19:12 UTC', actor: 'Malware', detail: 'New Cobalt Strike variant', extra: 'Signature updated', level: 'HIGH' as const },
  { time: '2024-11-15 14:17:45 UTC', actor: 'Reconnaissance', detail: 'Port scanning from AS12345', extra: '3 target ranges', level: 'MEDIUM' as const },
  { time: '2024-11-15 14:15:02 UTC', actor: 'Intel update', detail: 'CISA advisory AA24-320B', extra: 'Review recommended', level: 'INFO' as const },
];

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const CAPABILITIES = [
  {
    icon: <IconShield />,
    title: 'Threat Detection & Response',
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
    icon: <IconLock />,
    title: 'Zero Trust Access',
    description: 'Continuous identity verification at every access point. Device posture, behavioral biometrics, and contextual signals determine trust — not VPN status.',
    metric: '99.8% unauthorized access blocked',
    diagram: true,
  },
  {
    icon: <IconClipboard />,
    title: 'Compliance Automation',
    description: 'Automated evidence collection and continuous monitoring for SOC 2 Type II, ISO 27001, FedRAMP, HIPAA, and PCI DSS. Audit prep time drops from weeks to hours.',
    metric: '87% reduction in audit prep time',
    compliance: true,
  },
];

const CASE_STUDIES = [
  {
    industry: 'Healthcare',
    size: '8,400 endpoints',
    threat: 'Ransomware attack via compromised VPN credentials',
    outcome: 'Stopped in 47 seconds',
    metric: '47s',
  },
  {
    industry: 'Financial Services',
    size: '12,000 endpoints',
    threat: 'APT targeting customer PII via supply chain compromise',
    outcome: 'Zero data exfiltrated',
    metric: '0 bytes',
  },
  {
    industry: 'Manufacturing',
    size: '3,200 endpoints',
    threat: 'OT network lateral movement from compromised IT system',
    outcome: 'Contained before OT impact',
    metric: '2.1min',
  },
];

const INTEGRATIONS = {
  SIEM: ['Splunk', 'Microsoft Sentinel', 'QRadar', 'Elastic SIEM'],
  Cloud: ['AWS', 'Azure', 'GCP', 'Oracle Cloud'],
  Identity: ['Okta', 'Azure AD', 'Ping Identity', 'OneLogin'],
  Endpoint: ['CrowdStrike', 'SentinelOne', 'Carbon Black', 'Defender'],
  Ticketing: ['Jira', 'ServiceNow', 'PagerDuty', 'Opsgenie'],
};

const PRICING_TIERS = [
  {
    name: 'Essentials',
    scope: 'Up to 500 endpoints',
    features: ['Threat detection', 'Automated response', '24/7 monitoring', 'SOC 2 compliance', 'Email support', 'Cloud deployment'],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Professional',
    scope: 'Up to 5,000 endpoints',
    features: ['Everything in Essentials', 'Zero trust access', 'SIEM integration', 'Custom detection rules', 'Dedicated CSM', 'On-premise option'],
    cta: 'Request demo',
    highlight: true,
  },
  {
    name: 'Enterprise',
    scope: 'Unlimited endpoints',
    features: ['Everything in Professional', 'Threat intelligence feed', 'Compliance automation', 'Custom integrations', 'Air-gapped deployment', '24/7 incident response'],
    cta: 'Contact sales',
    highlight: false,
  },
];

const COMPANY_LOGOS = [
  'https://placehold.co/120x36/111/888?text=Acme+Corp',
  'https://placehold.co/120x36/111/888?text=Globex',
  'https://placehold.co/120x36/111/888?text=Initech',
  'https://placehold.co/120x36/111/888?text=Umbrella',
  'https://placehold.co/120x36/111/888?text=Stark+Ind',
  'https://placehold.co/120x36/111/888?text=Wayne+Ent',
];

const FOOTER_GROUPS = [
  {
    title: 'Platform',
    links: [
      { label: 'Threat Detection', href: '#' },
      { label: 'Zero Trust', href: '#' },
      { label: 'Incident Response', href: '#' },
      { label: 'Compliance', href: '#' },
      { label: 'Integrations', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Healthcare', href: '#' },
      { label: 'Financial Services', href: '#' },
      { label: 'Government', href: '#' },
      { label: 'Manufacturing', href: '#' },
      { label: 'Technology', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Threat Reports', href: '#' },
      { label: 'Webinars', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Trust Center', href: '#' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface CybersecurityTemplateProps {
  className?: string;
}

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
export function CybersecurityTemplate({ className }: CybersecurityTemplateProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>('SIEM');

  return (
    <div
      className={cn(
        'min-h-screen antialiased',
        'bg-[#f5f5f5] dark:bg-[#090909]',
        'text-[#111111] dark:text-[#f0f0f0]',
      className)}
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}
    >
      {/* ── Announcement Bar ── */}
      <div className="w-full bg-[#111111] dark:bg-[#0d0d0d] border-b border-[#1a1a1a] dark:border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl flex items-center justify-center py-1.5 px-4">
          <span
            className="text-[11px] font-mono tracking-wide text-red-500/70"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Emergency Response: +1-800-SENTINEL · 24/7
          </span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <TemplateNav
        dark
        logo={
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-red-500 flex-shrink-0" />
            <span
              className="text-sm font-bold tracking-[0.1em] text-[#f0f0f0] dark:text-[#f0f0f0] light:text-[#111]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              SENTINEL
            </span>
          </div>
        }
        links={[
          { label: 'Platform', href: '#platform' },
          { label: 'Solutions', href: '#solutions' },
          { label: 'Integrations', href: '#integrations' },
          { label: 'Resources', href: '#resources' },
          { label: 'Pricing', href: '#pricing' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <a
              href="#"
              className={cn(
                'hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-[13px] font-medium',
                'border border-zinc-600 dark:border-zinc-700 text-zinc-300 dark:text-zinc-300 rounded',
                'hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors',
              )}
            >
              Contact Sales
            </a>
            <a
              href="#"
              className={cn(
                'inline-flex items-center justify-center px-4 py-1.5 text-[13px] font-semibold rounded',
                'bg-zinc-200 dark:bg-zinc-200 text-[#090909] dark:text-[#090909]',
                'hover:bg-white dark:hover:bg-white transition-colors',
              )}
            >
              Request Demo
            </a>
          </div>
        }
      />

      {/* ── Hero — The Operations Center ── */}
      <section className="relative w-full overflow-hidden">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr,45fr] gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="flex flex-col">
              <span
                className="inline-flex items-center gap-2 text-xs font-mono text-green-500 mb-6 tracking-wide"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                <PulseDot color="bg-green-500" />
                NOW MONITORING: 4,200+ enterprise customers
              </span>

              <h1
                className={cn(
                  'font-bold tracking-tight leading-[1.1]',
                  'text-[#111] dark:text-[#f0f0f0]',
                )}
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                }}
              >
                Stop threats before they become incidents.
              </h1>

              <p className="mt-5 text-base lg:text-lg leading-relaxed text-[#555] dark:text-[#808080] max-w-xl">
                Sentinel&apos;s AI threat engine detects, correlates, and responds to cyberattacks in real time — before your security team even knows to look.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="#"
                  className={cn(
                    'inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded',
                    'bg-zinc-200 dark:bg-zinc-200 text-[#090909]',
                    'hover:bg-white dark:hover:bg-white transition-colors',
                  )}
                >
                  Request a demo
                </a>
                <a
                  href="#"
                  className={cn(
                    'inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded',
                    'border border-zinc-400 dark:border-zinc-600 text-[#555] dark:text-zinc-400',
                    'hover:border-zinc-600 dark:hover:border-zinc-400 hover:text-[#111] dark:hover:text-zinc-200 transition-colors',
                  )}
                >
                  See the platform
                </a>
              </div>

              {/* Compliance badges */}
              <div className="flex flex-wrap gap-2 mt-8">
                {['SOC 2 Type II', 'ISO 27001', 'FedRAMP', 'HIPAA', 'PCI DSS'].map(cert => (
                  <ComplianceBadge key={cert} label={cert} />
                ))}
              </div>
            </div>

            {/* Right — Dashboard mockup */}
            <div className="w-full">
              <ThreatDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted by logos ── */}
      <section className="border-y border-zinc-200 dark:border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-center text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-[#4a4a4a] mb-6"
             style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Trusted by enterprise security teams
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8 opacity-50 dark:opacity-30">
            {COMPANY_LOGOS.map((logo, i) => (
              <img key={i} src={logo} alt={`Company ${i + 1}`} className="h-8 object-contain grayscale" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 1 — Platform Capabilities ── */}
      <section id="platform" className="py-16 lg:py-24 bg-white dark:bg-[#090909]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span
              className="inline-block text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-[#4a4a4a] mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Platform
            </span>
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111] dark:text-[#f0f0f0]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Enterprise-grade security, unified
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex flex-col p-6 border rounded-lg',
                  'bg-white dark:bg-[#181818]',
                  'border-zinc-200 dark:border-[#242424]',
                  'hover:border-zinc-300 dark:hover:border-[#333] transition-colors',
                )}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-zinc-600 dark:text-zinc-400">{cap.icon}</div>
                  <h3 className="text-base font-bold text-[#111] dark:text-[#f0f0f0]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    {cap.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-[#555] dark:text-[#808080] mb-4">{cap.description}</p>

                <div
                  className="mt-auto text-xs font-mono font-semibold text-zinc-200 dark:text-zinc-200 bg-zinc-800 dark:bg-zinc-800 px-3 py-2 rounded"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {cap.metric}
                </div>

                {/* Code snippet for threat detection */}
                {cap.code && (
                  <div className="mt-4 rounded bg-[#0d0d0d] border border-[#242424] overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#242424]">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">YAML</span>
                    </div>
                    <pre className="p-3 text-[11px] font-mono text-zinc-400 overflow-x-auto leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {cap.code}
                    </pre>
                  </div>
                )}

                {/* Zero trust diagram */}
                {cap.diagram && (
                  <div className="mt-4 flex items-center justify-center gap-2 p-4 rounded bg-[#0d0d0d] border border-[#242424]">
                    <span className="text-[11px] font-mono text-zinc-400">User</span>
                    <span className="text-zinc-600">→</span>
                    <span className="px-2 py-1 text-[10px] font-mono border border-zinc-600 rounded text-zinc-300">verified?</span>
                    <span className="text-zinc-600">→</span>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-[10px] font-mono text-green-500">✓ Application</span>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-red-500">✗ Blocked</span>
                    </div>
                  </div>
                )}

                {/* Compliance checks */}
                {cap.compliance && (
                  <div className="mt-4 flex flex-col gap-1.5 p-4 rounded bg-[#0d0d0d] border border-[#242424]">
                    {[
                      { name: 'SOC 2 Type II', status: 'pass' },
                      { name: 'ISO 27001', status: 'pass' },
                      { name: 'HIPAA', status: 'warn' },
                      { name: 'PCI DSS', status: 'pass' },
                    ].map((check, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] font-mono" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        <span className="text-zinc-400">{check.name}</span>
                        <span className={check.status === 'pass' ? 'text-green-500' : 'text-amber-500'}>
                          {check.status === 'pass' ? '● Passing' : '● Review needed'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2 — Threat Intelligence Feed ── */}
      <section className="py-16 lg:py-24 bg-[#f0f0f0] dark:bg-[#090909] border-y border-zinc-200 dark:border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-8">
            <h2
              className="text-lg font-bold tracking-wider uppercase text-[#111] dark:text-[#f0f0f0]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Global Threat Feed
            </h2>
            <PulseDot color="bg-green-500" />
            <span className="text-[10px] font-mono text-green-500/70 ml-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              LIVE
            </span>
          </div>

          <div
            className="rounded-lg border bg-white dark:bg-[#0d0d0d] border-zinc-200 dark:border-[#1a1a1a] overflow-hidden"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {THREAT_INTEL_EVENTS.map((event, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex flex-wrap items-start gap-x-4 gap-y-1 px-4 py-3 text-[12px] leading-relaxed',
                  idx !== THREAT_INTEL_EVENTS.length - 1 && 'border-b border-zinc-100 dark:border-[#1a1a1a]',
                )}
              >
                <span className="text-zinc-400 dark:text-[#4a4a4a] whitespace-nowrap">{event.time}</span>
                <SeverityTag level={event.level} />
                <span className="text-zinc-600 dark:text-zinc-400">{event.actor}: {event.detail}</span>
                <span className="text-zinc-400 dark:text-zinc-500">{event.extra}</span>
                {event.level === 'CRITICAL' && (
                  <span className="ml-auto text-[10px] text-green-500/80 bg-green-500/10 px-2 py-0.5 rounded-sm whitespace-nowrap">
                    Sentinel customers: PROTECTED
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 — Enterprise Proof ── */}
      <section id="solutions" className="py-16 lg:py-24 bg-white dark:bg-[#090909]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111] dark:text-[#f0f0f0]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Trusted by enterprise security teams
            </h2>
            <p className="mt-3 text-sm text-[#555] dark:text-[#808080]">
              Real incidents. Real outcomes. Measured in seconds, not hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex flex-col p-6 border rounded-lg',
                  'bg-[#fafafa] dark:bg-[#111111]',
                  'border-zinc-200 dark:border-[#242424]',
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-[#4a4a4a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {cs.industry}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-600">·</span>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-[#4a4a4a]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {cs.size}
                  </span>
                </div>

                <p className="text-sm text-[#555] dark:text-[#808080] mb-4 flex-1">{cs.threat}</p>

                <div className="border-t border-zinc-200 dark:border-[#242424] pt-4">
                  <span
                    className="block text-2xl font-bold text-[#111] dark:text-zinc-200 font-mono tabular-nums"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {cs.metric}
                  </span>
                  <span className="text-[11px] text-[#555] dark:text-[#808080]">{cs.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 — Integration Ecosystem ── */}
      <section id="integrations" className="py-16 lg:py-24 bg-[#fafafa] dark:bg-[#0d0d0d] border-y border-zinc-200 dark:border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111] dark:text-[#f0f0f0]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Works with your existing stack
            </h2>
            <p className="mt-3 text-sm text-[#555] dark:text-[#808080]">
              Native integrations with the security tools your team already uses.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {Object.keys(INTEGRATIONS).map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-all',
                  activeCategory === category
                    ? 'bg-[#111] dark:bg-zinc-200 text-white dark:text-[#090909]'
                    : 'bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500',
                )}
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Integration cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {(INTEGRATIONS as Record<string, string[]>)[activeCategory]?.map((name, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex items-center justify-center p-4 rounded-lg border text-sm font-medium',
                  'bg-white dark:bg-[#181818]',
                  'border-zinc-200 dark:border-[#242424]',
                  'text-[#111] dark:text-zinc-300',
                  'hover:border-zinc-400 dark:hover:border-[#333] transition-colors',
                )}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5 — Pricing ── */}
      <section id="pricing" className="py-16 lg:py-24 bg-white dark:bg-[#090909]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2
              className="text-2xl lg:text-3xl font-bold text-[#111] dark:text-[#f0f0f0]"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              Enterprise pricing, no surprises
            </h2>
            <p className="mt-3 text-sm text-[#555] dark:text-[#808080]">
              30-day free trial. No credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex flex-col p-6 border rounded-lg',
                  tier.highlight
                    ? 'bg-[#111] dark:bg-[#181818] border-zinc-600 dark:border-zinc-500 ring-1 ring-zinc-500/20'
                    : 'bg-[#fafafa] dark:bg-[#111111] border-zinc-200 dark:border-[#242424]',
                )}
              >
                <h3
                  className={cn(
                    'text-lg font-bold',
                    tier.highlight ? 'text-white dark:text-[#f0f0f0]' : 'text-[#111] dark:text-[#f0f0f0]',
                  )}
                  style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                  {tier.name}
                </h3>
                <span
                  className={cn(
                    'text-[11px] font-mono mt-1',
                    tier.highlight ? 'text-zinc-400' : 'text-zinc-500 dark:text-[#4a4a4a]',
                  )}
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {tier.scope}
                </span>

                <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                  {tier.features.map((f, i) => (
                    <li
                      key={i}
                      className={cn(
                        'flex items-start gap-2 text-sm',
                        tier.highlight ? 'text-zinc-300' : 'text-[#555] dark:text-[#808080]',
                      )}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.highlight ? '#22c55e' : '#808080'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={cn(
                    'mt-8 inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded transition-colors',
                    tier.highlight
                      ? 'bg-zinc-200 text-[#090909] hover:bg-white'
                      : 'border border-zinc-300 dark:border-zinc-700 text-[#111] dark:text-zinc-300 hover:border-zinc-500 dark:hover:border-zinc-500',
                  )}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Deployment badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <span className="text-[11px] font-mono text-zinc-400 dark:text-[#4a4a4a] mr-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Deployment options:
            </span>
            {['Cloud', 'On-Premise', 'Hybrid', 'Air-Gapped'].map(opt => (
              <ComplianceBadge key={opt} label={opt} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24 bg-[#111] dark:bg-[#0d0d0d] border-y border-zinc-800 dark:border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2
            className="text-2xl lg:text-3xl font-bold text-white"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            Your infrastructure is under attack right now.
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto">
            The question isn&apos;t whether you&apos;ll face a breach — it&apos;s whether you&apos;ll detect it in seconds or discover it in months.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold rounded bg-zinc-200 text-[#090909] hover:bg-white transition-colors"
            >
              Request a demo
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded border border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white transition-colors"
            >
              Talk to an expert
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#fafafa] dark:bg-[#090909] border-t border-zinc-200 dark:border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 bg-red-500" />
                <span className="text-sm font-bold tracking-[0.1em] text-[#111] dark:text-[#f0f0f0]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  SENTINEL
                </span>
              </div>
              <p className="text-xs text-[#555] dark:text-[#808080] leading-relaxed max-w-[200px]">
                Enterprise cybersecurity that detects, responds, and adapts.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="text-zinc-400 dark:text-zinc-600 hover:text-[#111] dark:hover:text-zinc-300 transition-colors">
                  <IconLinkedIn />
                </a>
                <a href="#" className="text-zinc-400 dark:text-zinc-600 hover:text-[#111] dark:hover:text-zinc-300 transition-colors">
                  <IconTwitter />
                </a>
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_GROUPS.map((group, idx) => (
              <div key={idx}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#111] dark:text-zinc-300 mb-3" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {group.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-sm text-[#555] dark:text-[#808080] hover:text-[#111] dark:hover:text-zinc-200 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-[#1a1a1a] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-zinc-400 dark:text-[#4a4a4a]">
              © {new Date().getFullYear()} Sentinel Security, Inc. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              {['Privacy Policy', 'Terms of Service', 'Security', 'Trust Center'].map((label, i) => (
                <a key={i} href="#" className="text-xs text-zinc-400 dark:text-[#4a4a4a] hover:text-[#111] dark:hover:text-zinc-300 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
