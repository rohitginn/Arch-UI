import { MeditationAppTemplate } from '@archui/react';
import { CodeBlock } from '../../../components/component-preview';

export function MeditationAppDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1
          id="meditation-app"
          className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]"
        >
          Meditation App
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A full-page wellness &amp; meditation website template inspired by the
          "Zura" design — sage-green accents, warm cream backgrounds, floating
          pill navigation, an interactive 4-7-8 breathing exercise, audio player
          mockup, pricing section, and mental-health resources. Supports light
          and dark themes out of the box.
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
          Full interactive preview — try the breathing exercise, toggle pricing,
          and switch between light/dark mode.
        </p>
        <div className="relative w-full overflow-hidden rounded-xl border border-[hsl(var(--border))] shadow-sm">
          <div className="h-[700px] w-full overflow-y-auto">
            <MeditationAppTemplate />
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

      {/* Usage — React */}
      <section className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Usage
        </h2>
        <CodeBlock
          code={`import { MeditationAppTemplate } from '@archui/react';

export default function MeditationPage() {
  return <MeditationAppTemplate />;
}`}
          vueCode={`<script setup lang="ts">
import { MeditationAppTemplate } from '@archui/vue';
</script>

<template>
  <MeditationAppTemplate />
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
              title: 'Floating Pill Navbar',
              desc: 'Rounded-full navigation with mobile bottom-sheet menu.',
            },
            {
              title: 'Hero',
              desc: 'Animated breathing circle, organic floating orbs, and dual CTAs.',
            },
            {
              title: 'Stats Bar',
              desc: 'Animated count-up statistics with IntersectionObserver.',
            },
            {
              title: 'Feature Sections',
              desc: 'Three alternating layouts: sleep tracker, interactive breathing exercise (4-7-8), and audio player.',
            },
            {
              title: 'Science Backing',
              desc: 'Evidence cards and advisor/founder quote.',
            },
            {
              title: 'Pricing',
              desc: 'Free & Premium tiers with monthly/annual toggle.',
            },
            {
              title: 'Testimonials',
              desc: 'Three user testimonial cards with star ratings.',
            },
            {
              title: 'Mental Health Resources',
              desc: '988 Suicide & Crisis Lifeline, SAMHSA, and therapist finder links.',
            },
            {
              title: 'Footer',
              desc: 'Multi-column link list with tagline and copyright.',
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
                    <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: '#4a8c6f' }} />
                    #4a8c6f
                  </span>
                </td>
                <td className="py-2">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: '#6aad8c' }} />
                    #6aad8c
                  </span>
                </td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-mono">background</td>
                <td className="py-2 pr-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded border" style={{ backgroundColor: '#faf8f4' }} />
                    #faf8f4
                  </span>
                </td>
                <td className="py-2">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded border border-gray-700" style={{ backgroundColor: '#1a1814' }} />
                    #1a1814
                  </span>
                </td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-2 pr-4 font-mono">heading font</td>
                <td className="py-2 pr-4" colSpan={2}>Fraunces (serif)</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">body font</td>
                <td className="py-2 pr-4" colSpan={2}>Inter (sans-serif)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Customisation */}
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
// packages/react/src/components/templates/template-meditation-app.tsx

// Then import and render:
import { MeditationAppTemplate } from './templates/template-meditation-app';

function App() {
  return <MeditationAppTemplate />;
}`}
          vueCode={`<!-- Copy the template source into your project -->
<!-- packages/vue/src/components/templates/MeditationAppTemplate.vue -->

<script setup>
import MeditationAppTemplate from './templates/MeditationAppTemplate.vue';
</script>

<template>
  <MeditationAppTemplate />
</template>`}
        />
      </section>
    </div>
  );
}
