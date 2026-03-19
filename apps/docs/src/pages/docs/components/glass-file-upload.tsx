import { GlassFileUpload } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassFileUploadDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-file-upload" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass File Upload
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A drag-and-drop file upload component with glassmorphic styling.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<GlassFileUpload onFilesSelected={(files) => console.log(files)} />`}
                    vueCode={`<GlassFileUpload />`}
                >
                    <GlassFileUpload onFilesSelected={(files) => console.log(files)} />
                </ComponentPreview>
            </div>

            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`import { GlassFileUpload } from '@archui/react';`}
                    vueCode={`import { GlassFileUpload } from '@archui/vue';`}
                />
            </div>
        </div>
    );
}
