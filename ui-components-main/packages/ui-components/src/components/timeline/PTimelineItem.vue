<template>
  <div
    class="polly-timeline-item"
    :class="{
      'polly-timeline-item--open': hasContent && open,
      'polly-timeline-item--single-item': forceOpen,
    }"
  >
    <component
      :is="hasContent && !forceOpen ? 'button' : 'span'"
      class="polly-timeline-item__header"
      :aria-disabled="disabled"
      :class="{
        'polly-timeline-item__header--has-content': hasContent && !forceOpen,
      }"
      @click="toggleContent"
      @keydown.enter.prevent="toggleContent"
      @keydown.space.prevent="toggleContent"
    >
      <slot name="header" />
    </component>
    <transition-expand
      v-if="hasContent"
      v-model:open="open"
    >
      <div class="polly-timeline-item__content">
        <slot name="content" />
      </div>
    </transition-expand>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const slots = defineSlots<{
  header?(): unknown
  content?(): unknown
}>()

const { disabled, forceOpen = false } = defineProps<{
  disabled?: boolean
  forceOpen?: boolean
}>()

const hasContent = computed(() => !!slots.content)

const open = defineModel<boolean>('open', { default: false })

// When forceOpen is true, keep the item open
if (forceOpen && hasContent.value) {
  open.value = true
}

function toggleContent(): void {
  if (disabled || !hasContent.value || forceOpen) {
    return
  }

  open.value = !open.value
}
</script>

<style>
.polly-timeline-item {
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: default;
}

.polly-timeline-item__header {
  border: 2px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-base);
  background-color: var(--colors-background-common-white);
  padding: var(--spacing-xs) var(--spacing-base);
  position: relative;
  box-sizing: border-box;
  user-select: none;
  transition:
    background-color 150ms ease-in-out,
    border-color 150ms ease-in-out;
}

.polly-timeline-item__header[aria-disabled='true'] {
  cursor: default;
  pointer-events: none;
  border-color: var(--colors-background-common-white);
}

.polly-timeline-item__header--has-content {
  cursor: pointer;
}

button.polly-timeline-item__header {
  appearance: none;
  outline: 2px solid transparent;
  cursor: pointer;
  text-align: left;
}

button.polly-timeline-item__header:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-timeline-item--open .polly-timeline-item__header {
  background-color: var(--colors-background-common-accent-lighter);
  border-color: var(--colors-accent-mid);
}

.polly-timeline-item--single-item.polly-timeline-item--open .polly-timeline-item__header {
  background-color: var(--colors-background-common-white);
  border-color: var(--colors-border-common-default);
}

.polly-timeline-item__header--has-content:not([aria-disabled='true']):hover {
  background-color: var(--colors-background-common-accent-lighter);
}

.polly-timeline-item__header::before {
  content: '';
  position: absolute;
  top: 28px;
  transform: translateY(-50%);
  left: calc((var(--spacing-md) * -1) - 8px);
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: var(--colors-border-common-default);
  border: 2px solid var(--colors-border-common-active);
  z-index: 1;
  transition:
    background-color 150ms ease-in-out,
    border-color 150ms ease-in-out;
}

.polly-timeline-item--single-item .polly-timeline-item__header::before {
  display: none;
}

.polly-timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 34px;
  left: calc(var(--spacing-md) * -1);
  width: 2px;
  height: calc(100% + var(--spacing-xs) + 2px);
  background-color: var(--colors-border-common-active);
  z-index: 0;
  transition: background-color 150ms ease-in-out;
}

.polly-timeline-item--single-item:not(:last-child)::before {
  display: none;
}

.polly-timeline-item--open.polly-timeline-item::before {
  background-color: var(--colors-accent-mid);
}

.polly-timeline-item__header--has-content:hover::before {
  background-color: var(--colors-background-common-accent-lighter);
}

.polly-timeline-item--open .polly-timeline-item__header::before {
  background-color: var(--colors-accent-mid);
  border-color: var(--colors-accent-light);
}

.polly-timeline-item .polly-timeline-item__content {
  padding: var(--spacing-base) var(--spacing-base) 0 var(--spacing-base);
}
</style>
