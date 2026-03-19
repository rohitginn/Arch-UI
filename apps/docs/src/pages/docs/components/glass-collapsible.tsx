import { useState } from 'react';
import { GlassCollapsible } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassCollapsibleDocs() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-collapsible" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Collapsible
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Single-panel show/hide with animated height transition.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassCollapsible open={open} onOpenChange={setOpen}>
  <div>
    <h3 className="font-semibold">Expandable Content</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
      This content expands and collapses smoothly with animation.
    </p>
  </div>
</GlassCollapsible>`}
        >
          <div className="w-full max-w-md">
            <GlassCollapsible trigger="Expandable Content" open={open} onOpenChange={setOpen}>
              <div>
                <h3 className="font-semibold">Expandable Content</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  This content expands and collapses smoothly with animation.
                </p>
              </div>
            </GlassCollapsible>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassCollapsible } from '@archui/react';
import { useState } from 'react';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <GlassCollapsible open={open} onOpenChange={setOpen}>
      <p>Collapsible content goes here</p>
    </GlassCollapsible>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="custom-trigger" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Custom Trigger
        </h2>
        <ComponentPreview 
          code={`<GlassCollapsible open={open} onOpenChange={setOpen}>
  {(open) => (
    <>
      <button className="w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
        {open ? '▼' : '▶'} More Details
      </button>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Additional information is revealed here
      </div>
    </>
  )}
</GlassCollapsible>`}
        >
          <div className="w-full max-w-md">
            <GlassCollapsible trigger="Show details">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Collapsible content with default trigger
              </p>
            </GlassCollapsible>
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}

export default GlassCollapsibleDocs;
