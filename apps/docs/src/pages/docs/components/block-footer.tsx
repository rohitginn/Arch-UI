import { FooterComplex, FooterMinimal, FooterDark } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { Github, Twitter, Linkedin } from 'lucide-react';

const sampleGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
];

const sampleSocials = [
  { label: 'GitHub', href: '#', icon: <Github className="h-4 w-4" /> },
  { label: 'Twitter', href: '#', icon: <Twitter className="h-4 w-4" /> },
  { label: 'LinkedIn', href: '#', icon: <Linkedin className="h-4 w-4" /> },
];

const sampleLogo = (
  <span className="text-lg font-bold tracking-tight text-[hsl(var(--foreground))]">ArchUI</span>
);

export function BlockFooterDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="footer" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Footer
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Three footer variants — Complex (multi-column with newsletter), Minimal (single row), and Dark (dark background with newsletter) — all with glassmorphic styling.
        </p>
      </div>

      {/* FooterComplex */}
      <div className="space-y-4">
        <h2 id="footer-complex" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FooterComplex
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Multi-column footer with link groups, social icons, optional newsletter form, and legal links.
        </p>
        <ComponentPreview
          code={`<FooterComplex
  logo={<span className="text-lg font-bold">ArchUI</span>}
  tagline="Build beautiful interfaces, fast."
  groups={[
    { title: 'Product', links: [{ label: 'Features', href: '/features' }] },
    { title: 'Company', links: [{ label: 'About', href: '/about' }] },
  ]}
  socials={[{ label: 'GitHub', href: 'https://github.com', icon: <GithubIcon /> }]}
  copyright="© 2025 ArchUI. All rights reserved."
/>`}
          vueCode={`<FooterComplex
  tagline="Build beautiful interfaces, fast."
  :link-groups="groups"
  :socials="socials"
  copyright="© 2025 ArchUI. All rights reserved."
>
  <template #logo>
    <span class="text-lg font-bold">ArchUI</span>
  </template>
</FooterComplex>`}
        >
          <FooterComplex
            logo={sampleLogo}
            tagline="Build beautiful interfaces, fast."
            groups={sampleGroups}
            socials={sampleSocials}
            copyright="© 2025 ArchUI. All rights reserved."
            legalLinks={[{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }]}
          />
        </ComponentPreview>
      </div>

      {/* FooterMinimal */}
      <div className="space-y-4">
        <h2 id="footer-minimal" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FooterMinimal
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Single-row footer with logo, nav links, social icons, and copyright. Ideal for simple marketing pages.
        </p>
        <ComponentPreview
          code={`<FooterMinimal
  logo={<span className="font-bold">ArchUI</span>}
  links={[
    { label: 'Docs', href: '/docs' },
    { label: 'Blog', href: '/blog' },
    { label: 'GitHub', href: 'https://github.com' },
  ]}
  copyright="© 2025 ArchUI"
/>`}
          vueCode={`<FooterMinimal
  :links="[{ label: 'Docs', href: '/docs' }]"
  copyright="© 2025 ArchUI"
>
  <template #logo>
    <span class="font-bold">ArchUI</span>
  </template>
</FooterMinimal>`}
        >
          <FooterMinimal
            logo={sampleLogo}
            links={[
              { label: 'Docs', href: '#' },
              { label: 'Blog', href: '#' },
              { label: 'GitHub', href: '#' },
            ]}
            socials={sampleSocials}
            copyright="© 2025 ArchUI"
          />
        </ComponentPreview>
      </div>

      {/* FooterDark */}
      <div className="space-y-4">
        <h2 id="footer-dark" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FooterDark
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Dark-surface footer with a built-in newsletter subscription form. Always renders in zinc-950 regardless of theme.
        </p>
        <ComponentPreview
          code={`<FooterDark
  logo={<span className="font-bold text-white">ArchUI</span>}
  tagline="Ship faster with glassmorphic UI."
  groups={groups}
  socials={socials}
  onNewsletterSubmit={(email) => console.log(email)}
  copyright="© 2025 ArchUI"
/>`}
          vueCode={`<FooterDark
  tagline="Ship faster with glassmorphic UI."
  :link-groups="groups"
  :socials="socials"
  @newsletter-submit="handleSubmit"
  copyright="© 2025 ArchUI"
>
  <template #logo>
    <span class="font-bold text-white">ArchUI</span>
  </template>
</FooterDark>`}
        >
          <FooterDark
            logo={<span className="text-lg font-bold tracking-tight text-white">ArchUI</span>}
            tagline="Ship faster with glassmorphic UI."
            groups={sampleGroups}
            socials={sampleSocials}
            onNewsletterSubmit={(email) => console.log('subscribe:', email)}
            copyright="© 2025 ArchUI. All rights reserved."
          />
        </ComponentPreview>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock
          code={`npm install @archui/react
# or
pnpm add @archui/react`}
          vueCode={`npm install @archui/vue
# or
pnpm add @archui/vue`}
        />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Usage
        </h2>
        <CodeBlock
          code={`import { FooterComplex, FooterMinimal, FooterDark } from '@archui/react';

// Full-featured multi-column
<FooterComplex
  logo={<Logo />}
  tagline="Build beautiful products."
  groups={[
    { title: 'Product', links: [{ label: 'Features', href: '/features' }] },
  ]}
  socials={[{ label: 'GitHub', href: '#', icon: <GithubIcon /> }]}
  copyright="© 2025 Company"
/>

// Simple single row
<FooterMinimal
  logo={<Logo />}
  links={[{ label: 'Privacy', href: '/privacy' }]}
  copyright="© 2025 Company"
/>

// Dark with newsletter
<FooterDark
  logo={<Logo />}
  tagline="Stay in the loop."
  groups={groups}
  onNewsletterSubmit={(email) => subscribe(email)}
  copyright="© 2025 Company"
/>`}
          vueCode={`<script setup lang="ts">
import { FooterComplex, FooterMinimal, FooterDark } from '@archui/vue';

const groups = [
  { title: 'Product', links: [{ label: 'Features', href: '/features' }] },
];
const socials = [{ label: 'GitHub', href: '#', icon: '<svg>...</svg>' }];
</script>

<template>
  <!-- Full featured -->
  <FooterComplex
    tagline="Build beautiful products."
    :link-groups="groups"
    :socials="socials"
    copyright="© 2025 Company"
  />

  <!-- Minimal -->
  <FooterMinimal
    :links="[{ label: 'Privacy', href: '/privacy' }]"
    copyright="© 2025 Company"
  />

  <!-- Dark with newsletter -->
  <FooterDark
    tagline="Stay in the loop."
    :link-groups="groups"
    @newsletter-submit="handleSubscribe"
    copyright="© 2025 Company"
  />
</template>`}
        />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FooterComplex Props
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['logo', 'ReactNode', 'Logo / brand element'],
                ['tagline', 'string', 'Tagline text below logo'],
                ['groups', 'FooterLinkGroup[]', 'Array of link column groups'],
                ['socials', 'FooterSocialLink[]', 'Social media icon links'],
                ['newsletterHeading', 'string', 'Newsletter section heading'],
                ['newsletterDescription', 'string', 'Newsletter section description'],
                ['onNewsletterSubmit', '(email: string) => void', 'Newsletter form submit handler'],
                ['copyright', 'string', 'Copyright line text'],
                ['legalLinks', '{ label: string; href: string }[]', 'Bottom legal navigation links'],
                ['className', 'string', 'Additional CSS classes'],
              ].map(([prop, type, desc]) => (
                <tr key={prop} className="text-[hsl(var(--muted-foreground))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs">{type}</td>
                  <td className="px-4 py-3 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
