'use client'

import { useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { cn } from '@/utils/classnames'
import { useDarkMode } from '@/hooks/useDarkMode'
import { GlobalSearch } from './GlobalSearch'
import { Button } from '@/components/shared/Button'

interface TopBarProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
  className?: string
  showSearch?: boolean
}

export function TopBar({
  onMenuClick,
  showMenuButton = false,
  className,
  showSearch = true,
}: TopBarProps) {
  const { isDark, toggle } = useDarkMode()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMenuClick = () => {
    if (showMenuButton && onMenuClick) {
      onMenuClick()
    }
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div
      className={cn(
        'h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 flex items-center justify-between transition-colors',
        className
      )}
    >
      {/* Left Section - Menu and Date */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Mobile Menu Toggle */}
        {showMenuButton && (
          <button
            onClick={handleMenuClick}
            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Current Date - Hidden on small screens when menu is shown */}
        <div className={cn(
          "hidden sm:block",
          showMenuButton && "lg:block"
        )}>
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

      {/* Center Section - Search */}
      {showSearch && (
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <GlobalSearch />
        </div>
      )}

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden">
            <GlobalSearch />
          </div>
        )}

        {/* Dark Mode Toggle */}
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