import { BlogGrid } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const samplePosts = [
  {
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and start building amazing UIs.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=450&fit=crop',
    category: 'Tutorial',
    author: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop' },
    readTime: '5 min read',
    date: 'Feb 28, 2026',
    href: '#',
  },
  {
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Master advanced TypeScript patterns for type-safe applications.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop',
    category: 'Advanced',
    author: { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop' },
    readTime: '8 min read',
    date: 'Feb 27, 2026',
    href: '#',
  },
  {
    title: 'Design Systems 101',
    excerpt: 'Build scalable design systems that grow with your product.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    category: 'Design',
    author: { name: 'Jordan Lee', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop' },
    readTime: '6 min read',
    date: 'Feb 26, 2026',
    href: '#',
  },
];

export function BlogGridDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="blog-grid" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Blog Grid
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Responsive grid layout for displaying blog posts with covers, metadata, and hover effects.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<BlogGrid posts={posts} />`}>
          <BlogGrid posts={samplePosts} />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { BlogGrid } from '@archui/react';

const posts = [
  {
    title: 'Getting Started',
    excerpt: 'Learn the basics...',
    image: 'https://...',
    category: 'Tutorial',
    author: { name: 'John Doe', avatar: 'https://...' },
    readTime: '5 min',
    date: 'Feb 28, 2026',
    href: '/blog/post',
  },
  // ... more posts
];

export default function Blog() {
  return <BlogGrid posts={posts} />;
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="api" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          API
        </h2>
        <div className="space-y-2 text-sm">
          <p><strong>posts</strong> - Array of blog post objects</p>
          <p><strong>columns</strong> - Grid columns: 2 | 3 (default: 3)</p>
          <p><strong>heading</strong> - Optional section heading</p>
          <p><strong>subheading</strong> - Optional subheading text</p>
        </div>
      </div>
    </div>
  );
}

export default BlogGridDocs;
