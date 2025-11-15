import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: {
    default: 'Productivity Suite',
    template: '%s | Productivity Suite'
  },
  description: 'A modern productivity suite with Kanban board, todo list, and calendar',
  keywords: ['productivity', 'kanban', 'todos', 'calendar', 'task management'],
  authors: [{ name: 'Productivity Suite Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}