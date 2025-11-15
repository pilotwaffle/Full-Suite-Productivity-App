import { CalendarView } from '@/components/calendar/CalendarView'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata = {
  title: 'Calendar - Productivity Suite',
  description: 'Schedule and manage your events and appointments',
}

export default function CalendarPage() {
  return (
    <div>
      <Breadcrumbs />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Schedule & Events
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Plan your time effectively with our interactive calendar and event management.
        </p>
      </div>

      <CalendarView />
    </div>
  )
}