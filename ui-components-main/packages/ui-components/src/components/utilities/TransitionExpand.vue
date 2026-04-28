<template>
  <div
    class="polly-transition-expand"
    :class="{ 'polly-transition-expand--open': open }"
    data-testid="polly-transition-expand-container"
  >
    <div class="polly-transition-expand__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  open: Boolean,
})
</script>
<style>
.polly-transition-expand {
  display: grid;
  overflow: hidden;
  grid-template-rows: 0fr;
  transition: all 250ms ease-in-out;
}

.polly-transition-expand--open {
  grid-template-rows: 1fr;
}

.polly-transition-expand__content {
  align-self: flex-start;
  overflow: hidden;
}
</style>
