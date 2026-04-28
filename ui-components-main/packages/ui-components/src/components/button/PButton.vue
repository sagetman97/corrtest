<template>
  <component
    :is="component"
    class="polly-button"
    :class="classes"
    :aria-disabled="disabled || isLoading"
    v-bind="componentProps"
    @click="handleClick"
  >
    <template v-if="icon && iconPosition === 'left'">
      <div class="polly-button__icon polly-button__icon--left">
        <transition name="loading-transition">
          <p-icon
            :key="iconAttrs.icon"
            family="duotone"
            v-bind="iconAttrs"
          />
        </transition>
      </div>
    </template>
    <transition
      name="loading-transition"
      @before-leave="onBeforeLeave"
      @before-enter="onBeforeEnter"
    >
      <template v-if="isLoading && !icon">
        <slot name="loading">
          <div>
            <p-icon
              spin
              family="duotone"
              icon="spinner-third"
            />
            {{ loadingText }}
          </div>
        </slot>
      </template>
      <template v-else-if="slots.default">
        <div class="polly-button__contents">
          <slot />
        </div>
      </template>
    </transition>

    <template v-if="icon && iconPosition !== 'left'">
      <div class="polly-button__icon polly-button__icon--right">
        <transition name="loading-transition">
          <p-icon
            :key="iconAttrs.icon"
            family="duotone"
            v-bind="iconAttrs"
          />
        </transition>
      </div>
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'

import { ButtonProps, IconProps, isIconProp } from '@/types'

import { PIcon } from '@/components/icon'
import { isRouteExternal, splitProps } from '@/utilities'
import { createUnitValue } from '@/utilities/cssUnitValue'
import { elementIsHTMLElement } from '@/utilities/html'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  iconPosition: 'left',
  size: 'md',
})

const slots = defineSlots<{
  default?(): unknown | undefined
  loading?(): unknown
}>()

const contentWidth = ref(0)
const onBeforeLeave = (element: Element) => {
  if (!elementIsHTMLElement(element)) return

  contentWidth.value = element.clientWidth
}

const onBeforeEnter = (element: Element) => {
  if (!elementIsHTMLElement(element)) return

  if (props.isLoading) {
    element.style.minWidth = createUnitValue(contentWidth.value, 'px').toString()
  }
}

const hasContent = computed(() => !!slots.default)
const iconPosition = computed(() => (!hasContent.value ? 'center' : props.iconPosition))

const component = computed(() => {
  if (props.to) {
    return isRouteExternal(props.to) ? 'a' : 'router-link'
  }

  return 'button'
})

const componentProps = computed(() => {
  switch (component.value) {
    case 'a':
      return {
        role: 'button',
        href: props.to,
      }
    case 'button':
      return {
        type: 'button',
      }
    case 'router-link':
      return {
        role: 'button',
        to: props.to,
      }
    default:
      throw `Component Error: Unexpected component value in p-button ${component.value}`
  }
})

const classes = computed(() => {
  return [
    `polly-button--${props.variant}`,
    `polly-button--icon-${iconPosition.value}`,
    `polly-button--${props.size}`,
    {
      'polly-button--round': props.round,
      'polly-button--text': props.text,
      'polly-button--outline': props.outline,
      'polly-button--loading': props.isLoading,
      'polly-button--lite': props.lite,
    },
  ]
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.isLoading) {
    event.preventDefault()
    return
  }

  emit('click', event)
}

const iconAttrs = ref<Partial<IconProps>>({})
watchEffect(() => {
  iconAttrs.value = splitProps(props, isIconProp)
  iconAttrs.value.icon = props.isLoading ? 'spinner-third' : props.icon
  iconAttrs.value.spin = props.isLoading || props.spin
})
</script>

<style>
.polly-button {
  --polly-button-font-size: var(--font-size-md);
  --polly-button-font-weight: var(--font-weight-base);
  --polly-button-border-radius: var(--border-radius-xl);
  --polly-button-padding-inline: var(--spacing-lg);
  --polly-button-border-width: 2px;
  --polly-button-initial-width: unset;

  font-size: var(--polly-button-font-size);
  letter-spacing: var(--letter-spacing-md);
  font-weight: var(--polly-button-font-weight);
  padding-inline: calc(var(--polly-button-padding-inline) - var(--polly-button-border-width));
  padding-block: calc(var(--polly-button-padding-block) - var(--polly-button-border-width));
  border-radius: var(--polly-button-border-radius);

  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  gap: var(--spacing-base);
  justify-content: center;
  align-items: center;
  text-wrap: nowrap;
  text-decoration: none;
  min-width: var(--polly-button-initial-width);
  user-select: none;
  transition: all 100ms ease-in-out;
  outline: 2px solid transparent;
  outline-offset: 2px;
  flex-shrink: 0;
  max-width: 100%;
  overflow: hidden;
  pointer-events: auto;
}

.polly-button > * {
  pointer-events: none;
}

.polly-button:active {
  box-shadow: none;
  background-color: var(--polly-button-background-color-darker);
  border-color: var(--polly-button-background-color-darker);
}

.polly-button[aria-disabled='true'] {
  background-color: var(--polly-button-background-color-lighter);
  border-color: var(--polly-button-background-color-lighter);
  cursor: not-allowed;
}

.polly-button__contents {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-base);
}

.polly-button__contents:empty {
  display: none;
}

.polly-button__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;
  flex-shrink: 0;
}

@media (hover: hover) and (pointer: fine) {
  .polly-button:hover {
    box-shadow: var(--shadow-button);
  }
}

.polly-button--primary {
  --polly-button-background-color: var(--colors-background-button-primary-default);
  --polly-button-background-color-lighter: var(--colors-background-button-primary-unavailable);
  --polly-button-background-color-darker: var(--colors-background-button-primary-active);
  --polly-button-background-color-darkest: var(--polly-button-background-color-darker);
  --polly-button-text-color: var(--colors-text-icon-light);

  background-color: var(--polly-button-background-color);
  color: var(--polly-button-text-color);
  border: solid 2px var(--polly-button-background-color);
}

.polly-button--primary[aria-disabled='true'] {
  --polly-button-background-color-lighter: var(--colors-primary-dark);
}

.polly-button--accent {
  --polly-button-background-color: var(--colors-background-common-accent);
  --polly-button-background-color-lighter: var(--colors-background-common-accent-unavailable);
  --polly-button-background-color-darker: var(--colors-background-common-accent-dark);
  --polly-button-background-color-darkest: var(--colors-background-common-accent-dark);
  --polly-button-text-color: var(--colors-text-icon-light);

  background-color: var(--polly-button-background-color);
  color: var(--polly-button-text-color);
  border: solid 2px var(--polly-button-background-color);
}

.polly-button--error {
  --polly-button-background-color: var(--colors-background-button-error-default);
  --polly-button-background-color-lighter: var(--colors-background-button-error-unavailable);
  --polly-button-background-color-darker: var(--colors-background-button-error-active);
  --polly-button-background-color-darkest: var(--colors-text-icon-status-error-AA);
  --polly-button-text-color: var(--colors-text-icon-light);

  background-color: var(--polly-button-background-color);
  color: var(--polly-button-text-color);
  border: solid 2px var(--polly-button-background-color);
}

.polly-button--ai {
  --polly-button-background-color: var(--colors-background-button-copilot-default);
  --polly-button-background-color-lighter: var(--colors-background-button-copilot-unavailable);
  --polly-button-background-color-darker: var(--colors-background-button-copilot-active);
  --polly-button-background-color-darkest: var(--colors-background-button-copilot-darker);
  --polly-button-text-color: var(--colors-text-icon-light);

  background-color: var(--polly-button-background-color);
  color: var(--polly-button-text-color);
  border: solid 2px var(--polly-button-background-color);
}

.polly-button--ai-light {
  --polly-button-background-color: var(--colors-background-button-copilot-light-action);
  --polly-button-text-color: var(--colors-text-icon-dark);
  --polly-button-active-color: var(--colors-background-button-copilot-unavailable);

  background-color: var(--polly-button-background-color);
  color: var(--polly-button-text-color);
  padding: var(--spacing-xxs) var(--spacing-md);
  border: solid 2px var(--polly-button-background-color);
  max-width: none;
}
.polly-button--ai-light:active {
  background-color: var(--polly-button-active-color);
  border-color: var(--polly-button-active-color);
  color: var(--polly-button-text-color);
}

.polly-button--outline {
  background-color: var(--colors-background-common-white);
  --polly-button-text-color: var(--polly-button-background-color);
  color: var(--polly-button-text-color);
  border-color: var(--colors-border-common-default);
}

@media (hover: hover) and (pointer: fine) {
  .polly-button--outline:hover {
    border-color: var(--colors-border-common-active);
  }
}

.polly-button--outline:active {
  background-color: var(--colors-background-common-white);
  border-color: var(--polly-button-background-color-darker);
}

.polly-button--outline[aria-disabled='true'] {
  border-color: var(--colors-background-button-secondary-unavailable);
  color: var(--polly-button-background-color-lighter);
  background-color: var(--colors-background-button-secondary-unavailable);
}

.polly-button--lite {
  --polly-button-text-color: var(--polly-button-background-color);
  --polly-button-font-weight: var(--font-weight-medium);
  --polly-button-background-color-darker: var(--polly-button-background-color-darkest);
  color: var(--polly-button-text-color);
  background-color: transparent;
  padding-inline: var(--spacing-xxxs);
  padding-block: 0;
  border-radius: var(--border-radius-xs);
  border: none;
  gap: var(--spacing-xs);
}

@media (hover: hover) and (pointer: fine) {
  .polly-button--lite:hover {
    background-color: transparent;
    box-shadow: none;
  }
}
.polly-button--lite:active {
  background-color: transparent;
  color: var(--polly-button-background-color-darker);
}

.polly-button--lite[aria-disabled='true'] {
  background-color: transparent;
  border-color: transparent;
  color: var(--polly-button-background-color-lighter);
}

.polly-button--text {
  --polly-button-text-color: var(--polly-button-background-color);
  --polly-button-font-weight: var(--font-weight-medium);
  color: var(--polly-button-text-color);
  background-color: transparent;
  border: none;
  gap: var(--spacing-xs);
}

.polly-button--text:active {
  background-color: var(--colors-background-button-text-active);
}

.polly-button--text[aria-disabled='true'] {
  background-color: transparent;
  border-color: transparent;
  color: var(--polly-button-background-color-lighter);
}

.polly-button--xs {
  --polly-button-font-size: var(--font-size-md);
  --polly-button-letter-spacing: var(--letter-spacing-md);
  --polly-button-padding-block: 5px;
  --polly-button-padding-inline: var(--spacing-xs);
  --polly-button-icon-font-size: 1rem;
  --polly-button-width: 32px;
}

.polly-button--xs .polly-icon {
  --polly-icon-font-size: var(--polly-button-icon-font-size);
}

.polly-button--sm {
  --polly-button-font-size: var(--font-size-md);
  --polly-button-letter-spacing: var(--letter-spacing-md);
  --polly-button-padding-block: 5px;

  --polly-button-icon-font-size: 1rem;
  --polly-button-width: 32px;
}

.polly-button--sm .polly-icon {
  --polly-icon-font-size: var(--polly-button-icon-font-size);
}

.polly-button--md {
  --polly-button-font-size: var(--font-size-md);
  --polly-button-letter-spacing: var(--letter-spacing-md);
  --polly-button-padding-block: var(--spacing-xs);

  --polly-button-icon-font-size: 1.25rem;
  --polly-button-width: 40px;
}

.polly-button--lg {
  --polly-button-font-size: var(--font-size-md);
  --polly-button-letter-spacing: var(--letter-spacing-md);
  --polly-button-padding-block: var(--spacing-sm);

  --polly-button-icon-font-size: 1.75rem;
  --polly-button-width: 48px;
}

.polly-button--xl {
  --polly-button-font-size: var(--font-size-lg);
  --polly-button-letter-spacing: var(--letter-spacing-md);
  --polly-button-padding-block: var(--spacing-sm);
  --polly-button-font-weight: var(--font-weight-medium);

  --polly-button-icon-font-size: 2.25rem;
  --polly-button-width: 56px;
}

.polly-button--xl.polly-button--text {
  --polly-button-font-weight: var(--font-weight-semibold);
}

.polly-button--round {
  border-radius: var(--border-radius-round);
  padding: calc(var(--spacing-xs) - var(--polly-button-border-width));
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  min-width: var(--polly-button-width);
  height: var(--polly-button-width);
}

.polly-button--round .polly-icon {
  --polly-icon-font-size: var(--polly-button-icon-font-size);
}

.polly-button:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}

.polly-button[aria-disabled='true'] {
  cursor: not-allowed;
}

@media (hover: hover) and (pointer: fine) {
  .polly-button[aria-disabled='true']:hover {
    box-shadow: none;
  }
}

.polly-button .polly-icon.loading-transition-enter-active,
.polly-button .polly-icon.loading-transition-leave-active {
  transition: all 200ms ease-in-out;
}

.polly-button--loading .loading-transition-enter-from {
  transform: translateY(100%);
}

.polly-button--loading .loading-transition-leave-to {
  transform: translateY(-100%);
}
</style>
