<template>
  <div
    class="polly-timeline"
    :class="{ 'polly-timeline--single-item': isSingleItem }"
  >
    <slot
      v-if="slots.default"
      :items="items"
      :is-open="isOpen"
      :set-open="setOpen"
      :is-single-item="isSingleItem"
    />
    <p-timeline-item
      v-for="(item, index) in items"
      v-else
      :key="item.title"
      :disabled="item.disabled"
      :force-open="isSingleItem"
      v-bind="getItemProps(index)"
    >
      <template #header>
        <div class="polly-timeline__title">{{ item.title }}</div>
        <div class="polly-timeline__subtitle">{{ item.subtitle }}</div>
      </template>
      <template #content>
        <div>{{ item.subtitle }}</div>
      </template>
    </p-timeline-item>
  </div>
</template>

<script setup lang="ts" generic="T extends TimelineItem">
import { computed, ref } from 'vue'

import { TimelineItem, TimelineProps, TimelineSlots } from '@/types/timeline'

const { items = [], singleOpen = true } = defineProps<TimelineProps<T>>()

const slots = defineSlots<TimelineSlots<T>>()

const isSingleItem = computed(() => items.length === 1)

const openIndex = ref<number | null>(null)

function handleToggle(index: number, value: boolean): void {
  if (!singleOpen) return
  openIndex.value = value ? index : null
}

function isOpen(index: number): boolean | undefined {
  return singleOpen ? openIndex.value === index : undefined
}

function setOpen(index: number, value: boolean): void {
  if (singleOpen) {
    openIndex.value = value ? index : null
  }
}

const getItemProps = computed(() => (index: number) => {
  if (singleOpen) {
    return {
      open: openIndex.value === index,
      'onUpdate:open': (value: boolean) => handleToggle(index, value),
    }
  }
  return {}
})
</script>

<style>
.polly-timeline {
  display: flex;
  gap: var(--spacing-md);
  position: relative;
  flex-direction: column;
  margin-left: var(--spacing-md);
}

.polly-timeline--single-item {
  margin-left: 0;
}

.polly-timeline__title {
  font-weight: var(--font-weight-medium);
}

.polly-timeline__subtitle {
  font-size: var(--font-size-sm);
  color: var(--colors-text-icon-medium);
}
</style>
