import { useState } from 'react';
import { GlassSlider } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassSliderDocs() {
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-slider" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Slider
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Range input with glass-styled track and custom thumb.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassSlider value={value} onValueChange={setValue} />`}
        >
          <div className="space-y-4 w-full max-w-xs">
            <GlassSlider value={value} onChange={setValue} />
            <p className="text-sm text-gray-600 dark:text-gray-400">Value: {value}</p>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassSlider } from '@archui/react';
import { useState } from 'react';

export default function Example() {
  const [value, setValue] = useState(50);

  return (
    <GlassSlider 
      value={value} 
      onValueChange={setValue}
      min={0}
      max={100}
      step={1}
    />
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="with-tooltip" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          With Tooltip
        </h2>
        <ComponentPreview 
          code={`<GlassSlider value={value} onValueChange={setValue} showTooltip />`}
        >
          <div className="w-full max-w-xs">
            <GlassSlider value={value} onChange={setValue} showTooltip />
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}

export default GlassSliderDocs;
