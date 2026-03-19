import { useState } from 'react';
import { GlassTagInput } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassTagInputDocs() {
  const [tags, setTags] = useState(['React', 'Vue']);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-tag-input" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Tag Input
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Multi-tag input with Enter/comma to create, backspace to remove.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassTagInput 
  value={tags} 
  onValueChange={setTags}
  placeholder="Add tags..."
/>`}
        >
          <div className="w-full max-w-md">
            <GlassTagInput 
              value={tags} 
              onChange={setTags}
              placeholder="Add tags..."
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassTagInput } from '@archui/react';
import { useState } from 'react';

export default function Example() {
  const [tags, setTags] = useState(['Next.js', 'React']);

  return (
    <GlassTagInput 
      value={tags} 
      onValueChange={setTags}
      placeholder="Add a tag..."
      maxTags={10}
    />
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="states" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          States
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Disabled</h3>
            <ComponentPreview 
              code={`<GlassTagInput 
  value={['Tag 1', 'Tag 2']} 
  disabled
/>`}
            >
              <div className="w-full max-w-md">
                <GlassTagInput 
                  value={['Tag 1', 'Tag 2']} 
                  onChange={() => {}}
                  disabled
                />
              </div>
            </ComponentPreview>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Error</h3>
            <ComponentPreview 
              code={`<GlassTagInput 
  value={['invalid']} 
  error
/>`}
            >
              <div className="w-full max-w-md">
                <GlassTagInput 
                  value={['invalid']} 
                  onChange={() => {}}
                  error="Invalid tags provided"
                />
              </div>
            </ComponentPreview>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlassTagInputDocs;
