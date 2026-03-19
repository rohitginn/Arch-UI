import { GlassScrollArea } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassScrollAreaDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-scroll-area" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Scroll Area
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Custom scrollbar replacement with glass styling.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassScrollArea maxHeight="200px">
  <div className="space-y-2 pr-4">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="p-2 rounded bg-gray-100 dark:bg-gray-800">
        Item {i + 1}
      </div>
    ))}
  </div>
</GlassScrollArea>`}
        >
          <GlassScrollArea maxHeight="200px">
            <div className="space-y-2 pr-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="p-2 rounded bg-gray-100 dark:bg-gray-800">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </GlassScrollArea>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassScrollArea } from '@archui/react';

export default function Example() {
  return (
    <GlassScrollArea orientation="vertical" maxHeight="300px">
      {/* Long content goes here */}
    </GlassScrollArea>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Props
        </h2>
        <div className="space-y-2 text-sm">
          <div>
            <strong>orientation</strong>: 'vertical' | 'horizontal' | 'both' (default: 'vertical')
          </div>
          <div>
            <strong>maxHeight</strong>: CSS height value (default: '400px')
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlassScrollAreaDocs;
