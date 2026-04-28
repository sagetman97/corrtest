import { UTCDate } from '@date-fns/utc'
import { isDate } from 'date-fns'

import { RelativePosition } from '@/utilities'
import { BaseInputProps, InputSlots } from './input'
import { LabelProps, LabelSlots } from './label'

export type DateFormats = string | Date | number
export type TupleFormat = [hour: number | undefined, minute: number | undefined]

export function toDate(value: DateFormats): Date {
  if (value === null || isDate(value)) {
    return value
  }

  return new UTCDate(value)
}

export type CalendarProps = {
  disabled?: boolean
  dateIsDisabled?: (date: Date) => boolean
  min?: DateFormats | null | undefined
  max?: DateFormats | null | undefined
  monthsShown?: number
  clearable?: boolean
  hideToday?: boolean
}

export type CalendarSlots = MonthSlots & {
  actions?: (props: { dateValue: Date | null }) => unknown
  date?: (props: { date: Date; isSelected: boolean; isToday: boolean }) => unknown
}

export type MonthProps = {
  viewingDate: DateFormats
  hideOffDates?: boolean
}

export type MonthSlots = {
  date?: (props: { date: Date }) => unknown
}

export type DatePickerProps = LabelProps &
  BaseInputProps &
  CalendarProps & {
    variant?: 'default' | 'simple'
    position?: RelativePosition
  }

export type DatePickerSlots = LabelSlots & InputSlots

export type TimePickerProps = LabelProps &
  BaseInputProps & {
    disabled?: boolean
  }

export type TimePickerSlots = LabelSlots & InputSlots
