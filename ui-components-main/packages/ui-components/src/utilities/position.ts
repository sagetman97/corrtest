import { PopoverPositionMethod } from '@/types'

import { createUnitValue } from '@/utilities/cssUnitValue'
import { getPxValue } from './computedStyle'
import { getWindowComputedStyle } from './window'

export type RelativePosition = 'left' | 'stretch' | 'right' | 'center'

const roughPointerWidth = 34

export function autoPosition(alignment: RelativePosition, position: 'bottom' | 'top' = 'bottom'): PopoverPositionMethod {
  const bottomPositionMethod = () => {
    switch (alignment) {
      case 'left':
        return bottomLeftPosition
      case 'stretch':
        return bottomStretchPosition
      case 'right':
        return bottomRightPosition
      case 'center':
        return bottomCenterPosition
      default:
        return alignment satisfies never
    }
  }

  const topPositionMethod = () => {
    switch (alignment) {
      case 'left':
        return topLeftPosition
      case 'stretch':
        return topStretchPosition
      case 'right':
        return topRightPosition
      case 'center':
        return topCenterPosition
      default:
        return alignment satisfies never
    }
  }

  return (targetElement, contentElement) => {
    const targetRect = targetElement.getBoundingClientRect()
    const contentRect = contentElement.getBoundingClientRect()
    const contentStyles = getWindowComputedStyle(contentElement)
    const marginTop = getPxValue(contentStyles?.marginTop)
    const marginBottom = getPxValue(contentStyles?.marginBottom)

    // Calculate if popover would be offscreen
    const popoverWouldBeOffscreen =
      position === 'bottom'
        ? targetRect.bottom + contentRect.height + marginTop + marginBottom >= window.innerHeight
        : targetRect.top - contentRect.height - marginTop - marginBottom <= 0

    if (popoverWouldBeOffscreen) {
      return position === 'bottom' ? topPositionMethod()(targetElement, contentElement) : bottomPositionMethod()(targetElement, contentElement)
    }

    return position === 'bottom' ? bottomPositionMethod()(targetElement, contentElement) : topPositionMethod()(targetElement, contentElement)
  }
}

export function bottomLeftPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginLeft = getPxValue(style?.marginLeft)
  const marginRight = getPxValue(style?.marginRight)
  const marginTop = getPxValue(style?.marginTop)
  const marginBottom = getPxValue(style?.marginBottom)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const top = Math.min(targetRect.bottom, window.innerHeight - contentRect.height - marginTop - marginBottom)
  const left = Math.max(Math.min(targetRect.left - paddingLeft - marginLeft, window.innerWidth - contentRect.width - marginLeft - marginRight), 0)

  return {
    transform: `translate(${left}px, ${top}px)`,
  }
}

export function bottomStretchPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginLeft = getPxValue(style?.marginLeft)
  const marginRight = getPxValue(style?.marginRight)
  const marginTop = getPxValue(style?.marginTop)
  const marginBottom = getPxValue(style?.marginBottom)
  const paddingRight = getPxValue(style?.paddingRight)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const top = Math.min(targetRect.bottom, window.innerHeight - contentRect.height - marginTop - marginBottom)
  const left = Math.max(Math.min(targetRect.left - paddingLeft - marginLeft, window.innerWidth - contentRect.width - marginLeft - marginRight), 0)
  const width = createUnitValue(targetRect.width - paddingLeft + paddingRight, 'px')

  return {
    transform: `translate(${left}px, ${top}px)`,
    width: width.toString(),
  }
}

export function bottomRightPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginTop = getPxValue(style?.marginTop)
  const marginRight = getPxValue(style?.marginRight)
  const marginBottom = getPxValue(style?.marginBottom)
  const paddingRight = getPxValue(style?.paddingRight)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const top = Math.min(targetRect.bottom, window.innerHeight - contentRect.height - marginTop - marginBottom)
  const actualLeft = targetRect.right - contentRect.width - paddingLeft - marginRight
  const left = Math.max(actualLeft, 0)
  const width = createUnitValue(Math.min(contentRect.width, targetRect.right - paddingLeft + paddingRight - marginRight), 'px')
  const minWidth = createUnitValue(targetRect.width / 2 + roughPointerWidth, 'px')

  return {
    transform: `translate(${left}px, ${top}px)`,
    width: actualLeft <= 0 ? width.toString() : undefined,
    'min-width': minWidth.toString(),
  }
}

export function topLeftPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginTop = getPxValue(style?.marginTop)
  const marginBottom = getPxValue(style?.marginBottom)
  const marginLeft = getPxValue(style?.marginLeft)
  const marginRight = getPxValue(style?.marginRight)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const top = Math.max(targetRect.top - contentRect.height - marginTop - marginBottom, 0)
  const left = Math.max(Math.min(targetRect.left - paddingLeft - marginLeft, window.innerWidth - contentRect.width - marginLeft - marginRight), 0)

  return {
    transform: `translate(${left}px, ${top}px)`,
  }
}

export function topStretchPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginTop = getPxValue(style?.marginTop)
  const marginBottom = getPxValue(style?.marginBottom)
  const marginLeft = getPxValue(style?.marginLeft)
  const marginRight = getPxValue(style?.marginRight)
  const paddingRight = getPxValue(style?.paddingRight)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const top = Math.max(targetRect.top - contentRect.height - marginTop - marginBottom, 0)
  const left = Math.max(Math.min(targetRect.left - paddingLeft - marginLeft, window.innerWidth - contentRect.width - marginLeft - marginRight), 0)
  const width = createUnitValue(targetRect.width - paddingLeft + paddingRight, 'px')

  return {
    transform: `translate(${left}px, ${top}px)`,
    width: width.toString(),
  }
}

export function topRightPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginTop = getPxValue(style?.marginTop)
  const marginRight = getPxValue(style?.marginRight)
  const marginBottom = getPxValue(style?.marginBottom)
  const paddingRight = getPxValue(style?.paddingRight)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const top = Math.max(targetRect.top - contentRect.height - marginTop - marginBottom, 0)
  const actualLeft = targetRect.right - contentRect.width - paddingRight - marginRight
  const left = Math.max(actualLeft, 0)
  const width = createUnitValue(Math.min(contentRect.width, targetRect.right - paddingLeft + paddingRight - marginRight), 'px')
  const minWidth = createUnitValue(targetRect.width / 2 + roughPointerWidth, 'px')

  return {
    transform: `translate(${left}px, ${top}px)`,
    width: actualLeft <= 0 ? width.toString() : undefined,
    'min-width': minWidth.toString(),
  }
}

export function bottomCenterPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginLeft = getPxValue(style?.marginLeft)
  const marginRight = getPxValue(style?.marginRight)
  const marginTop = getPxValue(style?.marginTop)
  const marginBottom = getPxValue(style?.marginBottom)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const top = Math.min(targetRect.bottom, window.innerHeight - contentRect.height - marginTop - marginBottom)
  const idealLeft = targetRect.left + targetRect.width / 2 - contentRect.width / 2 - paddingLeft - marginLeft
  const left = Math.max(Math.min(idealLeft, window.innerWidth - contentRect.width - marginLeft - marginRight), 0)

  return {
    transform: `translate(${left}px, ${top}px)`,
  }
}

export function topCenterPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginTop = getPxValue(style?.marginTop)
  const marginBottom = getPxValue(style?.marginBottom)
  const marginLeft = getPxValue(style?.marginLeft)
  const marginRight = getPxValue(style?.marginRight)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const top = Math.max(targetRect.top - contentRect.height - marginTop - marginBottom, 0)
  const idealLeft = targetRect.left + targetRect.width / 2 - contentRect.width / 2 - paddingLeft - marginLeft
  const left = Math.max(Math.min(idealLeft, window.innerWidth - contentRect.width - marginLeft - marginRight), 0)

  return {
    transform: `translate(${left}px, ${top}px)`,
  }
}

export function rightCenterPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginTop = getPxValue(style?.marginTop)
  const marginRight = getPxValue(style?.marginRight)
  const marginBottom = getPxValue(style?.marginBottom)
  const marginLeft = getPxValue(style?.marginLeft)
  const paddingRight = getPxValue(style?.paddingRight)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const top = Math.max(
    Math.min(targetRect.top + targetRect.height / 2 - contentRect.height / 2 - marginTop, window.innerHeight - contentRect.height - marginTop - marginBottom),
    0
  )
  const left = targetRect.right
  const maxWidth = createUnitValue(window.innerWidth - targetRect.right - marginLeft - marginRight - paddingLeft - paddingRight - roughPointerWidth, 'px')

  return {
    transform: `translate(${left}px, ${top}px)`,
    'max-width': maxWidth.toString(),
  }
}

export function leftCenterPosition(targetElement: HTMLElement, contentElement: HTMLElement) {
  const contentRect = contentElement.getBoundingClientRect()
  const style = getWindowComputedStyle(contentElement)
  const marginTop = getPxValue(style?.marginTop)
  const marginBottom = getPxValue(style?.marginBottom)
  const marginRight = getPxValue(style?.marginRight)
  const marginLeft = getPxValue(style?.marginLeft)
  const paddingRight = getPxValue(style?.paddingRight)
  const paddingLeft = getPxValue(style?.paddingLeft)

  const targetRect = targetElement.getBoundingClientRect()
  const idealTop = targetRect.top + targetRect.height / 2 - contentRect.height / 2 - marginTop
  const top = Math.max(Math.min(idealTop, window.innerHeight - contentRect.height - marginTop - marginBottom), 0)
  const left = Math.max(targetRect.left - contentRect.width - marginLeft - marginRight, 0)
  const maxWidth = createUnitValue(targetRect.left - marginLeft - marginRight - paddingLeft - paddingRight - roughPointerWidth, 'px')

  return {
    transform: `translate(${left}px, ${top}px)`,
    'max-width': maxWidth.toString(),
  }
}
