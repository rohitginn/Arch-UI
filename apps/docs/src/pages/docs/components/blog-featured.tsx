import { BlogFeatured } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const sampleFeatured = {
  title: 'The Future of Web Components',
  excerpt: 'Explore how web components are shaping the future of modern web development.',
  image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
  category: 'Featured',
  author: { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop' },
  readTime: '10 min read',
  date: 'Feb 28, 2026',
  href: '#',
};

const sampleRelated = [
  {
    title: 'Web Components Best Practices',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    category: 'Tutorial',
    href: '#',
  },
  {
    title: 'Shadow DOM Deep Dive',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    category: 'Advanced',
    href: '#',
  },
  {
    title: 'Custom Elements Guide',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    category: 'Guide',
    href: '#',
  },
];

export function BlogFeaturedDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="blog-featured" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Blog Featured
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Hero-style featured post with grid of related articles below.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<BlogFeatured featured={featured} related={related} />`}>
          <BlogFeatured featured={sampleFeatured} posts={sampleRelated} />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { BlogFeatured } from '@archui/react';

export default function FeaturedBlog() {
  return (
    <BlogFeatured 
      featured={{
        title: 'Featured Post',
        excerpt: 'This is the featured article...',
        image: 'https://...',
        category: 'Featured',
        author: { name: 'John' },
        href: '/blog/post',
      }}
      related={[...]}
    />
  );
}`}
        />
      </div>
    </div>
  );
}

export default BlogFeaturedDocs;
