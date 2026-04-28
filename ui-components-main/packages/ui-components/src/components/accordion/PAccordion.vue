<template>
  <div
    class="polly-accordion"
    :class="classes.accordion"
    :aria-disabled="disabled"
  >
    <slot
      name="header"
      :toggle="toggle"
      :expanded="expanded"
    >
      <button
        class="polly-accordion__header"
        data-testid="polly-accordion-header-btn"
        :class="classes.header"
        :aria-expanded="expanded"
        :aria-disabled="disabled"
        :disabled="disabled"
        :aria-controls="id"
        @click="toggle"
      >
        <div class="polly-accordion__heading">
          <slot
            name="heading"
            :toggle="toggle"
            :expanded="expanded"
          >
            <div class="polly-accordion__title">
              <slot
                name="title"
                :toggle="toggle"
                :expanded="expanded"
              >
                <h2>{{ title }}</h2>
              </slot>
            </div>
          </slot>
        </div>

        <slot
          name="icon"
          :toggle="toggle"
          :expanded="expanded"
        >
          <p-icon
            v-if="!hideIcon"
            class="polly-accordion__icon"
            icon="chevron-right"
            size="lg"
            :class="classes.icon"
          />
        </slot>
      </button>
    </slot>
    <div
      v-if="slots.summary"
      class="polly-accordion__summary"
    >
      <slot
        name="summary"
        :toggle="toggle"
        :expanded="expanded"
      />
    </div>
    <transition-expand :open="expanded">
      <div
        :id="id"
        class="polly-accordion__content"
      >
        <slot
          :expanded="expanded"
          :toggle="toggle"
        />
      </div>
    </transition-expand>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AccordionProps, AccordionSlots } from '@/types'

import TransitionExpand from '@/components/utilities/TransitionExpand.vue'
import { randomId } from '@/utilities'

const { variant = 'primary', disabled } = defineProps<AccordionProps>()
const slots = defineSlots<AccordionSlots>()
const expanded = defineModel<boolean>('expanded', { default: false })

const toggle = () => {
  if (disabled) return
  expanded.value = !expanded.value
}

const classes = computed(() => {
  return {
    accordion: [
      {
        'polly-accordion--expanded': expanded.value,
      },
      `polly-accordion--${variant}`,
    ],
    header: `polly-accordion__header--${variant}`,
    icon: {
      'p-rotate-90': expanded.value,
    },
  }
})

const id = randomId()
</script>

<style>
.polly-accordion {
  --polly-accordion-background-color: unset;

  width: 100%;
}

.polly-accordion--primary {
  border-bottom: 1px solid var(--colors-border-common-default);
}

.polly-accordion--secondary {
  --polly-accordion-background-color: var(--colors-blue-25);
}

.polly-accordion__header {
  color: var(--colors-text-icon-dark);
  background-color: var(--polly-accordion-background-color);
  box-sizing: border-box;
  align-items: center;
  cursor: pointer;
  width: 100%;
  padding: var(--spacing-sm);
  display: flex;
  gap: var(--spacing-xs);
  transition: all ease-in-out 100ms;
  text-align: left;
  border-radius: var(--spacing-xs);
}

.polly-accordion__header--secondary {
  --polly-accordion-background-color: var(--colors-blue-25);
  padding: var(--spacing-md);
  transition:
    border-radius 100ms ease-in-out 350ms,
    background-color 100ms ease-in-out;
}

.polly-accordion__header--secondary:has(+ .polly-accordion__summary) {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

@media (hover: hover) and (pointer: fine) {
  .polly-accordion__header--secondary:hover {
    --polly-accordion-background-color: var(--colors-blue-50);
  }
}

.polly-accordion__header:focus-visible {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: -4px;
  border-radius: var(--spacing-sm);
}

.polly-accordion__heading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xxs);
  flex-grow: 1;
}

.polly-accordion__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-md);
}

.polly-accordion__summary {
  padding: var(--spacing-md);
  color: var(--colors-text-icon-medium);
  font-size: var(--font-size-md);
  border-bottom-right-radius: var(--spacing-sm);
  border-bottom-left-radius: var(--spacing-sm);
  transition: all ease-in-out 100ms;
  transition-delay: 350ms;
}

.polly-accordion__icon {
  flex-shrink: 0;
  transition: transform 250ms ease-in-out;
}

.polly-accordion__content,
.polly-accordion__summary {
  padding: var(--spacing-sm);
}

.polly-accordion__content {
  border-bottom-right-radius: var(--spacing-sm);
  border-bottom-left-radius: var(--spacing-sm);
}

.polly-accordion--expanded .polly-accordion__header {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.polly-accordion--expanded .polly-accordion__summary {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.polly-accordion--secondary .polly-accordion__summary {
  padding: var(--spacing-md);
  background-color: var(--polly-accordion-background-color);
}

.polly-accordion--secondary .polly-accordion__content {
  padding: var(--spacing-md);
  background-color: var(--polly-accordion-background-color);
}

.polly-accordion--expanded .polly-accordion__header--secondary {
  --polly-accordion-background-color: var(--colors-blue-100);
  transition-delay: 0ms;
}

.polly-accordion--expanded .polly-accordion__summary {
  transition-delay: 0ms;
}

.polly-accordion[aria-disabled='true'] {
  cursor: default;
}

.polly-accordion[aria-disabled='true'] .polly-accordion__header {
  cursor: default;
}
</style>
