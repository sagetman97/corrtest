<template>
  <label
    ref="containerElement"
    class="polly-input-file"
    :class="classes.container"
    :style="styles"
    :aria-disabled="disabled"
    :aria-invalid="isInvalid"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
    @dragover.prevent
    @drop.prevent="handleDrop"
  >
    <input
      ref="fileInput"
      type="file"
      class="polly-input-file__control"
      :aria-disabled="disabled"
      :aria-invalid="isInvalid"
      :disabled="disabled"
      :multiple="multiple"
      :accept="nativeAccepts"
      v-bind="attrs"
      @change="filesPicked"
    />

    <slot>
      <slot name="icon">
        <p-icon
          size="2x"
          family="duotone"
          icon="cloud-arrow-up"
        />
      </slot>

      <slot name="label">
        <div class="polly-input-file__label">
          <span class="polly-input-file__label-heading">
            {{ props.label ?? `Select ${plural} or drag and drop here` }}
          </span>

          <slot name="message">
            <div class="polly-input-file__message">
              {{ props.message }}
            </div>
          </slot>
        </div>
      </slot>

      <p-button
        class="polly-input-file__select-button"
        :disabled="disabled"
      >
        Select {{ plural }}
      </p-button>
    </slot>

    <template
      v-for="(error, index) in errors"
      :key="`${error}-${index}`"
    >
      <p-banner
        :title="error"
        variant="error"
        size="sm"
      />
    </template>
  </label>
</template>

<script lang="ts" setup>
import { computed, ref, useTemplateRef } from 'vue'

import { InputFileEmits, InputFileProps, InputFileSlots } from '@/types/inputFile'
import { ValidationState } from '@/types/validation'

import { useClassesStylesAndAttrs, useValidationState } from '@/composables'
import { asArray } from '@/utilities'

const fileInput = useTemplateRef<HTMLInputElement>('fileInput')
const submittedInvalidFileTypeError = ref(false)
const errors = computed(() => {
  const value = props.errors ?? []

  if (submittedInvalidFileTypeError.value) {
    return ['Format type not supported', ...value]
  }

  return value
})

const props = defineProps<InputFileProps>()

const emit = defineEmits<InputFileEmits>()

defineSlots<InputFileSlots>()

defineOptions({ inheritAttrs: false })

const plural = computed(() => (props.multiple ? 'files' : 'file'))

const state = computed<ValidationState>(() => props.state ?? (errors.value.length > 0 ? 'errored' : 'normal'))

const { isInvalid } = useValidationState(state)
const { attrs, classes: inheritedClasses, styles } = useClassesStylesAndAttrs()

const nativeAccepts = computed(() => {
  if (Array.isArray(props.supportedTypes)) {
    return props.supportedTypes.join(',')
  }

  return undefined
})

const containerElement = useTemplateRef<HTMLLabelElement>('containerElement')
const pendingFileState = ref<'valid' | 'invalid' | undefined>()

const classes = computed(() => ({
  container: {
    'polly-input-file--dragging': pendingFileState.value !== undefined,
    'polly-input-file--valid': pendingFileState.value === 'valid',
    'polly-input-file--invalid': pendingFileState.value === 'invalid',
    ...asArray(inheritedClasses.value),
  },
}))

function handleDragEnter(event: DragEvent): void {
  const sentFilesTypes = Array.from(event.dataTransfer?.items ?? [])
    .map((item) => (item.kind === 'file' ? { type: item.type } : null))
    .filter((item) => {
      return item !== null
    }) as { type: string }[]

  if (!filesSatisfySupportedTypes(sentFilesTypes)) {
    pendingFileState.value = 'invalid'
    return
  }

  pendingFileState.value = 'valid'
}

function handleDragLeave(): void {
  pendingFileState.value = undefined
}

function handleDrop(event: DragEvent): void {
  const droppedFiles = Array.from(event.dataTransfer?.files ?? [])

  submitFiles(droppedFiles)
}

function filesPicked(): void {
  if (!fileInput.value) return

  const files = Array.from(fileInput.value.files ?? [])
  submitFiles(files)

  fileInput.value.value = ''
}

function submitFiles(files: File[]): void {
  pendingFileState.value = undefined
  submittedInvalidFileTypeError.value = false

  const supportedFiles = files.filter(fileSatisfySupportedTypes)
  const hasSomeInvalidFiles = supportedFiles.length !== files.length

  if (hasSomeInvalidFiles) {
    submittedInvalidFileTypeError.value = true
    return
  }

  emit('change', supportedFiles)
}

function filesSatisfySupportedTypes(files: { type: string }[]): boolean {
  return files.every(fileSatisfySupportedTypes)
}

function fileSatisfySupportedTypes(file: { type: string }): boolean {
  const { supportedTypes } = props

  if (supportedTypes === undefined) {
    return true
  }

  if (typeof supportedTypes === 'function') {
    return supportedTypes(file)
  }

  if (Array.isArray(supportedTypes)) {
    return supportedTypes.includes(file.type)
  }

  return new RegExp(supportedTypes).test(file.type)
}
</script>

<style>
.polly-input-file {
  --polly-input-file-background-color: var(--colors-background-common-ultra-light-neutral);
  --polly-input-file-border-color: var(--colors-background-common-default-grey);

  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  align-items: center;
  padding: var(--spacing-xxxl) var(--spacing-base);
  border-radius: var(--border-radius-md);
  border: 1px dashed var(--polly-input-file-border-color);
  background-color: var(--polly-input-file-background-color);
  transition:
    background-color 100ms ease-in-out,
    border-color 100ms ease-in-out;
}

.polly-input-file--valid {
  --polly-input-file-background-color: var(--colors-background-status-success-light);
  --polly-input-file-border-color: var(--colors-border-status-success-dark);
}

.polly-input-file--invalid {
  --polly-input-file-background-color: var(--colors-background-status-error-light);
  --polly-input-file-border-color: var(--colors-border-status-error-dark);
}

.polly-input-file--dragging * {
  pointer-events: none;
}

.polly-input-file[aria-disabled='true'] {
  cursor: not-allowed;
  color: var(--colors-text-icon-primary-unavailable);
}

.polly-input-file__label {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-xs);
}

.polly-input-file__label-heading {
  font-weight: var(--font-weight-bold);
}

.polly-input-file__control {
  display: none;
}

.polly-input-file__select-button {
  pointer-events: none;
}
</style>
