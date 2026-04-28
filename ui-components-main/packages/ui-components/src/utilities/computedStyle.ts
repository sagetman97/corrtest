import { globalExists } from './global'

export function getPxValue(value?: string): number {
  if (!value) return 0

  const possibleValue = Number(value.replace('px', ''))

  return isNaN(possibleValue) ? 0 : possibleValue
}

export type ViewportUnit = 'vw' | 'vh'

/**
 * Converts viewport units (vw or vh) to their equivalent pixel values.
 *
 * @param value - The numeric value (%) to convert
 * @param unit - The viewport unit type ('vw' for viewport width or 'vh' for viewport height)
 * @returns The calculated pixel value as a number, or 0 if window is not available or inputs are invalid
 *
 * @example
 * ```typescript
 * convertViewportToPx(50, 'vw') // returns 50% of viewport width in pixels
 * convertViewportToPx(100, 'vh') // returns 100% of viewport height in pixels
 * ```
 */
export function convertViewportToPx(value: number, unit: ViewportUnit): number {
  // Handle SSR or invalid window context
  if (!globalExists('window')) {
    return 0
  }

  // Validate input value
  if (isNaN(value)) {
    return 0
  }

  // Calculate based on unit type
  if (unit === 'vw') {
    return (value / 100) * window.innerWidth
  }

  if (unit === 'vh') {
    return (value / 100) * window.innerHeight
  }

  return 0
}
