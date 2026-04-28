<template>
  <component-demo-layout name="Input File">
    <section-header
      title="Basic Usage"
      description="A file input component with drag and drop support."
    />
    <component-example :code="basicExample">
      <p-input-file @change="basicFilesDropped">
        <template #message>
          <p>Accepted files include .TXT, .PDF, .DOC, .DOCX, .TIF, .JPG, .JPEG, .EMF, .XPT, .HTML</p>
        </template>
      </p-input-file>
    </component-example>

    <section-header
      title="Multiple Files"
      description="Allow users to select multiple files at once."
    />
    <component-example :code="multipleExample">
      <p-input-file
        multiple
        @change="multipleFilesDropped"
      >
        <template #message>
          <p>Select multiple files</p>
        </template>
      </p-input-file>
    </component-example>

    <section-header
      title="File Type Restrictions"
      description="Restrict file uploads to specific types."
    />
    <component-example :code="typeRestrictionsExample">
      <p-input-file
        :supported-types="['image/png']"
        @change="restrictedFilesDropped"
      >
        <template #message>
          <p>Only .png files are allowed</p>
        </template>
      </p-input-file>
    </component-example>

    <section-header
      title="Disabled State"
      description="File input can be disabled to prevent user interaction."
    />
    <component-example :code="disabledExample">
      <p-input-file disabled>
        <template #message>
          <p>This file input is disabled</p>
        </template>
      </p-input-file>
    </component-example>

    <section-header
      title="Advanced Configuration"
      description="Comprehensive file upload configuration with validation."
    />
    <component-example :code="advancedExample">
      <p-form>
        <p-toggle
          v-model="formValues.disabled"
          v-bind="fields.disabled"
          label="Disabled"
        />

        <p-toggle
          v-model="formValues.multiple"
          v-bind="fields.multiple"
          label="Multiple"
        />

        <p-select
          v-model="formValues.selectedTypeConstraint"
          v-bind="fields.selectedTypeConstraint"
          label="Supported Types"
          :options="typeConstraintOptions"
        />

        <p-input-number
          v-model="formValues.maxSize"
          v-bind="fields.maxSize"
          label="Max Size (in bytes)"
          :format="(value: number) => `${value.toLocaleString()} B`"
        />

        <p-input-number
          v-model="formValues.maxCount"
          v-bind="fields.maxCount"
          label="Max Files"
          :disabled="!formOutput.multiple"
        />
      </p-form>
      <p-input-file
        v-bind="{ supportedTypes, errors }"
        :disabled="formOutput.disabled"
        :multiple="formOutput.multiple"
        @change="filesDropped"
      >
        <template #message>
          <p>{{ message }}</p>
        </template>
      </p-input-file>

      <template
        v-for="file in files"
        :key="file.name"
      >
        <p-banner
          :title="file.name"
          icon="spinner"
          spin
        />
      </template>
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'

import * as v from 'valibot'

import { stringToNumberSchema } from '@/types'
import { SelectOption } from '@/types/select'

import { useValidation, useValidationFields } from '@/composables'

const files = reactive<File[]>([])
const errors = reactive<string[]>([])

const defaultValues = {
  disabled: false,
  multiple: false,
  maxSize: undefined,
  maxCount: '1',
  selectedTypeConstraint: 'any-file',
} as const

const supportedTypesMap = {
  'any-file': undefined,
  'only-png': ['image/png'] as string[],
  'any-image': /^image\/.+$/g,
  'as-function': (file: { type: string }) => {
    if (new Date().getSeconds() % 2) {
      return file.type.startsWith('image/')
    }

    return true
  },
} as const

const typeConstraintOptions: SelectOption<keyof typeof supportedTypesMap>[] = [
  { label: 'Anything', value: 'any-file' },
  { label: 'Only .png', value: 'only-png' },
  { label: 'Any Image', value: 'any-image' },
  { label: 'Depends on Time', value: 'as-function' },
]

const formValues = reactive({ ...defaultValues })

const formSchema = v.object({
  disabled: v.boolean(),
  multiple: v.boolean(),
  maxSize: v.optional(v.pipe(stringToNumberSchema(), v.minValue(1))),
  maxCount: v.pipe(stringToNumberSchema(), v.minValue(1)),
  selectedTypeConstraint: v.picklist(typeConstraintOptions.map((option) => option.value)),
})

const { validate, parse } = useValidation(formSchema)
const fields = useValidationFields(formSchema)

const formOutput = reactive({
  ...parse(defaultValues),
})

watch(formValues, (values) => {
  if (validate(values)) {
    Object.assign(formOutput, parse(values))
  }
})

const supportedTypes = computed(() => supportedTypesMap[formOutput.selectedTypeConstraint])

const message = computed(() => {
  switch (formOutput.selectedTypeConstraint) {
    case 'any-file':
      return 'Accepted files include .TXT, .PDF, .DOC, .DOCX, .TIF, .JPG, .JPEG, .EMF, .XPT, .HTML'
    case 'only-png':
      return 'Only .png files are allowed'
    case 'any-image':
      return 'Accepted files include .TIF, .JPG, .JPEG, .PNG, .GIF'
    case 'as-function':
      return 'If current time has even seconds, must be image, else anything.'
    default:
      return formOutput.selectedTypeConstraint satisfies never
  }
})

function filesDropped(dropped: File[]): void {
  errors.splice(0, errors.length)

  if (!checkFilesAreUnderMaxSize([...files, ...dropped])) {
    errors.push(`Exceeds max upload size ${formOutput.maxSize}B`)
    return
  }

  if (!checkFilesAreUnderMaxCount([...files, ...dropped])) {
    errors.push(`Exceeds max upload count ${formOutput.maxCount}`)
    return
  }

  // upload files here
  files.push(...dropped)
}

function checkFilesAreUnderMaxSize(files: File[]): boolean {
  if (formOutput.maxSize === undefined) {
    return true
  }

  const sum = files.reduce((sum, file) => sum + file.size, 0)
  return sum <= formOutput.maxSize
}

function checkFilesAreUnderMaxCount(files: File[]): boolean {
  if (formOutput.multiple === undefined) {
    return true
  }

  return files.length <= formOutput.maxCount
}

watch(files, () => {
  setTimeout(() => files.splice(0, files.length), 4000)
})

// Simple file handlers for examples
function basicFilesDropped(dropped: File[]): void {
  //eslint-disable-next-line no-console
  console.log('Basic files dropped:', dropped)
}

function multipleFilesDropped(dropped: File[]): void {
  //eslint-disable-next-line no-console
  console.log('Multiple files dropped:', dropped)
}

function restrictedFilesDropped(dropped: File[]): void {
  //eslint-disable-next-line no-console
  console.log('Restricted files dropped:', dropped)
}

// Code examples
const basicExample = {
  code: `<p-input-file @change="filesDropped">
  <template #message>
    <p>Accepted files include .TXT, .PDF, .DOC, .DOCX, .TIF, .JPG, .JPEG, .EMF, .XPT, .HTML</p>
  </template>
</p-input-file>`,
  language: 'vue-html',
}

const multipleExample = {
  code: `<p-input-file
  multiple
  @change="filesDropped"
>
  <template #message>
    <p>Select multiple files</p>
  </template>
</p-input-file>`,
  language: 'vue-html',
}

const typeRestrictionsExample = {
  code: `<p-input-file
  :supported-types="['image/png']"
  @change="filesDropped"
>
  <template #message>
    <p>Only .png files are allowed</p>
  </template>
</p-input-file>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-input-file disabled>
  <template #message>
    <p>This file input is disabled</p>
  </template>
</p-input-file>`,
  language: 'vue-html',
}

const advancedExample = {
  code: `<p-input-file
  :supported-types="supportedTypes"
  :errors="errors"
  :disabled="disabled"
  :multiple="multiple"
  @change="filesDropped"
>
  <template #message>
    <p>{{ message }}</p>
  </template>
</p-input-file>`,
  language: 'vue-html',
}
</script>
