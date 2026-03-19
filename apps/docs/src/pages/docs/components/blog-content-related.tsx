import { BlogContentRelated } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const sampleRelated = [
  {
    title: 'Advanced React Patterns',
    excerpt: 'Master advanced patterns in React development.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    category: 'React',
    href: '#',
  },
  {
    title: 'TypeScript Best Practices',
    excerpt: 'Write safer and more maintainable TypeScript code.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    category: 'TypeScript',
    href: '#',
  },
  {
    title: 'Web Performance Optimization',
    excerpt: 'Optimize your web applications for speed.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    category: 'Performance',
    href: '#',
  },
];

export function BlogContentRelatedDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="blog-content-related" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Blog Content Related
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Grid of related posts displayed at the end of an article.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<BlogContentRelated posts={related} />`}>
          <BlogContentRelated posts={sampleRelated} />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { BlogContentRelated } from '@archui/react';

export default function ArticleRelated() {
  return (
    <BlogContentRelated 
      heading="Related Articles"
      posts={[
        {
          title: 'Related Post 1',
          excerpt: 'Post excerpt...',
          image: 'https://...',
          category: 'React',
          href: '/blog/post-1',
        },
      ]}
      columns={3}
    />
  );
}`}
        />
      </div>
    </div>
  );
}

export default BlogContentRelatedDocs;
