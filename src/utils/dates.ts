import {
  format,
  formatDistance,
  formatRelative,
  isToday,
  isTomorrow,
  isYesterday,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
} from 'date-fns'

export {
  format,
  formatDistance,
  formatRelative,
  isToday,
  isTomorrow,
  isYesterday,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
}

export function formatDate(date: Date | number, formatStr: string = 'PPP'): string {
  return format(new Date(date), formatStr)
}

export function formatTime(date: Date | number): string {
  return format(new Date(date), 'p')
}

export function formatDateTime(date: Date | number): string {
  return format(new Date(date), 'PPp')
}

export function getRelativeTime(date: Date | number): string {
  const d = new Date(date)

  if (isToday(d)) return 'Today'
  if (isTomorrow(d)) return 'Tomorrow'
  if (isYesterday(d)) return 'Yesterday'

  return formatRelative(d, new Date())
}

export function getMonthGrid(year: number, month: number): Date[] {
  const firstDay = startOfMonth(new Date(year, month))
  const startDate = startOfWeek(firstDay, { weekStartsOn: 0 })
  const lastDay = endOfMonth(new Date(year, month))
  const endDate = endOfWeek(lastDay, { weekStartsOn: 0 })

  return eachDayOfInterval({ start: startDate, end: endDate })
}
