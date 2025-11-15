import { WifiOff } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/shared/Button'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 mb-6">
          <WifiOff className="w-10 h-10 text-slate-600 dark:text-slate-400" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          You're Offline
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          It looks like you've lost your internet connection. Don't worry—your data is safe and
          stored locally on your device.
        </p>

        {/* Info box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            What you can do:
          </h2>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Check your internet connection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Try refreshing the page once you're back online</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Your todos, kanban cards, and calendar events are saved locally</span>
            </li>
          </ul>
        </div>

        {/* Action button */}
        <Link href="/">
          <Button size="lg">
            Try Again
          </Button>
        </Link>
      </div>
    </div>
  )
}
