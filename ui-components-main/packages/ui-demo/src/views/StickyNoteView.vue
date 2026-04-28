<template>
  <component-demo-layout name="Sticky Note">
    <section-header
      title="Basic Usage"
      description="A simple sticky note component for displaying messages."
    />
    <component-example :code="basicExample">
      <p-sticky-note
        message="This is a basic sticky note message."
        @save="handleSave"
      />
    </component-example>

    <section-header
      title="With Author Context"
      description="Include author information and date context."
    />
    <component-example :code="contextExample">
      <p-sticky-note
        message="Here is a note with author context and date information."
        :context="{
          author: 'Polly Appleseed',
          date: new Date(),
        }"
        @save="handleSave"
      />
    </component-example>

    <section-header
      title="Disabled State"
      description="Sticky note can be disabled to hide edit actions."
    />
    <component-example :code="disabledExample">
      <p-sticky-note
        message="This sticky note is disabled and cannot be edited."
        disabled
        @save="handleSave"
      />
    </component-example>

    <section-header
      title="Interactive Example"
      description="Sticky note with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form class="sticky-note-view__form">
        <p-textarea
          v-model="message"
          label="Message"
          :rows="6"
        />

        <p-toggle
          v-model="disabled"
          label="Disabled (hide actions)"
        />

        <p-toggle
          v-model="showContext"
          label="Include Context"
        />

        <p-input
          v-model="context.author"
          :disabled="!showContext"
          class="sticky-note-view__author-input"
          label="Author"
        />

        <p-date-picker
          v-model="context.date"
          :disabled="!showContext"
          label="Date"
        />
      </p-form>
      <p-sticky-note
        v-bind="{ message, disabled, context: contextIfIncluded }"
        @save="message = $event"
      />
    </component-example>
  </component-demo-layout>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'

const message = ref<string | undefined>('Here is a note for the Loan Officer, a reminder to upload all documents by end of day.')
const disabled = ref(false)
const showContext = ref(true)
const context = reactive({
  author: 'Polly Appleseed',
  date: new Date(),
})

const contextIfIncluded = computed(() => {
  if (!showContext.value) {
    return undefined
  }

  return context
})

// Event handlers
const handleSave = (newMessage?: string) => {
  // eslint-disable-next-line no-console
  console.log('Sticky note saved:', newMessage)
}

// Code examples
const basicExample = {
  code: `<p-sticky-note
  message="This is a basic sticky note message."
  @save="handleSave"
/>`,
  language: 'vue-html',
}

const contextExample = {
  code: `<p-sticky-note
  message="Here is a note with author context and date information."
  :context="{
    author: 'Polly Appleseed',
    date: new Date()
  }"
  @save="handleSave"
/>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-sticky-note
  message="This sticky note is disabled and cannot be edited."
  disabled
  @save="handleSave"
/>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-sticky-note
  :message="message"
  :disabled="disabled"
  :context="contextIfIncluded"
  @save="message = $event"
/>`,
  language: 'vue-html',
}
</script>

<style>
.sticky-note-view__form {
  width: 100%;
  align-items: stretch;
}

.sticky-note-view__author-input {
  width: 240px;
}
</style>
