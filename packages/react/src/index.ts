// Base Primitives
export * from './base';

// Brand Assets
export * from './components/brand';

// Foundation Components
export * from './components/foundation/glass-root';
export * from './components/foundation/motion-provider';
export * from './components/foundation/focus-ring';
export * from './components/foundation/glass-form-field';

// Glassmorphic Components
export * from './components/glassmorphic';
export * from './components/foundation/glass-checkbox';
export * from './components/foundation/glass-radio';
export * from './components/foundation/glass-select';
export * from './components/foundation/glass-switch';
export * from './components/foundation/glass-textarea';

// Background System
export * from './components/backgrounds';

// Motion-Enhanced Components (requires `motion` peer dependency)
export {
  MotionGlassModal,
  MotionGlassAlert,
  MotionGlassToastItem,
  type MotionGlassModalProps,
} from './components/motion-enhanced';

// Motion Utilities
export {
  usePrefersReducedMotion,
  fadePreset,
  scalePreset,
  slideUpPreset,
  slideDownPreset,
  slideRightPreset,
  overlayPreset,
  interactionSpring,
  safeAnimationProps,
} from './utils/motion';

// Blocks (page-level sections and layout templates)
export * from './components/blocks';

// Templates (full-page website assemblies built from blocks + backgrounds)
export * from './components/templates';

// Re-export core utilities for convenience
export { cn } from '@archui/core';

