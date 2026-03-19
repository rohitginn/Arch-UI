import { useState } from 'react';
import { GlassToggle } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassToggleDocs() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-toggle" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Toggle
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          On/off toggle button for toolbars.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassToggle pressed={pressed} onPressedChange={setPressed}>
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
</GlassToggle>`}
        >
          <GlassToggle pressed={pressed} onPressedChange={setPressed}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </GlassToggle>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassToggle } from '@archui/react';
import { useState } from 'react';

export default function Example() {
  const [pressed, setPressed] = useState(false);

  return (
    <GlassToggle pressed={pressed} onPressedChange={setPressed}>
      Toggle me
    </GlassToggle>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassToggle size="sm">Sm</GlassToggle>
<GlassToggle size="md">Md</GlassToggle>
<GlassToggle size="lg">Lg</GlassToggle>`}
        >
          <div className="flex items-center gap-2">
            <GlassToggle size="sm">Sm</GlassToggle>
            <GlassToggle size="md">Md</GlassToggle>
            <GlassToggle size="lg">Lg</GlassToggle>
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}

export default GlassToggleDocs;
