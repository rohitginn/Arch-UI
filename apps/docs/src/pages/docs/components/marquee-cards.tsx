import { MarqueeCards } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const sampleCards = [
  { title: 'Card One', description: 'Design system fundamentals' },
  { title: 'Card Two', description: 'Building components' },
  { title: 'Card Three', description: 'Animation patterns' },
  { title: 'Card Four', description: 'Accessibility best practices' },
  { title: 'Card Five', description: 'Performance optimization' },
];

export function MarqueeCardsDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="marquee-cards" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Marquee Cards
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Horizontally scrolling card carousel with continuous loop animation.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<MarqueeCards topRow={cards} speed="normal" pauseOnHover />`}>
          <div className="border rounded-lg p-4 h-40 overflow-hidden">
            <MarqueeCards 
              topRow={sampleCards}
              speed="normal"
              pauseOnHover
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock
          code={`import { MarqueeCards } from '@archui/react';

export default function Showcase() {
  const cards = [
    { id: 1, title: 'Feature One', description: 'Description' },
    { id: 2, title: 'Feature Two', description: 'Description' },
    { id: 3, title: 'Feature Three', description: 'Description' },
  ];

  return (
    <MarqueeCards
      items={cards}
      speed="normal"
      pauseOnHover={true}
      renderCard={(card) => (
        <div className="p-4 border rounded">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      )}
    />
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="api" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          API
        </h2>
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <code className="text-sm font-semibold">items</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Array of items to display</p>
          </div>
          <div>
            <code className="text-sm font-semibold">speed</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Animation speed: 'slow' | 'normal' | 'fast'</p>
          </div>
          <div>
            <code className="text-sm font-semibold">pauseOnHover</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Boolean to pause animation on hover</p>
          </div>
          <div>
            <code className="text-sm font-semibold">renderCard</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Optional custom render function for cards</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="features" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Features
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Continuous infinite scroll animation</li>
          <li>• Adjustable animation speed</li>
          <li>• Pause on hover option</li>
          <li>• Seamless loop</li>
          <li>• Responsive layout</li>
          <li>• Custom card rendering</li>
        </ul>
      </div>
    </div>
  );
}

export default MarqueeCardsDocs;
