'use client'

import Link from 'next/link'
import { CheckSquare, Columns3, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/shared/Button'
import { useTodos } from '@/hooks/useTodos'
import { useKanban } from '@/hooks/useKanban'
import { useCalendar } from '@/hooks/useCalendar'

export default function DashboardPage() {
  const todos = useTodos((state) => state.todos)
  const cards = useKanban((state) => state.cards)
  const events = useCalendar((state) => state.events)

  const activeTodos = todos.filter((t) => !t.completed).length
  const inProgressCards = cards.filter((c) => c.status === 'in-progress').length
  const upcomingEvents = events.filter(
    (e) => e.startDate > Date.now()
  ).length

  const stats = [
    {
      name: 'Active Todos',
      value: activeTodos,
      icon: CheckSquare,
      href: '/todos',
      color: 'text-primary-600 bg-primary-100',
    },
    {
      name: 'In Progress',
      value: inProgressCards,
      icon: Columns3,
      href: '/kanban',
      color: 'text-accent-600 bg-accent-100',
    },
    {
      name: 'Upcoming Events',
      value: upcomingEvents,
      icon: Calendar,
      href: '/calendar',
      color: 'text-green-600 bg-green-100',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600">
          Welcome back! Here's an overview of your productivity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg p-6 border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-primary-600 group-hover:text-primary-700">
              View all
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/todos">
            <Button variant="secondary" className="w-full">
              <CheckSquare className="w-4 h-4 mr-2" />
              Add Todo
            </Button>
          </Link>
          <Link href="/kanban">
            <Button variant="secondary" className="w-full">
              <Columns3 className="w-4 h-4 mr-2" />
              Create Card
            </Button>
          </Link>
          <Link href="/calendar">
            <Button variant="secondary" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
