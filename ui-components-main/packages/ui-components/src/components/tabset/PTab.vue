<template>
  <p-button
    type="button"
    :disabled="tab.disabled"
    class="polly-tab"
    text
    :class="classes.button(tab)"
  >
    <template v-if="showCount && typeof tab.count === 'number'">
      <p-badge
        class="polly-tab__count"
        :class="classes.count(tab)"
      >
        {{ tab.count }}
      </p-badge>
    </template>
    <slot :selected="tabIsSelected(tab, selected)">
      {{ tab.label }}
    </slot>
  </p-button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { Tab, tabIsSelected, TabProps } from '@/types'

const props = defineProps<TabProps>()

const classes = computed(() => ({
  button: (tab: Tab) => ({
    'polly-tab--selected': tabIsSelected(tab, props.selected),
    [`polly-tab--${tab.variant || 'default'}`]: true,
  }),
  count: (tab: Tab) => ({
    'polly-tab__count--selected': tabIsSelected(tab, props.selected),
    [`polly-tab__count--${tab.variant || 'default'}`]: true,
  }),
}))
</script>

<style>
.polly-tab.polly-button {
  padding-inline: var(--spacing-md);
  padding-block: var(--spacing-sm);
}

.polly-tab .polly-button__contents {
  gap: var(--spacing-sm);
}

.polly-tab--default {
  --polly-button-text-color: var(--colors-text-icon-dark);
}

.polly-tab--ai {
  --polly-button-text-color: var(--colors-text-icon-copilot);
  --polly-tabset-selected-foreground-color: var(--colors-text-icon-copilot);
}

.polly-tab__count--default {
  --polly-tab-count-color: var(--colors-text-icon-dark);
  --polly-tab-count-color-selected: var(--colors-text-icon-light);
  --polly-tab-count-background-color: transparent;
}

.polly-tab__count--ai {
  --polly-tab-count-color: var(--colors-text-icon-copilot);
  --polly-tab-count-color-selected: var(--colors-text-icon-copilot);
  --polly-tab-count-background-color: transparent;
  --polly-tabset-selected-count-background-color: var(--colors-background-uncommon-copilot-lightest);
}

@media (hover: hover) and (pointer: fine) {
  .polly-tab.polly-button:hover {
    box-shadow: none;
    background-color: transparent;
  }
}

.polly-tab--selected.polly-button {
  --polly-button-text-color: var(--polly-tabset-selected-foreground-color);
  transition: color 100ms 100ms;
}

.polly-tab__count {
  font-weight: var(--font-weight-bold);
  color: var(--polly-tab-count-color);
  background-color: var(--polly-tab-count-background-color);
  flex-shrink: 0;
}

.polly-tab__count--selected {
  color: var(--polly-tab-count-color-selected);
  background-color: var(--polly-tabset-selected-count-background-color);
}

@media (prefers-reduced-motion) {
  .polly-tabs--selected,
  .polly-tab__count {
    transition-delay: none;
  }
}
</style>
