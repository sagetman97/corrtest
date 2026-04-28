<!-- eslint-disable no-useless-escape -->
<template>
  <component-demo-layout name="Input Text">
    <section-header
      title="Basic Usage"
      description="A simple text input component."
    />
    <component-example :code="basicExample">
      <p-input
        v-model="basicValue"
        label="Basic Text Input"
        placeholder="Enter text here..."
      />
    </component-example>

    <section-header
      title="Prefix and Suffix"
      description="Add text before or after the input value."
    />
    <component-example :code="prefixSuffixExample">
      <p-input
        v-model="prefixValue"
        label="Price Input"
        prefix="$"
        suffix=".00"
        placeholder="0"
      />
    </component-example>

    <section-header
      title="Icon Prefix and Suffix"
      description="Use icons as prefix or suffix elements."
    />
    <component-example :code="iconExample">
      <p-input
        v-model="iconValue"
        label="Search Input"
        placeholder="Search..."
      >
        <template #prefix>
          <p-icon icon="magnifying-glass" />
        </template>
        <template #suffix>
          <p-icon icon="xmark" />
        </template>
      </p-input>
    </component-example>

    <section-header
      title="Highlighted State"
      description="Highlight the input to draw attention."
    />
    <component-example :code="highlightedExample">
      <p-input
        v-model="highlightedValue"
        label="Highlighted Input"
        placeholder="This input is highlighted"
        highlighted
      />
    </component-example>

    <section-header
      title="Disabled State"
      description="Input can be disabled to prevent user interaction."
    />
    <component-example :code="disabledExample">
      <p-input
        v-model="disabledValue"
        label="Disabled Input"
        placeholder="Cannot edit this"
        disabled
      />
    </component-example>

    <section-header
      title="Simple Variant"
      description="A simplified input style with minimal borders."
    />
    <component-example :code="simpleExample">
      <p-input
        v-model="simpleValue"
        label="Simple Variant Input"
        placeholder="Enter text..."
        variant="simple"
      />
      <p-input
        v-model="simpleHighlightedValue"
        label="Simple Variant Highlighted"
        placeholder="Highlighted simple input"
        variant="simple"
        highlighted
      />
    </component-example>

    <section-header
      title="AI Highlighted State"
      description="Inputs can be highlighted with AI-specific styling using the aiHighlighted injection."
    />
    <component-example :code="aiHighlightedExample">
      <ai-highlight-provider :enabled="enableAIHighlight">
        <p-form>
          <p-toggle
            v-model="enableAIHighlight"
            label="Enable AI Highlight"
          />
          <p-input
            v-model="aiHighlightedValue"
            label="Default Variant"
            placeholder="AI highlighted input"
          />
          <p-input
            v-model="aiHighlightedSimpleValue"
            label="Simple Variant"
            placeholder="AI highlighted simple input"
            variant="simple"
          />
        </p-form>
      </ai-highlight-provider>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Text input with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form class="input-view__interactive-controls">
        <p-toggle
          v-model="disabled"
          label="Disabled"
        />
        <p-toggle
          v-model="highlighted"
          label="Highlighted"
        />
        <p-toggle
          v-model="required"
          label="Required"
        />
        <p-toggle
          v-model="useIcons"
          label="Use Icon Prefix/Suffix"
        />
        <p-toggle
          v-model="enableInteractiveAI"
          label="AI Highlighted"
        />
        <p-select
          v-model="variant"
          label="Variant"
          :options="variantOptions"
        />
        <p-select
          v-model="labelPosition"
          label="Label Position"
          :options="labelPositionOptions"
        />
        <p-select
          v-model="state"
          label="State"
          :options="stateOptions"
        />
        <p-input
          v-model="label"
          label="Label"
        />
        <p-input
          v-model="message"
          label="Message"
        />
        <p-input
          v-model="placeholder"
          label="Placeholder"
        />
        <p-input
          v-model="prefix"
          label="Prefix"
        />
        <p-input
          v-model="suffix"
          label="Suffix"
        />
      </p-form>
      <ai-highlight-provider :enabled="enableInteractiveAI">
        <p-input
          v-model="value"
          v-bind="{ disabled, prefix, suffix, placeholder, highlighted, variant, labelPosition, state, message, required }"
          :label="label"
        >
          <template
            v-if="useIcons"
            #prefix
          >
            <p-icon :icon="prefix" />
          </template>
          <template
            v-if="useIcons"
            #suffix
          >
            <p-icon :icon="suffix" />
          </template>
        </p-input>
      </ai-highlight-provider>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { defineComponent, h, provide, ref, toRef } from 'vue'

import type { LabelPosition, ValidationState } from '@/types'

const AiHighlightProvider = defineComponent({
  name: 'AiHighlightProvider',
  props: {
    enabled: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { slots }) {
    const aiHighlighted = toRef(props, 'enabled')

    provide('aiHighlighted', aiHighlighted)
    provide('clearAiHighlight', () => {})

    return () => h('div', slots.default?.())
  },
})

// Example values
const basicValue = ref<string>()
const prefixValue = ref<string>()
const iconValue = ref<string>()
const highlightedValue = ref<string>()
const disabledValue = ref<string>('Cannot edit')
const simpleValue = ref<string>()
const simpleHighlightedValue = ref<string>()

// AI Highlight example
const enableAIHighlight = ref(false)
const aiHighlightedValue = ref<string>()
const aiHighlightedSimpleValue = ref<string>()

// Interactive example
const value = ref<string>()
const disabled = ref(false)
const highlighted = ref(false)
const required = ref(false)
const useIcons = ref(false)
const enableInteractiveAI = ref(false)
const prefix = ref<string>('$')
const suffix = ref<string>('.00')
const placeholder = ref<string>('Enter text...')
const label = ref<string>('Interactive Text Input')
const message = ref<string>('')
const variant = ref<'default' | 'simple'>('default')
const labelPosition = ref<LabelPosition>('top')
const state = ref<ValidationState>('normal')

const variantOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Simple', value: 'simple' },
]

const labelPositionOptions = [
  { label: 'Top', value: 'top' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
]

const stateOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'errored' },
]

// Code examples
const basicExample = {
  code: `<p-input
  v-model="value"
  label="Basic Text Input"
  placeholder="Enter text here..."
/>`,
  language: 'vue-html',
}

const prefixSuffixExample = {
  code: `<p-input
  v-model="value"
  label="Price Input"
  prefix="$"
  suffix=".00"
  placeholder="0"
/>`,
  language: 'vue-html',
}

const iconExample = {
  code: `<p-input
  v-model="value"
  label="Search Input"
  placeholder="Search..."
>
  <template #prefix>
    <p-icon icon="magnifying-glass" />
  </template>
  <template #suffix>
    <p-icon icon="xmark" />
  </template>
</p-input>`,
  language: 'vue-html',
}

const highlightedExample = {
  code: `<p-input
  v-model="value"
  label="Highlighted Input"
  placeholder="This input is highlighted"
  highlighted
/>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-input
  v-model="value"
  label="Disabled Input"
  placeholder="Cannot edit this"
  disabled
/>`,
  language: 'vue-html',
}

const simpleExample = {
  code: `<p-input
  v-model="value"
  label="Simple Variant Input"
  placeholder="Enter text..."
  variant="simple"
/>

<p-input
  v-model="value"
  label="Simple Variant Highlighted"
  placeholder="Highlighted simple input"
  variant="simple"
  highlighted
/>`,
  language: 'vue-html',
}

const aiHighlightedExample = [
  {
    code: `import { defineComponent, h, provide, ref, toRef } from 'vue'

const AiHighlightProvider = defineComponent({
  name: 'AiHighlightProvider',
  props: {
    enabled: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { slots }) {
    const aiHighlighted = toRef(props, 'enabled')

    provide('aiHighlighted', aiHighlighted)
    provide('clearAiHighlight', () => {})

    return () => h('div', slots.default?.())
  },
})

const enableAIHighlight = ref(false)`,
    language: 'typescript',
  },
  {
    code: `<ai-highlight-provider :enabled="enableAIHighlight">
  <p-form>
    <p-toggle
      v-model="enableAIHighlight"
      label="Enable AI Highlight"
    />
    <p-input
      v-model="value"
      label="Default Variant"
      placeholder="AI highlighted input"
    />
    <p-input
      v-model="value"
      label="Simple Variant"
      placeholder="AI highlighted simple input"
      variant="simple"
    />
  </p-form>
</ai-highlight-provider>`,
    language: 'vue-html',
  },
]

const interactiveExample = [
  {
    code: `import { defineComponent, h, provide, ref, toRef } from 'vue'

const AiHighlightProvider = defineComponent({
  name: 'AiHighlightProvider',
  props: {
    enabled: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { slots }) {
    const aiHighlighted = toRef(props, 'enabled')

    provide('aiHighlighted', aiHighlighted)
    provide('clearAiHighlight', () => {})

    return () => h('div', slots.default?.())
  },
})

const enableInteractiveAI = ref(false)`,
    language: 'typescript',
  },
  {
    code: `<!-- Control inputs are NOT wrapped, so they won't be AI highlighted -->
<p-form>
  <p-toggle
    v-model="enableInteractiveAI"
    label="AI Highlighted"
  />
  <!-- other controls... -->
</p-form>

<!-- Only wrap the demo input to scope AI highlighting -->
<ai-highlight-provider :enabled="enableInteractiveAI">
  <p-input
    v-model="value"
    :label="label"
    :message="message"
    :state="state"
    :label-position="labelPosition"
    :variant="variant"
    :placeholder="placeholder"
    :prefix="prefix"
    :suffix="suffix"
    :disabled="disabled"
    :highlighted="highlighted"
    :required="required"
  >
    <template v-if="useIcons" #prefix>
      <p-icon :icon="prefix" />
    </template>
    <template v-if="useIcons" #suffix>
      <p-icon :icon="suffix" />
    </template>
  </p-input>
</ai-highlight-provider>`,
    language: 'vue-html',
  },
]
</script>

<style>
.input-view__interactive-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}
</style>
