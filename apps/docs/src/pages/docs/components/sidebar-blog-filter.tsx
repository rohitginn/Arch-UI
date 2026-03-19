import { SidebarBlogFilter } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { useState } from 'react';

const categories = [
  { label: 'React', value: 'react', count: 24 },
  { label: 'TypeScript', value: 'typescript', count: 18 },
  { label: 'Design', value: 'design', count: 12 },
];

const tags = [
  { label: 'Tutorial', value: 'tutorial' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Performance', value: 'performance' },
];

export function SidebarBlogFilterDocs() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 id="sidebar-blog-filter" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Sidebar Blog Filter
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Right sidebar with search, category filters, tag cloud, and recent posts.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<SidebarBlogFilter {...filterProps} />`}>
          <SidebarBlogFilter
            categories={categories}
            tags={tags}
            selectedCategories={selectedCategories}
            selectedTags={selectedTags}
            searchValue={searchValue}
            onCategoriesChange={setSelectedCategories}
            onTagsChange={setSelectedTags}
            onSearchChange={setSearchValue}
          />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { SidebarBlogFilter } from '@archui/react';
import { useState } from 'react';

export default function BlogSidebar() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <SidebarBlogFilter
      categories={[
        { label: 'React', value: 'react', count: 24 },
      ]}
      selectedCategories={selected}
      onCategoriesChange={setSelected}
    />
  );
}`}
        />
      </div>
    </div>
  );
}

export default SidebarBlogFilterDocs;
