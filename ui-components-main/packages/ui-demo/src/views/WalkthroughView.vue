<template>
  <component-demo-layout name="Walkthrough">
    <section-header
      title="Basic Usage"
      description="The walkthrough component provides guided tours through your UI by highlighting elements and displaying information."
    />

    <p-walkthrough
      v-model:current-step="currentStep"
      :steps="steps"
      @setup-event="setup"
    />

    <component-example :code="walkthroughExample">
      <div class="walkthrough-demo">
        <p-button id="walkthrough-target-1">First Button</p-button>
        <p-button id="walkthrough-target-2">Second Button</p-button>
        <p-button id="walkthrough-target-3">Third Button</p-button>
      </div>
      <p-accordion
        id="accordion-1"
        v-model:expanded="isExpanded"
        variant="secondary"
        title="accordion"
      >
        <div id="nested-target">hello</div>
      </p-accordion>
    </component-example>
    <section-header
      title="Steps"
      description="The steps prop is an array of objects that define each step in the walkthrough."
    />
    <code-snippet
      :code="stepsExample.code"
      :language="stepsExample.language"
    />
  </component-demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { WalkthroughStep } from '@/types'

const currentStep = ref(0)

const steps: WalkthroughStep[] = [
  {
    step: 0,
    header: 'Welcome to the walkthrough!',
    targetId: 'walkthrough-target-1',
    content: 'This is the first button in our walkthrough',
    position: 'bottom-right',
  },
  {
    step: 1,
    header: 'nested accordion target',
    targetId: 'nested-target',
    content: 'This is a target thats nested in an accordion',
    position: 'bottom-right',
    setupEvent: 'openAccordion',
  },
  {
    step: 2,
    header: 'Second Step',
    targetId: 'walkthrough-target-2',
    content: 'This is the second button in our walkthrough',
    position: 'bottom-right',
  },
  {
    step: 3,
    header: 'Third Step',
    targetId: 'walkthrough-target-3',
    content: 'This is the third and final button in our walkthrough',
    position: 'bottom-right',
  },
]

const stepsExample = {
  code: `const steps: WalkthroughStep[] = [
  {
    step: 0,
    header: 'Welcome to the walkthrough!',
    targetId: 'walkthrough-target-1',
    content: 'This is the first button in our walkthrough',
    position: 'bottom-right',
  },
  {
    step: 1,
    header: 'nested accordion target',
    targetId: 'nested-target',
    content: 'This is a target thats nested in an accordion',
    position: 'bottom-right',
    setupEvent: 'openAccordion',
  },
  {
    step: 2,
    header: 'Second Step',
    targetId: 'walkthrough-target-2',
    content: 'This is the second button in our walkthrough',
    position: 'bottom-right',
  },
  {
    step: 3,
    header: 'Third Step',
    targetId: 'walkthrough-target-3',
    content: 'This is the third and final button in our walkthrough',
    position: 'bottom-right',
  },
]`,
  language: 'typescript',
}

const walkthroughExample = [
  {
    code: `<p-walkthrough
  v-model:current-step="currentStep"
  :steps="steps"
  @setup-event="setup"
>
  <div class="walkthrough-demo">
    <p-button id="walkthrough-target-1">First Button</p-button>
    <p-button id="walkthrough-target-2">Second Button</p-button>
    <p-button id="walkthrough-target-3">Third Button</p-button>
  </div>
  <p-accordion
    id="accordion-1"
    v-model:expanded="isExpanded"
    variant="secondary"
    title="accordion"
  >
    <div id="nested-target">hello</div>
  </p-accordion>
</p-walkthrough>`,
    language: 'vue-html',
  },
  {
    code: `function setup(event: string) {
  if (event === 'openAccordion') {
    openAccordion()
  }
}`,
    language: 'typescript',
  },
]

function setup(event: string) {
  if (event === 'openAccordion') {
    openAccordion()
  }
}

const isExpanded = ref(false)

function openAccordion() {
  isExpanded.value = true
}
</script>

<style>
.walkthrough-demo {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  align-items: center;
  min-height: 200px;
  background-color: gray;
}

.walkthrough-controls {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}
</style>
