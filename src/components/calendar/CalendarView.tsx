'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, ArrowRight } from 'lucide-react'
import { useCalendar } from '@/hooks/useCalendar'
import { CalendarEvent } from '@/types/calendar'
import { format, addWeeks, subWeeks, addMonths, subMonths } from '@/utils/dates'
import { WeekView } from './WeekView'
import { MonthGrid } from './MonthGrid'
import { EventDialog } from './EventDialog'
import { Button } from '@/components/shared/Button'
import { EnhancedEmptyState } from '@/components/shared/EnhancedEmptyState'
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

  // Check if there are any events in the current view
  const getEventsInCurrentView = () => {
    if (viewMode === 'month') {
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

      return events.filter(event => {
        const eventStart = new Date(event.startDate)
        const eventEnd = new Date(event.endDate)
        return eventStart <= endOfMonth && eventEnd >= startOfMonth
      })
    } else {
      // Week view
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      startOfWeek.setHours(0, 0, 0, 0)

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      endOfWeek.setHours(23, 59, 59, 999)

      return events.filter(event => {
        const eventStart = new Date(event.startDate)
        const eventEnd = new Date(event.endDate)
        return eventStart <= endOfWeek && eventEnd >= startOfWeek
      })
    }
  }

  const currentViewEvents = getEventsInCurrentView()
  const hasNoEvents = currentViewEvents.length === 0 && events.length === 0

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
        {hasNoEvents ? (
          <EnhancedEmptyState
            icon={Calendar}
            title="No events scheduled"
            description="Start planning your schedule by creating your first event"
            primaryAction={{
              label: 'Create Your First Event',
              icon: Plus,
              variant: 'primary'
            }}
            secondaryActions={[
              {
                label: 'Import from Todos',
                href: '/todos',
                icon: Clock
              },
              {
                label: 'View Tutorial',
                href: '/landing',
                icon: ArrowRight
              }
            ]}
          />
        ) : (
          <>
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

            {/* If there are events but none in current view */}
            {currentViewEvents.length === 0 && !hasNoEvents && (
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  No events in this {viewMode}. Try navigating to a different time period or create a new event.
                </p>
              </div>
            )}
          </>
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