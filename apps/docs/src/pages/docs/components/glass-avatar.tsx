import { GlassAvatar, GlassAvatarGroup } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { User } from 'lucide-react';

export function GlassAvatarDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-avatar" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Avatar
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          An avatar component for displaying user profile images with fallback support, status indicators, and group layouts.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassAvatar 
  src="https://github.com/shadcn.png" 
  alt="User avatar"
/>
<GlassAvatar fallback="JD" />
<GlassAvatar />`}
          vueCode={`<template>
  <GlassAvatar 
    src="https://github.com/shadcn.png" 
    alt="User avatar"
  />
  <GlassAvatar fallback="JD" />
  <GlassAvatar />
</template>`}
        >
          <div className="flex items-center gap-4">
            <GlassAvatar 
              src="https://github.com/shadcn.png" 
              alt="User avatar"
            />
            <GlassAvatar fallback="JD" />
            <GlassAvatar />
          </div>
        </ComponentPreview>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
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
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassAvatar } from '@archui/react';

export default function Example() {
  return (
    <GlassAvatar 
      src="https://example.com/avatar.jpg"
      alt="John Doe"
      fallback="JD"
    />
  );
}`}
          vueCode={`<script setup>
import { GlassAvatar } from '@archui/vue';
</script>

<template>
  <GlassAvatar 
    src="https://example.com/avatar.jpg"
    alt="John Doe"
    fallback="JD"
  />
</template>`}
        />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassAvatar size="xs" fallback="XS" />
<GlassAvatar size="sm" fallback="SM" />
<GlassAvatar size="md" fallback="MD" />
<GlassAvatar size="lg" fallback="LG" />
<GlassAvatar size="xl" fallback="XL" />
<GlassAvatar size="2xl" fallback="2X" />`}
          vueCode={`<GlassAvatar size="xs" fallback="XS" />
<GlassAvatar size="sm" fallback="SM" />
<GlassAvatar size="md" fallback="MD" />
<GlassAvatar size="lg" fallback="LG" />
<GlassAvatar size="xl" fallback="XL" />
<GlassAvatar size="2xl" fallback="2X" />`}
        >
          <div className="flex items-end gap-4">
            <GlassAvatar size="xs" fallback="XS" />
            <GlassAvatar size="sm" fallback="SM" />
            <GlassAvatar size="md" fallback="MD" />
            <GlassAvatar size="lg" fallback="LG" />
            <GlassAvatar size="xl" fallback="XL" />
            <GlassAvatar size="2xl" fallback="2X" />
          </div>
        </ComponentPreview>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassAvatar variant="default" fallback="DF" />
<GlassAvatar variant="glass" fallback="GL" />
<GlassAvatar variant="gradient" fallback="GR" />`}
          vueCode={`<GlassAvatar variant="default" fallback="DF" />
<GlassAvatar variant="glass" fallback="GL" />
<GlassAvatar variant="gradient" fallback="GR" />`}
        >
          <div className="flex items-center gap-4">
            <div className="text-center">
              <GlassAvatar variant="default" fallback="DF" size="lg" />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Default</span>
            </div>
            <div className="text-center">
              <GlassAvatar variant="glass" fallback="GL" size="lg" />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Glass</span>
            </div>
            <div className="text-center">
              <GlassAvatar variant="gradient" fallback="GR" size="lg" />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Gradient</span>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Shapes */}
      <div className="space-y-4">
        <h2 id="shapes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Shapes
        </h2>
        <ComponentPreview 
          code={`<GlassAvatar shape="circle" fallback="CR" />
<GlassAvatar shape="square" fallback="SQ" />`}
          vueCode={`<GlassAvatar shape="circle" fallback="CR" />
<GlassAvatar shape="square" fallback="SQ" />`}
        >
          <div className="flex items-center gap-4">
            <div className="text-center">
              <GlassAvatar shape="circle" fallback="CR" size="lg" />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Circle</span>
            </div>
            <div className="text-center">
              <GlassAvatar shape="square" fallback="SQ" size="lg" />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Square</span>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* With Status */}
      <div className="space-y-4">
        <h2 id="with-status" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Status Indicator
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Display online/offline status with positioned indicators.
        </p>
        <ComponentPreview 
          code={`<GlassAvatar status="online" fallback="ON" />
<GlassAvatar status="away" fallback="AW" />
<GlassAvatar status="busy" fallback="BS" />
<GlassAvatar status="offline" fallback="OF" />`}
          vueCode={`<GlassAvatar status="online" fallback="ON" />
<GlassAvatar status="away" fallback="AW" />
<GlassAvatar status="busy" fallback="BS" />
<GlassAvatar status="offline" fallback="OF" />`}
        >
          <div className="flex items-center gap-4">
            <div className="text-center">
              <GlassAvatar status="online" fallback="ON" size="lg" />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Online</span>
            </div>
            <div className="text-center">
              <GlassAvatar status="away" fallback="AW" size="lg" />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Away</span>
            </div>
            <div className="text-center">
              <GlassAvatar status="busy" fallback="BS" size="lg" />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Busy</span>
            </div>
            <div className="text-center">
              <GlassAvatar status="offline" fallback="OF" size="lg" />
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">Offline</span>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* With Ring */}
      <div className="space-y-4">
        <h2 id="with-ring" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Ring
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Add a decorative ring around the avatar with customizable colors.
        </p>
        <ComponentPreview 
          code={`<GlassAvatar ring ringColor="default" fallback="DF" />
<GlassAvatar ring ringColor="primary" fallback="PR" />
<GlassAvatar ring ringColor="success" fallback="SC" />
<GlassAvatar ring ringColor="warning" fallback="WR" />
<GlassAvatar ring ringColor="error" fallback="ER" />`}
          vueCode={`<GlassAvatar ring ring-color="default" fallback="DF" />
<GlassAvatar ring ring-color="primary" fallback="PR" />
<GlassAvatar ring ring-color="success" fallback="SC" />
<GlassAvatar ring ring-color="warning" fallback="WR" />
<GlassAvatar ring ring-color="error" fallback="ER" />`}
        >
          <div className="flex items-center gap-4">
            <GlassAvatar ring ringColor="default" fallback="DF" size="lg" />
            <GlassAvatar ring ringColor="primary" fallback="PR" size="lg" />
            <GlassAvatar ring ringColor="success" fallback="SC" size="lg" />
            <GlassAvatar ring ringColor="warning" fallback="WR" size="lg" />
            <GlassAvatar ring ringColor="error" fallback="ER" size="lg" />
          </div>
        </ComponentPreview>
      </div>

      {/* Custom Fallback Icon */}
      <div className="space-y-4">
        <h2 id="custom-fallback" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Custom Fallback Icon
        </h2>
        <ComponentPreview 
          code={`import { User } from 'lucide-react';

<GlassAvatar 
  fallbackIcon={<User className="h-6 w-6" />}
  size="lg"
/>`}
          vueCode={`<script setup>
import { User } from 'lucide-vue-next';
</script>

<template>
  <GlassAvatar size="lg">
    <template #fallback-icon>
      <User class="h-6 w-6" />
    </template>
  </GlassAvatar>
</template>`}
        >
          <GlassAvatar 
            fallbackIcon={<User className="h-6 w-6" />}
            size="lg"
          />
        </ComponentPreview>
      </div>

      {/* Avatar Group */}
      <div className="space-y-4">
        <h2 id="avatar-group" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Avatar Group
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Display multiple avatars in an overlapping group layout with a maximum count.
        </p>
        <ComponentPreview 
          code={`<GlassAvatarGroup max={4}>
  <GlassAvatar src="https://i.pravatar.cc/150?u=1" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=2" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=3" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=4" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=5" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=6" />
</GlassAvatarGroup>`}
          vueCode={`<GlassAvatarGroup :max="4">
  <GlassAvatar src="https://i.pravatar.cc/150?u=1" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=2" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=3" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=4" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=5" />
  <GlassAvatar src="https://i.pravatar.cc/150?u=6" />
</GlassAvatarGroup>`}
        >
          <GlassAvatarGroup max={4} size="lg">
            <GlassAvatar src="https://i.pravatar.cc/150?u=1" />
            <GlassAvatar src="https://i.pravatar.cc/150?u=2" />
            <GlassAvatar src="https://i.pravatar.cc/150?u=3" />
            <GlassAvatar src="https://i.pravatar.cc/150?u=4" />
            <GlassAvatar src="https://i.pravatar.cc/150?u=5" />
            <GlassAvatar src="https://i.pravatar.cc/150?u=6" />
          </GlassAvatarGroup>
        </ComponentPreview>
      </div>

      {/* Props - Avatar */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">GlassAvatar</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th>
                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Default</th>
                <th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>src</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Image source URL</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>alt</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">""</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Alt text for the image</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>fallback</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Initials to show when no image</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>fallbackIcon</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">ReactNode</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Custom icon for fallback</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>variant</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default" | "glass" | "gradient"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Visual style variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"xs" | "sm" | "md" | "lg" | "xl" | "2xl"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Avatar size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>shape</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"circle" | "square"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"circle"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Avatar shape</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>status</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"online" | "offline" | "busy" | "away"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Status indicator</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>ring</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Show decorative ring</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>ringColor</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default" | "primary" | "success" | "warning" | "error"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Ring color</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 text-lg font-semibold text-[hsl(var(--foreground))]">GlassAvatarGroup</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th>
                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Default</th>
                <th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>max</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">number</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Maximum avatars to display</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"xs" | "sm" | "md" | "lg" | "xl" | "2xl"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Size for all avatars</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))]">
          <li>Always provide <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">alt</code> text for avatar images</li>
          <li>Fallback initials are automatically derived from the <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">fallback</code> prop</li>
          <li>Status indicators are decorative - provide text alternatives if status is important</li>
          <li>Default user icon shown when no image or fallback provided</li>
        </ul>
      </div>
    </div>
  );
}
