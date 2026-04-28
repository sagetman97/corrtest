<template>
  <div
    class="polly-badge"
    :class="classes"
  >
    <template v-if="iconPosition === 'left' && (slots.icon || icon)">
      <slot name="icon">
        <p-icon
          v-bind="iconAttrs"
          size="xs"
        />
      </slot>
    </template>
    <slot>
      {{ label }}
    </slot>
    <template v-if="iconPosition === 'right' && (slots.icon || icon)">
      <slot name="icon">
        <p-icon
          v-bind="iconAttrs"
          size="xs"
        />
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

import { BadgeProps, BadgeSlots, IconProps, isIconProp } from '@/types'

import { splitProps } from '@/utilities'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  iconPosition: 'left',
})

const iconAttrs = ref<Partial<IconProps>>({})

const slots = defineSlots<BadgeSlots>()

const classes = computed(() => [`polly-badge--${props.variant}`])

watchEffect(() => {
  iconAttrs.value = splitProps(props, isIconProp)
})
</script>

<style>
.polly-badge {
  --polly-badge-background-color: unset;
  --polly-badge-foreground-color: unset;
  --polly-badge-border-color: transparent;

  display: flex;
  align-items: center;
  width: min-content;
  max-width: 100%;
  background-color: var(--polly-badge-background-color);
  color: var(--polly-badge-foreground-color);
  border-radius: var(--border-radius-xs);
  border: 1px solid var(--polly-badge-border-color);
  padding: 0 var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  height: var(--spacing-lg);
  letter-spacing: var(--letter-spacing-md);
  text-wrap: nowrap;
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: var(--spacing-xs);
}

.polly-badge--primary {
  --polly-badge-background-color: var(--colors-background-common-primary);
  --polly-badge-foreground-color: var(--colors-text-icon-light);
}

.polly-badge--medium {
  --polly-badge-background-color: var(--colors-background-common-dark);
  --polly-badge-foreground-color: var(--colors-text-icon-light);
}

.polly-badge--basic {
  --polly-badge-background-color: transparent;
  --polly-badge-foreground-color: var(--colors-text-icon-dark);
  --polly-badge-border-color: var(--colors-border-common-default);
}

.polly-badge--positive {
  --polly-badge-background-color: var(--colors-background-status-success-light);
  --polly-badge-foreground-color: var(--colors-text-icon-status-success-AA);
}

.polly-badge--negative {
  --polly-badge-background-color: var(--colors-background-status-error-light);
  --polly-badge-foreground-color: var(--colors-text-icon-status-error-AA);
}

.polly-badge--new {
  --polly-badge-background-color: var(--colors-background-uncommon-new);
  --polly-badge-foreground-color: var(--colors-text-icon-dark);
  --polly-badge-border-color: var(--colors-border-uncommon-new);
}

.polly-badge--highlight {
  --polly-badge-background-color: var(--colors-background-common-accent-light);
  --polly-badge-foreground-color: var(--colors-text-icon-dark);
  --polly-badge-border-color: var(--colors-border-common-accent-decorative);
}

.polly-badge--unavailable {
  --polly-badge-background-color: var(--colors-background-common-default-grey);
  --polly-badge-foreground-color: var(--colors-text-icon-dark);
  --polly-badge-border-color: var(--colors-border-common-active);
}

.polly-badge--success {
  --polly-badge-background-color: var(--colors-background-status-success-light);
  --polly-badge-foreground-color: var(--colors-text-icon-dark);
  --polly-badge-border-color: var(--colors-border-status-success-light);
}

.polly-badge--warning {
  --polly-badge-background-color: var(--colors-background-status-warning-light);
  --polly-badge-foreground-color: var(--colors-text-icon-dark);
  --polly-badge-border-color: var(--colors-border-status-warning-light);
}

.polly-badge--error {
  --polly-badge-background-color: var(--colors-background-status-error-light);
  --polly-badge-foreground-color: var(--colors-text-icon-dark);
  --polly-badge-border-color: var(--colors-border-status-error-light);
}

.polly-badge--info {
  --polly-badge-background-color: var(--colors-background-status-info-light);
  --polly-badge-foreground-color: var(--colors-text-icon-dark);
  --polly-badge-border-color: var(--colors-border-status-info-light);
}
</style>
