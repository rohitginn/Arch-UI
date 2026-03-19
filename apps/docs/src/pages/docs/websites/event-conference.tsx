import { EventConferenceTemplate } from '@archui/react';
import { CodeBlock } from '../../../components/component-preview';

export function EventConferenceDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1
          id="event-conference"
          className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]"
        >
          Event &amp; Conference Platform
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A full-page tech conference website template inspired by the "Summit"
          design — zinc neutrals with amber-500 accents, countdown timer, multi-track
          schedule with save-to-schedule, interactive SVG floor plan, tiered tickets
          with urgency indicators, and speaker grayscale-to-color hover effects.
          Supports light and dark themes out of the box.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            React
          </span>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Vue
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Light &amp; Dark
          </span>
        </div>
      </div>

      {/* Live Preview */}
      <section className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Preview
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Full interactive preview — try the countdown timer, toggle schedule
          days, save sessions, hover the floor plan, and switch between
          light/dark mode.
        </p>
        <div className="relative w-full overflow-hidden rounded-xl border border-[hsl(var(--border))] shadow-sm">
          <div className="h-[700px] w-full overflow-y-auto">
            <EventConferenceTemplate />
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Installation
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Install the package via your preferred package manager:
        </p>
        <CodeBlock
          code={`npm install @archui/react
# or
pnpm add @archui/react`}
          vueCode={`npm install @archui/vue
# or
pnpm add @archui/vue`}
        />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Usage
        </h2>
        <CodeBlock
          code={`import { EventConferenceTemplate } from '@archui/react';

export default function ConferencePage() {
  return <EventConferenceTemplate />;
}`}
          vueCode={`<script setup lang="ts">
import { EventConferenceTemplate } from '@archui/vue';
</script>

<template>
  <EventConferenceTemplate />
</template>`}
        />
      </section>

      {/* Sections breakdown */}
      <section className="space-y-4">
        <h2
          id="sections"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Included Sections
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: 'Countdown Banner',
              desc: 'Live ticking countdown to conference date with amber accent.',
            },
            {
              title: 'Hero (Dark/Light Split)',
              desc: 'Dramatic dark headline zone with dot-grid backdrop plus light company logo bar; ticket progress indicator.',
            },
            {
              title: 'Speakers',
              desc: 'Six speaker cards with grayscale-to-color image hover, keynote badges, and "View session" reveal link.',
            },
            {
              title: 'Conference Stats',
              desc: 'Dark strip with four key metrics: attendees, speakers, stages, days.',
            },
            {
              title: 'Schedule (Multi-Track)',
              desc: 'Day switching tabs, 4-stage color-coded grid, per-session save-to-schedule with star toggle.',
            },
            {
              title: 'Workshops',
              desc: 'Six workshop cards with skill-level badges (color-coded), capacity indicator, urgency when seats < 5.',
            },
            {
              title: 'Venue & Floor Plan',
              desc: 'Info panel with amenities plus interactive SVG floor plan with hover-to-highlight stages.',
            },
            {
              title: 'Tickets (3-Tier)',
              desc: 'Early Bird / General / VIP pricing cards with feature comparison, early-bird urgency pulse bar, and group discount CTA.',
            },
            {
              title: 'Sponsors (Tiered)',
              desc: 'Platinum, Gold, and Silver tiers rendered with decreasing visual weight.',
            },
            {
              title: 'Footer',
              desc: 'Multi-column links, social icons, schedule PDF download, past years archive navigation.',
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
            >
              <h3 className="font-semibold text-[hsl(var(--foreground))]">{s.title}</h3>
              <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design Tokens */}
      <section className="space-y-4">
        <h2
          id="design-tokens"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Design Tokens
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="py-2 pr-4 text-left font-medium text-[hsl(var(--foreground))]">Token</th>
                <th className="py-2 pr-4 text-left font-medium text-[hsl(var(--foreground))]">Light</th>
                <th className="py-2 text-left font-medium text-[hsl(var(--foreground))]">Dark</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-mono">accent</td>
                <td className="py-2 pr-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: '#f59e0b' }} />
                    amber-500
                  </span>
                </td>
                <td className="py-2">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: '#fbbf24' }} />
                    amber-400
                  </span>
                </td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-mono">background</td>
                <td className="py-2 pr-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded border" style={{ backgroundColor: '#ffffff' }} />
                    white
                  </span>
                </td>
                <td className="py-2">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded border border-gray-700" style={{ backgroundColor: '#09090b' }} />
                    zinc-950
                  </span>
                </td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-mono">heading font</td>
                <td className="py-2 pr-4" colSpan={2}>Bebas Neue (condensed, ALL CAPS)</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-mono">body font</td>
                <td className="py-2 pr-4" colSpan={2}>Inter (sans-serif)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">mono font</td>
                <td className="py-2 pr-4" colSpan={2}>DM Mono (times &amp; prices)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Customization */}
      <section className="space-y-4">
        <h2
          id="customization"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Customization
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          The template is a single self-contained component. To customise it,
          copy the source file into your project and modify the content,
          colours, or sections directly. All Tailwind classes use arbitrary
          values so no theme extension is required.
        </p>
        <CodeBlock
          code={`// Copy the template source into your project
// packages/react/src/components/templates/template-event-conference.tsx

// Then import and render:
import { EventConferenceTemplate } from './templates/template-event-conference';

function App() {
  return <EventConferenceTemplate />;
}`}
          vueCode={`<!-- Copy the template source into your project -->
<!-- packages/vue/src/components/templates/EventConferenceTemplate.vue -->

<script setup>
import EventConferenceTemplate from './templates/EventConferenceTemplate.vue';
</script>

<template>
  <EventConferenceTemplate />
</template>`}
        />
      </section>
    </div>
  );
}
