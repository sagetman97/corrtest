<template>
  <component-demo-layout name="Popover">
    <section-header
      title="Basic Usage"
      description="A simple popover component that displays content in an overlay."
    />
    <component-example :code="basicExample">
      <p-popover triggers="click">
        <template #target>
          <p-button>Click Me</p-button>
        </template>
        <div class="popover-view__content">
          <p>This is basic popover content.</p>
        </div>
      </p-popover>
    </component-example>

    <section-header
      title="Trigger Types"
      description="Different ways to trigger the popover display."
    />
    <component-example :code="triggersExample">
      <div class="popover-view__demo-container">
        <p-popover triggers="click">
          <template #target>
            <p-button>Click Trigger</p-button>
          </template>
          <div class="popover-view__content">
            <p>Triggered by clicking</p>
          </div>
        </p-popover>

        <p-popover triggers="hover">
          <template #target>
            <p-button>Hover Trigger</p-button>
          </template>
          <div class="popover-view__content">
            <p>Triggered by hovering</p>
          </div>
        </p-popover>

        <p-popover triggers="focus">
          <template #target>
            <p-button>Focus Trigger</p-button>
          </template>
          <div class="popover-view__content">
            <p>Triggered by focusing</p>
          </div>
        </p-popover>
      </div>
    </component-example>

    <section-header
      title="Positioning"
      description="Control where the popover appears relative to its target."
    />
    <component-example :code="positionExample">
      <div class="popover-view__demo-container">
        <p-popover
          triggers="click"
          position="top-center"
        >
          <template #target>
            <p-button>Top Center</p-button>
          </template>
          <div class="popover-view__content">
            <p>Positioned above the target (center)</p>
          </div>
        </p-popover>

        <p-popover
          triggers="click"
          position="bottom-center"
        >
          <template #target>
            <p-button>Bottom Center</p-button>
          </template>
          <div class="popover-view__content">
            <p>Positioned below the target (center)</p>
          </div>
        </p-popover>

        <p-popover
          triggers="click"
          position="left-center"
        >
          <template #target>
            <p-button>Left Center</p-button>
          </template>
          <div class="popover-view__content">
            <p>Positioned to the left (center)</p>
          </div>
        </p-popover>

        <p-popover
          triggers="click"
          position="right-center"
        >
          <template #target>
            <p-button>Right Center</p-button>
          </template>
          <div class="popover-view__content">
            <p>Positioned to the right (center)</p>
          </div>
        </p-popover>

        <p-popover
          triggers="click"
          position="bottom-left"
        >
          <template #target>
            <p-button>Bottom Left</p-button>
          </template>
          <div class="popover-view__content">
            <p>Positioned below (left aligned)</p>
          </div>
        </p-popover>

        <p-popover
          triggers="click"
          position="bottom-right"
        >
          <template #target>
            <p-button>Bottom Right</p-button>
          </template>
          <div class="popover-view__content">
            <p>Positioned below (right aligned)</p>
          </div>
        </p-popover>
      </div>
    </component-example>

    <section-header
      title="Variants"
      description="Different visual styles for the popover."
    />
    <component-example :code="variantsExample">
      <div class="popover-view__demo-container">
        <p-popover
          triggers="click"
          variant="light"
        >
          <template #target>
            <p-button>Light Variant</p-button>
          </template>
          <div class="popover-view__content">
            <p>Light popover styling</p>
          </div>
        </p-popover>

        <p-popover
          triggers="click"
          variant="dark"
        >
          <template #target>
            <p-button>Dark Variant</p-button>
          </template>
          <div class="popover-view__content">
            <p>Dark popover styling</p>
          </div>
        </p-popover>
      </div>
    </component-example>

    <section-header
      title="Disabled State"
      description="Popover can be disabled to prevent interaction."
    />
    <component-example :code="disabledExample">
      <p-popover
        triggers="click"
        disabled
      >
        <template #target>
          <p-button>Disabled Popover</p-button>
        </template>
        <div class="popover-view__content">
          <p>This popover is disabled</p>
        </div>
      </p-popover>
    </component-example>

    <section-header
      title="Manual Control"
      description="Manually control when the popover is shown or hidden."
    />
    <component-example :code="manualExample">
      <p-popover
        triggers="click"
        manual
      >
        <template #target>
          <p-button>Manual Popover</p-button>
        </template>
        <div class="popover-view__content">
          <p>This popover is manually controlled</p>
        </div>
      </p-popover>
    </component-example>

    <section-header
      title="External Target Element"
      description="Use the targetElement prop to attach the popover to any DOM element outside the component. When using targetElement, no target slot content is needed since the popover targets an external element."
    />
    <component-example :code="targetElementExample">
      <div class="popover-view__demo-container">
        <div class="popover-view__external-targets">
          <p-button ref="targetButton1">popover target 1</p-button>

          <p-input
            ref="targetInput"
            placeholder="popover target 2"
            class="popover-view__external-input"
          />
          <p-button
            ref="targetButton2"
            variant="accent"
          >
            popover target 3
          </p-button>
        </div>

        <div class="popover-view__popover-controls">
          <p-popover
            :target-element="targetButton1Element"
            triggers="click"
            position="bottom-center"
          >
            <div class="popover-view__content">
              <p>This popover is attached to the external accent button above!</p>
              <p>Click the accent button to trigger this popover.</p>
            </div>
          </p-popover>

          <p-popover
            :target-element="targetInputElement"
            triggers="focus"
            position="top-center"
          >
            <div class="popover-view__content">
              <p>This popover is attached to the external input above!</p>
              <p>Focus the input field to trigger this popover.</p>
            </div>
          </p-popover>

          <p-popover
            :target-element="targetButton2Element"
            triggers="hover"
            position="bottom-center"
          >
            <div class="popover-view__content">
              <p>This popover is attached to the external error button above!</p>
              <p>Hover over the error button to trigger this popover.</p>
            </div>
          </p-popover>
        </div>
      </div>
    </component-example>

    <section-header
      title="Draggable Popover"
      description="Allow users to drag the popover around the screen."
    />
    <component-example :code="draggableExample">
      <p-popover
        triggers="click"
        draggable
      >
        <template #target>
          <p-button>Draggable Popover</p-button>
        </template>
        <div class="popover-view__content">
          <p>This popover can be dragged around</p>
        </div>
      </p-popover>
    </component-example>

    <section-header
      title="Resizable Popover"
      description="Allow users to resize the popover."
    />
    <component-example :code="resizableExample">
      <p-popover
        triggers="click"
        resizable
        :resize-options="{
          minWidth: createUnitValue(200, 'px'),
          minHeight: createUnitValue(100, 'px'),
          maxWidth: createUnitValue(500, 'px'),
          maxHeight: createUnitValue(300, 'px'),
        }"
      >
        <template #target>
          <p-button>Resizable Popover</p-button>
        </template>
        <div class="popover-view__content">
          <p>This popover can be resized</p>
          <p>Try dragging the edges to resize</p>
        </div>
      </p-popover>
    </component-example>

    <section-header
      title="Interactive Example"
      description="Popover with configurable properties."
    />
    <component-example :code="interactiveExample">
      <p-form>
        <p-toggle
          v-model="disabled"
          label="Disabled"
        />

        <p-toggle
          v-model="manual"
          label="Manual"
        />

        <p-select
          v-model="position"
          label-position="left"
          :options="positionOptions"
          label="Popover Position"
        />

        <p-select
          v-model="variant"
          label-position="left"
          :options="variantOptions"
          label="variant"
        />

        <p-toggle
          v-model="scrollableContent"
          label="Scrollable Content"
        />

        <p-toggle
          v-model="showPointer"
          label="Show Pointer"
        />

        <p-toggle
          v-model="draggable"
          label="Draggable"
        />

        <p-toggle
          v-model="useCustomPosition"
          label="Use Custom Position Function to place in the center of the screen"
        />

        <p-toggle
          v-model="resizable"
          label="Resizable"
        />

        <p-input-number
          v-model="resizeOptionsValue.minWidth"
          label="Min Width (px)"
        />

        <p-input-number
          v-model="resizeOptionsValue.minHeight"
          label="Min Height (px)"
        />

        <p-input-number
          v-model="resizeOptionsValue.maxWidth"
          label="Max Width (px)"
        />

        <p-input-number
          v-model="resizeOptionsValue.maxHeight"
          label="Max Height (px)"
        />
      </p-form>
      <div class="popover-view__demo-container">
        <p-popover
          triggers="click"
          v-bind="{ manual, disabled, showPointer, variant, draggable, resizable, resizeOptions }"
          :position="customPosition ?? position"
        >
          <template #target>
            <p-button>Interactive Click Trigger</p-button>
          </template>
          <div class="popover-view__content">
            <template
              v-for="times in scrollableContent ? 10 : 1"
              :key="times"
            >
              <p>Interactive popover content</p>
            </template>
          </div>
        </p-popover>

        <p-popover
          triggers="hover"
          v-bind="{ manual, disabled, showPointer, variant, draggable, resizable, resizeOptions }"
          :position="customPosition ?? position"
        >
          <template #target>
            <p-button>Interactive Hover Trigger</p-button>
          </template>
          <div class="popover-view__content">
            <template
              v-for="times in scrollableContent ? 10 : 1"
              :key="times"
            >
              <p>Interactive hover content with configurable properties</p>
            </template>
          </div>
        </p-popover>
      </div>
    </component-example>
  </component-demo-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { PopoverPosition, PopoverPositionMethod, PopoverProps } from '@/types'

import { createUnitValue } from '@/utilities'

// Target elements for popovers
const targetButton1 = ref()
const targetInput = ref()
const targetButton2 = ref()

// Computed properties that return the actual DOM elements
const targetButton1Element = computed(() => {
  return targetButton1.value?.$el || null
})

const targetInputElement = computed(() => {
  return targetInput.value?.$el || null
})

const targetButton2Element = computed(() => {
  return targetButton2.value?.$el || null
})

const scrollableContent = ref(false)
const showPointer = ref(true)
const disabled = ref(false)
const manual = ref(false)
const draggable = ref(false)
const useCustomPosition = ref(false)
const resizable = ref(false)
const resizeOptionsValue = ref({
  minWidth: '200',
  minHeight: '200',
  maxWidth: '500',
  maxHeight: '500',
})

const resizeOptions = computed(() => ({
  minWidth: createUnitValue(Number(resizeOptionsValue.value.minWidth), 'px'),
  minHeight: createUnitValue(Number(resizeOptionsValue.value.minHeight), 'px'),
  maxWidth: createUnitValue(Number(resizeOptionsValue.value.maxWidth), 'px'),
  maxHeight: createUnitValue(Number(resizeOptionsValue.value.maxHeight), 'px'),
}))

const position = ref<PopoverPosition>('bottom-left')
const positionOptions = [
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-stretch', label: 'Bottom Stretch' },
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'top-center', label: 'Top Center' },
  { value: 'top-stretch', label: 'Top Stretch' },
  { value: 'left-center', label: 'Left Center' },
  { value: 'right-center', label: 'Right Center' },
]

const variant = ref<PopoverProps['variant']>('dark')
const variantOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const customPosition = computed(() => {
  return useCustomPosition.value ? customPositionFn : undefined
})

const customPositionFn: PopoverPositionMethod = () => {
  return {
    margin: 'var(--spacing-sm)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%)',
  }
}

// Code examples
const basicExample = {
  code: `<p-popover triggers="click">
  <template #target>
    <p-button>Click Me</p-button>
  </template>
  <div>
    <p>This is basic popover content.</p>
  </div>
</p-popover>`,
  language: 'vue-html',
}

const triggersExample = {
  code: `<p-popover triggers="click">
  <template #target>
    <p-button>Click Trigger</p-button>
  </template>
  <div><p>Triggered by clicking</p></div>
</p-popover>

<p-popover triggers="hover">
  <template #target>
    <p-button>Hover Trigger</p-button>
  </template>
  <div><p>Triggered by hovering</p></div>
</p-popover>`,
  language: 'vue-html',
}

const positionExample = {
  code: `<p-popover triggers="click" position="top-center">
  <template #target>
    <p-button>Top Center</p-button>
  </template>
  <div><p>Positioned above the target (center)</p></div>
</p-popover>

<p-popover triggers="click" position="bottom-left">
  <template #target>
    <p-button>Bottom Left</p-button>
  </template>
  <div><p>Positioned below (left aligned)</p></div>
</p-popover>

<p-popover triggers="click" position="right-center">
  <template #target>
    <p-button>Right Center</p-button>
  </template>
  <div><p>Positioned to the right (center)</p></div>
</p-popover>`,
  language: 'vue-html',
}

const variantsExample = {
  code: `<p-popover triggers="click" variant="light">
  <template #target>
    <p-button>Light Variant</p-button>
  </template>
  <div><p>Light popover styling</p></div>
</p-popover>

<p-popover triggers="click" variant="dark">
  <template #target>
    <p-button>Dark Variant</p-button>
  </template>
  <div><p>Dark popover styling</p></div>
</p-popover>`,
  language: 'vue-html',
}

const disabledExample = {
  code: `<p-popover triggers="click" disabled>
  <template #target>
    <p-button>Disabled Popover</p-button>
  </template>
  <div><p>This popover is disabled</p></div>
</p-popover>`,
  language: 'vue-html',
}

const manualExample = {
  code: `<p-popover triggers="click" manual>
  <template #target>
    <p-button>Manual Popover</p-button>
  </template>
  <div><p>This popover is manually controlled</p></div>
</p-popover>`,
  language: 'vue-html',
}

const targetElementExample = {
  code: `<!-- External target elements -->
<button id="external-button">External Button</button>
<input id="external-input" placeholder="External Input" />

<!-- Popover targeting an external element by ID (for demo compilation) -->
<p-popover
  target-id="external-button"
  triggers="click"
  position="bottom-center"
>
  <div>
    <p>This popover is attached to the external button!</p>
    <p>Click the external button to trigger this popover.</p>
  </div>
</p-popover>

<!-- Popover targeting an external input by ID (for demo compilation) -->
<p-popover
  target-id="external-input"
  triggers="focus"
  position="top-center"
>
  <div>
    <p>This popover is attached to the external input!</p>
    <p>Focus the input to trigger this popover.</p>
  </div>
</p-popover>

<!-- Note: In real usage you can pass an actual HTMLElement via the targetElement prop -->
<!-- Example (in script setup):
const btn = ref(); const popTarget = ref(); onMounted(() => popTarget.value = btn.value?.$el)
<p-popover :target-element="popTarget"> ... </p-popover>
-->`,
  language: 'vue-html',
}

const draggableExample = {
  code: `<p-popover triggers="click" draggable>
  <template #target>
    <p-button>Draggable Popover</p-button>
  </template>
  <div><p>This popover can be dragged around</p></div>
</p-popover>`,
  language: 'vue-html',
}

const resizableExample = {
  code: `<p-popover
  triggers="click"
  resizable
  :resize-options="{ minWidth: 200, minHeight: 100 }"
>
  <template #target>
    <p-button>Resizable Popover</p-button>
  </template>
  <div><p>This popover can be resized</p></div>
</p-popover>`,
  language: 'vue-html',
}

const interactiveExample = {
  code: `<p-popover
  triggers="click"
  :disabled="disabled"
  :manual="manual"
  :position="position"
  :variant="variant"
  :show-pointer="showPointer"
  :draggable="draggable"
  :resizable="resizable"
  :resize-options="resizeOptions"
>
  <template #target>
    <p-button>Interactive Popover</p-button>
  </template>
  <div>Interactive popover content</div>
</p-popover>`,
  language: 'vue-html',
}
</script>

<style>
.popover-view__demo-container {
  display: flex;
  gap: var(--spacing-xl);
  justify-content: flex-start;
}

.popover-view__demo {
  display: flex;
  gap: 2px;
}

.popover-view__external-targets {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border: 2px dashed var(--colors-border-base);
  border-radius: var(--border-radius-base);
  background-color: var(--colors-background-subtle);
  margin-bottom: var(--spacing-lg);
}

.popover-view__external-targets::before {
  content: 'External Target Elements';
  font-weight: 600;
  color: var(--colors-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
}

.popover-view__external-input {
  max-width: 200px;
}

.popover-view__popover-controls {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}
</style>
