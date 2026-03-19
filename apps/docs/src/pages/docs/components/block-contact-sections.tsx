import { ContactSplit, ContactMinimal, ContactCard } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { Mail, Phone, MapPin, Twitter, Github, Linkedin } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Sample data                                                         */
/* ------------------------------------------------------------------ */

const contactInfo = [
  { icon: <Mail className="h-4 w-4" />, label: 'Email', value: 'hello@archui.dev', href: 'mailto:hello@archui.dev' },
  { icon: <Phone className="h-4 w-4" />, label: 'Phone', value: '+1 (555) 000-0000' },
  { icon: <MapPin className="h-4 w-4" />, label: 'Office', value: 'San Francisco, CA' },
];

const socials = [
  { icon: <Twitter className="h-4 w-4" />, href: '#', label: 'Twitter' },
  { icon: <Github className="h-4 w-4" />, href: '#', label: 'GitHub' },
  { icon: <Linkedin className="h-4 w-4" />, href: '#', label: 'LinkedIn' },
];

const formFields = [
  { name: 'name', label: 'Name', type: 'text' as const, placeholder: 'Jane Smith', required: true },
  { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'jane@company.com', required: true },
  { name: 'subject', label: 'Subject', type: 'text' as const, placeholder: 'How can we help?' },
  { name: 'message', label: 'Message', type: 'textarea' as const, placeholder: 'Tell us about your project…', required: true },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function BlockContactSectionsDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 id="contact-sections" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Contact Sections
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Three contact section layouts — a split form/info panel, a minimal email CTA, and a centered card with an embedded form.
        </p>
      </div>

      {/* ── ContactSplit ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="contact-split" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          ContactSplit
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          Two-column layout — contact info, socials, and optional map on the left; a multi-field form on the right.
        </p>
        <ComponentPreview
          code={`import { ContactSplit } from '@archui/react';
import { Mail, Phone, MapPin } from 'lucide-react';

<ContactSplit
  heading="Get in touch"
  subheading="We'd love to hear from you. Send us a message."
  contactInfo={[
    { icon: <Mail className="h-4 w-4" />, label: 'Email', value: 'hello@co.dev', href: 'mailto:hello@co.dev' },
    { icon: <Phone className="h-4 w-4" />, label: 'Phone', value: '+1 555 000 0000' },
    { icon: <MapPin className="h-4 w-4" />, label: 'Office', value: 'San Francisco, CA' },
  ]}
  fields={[
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true },
  ]}
  submitLabel="Send message"
/>`}
        >
          <ContactSplit
            heading="Get in touch"
            subheading="We'd love to hear from you. Send us a message and we'll respond within 24 hours."
            contactInfo={contactInfo}
            socials={socials}
            fields={formFields}
            submitLabel="Send message"
          />
        </ComponentPreview>
      </section>

      {/* ── ContactMinimal ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="contact-minimal" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          ContactMinimal
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          A form-free approach. Large headline, a descriptive sub-copy line, a single email CTA button, and optional social icons.
        </p>
        <ComponentPreview
          code={`import { ContactMinimal } from '@archui/react';

<ContactMinimal
  heading="Let's talk."
  description="Whether it's a new project, a partnership, or just a question — we're always happy to chat."
  email="hello@archui.dev"
  socials={socials}
/>`}
        >
          <ContactMinimal
            heading="Let's talk."
            description="Whether it's a new project, a partnership, or just a question — we're always happy to chat."
            email="hello@archui.dev"
            socials={socials}
          />
        </ComponentPreview>
      </section>

      {/* ── ContactCard ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="contact-card" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          ContactCard
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          A centered <code className="rounded bg-[hsl(var(--muted))] px-1 py-0.5 text-xs">GlassCard</code> with a compact form inside. Used as the primary CTA at the bottom of a single-page site.
        </p>
        <ComponentPreview
          code={`import { ContactCard } from '@archui/react';

<ContactCard
  heading="Start a conversation"
  subheading="Fill in the form and we'll be in touch."
  fields={[
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true },
  ]}
  submitLabel="Send message"
/>`}
        >
          <ContactCard
            heading="Start a conversation"
            subheading="Fill in the form and we'll be in touch within one business day."
            fields={formFields}
            submitLabel="Send message"
          />
        </ComponentPreview>
      </section>

      {/* ── Installation ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock code={`npm install @archui/react\n# or\npnpm add @archui/react`} />
      </section>

      {/* ── Props ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="props-split" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props — ContactSplit / ContactCard
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Default</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['heading', 'string', '—', 'Section headline'],
                ['subheading', 'string', '—', 'Supporting paragraph'],
                ['contactInfo', 'ContactItem[]', '—', 'Icon, label, value, and optional href (ContactSplit only)'],
                ['socials', 'SocialItem[]', '—', 'Social link icon, href, and label (ContactSplit only)'],
                ['aside', 'ReactNode', '—', 'Slot for map embed or custom aside content (ContactSplit only)'],
                ['fields', 'FormField[]', '—', 'Form field definitions: name, label, type, placeholder, required'],
                ['submitLabel', 'string', "'Send message'", 'Submit button text'],
                ['onSubmit', '(data) => void', '—', 'Called with form data on submission'],
                ['background', 'ReactNode', '—', 'Optional background component'],
                ['className', 'string', '—', 'Additional Tailwind classes'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="bg-[hsl(var(--background))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{def}</td>
                  <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mt-4">Props — ContactMinimal</h3>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Default</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['heading', 'string', '—', 'Large headline (e.g. "Let\'s talk.")'],
                ['description', 'string', '—', 'Short supporting paragraph'],
                ['email', 'string', '—', 'Email address — renders a mailto CTA button (required)'],
                ['socials', 'SocialItem[]', '—', 'Social icon links shown below the CTA'],
                ['className', 'string', '—', 'Additional Tailwind classes'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="bg-[hsl(var(--background))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{def}</td>
                  <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
