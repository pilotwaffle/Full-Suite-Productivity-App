'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utils/classnames'

interface Breadcrumb {
  label: string
  href: string
  isCurrent?: boolean
}

const routeNames: Record<string, string> = {
  '/': 'Dashboard',
  '/todos': 'Todos',
  '/kanban': 'Kanban Board',
  '/calendar': 'Calendar',
  '/landing': 'Landing',
}

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname()

  // Skip breadcrumbs on landing page and root
  if (pathname === '/landing' || pathname === '/') {
    return null
  }

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', href: '/' }
  ]

  let currentPath = ''
  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    const isLast = currentPath === pathname
    const label = routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)

    breadcrumbs.push({
      label,
      href: currentPath,
      isCurrent: isLast
    })
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm text-slate-600 dark:text-slate-400 mb-4", className)}
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index === 0 ? (
              <Link
                href={breadcrumb.href}
                className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                {breadcrumb.label}
              </Link>
            ) : (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-slate-400 dark:text-slate-600" />
                {breadcrumb.isCurrent ? (
                  <span className="text-slate-900 dark:text-white font-medium">
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {breadcrumb.label}
                  </Link>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}