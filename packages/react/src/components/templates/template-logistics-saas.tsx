'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG)                                                  */
/* ------------------------------------------------------------------ */

const IconPackage = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
  </svg>
);

const IconShipment = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
    <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" /><circle cx="7" cy="18" r="2" /><path d="M15 18H9" /><circle cx="17" cy="18" r="2" />
  </svg>
);

const IconAlert = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" /><path d="M12 17h.01" />
  </svg>
);

const IconChart = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const IconGlobe = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const IconShield = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const IconMenu = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const IconX = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  SVG World Map (simplified)                                          */
/* ------------------------------------------------------------------ */

function WorldMapSVG() {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-full opacity-20" fill="none" stroke="currentColor" strokeWidth="0.5">
      {/* Simplified continents outlines */}
      {/* North America */}
      <path d="M120 80 L180 60 L220 80 L240 120 L220 160 L180 180 L140 200 L120 180 L100 140 L110 100Z" className="stroke-slate-500 dark:stroke-slate-600" fill="none" />
      {/* South America */}
      <path d="M180 220 L200 200 L220 220 L230 280 L210 340 L190 360 L170 320 L160 260Z" className="stroke-slate-500 dark:stroke-slate-600" fill="none" />
      {/* Europe */}
      <path d="M380 60 L420 50 L440 70 L430 100 L410 110 L390 100 L380 80Z" className="stroke-slate-500 dark:stroke-slate-600" fill="none" />
      {/* Africa */}
      <path d="M400 140 L440 120 L460 150 L470 220 L450 300 L420 320 L390 280 L380 200Z" className="stroke-slate-500 dark:stroke-slate-600" fill="none" />
      {/* Asia */}
      <path d="M480 40 L600 30 L680 60 L700 120 L660 160 L600 180 L540 160 L500 120 L460 80Z" className="stroke-slate-500 dark:stroke-slate-600" fill="none" />
      {/* Australia */}
      <path d="M640 280 L700 270 L720 300 L700 330 L660 330 L640 310Z" className="stroke-slate-500 dark:stroke-slate-600" fill="none" />
    </svg>
  );
}

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
  {
    title: 'Real-time Tracking',
    description: 'Every shipment, every carrier, every handoff — tracked in real time across your entire supply chain network.',
    icon: 'shipment',
    metric: '847 active shipments monitored',
  },
  {
    title: 'Predictive Alerts',
    description: '72-hour advance notice of disruptions using AI-powered risk analysis across weather, geopolitical, and operational data.',
    icon: 'alert',
    metric: '72hr advance warning',
  },
  {
    title: 'Supplier Portal',
    description: 'Collaborative visibility with your supply base. Shared timelines, document exchange, and performance scorecards.',
    icon: 'globe',
    metric: '340+ suppliers connected',
  },
  {
    title: 'Analytics & Reporting',
    description: 'Carrier performance, lead time analysis, OTIF tracking, and cost optimization — all in customizable dashboards.',
    icon: 'chart',
    metric: '67% disruption reduction',
  },
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
  {
    industry: 'Manufacturing',
    company: 'Global Automotive Parts',
    size: '2,400 suppliers',
    challenge: 'Multi-tier supply chain with zero visibility beyond Tier 1 suppliers, leading to $12M in annual disruption costs.',
    outcome: '67% reduction in disruption costs',
    metric: '$8.1M',
    label: 'annual savings',
    period: 'in 6 months',
  },
  {
    industry: 'Retail',
    company: 'National Consumer Goods',
    size: '800 SKUs, 14 DCs',
    challenge: 'Frequent stockouts and overstocks due to lack of real-time inventory visibility across distribution centers.',
    outcome: '43% improvement in OTIF delivery',
    metric: '98.2%',
    label: 'on-time delivery rate',
    period: 'in 90 days',
  },
  {
    industry: 'Food & Beverage',
    company: 'Premium Organics Co.',
    size: '120 cold-chain routes',
    challenge: 'Temperature excursion events causing $3M in spoiled goods annually with limited cold-chain monitoring.',
    outcome: '91% reduction in spoilage',
    metric: '91%',
    label: 'less waste',
    period: 'in 4 months',
  },
];

const FOOTER_GROUPS = [
  { title: 'Platform', links: ['Real-time Tracking', 'Predictive Alerts', 'Supplier Portal', 'Analytics', 'API'] },
  { title: 'Solutions', links: ['Manufacturing', 'Retail', 'Food & Beverage', '3PL', 'Government'] },
  { title: 'Resources', links: ['Documentation', 'API Reference', 'Blog', 'Case Studies', 'Webinars'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact', 'Partners', 'Trust Center'] },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

/* ── Navbar ── */
function LogisticsNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        'border-b',
        scrolled
          ? 'bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-xl border-zinc-200 dark:border-white/5'
          : 'bg-white dark:bg-[#0d1117] border-zinc-100 dark:border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700 dark:bg-slate-300">
            <IconPackage className="w-4 h-4 text-white dark:text-slate-900" />
          </div>
          <span className="text-base font-bold tracking-tight text-zinc-950 dark:text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Nexflow
          </span>
        </div>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {['Platform', 'Solutions', 'Integrations', 'Pricing', 'Resources'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-150"
              style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            Contact sales
          </a>
          <a
            href="#demo"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            Request demo
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-zinc-600 dark:text-zinc-400"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-100 dark:border-white/5 bg-white dark:bg-[#0d1117] px-6 py-4 space-y-3">
          {['Platform', 'Solutions', 'Integrations', 'Pricing', 'Resources'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-zinc-600 dark:text-zinc-400 py-2" onClick={() => setMobileOpen(false)}>
              {link}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <a href="#contact" className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">Contact sales</a>
            <a href="#demo" className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900">Request demo</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Animated Map Node ── */
function MapNode({ x, y, status, label }: { x: number; y: number; status: 'on-time' | 'at-risk' | 'delayed'; label: string }) {
  const color = status === 'on-time' ? '#22c55e' : status === 'at-risk' ? '#f59e0b' : '#ef4444';
  return (
    <g>
      {/* Pulse ring for at-risk and delayed */}
      {status !== 'on-time' && (
        <circle cx={x} cy={y} r="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="4;12" dur={status === 'delayed' ? '1.2s' : '1.5s'} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur={status === 'delayed' ? '1.2s' : '1.5s'} repeatCount="indefinite" />
        </circle>
      )}
      <circle cx={x} cy={y} r="4" fill={color} />
      <text x={x} y={y - 10} textAnchor="middle" className="text-[8px] fill-slate-400 dark:fill-slate-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {label}
      </text>
    </g>
  );
}

/* ── Route Path + animated particle ── */
function RoutePath({ route }: { route: ShipmentRoute }) {
  const color = route.status === 'on-time' ? '#22c55e' : route.status === 'at-risk' ? '#f59e0b' : '#ef4444';
  const midX = (route.from.x + route.to.x) / 2;
  const midY = Math.min(route.from.y, route.to.y) - 40;
  const pathD = `M${route.from.x},${route.from.y} Q${midX},${midY} ${route.to.x},${route.to.y}`;

  return (
    <g>
      <path d={pathD} fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      {/* Animated dot along path */}
      <circle r="3" fill={color}>
        <animateMotion dur="4s" repeatCount="indefinite" path={pathD} />
      </circle>
    </g>
  );
}

/* ── Alert Feed Item ── */
function AlertItem({ alert, index }: { alert: typeof ALERTS[0]; index: number }) {
  const borderColor = alert.color === 'amber' ? 'border-amber-500/30 dark:border-amber-400/30' : alert.color === 'emerald' ? 'border-emerald-500/30 dark:border-emerald-400/30' : 'border-red-500/30 dark:border-red-400/30';
  const textColor = alert.color === 'amber' ? 'text-amber-600 dark:text-amber-400' : alert.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400';

  return (
    <div
      className={cn('flex items-start gap-2 px-3 py-2 rounded-lg border-l-2 text-xs', borderColor)}
      style={{ animationDelay: `${index * 200}ms`, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <span className={textColor}>{alert.icon}</span>
      <span className={cn('leading-relaxed', textColor)}>{alert.text}</span>
    </div>
  );
}

/* ── Feature Card ── */
function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
  const iconMap: Record<string, React.ReactNode> = {
    shipment: <IconShipment className="w-5 h-5" />,
    alert: <IconAlert className="w-5 h-5" />,
    globe: <IconGlobe className="w-5 h-5" />,
    chart: <IconChart className="w-5 h-5" />,
  };

  return (
    <div className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161b22] p-6 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/20 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {iconMap[feature.icon]}
        </div>
        <h3 className="text-lg font-bold text-zinc-950 dark:text-white" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
          {feature.title}
        </h3>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {feature.description}
      </p>
      {/* Mini dashboard mockup */}
      <div className="rounded-lg bg-zinc-50 dark:bg-[#0d1117] border border-zinc-100 dark:border-zinc-800 p-3 group-hover:scale-[1.01] transition-transform duration-300">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>LIVE</span>
        </div>
        <div className="text-sm font-bold font-mono text-slate-700 dark:text-slate-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {feature.metric}
        </div>
      </div>
    </div>
  );
}

/* ── ROI Calculator ── */
function ROICalculator() {
  const [annualSpend, setAnnualSpend] = React.useState(500000);
  const [supplierCount, setSupplierCount] = React.useState(200);
  const [disruptionFreq, setDisruptionFreq] = React.useState(12);
  const [costPerDisruption, setCostPerDisruption] = React.useState(50000);

  const annualDisruptionCost = disruptionFreq * costPerDisruption;
  const potentialSavings = Math.round(annualDisruptionCost * 0.67);
  const roi = Math.round((potentialSavings / (annualSpend * 0.03)) * 100);
  const paybackMonths = Math.max(1, Math.round(12 / (roi / 100)));

  const formatCurrency = (n: number) => `$${n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : `${(n / 1000).toFixed(0)}K`}`;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        {[
          { label: 'Annual logistics spend', value: annualSpend, min: 100000, max: 10000000, step: 100000, setter: setAnnualSpend, formatter: formatCurrency },
          { label: 'Number of suppliers', value: supplierCount, min: 10, max: 2000, step: 10, setter: setSupplierCount, formatter: (n: number) => n.toString() },
          { label: 'Avg disruptions per year', value: disruptionFreq, min: 1, max: 52, step: 1, setter: setDisruptionFreq, formatter: (n: number) => n.toString() },
          { label: 'Cost per disruption', value: costPerDisruption, min: 5000, max: 500000, step: 5000, setter: setCostPerDisruption, formatter: formatCurrency },
        ].map(input => (
          <div key={input.label}>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-zinc-600 dark:text-zinc-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                {input.label}
              </label>
              <span className="text-sm font-bold font-mono text-zinc-950 dark:text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {input.formatter(input.value)}
              </span>
            </div>
            <input
              type="range"
              min={input.min}
              max={input.max}
              step={input.step}
              value={input.value}
              onChange={e => input.setter(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-200 dark:bg-zinc-700 accent-slate-700 dark:accent-slate-300"
            />
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161b22] p-6 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-4" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
          Projected Results
        </h3>
        {[
          { label: 'Annual disruption cost', value: formatCurrency(annualDisruptionCost), color: 'text-red-600 dark:text-red-400' },
          { label: 'Potential savings with Nexflow', value: formatCurrency(potentialSavings), color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Estimated ROI', value: `${roi}%`, color: 'text-slate-700 dark:text-slate-300' },
          { label: 'Payback period', value: `${paybackMonths} months`, color: 'text-amber-600 dark:text-amber-400' },
        ].map(result => (
          <div key={result.label} className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
            <span className="text-sm text-zinc-600 dark:text-zinc-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              {result.label}
            </span>
            <span className={cn('text-xl font-bold', result.color)} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {result.value}
            </span>
          </div>
        ))}
        <a
          href="#contact"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          Get your detailed savings analysis <IconArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

/* ── Case Study Card ── */
function CaseStudyCard({ study }: { study: typeof CASE_STUDIES[0] }) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161b22] overflow-hidden">
      <div className="grid lg:grid-cols-5 gap-0">
        {/* Left — info */}
        <div className="lg:col-span-3 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              {study.industry}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-500 font-mono" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {study.size}
            </span>
          </div>
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            {study.company}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            {study.challenge}
          </p>
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Read full case study <IconArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
        {/* Right — metric */}
        <div className="lg:col-span-2 bg-zinc-50 dark:bg-[#0d1117] p-6 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-zinc-100 dark:border-zinc-800">
          <div className="text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {study.metric}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-500 mt-1" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            {study.label}
          </div>
          <div className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5 font-mono" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {study.period}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface LogisticsSaasTemplateProps {
  /** Additional className for the page wrapper */
  className?: string;
}

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
export function LogisticsSaasTemplate({ className }: LogisticsSaasTemplateProps) {
  const [activeIntCategory, setActiveIntCategory] = React.useState('ERP');
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeAlertIdx, setActiveAlertIdx] = React.useState(0);
  const [shipmentCount, setShipmentCount] = React.useState(847);

  // Cycle alerts
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveAlertIdx(prev => (prev + 1) % ALERTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Increment shipment count
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShipmentCount(prev => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        'min-h-screen antialiased',
        'bg-zinc-50 text-zinc-950',
        'dark:bg-[#0d1117] dark:text-white',
        className,
      )}
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* ── Navbar ── */}
      <LogisticsNav />

      {/* ── Hero — Split Layout ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.06]">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <div>
              <span className="inline-flex items-center mb-6 rounded-full px-3.5 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Real-time supply chain intelligence
              </span>

              <h1
                className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.08] text-zinc-950 dark:text-white"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                See every shipment.{' '}
                <span className="text-slate-500 dark:text-slate-400">Prevent every disruption.</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl">
                Nexflow connects your entire supply chain — from PO to delivery — in a single live map.
                Know about disruptions 72 hours before they happen.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="#demo"
                  className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                >
                  Request a demo
                </a>
                <a
                  href="#platform"
                  className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
                >
                  See it live →
                </a>
              </div>

              {/* ROI callout box */}
              <div className="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  Customers reduce supply chain disruptions by <strong>67%</strong> in 90 days
                </p>
              </div>
            </div>

            {/* Right — Live Supply Chain Map */}
            <div className="rounded-2xl bg-[#0d1117] dark:bg-[#161b22] border border-zinc-800 dark:border-zinc-700 overflow-hidden shadow-2xl shadow-black/20">
              {/* Map header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 dark:border-zinc-700">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>NEXFLOW · LIVE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[10px] font-mono text-amber-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {shipmentCount} active · 23 at risk · 4 critical
                </div>
              </div>

              {/* Map */}
              <div className="relative aspect-[16/10] bg-[#0a0e14]">
                <WorldMapSVG />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
                  {ROUTES.map(route => (
                    <RoutePath key={route.id} route={route} />
                  ))}
                  {ROUTES.flatMap(route => [
                    <MapNode key={`from-${route.id}`} x={route.from.x} y={route.from.y} status={route.status} label={route.from.label} />,
                    <MapNode key={`to-${route.id}`} x={route.to.x} y={route.to.y} status={route.status} label={route.to.label} />,
                  ])}
                </svg>

                {/* Metrics overlay */}
                <div className="absolute top-3 right-3 text-right space-y-1">
                  <div className="text-xs font-mono text-zinc-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    47 arriving today
                  </div>
                </div>
              </div>

              {/* Alert Feed */}
              <div className="px-4 py-3 space-y-2 border-t border-zinc-800 dark:border-zinc-700 max-h-[140px] overflow-hidden">
                {ALERTS.slice(activeAlertIdx, activeAlertIdx + 3).map((alert, i) => (
                  <AlertItem key={`${alert.text}-${i}`} alert={alert} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1 — Platform Features ── */}
      <section id="platform" className="py-16 lg:py-24 border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              One platform. Total visibility.
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              From raw material to final delivery — monitor, predict, and optimize every leg of your supply chain.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map(feature => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2 — Interactive Demo ── */}
      <section id="demo" className="py-16 lg:py-24 bg-white dark:bg-[#161b22] border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Experience Nexflow without signing up.
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Walk through a guided product tour and see how supply chain teams use Nexflow every day.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0d1117] overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full bg-amber-500 transition-all duration-500 ease-out"
                style={{ width: `${((activeStep + 1) / DEMO_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Step content */}
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left — step info */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 text-sm font-bold font-mono" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {DEMO_STEPS[activeStep].step}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      Step {activeStep + 1} of {DEMO_STEPS.length}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-950 dark:text-white mb-3">
                    {DEMO_STEPS[activeStep].title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {DEMO_STEPS[activeStep].description}
                  </p>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setActiveStep(Math.min(DEMO_STEPS.length - 1, activeStep + 1))}
                      disabled={activeStep === DEMO_STEPS.length - 1}
                      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                </div>

                {/* Right — demo mockup */}
                <div className="rounded-xl bg-white dark:bg-[#161b22] border border-zinc-200 dark:border-zinc-800 p-4 min-h-[280px]">
                  {/* Terminal-style demo preview */}
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      nexflow-dashboard
                    </span>
                  </div>
                  <div className="space-y-2 font-mono text-xs text-zinc-500 dark:text-zinc-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {activeStep === 0 && (
                      <>
                        <div><span className="text-amber-500">$</span> nexflow search PO-2847</div>
                        <div className="text-zinc-400">Found 3 shipments for PO-2847:</div>
                        <div className="pl-3 text-emerald-500">✓ SH-4829 — Shanghai → Rotterdam — In transit</div>
                        <div className="pl-3 text-amber-500">⚠ SH-4830 — Rotterdam → Hamburg — At risk</div>
                        <div className="pl-3 text-emerald-500">✓ SH-4831 — Hamburg → Munich — Scheduled</div>
                      </>
                    )}
                    {activeStep === 1 && (
                      <>
                        <div><span className="text-amber-500">$</span> nexflow inspect SH-4830</div>
                        <div className="text-amber-500">⚠ DELAY PREDICTION: +3-5 days</div>
                        <div className="text-zinc-400">Root cause: Port congestion at Rotterdam</div>
                        <div className="text-zinc-400">Confidence: 87%</div>
                        <div className="text-emerald-500">ALT ROUTE: Rotterdam → Hamburg via rail (-2 days)</div>
                      </>
                    )}
                    {activeStep === 2 && (
                      <>
                        <div><span className="text-amber-500">$</span> nexflow alert create --shipment SH-4830</div>
                        <div className="text-zinc-400">Alert type: [email, slack, webhook]</div>
                        <div className="text-emerald-500">✓ Alert configured for SH-4830</div>
                        <div className="text-zinc-400">Next check: 15 minutes</div>
                      </>
                    )}
                    {activeStep === 3 && (
                      <>
                        <div><span className="text-amber-500">$</span> nexflow report --type carrier --period Q4</div>
                        <div className="text-zinc-400">Generating carrier performance report...</div>
                        <div className="text-emerald-500">✓ Report ready</div>
                        <div className="pl-3 text-zinc-400">OTIF Rate: 94.2% (+3.1% vs Q3)</div>
                        <div className="pl-3 text-zinc-400">Avg Lead Time: 14.3 days (-1.7 days)</div>
                        <div className="pl-3 text-zinc-400">Cost/Shipment: $847 (-12%)</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step dots */}
            <div className="flex items-center justify-center gap-2 pb-6">
              {DEMO_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    activeStep === i ? 'bg-amber-500 w-6' : 'bg-zinc-300 dark:bg-zinc-600',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3 — Integrations ── */}
      <section id="integrations" className="py-16 lg:py-24 border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Connects to your entire stack.
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              No rip-and-replace. Average integration time: 2 weeks.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {Object.keys(INTEGRATIONS).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveIntCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  activeIntCategory === cat
                    ? 'bg-slate-700 dark:bg-slate-300 text-white dark:text-slate-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Integration logos grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {INTEGRATIONS[activeIntCategory]?.map(name => (
              <div
                key={name}
                className="group flex items-center justify-center h-20 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161b22] hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-200"
              >
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 — ROI Calculator ── */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#161b22] border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Calculate your supply chain risk exposure.
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Use your own numbers to see the potential impact of real-time supply chain intelligence.
            </p>
          </div>

          <ROICalculator />
        </div>
      </section>

      {/* ── Section 5 — Enterprise Proof / Case Studies ── */}
      <section className="py-16 lg:py-24 border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Trusted by supply chain leaders.
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Real results from teams managing millions in logistics spend.
            </p>
          </div>

          {/* Company logos row */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12 opacity-50">
            {['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Stark Industries', 'Wayne Enterprises'].map(name => (
              <span key={name} className="text-sm font-medium text-zinc-400 dark:text-zinc-600 hover:opacity-100 transition-opacity cursor-default" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                {name}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            {CASE_STUDIES.map(study => (
              <CaseStudyCard key={study.industry} study={study} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section id="contact" className="py-16 lg:py-24 bg-[#0d1117] dark:bg-[#0a0e14] border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
            See your supply chain in real time.
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            Book a 30-minute call with our team. We&apos;ll show you how Nexflow connects to your existing
            stack and surfaces insights from day one.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-medium bg-slate-300 text-slate-900 hover:bg-slate-200 transition-colors"
            >
              Request a demo
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-medium border border-zinc-700 text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Contact sales
            </a>
          </div>

          <p className="mt-6 text-xs text-zinc-600">
            No commitment · 2-week integration · See results in 90 days
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-zinc-50 dark:bg-[#0d1117]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid sm:grid-cols-5 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-7 h-7 rounded-md bg-slate-700 dark:bg-slate-300">
                  <IconPackage className="w-3.5 h-3.5 text-white dark:text-slate-900" />
                </div>
                <span className="text-sm font-bold text-zinc-950 dark:text-white">Nexflow</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
                Supply chain intelligence for enterprise operations.
              </p>
            </div>

            {/* Link groups */}
            {FOOTER_GROUPS.map(group => (
              <div key={group.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500 mb-3" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
              © {new Date().getFullYear()} Nexflow. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Privacy', 'Terms', 'Security', 'Trust Center'].map(link => (
                <a key={link} href="#" className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-950 dark:hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

LogisticsSaasTemplate.displayName = 'LogisticsSaasTemplate';
