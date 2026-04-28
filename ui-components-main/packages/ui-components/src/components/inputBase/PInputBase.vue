<template>
  <div
    class="polly-input-base"
    :aria-invalid="invalid"
    :aria-disabled="disabled"
    :class="classes"
    :style="styles"
  >
    <template v-if="prefix || slots.prefix">
      <div class="polly-input-base__prefix">
        <slot name="prefix">
          {{ prefix }}
        </slot>
      </div>
    </template>

    <slot
      :attrs="attrs"
      classes="polly-input-base__control"
    />

    <template v-if="suffix || slots.suffix">
      <div class="polly-input-base__suffix">
        <slot name="suffix">
          {{ suffix }}
        </slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'

import type { Ref } from 'vue'
import { BaseInputProps, InputSlots } from '@/types'

import { useClassesStylesAndAttrs } from '@/composables'

const props = defineProps<BaseInputProps>()

const slots = defineSlots<InputSlots>()

defineOptions({ inheritAttrs: false })

const aiHighlighted = inject<Ref<boolean>>('aiHighlighted', ref(false))
const { attrs, classes: inheritedClasses, styles } = useClassesStylesAndAttrs()

const classes = computed(() => ({
  ...inheritedClasses,
  'polly-input-base--ai-highlighted': aiHighlighted.value,
  'polly-input-base--highlighted': props.highlighted,
}))
</script>

<style>
.polly-input-base {
  --polly-input-base-foreground-color: var(--colors-text-icon-dark);

  color: var(--polly-input-base-foreground-color);
  background-color: var(--colors-background-common-white);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  position: relative;
  border: 1px solid var(--colors-border-common-default);
  border-radius: var(--border-radius-xl);
  padding: 0 var(--spacing-sm);
  box-sizing: border-box;
}

.polly-input-base__prefix,
.polly-input-base__suffix {
  color: var(--polly-input-base-foreground-color);
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-md);
  user-select: none;
  flex-shrink: 0;
}

.polly-input-base {
  outline: 2px solid transparent;
  outline-offset: -2px;
  transition:
    outline 100ms ease-in-out,
    background-color 100ms ease-in-out;
}

.polly-input-base:focus-within {
  outline-color: var(--colors-border-common-active-dark);
}

.polly-input-base--highlighted {
  box-shadow:
    0px 0px 0px 1px var(--colors-neutral-white),
    0px 0px 0px 3px var(--colors-border-common-accent-light);
}

.polly-input-base__control {
  appearance: none;
  text-align: left;
  flex-grow: 1;
  border: none;
  display: flex;
  align-items: center;
  color: var(--polly-input-base-foreground-color);
  background-color: transparent;
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-md);
  transition: background-color 100ms ease-in-out;
  outline: none;
  padding: var(--spacing-sm) 0;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 21px;
  line-height: 21px;
  box-sizing: content-box;
}

.polly-input-base .polly-input-base__control::placeholder {
  color: var(--colors-text-icon-placeholder);
}

.polly-input-base[aria-invalid='true'] {
  --polly-input-base-foreground-color: var(--colors-text-icon-status-error-AA);
  outline-color: var(--colors-border-status-error-dark);
  background-color: var(--colors-background-status-error-light);
}

@media (hover: hover) and (pointer: fine) {
  .polly-input-base[aria-invalid='true']:hover:not([aria-disabled='true']) {
    outline-color: var(--colors-border-status-error-dark);
  }
}

.polly-input-base[aria-invalid='true']:focus-within {
  background-color: var(--colors-background-common-white);
}

.polly-input-base[aria-disabled='true'],
.polly-input-base__control[aria-disabled='true'] {
  color: var(--colors-text-icon-dark-unavailable);
  background-color: var(--colors-background-common-default-grey-unavailable);
  cursor: not-allowed;
}

.polly-input-base--ai-highlighted {
  border-color: var(--colors-AI-dark);
  box-shadow: 0 0 0 1px var(--colors-AI-dark);
  background-color: var(--colors-AI-lightest);
}

.polly-input-base--ai-highlighted .polly-input-base__control {
  color: var(--colors-AI-mid);
}
</style>
