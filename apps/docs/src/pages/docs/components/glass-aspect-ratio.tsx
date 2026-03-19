import { GlassAspectRatio } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassAspectRatioDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-aspect-ratio" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Aspect Ratio
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Displays content within a desired ratio, maintaining consistent proportions across different screen sizes.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassAspectRatio ratio={16 / 9}>
  <img 
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
    alt="Photo"
    className="rounded-lg object-cover w-full h-full"
  />
</GlassAspectRatio>`}
          vueCode={`<template>
  <GlassAspectRatio :ratio="16/9">
    <img src="..." class="rounded-lg object-cover w-full h-full" />
  </GlassAspectRatio>
</template>`}
        >
          <div className="w-full max-w-md">
            <GlassAspectRatio ratio={16 / 9}>
              <img 
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Photo by Drew Beamer"
                className="rounded-lg object-cover w-full h-full"
              />
            </GlassAspectRatio>
          </div>
        </ComponentPreview>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock 
          code={`npm install @archui/react`}
          vueCode={`npm install @archui/vue`}
        />
      </div>

      {/* Common Ratios */}
      <div className="space-y-4">
        <h2 id="common-ratios" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Common Ratios
        </h2>
        <ComponentPreview 
          code={`// 16:9 - Widescreen video
<GlassAspectRatio ratio={16 / 9}>...</GlassAspectRatio>

// 4:3 - Traditional TV
<GlassAspectRatio ratio={4 / 3}>...</GlassAspectRatio>

// 1:1 - Square
<GlassAspectRatio ratio={1}>...</GlassAspectRatio>

// 21:9 - Ultrawide
<GlassAspectRatio ratio={21 / 9}>...</GlassAspectRatio>

// 9:16 - Portrait video (Stories)
<GlassAspectRatio ratio={9 / 16}>...</GlassAspectRatio>`}
          vueCode={`<GlassAspectRatio :ratio="16/9">...</GlassAspectRatio>`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div>
              <p className="text-xs text-slate-500 mb-2 text-center">16:9</p>
              <GlassAspectRatio ratio={16 / 9}>
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                  16:9
                </div>
              </GlassAspectRatio>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2 text-center">4:3</p>
              <GlassAspectRatio ratio={4 / 3}>
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                  4:3
                </div>
              </GlassAspectRatio>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2 text-center">1:1</p>
              <GlassAspectRatio ratio={1}>
                <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                  1:1
                </div>
              </GlassAspectRatio>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2 text-center">3:4</p>
              <GlassAspectRatio ratio={3 / 4}>
                <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                  3:4
                </div>
              </GlassAspectRatio>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* With Video */}
      <div className="space-y-4">
        <h2 id="with-video" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Video
        </h2>
        <ComponentPreview 
          code={`<GlassAspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    className="rounded-lg w-full h-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
    allowFullScreen
  />
</GlassAspectRatio>`}
          vueCode={`<GlassAspectRatio :ratio="16/9">
  <iframe src="..." class="rounded-lg w-full h-full" />
</GlassAspectRatio>`}
        >
          <div className="w-full max-w-lg">
            <GlassAspectRatio ratio={16 / 9}>
              <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-sm">Video Player</p>
                </div>
              </div>
            </GlassAspectRatio>
          </div>
        </ComponentPreview>
      </div>

      {/* Map Container */}
      <div className="space-y-4">
        <h2 id="map-container" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Map Container
        </h2>
        <ComponentPreview 
          code={`<GlassAspectRatio ratio={21 / 9}>
  <iframe
    src="https://maps.google.com/maps?..."
    className="rounded-lg w-full h-full border-0"
  />
</GlassAspectRatio>`}
          vueCode={`<GlassAspectRatio :ratio="21/9">
  <iframe src="..." />
</GlassAspectRatio>`}
        >
          <div className="w-full">
            <GlassAspectRatio ratio={21 / 9}>
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-slate-500 dark:text-slate-400">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">Map Container (21:9)</p>
                </div>
              </div>
            </GlassAspectRatio>
          </div>
        </ComponentPreview>
      </div>

      {/* Card Gallery */}
      <div className="space-y-4">
        <h2 id="card-gallery" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Card Gallery
        </h2>
        <ComponentPreview 
          code={`<div className="grid grid-cols-3 gap-4">
  {images.map((src) => (
    <GlassAspectRatio ratio={1} key={src}>
      <img 
        src={src} 
        className="object-cover w-full h-full rounded-lg"
      />
    </GlassAspectRatio>
  ))}
</div>`}
          vueCode={`<div class="grid grid-cols-3 gap-4">
  <GlassAspectRatio v-for="img in images" :ratio="1">
    <img :src="img" class="object-cover w-full h-full rounded-lg" />
  </GlassAspectRatio>
</div>`}
        >
          <div className="grid grid-cols-3 gap-3 w-full max-w-md">
            {[
              'from-violet-500 to-purple-600',
              'from-cyan-500 to-blue-600',
              'from-amber-500 to-orange-600',
              'from-emerald-500 to-teal-600',
              'from-rose-500 to-pink-600',
              'from-indigo-500 to-blue-600',
            ].map((gradient, i) => (
              <GlassAspectRatio ratio={1} key={i}>
                <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-lg`} />
              </GlassAspectRatio>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Prop</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Default</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">ratio</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3 font-mono text-xs">1</td>
                <td className="py-3">Aspect ratio (width / height)</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">children</td>
                <td className="py-3 font-mono text-xs">ReactNode</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Content to display</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">className</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Aspect Ratios Reference */}
      <div className="space-y-4">
        <h2 id="reference" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Aspect Ratio Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Ratio</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Value</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Use Case</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">16:9</td>
                <td className="py-3 font-mono text-xs">1.778</td>
                <td className="py-3">Videos, Widescreen displays</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">4:3</td>
                <td className="py-3 font-mono text-xs">1.333</td>
                <td className="py-3">Traditional TV, Photos</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">1:1</td>
                <td className="py-3 font-mono text-xs">1</td>
                <td className="py-3">Profile pictures, Instagram</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">21:9</td>
                <td className="py-3 font-mono text-xs">2.333</td>
                <td className="py-3">Ultrawide, Cinema</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">9:16</td>
                <td className="py-3 font-mono text-xs">0.5625</td>
                <td className="py-3">Stories, TikTok, Reels</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">3:2</td>
                <td className="py-3 font-mono text-xs">1.5</td>
                <td className="py-3">Photography, DSLR</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">2:3</td>
                <td className="py-3 font-mono text-xs">0.667</td>
                <td className="py-3">Portrait photos</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
