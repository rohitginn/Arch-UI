import { GlassKbd } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassKbdDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-kbd" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Kbd
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Keyboard shortcut keycap display component.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassKbd keys="⌘" />
<GlassKbd keys={['⌘', 'K']} />
<GlassKbd keys={['Ctrl', 'Shift', 'N']} separator="+" />`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <GlassKbd keys="⌘" />
            <GlassKbd keys={['⌘', 'K']} />
            <GlassKbd keys={['Ctrl', 'Shift', 'N']} />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassKbd } from '@archui/react';

export default function Example() {
  return (
    <div className="space-y-4">
      <GlassKbd keys="⌘" />
      <GlassKbd keys={['⌘', 'K']} />
      <GlassKbd keys={['Ctrl', 'Shift', 'N']} />
    </div>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassKbd keys="⌘" size="sm" />
<GlassKbd keys="⌘" size="md" />
<GlassKbd keys="⌘" size="lg" />`}
        >
          <div className="flex items-center gap-4">
            <GlassKbd keys="⌘" />
            <GlassKbd keys="⌘" />
            <GlassKbd keys="⌘" />
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}

export default GlassKbdDocs;
