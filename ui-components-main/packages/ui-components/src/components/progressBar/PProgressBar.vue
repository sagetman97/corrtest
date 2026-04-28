<template>
  <div class="polly-progress-bar">
    <progress
      class="polly-progress-bar__progress-bar"
      :value="progressValue"
      :max="max"
    />
    <template v-if="showPercentage">
      <div class="polly-progress-bar__percentage">{{ progressValue }}%</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { ProgressBarProps } from '@/types'

const { max = 100, value, showPercentage } = defineProps<ProgressBarProps>()

const progressValue = computed(() => Math.max(1, value))

const backgroundPosition = computed(() => `0 ${100 - value}%`)
</script>

<style>
.polly-progress-bar {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;
  --polly-progress-bar-background-color: var(--colors-background-common-default-grey);
}

.polly-progress-bar__progress-bar {
  width: 100%;
  min-width: 130px;
}

.polly-progress-bar__percentage {
  flex-shrink: 0;
  text-align: right;
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--colors-border-common-default);
  padding: var(--spacing-xxs) var(--spacing-xs);
  width: 3em;
  border-radius: var(--spacing-xxs);
  font-size: var(--font-size-sm);
}

.polly-progress-bar__progress-bar[value],
.polly-progress-bar__progress-bar[value]::-webkit-progress-bar,
.polly-progress-bar__progress-bar::-webkit-progress-bar {
  height: 4px;
  border-radius: var(--spacing-xxs);
  background-color: var(--polly-progress-bar-background-color);
}

.polly-progress-bar__progress-bar::-moz-progress-bar {
  border-radius: var(--spacing-xxs);
  background: linear-gradient(var(--colors-status-success-darker), var(--colors-status-success-lighter));
  background-size: 100% 1000%;
  background-position: v-bind(backgroundPosition);
  transition: all 300ms ease;
}

.polly-progress-bar__progress-bar[value]::-webkit-progress-value {
  border-radius: var(--spacing-xxs);
  background: linear-gradient(var(--colors-status-success-darker), var(--colors-status-success-lighter));
  background-size: 100% 1000%;
  background-position: v-bind(backgroundPosition);
  transition: all 300ms ease;
}

.polly-progress-bar__progress-bar::-moz-progress-bar {
  border-radius: var(--spacing-xxs);
  background-color: var(--polly-progress-bar-foreground-color);
  transition: all 300ms ease;
}
</style>
