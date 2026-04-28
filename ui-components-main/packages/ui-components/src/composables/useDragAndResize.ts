import { computed, MaybeRef, MaybeRefOrGetter, ref, Ref, toRef, watch } from 'vue'

import { useEventListener } from '@/composables'
import { createUnitValue, getPxValue } from '@/utilities'

export type ResizeDirection = 's' | 'e' | 'se'
export type UseDragAndResizeOptions = {
  minWidth?: CSSUnitValue
  minHeight?: CSSUnitValue
  maxWidth?: CSSUnitValue
  maxHeight?: CSSUnitValue
  draggable?: boolean
  resizable?: boolean
  disabled?: boolean
  grabHandle?: MaybeRef<HTMLElement | null | undefined>
  applyTransform?: boolean
}

export type UseDragAndResize = {
  isDragging: Ref<boolean>
  isResizing: Ref<boolean>
  currentDirection: Ref<ResizeDirection | null>
  dragOffsetX: Ref<number>
  dragOffsetY: Ref<number>
  startDrag: (event: MouseEvent) => void
  endDrag: (event?: MouseEvent) => void
  drag: (event: MouseEvent) => void
  resetPosition: () => void
  resetSize: () => void
  enableDrag: () => void
  disableDrag: () => void
  enableResize: () => void
  disableResize: () => void
}

export function useDragAndResize(element: MaybeRef<HTMLElement | null | undefined>, options: MaybeRefOrGetter<UseDragAndResizeOptions> = {}): UseDragAndResize {
  const elementRef = toRef(element)
  const optionsRef = toRef(options)
  const grabHandle = computed<HTMLElement | null | undefined>(() => {
    const handle = optionsRef.value.grabHandle
    return handle ? toRef(handle).value : undefined
  })

  const isDragging = ref(false)
  const isResizing = ref(false)
  const dragDisabled = ref(false)
  const resizeDisabled = ref(false)

  // Update disabled state when options change
  watch(
    optionsRef,
    (newOptions) => {
      dragDisabled.value = newOptions.draggable === false || newOptions.disabled === true
      resizeDisabled.value = newOptions.resizable === false || newOptions.disabled === true
    },
    { immediate: true }
  )

  const initialX = ref(0)
  const initialY = ref(0)
  const currentX = ref(0)
  const currentY = ref(0)

  const currentDirection = ref<ResizeDirection | null>(null)
  const startWidth = ref(0)
  const startHeight = ref(0)
  const startX = ref(0)
  const startY = ref(0)
  const originalWidth = ref(0)
  const originalHeight = ref(0)
  const EDGE_THRESHOLD = 8

  const resetPosition = () => {
    if (!elementRef.value) return

    if (optionsRef.value.applyTransform !== false) {
      elementRef.value.style.transition = 'transform 150ms ease-in-out'
    }
    currentX.value = 0
    currentY.value = 0
    if (optionsRef.value.applyTransform !== false) {
      elementRef.value.style.transform = 'translate(0, 0)'
      setTimeout(() => {
        if (!elementRef.value) return
        elementRef.value.style.transition = ''
      }, 150)
    }
  }

  const startDrag = (event: MouseEvent) => {
    if (!elementRef.value || dragDisabled.value || isResizing.value) return

    // Check if we're trying to resize - if so, don't start dragging
    const direction = getResizeDirection(event)
    if (direction && !resizeDisabled.value) return

    isDragging.value = true

    // Store initial mouse position relative to current drag offset
    // This allows us to continue from where we left off
    initialX.value = event.clientX - currentX.value
    initialY.value = event.clientY - currentY.value

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'
    elementRef.value.style.cursor = 'grabbing'
    elementRef.value.style.transitionDuration = '0s'
  }

  const drag = (event: MouseEvent) => {
    if (!isDragging.value || !elementRef.value || dragDisabled.value || isResizing.value) return

    const element = elementRef.value
    const rect = element.getBoundingClientRect()

    // Calculate new position
    let x = event.clientX - initialX.value
    let y = event.clientY - initialY.value

    // Get document dimensions (including scroll area)
    const docElement = document.documentElement
    const maxWidth = Math.max(docElement.clientWidth, docElement.scrollWidth, docElement.offsetWidth)
    const maxHeight = Math.max(docElement.clientHeight, docElement.scrollHeight, docElement.offsetHeight)

    // Calculate bounds
    const originalRect = element.getBoundingClientRect()
    const originalLeft = originalRect.left - currentX.value + window.scrollX
    const originalTop = originalRect.top - currentY.value + window.scrollY

    // Constrain to document bounds (including scroll area)
    const minX = -originalLeft
    const maxX = maxWidth - (originalLeft + rect.width)
    const minY = -originalTop
    const maxY = maxHeight - (originalTop + rect.height)

    x = Math.max(minX, Math.min(maxX, x))
    y = Math.max(minY, Math.min(maxY, y))

    currentX.value = x
    currentY.value = y

    // Apply transform only if applyTransform is not explicitly set to false
    if (optionsRef.value.applyTransform !== false) {
      element.style.transform = `translate(${x}px, ${y}px)`
    }
  }

  const endDrag = (event?: MouseEvent) => {
    if (!elementRef.value || !isDragging.value) return

    // Stop event propagation to prevent click events from bubbling
    // This prevents popovers from auto-closing when drag ends
    if (event) {
      event.stopPropagation()
      event.preventDefault()
    }

    isDragging.value = false
    document.body.style.userSelect = ''
    document.body.style.cursor = 'default'

    if (!elementRef.value) return

    if (!resizeDisabled.value) {
      updateCursor(null)
    } else if (!dragDisabled.value) {
      // Apply cursor to grab handle if specified, otherwise to the element
      if (grabHandle.value) {
        grabHandle.value.style.cursor = 'grab'
      } else if (elementRef.value) {
        elementRef.value.style.cursor = 'grab'
      }
    } else {
      // Apply default cursor
      if (grabHandle.value) {
        grabHandle.value.style.cursor = 'default'
      } else if (elementRef.value) {
        elementRef.value.style.cursor = 'default'
      }
    }

    elementRef.value.style.transitionDuration = ''
  }

  function getResizeDirection(event: MouseEvent): ResizeDirection | null {
    if (!elementRef.value || resizeDisabled.value) return null

    const rect = elementRef.value.getBoundingClientRect()
    const { clientX, clientY } = event
    const x = clientX - rect.left
    const y = clientY - rect.top

    // Only check for south and east edges
    const isSouth = y >= rect.height - EDGE_THRESHOLD
    const isEast = x >= rect.width - EDGE_THRESHOLD

    // Only allow resizing from right and bottom edges
    if (isSouth && isEast) return 'se'
    if (isSouth) return 's'
    if (isEast) return 'e'

    return null
  }

  function updateCursor(direction: ResizeDirection | null) {
    if (!elementRef.value) return

    const cursorMap: Record<ResizeDirection, string> = {
      s: 'ns-resize',
      e: 'ew-resize',
      se: 'nwse-resize',
    }

    // Determine the cursor style
    const cursorStyle = direction ? cursorMap[direction] : dragDisabled.value ? 'default' : 'grab'

    // Apply cursor to the appropriate element
    if (direction) {
      // For resize cursors, only apply to the main element when over an edge
      elementRef.value.style.cursor = cursorStyle
    } else {
      // For drag cursors, apply to the grab handle if specified, otherwise to the element
      if (grabHandle.value) {
        grabHandle.value.style.cursor = cursorStyle
        // Reset the main element cursor if we're using a grab handle
        elementRef.value.style.cursor = 'default'
      } else {
        elementRef.value.style.cursor = cursorStyle
      }
    }
  }

  function startResize(event: MouseEvent) {
    const direction = getResizeDirection(event)
    if (!elementRef.value || resizeDisabled.value || !direction) return

    // Stop event propagation to prevent dragging
    event.stopPropagation()
    event.preventDefault()

    isResizing.value = true
    currentDirection.value = direction

    const rect = elementRef.value.getBoundingClientRect()
    startWidth.value = rect.width
    startHeight.value = rect.height
    startX.value = event.clientX
    startY.value = event.clientY

    if (originalWidth.value === 0) {
      originalWidth.value = rect.width
      originalHeight.value = rect.height
    }

    document.body.style.cursor = elementRef.value.style.cursor
    document.body.style.userSelect = 'none'
  }

  function resize(event: MouseEvent) {
    if (!isResizing.value || !elementRef.value || !currentDirection.value) return

    // Stop event propagation to prevent dragging
    event.stopPropagation()
    event.preventDefault()

    const element = elementRef.value
    const direction = currentDirection.value
    const deltaX = event.clientX - startX.value
    const deltaY = event.clientY - startY.value

    let newWidth = startWidth.value
    let newHeight = startHeight.value

    // Only handle east and south directions
    if (direction.includes('e')) newWidth += deltaX
    if (direction.includes('s')) newHeight += deltaY

    const currentOptions = optionsRef.value
    const minWidth = currentOptions.minWidth ?? createUnitValue(100, 'px')
    const minHeight = currentOptions.minHeight ?? createUnitValue(100, 'px')
    const maxWidth = currentOptions.maxWidth ?? createUnitValue(window.innerWidth, 'px')
    const maxHeight = currentOptions.maxHeight ?? createUnitValue(window.innerHeight, 'px')

    newWidth = Math.max(getPxValue(minWidth.toString()), Math.min(newWidth, getPxValue(maxWidth.toString())))
    newHeight = Math.max(getPxValue(minHeight.toString()), Math.min(newHeight, getPxValue(maxHeight.toString())))

    element.style.width = `${newWidth}px`
    element.style.height = `${newHeight}px`
  }

  function endResize(event: MouseEvent) {
    if (!isResizing.value) return

    // Stop event propagation to prevent dragging and click events
    // This prevents popovers from auto-closing when resize ends
    event.stopPropagation()
    event.preventDefault()

    // Add a small delay to ensure click events don't trigger
    setTimeout(() => {
      isResizing.value = false
      currentDirection.value = null
      document.body.style.cursor = ''
      document.body.style.userSelect = ''

      // Reset cursor based on current state
      if (!elementRef.value) return

      if (!dragDisabled.value) {
        elementRef.value.style.cursor = 'grab'
      } else {
        elementRef.value.style.cursor = 'default'
      }
    }, 0)
  }

  function resetSize() {
    if (!elementRef.value || resizeDisabled.value || !originalWidth.value) return

    const element = elementRef.value
    element.style.transition = 'width 0.2s, height 0.2s'
    element.style.width = `${originalWidth.value}px`
    element.style.height = `${originalHeight.value}px`

    setTimeout(() => {
      if (element) {
        element.style.transition = ''
      }
    }, 200)
  }

  function handleDoubleClick(event: MouseEvent) {
    const direction = getResizeDirection(event)
    if (direction) {
      event.stopPropagation()
      event.preventDefault()
      resetSize()
    } else {
      resetPosition()
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isResizing.value && !isDragging.value) {
      const direction = getResizeDirection(event)
      if (direction && !resizeDisabled.value) {
        event.stopPropagation()
        updateCursor(direction)
      } else {
        updateCursor(null)
      }
    }
  }

  function enableDrag() {
    dragDisabled.value = false
    if (!resizeDisabled.value) {
      if (grabHandle.value) {
        grabHandle.value.style.cursor = 'grab'
      } else if (elementRef.value) {
        elementRef.value.style.cursor = 'grab'
      }
    }
  }

  function disableDrag() {
    dragDisabled.value = true
    if (isDragging.value) {
      endDrag()
    }
    resetPosition()

    // Reset cursor on grab handle or element
    if (resizeDisabled.value) {
      if (grabHandle.value) {
        grabHandle.value.style.cursor = 'default'
      } else if (elementRef.value) {
        elementRef.value.style.cursor = 'default'
      }
    }
  }

  function enableResize() {
    resizeDisabled.value = false
  }

  function disableResize() {
    resizeDisabled.value = true
    if (isResizing.value) {
      endResize({} as MouseEvent)
    }
    updateCursor(null)
  }

  // Event listeners setup
  function setupDragListeners(target: HTMLElement): () => void {
    const listener = useEventListener(target, 'mousedown', (event: MouseEvent) => {
      if (!dragDisabled.value) {
        startDrag(event)
      }
    })

    return () => {
      listener.remove()
    }
  }

  // Event listeners for resize (always on main element)
  useEventListener(elementRef, 'mousedown', (event: MouseEvent) => {
    const direction = getResizeDirection(event)
    if (direction && !resizeDisabled.value) {
      startResize(event)
    }
  })

  // Handle drag listeners based on grab handle presence
  let dragListenerCleanup: (() => void) | undefined

  // Watch for changes in both the element and grab handle
  watch(
    [elementRef, grabHandle],
    ([element, handle]) => {
      // Clean up existing listener if any
      if (dragListenerCleanup) {
        dragListenerCleanup()
        dragListenerCleanup = undefined
      }

      if (!element) return

      // Add listener to either handle or main element
      if (handle) {
        dragListenerCleanup = setupDragListeners(handle)
      } else {
        dragListenerCleanup = setupDragListeners(element)
      }
    },
    { immediate: true }
  )

  // Other event listeners
  useEventListener(elementRef, 'dblclick', handleDoubleClick)
  useEventListener(elementRef, 'mousemove', handleMouseMove)
  useEventListener(elementRef, 'mouseenter', () => {
    if (!isResizing.value && !isDragging.value) {
      updateCursor(null)
    }
  })
  useEventListener(elementRef, 'mouseleave', () => {
    if (!isResizing.value && !isDragging.value) {
      updateCursor(null)
    }
  })

  useEventListener(document, 'mousemove', (event: MouseEvent) => {
    if (isResizing.value) {
      resize(event)
    } else if (isDragging.value) {
      drag(event)
    }
  })

  useEventListener(document, 'mouseup', (event: MouseEvent) => {
    if (isResizing.value) {
      endResize(event)
    } else if (isDragging.value) {
      endDrag(event)
    }
  })

  // currentX and currentY represent the accumulated drag offset
  const dragOffsetX = computed(() => currentX.value)
  const dragOffsetY = computed(() => currentY.value)

  return {
    isDragging,
    isResizing,
    currentDirection,
    dragOffsetX,
    dragOffsetY,
    startDrag,
    endDrag,
    drag,
    resetPosition,
    resetSize,
    enableDrag,
    disableDrag,
    enableResize,
    disableResize,
  }
}
