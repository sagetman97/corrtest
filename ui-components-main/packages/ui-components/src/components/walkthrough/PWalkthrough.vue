<template>
  <div class="polly-walkthrough">
    <template v-if="ready">
      <div
        ref="highlighterElement"
        class="polly-walkthrough__highlighter"
      />
      <div class="polly-walkthrough__highlighter-backdrop" />
    </template>
    <p-popover
      v-model:is-open="ready"
      v-bind="activeStep"
      class="polly-walkthrough__popover"
      variant="light"
      show-pointer
    >
      <template
        v-if="activeStep.header"
        #header
      >
        {{ activeStep.header }}
      </template>

      {{ activeStep.content }}
      <template #footer>
        <p-button
          :disabled="firstStep"
          @click="prevStep"
        >
          Previous
        </p-button>
        <p-button @click="nextStep">{{ lastStep ? 'Finish' : 'Next' }}</p-button>
      </template>
    </p-popover>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'

import { WalkthroughEmits, WalkthroughProps } from '@/types'

const emit = defineEmits<WalkthroughEmits>()

const currentStep = defineModel('currentStep', { type: Number, default: 0 })
const props = defineProps<WalkthroughProps>()

const activeStep = computed(() => {
  return props.steps[currentStep.value]
})

const target = computed(() => {
  return !ready.value ? undefined : document.getElementById(activeStep.value.targetId)
})

const highlighterElement = useTemplateRef<HTMLDivElement>('highlighterElement')

const ready = ref(false)

onMounted(() => {
  setTimeout(() => {
    ready.value = true

    if (!target.value) return
    moveHighlighter(target.value)
  }, 1000)
})

watch(
  [target, highlighterElement],
  (newVal) => {
    if (!newVal[0] || !newVal[1]) return
    moveHighlighter(newVal[0])
  },
  { immediate: true }
)

const highlightMargin = 20

function moveHighlighter(target: HTMLElement | undefined) {
  if (!target || !highlighterElement.value) return

  target.style.zIndex = '10001'
  highlighterElement.value.style.top = `${target.offsetTop - highlightMargin / 2}px`
  highlighterElement.value.style.left = `${target.offsetLeft - highlightMargin / 2}px`
  highlighterElement.value.style.width = `${target.offsetWidth + highlightMargin}px`
  highlighterElement.value.style.height = `${target.offsetHeight + highlightMargin}px`
}

function prevStep() {
  currentStep.value = Math.max(currentStep.value - 1, 0)
}

async function nextStep() {
  if (lastStep.value) {
    ready.value = false
    return
  }

  const nextStep = props.steps[currentStep.value + 1]

  //idea 2
  if (nextStep.setupEvent) {
    emit('setup-event', nextStep.setupEvent)
    await nextTick()
  }

  currentStep.value = Math.min(currentStep.value + 1, props.steps.length - 1)
}

const lastStep = computed(() => {
  return currentStep.value === props.steps.length - 1
})

const firstStep = computed(() => {
  return currentStep.value === 0
})
</script>

<style>
.polly-walkthrough__highlighter {
  position: absolute;
  z-index: 10001;
  border-radius: var(--border-radius-sm);
  background-color: var(--colors-background-common-white);
  mix-blend-mode: overlay;
}

.polly-walkthrough__highlighter-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
}
</style>
