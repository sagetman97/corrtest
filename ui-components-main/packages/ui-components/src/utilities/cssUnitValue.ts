import { AnyFunction } from '@/utilities/function'
import { globalExists } from '@/utilities/global'

// this is a mediocre polyfill intended to enable use of CSSUnitValue syntax while also supporting Firefox
// https://caniuse.com/?search=CSSUnitValue
// https://bugzilla.mozilla.org/show_bug.cgi?id=1278697
export function createUnitValue(value: number, unit: string): CSSUnitValue {
  if (globalExists('CSSUnitValue')) {
    return new CSSUnitValue(value, unit)
  }

  const notImplemented: AnyFunction = () => {
    throw 'not implemented'
  }

  return {
    unit,
    value,
    toString: () => {
      return `${value}${unit}`
    },
    add: notImplemented,
    div: notImplemented,
    equals: notImplemented,
    max: notImplemented,
    min: notImplemented,
    mul: notImplemented,
    sub: notImplemented,
    to: notImplemented,
    toSum: notImplemented,
    type: notImplemented,
  }
}
