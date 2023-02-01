import { format } from 'date-fns'

function safeDate(date: Date | string) {
  return date instanceof Date ? date : new Date(date)
}

export function shortDate(date: Date | string) {
  return format(safeDate(date), 'd MMM yyyy')
}

export function isoDate(date: Date | string) {
  try {
    return safeDate(date).toISOString()
  } catch (err) {
    console.error(date, err)
    return ''
  }
}
