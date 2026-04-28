export type RelativePosition = 'left' | 'top' | 'right' | 'bottom'

export function getRelativePositionOfTargetToSource(targetElement?: Element | null, sourceElement?: Element | null): RelativePosition {
  const {
    top: targetTop,
    right: targetRight,
    bottom: targetBottom,
    left: targetLeft,
  } = targetElement?.getBoundingClientRect() ?? { top: 0, right: 0, bottom: 0, left: 0 }
  const {
    top: sourceTop,
    right: sourceRight,
    bottom: sourceBottom,
    left: sourceLeft,
  } = sourceElement?.getBoundingClientRect() ?? { top: 0, right: 0, bottom: 0, left: 0 }
  const distanceBottom = Math.abs(sourceTop - targetBottom)

  const distanceLeft = Math.abs(sourceRight - targetLeft)

  const distanceTop = Math.abs(sourceBottom - targetTop)

  const distanceRight = Math.abs(sourceLeft - targetRight)
  const minDistance = Math.min(distanceTop, distanceBottom, distanceLeft, distanceRight)

  if (minDistance === distanceTop) {
    return 'top'
  } else if (minDistance === distanceBottom) {
    return 'bottom'
  } else if (minDistance === distanceLeft) {
    return 'left'
  } else if (minDistance === distanceRight) {
    return 'right'
  }

  throw 'failed to get relative position of elements'
}
