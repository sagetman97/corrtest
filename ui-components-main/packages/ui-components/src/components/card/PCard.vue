<template>
  <section
    class="polly-card"
    :class="[`polly-card--${variant}`]"
  >
    <template v-if="showHeader">
      <div class="polly-card__header">
        <h2 class="polly-card__title">
          <template v-if="showBack">
            <slot name="back">
              <p-button
                class="polly-card__back-button"
                icon="circle-arrow-left"
                lite
                family="duotone"
                size="xs"
                variant="accent"
                @click="handleBack"
              >
                {{ backText }}
              </p-button>
            </slot>
          </template>
          <slot name="title">
            {{ title }}
          </slot>
        </h2>
        <div
          v-if="slots.actions"
          class="polly-card__actions"
        >
          <slot name="actions" />
        </div>
        <div
          v-if="subtitle || slots.subtitle"
          class="polly-card__subtitle"
        >
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </div>
      </div>
    </template>

    <div class="polly-card__content">
      <slot />
    </div>

    <template v-if="slots.footer">
      <div class="polly-card__footer">
        <slot name="footer" />
      </div>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { CardProps, CardSlots } from '@/types'

const { backText = 'Go Back', variant = 'default', showBack, title, subtitle } = defineProps<CardProps>()

const slots = defineSlots<CardSlots>()
const emit = defineEmits(['goBack'])

const showHeader = computed(() => {
  return showBack || title || slots.title || subtitle || slots.subtitle || slots.actions
})

function handleBack(): void {
  emit('goBack')
}
</script>

<style>
.polly-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--colors-background-common-white);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-base);
  box-shadow: var(--shadow-md);
  transition:
    background-color 300ms,
    color 300ms;
  box-sizing: border-box;
  overflow: hidden;
}

/* Add AI variant styles */
.polly-card--ai {
  --polly-card-border-color: var(--colors-AI-mid);
}

.polly-card--ai .polly-card__title {
  color: var(--colors-text-icon-copilot);
}

.polly-card--ai .polly-card__footer {
  box-shadow: 0px -4px 8px 0px var(--colors-border-box-shadow);
}

.polly-card__header {
  display: grid;
  grid-template-areas:
    'title actions'
    'subtitle actions';
  width: 100%;
  box-sizing: border-box;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
}

.polly-card__subtitle {
  grid-area: subtitle;
  color: var(--colors-text-icon-medium);
}

.polly-card__title {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: var(--spacing-xxs);
  grid-area: title;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
}

.polly-card__back-button {
  z-index: var(--layout-above);
}

.polly-card__actions {
  grid-area: actions;
  display: flex;
  gap: var(--spacing-xs);
  align-items: flex-end;
  box-sizing: border-box;
  flex-wrap: wrap-reverse;
  justify-content: right;
}

.polly-card__header + .polly-card__content {
  padding-top: 0;
}

.polly-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--spacing-md);
  flex: 1;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
}

.polly-card__footer {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  flex-wrap: wrap;
  flex-shrink: 0;
  padding: var(--spacing-sm);
  box-shadow: var(--shadow-up);
}

@media screen and (max-width: 669px) {
  .polly-card__header,
  .polly-card__footer,
  .polly-card__content {
    padding: var(--spacing-sm);
  }

  .polly-card__header {
    gap: var(--spacing-xs);
  }

  .polly-card__footer {
    gap: var(--spacing-xs);
  }
}
</style>
