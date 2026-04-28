import { BaseInputProps, LabelProps } from '@/types'

export type TextareaProps = LabelProps &
  BaseInputProps & {
    modelValue: string | number | undefined | null
  }

export type TextareaEmits = {
  'update:modelValue': [value: string | number | null]
}
