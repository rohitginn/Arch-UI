import { useState } from 'react';
import { GlassDropdown, GlassDropdownTrigger, GlassDropdownContent, GlassDropdownItem, GlassButton } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassDropdownDocs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-dropdown" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Dropdown
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A dropdown menu component with glassmorphic styling and smooth animations.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassDropdown open={isOpen} onOpenChange={setIsOpen}>
  <GlassDropdownTrigger asChild>
    <GlassButton>Open Menu</GlassButton>
  </GlassDropdownTrigger>
  <GlassDropdownContent>
    <GlassDropdownItem>Profile</GlassDropdownItem>
    <GlassDropdownItem>Settings</GlassDropdownItem>
    <GlassDropdownItem>Logout</GlassDropdownItem>
  </GlassDropdownContent>
</GlassDropdown>`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassDropdown, GlassDropdownTrigger, GlassDropdownContent, GlassDropdownItem, GlassButton } from '@archui/vue';

const isOpen = ref(false);
</script>

<template>
  <GlassDropdown :open="isOpen" @update:open="isOpen = $event">
    <GlassDropdownTrigger as-child>
      <GlassButton>Open Menu</GlassButton>
    </GlassDropdownTrigger>
    <GlassDropdownContent>
      <GlassDropdownItem>Profile</GlassDropdownItem>
      <GlassDropdownItem>Settings</GlassDropdownItem>
      <GlassDropdownItem>Logout</GlassDropdownItem>
    </GlassDropdownContent>
  </GlassDropdown>
</template>`}
        >
          <GlassDropdown open={isOpen} onOpenChange={setIsOpen}>
            <GlassDropdownTrigger asChild>
              <GlassButton>Open Menu</GlassButton>
            </GlassDropdownTrigger>
            <GlassDropdownContent>
              <GlassDropdownItem>Profile</GlassDropdownItem>
              <GlassDropdownItem>Settings</GlassDropdownItem>
              <GlassDropdownItem>Logout</GlassDropdownItem>
            </GlassDropdownContent>
          </GlassDropdown>
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
          code={`import { 
  GlassDropdown, 
  GlassDropdownTrigger, 
  GlassDropdownContent, 
  GlassDropdownItem 
} from '@archui/react';

export default function Example() {
  return (
    <GlassDropdown>
      <GlassDropdownTrigger>
        <button>Open Menu</button>
      </GlassDropdownTrigger>
      
      <GlassDropdownContent>
        <GlassDropdownItem>Profile</GlassDropdownItem>
        <GlassDropdownItem>Settings</GlassDropdownItem>
        <GlassDropdownItem>Logout</GlassDropdownItem>
      </GlassDropdownContent>
    </GlassDropdown>
  );
}`}
          vueCode={`<script setup>
import { 
  GlassDropdown, 
  GlassDropdownTrigger, 
  GlassDropdownContent, 
  GlassDropdownItem 
} from '@archui/vue';
</script>

<template>
  <GlassDropdown>
    <GlassDropdownTrigger>
      <button>Open Menu</button>
    </GlassDropdownTrigger>
    
    <GlassDropdownContent>
      <GlassDropdownItem>Profile</GlassDropdownItem>
      <GlassDropdownItem>Settings</GlassDropdownItem>
      <GlassDropdownItem>Logout</GlassDropdownItem>
    </GlassDropdownContent>
  </GlassDropdown>
</template>`}
        />
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h2 id="with-icons" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Icons
        </h2>
        <CodeBlock 
          code={`import { User, Settings, LogOut } from 'lucide-react';

<GlassDropdownContent>
  <GlassDropdownItem>
    <User className="mr-2 h-4 w-4" />
    Profile
  </GlassDropdownItem>
  <GlassDropdownItem>
    <Settings className="mr-2 h-4 w-4" />
    Settings
  </GlassDropdownItem>
  <GlassDropdownItem variant="destructive">
    <LogOut className="mr-2 h-4 w-4" />
    Logout
  </GlassDropdownItem>
</GlassDropdownContent>`}
          vueCode={`<script setup>
import { User, Settings, LogOut } from 'lucide-vue-next';
import { GlassDropdownContent, GlassDropdownItem } from '@archui/vue';
</script>

<template>
  <GlassDropdownContent>
    <GlassDropdownItem>
      <User class="mr-2 h-4 w-4" />
      Profile
    </GlassDropdownItem>
    <GlassDropdownItem>
      <Settings class="mr-2 h-4 w-4" />
      Settings
    </GlassDropdownItem>
    <GlassDropdownItem variant="destructive">
      <LogOut class="mr-2 h-4 w-4" />
      Logout
    </GlassDropdownItem>
  </GlassDropdownContent>
</template>`}
        />
      </div>

      {/* Alignment */}
      <div className="space-y-4">
        <h2 id="alignment" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Alignment
        </h2>
        <CodeBlock 
          code={`// Align to start (left)
<GlassDropdownContent align="start">...</GlassDropdownContent>

// Align to center
<GlassDropdownContent align="center">...</GlassDropdownContent>

// Align to end (right)
<GlassDropdownContent align="end">...</GlassDropdownContent>`}
          vueCode={`<!-- Align to start (left) -->
<GlassDropdownContent align="start">...</GlassDropdownContent>

<!-- Align to center -->
<GlassDropdownContent align="center">...</GlassDropdownContent>

<!-- Align to end (right) -->
<GlassDropdownContent align="end">...</GlassDropdownContent>`}
        />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 id="content-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassDropdownContent Props
        </h3>
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>align</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"start" | "center" | "end"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"start"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Horizontal alignment</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>blur</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg" | "xl"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"lg"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Backdrop blur intensity</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 id="item-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassDropdownItem Props
        </h3>
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>variant</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default" | "destructive"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Item style variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>disabled</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Disable the item</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
