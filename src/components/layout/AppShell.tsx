'use client'

import { ReactNode, useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { cn } from '@/utils/classnames'
import { useIsTablet } from '@/hooks/useMediaQuery'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isTablet = useIsTablet()

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Desktop Sidebar */}
      {!isTablet && <Sidebar />}

      {/* Mobile Sidebar Overlay */}
      {isTablet && sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <Sidebar className="fixed left-0 top-0 bottom-0 z-50" />
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          showMenuButton={isTablet}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
