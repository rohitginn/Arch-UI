import { BlogList } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const sampleList = [
  {
    title: 'React Server Components Explained',
    excerpt: 'A deep dive into how React Server Components work and why they matter.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
    category: 'React',
    author: { name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' },
    readTime: '7 min read',
    date: 'Feb 28, 2026',
    href: '#',
  },
  {
    title: 'CSS-in-JS Performance Tips',
    excerpt: 'Optimize your styling performance with these practical techniques.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    category: 'Performance',
    author: { name: 'Sam Lee', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' },
    readTime: '5 min read',
    date: 'Feb 27, 2026',
    href: '#',
  },
];

export function BlogListDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="blog-list" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Blog List
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Vertical list layout for blog posts with thumbnails and metadata.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<BlogList posts={posts} />`}>
          <BlogList posts={sampleList} />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { BlogList } from '@archui/react';

export default function Posts() {
  return (
    <BlogList 
      heading="Latest Articles"
      posts={[
        {
          title: 'Article Title',
          excerpt: 'Article excerpt...',
          image: 'https://...',
          category: 'React',
          author: { name: 'John' },
          readTime: '5 min',
          date: 'Feb 28, 2026',
          href: '/blog/post',
        },
      ]}
    />
  );
}`}
        />
      </div>
    </div>
  );
}

export default BlogListDocs;
