import { GlassCircularProgress } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassCircularProgressDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-circular-progress" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Circular Progress
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Determinate and indeterminate circular progress indicator.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<div className="flex items-center gap-8">
  <GlassCircularProgress value={25} showValue />
  <GlassCircularProgress value={50} showValue />
  <GlassCircularProgress value={75} showValue />
</div>`}
        >
          <div className="flex items-center gap-8">
            <GlassCircularProgress value={25} showValue />
            <GlassCircularProgress value={50} showValue />
            <GlassCircularProgress value={75} showValue />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="indeterminate" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Indeterminate
        </h2>
        <ComponentPreview 
          code={`<GlassCircularProgress />`}
        >
          <GlassCircularProgress />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassCircularProgress } from '@archui/react';

export default function Example() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => (p + 10) % 100);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return <GlassCircularProgress value={progress} showValue />;
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="colors" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Colors
        </h2>
        <ComponentPreview 
          code={`<div className="flex items-center gap-8">
  <GlassCircularProgress value={60} color="accent" showValue />
  <GlassCircularProgress value={60} color="success" showValue />
  <GlassCircularProgress value={60} color="warning" showValue />
  <GlassCircularProgress value={60} color="error" showValue />
</div>`}
        >
          <div className="flex items-center gap-8">
            <GlassCircularProgress value={60} color="accent" showValue />
            <GlassCircularProgress value={60} color="success" showValue />
            <GlassCircularProgress value={60} color="warning" showValue />
            <GlassCircularProgress value={60} color="error" showValue />
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}

export default GlassCircularProgressDocs;
