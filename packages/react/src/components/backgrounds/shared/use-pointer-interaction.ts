import * as React from 'react';

/**
 * Hook to track pointer position for interactive backgrounds.
 * Uses requestAnimationFrame for performance.
 * Normalizes coordinates to [-1, 1] relative to the element center.
 */
export function usePointerInteraction(
  enabled: boolean = true,
  ref: React.RefObject<HTMLElement | null>
) {
  const [pointer, setPointer] = React.useState({ x: 0, y: 0, isHovering: false });
  const requestRef = React.useRef<number>();

  React.useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;

    const handlePointerMove = (e: PointerEvent) => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        
        // Normalize to -1 to 1 based on center of element
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        
        setPointer({ x, y, isHovering: true });
      });
    };

    const handlePointerLeave = () => {
      setPointer(prev => ({ ...prev, isHovering: false }));
    };

    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerleave', handlePointerLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [enabled, ref]);

  return pointer;
}
