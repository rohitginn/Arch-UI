import { BlogContentBody } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function BlogContentBodyDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="blog-content-body" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Blog Content Body
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Prose-styled container for article content with typography presets for all elements.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<BlogContentBody>{content}</BlogContentBody>`}>
          <BlogContentBody>
            <h2>Getting Started</h2>
            <p>This is a paragraph with proper styling and spacing. The component automatically handles typography for all HTML elements.</p>
            <h3>Key Concepts</h3>
            <ul>
              <li>Responsive typography</li>
              <li>Proper link styling</li>
              <li>Code block support</li>
            </ul>
            <blockquote>
              "This is a blockquote demonstrating how the component handles block-level citations."
            </blockquote>
          </BlogContentBody>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { BlogContentBody } from '@archui/react';

export default function ArticleContent() {
  return (
    <BlogContentBody>
      <h2>Article Heading</h2>
      <p>Paragraph content here...</p>
      <h3>Subheading</h3>
      <p>More content...</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    </BlogContentBody>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="features" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Styled Elements
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Headings (h1-h4) with proper spacing</li>
          <li>• Paragraph text with line height</li>
          <li>• Links with hover effects</li>
          <li>• Lists (ordered and unordered)</li>
          <li>• Blockquotes with left border</li>
          <li>• Code blocks and inline code</li>
          <li>• Images with rounded corners</li>
          <li>• Tables with borders and padding</li>
          <li>• Horizontal rules</li>
        </ul>
      </div>
    </div>
  );
}

export default BlogContentBodyDocs;
