import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout } from './components/layout';
import { LandingPage } from './pages/landing';
import { DocsLayout } from './components/docs-layout';
import { Introduction } from './pages/docs/introduction';
import { Installation } from './pages/docs/installation';
import ChangelogPage from './pages/docs/changelog';
// Existing components
import { GlassCardDocs } from './pages/docs/components/glass-card';
import { GlassSpotlightCardDocs } from './pages/docs/components/glass-spotlight-card';
import { GlassDockDocs } from './pages/docs/components/glass-dock';
import { GlassShineBorderDocs } from './pages/docs/components/glass-shine-border';
import { GlassGlobeDocs } from './pages/docs/components/glass-globe';
import { GlassThemeToggleDocs } from './pages/docs/components/glass-theme-toggle';
import { GlassMeteorsDocs } from './pages/docs/components/glass-meteors';
import { GlassGridBackgroundDocs } from './pages/docs/components/glass-grid-background';
import { GlassFileUploadDocs } from './pages/docs/components/glass-file-upload';
import { GlassButtonDocs } from './pages/docs/components/glass-button';
import { GlassInputDocs } from './pages/docs/components/glass-input';
import { GlassModalDocs } from './pages/docs/components/glass-modal';
import { GlassNavDocs } from './pages/docs/components/glass-nav';
import { GlassPanelDocs } from './pages/docs/components/glass-panel';
import { GlassDropdownDocs } from './pages/docs/components/glass-dropdown';
import { GlassSidebarDocs } from './pages/docs/components/glass-sidebar';
import { GlassTextareaDocs } from './pages/docs/components/glass-textarea';
import { GlassSelectDocs } from './pages/docs/components/glass-select';
import { GlassCheckboxDocs } from './pages/docs/components/glass-checkbox';
import { GlassRadioDocs } from './pages/docs/components/glass-radio';
import { GlassSwitchDocs } from './pages/docs/components/glass-switch';
import { GlassLabelDocs } from './pages/docs/components/glass-label';
import { GlassBadgeDocs } from './pages/docs/components/glass-badge';
import { GlassAvatarDocs } from './pages/docs/components/glass-avatar';
// Layout components
import { GlassContainerDocs } from './pages/docs/components/glass-container';
import { GlassStackDocs } from './pages/docs/components/glass-stack';
import { GlassSeparatorDocs } from './pages/docs/components/glass-separator';
import { GlassAspectRatioDocs } from './pages/docs/components/glass-aspect-ratio';
import { GlassGridDocs } from './pages/docs/components/glass-grid';
// Feedback components
import { GlassAlertDocs } from './pages/docs/components/glass-alert';
import { GlassProgressDocs } from './pages/docs/components/glass-progress';
import { GlassSkeletonDocs } from './pages/docs/components/glass-skeleton';
import { GlassSpinnerDocs } from './pages/docs/components/glass-spinner';
import { GlassToastDocs } from './pages/docs/components/glass-toast';
// Navigation components
import { GlassTabsDocs } from './pages/docs/components/glass-tabs';
import { GlassBreadcrumbDocs } from './pages/docs/components/glass-breadcrumb';
import { GlassPaginationDocs } from './pages/docs/components/glass-pagination';
// Auth Components
import { GlassLoginFormDocs } from './pages/docs/components/glass-login-form';
import { GlassSignupFormDocs } from './pages/docs/components/glass-signup-form';
// Interactive Components
import { GlassCommandDocs } from './pages/docs/components/glass-command';
import { GlassContextMenuDocs } from './pages/docs/components/glass-context-menu';
import { GlassNotificationCenterDocs } from './pages/docs/components/glass-notification-center';
import { GlassTooltipDocs } from './pages/docs/components/glass-tooltip';
import { GlassMetricCardDocs } from './pages/docs/components/glass-metric-card';
import { GlassTimelineDocs } from './pages/docs/components/glass-timeline';
import { GlassSegmentedControlDocs } from './pages/docs/components/glass-segmented-control';
import { GlassSearchDocs } from './pages/docs/components/glass-search';
import { GlassEmptyStateDocs } from './pages/docs/components/glass-empty-state';
import { GlassStepperDocs } from './pages/docs/components/glass-stepper';
// New High-Priority Components
import { GlassTableDocs } from './pages/docs/components/glass-table';
import { GlassDatePickerDocs } from './pages/docs/components/glass-date-picker';
import { GlassComboboxDocs } from './pages/docs/components/glass-combobox';
import { GlassDrawerDocs } from './pages/docs/components/glass-drawer';
import { GlassSheetDocs } from './pages/docs/components/glass-sheet';
// UI Primitives (Sprint 2)
import { GlassKbdDocs } from './pages/docs/components/glass-kbd';
import { GlassCodeDocs } from './pages/docs/components/glass-code';
import { GlassScrollAreaDocs } from './pages/docs/components/glass-scroll-area';
import { GlassToggleDocs } from './pages/docs/components/glass-toggle';
import { GlassToggleGroupDocs } from './pages/docs/components/glass-toggle-group';
import { GlassSliderDocs } from './pages/docs/components/glass-slider';
import { GlassCollapsibleDocs } from './pages/docs/components/glass-collapsible';
import { GlassColorSwatchDocs } from './pages/docs/components/glass-color-swatch';
import { GlassTagInputDocs } from './pages/docs/components/glass-tag-input';
// Form/Overlay (Sprint 2-4)
import { GlassPopoverDocs } from './pages/docs/components/glass-popover';
import { GlassAlertDialogDocs } from './pages/docs/components/glass-alert-dialog';
// Data Display (Sprint 4)
import { GlassCircularProgressDocs } from './pages/docs/components/glass-circular-progress';
import { GlassListDocs } from './pages/docs/components/glass-list';
// Navigation (Sprint 5)
import { GlassMegaMenuDocs } from './pages/docs/components/glass-mega-menu';
import { GlassCommandBarDocs } from './pages/docs/components/glass-command-bar';
// Backgrounds
import {
  TopographicRibbonPlanesDocs,
  PhotonFieldDocs,
  KineticTessellationDocs,
  FluidLightscapeDocs,
  MicroEcosystemDocs,
  TypographicAtmosDocs
} from './pages/docs/components/backgrounds';
// Blocks — existing
import { BlockCTABannerDocs } from './pages/docs/components/block-cta-banner';
import { BlockBentoGridDocs } from './pages/docs/components/block-bento-grid';
import { BlockMarqueeCardsDocs } from './pages/docs/components/block-marquee-cards';
import { BlockFooterDocs } from './pages/docs/components/block-footer';
import { BlockTestimonialsCarouselDocs } from './pages/docs/components/block-testimonials-carousel';
import { BlockPricingCardsDocs } from './pages/docs/components/block-pricing-cards';
import { BlockStatsSectionDocs } from './pages/docs/components/block-stats-section';
import { BlockFAQAccordionDocs } from './pages/docs/components/block-faq-accordion';
// Blocks — new
import { BlockHeroSectionsDocs } from './pages/docs/components/block-hero-sections';
import { BlockFeaturesSectionsDocs } from './pages/docs/components/block-features-sections';
import { BlockPricingTableDocs } from './pages/docs/components/block-pricing-table';
import { BlockPricingMinimalDocs } from './pages/docs/components/block-pricing-minimal';
import { BlockTestimonialsGridDocs } from './pages/docs/components/block-testimonials-grid';
import { BlockMarqueeLogosDocs } from './pages/docs/components/block-marquee-logos';
import { BlockFAQVariantsDocs } from './pages/docs/components/block-faq-variants';
import { BlockContactSectionsDocs } from './pages/docs/components/block-contact-sections';
// Blocks — existing but previously unlinked
import { BlogGridDocs } from './pages/docs/components/blog-grid';
import { BlogFeaturedDocs } from './pages/docs/components/blog-featured';
import { BlogListDocs } from './pages/docs/components/blog-list';
import { BlogContentHeaderDocs } from './pages/docs/components/blog-content-header';
import { BlogContentBodyDocs } from './pages/docs/components/blog-content-body';
import { BlogContentRelatedDocs } from './pages/docs/components/blog-content-related';
import { SidebarDashboardDocs } from './pages/docs/components/sidebar-dashboard';
import { SidebarBlogFilterDocs } from './pages/docs/components/sidebar-blog-filter';
import { SidebarTableOfContentsDocs } from './pages/docs/components/sidebar-table-of-contents';
import { TimelineSectionDocs } from './pages/docs/components/timeline-section';
// Websites
import { WebsitePodcastNetworkDocs } from './pages/docs/components/website-podcast-network';
// Website Templates
import { WebsiteCybersecurityDocs } from './pages/docs/components/website-cybersecurity';
import { MeditationAppDocs } from './pages/docs/websites/meditation-app';
import { LuxuryTravelTemplateDocs } from './pages/docs/components/luxury-travel-template';
import { WebsiteClimateTechDocs } from './pages/docs/websites/climate-tech';
import { EventConferenceDocs } from './pages/docs/websites/event-conference';
import { WebsiteB2bMarketingDocs } from './pages/docs/websites/b2b-marketing';
import { WebsiteWeddingEventsDocs } from './pages/docs/components/website-wedding-events';

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('archui-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    setIsDark(initialDark);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('archui-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('archui-theme', 'light');
    }
  }, [isDark]);

  return (
    <Routes>
      <Route path="/" element={<Layout isDark={isDark} setIsDark={setIsDark} />}>
        <Route index element={<LandingPage />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<Introduction />} />
          <Route path="introduction" element={<Introduction />} />
          <Route path="installation" element={<Installation />} />
          <Route path="changelog" element={<ChangelogPage />} />
          {/* Components */}
          <Route path="components/glass-card" element={<GlassCardDocs />} />
          <Route path="components/glass-spotlight-card" element={<GlassSpotlightCardDocs />} />
          <Route path="components/glass-dock" element={<GlassDockDocs />} />
          <Route path="components/glass-shine-border" element={<GlassShineBorderDocs />} />
          <Route path="components/glass-globe" element={<GlassGlobeDocs />} />
          <Route path="components/glass-theme-toggle" element={<GlassThemeToggleDocs />} />
          <Route path="components/glass-meteors" element={<GlassMeteorsDocs />} />
          <Route path="components/glass-grid-background" element={<GlassGridBackgroundDocs />} />
          <Route path="components/glass-file-upload" element={<GlassFileUploadDocs />} />
          <Route path="components/glass-button" element={<GlassButtonDocs />} />
          <Route path="components/glass-input" element={<GlassInputDocs />} />
          <Route path="components/glass-modal" element={<GlassModalDocs />} />
          <Route path="components/glass-nav" element={<GlassNavDocs />} />
          <Route path="components/glass-panel" element={<GlassPanelDocs />} />
          <Route path="components/glass-dropdown" element={<GlassDropdownDocs />} />
          <Route path="components/glass-sidebar" element={<GlassSidebarDocs />} />
          <Route path="components/glass-textarea" element={<GlassTextareaDocs />} />
          <Route path="components/glass-select" element={<GlassSelectDocs />} />
          <Route path="components/glass-checkbox" element={<GlassCheckboxDocs />} />
          <Route path="components/glass-radio" element={<GlassRadioDocs />} />
          <Route path="components/glass-switch" element={<GlassSwitchDocs />} />
          <Route path="components/glass-label" element={<GlassLabelDocs />} />
          <Route path="components/glass-badge" element={<GlassBadgeDocs />} />
          <Route path="components/glass-avatar" element={<GlassAvatarDocs />} />
          {/* Layout Components */}
          <Route path="components/glass-container" element={<GlassContainerDocs />} />
          <Route path="components/glass-stack" element={<GlassStackDocs />} />
          <Route path="components/glass-separator" element={<GlassSeparatorDocs />} />
          <Route path="components/glass-aspect-ratio" element={<GlassAspectRatioDocs />} />
          <Route path="components/glass-grid" element={<GlassGridDocs />} />
          {/* Feedback Components */}
          <Route path="components/glass-alert" element={<GlassAlertDocs />} />
          <Route path="components/glass-progress" element={<GlassProgressDocs />} />
          <Route path="components/glass-skeleton" element={<GlassSkeletonDocs />} />
          <Route path="components/glass-spinner" element={<GlassSpinnerDocs />} />
          <Route path="components/glass-toast" element={<GlassToastDocs />} />
          <Route path="components/glass-table" element={<GlassTableDocs />} />
          <Route path="components/glass-date-picker" element={<GlassDatePickerDocs />} />
          <Route path="components/glass-combobox" element={<GlassComboboxDocs />} />
          <Route path="components/glass-drawer" element={<GlassDrawerDocs />} />
          <Route path="components/glass-sheet" element={<GlassSheetDocs />} />
          {/* Navigation Components */}
          <Route path="components/glass-tabs" element={<GlassTabsDocs />} />
          <Route path="components/glass-breadcrumb" element={<GlassBreadcrumbDocs />} />
          <Route path="components/glass-pagination" element={<GlassPaginationDocs />} />
          {/* UI Primitives (Sprint 2) */}
          <Route path="components/glass-kbd" element={<GlassKbdDocs />} />
          <Route path="components/glass-code" element={<GlassCodeDocs />} />
          <Route path="components/glass-scroll-area" element={<GlassScrollAreaDocs />} />
          <Route path="components/glass-toggle" element={<GlassToggleDocs />} />
          <Route path="components/glass-toggle-group" element={<GlassToggleGroupDocs />} />
          <Route path="components/glass-slider" element={<GlassSliderDocs />} />
          <Route path="components/glass-collapsible" element={<GlassCollapsibleDocs />} />
          <Route path="components/glass-color-swatch" element={<GlassColorSwatchDocs />} />
          <Route path="components/glass-tag-input" element={<GlassTagInputDocs />} />
          {/* Form/Overlay (Sprint 2-4) */}
          <Route path="components/glass-popover" element={<GlassPopoverDocs />} />
          <Route path="components/glass-alert-dialog" element={<GlassAlertDialogDocs />} />
          {/* Data Display (Sprint 4) */}
          <Route path="components/glass-circular-progress" element={<GlassCircularProgressDocs />} />
          <Route path="components/glass-list" element={<GlassListDocs />} />
          {/* Navigation (Sprint 5) */}
          <Route path="components/glass-mega-menu" element={<GlassMegaMenuDocs />} />
          <Route path="components/glass-command-bar" element={<GlassCommandBarDocs />} />
          {/* Auth Components */}
          <Route path="components/glass-login-form" element={<GlassLoginFormDocs />} />
          <Route path="components/glass-signup-form" element={<GlassSignupFormDocs />} />
          {/* Interactive Components */}
          <Route path="components/glass-command" element={<GlassCommandDocs />} />
          <Route path="components/glass-context-menu" element={<GlassContextMenuDocs />} />
          <Route path="components/glass-notification-center" element={<GlassNotificationCenterDocs />} />
          <Route path="components/glass-tooltip" element={<GlassTooltipDocs />} />
          <Route path="components/glass-metric-card" element={<GlassMetricCardDocs />} />
          <Route path="components/glass-timeline" element={<GlassTimelineDocs />} />
          <Route path="components/glass-segmented-control" element={<GlassSegmentedControlDocs />} />
          <Route path="components/glass-search" element={<GlassSearchDocs />} />
          <Route path="components/glass-empty-state" element={<GlassEmptyStateDocs />} />
          <Route path="components/glass-stepper" element={<GlassStepperDocs />} />
          {/* Backgrounds */}
          <Route path="components/topographic-ribbon-planes" element={<TopographicRibbonPlanesDocs />} />
          <Route path="components/photon-field" element={<PhotonFieldDocs />} />
          <Route path="components/kinetic-tessellation" element={<KineticTessellationDocs />} />
          <Route path="components/fluid-lightscape" element={<FluidLightscapeDocs />} />
          <Route path="components/micro-ecosystem" element={<MicroEcosystemDocs />} />
          <Route path="components/typographic-atmos" element={<TypographicAtmosDocs />} />
          {/* Blocks — existing */}
          <Route path="components/block-cta-banner" element={<BlockCTABannerDocs />} />
          <Route path="components/block-bento-grid" element={<BlockBentoGridDocs />} />
          <Route path="components/block-marquee-cards" element={<BlockMarqueeCardsDocs />} />
          <Route path="components/block-footer" element={<BlockFooterDocs />} />
          <Route path="components/block-testimonials-carousel" element={<BlockTestimonialsCarouselDocs />} />
          <Route path="components/block-pricing-cards" element={<BlockPricingCardsDocs />} />
          <Route path="components/block-stats-section" element={<BlockStatsSectionDocs />} />
          <Route path="components/block-faq-accordion" element={<BlockFAQAccordionDocs />} />
          {/* Blocks — new */}
          <Route path="components/block-hero-sections" element={<BlockHeroSectionsDocs />} />
          <Route path="components/block-features-sections" element={<BlockFeaturesSectionsDocs />} />
          <Route path="components/block-pricing-table" element={<BlockPricingTableDocs />} />
          <Route path="components/block-pricing-minimal" element={<BlockPricingMinimalDocs />} />
          <Route path="components/block-testimonials-grid" element={<BlockTestimonialsGridDocs />} />
          <Route path="components/block-marquee-logos" element={<BlockMarqueeLogosDocs />} />
          <Route path="components/block-faq-variants" element={<BlockFAQVariantsDocs />} />
          <Route path="components/block-contact-sections" element={<BlockContactSectionsDocs />} />
          {/* Blocks — previously unlinked */}
          <Route path="components/block-blog-grid" element={<BlogGridDocs />} />
          <Route path="components/block-blog-featured" element={<BlogFeaturedDocs />} />
          <Route path="components/block-blog-list" element={<BlogListDocs />} />
          <Route path="components/block-blog-content-header" element={<BlogContentHeaderDocs />} />
          <Route path="components/block-blog-content-body" element={<BlogContentBodyDocs />} />
          <Route path="components/block-blog-content-related" element={<BlogContentRelatedDocs />} />
          <Route path="components/block-sidebar-dashboard" element={<SidebarDashboardDocs />} />
          <Route path="components/block-sidebar-blog-filter" element={<SidebarBlogFilterDocs />} />
          <Route path="components/block-sidebar-toc" element={<SidebarTableOfContentsDocs />} />
          <Route path="components/block-timeline-section" element={<TimelineSectionDocs />} />
          {/* Website Templates */}
          <Route path="components/website-cybersecurity" element={<WebsiteCybersecurityDocs />} />
          <Route path="websites/meditation-app" element={<MeditationAppDocs />} />
          <Route path="websites/luxury-travel" element={<LuxuryTravelTemplateDocs />} />
          <Route path="websites/podcast-network" element={<WebsitePodcastNetworkDocs />} />
          <Route path="websites/climate-tech" element={<WebsiteClimateTechDocs />} />
          <Route path="websites/event-conference" element={<EventConferenceDocs />} />
          <Route path="websites/b2b-marketing" element={<WebsiteB2bMarketingDocs />} />
          <Route path="websites/wedding-events" element={<WebsiteWeddingEventsDocs />} />
          {/* Short URL redirects */}
          <Route path="button" element={<Navigate to="/docs/components/glass-button" replace />} />
          <Route path="card" element={<Navigate to="/docs/components/glass-card" replace />} />
          <Route path="input" element={<Navigate to="/docs/components/glass-input" replace />} />
          <Route path="modal" element={<Navigate to="/docs/components/glass-modal" replace />} />
          <Route path="nav" element={<Navigate to="/docs/components/glass-nav" replace />} />
          <Route path="panel" element={<Navigate to="/docs/components/glass-panel" replace />} />
          <Route path="dropdown" element={<Navigate to="/docs/components/glass-dropdown" replace />} />
          <Route path="sidebar" element={<Navigate to="/docs/components/glass-sidebar" replace />} />
          <Route path="textarea" element={<Navigate to="/docs/components/glass-textarea" replace />} />
          <Route path="select" element={<Navigate to="/docs/components/glass-select" replace />} />
          <Route path="checkbox" element={<Navigate to="/docs/components/glass-checkbox" replace />} />
          <Route path="radio" element={<Navigate to="/docs/components/glass-radio" replace />} />
          <Route path="switch" element={<Navigate to="/docs/components/glass-switch" replace />} />
          <Route path="label" element={<Navigate to="/docs/components/glass-label" replace />} />
          <Route path="badge" element={<Navigate to="/docs/components/glass-badge" replace />} />
          <Route path="avatar" element={<Navigate to="/docs/components/glass-avatar" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
