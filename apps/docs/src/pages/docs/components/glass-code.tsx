import { GlassCode } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassCodeDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-code" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Code
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Inline and block code display with optional copy-to-clipboard.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={String.raw`<GlassCode code="const greeting = 'Hello World';" />
<GlassCode 
  variant="block" 
  code="const greeting = 'Hello World';\nconsole.log(greeting);"
  language="javascript"
/>`}
        >
          <div className="space-y-4">
            <GlassCode code="const greeting = 'Hello World';" />
            <GlassCode 
              variant="block" 
              code={`const greeting = 'Hello World';\nconsole.log(greeting);`}
              language="javascript"
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassCode } from '@archui/react';

export default function Example() {
  return (
    <GlassCode 
      variant="block"
      code="npm install @archui/react"
      language="bash"
      showLineNumbers
    />
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Variants
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Inline</h3>
            <ComponentPreview 
              code={`<GlassCode code="npm install @archui/react" variant="inline" />`}
            >
              <GlassCode code="npm install @archui/react" variant="inline" />
            </ComponentPreview>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Block with line numbers</h3>
            <ComponentPreview 
              code={`<GlassCode 
  variant="block" 
  code="function hello() {\\n  return 'world'\\n}"
  language="javascript"
  showLineNumbers
/>`}
            >
              <GlassCode 
                variant="block" 
                code={`function hello() {\n  return 'world'\n}`}
                language="javascript"
                lineNumbers
              />
            </ComponentPreview>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlassCodeDocs;
