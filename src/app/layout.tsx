import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister'

export const metadata: Metadata = {
  title: 'Productivity Suite - Todo, Kanban & Calendar',
  description: 'Your all-in-one productivity hub with todos, kanban board, and calendar. Free, private, and works offline.',
  applicationName: 'Full Suite Productivity App',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Productivity Suite',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
  keywords: [
    'productivity',
    'todo',
    'kanban',
    'calendar',
    'task management',
    'project management',
    'offline',
    'privacy',
    'free',
  ],
  authors: [{ name: 'Full Suite Productivity Team' }],
  creator: 'Full Suite Productivity Team',
  publisher: 'Full Suite Productivity Team',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Full Suite Productivity App',
    title: 'Productivity Suite - Todo, Kanban & Calendar',
    description: 'Your all-in-one productivity hub. Free, private, and works offline.',
    images: [
      {
        url: '/screenshots/desktop-1.png',
        width: 1280,
        height: 720,
        alt: 'Productivity Suite Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Productivity Suite - Todo, Kanban & Calendar',
    description: 'Your all-in-one productivity hub. Free, private, and works offline.',
    images: ['/screenshots/desktop-1.png'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
>>>>>>> 98ac68d1b8d980d90c83636e45cd5f8d22c345bd
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Productivity" />

        {/* Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />

        {/* Splash Screens for iOS */}
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="/splash/iphone-14-pro-max-portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="/splash/iphone-14-pro-portrait.png"
        />
      </head>
      <body className="font-sans">
        <ServiceWorkerRegister />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}