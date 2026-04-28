<template>
  <form
    class="polly-form"
    @submit.prevent="submit"
  >
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { FormSlots } from '@/types'

const emit = defineEmits<{
  submit: [value: Event]
}>()

defineSlots<FormSlots>()

function submit(event: Event): void {
  emit('submit', event)
}
</script>

<style>
.polly-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-sm);
}
</style>
