<script setup lang="ts">
/**
 * MotionActivityList – Motion-Driven (Vue 3)
 * Staggered row entrance + hover translateX microinteraction.
 * Uses Vue's TransitionGroup for item animations.
 */

import { ref, onMounted } from 'vue'
import type { ActivityItem } from '../shared/types'

const props = withDefaults(defineProps<{
  items: ActivityItem[]
  title?: string
}>(), {
  title: 'Recent Activity'
})

const isVisible = ref(false)
const visibleItems = ref<string[]>([])

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 400)

  // Stagger item visibility
  props.items.forEach((item, i) => {
    setTimeout(() => {
      visibleItems.value.push(item.id)
    }, 500 + i * 60)
  })
})
</script>

<template>
  <section
    :class="[$style.activityCard, isVisible && $style.activityCardVisible]"
    :aria-label="title"
  >
    <h3 :class="$style.activityTitle">{{ title }}</h3>
    <ul :class="$style.activityList">
      <li
        v-for="item in items"
        :key="item.id"
        :class="[
          $style.activityItem,
          visibleItems.includes(item.id) && $style.activityItemVisible
        ]"
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
  transition: border-color var(--dash-transition-fast),
              opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              translate 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  translate: 0 20px;
}

.activityCardVisible {
  opacity: 1;
  translate: 0 0;
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
  padding: 12px 8px;
  border-bottom: 1px solid var(--dash-border-subtle);
  border-radius: 10px;
  cursor: default;
  transition: background var(--dash-transition-fast),
              transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              translate 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  translate: -12px 0;
}

.activityItemVisible {
  opacity: 1;
  translate: 0 0;
}

.activityItem:last-child {
  border-bottom: none;
}

.activityItem:hover {
  background: var(--dash-surface-hover);
  transform: translateX(4px);
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
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.activityAvatar:hover {
  transform: scale(1.08);
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
