<template>
  <PLabel
    class="polly-textarea"
    :class="classes"
    :style="styles"
    v-bind="{
      label,
      labelPosition,
      disabled,
      required,
      message,
      state,
    }"
  >
    <p-input-base
      :disabled="disabled"
      :aria-required="required"
      :invalid="isInvalid"
      :highlighted="highlighted"
      v-bind="attrs"
    >
      <template
        v-if="slots.prefix"
        #prefix
      >
        <slot name="prefix" />
      </template>

      <template
        v-if="slots.suffix"
        #suffix
      >
        <slot name="suffix" />
      </template>

      <template #default="{ classes: baseClasses, attrs: baseAttrs }">
        <textarea
          ref="textarea"
          v-model="modelValue"
          class="polly-textarea__control"
          :aria-disabled="disabled"
          :class="baseClasses"
          :disabled="disabled"
          :aria-invalid="isInvalid"
          :placeholder="placeholder"
          v-bind="baseAttrs"
          @input="resizeTextarea"
          @focus="selectAllText"
        />
      </template>
    </p-input-base>

    <template #label>
      <slot name="label" />
    </template>

    <template #message>
      <slot name="message" />
    </template>
  </PLabel>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, toRefs, useTemplateRef, watch } from 'vue'

import { InputSlots, LabelSlots, TextareaEmits, TextareaProps } from '@/types'

import { useClassesStylesAndAttrs, useValidationState } from '@/composables'

const props = defineProps<TextareaProps>()
const slots = defineSlots<LabelSlots & InputSlots>()
const emit = defineEmits<TextareaEmits>()
const { attrs, classes, styles } = useClassesStylesAndAttrs()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value ?? null)
  },
})

function selectAllText(event: FocusEvent) {
  if (event.target instanceof HTMLTextAreaElement) {
    const target = event.target
    nextTick(() => {
      target.select()
    })
  }
}

const { state } = toRefs(props)
const { isInvalid } = useValidationState(state, modelValue)

const textarea = useTemplateRef<HTMLTextAreaElement>('textarea')

onMounted(() => {
  resizeTextarea()
})
watch(modelValue, () => {
  nextTick(() => resizeTextarea())
})

const heightLimit = 200
const heightMin = 23
function resizeTextarea() {
  if (!textarea.value) return
  textarea.value.style.height = '' /* Reset the height*/
  const calculatedHeight = Math.min(textarea.value.scrollHeight, heightLimit) - 32
  textarea.value.style.height = (calculatedHeight <= 0 ? heightMin : calculatedHeight) + 'px'
}
</script>

<style>
.polly-textarea .polly-input-base {
  border-radius: var(--border-radius-md);
  padding: 0;
  overflow: hidden;
}

.polly-textarea .polly-input-base__prefix,
.polly-textarea .polly-input-base__suffix {
  padding: var(--spacing-xs);
  align-self: flex-end;
}

.polly-textarea .polly-input-base__prefix {
  position: absolute;
  left: 0;
}

.polly-textarea .polly-input-base__suffix {
  position: absolute;
  right: 0;
}

.polly-textarea .polly-input-base__prefix + .polly-textarea__control {
  padding-left: var(--spacing-xxxl);
}

.polly-textarea .polly-textarea__control:has(+ .polly-input-base__suffix) {
  padding-right: var(--spacing-xxl);
}

.polly-textarea .polly-textarea__control {
  resize: none;
  padding: var(--spacing-xs);
  padding-inline: calc(var(--spacing-sm) + calc((1lh) - 1ex) / 2);
  overflow: auto;
  height: unset;
}
</style>
