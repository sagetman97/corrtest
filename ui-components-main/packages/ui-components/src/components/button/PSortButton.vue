<template>
  <div class="polly-sort-button">
    <div class="polly-sort-button__content">
      <slot />
    </div>

    <button
      class="polly-sort-button__icon"
      title="Sort"
      @click="updateSort"
    >
      <p-icon
        :icon="sortIcon"
        size="xs"
        fa-style="solid"
      />
    </button>
  </div>
</template>

<script lang="ts" setup generic="T extends TableData">
import { computed } from 'vue'

import { Sort, TableData } from '@/types'

const props = defineProps<{
  property: keyof T
  sort: Sort<T>
}>()

const emit = defineEmits<{
  'update:sort': [value: Sort<T>]
}>()

const sort = computed({
  get() {
    return props.sort
  },
  set(value) {
    emit('update:sort', value)
  },
})

const isCurrentlySorted = computed(() => props.property === sort.value.property)

const sortIcon = computed(() => {
  if (isCurrentlySorted.value) {
    return props.sort.direction === 'asc' ? 'sort-up' : 'sort-down'
  }

  return 'sort'
})

function updateSort(): void {
  sort.value = getNextSort()
}

function getNextSort(): Sort<T> {
  if (!isCurrentlySorted.value) {
    return {
      property: props.property,
      direction: 'asc',
    }
  }

  if (props.sort.direction === 'asc') {
    return {
      ...sort.value,
      direction: 'desc',
    }
  }

  return {}
}
</script>

<style>
.polly-sort-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-weight: normal;
  max-width: 100%;
}

.polly-sort-button__icon {
  cursor: pointer;
  padding: 0;
  color: inherit;
}

.polly-sort-button__content {
  gap: var(--spacing-xxs);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
