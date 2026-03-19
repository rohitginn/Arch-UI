/**
 * useTheme – Vue 3 Composable
 * Manages light/dark theme with localStorage persistence.
 */

import { ref, watch, onMounted } from 'vue'
import type { Theme } from './types'

const STORAGE_KEY = 'zenlab-dashboard-theme'

export function useTheme(initialTheme: Theme = 'light') {
  const theme = ref<Theme>(initialTheme)

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored) {
      theme.value = stored
    }
    applyTheme(theme.value)
  })

  function applyTheme(t: Theme) {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(t)
    root.setAttribute('data-theme', t)
    localStorage.setItem(STORAGE_KEY, t)
  }

  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  })

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function setTheme(t: Theme) {
    theme.value = t
  }

  return { theme, toggleTheme, setTheme }
}
