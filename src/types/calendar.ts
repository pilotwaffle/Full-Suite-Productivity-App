export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: number
  endDate: number
  allDay: boolean
  color?: string
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    interval: number
    endDate?: number
  }
  createdAt: number
  updatedAt: number
}

export interface CalendarFormData {
  title: string
  description?: string
  startDate: Date
  endDate: Date
  allDay: boolean
  color?: string
}

export interface DayCell {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
}
