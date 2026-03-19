'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassAspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const GlassAspectRatio = React.forwardRef<HTMLDivElement, GlassAspectRatioProps>(
  ({ className, ratio = 16 / 9, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-hidden', className)}
        style={{
          paddingBottom: `${100 / ratio}%`,
          ...style,
        }}
        {...props}
      >
        <div className="absolute inset-0">
          {children}
        </div>
      </div>
    );
  }
);

GlassAspectRatio.displayName = 'GlassAspectRatio';

export { GlassAspectRatio };
