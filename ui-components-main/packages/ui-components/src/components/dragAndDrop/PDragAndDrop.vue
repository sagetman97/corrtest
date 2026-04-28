<template>
  <div class="polly-drag-and-drop">
    <div
      v-for="(item, index) in items"
      :key="JSON.stringify(item)"
      class="polly-drag-and-drop__item"
      :draggable="true"
      @touchstart="() => handleDragStart(item)"
      @dragstart="() => handleDragStart(item)"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="() => handleDrop(item)"
    >
      <slot v-bind="{ item, index }">
        {{ item }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T">
import { ref } from 'vue'

import { DragAndDropSlots } from '@/types'

const items = defineModel<T[]>('items', { default: () => [] })

defineSlots<DragAndDropSlots<T>>()
const draggedItem = ref<T>()

function handleDragStart(item: T) {
  draggedItem.value = item
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
}

function handleDrop(droppedOnItem: T) {
  if (!draggedItem.value) return

  const droppedIndex = items.value.findIndex((item) => item === droppedOnItem)
  const dragIndex = items.value.findIndex((item) => item === draggedItem.value)

  const newOrder = [...items.value]

  newOrder.splice(dragIndex, 1)
  newOrder.splice(droppedIndex, 0, draggedItem.value!)

  items.value = newOrder
}
</script>

<style>
.polly-drag-and-drop {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
}

.polly-drag-and-drop__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  position: relative;
  transition: transform 0.15s ease;
  cursor: grab;
  user-select: none;
}
</style>
