'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useCalendar } from '@/hooks/useCalendar'
import { CalendarEvent } from '@/types/calendar'
import { format, addWeeks, subWeeks, addMonths, subMonths } from '@/utils/dates'
import { WeekView } from './WeekView'
import { MonthGrid } from './MonthGrid'
import { EventDialog } from './EventDialog'
import { Button } from '@/components/shared/Button'
import { cn } from '@/utils/classnames'

type ViewMode = 'month' | 'week'

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>('week')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null)

  const { events, deleteEvent } = useCalendar()

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handlePrevWeek = () => {
    setCurrentDate((prev) => subWeeks(prev, 1))
  }

  const handleNextWeek = () => {
    setCurrentDate((prev) => addWeeks(prev, 1))
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    setCurrentDate(today)
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
    setEditEvent(null)
    setDialogOpen(true)
  }

  const handleEventClick = (event: CalendarEvent) => {
    setEditEvent(event)
    setSelectedDate(undefined)
    setDialogOpen(true)
  }

  const handleNewEvent = () => {
    setSelectedDate(new Date())
    setEditEvent(null)
    setDialogOpen(true)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Calendar Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {viewMode === 'month'
                ? format(currentMonth, 'MMMM yyyy')
                : `${format(currentDate, 'MMM d')} – ${format(
                    addWeeks(currentDate, 0),
                    'MMM d, yyyy'
                  )}`}
            </h2>
            <div className="flex gap-1">
              {viewMode === 'month' ? (
                <>
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handlePrevWeek}
                    className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Previous week"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextWeek}
                    className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Next week"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View mode toggle */}
            <div className="inline-flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1">
              <button
                type="button"
                onClick={() => setViewMode('month')}
                className={cn(
                  'px-3 py-1 text-sm rounded-md transition-colors',
                  viewMode === 'month'
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                Month
              </button>
              <button
                type="button"
                onClick={() => setViewMode('week')}
                className={cn(
                  'px-3 py-1 text-sm rounded-md transition-colors',
                  viewMode === 'week'
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                Week
              </button>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleToday}>
                Today
              </Button>
              <Button onClick={handleNewEvent}>
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        {viewMode === 'month' ? (
          <MonthGrid
            currentMonth={currentMonth}
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
          />
        )}
      </div>

      <EventDialog
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setEditEvent(null)
          setSelectedDate(undefined)
        }}
        selectedDate={selectedDate}
        editEvent={editEvent}
      />
    </>
  )
}