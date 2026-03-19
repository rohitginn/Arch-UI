import { GlassTabs, GlassTabsList, GlassTabsTrigger, GlassTabsContent } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { User, Settings, Bell, CreditCard } from 'lucide-react';

export function GlassTabsDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-tabs" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Tabs
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A tabbed interface component for organizing content into separate views with multiple style variants.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassTabs defaultValue="account">
  <GlassTabsList>
    <GlassTabsTrigger value="account">Account</GlassTabsTrigger>
    <GlassTabsTrigger value="password">Password</GlassTabsTrigger>
    <GlassTabsTrigger value="settings">Settings</GlassTabsTrigger>
  </GlassTabsList>
  <GlassTabsContent value="account">
    Account settings content...
  </GlassTabsContent>
  <GlassTabsContent value="password">
    Password settings content...
  </GlassTabsContent>
  <GlassTabsContent value="settings">
    General settings content...
  </GlassTabsContent>
</GlassTabs>`}
          vueCode={`<template>
  <GlassTabs defaultValue="account">
    <GlassTabsList>
      <GlassTabsTrigger value="account">Account</GlassTabsTrigger>
      <GlassTabsTrigger value="password">Password</GlassTabsTrigger>
    </GlassTabsList>
    <GlassTabsContent value="account">...</GlassTabsContent>
    <GlassTabsContent value="password">...</GlassTabsContent>
  </GlassTabs>
</template>`}
        >
          <div className="w-full max-w-md">
            <GlassTabs defaultValue="account">
              <GlassTabsList>
                <GlassTabsTrigger value="account">Account</GlassTabsTrigger>
                <GlassTabsTrigger value="password">Password</GlassTabsTrigger>
                <GlassTabsTrigger value="settings">Settings</GlassTabsTrigger>
              </GlassTabsList>
              <GlassTabsContent value="account">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-medium text-slate-900 dark:text-white">Account Settings</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage your account preferences.</p>
                </div>
              </GlassTabsContent>
              <GlassTabsContent value="password">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-medium text-slate-900 dark:text-white">Password Settings</h3>
                  <p className="text-sm text-slate-500 mt-1">Update your password here.</p>
                </div>
              </GlassTabsContent>
              <GlassTabsContent value="settings">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-medium text-slate-900 dark:text-white">General Settings</h3>
                  <p className="text-sm text-slate-500 mt-1">Configure app behavior.</p>
                </div>
              </GlassTabsContent>
            </GlassTabs>
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

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassTabs variant="default">...</GlassTabs>
<GlassTabs variant="pills">...</GlassTabs>
<GlassTabs variant="underline">...</GlassTabs>
<GlassTabs variant="glass">...</GlassTabs>
<GlassTabs variant="bordered">...</GlassTabs>`}
          vueCode={`<GlassTabs variant="pills">...</GlassTabs>`}
        >
          <div className="w-full space-y-8">
            {(['default', 'pills', 'underline', 'glass', 'bordered'] as const).map((variant) => (
              <div key={variant}>
                <p className="text-xs text-slate-500 mb-2">variant="{variant}"</p>
                <GlassTabs defaultValue="tab1" variant={variant}>
                  <GlassTabsList>
                    <GlassTabsTrigger value="tab1">Overview</GlassTabsTrigger>
                    <GlassTabsTrigger value="tab2">Analytics</GlassTabsTrigger>
                    <GlassTabsTrigger value="tab3">Reports</GlassTabsTrigger>
                  </GlassTabsList>
                </GlassTabs>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassTabs size="sm">...</GlassTabs>
<GlassTabs size="md">...</GlassTabs>
<GlassTabs size="lg">...</GlassTabs>`}
          vueCode={`<GlassTabs size="lg">...</GlassTabs>`}
        >
          <div className="w-full space-y-6">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size}>
                <p className="text-xs text-slate-500 mb-2">size="{size}"</p>
                <GlassTabs defaultValue="tab1" size={size}>
                  <GlassTabsList>
                    <GlassTabsTrigger value="tab1">Tab 1</GlassTabsTrigger>
                    <GlassTabsTrigger value="tab2">Tab 2</GlassTabsTrigger>
                    <GlassTabsTrigger value="tab3">Tab 3</GlassTabsTrigger>
                  </GlassTabsList>
                </GlassTabs>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h2 id="with-icons" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Icons
        </h2>
        <ComponentPreview 
          code={`<GlassTabs defaultValue="profile">
  <GlassTabsList>
    <GlassTabsTrigger value="profile" icon={<User />}>
      Profile
    </GlassTabsTrigger>
    <GlassTabsTrigger value="settings" icon={<Settings />}>
      Settings
    </GlassTabsTrigger>
    <GlassTabsTrigger value="notifications" icon={<Bell />}>
      Notifications
    </GlassTabsTrigger>
  </GlassTabsList>
</GlassTabs>`}
          vueCode={`<GlassTabsTrigger value="profile" :icon="UserIcon">
  Profile
</GlassTabsTrigger>`}
        >
          <div className="w-full">
            <GlassTabs defaultValue="profile" variant="pills">
              <GlassTabsList>
                <GlassTabsTrigger value="profile" icon={<User className="w-4 h-4" />}>
                  Profile
                </GlassTabsTrigger>
                <GlassTabsTrigger value="settings" icon={<Settings className="w-4 h-4" />}>
                  Settings
                </GlassTabsTrigger>
                <GlassTabsTrigger value="notifications" icon={<Bell className="w-4 h-4" />}>
                  Notifications
                </GlassTabsTrigger>
                <GlassTabsTrigger value="billing" icon={<CreditCard className="w-4 h-4" />}>
                  Billing
                </GlassTabsTrigger>
              </GlassTabsList>
            </GlassTabs>
          </div>
        </ComponentPreview>
      </div>

      {/* With Badge */}
      <div className="space-y-4">
        <h2 id="with-badge" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Badge
        </h2>
        <ComponentPreview 
          code={`<GlassTabsTrigger 
  value="notifications" 
  badge={<span className="badge">3</span>}
>
  Notifications
</GlassTabsTrigger>`}
          vueCode={`<GlassTabsTrigger value="notifications">
  Notifications
  <template #badge><span class="badge">3</span></template>
</GlassTabsTrigger>`}
        >
          <div className="w-full">
            <GlassTabs defaultValue="inbox">
              <GlassTabsList>
                <GlassTabsTrigger value="inbox">Inbox</GlassTabsTrigger>
                <GlassTabsTrigger 
                  value="notifications" 
                  badge={
                    <span className="px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                      3
                    </span>
                  }
                >
                  Notifications
                </GlassTabsTrigger>
                <GlassTabsTrigger 
                  value="updates"
                  badge={
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  }
                >
                  Updates
                </GlassTabsTrigger>
              </GlassTabsList>
            </GlassTabs>
          </div>
        </ComponentPreview>
      </div>

      {/* Disabled */}
      <div className="space-y-4">
        <h2 id="disabled" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Disabled Tabs
        </h2>
        <ComponentPreview 
          code={`<GlassTabsTrigger value="premium" disabled>
  Premium
</GlassTabsTrigger>`}
          vueCode={`<GlassTabsTrigger value="premium" disabled>
  Premium
</GlassTabsTrigger>`}
        >
          <div className="w-full">
            <GlassTabs defaultValue="free">
              <GlassTabsList>
                <GlassTabsTrigger value="free">Free Plan</GlassTabsTrigger>
                <GlassTabsTrigger value="pro">Pro Plan</GlassTabsTrigger>
                <GlassTabsTrigger value="premium" disabled>
                  Premium (Coming Soon)
                </GlassTabsTrigger>
              </GlassTabsList>
            </GlassTabs>
          </div>
        </ComponentPreview>
      </div>

      {/* Controlled */}
      <div className="space-y-4">
        <h2 id="controlled" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Controlled
        </h2>
        <CodeBlock 
          code={`const [activeTab, setActiveTab] = useState('tab1');

<GlassTabs value={activeTab} onValueChange={setActiveTab}>
  <GlassTabsList>
    <GlassTabsTrigger value="tab1">Tab 1</GlassTabsTrigger>
    <GlassTabsTrigger value="tab2">Tab 2</GlassTabsTrigger>
  </GlassTabsList>
  <GlassTabsContent value="tab1">Content 1</GlassTabsContent>
  <GlassTabsContent value="tab2">Content 2</GlassTabsContent>
</GlassTabs>`}
          vueCode={`<script setup>
const activeTab = ref('tab1');
</script>

<template>
  <GlassTabs v-model="activeTab">...</GlassTabs>
</template>`}
        />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 className="font-semibold text-[hsl(var(--foreground))]">GlassTabs</h3>
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
                <td className="py-3 font-mono text-xs">value</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Controlled active tab</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">defaultValue</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Initial active tab</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">onValueChange</td>
                <td className="py-3 font-mono text-xs">(value: string) =&gt; void</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Tab change callback</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">variant</td>
                <td className="py-3 font-mono text-xs">'default' | 'pills' | 'underline' | 'glass' | 'bordered'</td>
                <td className="py-3 font-mono text-xs">'default'</td>
                <td className="py-3">Visual style</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">size</td>
                <td className="py-3 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Tab size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">orientation</td>
                <td className="py-3 font-mono text-xs">'horizontal' | 'vertical'</td>
                <td className="py-3 font-mono text-xs">'horizontal'</td>
                <td className="py-3">Tab list orientation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold text-[hsl(var(--foreground))] mt-6">GlassTabsTrigger</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Prop</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">value</td>
                <td className="py-3 font-mono text-xs">string (required)</td>
                <td className="py-3">Unique tab identifier</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">icon</td>
                <td className="py-3 font-mono text-xs">ReactNode</td>
                <td className="py-3">Icon before label</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">badge</td>
                <td className="py-3 font-mono text-xs">ReactNode</td>
                <td className="py-3">Badge after label</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">disabled</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3">Disable tab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
