<template>
  <p-button
    class="polly-calendar-date-button"
    :class="classes"
    :variant="variant"
    :text="!showSelected"
    size="md"
    round
  >
    <slot />
    <template v-if="showMark">
      <span class="polly-calendar-date-button__mark" />
    </template>
  </p-button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  showSelected?: boolean
  isToday?: boolean
  showMark?: boolean
  showOutOfMonth?: boolean
}>()

const classes = computed(() => ({
  'polly-calendar-date-button--selected': props.showSelected,
  'polly-calendar-date-button--today': props.isToday,
  'polly-calendar-date-button--out-of-month': props.showOutOfMonth,
}))

const variant = computed(() => (props.showSelected ? 'accent' : 'primary'))
</script>

<style>
.polly-calendar-date-button {
  --polly-calendar-date-button-mark-color: var(--colors-background-common-accent);
}

@media (hover: hover) and (pointer: fine) {
  .polly-calendar-date-button:hover {
    box-shadow: none;
    background-color: var(--colors-background-common-accent-light);
    border-color: var(--colors-background-common-accent);
  }

  .polly-calendar-date-button--selected:hover {
    background-color: var(--colors-background-common-accent-dark);
    border-color: var(--colors-background-common-accent-dark);
  }
}

.polly-calendar-date-button--out-of-month {
  color: var(--colors-text-icon-medium);
}

.polly-calendar-date-button--selected {
  color: var(--colors-text-icon-light);
}

.polly-calendar-date-button[aria-disabled='true'] {
  --polly-calendar-date-button-mark-color: var(--colors-text-icon-dark-unavailable);

  color: var(--colors-text-icon-light-unavailable);
  border-color: var(--colors-background-common-white);
  background-color: var(--colors-background-common-white);
}

.polly-calendar-date-button--today {
  border-color: var(--colors-border-common-default);
}

.polly-calendar-date-button__mark {
  height: 4px;
  width: 4px;
  border-radius: 100%;
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--polly-calendar-date-button-mark-color);
}
</style>
