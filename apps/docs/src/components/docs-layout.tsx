import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

// Sidebar navigation structure - shadcn style
export const sidebarNav = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Changelog', href: '/docs/changelog', badge: 'new' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { title: 'Container', href: '/docs/components/glass-container', badge: 'new' },
      { title: 'Stack', href: '/docs/components/glass-stack', badge: 'new' },
      { title: 'Grid', href: '/docs/components/glass-grid', badge: 'new' },
      { title: 'Separator', href: '/docs/components/glass-separator', badge: 'new' },
      { title: 'Aspect Ratio', href: '/docs/components/glass-aspect-ratio', badge: 'new' },
    ],
  },
  {
    title: 'Forms',
    items: [
      { title: 'Button', href: '/docs/components/glass-button' },
      { title: 'Input', href: '/docs/components/glass-input' },
      { title: 'Textarea', href: '/docs/components/glass-textarea' },
      { title: 'Select', href: '/docs/components/glass-select' },
      { title: 'Combobox', href: '/docs/components/glass-combobox', badge: 'new' },
      { title: 'Date Picker', href: '/docs/components/glass-date-picker', badge: 'new' },
      { title: 'Checkbox', href: '/docs/components/glass-checkbox' },
      { title: 'Radio', href: '/docs/components/glass-radio' },
      { title: 'Switch', href: '/docs/components/glass-switch' },
      { title: 'Label', href: '/docs/components/glass-label' },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { title: 'Table', href: '/docs/components/glass-table', badge: 'new' },
      { title: 'Card', href: '/docs/components/glass-card' },
      { title: 'Spotlight Card', href: '/docs/components/glass-spotlight-card', badge: 'new' },
      { title: 'Panel', href: '/docs/components/glass-panel' },
      { title: 'Badge', href: '/docs/components/glass-badge' },
      { title: 'Avatar', href: '/docs/components/glass-avatar' },
    ],
  },
  {
    title: 'Special Effects',
    items: [
      { title: 'Shine Border', href: '/docs/components/glass-shine-border', badge: 'new' },
      { title: 'Globe', href: '/docs/components/glass-globe', badge: 'new' },
      { title: 'Meteors', href: '/docs/components/glass-meteors', badge: 'new' },
      { title: 'Grid Background', href: '/docs/components/glass-grid-background', badge: 'new' },
    ],
  },
  {
    title: 'Backgrounds',
    items: [
      { title: 'Topographic Ribbon Planes', href: '/docs/components/topographic-ribbon-planes', badge: 'new' },
      { title: 'Photon Field', href: '/docs/components/photon-field', badge: 'new' },
      { title: 'Kinetic Tessellation', href: '/docs/components/kinetic-tessellation', badge: 'new' },
      { title: 'Fluid Lightscape', href: '/docs/components/fluid-lightscape', badge: 'new' },
      { title: 'Micro-Ecosystem', href: '/docs/components/micro-ecosystem', badge: 'new' },
      { title: 'Typographic Atmos', href: '/docs/components/typographic-atmos', badge: 'new' },
    ],
  },
  {
    title: 'Utility',
    items: [
      { title: 'File Upload', href: '/docs/components/glass-file-upload', badge: 'new' },
      { title: 'Theme Toggle', href: '/docs/components/glass-theme-toggle', badge: 'new' },
      { title: 'Dock', href: '/docs/components/glass-dock', badge: 'new' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { title: 'Alert', href: '/docs/components/glass-alert', badge: 'new' },
      { title: 'Progress', href: '/docs/components/glass-progress', badge: 'new' },
      { title: 'Skeleton', href: '/docs/components/glass-skeleton', badge: 'new' },
      { title: 'Spinner', href: '/docs/components/glass-spinner', badge: 'new' },
      { title: 'Toast', href: '/docs/components/glass-toast', badge: 'new' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { title: 'Navigation Bar', href: '/docs/components/glass-nav' },
      { title: 'Sidebar', href: '/docs/components/glass-sidebar' },
      { title: 'Dropdown', href: '/docs/components/glass-dropdown' },
      { title: 'Tabs', href: '/docs/components/glass-tabs', badge: 'new' },
      { title: 'Breadcrumb', href: '/docs/components/glass-breadcrumb', badge: 'new' },
      { title: 'Pagination', href: '/docs/components/glass-pagination', badge: 'new' },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { title: 'Modal', href: '/docs/components/glass-modal' },
      { title: 'Drawer', href: '/docs/components/glass-drawer', badge: 'new' },
      { title: 'Sheet', href: '/docs/components/glass-sheet', badge: 'new' },
    ],
  },
  {
    title: 'Auth',
    items: [
      { title: 'Login Form', href: '/docs/components/glass-login-form', badge: 'new' },
      { title: 'Sign Up Form', href: '/docs/components/glass-signup-form', badge: 'new' },
    ],
  },
  {
    title: 'Interactive',
    items: [
      { title: 'Command Palette', href: '/docs/components/glass-command', badge: 'new' },
      { title: 'Context Menu', href: '/docs/components/glass-context-menu', badge: 'new' },
      { title: 'Notification Center', href: '/docs/components/glass-notification-center', badge: 'new' },
      { title: 'Tooltip', href: '/docs/components/glass-tooltip', badge: 'new' },
      { title: 'Metric Card', href: '/docs/components/glass-metric-card', badge: 'new' },
      { title: 'Timeline', href: '/docs/components/glass-timeline', badge: 'new' },
      { title: 'Segmented Control', href: '/docs/components/glass-segmented-control', badge: 'new' },
      { title: 'Search', href: '/docs/components/glass-search', badge: 'new' },
      { title: 'Empty State', href: '/docs/components/glass-empty-state', badge: 'new' },
      { title: 'Stepper', href: '/docs/components/glass-stepper', badge: 'new' },
    ],
  },
  {
    title: 'Blocks',
    items: [
      // ── Hero ──────────────────────────────────
      { title: 'Hero Sections', href: '/docs/components/block-hero-sections', badge: 'new' },
      // ── Features ──────────────────────────────
      { title: 'Feature Sections', href: '/docs/components/block-features-sections', badge: 'new' },
      // ── Social proof ──────────────────────────
      { title: 'Marquee Logos', href: '/docs/components/block-marquee-logos', badge: 'new' },
      { title: 'Testimonials Grid', href: '/docs/components/block-testimonials-grid', badge: 'new' },
      { title: 'Testimonials Carousel', href: '/docs/components/block-testimonials-carousel', badge: 'new' },
      { title: 'Stats Section', href: '/docs/components/block-stats-section', badge: 'new' },
      // ── Pricing ────────────────────────────────
      { title: 'Pricing Cards', href: '/docs/components/block-pricing-cards', badge: 'new' },
      { title: 'Pricing Table', href: '/docs/components/block-pricing-table', badge: 'new' },
      { title: 'Pricing Minimal', href: '/docs/components/block-pricing-minimal', badge: 'new' },
      // ── FAQ ────────────────────────────────────
      { title: 'FAQ Accordion', href: '/docs/components/block-faq-accordion', badge: 'new' },
      { title: 'FAQ Variants', href: '/docs/components/block-faq-variants', badge: 'new' },
      // ── Contact ────────────────────────────────
      { title: 'Contact Sections', href: '/docs/components/block-contact-sections', badge: 'new' },
      // ── Blog ───────────────────────────────────
      { title: 'Blog Grid', href: '/docs/components/block-blog-grid', badge: 'new' },
      { title: 'Blog Featured', href: '/docs/components/block-blog-featured', badge: 'new' },
      { title: 'Blog List', href: '/docs/components/block-blog-list', badge: 'new' },
      { title: 'Blog Content Header', href: '/docs/components/block-blog-content-header', badge: 'new' },
      { title: 'Blog Content Body', href: '/docs/components/block-blog-content-body', badge: 'new' },
      { title: 'Blog Content Related', href: '/docs/components/block-blog-content-related', badge: 'new' },
      // ── Sidebar ────────────────────────────────
      { title: 'Sidebar Dashboard', href: '/docs/components/block-sidebar-dashboard', badge: 'new' },
      { title: 'Sidebar Blog Filter', href: '/docs/components/block-sidebar-blog-filter', badge: 'new' },
      { title: 'Sidebar TOC', href: '/docs/components/block-sidebar-toc', badge: 'new' },
      // ── Footer ─────────────────────────────────
      { title: 'Footer', href: '/docs/components/block-footer', badge: 'new' },
      // ── Other ──────────────────────────────────
      { title: 'Timeline Section', href: '/docs/components/block-timeline-section', badge: 'new' },
      { title: 'Bento Grid', href: '/docs/components/block-bento-grid', badge: 'new' },
      { title: 'Marquee Cards', href: '/docs/components/block-marquee-cards', badge: 'new' },
      { title: 'CTA Banner', href: '/docs/components/block-cta-banner', badge: 'new' },
    ],
  },
  {
    title: 'Websites',
    items: [
      { title: 'Cybersecurity / InfoSec', href: '/docs/components/website-cybersecurity', badge: 'new' },
      { title: 'Meditation App', href: '/docs/websites/meditation-app', badge: 'new' },
      { title: 'Luxury Travel', href: '/docs/websites/luxury-travel', badge: 'new' },
      { title: 'Podcast Network', href: '/docs/websites/podcast-network', badge: 'new' },
      { title: 'Climate Tech / Sustainability', href: '/docs/websites/climate-tech', badge: 'new' },
      { title: 'Event & Conference', href: '/docs/websites/event-conference', badge: 'new' },
      { title: 'B2B Marketing Agency', href: '/docs/websites/b2b-marketing', badge: 'new' },
      { title: 'Wedding & Luxury Events', href: '/docs/websites/wedding-events', badge: 'new' },
    ],
  },
];

export function DocsLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <div className="mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--foreground))] text-[hsl(var(--background))] shadow-lg md:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Left Sidebar - shadcn style */}
      <aside
        className={`fixed top-14 z-30 h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto md:sticky md:block ${sidebarOpen ? 'block bg-[hsl(var(--background))]' : 'hidden md:block'
          }`}
      >
        <div className="h-full py-6 pl-4 pr-6 lg:py-8">
          {sidebarNav.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
              {/* Section title - small, muted like shadcn */}
              <h4 className="mb-1 px-2 text-sm font-medium text-[hsl(var(--muted-foreground))]">
                {section.title}
              </h4>

              {/* Navigation items */}
              <div className="flex flex-col gap-1 text-sm relative" onMouseLeave={() => setHoveredPath(null)}>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  const isHovered = hoveredPath === item.href;

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onMouseEnter={() => setHoveredPath(item.href)}
                      onClick={() => setSidebarOpen(false)}
                      className={`group relative flex w-full items-center rounded-lg px-3 py-2 transition-colors ${isActive
                        ? 'font-medium text-blue-700 dark:text-blue-300'
                        : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 z-0 rounded-lg bg-blue-50/80 border border-blue-100/50 dark:bg-blue-500/10 dark:border-blue-500/20"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      {isHovered && !isActive && (
                        <motion.div
                          layoutId="sidebar-hover"
                          className="absolute inset-0 z-0 rounded-lg bg-slate-100/60 dark:bg-slate-800/50"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      <span className="relative z-10 flex w-full items-center">
                        {item.title}
                        {item.badge === 'new' && (
                          <span className="ml-2 inline-flex h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px]">
        <div className="mx-auto w-full min-w-0 max-w-3xl px-4 md:px-0">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center space-x-1 text-sm text-[hsl(var(--muted-foreground))]">
            <Link to="/docs" className="hover:text-[hsl(var(--foreground))] transition-colors">
              Docs
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-[hsl(var(--foreground))] capitalize">
              {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Introduction'}
            </span>
          </div>

          {/* Page Content */}
          <article>
            <Outlet />
          </article>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-between border-t border-[hsl(var(--border))] pt-6">
            <PaginationLink direction="prev" currentPath={location.pathname} />
            <PaginationLink direction="next" currentPath={location.pathname} />
          </div>
        </div>

        {/* Right Sidebar - On This Page (Table of Contents) */}
        <div className="hidden text-sm xl:block">
          <div className="sticky top-20 -mt-10 max-h-[calc(100vh-6rem)] overflow-y-auto pt-4">
            <OnThisPage />
          </div>
        </div>
      </main>
    </div>
  );
}

// Pagination component for prev/next navigation
function PaginationLink({ direction, currentPath }: { direction: 'prev' | 'next'; currentPath: string }) {
  const allPages = sidebarNav.flatMap(section => section.items);
  const currentIndex = allPages.findIndex(item => item.href === currentPath);

  const targetIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
  const targetPage = allPages[targetIndex];

  if (!targetPage) return <div />;

  return (
    <Link
      to={targetPage.href}
      className={`flex flex-col gap-1 ${direction === 'next' ? 'items-end' : ''}`}
    >
      <span className="text-xs text-[hsl(var(--muted-foreground))]">
        {direction === 'prev' ? 'Previous' : 'Next'}
      </span>
      <span className="text-sm font-medium text-[hsl(var(--foreground))] hover:underline">
        {targetPage.title}
      </span>
    </Link>
  );
}

// On This Page (Table of Contents) component
function OnThisPage() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const article = document.querySelector('article');
      if (!article) return;

      const elements = article.querySelectorAll('h2[id], h3[id]');
      const items = Array.from(elements).map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: element.tagName === 'H2' ? 2 : 3,
      }));
      setHeadings(items);

      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -80% 0%', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="font-medium text-[hsl(var(--foreground))]">On This Page</p>
      <ul className="m-0 list-none space-y-2 text-sm">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: level === 3 ? '12px' : '0' }}>
            <a
              href={`#${id}`}
              className={`inline-block text-[hsl(var(--muted-foreground))] no-underline transition-colors hover:text-[hsl(var(--foreground))] ${activeId === id ? 'font-medium text-[hsl(var(--foreground))]' : ''
                }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
