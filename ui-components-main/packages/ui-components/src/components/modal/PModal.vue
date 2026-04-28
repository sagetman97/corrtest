<template>
  <slot
    name="target"
    v-bind="{ toggle, open, close, isOpen }"
  />
  <teleport to="body">
    <transition name="polly-modal-backdrop">
      <div
        v-if="keep || isOpen"
        v-show="isOpen"
        class="polly-modal__backdrop"
        :class="classes.backdrop"
        @click="closeIfBackdrop"
      />
    </transition>
    <transition
      name="polly-modal"
      @after-leave="onTransitionComplete"
    >
      <dialog
        v-if="keep || isOpen"
        v-show="isOpen"
        ref="dialogElement"
        class="polly-modal"
        role="dialog"
        :class="classes.modal"
        :style="styles"
        v-bind="attrs"
        autofocus
        :aria-labelledby="title ? titleId : undefined"
        :aria-label="!title ? 'Modal' : undefined"
      >
        <slot
          name="content"
          v-bind="{ close }"
        >
          <PModalContent :variant="variant">
            <template
              v-if="showBack"
              #back
            >
              <p-button
                class="polly-modal__back-button"
                icon="circle-arrow-left"
                lite
                family="duotone"
                size="xs"
                variant="accent"
                @click="handleBack"
              >
                {{ backText }}
              </p-button>
            </template>
            <template
              v-if="slots.title || title"
              #title
            >
              <slot
                name="title"
                v-bind="{ close }"
              >
                {{ title }}
              </slot>
            </template>

            <template #actions>
              <div
                v-if="isMobile && !hideClose"
                ref="grabberElement"
                class="polly-modal__grabber"
              >
                <div class="polly-modal__grabber-handle" />
              </div>
              <slot
                name="actions"
                v-bind="{ close }"
              />
              <slot
                v-if="!hideClose"
                name="close"
                v-bind="{ close }"
              >
                <p-button
                  round
                  text
                  icon="xmark"
                  @click="close"
                />
              </slot>
            </template>

            <template
              v-if="slots.subtitle || subtitle"
              #subtitle
            >
              <slot
                name="subtitle"
                v-bind="{ close }"
              >
                {{ subtitle || '' }}
              </slot>
            </template>

            <template
              v-if="slots.default"
              #body
            >
              <slot v-bind="{ close }" />
            </template>

            <template
              v-if="slots.footer"
              #footer
            >
              <slot
                name="footer"
                v-bind="{ close, cancelText }"
              >
              </slot>
            </template>
          </PModalContent>
        </slot>
      </dialog>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, useAttrs, useTemplateRef, watch } from 'vue'

import { ModalProps, ModalSlots } from '@/types'

import { PModalContent } from '@/components/modal'
import { useEventListener, useMobile, useSwipe } from '@/composables'

const {
  cancelText = 'Cancel',
  backText = 'Go Back',
  variant = 'default',
  hideClose = false,
  size = 'default',
  position: positionProp,
  manual,
} = defineProps<ModalProps>()

const isOpen = defineModel('isOpen', { type: Boolean, default: false })
const isClosing = ref(false)
const emit = defineEmits(['goBack'])
const slots = defineSlots<ModalSlots>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const dialogElement = useTemplateRef<HTMLDialogElement>('dialogElement')
const grabberElement = useTemplateRef<HTMLElement>('grabberElement')
const { isMobileWidth, isMobile } = useMobile()
const previousActiveElement = ref<HTMLElement | null>(null)

const styles = computed(() => {
  if (isMobileWidth.value) return

  return positionProp?.()
})

useSwipe(
  grabberElement,
  { direction: 'vertical' },
  (swipeDirection) => {
    if (swipeDirection === 'down') {
      isOpen.value = false
    } else if (dialogElement.value) {
      dialogElement.value.style.transform = 'translateY(0)'
    }
  },
  dialogElement
)

const classes = computed(() => {
  return {
    modal: [
      `polly-modal--${variant}`,
      `polly-modal--size-${size}`,
      {
        'polly-modal--open': isOpen.value,
      },
    ],
    backdrop: [`polly-modal__backdrop--${variant}`],
  }
})

function open(): void {
  // Store the currently focused element before opening modal
  previousActiveElement.value = document.activeElement as HTMLElement
  isOpen.value = true
}

function close(): void {
  isOpen.value = false
  if (!isClosing.value) {
    isClosing.value = true
  }
}

function onTransitionComplete(): void {
  // Called when the modal transition finishes
  // Restore focus to the previously focused element
  nextTick(() => {
    if (previousActiveElement.value && document.contains(previousActiveElement.value)) {
      previousActiveElement.value.focus()
    }
    isClosing.value = false
  })
}

function toggle(): void {
  if (isClosing.value) {
    return
  }

  if (dialogElement.value?.open) {
    close()
  } else {
    open()
  }
}

function closeIfBackdrop(): void {
  if (!manual) {
    close()
  }
}

function handleBack(): void {
  emit('goBack')
}

const focusableSelector =
  'button:not([disabled]):not([tabindex="-1"]), [href]:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]):not([disabled])'

watch(
  isOpen,
  async (value) => {
    await nextTick()
    if (value) {
      open()
      await nextTick()

      // Focus the first focusable element in the modal
      const focusableElements = dialogElement.value?.querySelectorAll(focusableSelector) ?? []

      const firstFocusable = focusableElements[0] as HTMLElement

      if (firstFocusable) {
        firstFocusable.focus()
      }
    } else {
      close()
    }
  },
  { immediate: true }
)

const titleId = computed(() => `modal-title-${Math.random().toString(36).substring(2, 9)}`)

function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    if (!manual) {
      close()
      event.preventDefault()
    }
  }
}

// Focus trapping logic
function handleFocusTrap(event: KeyboardEvent): void {
  if (!isOpen.value || !dialogElement.value) return

  if (event.key !== 'Tab') return

  // Get all focusable elements within the modal
  const focusableElements = dialogElement.value.querySelectorAll(focusableSelector)

  const focusableArray = Array.from(focusableElements) as HTMLElement[]

  if (focusableArray.length === 0) return

  const firstFocusable = focusableArray[0]
  const lastFocusable = focusableArray[focusableArray.length - 1]
  const activeElement = document.activeElement as HTMLElement

  // Only trap focus if the active element is within the modal or if focus is outside
  const isActiveInModal = dialogElement.value.contains(activeElement)

  // Handle focus trapping
  if (event.shiftKey) {
    // Shift+Tab (reverse direction)
    if (activeElement === firstFocusable || !isActiveInModal) {
      event.preventDefault()
      lastFocusable?.focus()
    }
  } else {
    // Tab (forward direction)
    if (activeElement === lastFocusable || !isActiveInModal) {
      event.preventDefault()
      firstFocusable?.focus()
    }
  }
}

// Listen for keydown events on both the dialog and document
useEventListener(dialogElement, 'keydown', handleFocusTrap)
useEventListener(dialogElement, 'keydown', handleEscape)
</script>

<style>
body:has(.polly-modal--open) {
  overflow: hidden;
}

.polly-modal {
  --polly-modal-width: 35rem;
  position: fixed;
  top: 10dvh;
  padding: 0;
  border: 0;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  max-height: 80dvh;
  color: var(--colors-text-icon-dark);
  background-color: var(--colors-background-common-white);
  display: flex;
  flex-direction: column;
  width: var(--polly-modal-width);
  max-width: min(var(--max-width-readable), 90dvw);
  transition: all ease-in-out 250ms;
  z-index: var(--layout-modal);
}

.polly-modal__backdrop {
  --polly-modal-backdrop-color: var(--colors-backdrop);
  z-index: var(--layout-modal);
  position: fixed;
  inset: 0;
  background-color: var(--polly-modal-backdrop-color);
}

.polly-modal--size-xs {
  --polly-modal-width: 25rem;
}

.polly-modal--size-small {
  --polly-modal-width: 30rem;
}

.polly-modal--size-default {
  --polly-modal-width: 40rem;
}

.polly-modal--size-large {
  --polly-modal-width: 50rem;
}

.polly-modal--size-xl {
  --polly-modal-width: 60rem;
}

.polly-modal--size-full {
  --polly-modal-width: 80%;
  max-width: 80%;
}

.polly-modal__backdrop--ai {
  --polly-modal-backdrop-color: var(--colors-backdrop-copilot);
}

.polly-modal:has(.polly-swipe--dragging) {
  transition: none;
}

.polly-modal__grabber {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 4rem;
  width: 100%;
  cursor: grab;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  user-select: none;
  --polly-accessory-panel-grabber-color: var(--colors-border-common-default);
}

.polly-modal__back-button {
  z-index: var(--layout-above);
}

.polly-modal__grabber.polly-swipe--dragging {
  --polly-accessory-panel-grabber-color: var(--colors-border-common-active);
}

.polly-modal__grabber-handle {
  margin-top: 0.5rem;
  height: 4px;
  width: 20%;
  background-color: var(--polly-accessory-panel-grabber-color);
  border-radius: var(--border-radius-base);
  transition: background-color ease-in-out 200ms;
  pointer-events: none;
}

.polly-modal-backdrop-enter-active,
.polly-modal-backdrop-leave-active,
.polly-modal-enter-active,
.polly-modal-leave-active {
  transition: all 350ms var(--polly-transition-ease-out);
}

.polly-modal-backdrop-enter-from,
.polly-modal-backdrop-leave-to,
.polly-modal-enter-from,
.polly-modal-leave-to {
  opacity: 0;
}

@media screen and (max-width: 669px) {
  .polly-modal {
    --polly-modal-width: 100%;

    border-radius: var(--border-radius-lg);
    box-shadow: 0px 4px 8px -6px var(--colors-border-box-shadow);
    margin: 0;
    inset: 0;
    margin-top: auto;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    max-width: 100%;
    opacity: 1;
    will-change: transform;
  }

  .polly-modal--ai {
    max-width: 100%;
  }

  .polly-modal-enter-active,
  .polly-modal-leave-active,
  .polly-modal-backdrop-enter-active,
  .polly-modal-backdrop-leave-active {
    transition: all 500ms var(--polly-transition-ease-out);
  }

  .polly-modal-enter-from,
  .polly-modal-leave-to {
    transform: translateY(100%) !important;
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .polly-modal--open {
      opacity: 1;
      transform: translateY(0);
    }

    .polly-modal {
      opacity: 1;
      transform: translateY(0);
    }

    @starting-style {
      .polly-modal--open {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}

.polly-modal--ai {
  --polly-modal-border-color: var(--colors-AI-mid);
}

.polly-modal--ai .polly-modal-content__title {
  color: var(--colors-text-icon-copilot);
}
</style>
