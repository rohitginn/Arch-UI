import { useState, useEffect, useRef } from 'react';
import { CodeBlock } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Climate Tech / Sustainability — "Verdant Systems"                  */
/*  Full website template following the prompt #7 spec:                */
/*  Palette: Sage (Emerald) + Stone | Light-clean primary              */
/*  Font: Sora (headings), Inter (body), DM Mono (data)               */
/* ------------------------------------------------------------------ */

/* ────────────────────────────────────────────────────────────────────
   Inline style helpers — Sora font import
   ──────────────────────────────────────────────────────────────────── */
const fontLink = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600;700&display=swap');
  `}</style>
);

/* ────────────────────────────────────────────────────────────────────
   Reusable sub-components for the website template
   ──────────────────────────────────────────────────────────────────── */

function VerdantNavbar({ isDark }: { isDark: boolean }) {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Sub-banner */}
      {bannerVisible && (
        <div className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium ${isDark ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-50 text-emerald-700'}`}>
          <span>🌱 We've helped customers eliminate 2.1M tons of CO₂. New: Scope 3 reporting module →</span>
          <button
            onClick={() => setBannerVisible(false)}
            className={`ml-2 rounded px-1.5 py-0.5 text-[10px] ${isDark ? 'hover:bg-emerald-900' : 'hover:bg-emerald-100'}`}
          >
            ✕
          </button>
        </div>
      )}
      {/* Main navbar */}
      <div className={`flex items-center justify-between border-b px-6 py-3.5 backdrop-blur-xl ${isDark ? 'border-emerald-900/50 bg-[#0a120a]/90' : 'border-emerald-100 bg-white/90'}`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          {/* Geometric leaf icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
            <path d="M14 2C8 6 4 12 4 18c0 4.4 3.6 8 8 8h4c4.4 0 8-3.6 8-8 0-6-4-12-10-16z" fill={isDark ? '#4ade80' : '#16a34a'} opacity="0.9" />
            <path d="M14 8v14M10 16c2-2 4-4 6-6" stroke={isDark ? '#0a120a' : 'white'} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif', color: isDark ? '#f0fdf4' : '#09090b' }}>
            Verdant
          </span>
        </div>

        {/* Center nav links */}
        <div className="hidden items-center gap-7 md:flex">
          {['Platform', 'Solutions', 'Results', 'Resources', 'Company'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium transition-colors duration-150"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: isDark ? '#a1a1aa' : '#52525b',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? '#f0fdf4' : '#09090b')}
              onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? '#a1a1aa' : '#52525b')}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          <button
            className="hidden rounded-lg border px-4 py-2 text-sm font-medium transition-colors sm:block"
            style={{
              fontFamily: 'Inter, sans-serif',
              borderColor: isDark ? '#166534' : '#16a34a',
              color: isDark ? '#4ade80' : '#16a34a',
              backgroundColor: 'transparent',
            }}
          >
            Request pilot
          </button>
          <button
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
            style={{
              fontFamily: 'Inter, sans-serif',
              backgroundColor: isDark ? '#22c55e' : '#16a34a',
            }}
          >
            Get a quote
          </button>
        </div>
      </div>
    </nav>
  );
}

function EnergyDashboard({ isDark }: { isDark: boolean }) {
  const [kwh, setKwh] = useState(48723);
  const [aiMessage, setAiMessage] = useState('AI is analyzing HVAC zone 4 — adjusting setpoints...');
  const aiMessages = [
    'AI is analyzing HVAC zone 4 — adjusting setpoints...',
    'Optimizing lighting schedule for Floor 3...',
    'Weather forecast integration: pre-cooling activated...',
    'Demand response event detected — reducing load by 15%...',
    'Occupancy sensors: Zone 2 vacant — HVAC scaled down...',
  ];
  const messageIndexRef = useRef(0);

  useEffect(() => {
    const kwhInterval = setInterval(() => {
      setKwh((prev) => Math.max(prev - Math.floor(Math.random() * 3 + 1), 45000));
    }, 2000);
    const aiInterval = setInterval(() => {
      messageIndexRef.current = (messageIndexRef.current + 1) % aiMessages.length;
      setAiMessage(aiMessages[messageIndexRef.current]);
    }, 8000);
    return () => {
      clearInterval(kwhInterval);
      clearInterval(aiInterval);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: isDark ? '#111a11' : '#1a2a1a' }}>
      {/* Dashboard header */}
      <div className="flex items-center justify-between border-b border-emerald-900/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-emerald-400" style={{ fontFamily: 'DM Mono, monospace' }}>
            Verdant AI — Live
          </span>
        </div>
        <span className="text-[10px] text-emerald-600" style={{ fontFamily: 'DM Mono, monospace' }}>
          Building: HQ Tower One
        </span>
      </div>

      {/* KWh display */}
      <div className="px-5 pt-5">
        <div className="text-xs text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>Current Consumption</div>
        <div className="mt-1 text-3xl font-bold tabular-nums text-emerald-400" style={{ fontFamily: 'DM Mono, monospace' }}>
          {kwh.toLocaleString()} <span className="text-sm font-normal text-emerald-600">kWh</span>
        </div>
      </div>

      {/* SVG chart */}
      <div className="px-5 py-4">
        <svg viewBox="0 0 400 120" className="w-full" style={{ overflow: 'visible' }}>
          {/* Grid lines */}
          {[0, 30, 60, 90].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#166534" strokeWidth="0.5" opacity="0.3" />
          ))}
          {/* Baseline (red) */}
          <path
            d="M0,20 C50,22 100,18 150,25 C200,30 250,28 300,32 C350,35 380,30 400,33"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            opacity="0.7"
          >
            <animate attributeName="stroke-dashoffset" from="600" to="0" dur="1.5s" fill="freeze" />
            <animate attributeName="stroke-dasharray" from="600" to="600" dur="0.01s" fill="freeze" />
          </path>
          {/* Optimized (emerald) */}
          <path
            d="M0,50 C50,55 100,48 150,60 C200,65 250,58 300,70 C350,75 380,68 400,72"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2"
          >
            <animate attributeName="stroke-dashoffset" from="600" to="0" dur="1.5s" fill="freeze" />
            <animate attributeName="stroke-dasharray" from="600" to="600" dur="0.01s" fill="freeze" />
          </path>
          {/* Savings area */}
          <path
            d="M0,20 C50,22 100,18 150,25 C200,30 250,28 300,32 C350,35 380,30 400,33
               L400,72 C380,68 350,75 300,70 C250,58 200,65 150,60 C100,48 50,55 0,50 Z"
            fill="#22c55e"
            opacity="0.15"
          >
            <animate attributeName="opacity" from="0" to="0.15" dur="0.3s" begin="1.5s" fill="freeze" />
          </path>
          {/* Labels */}
          <text x="5" y="17" fill="#ef4444" fontSize="8" fontFamily="DM Mono, monospace">Baseline</text>
          <text x="5" y="47" fill="#4ade80" fontSize="8" fontFamily="DM Mono, monospace">Optimized</text>
        </svg>
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-3 gap-px border-t border-emerald-900/30" style={{ backgroundColor: 'rgba(22,101,52,0.15)' }}>
        {[
          { label: "Today's savings", value: '$2,847' },
          { label: 'CO₂ avoided', value: '4.2 tons' },
          { label: 'Efficiency', value: '94%' },
        ].map(({ label, value }) => (
          <div key={label} className="px-3 py-3" style={{ backgroundColor: isDark ? '#111a11' : '#1a2a1a' }}>
            <div className="text-[10px] text-emerald-600" style={{ fontFamily: 'Inter, sans-serif' }}>{label}</div>
            <div className="mt-0.5 text-sm font-bold tabular-nums text-emerald-400" style={{ fontFamily: 'DM Mono, monospace' }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* AI ticker */}
      <div className="border-t border-emerald-900/30 px-5 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[11px] text-emerald-500 transition-opacity duration-300" style={{ fontFamily: 'DM Mono, monospace' }}>
            {aiMessage}
          </span>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-16 lg:py-28" style={{ backgroundColor: isDark ? '#0a120a' : '#f8faf8' }}>
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle at 1px 1px, rgba(74,222,128,0.06) 1px, transparent 0)'
            : 'radial-gradient(circle at 1px 1px, rgba(22,163,74,0.04) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
        {/* LEFT — Copy */}
        <div className="flex-1 space-y-6 lg:max-w-[55%]">
          {/* Eyebrow */}
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              fontFamily: 'Inter, sans-serif',
              backgroundColor: isDark ? 'rgba(74,222,128,0.1)' : '#f0fdf4',
              color: isDark ? '#4ade80' : '#16a34a',
              border: isDark ? '1px solid rgba(74,222,128,0.2)' : '1px solid #bbf7d0',
            }}
          >
            AI-powered energy management
          </span>

          {/* Headline */}
          <h1
            className="text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl xl:text-6xl"
            style={{
              fontFamily: 'Sora, sans-serif',
              color: isDark ? '#f0fdf4' : '#09090b',
            }}
          >
            Cut energy costs
            <br />
            by half.{' '}
            <span style={{ color: isDark ? '#4ade80' : '#16a34a' }}>Automatically.</span>
          </h1>

          {/* Sub */}
          <p
            className="max-w-xl text-base leading-relaxed lg:text-lg"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: isDark ? '#a1a1aa' : '#52525b',
              lineHeight: '1.7',
            }}
          >
            Verdant's AI learns your building's energy patterns and continuously
            optimizes HVAC, lighting, and electrical systems — without retrofits
            or behavioral change.
          </p>

          {/* Impact callout */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: isDark ? 'rgba(74,222,128,0.06)' : '#f0fdf4',
              border: isDark ? '1px solid rgba(74,222,128,0.15)' : '1px solid #bbf7d0',
            }}
          >
            <p
              className="text-base font-bold"
              style={{
                fontFamily: 'Sora, sans-serif',
                color: isDark ? '#f0fdf4' : '#09090b',
              }}
            >
              Customers see an average of{' '}
              <span style={{ color: isDark ? '#4ade80' : '#16a34a', fontFamily: 'DM Mono, monospace' }}>$847,000</span>{' '}
              in annual savings.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ fontFamily: 'Inter, sans-serif', backgroundColor: isDark ? '#22c55e' : '#16a34a' }}
            >
              Calculate your savings
            </button>
            <button
              className="rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
              style={{
                fontFamily: 'Inter, sans-serif',
                borderColor: isDark ? '#166534' : '#16a34a',
                color: isDark ? '#4ade80' : '#16a34a',
              }}
            >
              See a live demo
            </button>
          </div>
        </div>

        {/* RIGHT — Dashboard */}
        <div className="w-full max-w-md flex-shrink-0 lg:max-w-[45%]">
          <EnergyDashboard isDark={isDark} />
        </div>
      </div>
    </section>
  );
}

function SavingsCalculator({ isDark }: { isDark: boolean }) {
  const [energySpend, setEnergySpend] = useState(500000);
  const [facilitySize, setFacilitySize] = useState(200000);

  const savingsRate = 0.384;
  const estimatedSavings = Math.round(energySpend * savingsRate);
  const paybackMonths = Math.max(6, Math.round(18 * (200000 / facilitySize)));
  const co2Reduction = Math.round((energySpend / 1200) * (facilitySize / 200000));
  const roi5Year = Math.round(((estimatedSavings * 5) / (energySpend * 0.15)) * 100);

  const formatCurrency = (val: number) => '$' + val.toLocaleString();
  const formatNumber = (val: number) => val.toLocaleString();

  return (
    <section className="px-6 py-20 lg:px-16" style={{ backgroundColor: isDark ? '#0a120a' : '#f8faf8' }}>
      <div className="mx-auto max-w-4xl">
        <h2
          className="text-center text-3xl font-extrabold tracking-tight lg:text-4xl"
          style={{ fontFamily: 'Sora, sans-serif', color: isDark ? '#f0fdf4' : '#09090b' }}
        >
          See your potential savings.
        </h2>

        <div className="mt-12 space-y-10">
          {/* Slider: Annual energy spend */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#a1a1aa' : '#52525b' }}>
                Annual energy spend
              </label>
              <span className="text-lg font-bold tabular-nums" style={{ fontFamily: 'DM Mono, monospace', color: isDark ? '#4ade80' : '#16a34a' }}>
                {formatCurrency(energySpend)}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={10000000}
              step={50000}
              value={energySpend}
              onChange={(e) => setEnergySpend(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full"
              style={{
                background: `linear-gradient(to right, ${isDark ? '#22c55e' : '#16a34a'} ${((energySpend - 100000) / (10000000 - 100000)) * 100}%, ${isDark ? '#1a2a1a' : '#d1fae5'} ${((energySpend - 100000) / (10000000 - 100000)) * 100}%)`,
              }}
            />
            <div className="mt-1 flex justify-between text-[10px]" style={{ fontFamily: 'DM Mono, monospace', color: isDark ? '#4a5568' : '#a1a1aa' }}>
              <span>$100K</span><span>$10M</span>
            </div>
          </div>

          {/* Slider: Facility size */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#a1a1aa' : '#52525b' }}>
                Facility size (sq ft)
              </label>
              <span className="text-lg font-bold tabular-nums" style={{ fontFamily: 'DM Mono, monospace', color: isDark ? '#4ade80' : '#16a34a' }}>
                {formatNumber(facilitySize)}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={2000000}
              step={10000}
              value={facilitySize}
              onChange={(e) => setFacilitySize(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full"
              style={{
                background: `linear-gradient(to right, ${isDark ? '#22c55e' : '#16a34a'} ${((facilitySize - 10000) / (2000000 - 10000)) * 100}%, ${isDark ? '#1a2a1a' : '#d1fae5'} ${((facilitySize - 10000) / (2000000 - 10000)) * 100}%)`,
              }}
            />
            <div className="mt-1 flex justify-between text-[10px]" style={{ fontFamily: 'DM Mono, monospace', color: isDark ? '#4a5568' : '#a1a1aa' }}>
              <span>10,000</span><span>2,000,000</span>
            </div>
          </div>

          {/* Results */}
          <div
            className="grid grid-cols-2 gap-4 rounded-2xl p-6 lg:grid-cols-4"
            style={{
              backgroundColor: isDark ? '#111a11' : 'white',
              border: isDark ? '1px solid rgba(74,222,128,0.15)' : '1px solid #bbf7d0',
            }}
          >
            {[
              { label: 'Estimated annual savings', value: formatCurrency(estimatedSavings) },
              { label: 'Payback period', value: `${paybackMonths} months` },
              { label: 'CO₂ reduction', value: `${co2Reduction} tons/yr` },
              { label: 'ROI over 5 years', value: `${roi5Year}%` },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold tabular-nums lg:text-3xl" style={{ fontFamily: 'DM Mono, monospace', color: isDark ? '#4ade80' : '#16a34a' }}>
                  {value}
                </div>
                <div className="mt-1 text-xs" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#71717a' : '#71717a' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              className="rounded-lg px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg"
              style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: isDark ? '#22c55e' : '#16a34a',
                boxShadow: isDark ? '0 0 20px rgba(34,197,94,0.2)' : 'none',
              }}
            >
              Get your detailed savings analysis →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ isDark }: { isDark: boolean }) {
  const steps = [
    {
      num: '01',
      title: 'Connect',
      desc: 'Integrates with your existing BMS, meters, and sensors. No hardware install required.',
      icon: '🔌',
    },
    {
      num: '02',
      title: 'Learn',
      desc: 'AI builds a digital twin of your building\'s energy signature over 14 days.',
      icon: '🧠',
    },
    {
      num: '03',
      title: 'Optimize',
      desc: 'Continuously adjusts setpoints in real time based on occupancy, weather, and price signals.',
      icon: '⚡',
    },
    {
      num: '04',
      title: 'Report',
      desc: 'Generates ESG reports, Scope 1 & 2 tracking, and utility bill validation automatically.',
      icon: '📊',
    },
  ];

  return (
    <section
      className="px-6 py-20 lg:px-16"
      style={{ backgroundColor: isDark ? '#111a11' : '#f0fdf4' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#4ade80' : '#16a34a' }}
          >
            How Verdant Works
          </span>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight lg:text-4xl"
            style={{ fontFamily: 'Sora, sans-serif', color: isDark ? '#f0fdf4' : '#09090b' }}
          >
            Four steps to energy intelligence
          </h2>
        </div>

        <div className="relative mt-16">
          {/* Connection line */}
          <div
            className="absolute left-0 right-0 top-10 hidden h-0.5 lg:block"
            style={{ backgroundColor: isDark ? 'rgba(74,222,128,0.15)' : '#bbf7d0' }}
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: isDark ? '#0a120a' : 'white',
                  border: isDark ? '1px solid rgba(74,222,128,0.1)' : '1px solid #d1fae5',
                }}
              >
                {/* Step number */}
                <div
                  className="mb-4 text-3xl font-bold"
                  style={{ fontFamily: 'DM Mono, monospace', color: isDark ? 'rgba(74,222,128,0.3)' : 'rgba(22,163,74,0.2)' }}
                >
                  {step.num}
                </div>
                {/* Icon */}
                <div className="mb-3 text-2xl">{step.icon}</div>
                {/* Title */}
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: 'Sora, sans-serif', color: isDark ? '#f0fdf4' : '#09090b' }}
                >
                  {step.title}
                </h3>
                {/* Desc */}
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#a1a1aa' : '#52525b', lineHeight: '1.7' }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudies({ isDark }: { isDark: boolean }) {
  const studies = [
    {
      type: 'Commercial Office Complex',
      size: '1.2M sq ft, 3 buildings',
      challenge: 'Aging HVAC systems driving $4.2M annual energy costs with no visibility into waste.',
      results: [
        { label: 'Energy reduction', value: '43%' },
        { label: 'Annual savings', value: '$1.2M' },
        { label: 'ROI in', value: '14 mo' },
      ],
      quote: '"Verdant paid for itself in the first year. We didn\'t replace a single piece of hardware."',
      author: 'Sarah Chen, VP Facilities',
    },
    {
      type: 'Manufacturing Plant',
      size: '800K sq ft, 24/7 operations',
      challenge: 'High baseline energy consumption with complex production schedules making optimization seem impossible.',
      results: [
        { label: 'Energy reduction', value: '38%' },
        { label: 'Annual savings', value: '$2.1M' },
        { label: 'ROI in', value: '11 mo' },
      ],
      quote: '"The AI adapted to our production cycles in ways our engineers never could manually."',
      author: 'David Park, Director of Operations',
    },
    {
      type: 'Hospital Network',
      size: '6 facilities, 2.4M sq ft total',
      challenge: 'Strict climate control requirements for patient care with 800+ HVAC zones per facility.',
      results: [
        { label: 'Energy reduction', value: '35%' },
        { label: 'Annual savings', value: '$3.8M' },
        { label: 'ROI in', value: '9 mo' },
      ],
      quote: '"Patient comfort improved while our energy bill dropped by a third. Remarkable."',
      author: 'Dr. Maria Gonzalez, CFO',
    },
  ];

  return (
    <section className="px-6 py-20 lg:px-16" style={{ backgroundColor: isDark ? '#0a120a' : '#f8faf8' }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#4ade80' : '#16a34a' }}
          >
            Proven Results
          </span>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight lg:text-4xl"
            style={{ fontFamily: 'Sora, sans-serif', color: isDark ? '#f0fdf4' : '#09090b' }}
          >
            Real impact. Real numbers.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {studies.map((study, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: isDark ? '#111a11' : 'white',
                border: isDark ? '1px solid rgba(74,222,128,0.1)' : '1px solid #d1fae5',
              }}
            >
              {/* Type & Size */}
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#4ade80' : '#16a34a' }}
                >
                  {study.type}
                </span>
                <p className="mt-0.5 text-xs" style={{ fontFamily: 'DM Mono, monospace', color: isDark ? '#71717a' : '#a1a1aa' }}>
                  {study.size}
                </p>
              </div>

              {/* Challenge */}
              <p className="mt-4 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#a1a1aa' : '#52525b', lineHeight: '1.7' }}>
                {study.challenge}
              </p>

              {/* Results */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {study.results.map((r) => (
                  <div key={r.label} className="text-center">
                    <div className="text-xl font-bold tabular-nums" style={{ fontFamily: 'DM Mono, monospace', color: isDark ? '#4ade80' : '#16a34a' }}>
                      {r.value}
                    </div>
                    <div className="mt-0.5 text-[10px]" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#71717a' : '#a1a1aa' }}>
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-auto pt-6">
                <p className="text-sm italic leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#d4d4d8' : '#3f3f46' }}>
                  {study.quote}
                </p>
                <p className="mt-2 text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#4ade80' : '#16a34a' }}>
                  — {study.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Integrations({ isDark }: { isDark: boolean }) {
  const categories = [
    {
      name: 'BMS Systems',
      items: ['Johnson Controls', 'Honeywell', 'Siemens', 'Schneider Electric', 'Tridium'],
    },
    {
      name: 'Utility & Meters',
      items: ['Itron', 'Landis+Gyr', 'Enel X', 'GridPoint', 'Lucid'],
    },
    {
      name: 'IoT & Sensors',
      items: ['Disruptive Tech', 'Enlighted', 'Verdigris', 'PointGrab', 'Comfy'],
    },
    {
      name: 'Cloud & Analytics',
      items: ['AWS', 'Azure', 'Google Cloud', 'Snowflake', 'Databricks'],
    },
  ];

  return (
    <section
      className="px-6 py-20 lg:px-16"
      style={{ backgroundColor: isDark ? '#111a11' : '#f0fdf4' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#4ade80' : '#16a34a' }}
          >
            40+ Integrations
          </span>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight lg:text-4xl"
            style={{ fontFamily: 'Sora, sans-serif', color: isDark ? '#f0fdf4' : '#09090b' }}
          >
            Works with your existing infrastructure.
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base"
            style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#a1a1aa' : '#52525b' }}
          >
            No rip-and-replace. Verdant connects to your existing building management systems, meters, and sensors in days — not months.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#4ade80' : '#16a34a' }}>
                {cat.name}
              </h3>
              <div className="mt-3 space-y-2">
                {cat.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      backgroundColor: isDark ? '#0a120a' : 'white',
                      border: isDark ? '1px solid rgba(74,222,128,0.08)' : '1px solid #d1fae5',
                      color: isDark ? '#d4d4d8' : '#3f3f46',
                    }}
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: isDark ? '#22c55e' : '#16a34a' }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactCounter({ isDark }: { isDark: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const counters = [
    { value: '2.1M', suffix: ' tons', label: 'CO₂ eliminated' },
    { value: '$847M', suffix: '', label: 'Customer savings generated' },
    { value: '4,200', suffix: '+', label: 'Buildings optimized' },
    { value: '11', suffix: ' countries', label: 'Operations worldwide' },
  ];

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24 lg:px-16"
      style={{ backgroundColor: isDark ? '#022c22' : '#052e16' }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="text-center text-3xl font-extrabold tracking-tight text-white lg:text-4xl"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Our collective impact.
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {counters.map((counter, i) => (
            <div
              key={counter.label}
              className="text-center transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div
                className="text-3xl font-bold tabular-nums text-emerald-400 lg:text-5xl"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                {counter.value}
                <span className="text-lg text-emerald-500 lg:text-2xl">{counter.suffix}</span>
              </div>
              <div
                className="mt-2 text-sm text-emerald-200/70"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {counter.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VerdantFooter({ isDark }: { isDark: boolean }) {
  return (
    <footer
      className="border-t px-6 py-12 lg:px-16"
      style={{
        backgroundColor: isDark ? '#0a120a' : '#f8faf8',
        borderColor: isDark ? 'rgba(74,222,128,0.1)' : '#d1fae5',
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left — Logo + tagline */}
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path d="M14 2C8 6 4 12 4 18c0 4.4 3.6 8 8 8h4c4.4 0 8-3.6 8-8 0-6-4-12-10-16z" fill={isDark ? '#4ade80' : '#16a34a'} opacity="0.9" />
              <path d="M14 8v14M10 16c2-2 4-4 6-6" stroke={isDark ? '#0a120a' : 'white'} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-base font-bold" style={{ fontFamily: 'Sora, sans-serif', color: isDark ? '#f0fdf4' : '#09090b' }}>
              Verdant Systems
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#71717a' : '#a1a1aa' }}>
            AI-powered energy management for commercial buildings and industrial facilities.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {[
            { title: 'Product', links: ['Platform', 'Integrations', 'Pricing', 'API Docs'] },
            { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
            { title: 'Resources', links: ['Case Studies', 'Webinars', 'ESG Reports', 'Support'] },
          ].map((col) => (
            <div key={col.title}>
              <h4
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#4ade80' : '#16a34a' }}
              >
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-150"
                      style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#a1a1aa' : '#52525b' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div
        className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t pt-6"
        style={{ borderColor: isDark ? 'rgba(74,222,128,0.08)' : '#d1fae5' }}
      >
        <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#52525b' : '#a1a1aa' }}>
          © 2025 Verdant Systems. All rights reserved.
        </span>
        <div className="flex gap-4 text-xs" style={{ fontFamily: 'Inter, sans-serif', color: isDark ? '#52525b' : '#a1a1aa' }}>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Security</a>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Full Website Preview
   ──────────────────────────────────────────────────────────────────── */
function ClimateTechWebsite({ isDark }: { isDark: boolean }) {
  return (
    <div style={{ backgroundColor: isDark ? '#0a120a' : '#f8faf8', minHeight: '100vh' }}>
      {fontLink}
      <VerdantNavbar isDark={isDark} />
      <HeroSection isDark={isDark} />
      <SavingsCalculator isDark={isDark} />
      <HowItWorks isDark={isDark} />
      <CaseStudies isDark={isDark} />
      <Integrations isDark={isDark} />
      <ImpactCounter isDark={isDark} />
      <VerdantFooter isDark={isDark} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
   React code string for ComponentPreview
   ──────────────────────────────────────────────────────────────────── */

const reactCode = `import { useState, useEffect, useRef } from 'react';

// ─── Design Tokens ──────────────────────────────────
// Light: bg #f8faf8 | surface white | accent emerald-600 (#16a34a)
// Dark:  bg #0a120a | surface #111a11 | accent emerald-400 (#4ade80)
// Fonts: Sora 800 (headings), Inter (body), DM Mono (data)
// ─────────────────────────────────────────────────────

function VerdantNavbar({ isDark }) {
  const [bannerVisible, setBannerVisible] = useState(true);
  return (
    <nav className="sticky top-0 z-50 w-full">
      {bannerVisible && (
        <div className={\`flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium \${
          isDark ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
        }\`}>
          <span>🌱 We've helped eliminate 2.1M tons of CO₂. New: Scope 3 reporting →</span>
          <button onClick={() => setBannerVisible(false)} className="ml-2 text-[10px]">✕</button>
        </div>
      )}
      <div className={\`flex items-center justify-between border-b px-6 py-3.5 backdrop-blur-xl \${
        isDark ? 'border-emerald-900/50 bg-[#0a120a]/90' : 'border-emerald-100 bg-white/90'
      }\`}>
        <span className="text-lg font-bold" style={{ fontFamily: 'Sora' }}>🌿 Verdant</span>
        <div className="hidden md:flex gap-7">
          {['Platform','Solutions','Results','Resources','Company'].map(item => (
            <a key={item} href="#" className="text-sm">{item}</a>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-emerald-600 px-4 py-2 text-sm">Request pilot</button>
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white">Get a quote</button>
        </div>
      </div>
    </nav>
  );
}

function EnergyDashboard({ isDark }) {
  const [kwh, setKwh] = useState(48723);
  useEffect(() => {
    const interval = setInterval(() => {
      setKwh(prev => Math.max(prev - Math.floor(Math.random() * 3 + 1), 45000));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="rounded-2xl bg-[#1a2a1a] p-5">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <span className="text-xs text-emerald-400 font-mono">Verdant AI — Live</span>
      </div>
      <div className="mt-3 text-3xl font-bold text-emerald-400 font-mono tabular-nums">
        {kwh.toLocaleString()} <span className="text-sm text-emerald-600">kWh</span>
      </div>
      {/* SVG chart with baseline (red) vs optimized (emerald) lines */}
      {/* Bottom stats: savings, CO₂, efficiency */}
    </div>
  );
}

function SavingsCalculator({ isDark }) {
  const [energySpend, setEnergySpend] = useState(500000);
  const [facilitySize, setFacilitySize] = useState(200000);
  const savings = Math.round(energySpend * 0.384);
  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-extrabold text-center" style={{ fontFamily: 'Sora' }}>
        See your potential savings.
      </h2>
      <input type="range" min={100000} max={10000000} value={energySpend}
        onChange={e => setEnergySpend(Number(e.target.value))} />
      <div className="text-3xl font-bold text-emerald-600 font-mono text-center">
        \${savings.toLocaleString()}
      </div>
    </section>
  );
}

function ImpactCounter() {
  const counters = [
    { value: '2.1M tons', label: 'CO₂ eliminated' },
    { value: '$847M', label: 'Customer savings' },
    { value: '4,200+', label: 'Buildings optimized' },
    { value: '11 countries', label: 'Operations' },
  ];
  return (
    <section className="bg-emerald-950 py-24 text-center">
      <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Sora' }}>
        Our collective impact.
      </h2>
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {counters.map(c => (
          <div key={c.label}>
            <div className="text-4xl font-bold text-emerald-400 font-mono">{c.value}</div>
            <div className="text-sm text-emerald-200/70 mt-2">{c.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ClimateTechWebsite() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div style={{ background: isDark ? '#0a120a' : '#f8faf8' }}>
      <VerdantNavbar isDark={isDark} />
      <HeroSection isDark={isDark} />
      <SavingsCalculator isDark={isDark} />
      <HowItWorks isDark={isDark} />
      <CaseStudies isDark={isDark} />
      <Integrations isDark={isDark} />
      <ImpactCounter isDark={isDark} />
      <VerdantFooter isDark={isDark} />
    </div>
  );
}`;

const vueCode = `<template>
  <div :style="{ backgroundColor: isDark ? '#0a120a' : '#f8faf8', minHeight: '100vh' }">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 w-full">
      <div v-if="bannerVisible"
        :class="isDark ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-50 text-emerald-700'"
        class="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium">
        <span>🌱 We've helped eliminate 2.1M tons of CO₂. New: Scope 3 reporting →</span>
        <button @click="bannerVisible = false" class="ml-2 text-[10px]">✕</button>
      </div>
      <div :class="isDark
          ? 'border-emerald-900/50 bg-[#0a120a]/90'
          : 'border-emerald-100 bg-white/90'"
        class="flex items-center justify-between border-b px-6 py-3.5 backdrop-blur-xl">
        <span class="text-lg font-bold" style="font-family: Sora">🌿 Verdant</span>
        <div class="hidden md:flex gap-7">
          <a v-for="item in ['Platform','Solutions','Results','Resources','Company']"
            :key="item" href="#" class="text-sm">{{ item }}</a>
        </div>
        <div class="flex gap-3">
          <button class="rounded-lg border border-emerald-600 px-4 py-2 text-sm">Request pilot</button>
          <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white">Get a quote</button>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="relative overflow-hidden px-6 py-20 lg:px-16 lg:py-28"
      :style="{ backgroundColor: isDark ? '#0a120a' : '#f8faf8' }">
      <div class="mx-auto flex max-w-7xl flex-col lg:flex-row gap-12 lg:gap-16">
        <div class="flex-1 space-y-6">
          <span :class="isDark ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'"
            class="inline-block rounded-full border px-4 py-1.5 text-xs font-semibold">
            AI-powered energy management
          </span>
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight"
            :style="{ fontFamily: 'Sora', color: isDark ? '#f0fdf4' : '#09090b' }">
            Cut energy costs<br>by half. <span :style="{ color: isDark ? '#4ade80' : '#16a34a' }">Automatically.</span>
          </h1>
          <p class="text-base lg:text-lg max-w-xl"
            :style="{ fontFamily: 'Inter', color: isDark ? '#a1a1aa' : '#52525b', lineHeight: '1.7' }">
            Verdant's AI learns your building's energy patterns and continuously
            optimizes HVAC, lighting, and electrical systems.
          </p>
          <div class="flex gap-3">
            <button class="rounded-lg px-6 py-3 text-sm font-semibold text-white"
              :style="{ backgroundColor: isDark ? '#22c55e' : '#16a34a' }">
              Calculate your savings
            </button>
            <button class="rounded-lg border px-6 py-3 text-sm"
              :style="{ borderColor: isDark ? '#166534' : '#16a34a', color: isDark ? '#4ade80' : '#16a34a' }">
              See a live demo
            </button>
          </div>
        </div>

        <!-- Energy Dashboard -->
        <div class="w-full max-w-md rounded-2xl" style="background: #1a2a1a">
          <div class="flex items-center gap-2 border-b border-emerald-900/30 px-5 py-3">
            <div class="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span class="text-xs text-emerald-400" style="font-family: DM Mono">Verdant AI — Live</span>
          </div>
          <div class="px-5 pt-5">
            <div class="text-3xl font-bold text-emerald-400 tabular-nums" style="font-family: DM Mono">
              {{ kwh.toLocaleString() }} <span class="text-sm text-emerald-600">kWh</span>
            </div>
          </div>
          <!-- SVG Chart -->
          <svg viewBox="0 0 400 120" class="w-full px-5 py-4">
            <path d="M0,20 C50,22 100,18 150,25 C200,30 250,28 300,32 C350,35 380,30 400,33"
              fill="none" stroke="#ef4444" stroke-width="2" opacity="0.7" />
            <path d="M0,50 C50,55 100,48 150,60 C200,65 250,58 300,70 C350,75 380,68 400,72"
              fill="none" stroke="#4ade80" stroke-width="2" />
            <path d="M0,20 C50,22 100,18 150,25 C200,30 250,28 300,32 C350,35 380,30 400,33
              L400,72 C380,68 350,75 300,70 C250,58 200,65 150,60 C100,48 50,55 0,50 Z"
              fill="#22c55e" opacity="0.15" />
          </svg>
          <div class="grid grid-cols-3 gap-px border-t border-emerald-900/30">
            <div v-for="stat in dashboardStats" :key="stat.label" class="px-3 py-3" style="background:#111a11">
              <div class="text-[10px] text-emerald-600">{{ stat.label }}</div>
              <div class="text-sm font-bold text-emerald-400" style="font-family: DM Mono">{{ stat.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Savings Calculator -->
    <SavingsCalculator :is-dark="isDark" />

    <!-- How It Works -->
    <HowItWorks :is-dark="isDark" />

    <!-- Case Studies -->
    <CaseStudies :is-dark="isDark" />

    <!-- Integration Ecosystem -->
    <Integrations :is-dark="isDark" />

    <!-- Impact Counter -->
    <section :style="{ backgroundColor: '#052e16' }" class="py-24 px-6 lg:px-16">
      <h2 class="text-3xl lg:text-4xl font-extrabold text-white text-center" style="font-family: Sora">
        Our collective impact.
      </h2>
      <div class="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div v-for="(counter, i) in counters" :key="counter.label" class="text-center">
          <div class="text-3xl lg:text-5xl font-bold text-emerald-400 tabular-nums" style="font-family: DM Mono">
            {{ counter.value }}<span class="text-lg lg:text-2xl text-emerald-500">{{ counter.suffix }}</span>
          </div>
          <div class="mt-2 text-sm text-emerald-200/70">{{ counter.label }}</div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <VerdantFooter :is-dark="isDark" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ isDark: boolean }>()
const bannerVisible = ref(true)
const kwh = ref(48723)

const dashboardStats = [
  { label: "Today's savings", value: '$2,847' },
  { label: 'CO₂ avoided', value: '4.2 tons' },
  { label: 'Efficiency', value: '94%' },
]

const counters = [
  { value: '2.1M', suffix: ' tons', label: 'CO₂ eliminated' },
  { value: '$847M', suffix: '', label: 'Customer savings generated' },
  { value: '4,200', suffix: '+', label: 'Buildings optimized' },
  { value: '11', suffix: ' countries', label: 'Operations worldwide' },
]

let kwhInterval: ReturnType<typeof setInterval>
onMounted(() => {
  kwhInterval = setInterval(() => {
    kwh.value = Math.max(kwh.value - Math.floor(Math.random() * 3 + 1), 45000)
  }, 2000)
})
onUnmounted(() => clearInterval(kwhInterval))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600;700&display=swap');
</style>`;

/* ────────────────────────────────────────────────────────────────────
   DOCS PAGE
   ──────────────────────────────────────────────────────────────────── */

export function WebsiteClimateTechDocs() {
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Website Template
          </span>
          <span className="inline-flex items-center rounded-full bg-[hsl(var(--muted))] px-2.5 py-0.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
            #7
          </span>
        </div>
        <h1
          id="climate-tech"
          className="mt-3 scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]"
        >
          Climate Tech / Sustainability
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A full marketing website for <strong>"Verdant Systems"</strong> — an AI-powered energy management platform for commercial buildings. Sage (Emerald) + Stone palette with light-clean primary mode. Features a live energy dashboard, interactive savings calculator, case studies, and impact counters.
        </p>
      </div>

      {/* Design system summary */}
      <section className="space-y-4">
        <h2
          id="design-system"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Design System
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Light palette */}
          <div className="rounded-xl border border-[hsl(var(--border))] p-4">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Light Mode</h3>
            <div className="mt-3 space-y-2">
              {[
                { label: 'Background', color: '#f8faf8' },
                { label: 'Surface', color: '#ffffff' },
                { label: 'Accent', color: '#16a34a' },
                { label: 'Text Primary', color: '#09090b' },
                { label: 'Text Secondary', color: '#52525b' },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded border border-[hsl(var(--border))]" style={{ backgroundColor: color }} />
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{label}</span>
                  <code className="ml-auto rounded bg-[hsl(var(--muted))] px-1 py-0.5 text-[10px] text-[hsl(var(--foreground))]">
                    {color}
                  </code>
                </div>
              ))}
            </div>
          </div>
          {/* Dark palette */}
          <div className="rounded-xl border border-[hsl(var(--border))] p-4">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Dark Mode</h3>
            <div className="mt-3 space-y-2">
              {[
                { label: 'Background', color: '#0a120a' },
                { label: 'Surface', color: '#111a11' },
                { label: 'Accent', color: '#4ade80' },
                { label: 'Text Primary', color: '#f0fdf4' },
                { label: 'Text Secondary', color: '#a1a1aa' },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded border border-[hsl(var(--border))]" style={{ backgroundColor: color }} />
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{label}</span>
                  <code className="ml-auto rounded bg-[hsl(var(--muted))] px-1 py-0.5 text-[10px] text-[hsl(var(--foreground))]">
                    {color}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[hsl(var(--border))] p-4">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Typography</h3>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
              <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-[10px]">Sora 800</code>
              <span>Headings — modern, clean, forward-looking</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
              <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-[10px]">Inter 400</code>
              <span>Body text — line-height 1.7</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
              <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-[10px]">DM Mono</code>
              <span>Data values — tabular-nums, emerald-600 for impact numbers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Full Website Preview */}
      <section className="space-y-4">
        <h2
          id="full-preview"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Full Website Preview
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Complete website with all sections: Navbar, Hero with live energy dashboard, Savings Calculator, How It Works, Case Studies, Integrations, Impact Counter, and Footer.
        </p>

        {/* Theme toggle for preview */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">Preview theme:</span>
          <div className="inline-flex overflow-hidden rounded-lg border border-[hsl(var(--border))] text-xs">
            <button
              onClick={() => setPreviewTheme('light')}
              className={`px-3 py-1.5 font-medium transition-colors ${
                previewTheme === 'light'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              ☀ Light
            </button>
            <div className="w-px bg-[hsl(var(--border))]" />
            <button
              onClick={() => setPreviewTheme('dark')}
              className={`px-3 py-1.5 font-medium transition-colors ${
                previewTheme === 'dark'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              🌙 Dark
            </button>
          </div>
        </div>

        {/* Website preview container */}
        <div className="overflow-hidden rounded-xl border border-[hsl(var(--border))] shadow-sm">
          <div className="max-h-[700px] overflow-y-auto">
            <ClimateTechWebsite isDark={previewTheme === 'dark'} />
          </div>
        </div>
      </section>

      {/* Sections Breakdown */}
      <section className="space-y-4">
        <h2
          id="sections"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Sections Breakdown
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Navbar', desc: 'Sticky with dismissable sub-banner, emerald accent, ghost + solid CTAs' },
            { name: 'Hero', desc: '55/45 split with live energy dashboard, real-time kWh counter, SVG chart with draw animation' },
            { name: 'Savings Calculator', desc: 'Interactive dual-slider calculator with live results: savings, payback period, CO₂, ROI' },
            { name: 'How It Works', desc: '4-step process (Connect → Learn → Optimize → Report) with connected node layout' },
            { name: 'Case Studies', desc: '3 detailed case studies with DM Mono metrics, customer quotes, and role attribution' },
            { name: 'Integrations', desc: '4-category grid (BMS, Utility, IoT, Cloud) with 40+ integration partners' },
            { name: 'Impact Counter', desc: 'Dark emerald section with 4 large animated counters (CO₂, savings, buildings, countries)' },
            { name: 'Footer', desc: 'Company info, 3-column link grid, bottom row with legal links' },
          ].map((section) => (
            <div
              key={section.name}
              className="rounded-xl border border-[hsl(var(--border))] p-4"
            >
              <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">{section.name}</h4>
              <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{section.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Micro-interactions */}
      <section className="space-y-4">
        <h2
          id="micro-interactions"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Micro-Interactions
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">#</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Interaction</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Implementation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['1', 'Energy counter', 'kWh decreases via setInterval (simulated AI optimization)'],
                ['2', 'Chart SVG', 'stroke-dashoffset draw on mount, 1500ms ease-out'],
                ['3', 'Savings calculator', 'Results update in real-time as sliders move'],
                ['4', 'Impact counters', 'Count-up with IntersectionObserver, staggered reveal'],
                ['5', 'Slider inputs', 'Custom emerald fill track with live value display'],
                ['6', 'Case study metrics', 'Appear one by one with 100ms stagger'],
                ['7', 'AI status ticker', 'Cycles every 8s with fade transition'],
                ['8', 'Chart savings area', 'Opacity animates 0 → 0.15 after lines draw (300ms delay)'],
                ['9', 'Step cards hover', 'scale(1.02) with 300ms transition'],
                ['10', 'Emerald pulsing dot', 'CSS animate-pulse on dashboard status indicator'],
              ].map(([num, name, impl]) => (
                <tr key={num} className="bg-[hsl(var(--background))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{num}</td>
                  <td className="px-4 py-3 text-xs font-medium text-[hsl(var(--foreground))]">{name}</td>
                  <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{impl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code */}
      <section className="space-y-4">
        <h2
          id="code"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Full Source Code
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Complete implementation with React (TypeScript + Tailwind) and Vue 3 (Composition API + Tailwind). Toggle between frameworks to view the full source.
        </p>
        <CodeBlock code={reactCode} vueCode={vueCode} />
      </section>

      {/* Responsive strategy */}
      <section className="space-y-4">
        <h2
          id="responsive"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Responsive Strategy
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Breakpoint</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['375px', 'Single-column layout. Hero stacks vertically. Calculator results in 2x2 grid. Nav links hidden.'],
                ['768px', 'Two-column grids for steps and integrations. Dashboard appears alongside hero copy.'],
                ['1280px', 'Full 4-column grids. All animations active. Maximum content width applied.'],
                ['1920px', 'Max content width 1400px centered. Background fills edge-to-edge.'],
              ].map(([bp, behavior]) => (
                <tr key={bp} className="bg-[hsl(var(--background))]">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{bp}</td>
                  <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{behavior}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2
          id="tech-stack"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Recommended Stack
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[hsl(var(--border))] p-4">
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">React Stack</h4>
            <ul className="mt-2 space-y-1 text-xs text-[hsl(var(--muted-foreground))]">
              <li>• React + TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Framer Motion (scroll-linked with useScroll/useTransform)</li>
              <li>• React Query (for simulated live data)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[hsl(var(--border))] p-4">
            <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">Vue Stack</h4>
            <ul className="mt-2 space-y-1 text-xs text-[hsl(var(--muted-foreground))]">
              <li>• Vue 3 + Composition API</li>
              <li>• Tailwind CSS</li>
              <li>• Motion One + GSAP</li>
              <li>• VueUse (for scroll tracking)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
