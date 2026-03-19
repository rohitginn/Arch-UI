import { CybersecurityTemplate } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function WebsiteCybersecurityDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1
          id="cybersecurity-template"
          className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]"
        >
          Cybersecurity / InfoSec Platform
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Enterprise cybersecurity SaaS marketing site — &ldquo;Sentinel&rdquo;. Dark-primary with iron zinc palette and semantic crimson/amber/green status colors.
          Features IBM Plex Sans/Mono typography, live threat dashboard mockup, threat intelligence feed, and clinical precision aesthetic.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            Dark-primary
          </span>
          <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            IBM Plex Sans / Mono
          </span>
          <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            React + Vue
          </span>
          <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            Light + Dark
          </span>
        </div>
      </div>

      {/* ── Design System ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="design-system"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Design System
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dark palette */}
          <div className="rounded-lg border border-[hsl(var(--border))] p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">Dark Mode (Primary)</h3>
            <div className="flex flex-col gap-2 text-xs text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#090909' }} />
                <span>Background: #090909</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#111111' }} />
                <span>Surface: #111111</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#181818' }} />
                <span>Card: #181818 — border: #242424</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border border-zinc-700" style={{ background: '#f0f0f0' }} />
                <span>Text primary: #f0f0f0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border border-zinc-700" style={{ background: '#808080' }} />
                <span>Text secondary: #808080</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border border-zinc-700" style={{ background: '#e5e5e5' }} />
                <span>Accent (non-semantic): #e5e5e5 (zinc-200)</span>
              </div>
            </div>
          </div>

          {/* Semantic colors */}
          <div className="rounded-lg border border-[hsl(var(--border))] p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">Semantic Status Colors</h3>
            <div className="flex flex-col gap-2 text-xs text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded" style={{ background: '#ef4444' }} />
                <span>Critical / Threat: #ef4444 (red-500)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded" style={{ background: '#f59e0b' }} />
                <span>Warning: #f59e0b (amber-500)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded" style={{ background: '#22c55e' }} />
                <span>Resolved / Secure: #22c55e (green-500)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded" style={{ background: '#3b82f6' }} />
                <span>Info: #3b82f6 (blue-500)</span>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mt-5 mb-3">Typography</h3>
            <div className="flex flex-col gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
              <span>Headings: IBM Plex Sans 700</span>
              <span>Body: IBM Plex Sans 400</span>
              <span>Code / Technical: IBM Plex Mono 400/500</span>
              <span>Headline size: clamp(2rem, 4vw, 3.5rem)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full Preview ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="full-template"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Full Template Preview
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Complete marketing site for an enterprise cybersecurity platform. Includes announcement bar, SOC dashboard mockup with live threat data,
          platform capabilities with code snippets, threat intelligence feed, case studies, integration ecosystem, and enterprise pricing.
        </p>

        <ComponentPreview
          code={`import { CybersecurityTemplate } from '@archui/react';

// Full page — drop into any route
<CybersecurityTemplate />

// Vue equivalent:
// import { CybersecurityTemplate } from '@archui/vue';
// <CybersecurityTemplate />`}
        >
          <div className="w-full overflow-hidden rounded-lg border border-[hsl(var(--border))]" style={{ height: '700px', overflowY: 'auto' }}>
            <CybersecurityTemplate />
          </div>
        </ComponentPreview>
      </section>

      {/* ── Sections ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="sections"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Included Sections
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="text-left py-3 pr-6 font-medium text-[hsl(var(--foreground))]">#</th>
                <th className="text-left py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Section</th>
                <th className="text-left py-3 font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">0</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Announcement Bar</td>
                <td className="py-3">Emergency response hotline — red-500/70, IBM Plex Mono</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">1</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Navigation</td>
                <td className="py-3">Red indicator dot + SENTINEL logo, dark nav with ghost/solid CTAs</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">2</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Hero</td>
                <td className="py-3">55/45 split — headline + compliance badges | live SOC dashboard mockup with threat map, severity feed, and live counter</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">3</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Platform Capabilities</td>
                <td className="py-3">3-column grid: Threat Detection (YAML code), Zero Trust (auth diagram), Compliance (status checks)</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">4</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Threat Intelligence Feed</td>
                <td className="py-3">Terminal-style monospaced threat feed with severity tags and PROTECTED badges</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">5</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Enterprise Proof</td>
                <td className="py-3">3 case study cards with industry, threat, and outcome metrics</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">6</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Integration Ecosystem</td>
                <td className="py-3">Category-tabbed filter: SIEM, Cloud, Identity, Endpoint, Ticketing</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">7</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Pricing</td>
                <td className="py-3">3-tier enterprise pricing with deployment option badges</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">8</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">CTA</td>
                <td className="py-3">Full-dark call to action with urgency-driven copy</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">9</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Footer</td>
                <td className="py-3">5-column footer with brand, links, socials, and legal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Props ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="text-left py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="text-left py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="text-left py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Default</th>
                <th className="text-left py-3 font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr>
                <td className="py-3 pr-6 font-mono text-xs">className</td>
                <td className="py-3 pr-6 font-mono text-xs">string</td>
                <td className="py-3 pr-6">—</td>
                <td className="py-3">Additional CSS classes for the root wrapper</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Usage ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Usage
        </h2>

        <div className="rounded-lg border border-[hsl(var(--border))] overflow-hidden">
          <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-b border-[hsl(var(--border))]">
            <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">React</span>
          </div>
          <pre className="p-4 text-sm font-mono text-[hsl(var(--foreground))] overflow-x-auto">
{`import { CybersecurityTemplate } from '@archui/react';

export default function CybersecurityPage() {
  return <CybersecurityTemplate />;
}`}
          </pre>
        </div>

        <div className="rounded-lg border border-[hsl(var(--border))] overflow-hidden mt-4">
          <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-b border-[hsl(var(--border))]">
            <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Vue</span>
          </div>
          <pre className="p-4 text-sm font-mono text-[hsl(var(--foreground))] overflow-x-auto">
{`<script setup>
import { CybersecurityTemplate } from '@archui/vue';
</script>

<template>
  <CybersecurityTemplate />
</template>`}
          </pre>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="features"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Key Features
        </h2>
        <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Live threat counter</strong> — incrementing threat count via setInterval creates a compelling live feel</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Animated threat map</strong> — SVG world map with pulsing red dots that appear at random coordinates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Severity tags</strong> — CRITICAL/HIGH/MEDIUM/INFO with semantic red/amber/blue coloring</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">YAML code snippets</strong> — detection rule example in monospace for technical credibility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Integration category tabs</strong> — filtered view of SIEM, Cloud, Identity, Endpoint, and Ticketing integrations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Light + Dark mode</strong> — full dark: variant support throughout, dark-primary design</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">React + Vue</strong> — identical design shipped as both React TSX and Vue SFC</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
