<template>
  <div
    v-if="isMobileWidth || isTabletWidth"
    class="polly-navigation-bar"
  >
    <div class="polly-navigation-bar__controls">
      <PButton
        :icon="expanded ? 'close' : 'bars'"
        round
        class="polly-navigation-bar__menu-button"
        @click="expanded = !expanded"
      />
      <slot name="logo" />
    </div>

    <div class="polly-navigation-bar__controls">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Navigation[]">
import { Navigation, NavigationProps, NavigationSlots } from '@/types'

import { useMobile } from '@/composables'

defineProps<NavigationProps<T>>()

const expanded = defineModel('expanded', { default: false, type: Boolean })
defineSlots<NavigationSlots>()

const { isMobileWidth, isTabletWidth } = useMobile()
</script>

<style>
.polly-navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--polly-navigation-bar-height);
  background-color: var(--colors-background-uncommon-nav-nav);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-md);
  z-index: var(--layout-navigation-bar);
}

.polly-navigation-bar__controls .polly-button:not(.polly-button--ai) {
  --polly-button-background-color: var(--colors-background-uncommon-nav-nav);
  --polly-button-background-color-active: var(--colors-background-uncommon-nav-nav);
}

.polly-navigation-bar__controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

@media screen and (min-width: 1024px) {
  .polly-navigation-bar__menu-button {
    z-index: var(--layout-navigation-bar);
  }
}
</style>
