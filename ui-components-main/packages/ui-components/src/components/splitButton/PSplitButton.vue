<template>
  <div
    class="polly-split-button"
    :class="[...asArray(classes), { 'polly-split-button--loading': isLoading }]"
    :style="styles"
  >
    <span ref="targetElement">
      <slot
        name="target"
        v-bind="{ toggle, isOpen }"
      >
        <p-button
          v-bind="buttonAttrs"
          :icon="buttonIcon"
          icon-position="right"
          :icon-classes="iconClasses"
          :is-loading="isLoading"
          class="polly-split-button__button"
          aria-haspopup="listbox"
          :aria-expanded="isOpen"
          @click="toggle"
        >
          <span class="polly-split-button__content">
            <span class="polly-split-button__label">
              <slot v-bind="slotProps" />
            </span>
            <div class="polly-split-button__split" />
          </span>
        </p-button>
      </slot>
    </span>

    <POptions
      v-model:is-open="isOpen"
      :model-value="null as T"
      :options="options"
      :disabled="disabled"
      :multiple="multiple"
      :show-input-icons="showInputIcons"
      :position="position"
      :target-element="buttonElement"
      :combobox-element="buttonElement"
      required
      @update:model-value="handleSelect"
    >
      <template #icon="scope">
        <slot
          name="optionIcon"
          v-bind="scope"
        />
      </template>

      <template #option="scope">
        <slot
          name="option"
          v-bind="scope"
        />
      </template>

      <template #label="scope">
        <slot
          name="label"
          v-bind="scope"
        />
      </template>

      <template #emptyOptions>
        <slot name="emptyOptions" />
      </template>
    </POptions>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, ref, useTemplateRef, watchEffect } from 'vue'

import { ButtonProps, isButtonProp, PopoverPositionMethod, SplitButtonEmits, SplitButtonProps, SplitButtonSlots } from '@/types'

import { POptions } from '@/components/select'
import { useClassesStylesAndAttrs } from '@/composables'
import { useBoolean } from '@/composables/useBoolean'
import { asArray, autoPosition, splitProps } from '@/utilities'

const props = withDefaults(defineProps<SplitButtonProps<T>>(), {
  variant: 'primary',
  size: 'md',
  family: 'duotone',
  faStyle: 'solid',
  position: 'right',
})

defineSlots<SplitButtonSlots<T>>()

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits<SplitButtonEmits<T>>()

const { classes, styles } = useClassesStylesAndAttrs()
const targetElement = useTemplateRef<HTMLSpanElement>('targetElement')
const buttonElement = computed(() => targetElement.value?.querySelector('button') ?? undefined)
const buttonAttrs = ref<Partial<ButtonProps>>({})
const { state: isOpen, toggle } = useBoolean()

const slotProps = computed(() => ({
  value: null as T | T[],
  displayValue: '',
}))

watchEffect(() => {
  buttonAttrs.value = splitProps(props, isButtonProp)
})

const position = computed<PopoverPositionMethod>(() => (__, contentElement) => {
  const target = targetElement.value?.parentElement
  if (!target) {
    return
  }

  return autoPosition(props.position)(target, contentElement)
})

const iconClasses = computed(() => {
  return {
    'p-rotate-180': isOpen.value,
  }
})

function handleSelect(value: T | (T | undefined)[] | undefined) {
  if (!value || Array.isArray(value)) {
    return
  }

  emit('selected', value)
}

const buttonIcon = computed(() => {
  return props.icon ?? 'chevron-circle-down'
})
</script>

<style>
.polly-split-button {
  display: inline-flex;
}

.polly-split-button__content {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  align-items: center;
}

.polly-split-button__split {
  border-right: 1px solid var(--colors-text-icon-light);
  align-self: stretch;
  margin-block: var(--spacing-xxs);
  border-radius: 2px;
}

.polly-split-button__button[aria-activedescendant] {
  outline: 2px solid var(--colors-old-brand-yellow-500);
  outline-offset: 2px;
}
</style>
