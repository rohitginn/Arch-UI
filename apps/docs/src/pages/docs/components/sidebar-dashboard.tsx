import { SidebarDashboard } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const navGroups = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '#', active: true },
      { label: 'Analytics', href: '#' },
      { label: 'Reports', href: '#' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Profile', href: '#' },
      { label: 'Preferences', href: '#' },
      { label: 'Security', href: '#', badge: '2' },
    ],
  },
];

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
};

export function SidebarDashboardDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="sidebar-dashboard" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Sidebar Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Collapsible navigation sidebar with user profile, nav groups, and footer content.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<SidebarDashboard groups={navGroups} user={user} />`}>
          <div className="border rounded-lg h-96 overflow-hidden">
            <SidebarDashboard groups={navGroups} user={user} />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { SidebarDashboard } from '@archui/react';

export default function Layout() {
  return (
    <SidebarDashboard
      groups={[
        {
          title: 'Main',
          items: [
            { label: 'Dashboard', href: '/', active: true },
            { label: 'Analytics', href: '/analytics' },
          ],
        },
      ]}
      user={{
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://...',
      }}
    />
  );
}`}
        />
      </div>
    </div>
  );
}

export default SidebarDashboardDocs;
