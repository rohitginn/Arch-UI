import { useState } from 'react';
import { GlassButton } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { Home, Settings, User, Menu, X } from 'lucide-react';

export function GlassSidebarDocs() {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-sidebar" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Sidebar
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A collapsible sidebar component with glassmorphic styling for navigation layouts.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview code={`const [open, setOpen] = useState(false);

<GlassButton onClick={() => setOpen(true)}>
  <Menu className="h-4 w-4 mr-2" />
  Open Sidebar
</GlassButton>

<GlassSidebar 
  open={open} 
  onClose={() => setOpen(false)}
  header={<h2 className="font-semibold">My App</h2>}
>
  <nav className="p-2 space-y-1">
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white">
      <Home className="h-4 w-4" />
      Dashboard
    </div>
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white">
      <User className="h-4 w-4" />
      Profile
    </div>
  </nav>
</GlassSidebar>`}
          vueCode={`<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

<template>
  <GlassButton @click="open = true">
    <Menu class="h-4 w-4 mr-2" />
    Open Sidebar
  </GlassButton>

  <GlassSidebar :open="open" @close="open = false">
    <template #header>
      <h2 class="font-semibold">My App</h2>
    </template>
    <nav class="p-2 space-y-1">
      <div class="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white">
        Dashboard
      </div>
    </nav>
  </GlassSidebar>
</template>`}
        >
          {/* Static sidebar preview (contained, not using portal) */}
          <div className="flex w-full max-w-lg h-64 rounded-xl overflow-hidden border border-white/10">
            {/* Sidebar */}
            <div 
              className={`h-full flex flex-col backdrop-blur-xl bg-white/5 border-r border-white/10 transition-all duration-300 ${open ? 'w-52' : 'w-0 overflow-hidden'}`}
            >
              <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-semibold text-white text-sm">My App</h2>
                <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 p-2 space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10 text-white text-sm">
                  <Home className="h-4 w-4" />
                  Dashboard
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 cursor-pointer transition-colors text-sm">
                  <User className="h-4 w-4" />
                  Profile
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 cursor-pointer transition-colors text-sm">
                  <Settings className="h-4 w-4" />
                  Settings
                </div>
              </div>
            </div>
            {/* Content area */}
            <div className="flex-1 p-4 flex items-center justify-center bg-slate-900/50">
              {!open && (
                <GlassButton onClick={() => setOpen(true)}>
                  <Menu className="h-4 w-4 mr-2" />
                  Open Sidebar
                </GlassButton>
              )}
              {open && (
                <p className="text-white/40 text-sm">Main content area</p>
              )}
            </div>
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
        <CodeBlock code={`npm install @archui/react
# or
pnpm add @archui/react`} />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Usage
        </h2>
        <CodeBlock code={`import { useState } from 'react';
import { GlassSidebar, GlassButton } from '@archui/react';
import { Home, Settings, User } from 'lucide-react';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GlassButton onClick={() => setOpen(true)}>Open Menu</GlassButton>
      
      <GlassSidebar
        open={open}
        onClose={() => setOpen(false)}
        header={<h2>My App</h2>}
      >
      <div className="flex-1 p-2">
        <a href="/" className="flex items-center gap-3 px-3 py-2">
          <Home className="h-4 w-4" />
          Dashboard
        </a>
        <a href="/profile" className="flex items-center gap-3 px-3 py-2">
          <User className="h-4 w-4" />
          Profile
        </a>
        <a href="/settings" className="flex items-center gap-3 px-3 py-2">
          <Settings className="h-4 w-4" />
          Settings
        </a>
      </div>
    </GlassSidebar>
  );
}`} />
      </div>

      {/* Collapsible */}
      <div className="space-y-4">
        <h2 id="collapsible" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Collapsible Mode
        </h2>
        <CodeBlock code={`const [collapsed, setCollapsed] = useState(false);

<GlassSidebar collapsed={collapsed}>
  <div className="p-4">
    <button onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? '→' : '←'}
    </button>
  </div>
  
  <div className="p-2">
    <div className="flex items-center gap-3 px-3 py-2">
      <Home className="h-4 w-4" />
      {!collapsed && 'Dashboard'}
    </div>
  </div>
</GlassSidebar>`} />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 id="sidebar-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassSidebar Props
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>collapsed</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Collapse sidebar to icons only</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>position</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"left" | "right"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"left"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Sidebar position</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>blur</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg" | "xl"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Backdrop blur intensity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
