'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface SidebarNavItem {
  /** Label text */
  label: string;
  /** Optional icon rendered before the label */
  icon?: React.ReactNode;
  /** Navigation href */
  href?: string;
  /** Click handler (alternative to href) */
  onClick?: () => void;
  /** Whether this item is currently active */
  active?: boolean;
  /** Badge content (e.g., unread count) */
  badge?: React.ReactNode;
}

export interface SidebarNavGroup {
  /** Group heading (optional) */
  title?: string;
  /** Nav items within the group */
  items: SidebarNavItem[];
}

export interface SidebarDashboardUser {
  name: string;
  email?: string;
  avatar?: string;
}

export interface SidebarDashboardProps {
  /** Sidebar nav groups */
  groups: SidebarNavGroup[];
  /** Logo / branding slot at top */
  logo?: React.ReactNode;
  /** User profile shown at the bottom */
  user?: SidebarDashboardUser;
  /** Whether sidebar is collapsed to icon-only mode */
  collapsed?: boolean;
  /** Additional className */
  className?: string;
  /** Footer content below user profile */
  footer?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const SidebarDashboard = React.forwardRef<HTMLElement, SidebarDashboardProps>(
  ({ groups, logo, user, collapsed = false, className, footer }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          'flex h-full flex-col',
          'border-r border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-xl',
          collapsed ? 'w-16' : 'w-64',
          'transition-[width] duration-300 ease-in-out',
          className,
        )}
      >
        {/* ── Logo / Branding ─────────────────────────────────────── */}
        {logo && (
          <div
            className={cn(
              'flex items-center border-b border-[var(--glass-edge)] p-4',
              collapsed && 'justify-center px-2',
            )}
          >
            {logo}
          </div>
        )}

        {/* ── Navigation ──────────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {groups.map((group, gi) => (
            <div key={gi}>
              {group.title && !collapsed && (
                <span className="mb-2 block px-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--glass-text)]/40">
                  {group.title}
                </span>
              )}
              <ul className="space-y-1">
                {group.items.map((item, ii) => {
                  const Tag = item.href ? 'a' : 'button';
                  return (
                    <li key={ii}>
                      <Tag
                        href={item.href as any}
                        onClick={item.onClick}
                        className={cn(
                          'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                          'transition-all duration-200',
                          'hover:bg-[var(--glass-accent)]/10 hover:text-[var(--glass-accent)]',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)] focus-visible:ring-offset-2',
                          item.active
                            ? 'bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]'
                            : 'text-[var(--glass-text)]/70',
                          collapsed && 'justify-center px-0',
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        {item.icon && (
                          <span className="shrink-0 [&_svg]:h-5 [&_svg]:w-5">
                            {item.icon}
                          </span>
                        )}
                        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                        {!collapsed && item.badge && (
                          <span className="ml-auto shrink-0 rounded-full bg-[var(--glass-accent)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--glass-accent)]">
                            {item.badge}
                          </span>
                        )}
                      </Tag>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── User Profile ────────────────────────────────────────── */}
        {user && (
          <div
            className={cn(
              'border-t border-[var(--glass-edge)] p-4',
              collapsed && 'flex justify-center px-2',
            )}
          >
            <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-sm font-semibold text-[var(--glass-accent)]">
                  {user.name.charAt(0)}
                </div>
              )}
              {!collapsed && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--glass-text)]">
                    {user.name}
                  </p>
                  {user.email && (
                    <p className="truncate text-xs text-[var(--glass-text)]/50">{user.email}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Footer ──────────────────────────────────────────────── */}
        {footer && !collapsed && (
          <div className="border-t border-[var(--glass-edge)] p-4 text-xs text-[var(--glass-text)]/40">
            {footer}
          </div>
        )}
      </aside>
    );
  },
);

SidebarDashboard.displayName = 'SidebarDashboard';
