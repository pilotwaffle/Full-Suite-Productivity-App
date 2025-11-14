import { CalendarView } from '@/components/calendar/CalendarView'

export default function CalendarPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Calendar</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Schedule and manage your events and appointments.
        </p>
      </div>

      <CalendarView />
    </div>
  )
}
