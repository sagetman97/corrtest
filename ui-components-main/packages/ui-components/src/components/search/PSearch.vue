<template>
  <p-input
    v-bind="props"
    v-model="modelValue"
    class="polly-search"
    :placeholder="placeholder"
    role="searchbox"
  >
    <template #prefix>
      <p-icon icon="search" />
    </template>
    <template #suffix>
      <button
        v-if="showClear"
        class="polly-search__clear-button"
        type="button"
        @mousedown.prevent
        @click="handleClear"
      >
        <p-icon icon="xmark" />
      </button>
    </template>
  </p-input>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { SearchProps } from '@/types'

const props = withDefaults(defineProps<SearchProps>(), {
  placeholder: 'Search...',
})

const modelValue = defineModel<string | null | undefined>()

function handleClear() {
  if (props.disabled) return

  modelValue.value = null
}

const showClear = computed(() => modelValue.value && !props.disabled)
</script>

<style>
.polly-search .polly-input-base__suffix {
  position: absolute;
  right: var(--spacing-lg);
}

.polly-search .polly-input-base__control {
  padding-right: var(--spacing-lg);
}

.polly-search__clear-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-right: calc(-1 * var(--spacing-sm));
  color: inherit;
}
</style>
