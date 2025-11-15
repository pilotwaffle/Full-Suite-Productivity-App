'use client'

import { useMemo } from 'react'
import { CalendarEvent } from '@/types/calendar'
import { cn } from '@/utils/classnames'

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6) // 06:00–22:00

interface WeekViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onDayClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}

function startOfWeekSunday(date: Date) {
  const d = new Date(date)
  const diff = d.getDay() // 0 = Sunday
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function WeekView({
  currentDate,
  events,
  onDayClick,
  onEventClick,
}: WeekViewProps) {
  const start = startOfWeekSunday(currentDate)

  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start)
        d.setDate(start.getDate() + i)
        return d
      }),
    [start]
  )

  const eventsByDayHour = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()

    for (const event of events) {
      const date = new Date(event.startDate)
      const key = `${date.toDateString()}-${date.getHours()}`
      const list = map.get(key) ?? []
      list.push(event)
      map.set(key, list)
    }

    return map
  }, [events])

  return (
    <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      {/* Header row: Time + Sunday–Saturday */}
      <div className="grid grid-cols-[72px_repeat(7,1fr)] border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <div className="py-3 px-2 text-xs font-semibold text-slate-500 dark:text-slate-300 text-right">
          Time
        </div>
        {days.map((day) => (
          <button
            key={day.toDateString()}
            type="button"
            onClick={() => onDayClick(day)}
            className="py-3 px-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
          >
            <div>
              {day.toLocaleDateString(undefined, {
                weekday: 'short',
              })}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-300">
              {day.getMonth() + 1}/{day.getDate()}
            </div>
          </button>
        ))}
      </div>

      {/* Time grid */}
      <div className="max-h-[600px] overflow-y-auto">
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[72px_repeat(7,1fr)] border-b border-slate-100 dark:border-slate-800"
          >
            <div className="py-2 px-2 text-xs text-right text-slate-500 dark:text-slate-400">
              {hour.toString().padStart(2, '0')}:00
            </div>

            {days.map((day) => {
              const key = `${day.toDateString()}-${hour}`
              const slotEvents = eventsByDayHour.get(key) ?? []

              return (
                <div
                  key={key}
                  className="relative h-16 border-l border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
                  onClick={() => onDayClick(day)}
                >
                  <div className="absolute inset-1 flex flex-col gap-1">
                    {slotEvents.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onEventClick(event)
                        }}
                        className={cn(
                          'w-full rounded-md px-1.5 py-0.5 text-[11px] text-left text-white shadow-sm',
                          'hover:opacity-90 transition-opacity'
                        )}
                        style={{ backgroundColor: event.color ?? '#3b82f6' }}
                      >
                        <div className="truncate font-medium">
                          {event.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}