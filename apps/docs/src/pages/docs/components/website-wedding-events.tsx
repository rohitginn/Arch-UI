import { WeddingEventsTemplate } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function WebsiteWeddingEventsDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1
          id="wedding-events-template"
          className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]"
        >
          Wedding &amp; Luxury Events
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Ultra-luxury wedding planning &amp; event design studio website — &ldquo;Maison Eventail&rdquo;. Light warm-editorial primary with Stone + Champagne gold palette.
          Features Libre Baskerville / EB Garamond serif typography, asymmetric portfolio grid, Ken Burns service sections, 15-second testimonial rotation, and ornamental gold dividers.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            Light-primary
          </span>
          <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            Libre Baskerville / EB Garamond
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
          {/* Light palette */}
          <div className="rounded-lg border border-[hsl(var(--border))] p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">Light Mode (Primary)</h3>
            <div className="flex flex-col gap-2 text-xs text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#faf7f3' }} />
                <span>Background: #faf7f3 (warm cream — fine stationery)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#ffffff' }} />
                <span>Surface: #ffffff</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#1c1714' }} />
                <span>Text primary: #1c1714 (warm near-black)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#7a6e63' }} />
                <span>Text secondary: #7a6e63 (warm medium)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#b5a89c' }} />
                <span>Text muted: #b5a89c</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#c5a96e' }} />
                <span>Accent: #c5a96e (champagne gold)</span>
              </div>
            </div>
          </div>

          {/* Dark palette + Typography */}
          <div className="rounded-lg border border-[hsl(var(--border))] p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">Dark Mode (Dramatic)</h3>
            <div className="flex flex-col gap-2 text-xs text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#1c1714' }} />
                <span>Background: #1c1714</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border" style={{ background: '#261e18' }} />
                <span>Surface: #261e18</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded border border-zinc-700" style={{ background: '#f8f3ec' }} />
                <span>Text: #f8f3ec / #9a8a7a</span>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mt-5 mb-3">Typography</h3>
            <div className="flex flex-col gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
              <span>Display: Libre Baskerville italic 300 (hero, headings)</span>
              <span>Prose: EB Garamond italic (pull quotes, body)</span>
              <span>UI/Nav: Inter 300, ALL CAPS, tracking-[0.15em], 10px</span>
              <span>Numbers: DM Mono (dates, phone, prices)</span>
              <span>Hero size: clamp(3rem, 9vw, 7rem)</span>
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
          Complete marketing site for an ultra-luxury wedding planning studio. Features asymmetric magazine-layout portfolio,
          full-bleed Ken Burns service sections, horizontal venue scroll, 15-second testimonial carousel, and a refined inquiry form with scarcity messaging.
        </p>

        <ComponentPreview
          code={`import { WeddingEventsTemplate } from '@archui/react';

// Full page — drop into any route
<WeddingEventsTemplate />

// Vue equivalent:
// import { WeddingEventsTemplate } from '@archui/vue';
// <WeddingEventsTemplate />`}
        >
          <div className="w-full overflow-hidden rounded-lg border border-[hsl(var(--border))]" style={{ height: '700px', overflowY: 'auto' }}>
            <WeddingEventsTemplate />
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
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Navigation</td>
                <td className="py-3">Fixed transparent nav with gold top-border accent, MAISON EVENTAIL logo in micro-uppercase tracking-[0.3em]</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">1</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Hero</td>
                <td className="py-3">Fullscreen wedding photograph with vignette, bottom gradient, lower-third italic serif headline &ldquo;Where love becomes art.&rdquo;</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">2</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">The Studio</td>
                <td className="py-3">Centered prose with EB Garamond, ornamental gold divider, pull-quote, and stats (15 years · 240 weddings · 18 countries)</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">3</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Portfolio</td>
                <td className="py-3">Asymmetric magazine-layout grid: 21:9 cinematic → two-column (portrait+landscape) → three squares with hover title reveal</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">4</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Services</td>
                <td className="py-3">Three full-bleed Ken Burns sections: Full Planning, Partial Planning, Design &amp; Styling with gold rule dividers</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">5</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Venues</td>
                <td className="py-3">Horizontal scroll filmstrip of 6 preferred South of France venues with serif italic names</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">6</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Client Words</td>
                <td className="py-3">Full-viewport testimonial carousel — 15s auto-advance, decorative quote mark, cross-dissolve, pause on hover</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">7</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Contact</td>
                <td className="py-3">Scarcity-driven inquiry form with floating labels, Names/Date/Location/Guests/Budget/Message fields</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">8</td>
                <td className="py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Footer</td>
                <td className="py-3">Ultra-minimal with ornamental SVG divider, location, DM Mono contact info, Instagram handle</td>
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
{`import { WeddingEventsTemplate } from '@archui/react';

export default function WeddingPage() {
  return <WeddingEventsTemplate />;
}`}
          </pre>
        </div>

        <div className="rounded-lg border border-[hsl(var(--border))] overflow-hidden mt-4">
          <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-b border-[hsl(var(--border))]">
            <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">Vue</span>
          </div>
          <pre className="p-4 text-sm font-mono text-[hsl(var(--foreground))] overflow-x-auto">
{`<script setup>
import { WeddingEventsTemplate } from '@archui/vue';
</script>

<template>
  <WeddingEventsTemplate />
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
            <span><strong className="text-[hsl(var(--foreground))]">Asymmetric portfolio grid</strong> — magazine-style layout with 21:9 cinematic, portrait/landscape mix, and square grid rows</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Ken Burns hover effect</strong> — 12-second scale transition on service section images for slow, romantic parallax feel</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Ornamental SVG dividers</strong> — custom gold dot-and-rule motifs replacing standard horizontal rules throughout</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">15-second testimonial rotation</strong> — unhurried luxury pace with pause-on-hover and cross-dissolve transitions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Horizontal venue filmstrip</strong> — CSS scroll-snap with serif italic venue names and region labels</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Scarcity-driven contact form</strong> — &ldquo;We take only 15 enquiries per year&rdquo; with submit-to-checkmark animation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">Light + Dark mode</strong> — warm cream primary, warm dark editorial secondary, both fully specified</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">●</span>
            <span><strong className="text-[hsl(var(--foreground))]">React + Vue</strong> — identical design shipped as both React TSX and Vue SFC</span>
          </li>
        </ul>
      </section>

      {/* ── Micro-interactions ────────────────────────────────────── */}
      <section className="space-y-4">
        <h2
          id="micro-interactions"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Micro-interactions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="text-left py-3 pr-6 font-medium text-[hsl(var(--foreground))]">#</th>
                <th className="text-left py-3 pr-6 font-medium text-[hsl(var(--foreground))]">Interaction</th>
                <th className="text-left py-3 font-medium text-[hsl(var(--foreground))]">Timing</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">1</td>
                <td className="py-3 pr-6">Portfolio hover — title reveal with gradient scrim</td>
                <td className="py-3">1200ms ease-in-out scale, 400ms opacity</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">2</td>
                <td className="py-3 pr-6">Services Ken Burns — slow zoom on hover</td>
                <td className="py-3">12000ms ease-in-out (1.0→1.04 scale)</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">3</td>
                <td className="py-3 pr-6">Testimonial auto-advance</td>
                <td className="py-3">15s interval, 800ms cross-dissolve</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">4</td>
                <td className="py-3 pr-6">Nav link hover — gold accent transition</td>
                <td className="py-3">200ms ease</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">5</td>
                <td className="py-3 pr-6">CTA underline — slides from left on hover</td>
                <td className="py-3">300ms transition-all</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">6</td>
                <td className="py-3 pr-6">Venue card zoom</td>
                <td className="py-3">700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-6">7</td>
                <td className="py-3 pr-6">Form submit — button text transitions to ✓ checkmark</td>
                <td className="py-3">200ms transition-colors</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">8</td>
                <td className="py-3 pr-6">Slide indicators — gold fill transition</td>
                <td className="py-3">800ms transition-all</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
