<template>
  <p-button
    class="polly-icon-button"
    v-bind="props"
    lite
  />
</template>

<script lang="ts" setup>
import { IconButtonProps } from '@/types'

const props = defineProps<IconButtonProps>()
</script>

<style>
.polly-icon-button {
  appearance: none;
  padding: 0.75rem;
  height: min-content;
  width: min-content;
  min-width: 0;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease-in-out;
  flex-shrink: 0;
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-radius: 50%;
  box-shadow: none;
}

.polly-icon-button:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-icon-button[aria-disabled='true'] {
  cursor: not-allowed;
}

.polly-icon-button .polly-icon {
  border-radius: var(--border-radius-round);
}

@media (hover: hover) and (pointer: fine) {
  .polly-icon-button:hover .polly-icon {
    box-shadow: var(--shadow-button);
  }
}

@media (hover: hover) and (pointer: fine) {
  .polly-icon-button[aria-disabled='true']:hover .polly-icon {
    box-shadow: none;
  }
}
</style>
