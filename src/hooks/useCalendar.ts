import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CalendarEvent, CalendarFormData } from '@/types/calendar'
import { LOCAL_STORAGE_KEYS, STORAGE_VERSION } from '@/lib/constants'
import { generateId } from '@/utils/id'

interface CalendarStore {
  events: CalendarEvent[]
  addEvent: (data: CalendarFormData) => void
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void
  getEventsForDate: (date: Date) => CalendarEvent[]
  getEventsForMonth: (year: number, month: number) => CalendarEvent[]
}

export const useCalendar = create<CalendarStore>()(
  persist(
    (set, get) => ({
      events: [],

      addEvent: (data) =>
        set((state) => ({
          events: [
            ...state.events,
            {
              id: generateId(),
              title: data.title,
              description: data.description,
              startDate: data.startDate.getTime(),
              endDate: data.endDate.getTime(),
              allDay: data.allDay,
              color: data.color,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          ],
        })),

      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? { ...event, ...updates, updatedAt: Date.now() }
              : event
          ),
        })),

      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),

      getEventsForDate: (date) => {
        const startOfDay = new Date(date)
        startOfDay.setHours(0, 0, 0, 0)
        const endOfDay = new Date(date)
        endOfDay.setHours(23, 59, 59, 999)

        return get().events.filter((event) => {
          const eventStart = new Date(event.startDate)
          const eventEnd = new Date(event.endDate)
          return eventStart <= endOfDay && eventEnd >= startOfDay
        })
      },

      getEventsForMonth: (year, month) => {
        const startOfMonth = new Date(year, month, 1)
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999)

        return get().events.filter((event) => {
          const eventStart = new Date(event.startDate)
          const eventEnd = new Date(event.endDate)
          return eventStart <= endOfMonth && eventEnd >= startOfMonth
        })
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.CALENDAR_EVENTS,
      version: STORAGE_VERSION,
    }
  )
)
