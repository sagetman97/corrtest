<template>
  <div
    ref="containerElement"
    class="polly-overflow"
    :class="classes.container"
  >
    <slot />

    <div
      ref="overflowElement"
      class="polly-overflow__overflow"
    >
      <slot
        name="overflow"
        :count="overflowItemCount"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'

import { OverflowSlots } from '@/types'

import { useMutationObserver, useResizeObserver } from '@/composables'

const slots = defineSlots<OverflowSlots>()

const containerElement = useTemplateRef<HTMLDivElement>('containerElement')
const overflowElement = useTemplateRef<HTMLDivElement>('overflowElement')

const calculateOverflowHasRun = ref(false)
const overflowItemCount = ref(0)

const classes = computed(() => {
  return {
    container: { 'polly-overflow--invisible': !calculateOverflowHasRun.value },
  }
})

function calculateOverflow(): void {
  if (!containerElement.value) {
    return
  }

  overflowItemCount.value = 0

  const items = Array.from(containerElement.value.children).filter((child) => {
    return child !== overflowElement.value
  })

  if (!items.length) {
    return
  }

  setItemVisibility(overflowElement.value!, 'hidden')

  for (const item of items) {
    setItemVisibility(item, 'invisible')
  }

  const containerRect = containerElement.value.getBoundingClientRect()

  items.forEach((item) => {
    const { right } = item.getBoundingClientRect()

    if (right > containerRect.right || overflowItemCount.value > 0) {
      setItemVisibility(item, 'hidden')
      overflowItemCount.value++
    } else {
      setItemVisibility(item, 'visible')
    }
  })

  if (overflowItemCount.value > 0) {
    setItemVisibility(overflowElement.value!, 'visible')

    let right = overflowElement.value!.getBoundingClientRect().right
    const itemsVisible = items.slice(0, items.length - overflowItemCount.value)

    while (right > containerRect.right && itemsVisible.length) {
      setItemVisibility(itemsVisible.pop()!, 'hidden')
      overflowItemCount.value++
      right = overflowElement.value!.getBoundingClientRect().right
    }
  }

  calculateOverflowHasRun.value = true
}

function setItemVisibility(child: Element, visibility: 'invisible' | 'hidden' | 'visible'): void {
  switch (visibility) {
    case 'invisible':
      child.classList.remove('polly-overflow__item--removed')
      child.classList.add('polly-overflow__item--invisible')
      break
    case 'hidden':
      child.classList.remove('polly-overflow__item--invisible')
      child.classList.add('polly-overflow__item--removed')
      break
    case 'visible':
      child.classList.remove('polly-overflow__item--removed')
      child.classList.remove('polly-overflow__item--invisible')
      break
  }
}

const resize = useResizeObserver(calculateOverflow)
const mutation = useMutationObserver(calculateOverflow)

onMounted(() => {
  resize.observe(containerElement)
  mutation.observe(containerElement, { childList: true })
})

watch(
  () => slots.default,
  () => {
    nextTick(() => calculateOverflow())
  },
  { deep: true }
)
</script>

<style>
.polly-overflow {
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  gap: var(--spacing-xxs);
}

.polly-overflow__overflow {
  display: inline-block;
}

.polly-overflow--invisible {
  visibility: hidden !important;
}

.polly-overflow__item--removed {
  display: none !important;
}

.polly-overflow__item--invisible {
  visibility: hidden !important;
}
</style>
