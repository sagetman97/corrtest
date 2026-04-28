<template>
  <div
    class="polly-popover-content"
    :class="classes"
  >
    <template v-if="!!slots.header || !!slots.actions">
      <div class="polly-popover-content__header">
        <div class="polly-popover-content__heading">
          <slot name="header" />
        </div>

        <div
          v-if="!!slots.actions"
          class="polly-popover-content__actions"
        >
          <slot name="actions" />
        </div>
      </div>
    </template>

    <template v-if="!!slots.body">
      <div class="polly-popover-content__body">
        <slot name="body" />
      </div>
    </template>

    <template v-if="!!slots.footer">
      <div class="polly-popover-content__footer">
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const slots = defineSlots<{
  header?(): unknown
  actions?(): unknown
  body?(): unknown
  footer?(): unknown
}>()

const classes = computed(() => ({
  'polly-popover-content--no-header': !slots.header,
  'polly-popover-content--no-footer': !slots.footer,
}))
</script>

<style>
.polly-popover-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.polly-popover-content--no-header .polly-popover-content__body {
  padding-top: var(--spacing-md);
}

.polly-popover-content--no-footer .polly-popover-content__body {
  padding-bottom: var(--spacing-md);
}

.polly-popover-content__header {
  display: flex;
  position: sticky;
  top: 0;
  gap: var(--spacing-xs);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  letter-spacing: var(--letter-spacing-md);
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
}

.polly-popover-content__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.polly-popover-content__body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  padding-inline: var(--spacing-md);
}

.polly-popover-content__footer {
  display: flex;
  justify-content: center;
  padding: var(--spacing-md);
  gap: var(--spacing-xs);
}

@media screen and (max-width: 669px) {
  .polly-popover-content__footer,
  .polly-popover-content__header {
    justify-content: space-between;
  }
}
</style>
