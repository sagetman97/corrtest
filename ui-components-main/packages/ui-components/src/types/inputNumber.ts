import { InputProps } from '@/types'

import { NumberFormattingOptions } from '@/utilities/number'

export type InputNumberProps = InputProps & {
  modelValue: string | null | undefined
  format?: NumberFormattingOptions | ((value: number) => string)
}

export type InputNumberEmits = {
  'update:modelValue': [value: string | null]
}
