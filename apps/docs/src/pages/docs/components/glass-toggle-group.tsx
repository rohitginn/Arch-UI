import { useState } from 'react';
import { GlassToggleGroup } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const viewItems = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'layout', label: 'Layout' },
];

const singleItems = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export function GlassToggleGroupDocs() {
  const [value, setValue] = useState<string | string[]>('layout');

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-toggle-group" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Toggle Group
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Grouped toggle set with single or multiple selection modes.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassToggleGroup
  items={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'layout', label: 'Layout' },
  ]}
  value={value}
  onValueChange={setValue}
  type="single"
/>`}
        >
          <GlassToggleGroup
            items={viewItems}
            value={value}
            onValueChange={setValue}
            type="single"
          />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassToggleGroup } from '@archui/react';
import { useState } from 'react';

export default function Example() {
  const [value, setValue] = useState<string | string[]>('single');

  return (
    <GlassToggleGroup
      items={[
        { value: 'single', label: 'Single' },
        { value: 'multiple', label: 'Multiple' },
      ]}
      value={value}
      onValueChange={setValue}
      type="single"
    />
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="types" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Selection Types
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Single Selection</h3>
            <ComponentPreview 
              code={`<GlassToggleGroup
  type="single"
  value="option1"
  items={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
/>`}
            >
              <GlassToggleGroup type="single" value="option1" items={singleItems} />
            </ComponentPreview>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlassToggleGroupDocs;
