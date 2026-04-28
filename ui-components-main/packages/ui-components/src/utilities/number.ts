export function isNumber(value: unknown): value is string {
  if (typeof value !== 'string') return false

  return (
    // @ts-expect-error this function DOES accept strings
    !isNaN(value) && // less forgiving than parseFloat, which will find a number inside an otherwise invalid string
    !isNaN(parseFloat(value)) // some circumstances isNaN will return false but parseFloat returns NaN like whitespace
  )
}

export function isInteger(value: unknown): value is string {
  return isNumber(value) && Number.isInteger(parseFloat(value))
}

export type NumberFormattingOptions = {
  locales?: Intl.LocalesArgument
  options?: Intl.NumberFormatOptions
}

const defaultNumberFormattingOptions: NumberFormattingOptions = {
  locales: 'en-US',
  options: {
    maximumFractionDigits: 20,
    useGrouping: true,
  },
}

export function formatLocaleString(value: number, format: Partial<NumberFormattingOptions> = {}): string {
  const { locales, options } = {
    locales: format.locales ?? defaultNumberFormattingOptions.locales,
    options: {
      ...defaultNumberFormattingOptions.options,
      ...format.options,
    },
  }

  return value.toLocaleString(locales, options)
}
