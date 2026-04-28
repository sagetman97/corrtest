<template>
  <div class="polly-option-label">
    <div class="polly-option-label__label">
      <span>{{ label }}</span>
    </div>
    <div
      v-if="subLabel"
      class="polly-option-label__sub-label"
    >
      {{ subLabel }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
  subLabel?: string
}>()
</script>

<style>
.polly-option-label {
  display: inline-flex;
  flex-direction: column;
}

.polly-option-label__label {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-md);
}

.polly-option-label__sub-label {
  color: var(--colors-text-icon-medium);
  font-size: var(--font-size-sm);
  letter-spacing: var(--letter-spacing-sm);
}
</style>
