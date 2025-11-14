'use client'

import { Menu, Moon, Sun } from 'lucide-react'
import { cn } from '@/utils/classnames'
import { useDarkMode } from '@/hooks/useDarkMode'

interface TopBarProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
  className?: string
}

export function TopBar({
  onMenuClick,
  showMenuButton = false,
  className,
}: TopBarProps) {
  const { isDark, toggle } = useDarkMode()

  return (
    <header
      className={cn(
        'h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 flex items-center justify-between transition-colors',
        className
      )}
    >
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  )
}
