import { useState } from 'react';
import { GlassColorSwatch } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassColorSwatchDocs() {
  const [selected, setSelected] = useState('#3b82f6');

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-color-swatch" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Color Swatch
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Clickable color chip that copies hex value to clipboard.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassColorSwatch 
  color="#3b82f6"
  selected={selected === '#3b82f6'}
  onClick={() => setSelected('#3b82f6')}
/>
<GlassColorSwatch 
  color="#ef4444"
  selected={selected === '#ef4444'}
  onClick={() => setSelected('#ef4444')}
/>`}
        >
          <div className="flex items-center gap-4">
            <GlassColorSwatch 
              color="#3b82f6"
              selected={selected === '#3b82f6'}
              onClick={() => setSelected('#3b82f6')}
            />
            <GlassColorSwatch 
              color="#ef4444"
              selected={selected === '#ef4444'}
              onClick={() => setSelected('#ef4444')}
            />
            <GlassColorSwatch 
              color="#22c55e"
              selected={selected === '#22c55e'}
              onClick={() => setSelected('#22c55e')}
            />
            <GlassColorSwatch 
              color="#f59e0b"
              selected={selected === '#f59e0b'}
              onClick={() => setSelected('#f59e0b')}
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassColorSwatch } from '@archui/react';
import { useState } from 'react';

export default function Example() {
  const [selected, setSelected] = useState('#3b82f6');

  return (
    <GlassColorSwatch 
      color="#3b82f6"
      selected={selected === '#3b82f6'}
      onClick={() => setSelected('#3b82f6')}
    />
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassColorSwatch color="#3b82f6" size="sm" />
<GlassColorSwatch color="#3b82f6" size="md" />
<GlassColorSwatch color="#3b82f6" size="lg" />`}
        >
          <div className="flex items-center gap-4">
            <GlassColorSwatch color="#3b82f6" size="sm" />
            <GlassColorSwatch color="#3b82f6" size="md" />
            <GlassColorSwatch color="#3b82f6" size="lg" />
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}

export default GlassColorSwatchDocs;
