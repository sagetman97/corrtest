<template>
  <div
    class="polly-minimal-input-base"
    :aria-invalid="invalid"
    :aria-disabled="disabled"
    :class="classes"
    :style="styles"
  >
    <template v-if="prefix || slots.prefix">
      <div class="polly-minimal-input-base__prefix">
        <slot name="prefix">
          {{ prefix }}
        </slot>
      </div>
    </template>

    <slot
      :attrs="attrs"
      classes="polly-minimal-input-base__control"
    />

    <template v-if="suffix || slots.suffix">
      <div class="polly-minimal-input-base__suffix">
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
  'polly-minimal-input-base--ai-highlighted': aiHighlighted.value,
  'polly-minimal-input-base--highlighted': props.highlighted,
  'polly-minimal-input-base--accent': props.accent,
  'polly-minimal-input-base--dark': props.dark,
}))
</script>

<style>
.polly-minimal-input-base {
  --polly-minimal-input-base-foreground-color: var(--colors-text-icon-medium);
  color: var(--polly-minimal-input-base-foreground-color);
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  position: relative;
  border-bottom: 1px solid transparent;
  padding: 0;
  box-sizing: border-box;
  height: 26px;
  transition: box-shadow 100ms ease-in-out;
}

@media (hover: hover) and (pointer: fine) {
  .polly-minimal-input-base:hover:not([aria-disabled='true']):not(:focus-within) {
    box-shadow: 0 1px 0 0 var(--colors-border-common-active);
  }

  .polly-minimal-input-base--accent:hover:not([aria-disabled='true']):not(:focus-within) {
    box-shadow: 0 1px 0 0 var(--colors-accent-lightest);
  }
}

.polly-minimal-input-base:focus-within {
  --polly-minimal-input-base-foreground-color: var(--colors-text-icon-dark);
}

.polly-minimal-input-base--accent:focus-within {
  --polly-minimal-input-base-foreground-color: var(--colors-text-icon-accent);
}

.polly-minimal-input-base--accent {
  --polly-minimal-input-base-foreground-color: var(--colors-text-icon-accent);
}

.polly-minimal-input-base--dark {
  --polly-minimal-input-base-foreground-color: var(--colors-text-icon-dark);
}

.polly-minimal-input-base--accent.polly-minimal-input-base--highlighted {
  --polly-minimal-input-base-foreground-color: var(--colors-accent-mid);
}

.polly-minimal-input-base__prefix,
.polly-minimal-input-base__suffix {
  color: var(--polly-minimal-input-base-foreground-color);
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-md);
  user-select: none;
  flex-shrink: 0;
}

.polly-minimal-input-base__control {
  appearance: none;
  text-align: left;
  flex-grow: 1;
  border: none;
  color: var(--polly-minimal-input-base-foreground-color);
  background-color: transparent;
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-md);
  outline: none;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.polly-minimal-input-base .polly-minimal-input-base__control::placeholder {
  color: var(--colors-text-icon-placeholder);
}

.polly-minimal-input-base[aria-invalid='true'] {
  --polly-minimal-input-base-foreground-color: var(--colors-status-error-dark);
}

.polly-minimal-input-base[aria-invalid='true'] .polly-minimal-input-base__control::placeholder {
  color: var(--colors-status-error-dark);
}

.polly-minimal-input-base[aria-invalid='true']:focus-within {
  --polly-minimal-input-base-foreground-color: var(--colors-text-icon-dark);
}

.polly-minimal-input-base[aria-invalid='true']:focus-within .polly-minimal-input-base__control::placeholder {
  color: var(--colors-text-icon-placeholder);
}

.polly-minimal-input-base[aria-disabled='true'],
.polly-minimal-input-base__control[aria-disabled='true'] {
  color: var(--colors-text-icon-dark-unavailable);
  cursor: not-allowed;
}

.polly-minimal-input-base--accent[aria-disabled='true'],
.polly-minimal-input-base--accent .polly-minimal-input-base__control[aria-disabled='true'] {
  color: var(--colors-accent-lighter);
  cursor: not-allowed;
}

.polly-minimal-input-base--ai-highlighted {
  border-color: var(--colors-AI-dark);
  box-shadow: 0 0 0 1px var(--colors-AI-dark);
  background-color: var(--colors-AI-lightest);
  --polly-minimal-input-base-foreground-color: var(--colors-AI-light);
}
</style>
