'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CheckSquare, Columns3, Calendar } from 'lucide-react'
import { cn } from '@/utils/classnames'

const navigation = [
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
        'w-64 bg-white border-r border-slate-200 flex flex-col',
        className
      )}
    >
      {/* Logo/Brand */}
      <div className="h-16 px-6 flex items-center border-b border-slate-200">
        <h1 className="text-xl font-semibold text-slate-900">
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
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-700 hover:bg-slate-100'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          Version 1.0.0
        </p>
      </div>
    </aside>
  )
}
