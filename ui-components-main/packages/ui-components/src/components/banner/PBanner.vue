<template>
  <PAccordion
    v-model:expanded="expanded"
    class="polly-banner"
    :class="classes"
    :disabled="!hasExpansion"
    :hide-icon="!hasExpansion"
  >
    <template #heading>
      <div class="polly-banner__heading">
        <slot name="container">
          <div class="polly-banner__icon">
            <slot name="icon">
              <PIcon
                v-bind="iconAttrs"
                :icon="getIcon()"
                :size="iconSize"
              />
            </slot>
          </div>

          <div class="polly-banner__content">
            <slot name="content">
              <p
                v-if="title || !!slots.title"
                class="polly-banner__title"
              >
                <slot name="title">{{ title }}</slot>
              </p>
              <p
                v-if="message || !!slots.message"
                class="polly-banner__message"
              >
                <slot name="message">{{ message }}</slot>
              </p>
            </slot>
            <div
              v-if="isStacked && !!slots.actions"
              class="polly-banner__stacked-actions"
            >
              <slot name="actions" />
            </div>
          </div>
        </slot>

        <div
          v-if="!isStacked && !!slots.actions"
          class="polly-banner__actions"
        >
          <slot name="actions" />
        </div>
      </div>
    </template>

    <template #icon>
      <div
        v-if="hasExpansion || showClose"
        class="polly-banner__controls"
      >
        <PIcon
          v-if="hasExpansion"
          class="polly-accordion__icon"
          icon="chevron-right"
          size="lg"
          :class="{ 'p-rotate-90': expanded }"
        />
        <div
          v-if="showClose"
          class="polly-banner__close"
          @click.stop
        >
          <slot
            name="close"
            :close="handleClose"
          >
            <PButton
              variant="primary"
              text
              round
              icon="xmark"
              @click="handleClose"
            />
          </slot>
        </div>
      </div>
    </template>

    <template #default>
      <slot name="expansion" />
    </template>
  </PAccordion>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { BannerProps, BannerSlots, IconProps } from '@/types'

import { useMobile } from '@/composables'

const props = withDefaults(defineProps<BannerProps>(), {
  variant: 'info',
  family: 'duotone',
  bannerSize: 'default',
})

const emit = defineEmits<{
  close: []
}>()

const expanded = defineModel<boolean>('expanded', { default: false })
const slots = defineSlots<BannerSlots>()

const hasExpansion = computed(() => !!slots.expansion)

const { isMobileWidth } = useMobile()
const isStacked = computed(() => props.stackedActions || isMobileWidth.value)

const iconSize = computed(() => {
  if (props.size) {
    return props.size
  }

  return props.bannerSize === 'small' ? 'lg' : '2x'
})

const classes = computed(() => {
  return [
    `polly-banner--${props.variant}`,
    `polly-banner--${props.bannerSize}`,
    {
      'polly-banner--expanded': expanded.value,
      'polly-banner--stacked-actions': isStacked.value,
    },
  ]
})

const iconAttrs = computed<IconProps>(() => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { variant, title, message, ...iconProps } = props

  return iconProps
})

function getIcon() {
  if (props.icon) {
    return props.icon
  }

  switch (props.variant) {
    case 'info':
    case 'outline':
    case 'neutral':
      return 'info-circle'
    case 'warning':
      return 'exclamation-triangle'
    case 'error':
      return 'octagon-xmark'
    case 'success':
      return 'check-circle'
    case 'ai':
      return 'sparkles'
    default:
      return 'info-circle'
  }
}

function handleClose() {
  emit('close')
}
</script>

<style>
.polly-banner {
  --polly-banner-background-color: unset;
  --polly-banner-text-color: var(--colors-text-icon-dark);
  --polly-banner-border-color: transparent;

  background-color: var(--polly-banner-background-color);
  color: var(--polly-banner-text-color);
  box-sizing: border-box;
  border-bottom: none;
  gap: var(--spacing-sm);
  border-radius: var(--spacing-xs);
  border: 1px solid var(--polly-banner-border-color);
  width: 100%;
}

.polly-banner__heading {
  display: flex;
  gap: var(--spacing-xs);
  width: 100%;
}

.polly-banner--info {
  --polly-banner-background-color: var(--colors-background-p-banner-default);
  --polly-banner-icon-color: var(--colors-text-icon-accent);
  --polly-banner-header-background-color-active: var(--colors-background-p-banner-active);
}

.polly-banner--error {
  --polly-banner-background-color: var(--colors-background-status-error-light);
  --polly-banner-icon-color: var(--colors-text-icon-status-error-decorative);
  --polly-banner-header-background-color-active: var(--colors-red-200);
}

.polly-banner--warning {
  --polly-banner-background-color: var(--colors-background-status-warning-light);
  --polly-banner-icon-color: var(--colors-text-icon-status-warning-decorative);
  --polly-banner-header-background-color-active: var(--colors-yellow-200);
}

.polly-banner--success {
  --polly-banner-background-color: var(--colors-background-status-success-light);
  --polly-banner-icon-color: var(--colors-text-icon-status-success-decorative);
  --polly-banner-header-background-color-active: var(--colors-green-200);
}

.polly-banner--outline {
  --polly-banner-background-color: var(--colors-background-common-white);
  --polly-banner-icon-color: var(--colors-text-icon-medium);
  --polly-banner-header-background-color-active: var(--colors-background-common-default-grey-light);
  --polly-banner-border-color: var(--colors-border-common-default);
}

.polly-banner--neutral {
  --polly-banner-background-color: var(--colors-background-common-default-grey-light);
  --polly-banner-icon-color: var(--colors-text-icon-medium);
  --polly-banner-header-background-color-active: var(--colors-background-common-default-grey);
}

.polly-banner--ai {
  --polly-banner-background-color: var(--colors-background-uncommon-copilot-lightest);
  --polly-banner-icon-color: var(--colors-text-icon-copilot);
  --polly-banner-header-background-color-active: var(--colors-AI-light);
}

.polly-banner--expanded {
  --polly-accordion-background-color: var(--polly-banner-header-background-color-active);
}

.polly-banner__icon {
  color: var(--polly-banner-icon-color);
}

.polly-banner__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-xxs);
}

.polly-banner__title {
  font-weight: var(--font-weight-medium);
  hyphens: auto;
}

.polly-banner__message {
  font-weight: var(--font-weight-base);
  hyphens: auto;
}

.polly-banner__close {
  display: flex;
  align-items: center;
}

.polly-banner__controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.polly-banner__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-left: auto;
  margin-right: var(--spacing-xs);
  flex-shrink: 0;
}

.polly-banner__expansion-icon {
  display: flex;
  align-items: center;
}

.polly-accordion__icon {
  transition: transform 250ms ease-in-out;
}

.polly-accordion__icon--expanded {
  transform: rotate(90deg);
}

.polly-banner--small:not(.polly-banner--stacked-actions) .polly-banner__heading {
  align-items: center;
}

.polly-banner--stacked-actions .polly-banner__content {
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xs);
}

.polly-banner__stacked-actions {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) 0;
}
</style>
