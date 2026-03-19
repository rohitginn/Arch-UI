import { useState } from 'react';
import { GlassPopover } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassPopoverDocs() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-popover" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Popover
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Floating content panel anchored to a trigger element with full positioning control.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassPopover open={open} onOpenChange={setOpen} placement="bottom">
  <button>Click me</button>
  <div className="p-4 w-64">
    <h3 className="font-semibold">Popover Content</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
      This content floats above the page with glass styling.
    </p>
  </div>
</GlassPopover>`}
        >
          <GlassPopover 
            open={open} 
            onOpenChange={setOpen} 
            placement="bottom"
            content={
              <div className="p-4 w-64">
                <h3 className="font-semibold">Popover Content</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  This content floats above the page with glass styling.
                </p>
              </div>
            }
          >
            <button className="px-3 py-2 rounded-lg bg-blue-500 text-white">
              Click me
            </button>
          </GlassPopover>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassPopover } from '@archui/react';
import { useState } from 'react';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <GlassPopover 
      open={open} 
      onOpenChange={setOpen}
      placement="bottom"
      trigger="click"
    >
      <button>Open</button>
      <div className="p-4">Content here</div>
    </GlassPopover>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="placement" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Placements
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Supports: top, bottom, left, right, top-start, top-end, bottom-start, bottom-end
        </p>
      </div>
    </div>
  );
}

export default GlassPopoverDocs;
