<template>
  <PButton
    class="polly-navigation-action"
    v-bind="props"
    :title="label"
  >
    <span class="polly-navigation-action__label">
      {{ label }}
    </span>
  </PButton>
</template>

<script lang="ts" setup>
import { NavigationActionProps } from '@/types'

import { PButton } from '@/components/button'

const props = withDefaults(defineProps<NavigationActionProps>(), {
  text: true,
})
</script>

<style>
.polly-navigation-action.polly-button {
  --polly-button-text-color: var(--colors-text-icon-light);
  --polly-button-font-size: var(--font-size-md);
  font-weight: var(--font-weight-base);
  justify-content: flex-start;
  padding: var(--spacing-sm);
  justify-content: start;
  width: 100%;
  box-sizing: border-box;
  border: none;
}

@media (hover: hover) and (pointer: fine) {
  .polly-navigation-action.polly-button:hover {
    background-color: var(--colors-background-uncommon-nav-section-active);
  }
}

.polly-navigation-action.polly-button:active {
  background-color: var(--colors-background-uncommon-nav-section-active);
}

.polly-navigation-action--collapsed .polly-button__contents {
  justify-content: center;
}

.polly-navigation-action .polly-button.router-link-active {
  --polly-button-background-color: var(--colors-background-uncommon-nav-section-active);
  --polly-button-background-color-active: var(--colors-background-uncommon-nav-section-default);
  border-right: 3px solid var(--polly-navigation-subsection-color);
}

@media screen and (min-width: 1024px) and (max-width: 1279px) {
  .polly-navigation-action.polly-button {
    justify-content: center;
    border-radius: 0;
  }

  .polly-navigation-action .polly-button__contents {
    display: none;
  }
}
</style>
