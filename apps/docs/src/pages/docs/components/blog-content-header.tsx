import { BlogContentHeader } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function BlogContentHeaderDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="blog-content-header" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Blog Content Header
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Article header with hero image, title, category badge, and author metadata.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<BlogContentHeader {...headerProps} />`}>
          <BlogContentHeader
            title="Building Accessible Web Components"
            category="Accessibility"
            image="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=450&fit=crop"
            author={{ 
              name: 'Dr. Sarah Johnson',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
            }}
            date="February 28, 2026"
            readTime="12 min read"
          />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { BlogContentHeader } from '@archui/react';

export default function ArticleHeader() {
  return (
    <BlogContentHeader
      title="Article Title"
      category="React"
      image="https://..."
      author={{ 
        name: 'Author Name',
        avatar: 'https://...'
      }}
      date="Feb 28, 2026"
      readTime="5 min read"
    />
  );
}`}
        />
      </div>
    </div>
  );
}

export default BlogContentHeaderDocs;
