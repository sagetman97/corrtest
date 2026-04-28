<template>
  <div class="modal-view">
    <component-demo-layout name="Modal">
      <section-header
        title="Basic Usage"
        description="A simple modal dialog for displaying content in an overlay."
      />
      <component-example :code="basicExample">
        <p-button @click="basicOpen = true">Open Basic Modal</p-button>
        <p-modal
          v-model:is-open="basicOpen"
          title="Basic Modal"
        >
          <p>This is a basic modal with simple content.</p>
          <div style="display: flex; flex-direction: column; gap: 1rem">
            <p-button @click="showMore = !showMore">show more</p-button>
            <p-button>a button</p-button>
            <p-button>a button</p-button>
            <p-button>a button</p-button>
            <p-button>a button</p-button>

            <div
              v-if="showMore"
              style="display: flex; flex-direction: column; gap: 1rem"
            >
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
              <p-button>a button</p-button>
            </div>
          </div>
        </p-modal>
      </component-example>

      <section-header
        title="Modal with Actions"
        description="Add action buttons to the modal header."
      />
      <component-example :code="actionsExample">
        <p-button @click="actionsOpen = true">Open Modal with Actions</p-button>
        <p-modal
          v-model:is-open="actionsOpen"
          title="Modal with Actions"
          subtitle="This modal has action buttons"
        >
          <p>Modal content with action buttons in the header.</p>
          <template #actions>
            <p-button
              icon="search"
              outline
              round
            />
            <p-button
              icon="save"
              outline
              round
            />
          </template>
        </p-modal>
      </component-example>

      <section-header
        title="Modal Sizes"
        description="Different size options for the modal."
      />
      <component-example :code="sizesExample">
        <p-button @click="xsOpen = true">Extra Small (xs)</p-button>
        <p-button @click="smallOpen = true">Small</p-button>
        <p-button @click="defaultSizeOpen = true">Default</p-button>
        <p-button @click="largeOpen = true">Large</p-button>
        <p-button @click="xlOpen = true">Extra Large (xl)</p-button>
        <p-button @click="fullOpen = true">Full</p-button>

        <p-modal
          v-model:is-open="xsOpen"
          title="Extra Small Modal"
          size="xs"
        >
          <p>This is an extra small modal (25rem width).</p>
        </p-modal>

        <p-modal
          v-model:is-open="smallOpen"
          title="Small Modal"
          size="small"
        >
          <p>This is a small modal (30rem width).</p>
        </p-modal>

        <p-modal
          v-model:is-open="defaultSizeOpen"
          title="Default Modal"
          size="default"
        >
          <p>This is a default sized modal (40rem width).</p>
        </p-modal>

        <p-modal
          v-model:is-open="largeOpen"
          title="Large Modal"
          size="large"
        >
          <p>This is a large modal (50rem width). Perfect for forms or detailed content.</p>
        </p-modal>

        <p-modal
          v-model:is-open="xlOpen"
          title="Extra Large Modal"
          size="xl"
        >
          <p>This is an extra large modal (60rem width). Great for complex layouts or data tables.</p>
        </p-modal>

        <p-modal
          v-model:is-open="fullOpen"
          title="Full Modal"
          size="full"
        >
          <p>This is a full-width modal (80% of viewport width). Ideal for maximum content visibility.</p>
        </p-modal>
      </component-example>

      <section-header
        title="Modal Variants"
        description="Different visual styles for the modal."
      />
      <component-example :code="variantsExample">
        <p-button @click="defaultVariantOpen = true">Default Variant</p-button>
        <p-button @click="aiVariantOpen = true">AI Variant</p-button>

        <p-modal
          v-model:is-open="defaultVariantOpen"
          title="Default Modal"
          variant="default"
        >
          <p>This is a modal with the default variant.</p>
        </p-modal>

        <p-modal
          v-model:is-open="aiVariantOpen"
          title="AI Modal"
          variant="ai"
        >
          <p>This is a modal with the AI variant styling.</p>
        </p-modal>
      </component-example>

      <section-header
        title="Manual Mode"
        description="Prevent the modal from closing when clicking outside."
      />
      <component-example :code="manualExample">
        <p-button @click="manualOpen = true">Open Manual Modal</p-button>
        <p-modal
          v-model:is-open="manualOpen"
          title="Manual Modal"
          manual
        >
          <p>This modal won't close when you click outside. Use the close button.</p>
        </p-modal>
      </component-example>

      <section-header
        title="Back Button"
        description="Add a back button to the modal."
      />
      <component-example :code="backButtonExample">
        <p-button @click="backButtonOpen = true">Open Modal with Back Button</p-button>
        <p-modal
          v-model:is-open="backButtonOpen"
          title="Modal with Back Button"
          show-back
          back-text="Go Back"
        >
          <p>This modal has a back button in the header.</p>
        </p-modal>
      </component-example>

      <section-header
        title="Hidden Close Button"
        description="Hide the default close button."
      />
      <component-example :code="hideCloseExample">
        <p-button @click="hideCloseOpen = true">Open Modal without Close Button</p-button>
        <p-modal
          v-model:is-open="hideCloseOpen"
          title="No Close Button"
          hide-close
        >
          <p>This modal doesn't have a close button. You'll need to provide your own way to close it.</p>
          <p-button @click="hideCloseOpen = false">Custom Close</p-button>
        </p-modal>
      </component-example>

      <section-header
        title="Confirmation Dialog"
        description="Use the confirmation composable for user confirmations."
      />
      <component-example :code="confirmationExample">
        <p-button @click="showConfirm">Open Confirmation Dialog</p-button>
      </component-example>

      <section-header
        title="Interactive Example"
        description="Modal with configurable properties."
      />
      <component-example :code="interactiveExample">
        <p-form>
          <p-toggle
            v-model="isOpen"
            label="IsOpen"
          />

          <p-toggle
            v-model="disabled"
            label="Disabled"
          />

          <p-toggle
            v-model="manual"
            label="Manual Mode (doesn't close when clicked outside modal)"
          />

          <p-toggle
            v-model="showBack"
            label="Show Back Button"
          />
          <p-input
            v-model="backText"
            label="Back Button Text"
          />
          <p-select
            v-model="variant"
            :options="variantOptions"
            label="Variant"
          />
          <p-select
            v-model="size"
            :options="sizeOptions"
            label="Size"
          />
          <p-toggle
            v-model="usePosition"
            label="Custom Position"
          />
          <p-toggle
            v-model="hideClose"
            label="Hide Close Button"
          />
        </p-form>
        <p-button @click="open">Open Interactive Modal</p-button>

        <p-modal
          v-model:is-open="isOpen"
          cancel-text="has a popover"
          title="Interactive Modal"
          subtitle="This modal has configurable properties"
          v-bind="{ manual, disabled, position, showBack, backText, variant, size, hideClose }"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem rerum vel enim, beatae placeat obcaecati minima saepe blanditiis ab quos et, odit
          maiores corrupti voluptatem dolorem explicabo cupiditate molestiae tempora!
          <template #actions>
            <p-button
              icon="search"
              outline
              round
            />

            <p-button
              icon="save"
              outline
              round
            />
          </template>

          <template #footer="{ close: closeModal, cancelText }">
            <p-popover
              triggers="hover"
              position="top-center"
              show-pointer
            >
              <template #target>
                <p-button
                  outline
                  @click="closeModal"
                >
                  {{ cancelText }}
                </p-button>
              </template>
              neato popover text
            </p-popover>
          </template>
        </p-modal>
      </component-example>
    </component-demo-layout>
    <transition name="bounce">
      <div
        v-if="confirmResults"
        class="modal-view__awaiting-confirmation"
        :class="`modal-view__awaiting-confirmation--${confirmResults}`"
      >
        <p-icon
          :fa-style="'solid'"
          size="xl"
          :spin="confirmResults === 'waiting'"
          :icon="confirmationIcon"
        />

        {{ confirmResults }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { ModalPositionMethod } from '@/types'

import { useBoolean, useConfirmation } from '@/composables'

// Example modal states
const basicOpen = ref(false)
const actionsOpen = ref(false)
const xsOpen = ref(false)
const smallOpen = ref(false)
const defaultSizeOpen = ref(false)
const largeOpen = ref(false)
const xlOpen = ref(false)
const fullOpen = ref(false)
const defaultVariantOpen = ref(false)
const aiVariantOpen = ref(false)
const manualOpen = ref(false)
const backButtonOpen = ref(false)
const hideCloseOpen = ref(false)
const showMore = ref(false)

// Interactive example
const disabled = ref(false)
const manual = ref(false)
const usePosition = ref(false)
const showBack = ref(false)
const backText = ref('Go Back')
const hideClose = ref(false)

const { state: isOpen, setTrue: open } = useBoolean()

const variant = ref<'default' | 'ai'>('default')
const variantOptions = [
  { value: 'default', label: 'Default' },
  { value: 'ai', label: 'AI' },
]

const size = ref<'xs' | 'small' | 'default' | 'large' | 'xl' | 'full'>('default')
const sizeOptions = [
  { value: 'xs', label: 'Extra Small (xs)' },
  { value: 'small', label: 'Small' },
  { value: 'default', label: 'Default' },
  { value: 'large', label: 'Large' },
  { value: 'xl', label: 'Extra Large (xl)' },
  { value: 'full', label: 'Full' },
]

const { confirm } = useConfirmation()

const confirmTimer = ref<ReturnType<typeof setTimeout>>()
const confirmResults = ref<'confirmed' | 'cancelled' | 'waiting' | undefined>()

const confirmationIcon = computed(() => {
  switch (confirmResults.value) {
    case 'confirmed':
      return 'check'
    case 'cancelled':
      return 'x'
    case 'waiting':
      return 'spinner-third'
    case undefined:
      return ''
    default:
      return confirmResults.value satisfies never
  }
})

async function showConfirm(): Promise<void> {
  clearTimeout(confirmTimer.value)

  confirmResults.value = 'waiting'

  const confirmed = await confirm('This will change the status of the request from pending to cancelled in the lock desk.', {
    title: 'Cancel lock request?',
    confirmText: 'Yes',
    cancelText: 'No',
    confirmVariant: 'error',
  })

  if (confirmed) {
    confirmResults.value = 'confirmed'
  } else {
    confirmResults.value = 'cancelled'
  }

  confirmTimer.value = setTimeout(() => (confirmResults.value = undefined), 1500)
}

const position = computed<ModalPositionMethod | undefined>(() => {
  if (!usePosition.value) {
    return
  }

  return () => {
    const styles = {
      margin: 'var(--spacing-sm)',
      height: '500px',
      'max-width': 'unset',
    }

    return styles
  }
})

// Code examples
const basicExample = {
  code: `<p-modal
  v-model:is-open="isOpen"
  title="Basic Modal"
>
  <p>This is a basic modal with simple content.</p>
</p-modal>`,
  language: 'vue-html',
}

const actionsExample = {
  code: `<p-modal
  v-model:is-open="isOpen"
  title="Modal with Actions"
  subtitle="This modal has action buttons"
>
  <p>Modal content with action buttons in the header.</p>
  <template #actions>
    <p-button icon="search" outline round />
    <p-button icon="save" outline round />
  </template>
</p-modal>`,
  language: 'vue-html',
}

const sizesExample = {
  code: `<!-- Extra Small (25rem) -->
<p-modal
  v-model:is-open="isOpen"
  title="Extra Small Modal"
  size="xs"
>
  <p>This is an extra small modal (25rem width).</p>
</p-modal>

<!-- Small (30rem) -->
<p-modal
  v-model:is-open="isOpen"
  title="Small Modal"
  size="small"
>
  <p>This is a small modal (30rem width).</p>
</p-modal>

<!-- Default (40rem) -->
<p-modal
  v-model:is-open="isOpen"
  title="Default Modal"
  size="default"
>
  <p>This is a default sized modal (40rem width).</p>
</p-modal>

<!-- Large (50rem) -->
<p-modal
  v-model:is-open="isOpen"
  title="Large Modal"
  size="large"
>
  <p>This is a large modal (50rem width).</p>
</p-modal>

<!-- Extra Large (60rem) -->
<p-modal
  v-model:is-open="isOpen"
  title="Extra Large Modal"
  size="xl"
>
  <p>This is an extra large modal (60rem width).</p>
</p-modal>

<!-- Full (80% of viewport) -->
<p-modal
  v-model:is-open="isOpen"
  title="Full Modal"
  size="full"
>
  <p>This is a full-width modal (80% of viewport width).</p>
</p-modal>`,
  language: 'vue-html',
}

const variantsExample = {
  code: `<p-modal
  v-model:is-open="isOpen"
  title="Default Modal"
  variant="default"
>
  <p>This is a modal with the default variant.</p>
</p-modal>

<p-modal
  v-model:is-open="isOpen"
  title="AI Modal"
  variant="ai"
>
  <p>This is a modal with the AI variant styling.</p>
</p-modal>`,
  language: 'vue-html',
}

const manualExample = {
  code: `<p-modal
  v-model:is-open="isOpen"
  title="Manual Modal"
  manual
>
  <p>This modal won't close when you click outside.</p>
</p-modal>`,
  language: 'vue-html',
}

const backButtonExample = {
  code: `<p-modal
  v-model:is-open="isOpen"
  title="Modal with Back Button"
  show-back
  back-text="Go Back"
>
  <p>This modal has a back button in the header.</p>
</p-modal>`,
  language: 'vue-html',
}

const hideCloseExample = {
  code: `<p-modal
  v-model:is-open="isOpen"
  title="No Close Button"
  hide-close
>
  <p>This modal doesn't have a close button.</p>
  <p-button @click="isOpen = false">Custom Close</p-button>
</p-modal>`,
  language: 'vue-html',
}

const confirmationExample = {
  code: `const { confirm } = useConfirmation()

const showConfirm = async () => {
  const result = await confirm({
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?'
  })

  if (result) {
    console.log('User confirmed')
  } else {
    console.log('User cancelled')
  }
}`,
  language: 'ts',
}

const interactiveExample = {
  code: `<p-modal
  v-model:is-open="isOpen"
  title="Interactive Modal"
  subtitle="This modal has configurable properties"
  :manual="manual"
  :disabled="disabled"
  :show-back="showBack"
  :back-text="backText"
  :variant="variant"
  :size="size"
  :hide-close="hideClose"
  :position="position"
>
  Modal content with configurable properties
  <template #actions>
    <p-button icon="search" outline round />
    <p-button icon="save" outline round />
  </template>
</p-modal>`,
  language: 'vue-html',
}
</script>

<style>
.modal-view__awaiting-confirmation {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  border-radius: var(--border-radius-xl);
  border: 3px dotted transparent;
  font-size: var(--font-size-xl);
  padding: var(--spacing-base);
  margin-bottom: calc(var(--spacing-lg) * -1);
  z-index: 99999;
}

.modal-view__awaiting-confirmation--waiting {
  background-color: rgba(0, 0, 255, 0.25);
  border-color: rgba(0, 0, 255, 1);
  color: rgba(0, 0, 255, 1);
}

.modal-view__awaiting-confirmation--cancelled {
  background-color: rgba(255, 0, 0, 0.25);
  border-color: rgba(255, 0, 0, 1);
  color: rgba(255, 0, 0, 1);
}

.modal-view__awaiting-confirmation--confirmed {
  background-color: rgba(0, 255, 0, 0.25);
  border-color: rgba(0, 255, 0, 1);
  color: rgba(0, 255, 0, 1);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
