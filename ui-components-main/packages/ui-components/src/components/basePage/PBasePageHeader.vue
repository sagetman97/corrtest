<template>
  <div class="polly-base-page-header">
    <slot name="title">
      <h1 class="polly-base-page-header__title">
        {{ title }}
      </h1>
    </slot>

    <div
      v-if="hasControls"
      class="polly-base-page-header__controls"
    >
      <slot name="controls" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { BasePageHeaderProps } from '@/types'

defineProps<BasePageHeaderProps>()
const slots = defineSlots<{
  title?(): unknown
  controls?(): unknown
}>()

const hasControls = computed(() => !!slots.controls)
</script>

<style>
.polly-base-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
}

.polly-base-page-header__controls {
  flex-shrink: 0;
}

.polly-base-page-header__controls:empty {
  display: none;
}

@media screen and (max-width: 669px) {
  .polly-base-page-header {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
