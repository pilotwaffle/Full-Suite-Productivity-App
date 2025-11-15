'use client'

import { CalendarEvent } from '@/types/calendar'
import { cn } from '@/utils/classnames'
import { isSameDay, isToday } from '@/utils/dates'

interface DayCellProps {
  date: Date
  currentMonth: Date
  events: CalendarEvent[]
  onDayClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

export function DayCell({
  date,
  currentMonth,
  events,
  onDayClick,
  onEventClick,
}: DayCellProps) {
  const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
  const isCurrentDay = isToday(date)

  const dayEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate)
    return isSameDay(eventDate, date)
  })

  return (
    <div
      className={cn(
        'min-h-[100px] border border-slate-200 dark:border-slate-700 p-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors',
        !isCurrentMonth && 'bg-slate-50 dark:bg-slate-800/50'
      )}
      onClick={() => onDayClick(date)}
    >
      <div
        className={cn(
          'text-sm font-medium mb-1 text-slate-900 dark:text-white',
          !isCurrentMonth && 'text-slate-400 dark:text-slate-500',
          isCurrentDay &&
            'w-7 h-7 flex items-center justify-center rounded-full bg-primary-600 text-white'
        )}
      >
        {date.getDate()}
      </div>

      <div className="space-y-1">
        {dayEvents.slice(0, 3).map((event) => (
          <button
            key={event.id}
            onClick={(e) => {
              e.stopPropagation()
              onEventClick(event)
            }}
            className={cn(
              'w-full text-left px-2 py-1 rounded text-xs font-medium truncate',
              'hover:opacity-80 transition-opacity',
              event.color
                ? `bg-[${event.color}] text-white`
                : 'bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300'
            )}
            style={event.color ? { backgroundColor: event.color } : undefined}
          >
            {event.title}
          </button>
        ))}
        {dayEvents.length > 3 && (
          <div className="text-xs text-slate-500 dark:text-slate-400 px-2">
            +{dayEvents.length - 3} more
          </div>
        )}
      </div>
    </div>
  )
}