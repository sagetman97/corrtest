<template>
  <component
    :is="component"
    class="polly-link"
    v-bind="componentProps"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click.capture="handleClick"
  >
    <slot />
    <p-icon
      v-if="displayIcon"
      v-bind="iconAttrs"
      class="polly-link__icon"
      :icon="displayIcon"
    />
  </component>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

import { IconProps, isIconProp, LinkProps } from '@/types'

import { isRouteExternal, splitProps } from '@/utilities'

const props = withDefaults(defineProps<LinkProps>(), {
  faStyle: 'solid',
  size: 'xs',
})

const isExternal = computed(() => {
  return props.to && isRouteExternal(props.to)
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const iconAttrs = ref<Partial<IconProps>>({})

watchEffect(() => {
  iconAttrs.value = splitProps(props, isIconProp)
})

const component = computed(() => {
  if (props.to) {
    return isExternal.value ? 'a' : 'router-link'
  }

  return 'a'
})

const componentProps = computed(() => {
  switch (component.value) {
    case 'a':
      return {
        href: props.to,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    case 'router-link':
      return {
        to: props.to,
      }
    default:
      return component.value satisfies never
  }
})

const displayIcon = computed(() => {
  if (props.icon && props.icon.length) return props.icon
  if (props.download) return 'download'
  if (isExternal.value) return 'external-link'
  return false
})

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<style>
.polly-link {
  --polly-link-color: var(--colors-text-icon-link);

  color: var(--polly-link-color);
  text-decoration: none;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: var(--spacing-xxs);
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-radius: var(--border-radius-xs);
  text-decoration: underline;
}

.polly-link:focus-visible {
  outline-color: var(--colors-old-brand-yellow-500);
}

.polly-link[aria-disabled='true'] {
  --polly-link-color: var(--colors-text-icon-dark-unavailable);
  cursor: not-allowed;
}
</style>
