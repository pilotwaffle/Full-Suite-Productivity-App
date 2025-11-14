'use client'

import { Menu } from 'lucide-react'
import { cn } from '@/utils/classnames'

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
  return (
    <header
      className={cn(
        'h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between',
        className
      )}
    >
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <p className="text-sm text-slate-600">
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
        {/* Future: Add search, notifications, user menu */}
      </div>
    </header>
  )
}
