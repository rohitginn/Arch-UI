import { TimelineSection } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const timelineEvents = [
  { date: '2024-01', title: 'Project Start', description: 'Initial project kickoff' },
  { date: '2024-03', title: 'MVP Release', description: 'First production release' },
  { date: '2024-06', title: 'v1.0 Launch', description: 'General availability' },
  { date: '2024-09', title: 'Community Milestone', description: '10K users reached' },
];

export function TimelineSectionDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="timeline-section" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Timeline Section
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Vertical or alternating timeline component with events, dates, and descriptions.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<TimelineSection milestones={milestones} layout="vertical" />`}>
          <div className="border rounded-lg p-8 bg-gray-50 dark:bg-gray-900">
            <TimelineSection 
              milestones={timelineEvents}
              layout="vertical"
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock
          code={`import { TimelineSection } from '@archui/react';

export default function Roadmap() {
  const events = [
    { 
      id: 1, 
      date: '2024-01', 
      title: 'Phase 1', 
      description: 'Foundation and core features'
    },
    { 
      id: 2, 
      date: '2024-06', 
      title: 'Phase 2', 
      description: 'Advanced capabilities'
    },
    { 
      id: 3, 
      date: '2024-12', 
      title: 'Phase 3', 
      description: 'Ecosystem integration'
    },
  ];

  return (
    <TimelineSection 
      events={events}
      variant="vertical"
      renderEvent={(event) => (
        <div>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
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
            <code className="text-sm font-semibold">events</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Array of timeline events with id, date, title, description</p>
          </div>
          <div>
            <code className="text-sm font-semibold">variant</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Layout variant: 'vertical' | 'alternating'</p>
          </div>
          <div>
            <code className="text-sm font-semibold">renderEvent</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Optional custom render function for event content</p>
          </div>
          <div>
            <code className="text-sm font-semibold">alignment</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Timeline alignment: 'left' | 'center' | 'right'</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Variants
        </h2>
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <code className="text-sm font-semibold">vertical</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Single-column layout with events stacked vertically</p>
          </div>
          <div>
            <code className="text-sm font-semibold">alternating</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Events alternating left-right across the timeline</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="features" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Features
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Vertical and alternating layout options</li>
          <li>• Customizable dot indicators</li>
          <li>• Connected line between events</li>
          <li>• Date and title labels</li>
          <li>• Custom content rendering</li>
          <li>• Glass morphism styling</li>
          <li>• Responsive design</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 id="use-cases" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Use Cases
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Product roadmaps</li>
          <li>• Company history or milestones</li>
          <li>• Project phases and stages</li>
          <li>• Release notes chronology</li>
          <li>• Event listings</li>
          <li>• Process workflows</li>
        </ul>
      </div>
    </div>
  );
}

export default TimelineSectionDocs;
