/**
 * ZenUI Core Types
 * Shared type definitions across all framework implementations
 */

// ============================================================================
// COMPONENT VARIANTS
// ============================================================================

export type GlassVariant = 'default' | 'bordered' | 'gradient' | 'glow';
export type GlassBlur = 'sm' | 'md' | 'lg' | 'xl';
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

// ============================================================================
// THEME TYPES
// ============================================================================

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: Theme;
  glassBgLight: string;
  glassBgDark: string;
  glassBorder: string;
  glassBlur: string;
}

// ============================================================================
// ANIMATION TYPES
// ============================================================================

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
}

// ============================================================================
// COMPONENT COMMON PROPS
// ============================================================================

export interface BaseComponentProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Component ID */
  id?: string;
}

export interface GlassComponentProps extends BaseComponentProps {
  /** Glass effect variant */
  variant?: GlassVariant;
  /** Blur intensity */
  blur?: GlassBlur;
  /** Enable hover animation */
  animated?: boolean;
  /** Show shine effect on hover */
  shine?: boolean;
}

// ============================================================================
// BUTTON TYPES
// ============================================================================

export type ButtonVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'ghost' 
  | 'outline';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ComponentSize;
  loading?: boolean;
  fullWidth?: boolean;
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export type InputType = 
  | 'text' 
  | 'password' 
  | 'email' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'search';

export interface InputProps extends BaseComponentProps {
  type?: InputType;
  placeholder?: string;
  value?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

// ============================================================================
// MODAL TYPES
// ============================================================================

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

// ============================================================================
// COMPONENT CATEGORY TYPES
// ============================================================================

export type ComponentCategory =
  | 'glassmorphic'
  | 'foundation'
  | 'layout'
  | 'overlay'
  | 'feedback'
  | 'navigation'
  | 'data-display'
  | 'animation'
  | 'form';

export type ComponentPriority = 'critical' | 'high' | 'medium' | 'low';

export interface ComponentMetadata {
  name: string;
  displayName: string;
  description: string;
  category: ComponentCategory;
  priority: ComponentPriority;
  version: string;
  dependencies: string[];
}
