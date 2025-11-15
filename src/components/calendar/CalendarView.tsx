'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useCalendar } from '@/hooks/useCalendar'
import { CalendarEvent } from '@/types/calendar'
import { format, addMonths, subMonths } from '@/utils/dates'
import { MonthGrid } from './MonthGrid'
import { EventDialog } from './EventDialog'
import { Button } from '@/components/shared/Button'

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
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

  const handleToday = () => {
    setCurrentMonth(new Date())
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-1">
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
            </div>
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

        {/* Calendar Grid */}
        <MonthGrid
          currentMonth={currentMonth}
          events={events}
          onDayClick={handleDayClick}
          onEventClick={handleEventClick}
        />
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