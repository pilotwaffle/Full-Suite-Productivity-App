'use client'

import { CalendarEvent } from '@/types/calendar'
import { getMonthGrid } from '@/utils/dates'
import { DayCell } from './DayCell'

interface MonthGridProps {
  currentMonth: Date
  events: CalendarEvent[]
  onDayClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function MonthGrid({
  currentMonth,
  events,
  onDayClick,
  onEventClick,
}: MonthGridProps) {
  const days = getMonthGrid(currentMonth.getFullYear(), currentMonth.getMonth())

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((date, index) => (
          <DayCell
            key={index}
            date={date}
            currentMonth={currentMonth}
            events={events}
            onDayClick={onDayClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  )
}