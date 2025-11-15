import { ReactNode } from 'react'
import { LucideIcon, Plus, ArrowRight } from 'lucide-react'
import { cn } from '@/utils/classnames'
import { Button } from './Button'

interface QuickAction {
  label: string
  href?: string
  onClick?: () => void
  icon?: LucideIcon
  variant?: 'primary' | 'secondary'
}

interface EnhancedEmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  primaryAction?: QuickAction
  secondaryActions?: QuickAction[]
  className?: string
}

export function EnhancedEmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryActions = [],
  className,
}: EnhancedEmptyStateProps) {
  const handleActionClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick()
    } else if (action.href) {
      window.location.href = action.href
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm">{description}</p>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {primaryAction && (
          <Button
            variant={primaryAction.variant || 'primary'}
            onClick={() => handleActionClick(primaryAction)}
            className="w-full sm:w-auto"
          >
            {primaryAction.icon && <primaryAction.icon className="w-4 h-4 mr-2" />}
            {primaryAction.label}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {secondaryActions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {secondaryActions.map((action, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                onClick={() => handleActionClick(action)}
                className="w-full sm:w-auto"
              >
                {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}