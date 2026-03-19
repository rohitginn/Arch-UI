import { useState } from 'react';
import { GlassList, GlassListItem } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassListDocs() {
  const [selected, setSelected] = useState('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-list" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass List
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Structured list component with leading icons, trailing actions, and selection states.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassList variant="divided">
  <GlassListItem interactive active={selected === 'profile'} onClick={() => setSelected('profile')}>
    Profile
  </GlassListItem>
  <GlassListItem interactive active={selected === 'settings'} onClick={() => setSelected('settings')}>
    Settings
  </GlassListItem>
  <GlassListItem interactive disabled>
    Disabled Item
  </GlassListItem>
</GlassList>`}
        >
          <GlassList variant="divided">
            <GlassListItem interactive active={selected === 'profile'} onClick={() => setSelected('profile')}>
              Profile
            </GlassListItem>
            <GlassListItem interactive active={selected === 'settings'} onClick={() => setSelected('settings')}>
              Settings
            </GlassListItem>
            <GlassListItem interactive disabled>
              Disabled Item
            </GlassListItem>
          </GlassList>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassList, GlassListItem } from '@archui/react';
import { useState } from 'react';

export default function Example() {
  const [selected, setSelected] = useState('first');

  return (
    <GlassList>
      <GlassListItem 
        interactive 
        active={selected === 'first'} 
        onClick={() => setSelected('first')}
      >
        First Item
      </GlassListItem>
      <GlassListItem 
        interactive 
        active={selected === 'second'} 
        onClick={() => setSelected('second')}
      >
        Second Item
      </GlassListItem>
    </GlassList>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          List Variants
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Default</h3>
            <ComponentPreview 
              code={`<GlassList>
  <GlassListItem>Item 1</GlassListItem>
  <GlassListItem>Item 2</GlassListItem>
</GlassList>`}
            >
              <GlassList>
                <GlassListItem>Item 1</GlassListItem>
                <GlassListItem>Item 2</GlassListItem>
              </GlassList>
            </ComponentPreview>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Bordered</h3>
            <ComponentPreview 
              code={`<GlassList variant="bordered">
  <GlassListItem>Item 1</GlassListItem>
  <GlassListItem>Item 2</GlassListItem>
</GlassList>`}
            >
              <GlassList variant="bordered">
                <GlassListItem>Item 1</GlassListItem>
                <GlassListItem>Item 2</GlassListItem>
              </GlassList>
            </ComponentPreview>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="with-secondary" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          With Secondary Text
        </h2>
        <ComponentPreview 
          code={`<GlassList variant="divided">
  <GlassListItem secondary="user@example.com">
    John Doe
  </GlassListItem>
  <GlassListItem secondary="admin@example.com">
    Admin User
  </GlassListItem>
</GlassList>`}
        >
          <GlassList variant="divided">
            <GlassListItem secondary="user@example.com">
              John Doe
            </GlassListItem>
            <GlassListItem secondary="admin@example.com">
              Admin User
            </GlassListItem>
          </GlassList>
        </ComponentPreview>
      </div>
    </div>
  );
}

export default GlassListDocs;
