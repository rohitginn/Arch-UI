<script setup lang="ts">
/**
 * ActivityList – Ultra-Minimal (Vue 3)
 * Clean list of recent activity items with avatar initials.
 */

import type { ActivityItem } from '../shared/types'

withDefaults(defineProps<{
  items: ActivityItem[]
  title?: string
}>(), {
  title: 'Recent Activity'
})
</script>

<template>
  <section :class="$style.activityCard" :aria-label="title">
    <h3 :class="$style.activityTitle">{{ title }}</h3>
    <ul :class="$style.activityList">
      <li
        v-for="item in items"
        :key="item.id"
        :class="$style.activityItem"
      >
        <div :class="$style.activityAvatar" aria-hidden="true">
          {{ item.avatar }}
        </div>
        <div :class="$style.activityContent">
          <p :class="$style.activityText">
            <strong>{{ item.user }}</strong>
            {{ ' ' }}<span>{{ item.action }}</span>{{ ' ' }}
            <strong>{{ item.target }}</strong>
          </p>
          <p :class="$style.activityTime">{{ item.time }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style module>
.activityCard {
  padding: 28px;
  border-radius: 16px;
  background: var(--dash-surface);
  border: 1px solid var(--dash-border-subtle);
  transition: background var(--dash-transition-fast),
              border-color var(--dash-transition-fast);
}

.activityTitle {
  font-size: 16px;
  font-weight: 600;
  color: var(--dash-text);
  margin: 0 0 20px;
  letter-spacing: -0.01em;
}

.activityList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.activityItem {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--dash-border-subtle);
  transition: background var(--dash-transition-fast);
}

.activityItem:last-child {
  border-bottom: none;
}

.activityAvatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--dash-accent-soft);
  color: var(--dash-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}

.activityContent {
  flex: 1;
  min-width: 0;
}

.activityText {
  font-size: 14px;
  color: var(--dash-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activityText strong {
  font-weight: 600;
}

.activityText span {
  color: var(--dash-text-muted);
  font-weight: 400;
}

.activityTime {
  font-size: 12px;
  color: var(--dash-text-muted);
  margin: 2px 0 0;
}
</style>
