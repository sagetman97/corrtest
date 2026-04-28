<template>
  <div
    ref="chunkElement"
    class="polly-virtual-scroller-chunk"
    :class="classes"
    :style="styles"
  >
    <template v-if="visible">
      <slot />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef } from 'vue'

import { VirtualScrollerChunkProps } from '@/types'

import { useIntersectionObserver } from '@/composables'
import { createUnitValue } from '@/utilities'

const props = defineProps<VirtualScrollerChunkProps>()

const classes = computed(() => ({
  'polly-virtual-scroller-chunk--visible': visible.value,
  'polly-virtual-scroller-chunk--hidden': !visible.value,
}))

const styles = computed(() => {
  if (visible.value) {
    return
  }

  const height = actualHeight.value ? createUnitValue(actualHeight.value, 'px') : props.estimateHeight

  return {
    height: height.toString(),
  }
})

const chunkElement = useTemplateRef<HTMLDivElement>('chunkElement')
const visible = ref(false)
const actualHeight = ref<number>()
const { observe } = useIntersectionObserver(intersect, props.observerOptions)

function setHeight(): void {
  if (chunkElement.value) {
    const { height } = chunkElement.value.getBoundingClientRect()

    actualHeight.value = height
  }
}

function intersect(entries: IntersectionObserverEntry[]): void {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      setHeight()
    }

    setTimeout(() => {
      visible.value = entry.isIntersecting
    })
  })
}

onMounted(() => {
  observe(chunkElement)
})
</script>

<style>
.polly-virtual-scroller-chunk > *:not(:last-child) {
  margin-bottom: var(--polly-virtual-scroller-gap);
}
</style>
