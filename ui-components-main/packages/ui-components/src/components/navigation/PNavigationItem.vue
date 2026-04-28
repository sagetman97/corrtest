<template>
  <PButton
    class="polly-navigation-item"
    v-bind="buttonAttrs"
    :title="label"
    @click="() => emit('selected', props)"
  >
    <template v-if="!collapsed">
      <span class="polly-navigation-item__label--full">
        {{ label }}
      </span>
    </template>

    <template v-else-if="hasValue(collapsedLabel ?? label)">
      <span class="polly-navigation-item__label--collapsed">
        {{ collapsedLabel ?? label }}
      </span>
    </template>
  </PButton>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'

import { ButtonProps, isButtonProp, NavigationItemProps } from '@/types'

import { PButton } from '@/components/button'
import { useMobile } from '@/composables'
import { hasValue, splitProps } from '@/utilities'

const props = withDefaults(defineProps<NavigationItemProps>(), {
  text: true,
})

const emit = defineEmits<{
  selected: [value: NavigationItemProps]
}>()

const { isLaptopWidth } = useMobile()

const collapsed = computed(() => isLaptopWidth.value)

const buttonAttrs = ref<Partial<ButtonProps>>({})
watchEffect(() => {
  buttonAttrs.value = splitProps(props, isButtonProp)
})
</script>

<style>
.polly-navigation-item.polly-button {
  --polly-button-font-weight: var(--font-weight-medium);
  --polly-button-text-color: var(--colors-text-icon-light);
  border: none;
  padding: var(--spacing-sm);
  justify-content: start;
  transition: all 100ms ease-in-out;
}

.polly-navigation-item.polly-button .polly-button__contents {
  text-overflow: ellipsis;
  overflow: hidden;
}

@media (hover: hover) and (pointer: fine) {
  .polly-navigation-item.polly-button:hover {
    background-color: var(--colors-background-uncommon-nav-section-active);
    text-decoration: none;
    box-shadow: none;
    --polly-button-font-weight: var(--font-weight-semibold);
  }
}

.polly-navigation-item.polly-button:active {
  background-color: var(--colors-background-uncommon-nav-section-active);
}

.polly-navigation-item--collapsed .polly-button__icon {
  display: none;
}

.polly-navigation-item--collapsed .polly-button__contents {
  justify-content: center;
}

.polly-navigation-item.polly-button.router-link-active {
  --polly-button-background-color: var(--colors-background-uncommon-nav-subsection-active);
  --polly-button-text-color: var(--colors-text-icon-light);

  background-color: var(--colors-background-uncommon-nav-section-active);
  border-right: 3px solid var(--polly-navigation-subsection-color);
}

.polly-navigation-item__label--full {
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
}

.polly-navigation-item__label--collapsed {
  display: none;
}

@media screen and (min-width: 1024px) and (max-width: 1279px) {
  .polly-navigation-item.polly-button {
    justify-content: center;
    border-radius: 0;
    width: 100%;
  }

  .polly-navigation-item__label--full {
    display: none;
  }

  .polly-navigation-item__label--collapsed {
    text-wrap: balance;
    text-align: center;
    display: block;
  }
}

@media screen and (min-width: 1280px) {
  .polly-navigation-item__label--full {
    display: block;
  }

  .polly-navigation-item__label--collapsed {
    display: none;
  }
}
</style>
