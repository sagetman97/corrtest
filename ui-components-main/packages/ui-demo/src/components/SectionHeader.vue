<template>
  <div class="section-header">
    <a
      :id="sectionId"
      class="section-header__link"
      :href="`#${sectionId}`"
    >
      <h2 class="section-header__title">
        {{ title }}
      </h2>
      <p-icon
        icon="hashtag"
        fa-style="solid"
        class="section-header__icon"
      />
    </a>
    <p
      v-if="description"
      class="section-header__description"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  description?: string
}>()

const sectionId = computed(() => props.title.trim().toLowerCase().replace(/ +/g, '-'))
</script>

<style>
.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xxl);
}

.section-header__link {
  scroll-margin: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  text-decoration: none;
  color: var(--colors-text-icon-dark);
}

.section-header:hover .section-header__icon {
  opacity: 1;
}

.section-header__icon {
  transition: opacity 100ms ease-in-out;
  color: var(--colors-text-icon-dark);
  opacity: 0;
}

.section-header__description {
  font-size: var(--font-size-md);
  color: var(--colors-text-icon-medium);
  font-weight: var(--font-weight-medium);
}

@media screen and (max-width: 1023px) {
  .section-header__link {
    scroll-margin: calc(var(--spacing-lg) + var(--polly-navigation-bar-height));
  }
}
</style>
