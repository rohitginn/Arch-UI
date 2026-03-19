<script setup lang="ts">
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface SidebarNavItem {
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
}

export interface SidebarNavGroup {
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarDashboardUser {
  name: string;
  email?: string;
  avatar?: string;
}

export interface SidebarDashboardProps {
  groups: SidebarNavGroup[];
  user?: SidebarDashboardUser;
  collapsed?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

withDefaults(defineProps<SidebarDashboardProps>(), {
  user: undefined,
  collapsed: false,
});

const emit = defineEmits<{
  navigate: [item: SidebarNavItem];
}>();
</script>

<template>
  <aside
    :class="cn(
      'flex h-full flex-col',
      'border-r border-[var(--glass-edge)]',
      'bg-[var(--glass-surface)] backdrop-blur-xl',
      collapsed ? 'w-16' : 'w-64',
      'transition-[width] duration-300 ease-in-out',
    )"
  >
    <!-- Logo slot -->
    <div
      v-if="$slots.logo"
      :class="cn(
        'flex items-center border-b border-[var(--glass-edge)] p-4',
        collapsed && 'justify-center px-2',
      )"
    >
      <slot name="logo" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-6">
      <div v-for="(group, gi) in groups" :key="gi">
        <span
          v-if="group.title && !collapsed"
          class="mb-2 block px-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--glass-text)]/40"
        >
          {{ group.title }}
        </span>
        <ul class="space-y-1">
          <li v-for="(item, ii) in group.items" :key="ii">
            <component
              :is="item.href ? 'a' : 'button'"
              :href="item.href"
              @click="!item.href && emit('navigate', item)"
              :class="cn(
                'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                'transition-all duration-200',
                'hover:bg-[var(--glass-accent)]/10 hover:text-[var(--glass-accent)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)] focus-visible:ring-offset-2',
                item.active
                  ? 'bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]'
                  : 'text-[var(--glass-text)]/70',
                collapsed && 'justify-center px-0',
              )"
              :title="collapsed ? item.label : undefined"
            >
              <slot :name="`icon-${gi}-${ii}`">
                <!-- Default: no icon -->
              </slot>
              <span v-if="!collapsed" class="flex-1 truncate">{{ item.label }}</span>
              <span
                v-if="!collapsed && item.badge != null"
                class="ml-auto shrink-0 rounded-full bg-[var(--glass-accent)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--glass-accent)]"
              >
                {{ item.badge }}
              </span>
            </component>
          </li>
        </ul>
      </div>
    </nav>

    <!-- User Profile -->
    <div
      v-if="user"
      :class="cn(
        'border-t border-[var(--glass-edge)] p-4',
        collapsed && 'flex justify-center px-2',
      )"
    >
      <div :class="cn('flex items-center gap-3', collapsed && 'justify-center')">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          :alt="user.name"
          class="h-9 w-9 shrink-0 rounded-full object-cover"
        />
        <div
          v-else
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--glass-accent)]/10 text-sm font-semibold text-[var(--glass-accent)]"
        >
          {{ user.name.charAt(0) }}
        </div>
        <div v-if="!collapsed" class="min-w-0">
          <p class="truncate text-sm font-medium text-[var(--glass-text)]">{{ user.name }}</p>
          <p v-if="user.email" class="truncate text-xs text-[var(--glass-text)]/50">{{ user.email }}</p>
        </div>
      </div>
    </div>

    <!-- Footer slot -->
    <div
      v-if="$slots.footer && !collapsed"
      class="border-t border-[var(--glass-edge)] p-4 text-xs text-[var(--glass-text)]/40"
    >
      <slot name="footer" />
    </div>
  </aside>
</template>
