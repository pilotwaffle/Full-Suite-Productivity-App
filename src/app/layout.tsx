import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'Productivity Suite',
  description: 'A modern productivity suite with Kanban board, todo list, and calendar',
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
