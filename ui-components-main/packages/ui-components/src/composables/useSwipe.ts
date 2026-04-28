import { Ref, ref } from 'vue'

import { useEventListener } from '@/composables'

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null
export type UseSwipeOptions = {
  direction?: 'horizontal' | 'vertical' | 'both'
}

export type UseSwipe = {
  swipeDirection: Ref<SwipeDirection>
}

export function useSwipe(
  element: HTMLElement | Ref<HTMLElement | null | undefined>,
  { direction }: UseSwipeOptions = { direction: 'both' },
  handler?: (direction: SwipeDirection) => void,
  transformTarget?: HTMLElement | Ref<HTMLElement | null | undefined>
) {
  const swipeDirection = ref<SwipeDirection>(null)
  const startX = ref<number>(0)
  const startY = ref<number>(0)
  const endX = ref<number>(0)
  const endY = ref<number>(0)
  const elementRef = ref(element)
  const transformTargetRef = ref(transformTarget)

  function onTouchStart(event: TouchEvent) {
    startX.value = event.touches[0].clientX
    startY.value = event.touches[0].clientY

    if (!elementRef.value) return
    elementRef.value.classList.add('polly-swipe--dragging')
  }

  function onTouchMove(event: TouchEvent) {
    if (!elementRef.value) return

    const deltaX = event.touches[0].clientX - startX.value
    const deltaY = event.touches[0].clientY - startY.value
    let transformX = 'translateX(0)'
    let transformY = 'translateY(0)'

    if (direction === 'horizontal' || direction === 'both') {
      transformX = deltaX < 0 ? 'translateX(0)' : `translateX(${deltaX}px)`
    }
    if (direction === 'vertical' || direction === 'both') {
      transformY = deltaY < 0 ? 'translateY(0)' : `translateY(${deltaY}px)`
    }

    const elementTransform = `${transformX} ${transformY}`
    if (transformTargetRef.value) {
      transformTargetRef.value.style.transform = elementTransform
    } else {
      elementRef.value.style.transform = elementTransform
    }
  }

  function onTouchEnd(event: TouchEvent) {
    endX.value = event.changedTouches[0].clientX
    endY.value = event.changedTouches[0].clientY

    const deltaX = endX.value - startX.value
    const deltaY = endY.value - startY.value

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        swipeDirection.value = 'right'
      } else {
        swipeDirection.value = 'left'
      }
    } else {
      if (deltaY > 0) {
        swipeDirection.value = 'down'
      } else {
        swipeDirection.value = 'up'
      }
    }

    if (handler) handler(swipeDirection.value)

    if (elementRef.value) elementRef.value.classList.remove('polly-swipe--dragging')
  }

  useEventListener(elementRef, 'touchstart', onTouchStart)
  useEventListener(elementRef, 'touchend', onTouchEnd)
  useEventListener(elementRef, 'touchmove', onTouchMove)
}
