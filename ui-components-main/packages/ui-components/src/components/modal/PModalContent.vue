<template>
  <div
    class="polly-modal-content"
    :class="[`polly-modal-content--${variant}`]"
  >
    <div class="polly-modal-content__header">
      <h2 class="polly-modal-content__title">
        <slot name="back" />
        <slot name="title" />
      </h2>
      <div
        v-if="!!slots.actions"
        class="polly-modal-content__actions"
      >
        <slot name="actions" />
      </div>
      <div
        v-if="!!slots.subtitle"
        class="polly-modal-content__subtitle"
      >
        <slot name="subtitle" />
      </div>
    </div>

    <template v-if="!!slots.body">
      <div class="polly-modal-content__body">
        <slot name="body" />
      </div>
    </template>

    <template v-if="!!slots.footer">
      <div class="polly-modal-content__footer">
        <slot name="footer" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { variant = 'default' } = defineProps<{
  variant?: 'default' | 'ai'
}>()

const slots = defineSlots<{
  back?(): unknown
  title?(): unknown
  actions?(): unknown
  body?(): unknown
  footer?(): unknown
  subtitle?(): unknown
}>()
</script>

<style>
.polly-modal-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.polly-modal-content__header {
  display: grid;
  grid-template-areas:
    'title actions'
    'title actions';
  background-color: var(--colors-background-common-white);
  padding: var(--spacing-md);
  row-gap: var(--spacing-xs);
  column-gap: var(--spacing-sm);
}

.polly-modal-content__header:has(> .polly-modal-content__subtitle) {
  grid-template-areas:
    'title actions'
    'subtitle actions';
}

.polly-modal-content__title {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: var(--spacing-xxs);
  grid-area: title;
}

.polly-modal-content__subtitle {
  grid-area: subtitle;
  color: var(--colors-text-icon-medium);
}

.polly-modal-content__actions {
  grid-area: actions;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap-reverse;
  justify-content: flex-end;
  column-gap: var(--spacing-xs);
}

.polly-modal-content__header + .polly-modal-content__body {
  padding-top: 0;
}

.polly-modal-content__body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: var(--spacing-xs);
  overflow: auto;
  padding: var(--spacing-md);
}

.polly-modal-content--ai .polly-modal-content__body {
  padding-bottom: var(--spacing-md);
}

.polly-modal-content__footer {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  position: sticky;
  bottom: 0;
  flex-shrink: 0;
  padding: var(--spacing-sm);
  background-color: var(--colors-background-common-white);
  box-shadow: var(--shadow-up);
}

@media screen and (max-width: 669px) {
  .polly-modal-content__footer,
  .polly-modal-content__header {
    justify-content: space-between;
  }
  .polly-modal-content__footer {
    flex-direction: column;
    align-items: stretch;
  }

  .polly-modal-content--ai {
    height: 85vh;
  }
}

.polly-modal-content--ai .polly-modal-content__footer {
  box-shadow: 0px -4px 8px 0px var(--colors-border-box-shadow);
}
</style>
