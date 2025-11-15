'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CheckSquare, Columns3, Calendar, Sparkles } from 'lucide-react'
import { cn } from '@/utils/classnames'

const navigation = [
  { name: 'Landing', href: '/landing', icon: Sparkles },
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Todos', href: '/todos', icon: CheckSquare },
  { name: 'Kanban', href: '/kanban', icon: Columns3 },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-colors',
        className
      )}
    >
      {/* Logo/Brand */}
      <div className="h-16 px-6 flex items-center border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
          Productivity Suite
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          Version 1.0.0
        </p>
      </div>
    </aside>
  )
}
