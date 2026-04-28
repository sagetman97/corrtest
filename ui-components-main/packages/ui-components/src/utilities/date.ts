import { UTCDate } from '@date-fns/utc'
import { getHours, getMinutes, set, startOfDay } from 'date-fns'

import { DateFormats, TupleFormat } from '@/types'

export function convertDateToTuple(value: DateFormats | undefined | null): TupleFormat {
  if (value) {
    return [getHours(value), getMinutes(value)]
  }

  return [undefined, undefined]
}

export function convertTupleToDate(value: TupleFormat): UTCDate | undefined {
  const dateValue = startOfDay(new UTCDate())
  const [hours, minutes] = value

  if (hours === undefined || minutes === undefined) {
    return undefined
  }

  return set(dateValue, { hours, minutes })
}
