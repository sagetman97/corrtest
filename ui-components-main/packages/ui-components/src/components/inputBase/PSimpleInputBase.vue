<template>
  <div
    class="polly-simple-input-base"
    :aria-invalid="invalid"
    :aria-disabled="disabled"
    :class="classes"
    :style="styles"
  >
    <template v-if="prefix || slots.prefix">
      <div class="polly-simple-input-base__prefix">
        <slot name="prefix">
          {{ prefix }}
        </slot>
      </div>
    </template>

    <slot
      :attrs="attrs"
      classes="polly-simple-input-base__control"
    />

    <template v-if="suffix || slots.suffix">
      <div class="polly-simple-input-base__suffix">
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
  'polly-simple-input-base--ai-highlighted': aiHighlighted.value,
  'polly-simple-input-base--highlighted': props.highlighted,
}))
</script>

<style>
.polly-simple-input-base {
  --polly-simple-input-base-foreground-color: var(--colors-text-icon-placeholder);
  --polly-select-background-color: transparent;
  --polly-select-border-color: var(--colors-border-common-default);
  --polly-select-border-width: 1px;
  color: var(--polly-simple-input-base-foreground-color);
  background-color: var(--polly-select-background-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  position: relative;
  border: none;
  box-shadow: 0 var(--polly-select-border-width) 0 0 var(--polly-select-border-color);
  box-sizing: border-box;
  height: 28px;
  transition: box-shadow 100ms ease-in-out;
}

@media (hover: hover) and (pointer: fine) {
  .polly-simple-input-base:hover:not([aria-disabled='true']):not(:focus-within) {
    --polly-select-border-color: var(--colors-border-common-active);
  }

  .polly-simple-input-base[aria-invalid='true']:hover:not([aria-disabled='true']) {
    --polly-select-border-color: var(--colors-status-error-dark);
  }

  .polly-simple-input-base--highlighted:hover:not([aria-disabled='true']):not(:focus-within) {
    --polly-simple-input-base-foreground-color: var(--colors-border-common-accent-light);
    --polly-select-border-color: var(--colors-accent-light);
  }
}

.polly-simple-input-base:not([aria-disabled='true']):focus-within {
  --polly-select-border-color: var(--colors-border-common-active-dark);
  --polly-select-border-width: 2px;
}

.polly-simple-input-base--highlighted {
  box-shadow:
    0 0 0 1px var(--colors-neutral-white),
    0 0 0 3px var(--colors-border-common-accent-light);
}

.polly-simple-input-base__prefix,
.polly-simple-input-base__suffix {
  color: var(--polly-simple-input-base-foreground-color);
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-md);
  user-select: none;
  flex-shrink: 0;
}

.polly-simple-input-base__control {
  appearance: none;
  text-align: left;
  flex-grow: 1;
  border: none;
  color: var(--polly-simple-input-base-foreground-color);
  background-color: transparent;
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-md);
  outline: none;
  padding: var(--spacing-xxs);
  overflow: hidden;
  text-overflow: ellipsis;
}

.polly-simple-input-base .polly-simple-input-base__control::placeholder {
  color: var(--colors-text-icon-placeholder);
}

.polly-simple-input-base[aria-invalid='true'] {
  --polly-simple-input-base-foreground-color: var(--colors-text-icon-status-error-AA);
  --polly-select-border-color: var(--colors-status-error-dark);
  --polly-select-background-color: var(--colors-background-status-error-light);
}

.polly-simple-input-base[aria-invalid='true']:focus-within {
  --polly-select-border-color: var(--colors-status-error-dark);
}

.polly-simple-input-base[aria-invalid='true'] .polly-simple-input-base__control::placeholder {
  --polly-select-background-color: var(--colors-background-status-error-light);
  color: var(--colors-text-icon-status-error-AA);
}

.polly-simple-input-base[aria-invalid='true']:focus-within .polly-simple-input-base__control::placeholder {
  color: var(--colors-text-icon-placeholder);
}

.polly-simple-input-base[aria-disabled='true'],
.polly-simple-input-base__control[aria-disabled='true'] {
  --polly-select-background-color: var(--colors-background-common-default-grey-unavailable);
  color: var(--colors-text-icon-dark-unavailable);
  cursor: not-allowed;
}

.polly-simple-input-base--ai-highlighted {
  --polly-select-border-color: var(--colors-AI-dark);
  --polly-select-background-color: var(--colors-AI-lightest);
}
</style>
