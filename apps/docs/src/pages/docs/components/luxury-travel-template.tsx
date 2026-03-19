import { LuxuryTravelTemplate } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Luxury Travel & Tourism Template Docs                               */
/* ------------------------------------------------------------------ */

export function LuxuryTravelTemplateDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1
          id="luxury-travel-template"
          className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]"
        >
          Luxury Travel & Tourism
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          An ultra-luxury bespoke travel agency template — "Voyage Atelier". Dark cinematic 
          primary mode with warm gold accents, warm parchment light mode. Full-page template 
          with hero, destination filmstrip, process timeline, experiences, testimonials, 
          journal, and concierge contact form.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Dark Cinematic Primary
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Warm Light Secondary
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20">
            React
          </span>
          <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400 border border-green-500/20">
            Vue
          </span>
        </div>
      </div>

      {/* ── Design System ───────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="design-system"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Design System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dark palette */}
          <div className="rounded-xl border border-[hsl(var(--border))] p-6 space-y-3">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Dark Cinematic (Primary)</h3>
            <div className="space-y-2 text-xs text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-white/10" style={{ backgroundColor: '#0a0806' }} />
                <span>Background: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#0a0806</code></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-white/10" style={{ backgroundColor: '#141008' }} />
                <span>Surface: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#141008</code></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-white/10" style={{ backgroundColor: '#1c1610' }} />
                <span>Card: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#1c1610</code></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-white/10" style={{ backgroundColor: '#c49a5c' }} />
                <span>Gold Accent: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#c49a5c</code></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-white/10" style={{ backgroundColor: '#f5ede0' }} />
                <span>Text Primary: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#f5ede0</code></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-white/10" style={{ backgroundColor: '#9a8878' }} />
                <span>Text Secondary: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#9a8878</code></span>
              </div>
            </div>
          </div>
          {/* Light palette */}
          <div className="rounded-xl border border-[hsl(var(--border))] p-6 space-y-3">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Light Mode (Secondary)</h3>
            <div className="space-y-2 text-xs text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-black/10" style={{ backgroundColor: '#f8f4ee' }} />
                <span>Background: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#f8f4ee</code></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-black/10" style={{ backgroundColor: '#ffffff' }} />
                <span>Surface: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#ffffff</code></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-black/10" style={{ backgroundColor: '#9a7840' }} />
                <span>Gold Accent: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#9a7840</code></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-black/10" style={{ backgroundColor: '#1a1410' }} />
                <span>Text Primary: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#1a1410</code></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-black/10" style={{ backgroundColor: '#6a5e54' }} />
                <span>Text Secondary: <code className="text-[10px] rounded bg-[hsl(var(--muted))] px-1 py-0.5">#6a5e54</code></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Typography ───────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="typography"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Typography
        </h2>
        <div className="rounded-xl border border-[hsl(var(--border))] p-6 space-y-4 text-sm text-[hsl(var(--muted-foreground))]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-[hsl(var(--foreground))] mb-1">Display / Headlines</p>
              <p>Libre Baskerville — italic, weight 300</p>
              <p className="text-xs">Hero headlines, destination names, section titles</p>
            </div>
            <div>
              <p className="font-semibold text-[hsl(var(--foreground))] mb-1">Body / Editorial</p>
              <p>EB Garamond — weight 400, line-height 1.85</p>
              <p className="text-xs">Descriptions, testimonial quotes</p>
            </div>
            <div>
              <p className="font-semibold text-[hsl(var(--foreground))] mb-1">UI / Navigation</p>
              <p>Inter — weight 300, uppercase, tracking-[0.15em], 11px</p>
              <p className="text-xs">Nav links, labels, CTAs, micro-uppercase styling</p>
            </div>
            <div>
              <p className="font-semibold text-[hsl(var(--foreground))] mb-1">Numbers / Coordinates</p>
              <p>DM Mono — weight 400</p>
              <p className="text-xs">Geographic coordinates, phone numbers, durations</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sections Breakdown ───────────────────────── */}
      <section className="space-y-4">
        <h2
          id="sections"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Sections
        </h2>
        <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Section</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="px-4 py-2 font-medium">Navbar</td>
                <td className="px-4 py-2">Fixed transparent nav with phone bar, auto-color inversion on scroll, mobile full-screen overlay</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="px-4 py-2 font-medium">Hero</td>
                <td className="px-4 py-2">Fullscreen cinematic background with noise/vignette overlays, rotating coordinates, serif italic headline, destination pills</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="px-4 py-2 font-medium">Destinations</td>
                <td className="px-4 py-2">Horizontal filmstrip carousel with scroll-snap, portrait destination cards (2:3), hover zoom + gold rule animation</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="px-4 py-2 font-medium">Process</td>
                <td className="px-4 py-2">4 connected steps with gold dots and connecting line, numbered with DM Mono</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="px-4 py-2 font-medium">Experiences</td>
                <td className="px-4 py-2">4 full-bleed 80vh sections: Private Islands, Yachts, Cultural, Wilderness — editorial overlay</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="px-4 py-2 font-medium">Testimonials</td>
                <td className="px-4 py-2">Full-viewport single testimonial with decorative quote mark, 12s auto-advance, pause on hover</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="px-4 py-2 font-medium">Journal</td>
                <td className="px-4 py-2">3-column travel journal entries with serif italic titles and reading times</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="px-4 py-2 font-medium">Contact</td>
                <td className="px-4 py-2">Concierge contact: phone + inquiry form with bottom-border inputs, budget range select</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Footer</td>
                <td className="px-4 py-2">Minimal single row: copyright, locations, social links</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Micro-Interactions ───────────────────────── */}
      <section className="space-y-4">
        <h2
          id="interactions"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Micro-Interactions
        </h2>
        <div className="rounded-xl border border-[hsl(var(--border))] p-6">
          <ol className="space-y-2 text-sm text-[hsl(var(--muted-foreground))] list-decimal list-inside">
            <li>Gold loading sweep — thin horizontal line sweeps across viewport on load (600ms)</li>
            <li>Coordinate cycling — geographic coordinates fade-swap every 8 seconds</li>
            <li>Destination filmstrip — CSS scroll-snap with arrow controls, touch-friendly</li>
            <li>Card hover zoom — 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) scale transform</li>
            <li>Gold rule expansion — horizontal rule widens on card hover</li>
            <li>Testimonial auto-advance — 12s interval, pause on hover, cross-dissolve</li>
            <li>Experience parallax — background images at 1.01 scale, 1.02 on hover</li>
            <li>Underline slide-in — all text links have left-to-right underline on hover</li>
            <li>Nav auto-color — logo and links transition color based on scroll position</li>
            <li>Mobile overlay — full-screen with destination photo and staggered link reveals</li>
          </ol>
        </div>
      </section>

      {/* ── Live Preview ───────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Full Template Preview
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          The complete Voyage Atelier website. Scroll within the preview to explore all sections.
        </p>
        <ComponentPreview
          code={`import { LuxuryTravelTemplate } from '@archui/react';

// React
<LuxuryTravelTemplate />

// Vue
// import { LuxuryTravelTemplate } from '@archui/vue';
// <LuxuryTravelTemplate />`}
        >
          <div className="h-[700px] overflow-y-auto rounded-lg border border-[hsl(var(--border))]">
            <LuxuryTravelTemplate />
          </div>
        </ComponentPreview>
      </section>

      {/* ── Usage ───────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Usage
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2">React</h3>
            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-4">
              <pre className="text-xs text-[hsl(var(--foreground))] overflow-x-auto">
                <code>{`import { LuxuryTravelTemplate } from '@archui/react';

export default function TravelPage() {
  return <LuxuryTravelTemplate />;
}`}</code>
              </pre>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2">Vue</h3>
            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-4">
              <pre className="text-xs text-[hsl(var(--foreground))] overflow-x-auto">
                <code>{`<script setup>
import { LuxuryTravelTemplate } from '@archui/vue';
</script>

<template>
  <LuxuryTravelTemplate />
</template>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Props ───────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Props
        </h2>
        <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Default</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">className</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono text-xs">—</td>
                <td className="px-4 py-2">Additional CSS classes for the root element</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
