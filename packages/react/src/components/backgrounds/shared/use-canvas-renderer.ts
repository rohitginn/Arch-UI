import * as React from 'react';

/**
 * Shared hook to manage HTML Canvas resizing and DPI scaling.
 * Returns the canvas ref and context setup.
 */
export function useCanvasRenderer(draw: (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => void) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const requestRef = React.useRef<number>();
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let time = 0;
    
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
    };
    
    // Initial size
    handleResize();
    
    // Resize observer
    const observer = new ResizeObserver(handleResize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    
    // Render loop
    const render = () => {
      time += 1;
      // Dimensions in CSS pixels (unscaled)
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      
      draw(ctx, w, h, time);
      requestRef.current = requestAnimationFrame(render);
    };
    
    requestRef.current = requestAnimationFrame(render);
    
    return () => {
      observer.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [draw]);

  return canvasRef;
}
