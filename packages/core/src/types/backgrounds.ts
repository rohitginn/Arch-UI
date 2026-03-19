/**
 * Shared props interface for all Background components
 * Framework agnostic where possible, but optimized for React/Vue APIs
 */
export interface BackgroundBaseProps {
  /**
   * Optional theme override. Defaults to 'auto' (respects system/.dark class)
   */
  theme?: 'light' | 'dark' | 'auto';
  
  /**
   * Override specific template colors
   */
  colors?: Record<string, string> | null;
  
  /**
   * Overall intensity multiplier for the effect (opacity/brightness)
   * 0.0 to 1.0. Defaults to 0.5 for subtlety.
   */
  intensity?: number;
  
  /**
   * Enable/disable motion or force 'reduced' mode
   */
  motion?: boolean | 'reduced';
  
  /**
   * Speed multiplier for animations
   */
  speed?: number;
  
  /**
   * Element density multiplier (e.g., number of photons or ribbons)
   */
  density?: number;
  
  /**
   * Primary accent color
   */
  accent?: string;
  
  /**
   * Overlay for content contrast (e.g., { color: '#000', opacity: 0.5 })
   */
  overlay?: { color: string; opacity: number };
  
  /**
   * Pointer interactions
   */
  interactions?: { pointer: 'none' | 'repel' | 'attract' | 'parallax' };
  
  /**
   * Built-in template preset name
   */
  preset?: string;
  
  /**
   * Seed for deterministic rendering/randomness
   */
  seed?: number;
}
