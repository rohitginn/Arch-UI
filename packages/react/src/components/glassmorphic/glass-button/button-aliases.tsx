'use client';

import * as React from 'react';
import { GlassButton, type GlassButtonProps } from './glass-button';

/**
 * Convenience aliases — thin wrappers around GlassButton with a preset variant.
 * They forward all props & refs, only defaulting the variant so consumers
 * can write <SolidButton> instead of <GlassButton variant="solid">.
 */

/* ------------------------------------------------------------------ */
/*  SolidButton                                                         */
/* ------------------------------------------------------------------ */

export type SolidButtonProps = Omit<GlassButtonProps, 'variant'>;

const SolidButton = React.forwardRef<HTMLButtonElement, SolidButtonProps>(
  (props, ref) => <GlassButton ref={ref} variant="solid" {...props} />
);
SolidButton.displayName = 'SolidButton';

/* ------------------------------------------------------------------ */
/*  OutlineButton                                                       */
/* ------------------------------------------------------------------ */

export type OutlineButtonProps = Omit<GlassButtonProps, 'variant'>;

const OutlineButton = React.forwardRef<HTMLButtonElement, OutlineButtonProps>(
  (props, ref) => <GlassButton ref={ref} variant="outline" {...props} />
);
OutlineButton.displayName = 'OutlineButton';

/* ------------------------------------------------------------------ */
/*  GhostButton                                                         */
/* ------------------------------------------------------------------ */

export type GhostButtonProps = Omit<GlassButtonProps, 'variant'>;

const GhostButton = React.forwardRef<HTMLButtonElement, GhostButtonProps>(
  (props, ref) => <GlassButton ref={ref} variant="ghost" {...props} />
);
GhostButton.displayName = 'GhostButton';

/* ------------------------------------------------------------------ */
/*  DestructiveButton                                                   */
/* ------------------------------------------------------------------ */

export type DestructiveButtonProps = Omit<GlassButtonProps, 'variant'>;

const DestructiveButton = React.forwardRef<
  HTMLButtonElement,
  DestructiveButtonProps
>((props, ref) => <GlassButton ref={ref} variant="danger" {...props} />);
DestructiveButton.displayName = 'DestructiveButton';

/* ------------------------------------------------------------------ */
/*  PrimaryButton                                                       */
/* ------------------------------------------------------------------ */

export type PrimaryButtonProps = Omit<GlassButtonProps, 'variant'>;

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (props, ref) => <GlassButton ref={ref} variant="primary" {...props} />
);
PrimaryButton.displayName = 'PrimaryButton';

/* ------------------------------------------------------------------ */
/*  SecondaryButton                                                     */
/* ------------------------------------------------------------------ */

export type SecondaryButtonProps = Omit<GlassButtonProps, 'variant'>;

const SecondaryButton = React.forwardRef<
  HTMLButtonElement,
  SecondaryButtonProps
>((props, ref) => <GlassButton ref={ref} variant="secondary" {...props} />);
SecondaryButton.displayName = 'SecondaryButton';

/* ------------------------------------------------------------------ */
/*  Exports                                                             */
/* ------------------------------------------------------------------ */

export {
  SolidButton,
  OutlineButton,
  GhostButton,
  DestructiveButton,
  PrimaryButton,
  SecondaryButton,
};
