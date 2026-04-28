<template>
  <div class="polly-popover">
    <div
      ref="targetElement"
      class="polly-popover__target"
    >
      <slot
        name="target"
        v-bind="{ attrs, toggle, open, show: open, close, hide: close, isOpen }"
      />
    </div>
    <div
      :id="id"
      ref="contentElement"
      class="polly-popover__content-container"
      :popover="mode"
      :style="contentStyles"
      :class="[classes.content]"
      @click.stop
    >
      <div
        v-if="draggable"
        ref="grabHandleElement"
        class="polly-popover__grabber"
        :class="{ 'polly-popover__grabber--dragging': isDragging }"
      >
        <div class="polly-popover__grabber-handle" />
      </div>
      <PPopoverContent class="polly-popover__content">
        <template
          v-if="slots.header"
          #header
        >
          <slot
            name="header"
            v-bind="{ close }"
          />
        </template>

        <template
          v-if="slots.actions"
          #actions
        >
          <slot
            name="actions"
            v-bind="{ close }"
          />
        </template>

        <template
          v-if="slots.default"
          #body
        >
          <slot v-bind="{ close, hide: close }" />
        </template>

        <template
          v-if="slots.footer"
          #footer
        >
          <slot
            name="footer"
            v-bind="{ close }"
          >
          </slot>
        </template>
      </PPopoverContent>

      <template v-if="showPointer && !draggable">
        <div
          class="polly-popover__content-pointer"
          :class="classes.pointer"
          :style="pointerStyle"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, StyleValue, useTemplateRef, watch } from 'vue'

import { PopoverEmits, PopoverProps, PopoverSlots } from '@/types'

import { useComputedStyle, useDragAndResize, useElementRect, useEventListener, useOutsideClick } from '@/composables'
import { createUnitValue, nodeContainsTarget, randomId } from '@/utilities'
import { autoPosition, leftCenterPosition, rightCenterPosition } from '@/utilities/position'
import { getRelativePositionOfTargetToSource, RelativePosition } from '@/utilities/relativePosition'
import PPopoverContent from './PPopoverContent.vue'

const props = withDefaults(defineProps<PopoverProps>(), {
  position: 'bottom-left',
  variant: 'dark',
  triggers: () => ['click'],
  resizeOptions: () => {
    return {
      minWidth: createUnitValue(200, 'px'),
      minHeight: createUnitValue(200, 'px'),
      maxWidth: createUnitValue(window.innerWidth - 40, 'px'),
      maxHeight: createUnitValue(window.innerHeight - 40, 'px'),
    }
  },
})

const emit = defineEmits<PopoverEmits>()

const slots = defineSlots<PopoverSlots>()

// Development-time warning if both external target and target slot are used
const hasTargetSlot = computed(() => !!slots.target)
function warnOnConflictingTarget() {
  if ((props.targetElement || props.targetId) && hasTargetSlot.value) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        '[PPopover] targetElement/targetId provided along with a target slot. The slot will be ignored. Remove the target slot when using an external target.'
      )
    }
  }
}

const mode = computed(() => (props.manual ? 'manual' : 'auto'))
const id = computed(() => props.popoverId ?? randomId())

const targetElement = useTemplateRef<HTMLDivElement>('targetElement')
const contentElement = useTemplateRef<HTMLDivElement>('contentElement')
const grabHandleElement = useTemplateRef<HTMLDivElement>('grabHandleElement')

const { value: targetRect, check } = useElementRect(targetElement)
const { value: contentRect } = useElementRect(contentElement)

const rafId = ref<number | null>(null)

function schedulePositionUpdate() {
  if (rafId.value !== null) {
    return
  }

  rafId.value = requestAnimationFrame(() => {
    check()
    rafId.value = null
  })
}

const { add: addResizeListener, remove: removeResizeListener } = useEventListener(window, 'resize', schedulePositionUpdate)
const { add: addScrollListener, remove: removeScrollListener } = useEventListener(window, 'scroll', schedulePositionUpdate)

onMounted(() => {
  warnOnConflictingTarget()
  addTriggers()
})

onUnmounted(() => {
  if (rafId.value !== null) {
    cancelAnimationFrame(rafId.value)
    rafId.value = null
  }
})

const removeListeners = ref<(() => void)[]>([])

function addTriggers() {
  const triggerList = props.triggers
  if (!triggerList) return
  const target = getTargetElement()

  if (!target) {
    return
  }

  const { remove: removeFocusinListener } = useEventListener(target, 'focusin', () => {
    if (triggerList.includes('focus')) open()
  })

  const { remove: removeFocusoutListener } = useEventListener(target, 'focusout', () => {
    if (triggerList.includes('focus')) close()
  })

  const { remove: removeMouseenterListener } = useEventListener(target, 'mouseenter', () => {
    if (triggerList.includes('hover')) open()
  })

  const { remove: removeMouseleaveListener } = useEventListener(target, 'mouseleave', () => {
    if (triggerList.includes('hover')) close()
  })

  const { remove: removeClickListener } = useEventListener(target, 'click', () => {
    if (triggerList.includes('click')) {
      nextTick(() => {
        toggle()
      })
    }
  })

  removeListeners.value = [removeFocusinListener, removeFocusoutListener, removeMouseenterListener, removeMouseleaveListener, removeClickListener]

  useOutsideClick(contentElement, (event) => {
    // Don't close if we're in the prevention period after drag/resize
    if (Date.now() < preventCloseUntil.value) {
      event.stopPropagation()
      event.preventDefault()
      return
    }

    // Don't close if we're currently dragging or resizing
    if (isDragging.value || isResizing.value) {
      event.stopPropagation()
      event.preventDefault()
      return
    }

    if (event.target === getTargetElement()) {
      return
    }
    // Don't close on clicks on the target itself; let the target's click handler (toggle) handle it
    if (target && nodeContainsTarget(target, event)) {
      return
    }

    if (triggerList.includes('click') && !props.manual) close()
  })
}

function removeTriggers() {
  removeListeners.value.forEach((remove) => remove())
  removeListeners.value = []
}

const options = computed(() => {
  const resizeOpts = props.resizeOptions
  return {
    minWidth: resizeOpts?.minWidth,
    minHeight: resizeOpts?.minHeight,
    maxWidth: resizeOpts?.maxWidth,
    maxHeight: resizeOpts?.maxHeight,
    draggable: props.draggable,
    resizable: props.resizable,
    disabled: props.disabled,
    grabHandle: grabHandleElement,
    applyTransform: false,
  }
})

const { isDragging, isResizing, dragOffsetX, dragOffsetY } = useDragAndResize(contentElement, options)

const preventCloseUntil = ref(0)

watch([isDragging, isResizing], ([dragging, resizing]) => {
  // When drag or resize ends, set a timeout to prevent closing for 300ms
  if (!dragging && !resizing) {
    preventCloseUntil.value = Date.now() + 300
  }
})

const contentDisplay = useComputedStyle(contentElement, 'display')
const isOpen = computed(() => contentDisplay.value !== 'none')

watch(isOpen, (value) => {
  emit('update:isOpen', value)

  // Only add scroll/resize listeners when popover is open
  if (value) {
    addResizeListener()
    addScrollListener()
  } else {
    removeResizeListener()
    removeScrollListener()
    // Cancel any pending position updates when closing
    if (rafId.value !== null) {
      cancelAnimationFrame(rafId.value)
      rafId.value = null
    }
  }
})

watch(
  () => props.isOpen,
  (value) => {
    if (value) {
      setTimeout(() => {
        open()
      }, 0)
    } else {
      close()
    }
  },
  { immediate: true }
)

const classes = computed(() => ({
  content: [
    `polly-popover__content-container--${props.variant}`,
    `polly-popover__content-container--${typeof props.position !== 'function' ? props.position : 'custom'}`,
    {
      'polly-popover__content-container--has-pointer': props.showPointer,
      'polly-popover__content-container--draggable': props.draggable,
      'polly-popover__content-container--resizable': props.resizable,
      'polly-popover__content-container--dragging': isDragging.value,
      'polly-popover__content-container--resizing': isResizing.value,
    },
  ],
  pointer: {
    'polly-popover__content-pointer--horizontal': props.showPointer && !!pointerPosition.value && ['left', 'right'].includes(pointerPosition.value),
    'polly-popover__content-pointer--vertical': props.showPointer && !!pointerPosition.value && ['top', 'bottom'].includes(pointerPosition.value),
    'polly-popover__content-pointer--left': props.showPointer && pointerPosition.value === 'left',
    'polly-popover__content-pointer--top': props.showPointer && pointerPosition.value === 'top',
    'polly-popover__content-pointer--right': props.showPointer && pointerPosition.value === 'right',
    'polly-popover__content-pointer--bottom': props.showPointer && pointerPosition.value === 'bottom',
  },
}))

const contentStyles = computed(() => {
  // Only recalculate position when popover is open
  if (!isOpen.value) {
    return undefined
  }

  // make sure styles gets recomputed when these rects change
  check()
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  targetRect.value
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  contentRect.value
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  dragOffsetX.value
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  dragOffsetY.value

  const target = getTargetElement()
  if (!target || !contentElement.value) {
    return undefined
  }

  let baseStyles: StyleValue | undefined

  switch (props.position) {
    case 'bottom-left':
      baseStyles = autoPosition('left', 'bottom')(target, contentElement.value)
      break
    case 'bottom-right':
      baseStyles = autoPosition('right', 'bottom')(target, contentElement.value)
      break
    case 'bottom-stretch':
      baseStyles = autoPosition('stretch', 'bottom')(target, contentElement.value)
      break
    case 'bottom-center':
      baseStyles = autoPosition('center', 'bottom')(target, contentElement.value)
      break
    case 'top-left':
      baseStyles = autoPosition('left', 'top')(target, contentElement.value)
      break
    case 'top-right':
      baseStyles = autoPosition('right', 'top')(target, contentElement.value)
      break
    case 'top-stretch':
      baseStyles = autoPosition('stretch', 'top')(target, contentElement.value)
      break
    case 'top-center':
      baseStyles = autoPosition('center', 'top')(target, contentElement.value)
      break
    case 'left-center':
      baseStyles = leftCenterPosition(target, contentElement.value)
      break
    case 'right-center':
      baseStyles = rightCenterPosition(target, contentElement.value)
      break
    default:
      if (typeof props.position !== 'function') {
        // eslint-disable-next-line no-console
        console.warn(`p-popover created with unexpected position prop "${props.position}"`)
        return
      }

      baseStyles = props.position(target, contentElement.value)
  }

  if (!baseStyles || typeof baseStyles !== 'object' || Array.isArray(baseStyles)) {
    return baseStyles
  }

  // Combine base position transform with drag offset
  const transform = (baseStyles as Record<string, unknown>).transform as string | undefined
  if (transform) {
    // Parse the base transform to extract x and y
    const match = transform.match(/translate\(([^,]+),\s*([^)]+)\)/)
    if (match) {
      const baseX = parseFloat(match[1])
      const baseY = parseFloat(match[2])
      const newX = baseX + dragOffsetX.value
      const newY = baseY + dragOffsetY.value

      return {
        ...baseStyles,
        transform: `translate(${newX}px, ${newY}px)`,
      }
    }
  }

  return baseStyles
})

const attrs = computed(() => {
  if (props.disabled) {
    return {}
  }

  return {
    popoverTarget: id,
  }
})

const pointerPosition = ref<RelativePosition>()
const pointerStyle = ref<StyleValue>()

watch(contentStyles, () => {
  nextTick(() => {
    pointerPosition.value = getRelativePositionOfTargetToSource(getTargetElement(), contentElement.value)
    pointerStyle.value = getPositionStyles()
  })
})

function getPositionStyles() {
  const { top, left, height, width } = targetRect.value
  const { left: contentLeft, top: contentTop } = contentElement.value?.getBoundingClientRect() ?? { left: 0, top: 0 }
  const pointerIsVertical = !!pointerPosition.value && ['top', 'bottom'].includes(pointerPosition.value)

  return pointerIsVertical
    ? {
        left: createUnitValue(left - contentLeft + width / 2, 'px').toString(),
      }
    : {
        top: createUnitValue(top - contentTop + height / 2, 'px').toString(),
      }
}

function toggle(): void {
  if (props.disabled) {
    return
  }

  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

function open(): void {
  if (props.disabled) {
    return
  }

  contentElement.value?.showPopover()
}

function close(): void {
  if (props.disabled) {
    return
  }

  if (Date.now() < preventCloseUntil.value) {
    return
  }

  contentElement.value?.hidePopover()
}

function getTargetElement(): HTMLElement | null | undefined {
  if (props.targetElement) {
    return props.targetElement
  }

  if (props.targetId) {
    return document.getElementById(props.targetId)
  }

  return targetElement.value
}

watch(
  [() => props.targetElement, () => props.targetId],
  () => {
    removeTriggers()
    addTriggers()
  },
  {
    immediate: true,
  }
)

// Also watch for when the target element actually becomes available
watch(
  () => getTargetElement(),
  (newTarget, oldTarget) => {
    if (newTarget && newTarget !== oldTarget) {
      removeTriggers()
      addTriggers()
    }
  }
)
</script>

<style>
.polly-popover {
  --polly-popover-pointer-width: var(--spacing-xs);
  --polly-popover-translate: translateY(3px);
}

.polly-popover__content-container--has-pointer {
  --polly-popover-pointer-width: 12px;
}

.polly-popover__content-container {
  position: fixed;
  top: 0;
  left: 0;
  margin: calc(var(--polly-popover-pointer-width) + 2px);
  border-radius: var(--border-radius-base);
  box-shadow: var(--shadow-tooltip);
  overflow: visible;
  min-height: min-content;
  will-change: transform;
}

.polly-popover__content-container:popover-open {
  display: flex;
}

.polly-popover__content {
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: var(--border-radius-base);
  background-color: var(--polly-popover-background-color);
  color: var(--polly-popover-color);
  width: fit-content;
  max-width: 350px;
}

.polly-popover__content-container--resizable .polly-popover__content {
  max-width: unset;
}

.polly-popover__content-container--light {
  --polly-popover-background-color: var(--colors-background-common-white);
  --polly-popover-color: var(--colors-text-icon-dark);
  --polly-popover-grabber-color: var(--colors-text-icon-dark);
}

.polly-popover__content-container--dark {
  --polly-popover-background-color: var(--colors-background-common-primary);
  --polly-popover-color: var(--colors-text-icon-light);
  --polly-popover-grabber-color: var(--colors-text-icon-light);
}

.polly-popover__content-pointer {
  height: 24px;
  width: 24px;
  pointer-events: none;
  border-radius: var(--border-radius-xs);
  position: absolute;
  background-color: var(--polly-popover-background-color);
  box-shadow: var(--shadow-tooltip);
  z-index: -1;
}

.polly-popover__content-pointer {
  border-width: var(--polly-popover-pointer-width);
}

.polly-popover__content-pointer--horizontal {
  margin-top: calc(-1 * var(--spacing-sm));
}

.polly-popover__content-pointer--vertical {
  margin-left: calc(-1 * var(--spacing-sm));
}

.polly-popover__content-pointer--top {
  transform: translateY(-16px) rotate(45deg);
  top: 100%;
}

.polly-popover__content-pointer--right {
  transform: translateX(16px) rotate(45deg);
  right: 100%;
}

.polly-popover__content-pointer--bottom {
  transform: translateY(16px) rotate(45deg);
  bottom: 100%;
}

.polly-popover__content-pointer--left {
  transform: translateX(-16px) rotate(45deg);
  left: 100%;
}

.polly-popover__content-container:popover-open {
  opacity: 1;
}

.polly-popover__content-container {
  --transition-duration: 200ms;
  transition:
    opacity var(--transition-duration),
    overlay var(--transition-duration) allow-discrete,
    display var(--transition-duration) allow-discrete,
    transform 0s;
  opacity: 0;
  transform: var(--polly-popover-translate);
}

@starting-style {
  .polly-popover__content-container:popover-open {
    opacity: 0;
    transform: var(--polly-popover-translate);
  }
}

.polly-popover__content-container--draggable {
  user-select: none;
}

.polly-popover__content-container--dragging,
.polly-popover__content-container.polly-popover__content-container--dragging {
  opacity: 0.9;
}

.polly-popover__content-container--resizing,
.polly-popover__content-container.polly-popover__content-container--resizing {
  opacity: 0.9;
}

.polly-popover__grabber {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  user-select: none;
}

.polly-popover__grabber-handle {
  width: var(--spacing-lg);
  height: 4px;
  background-color: var(--polly-popover-grabber-color);
  border-radius: var(--border-radius-base);
  opacity: 0.5;
  transition: opacity 150ms ease-in-out;
}

.polly-popover__grabber--dragging .polly-popover__grabber-handle {
  opacity: 0.8;
}
</style>
