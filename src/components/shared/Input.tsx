import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-10 px-3 py-2 text-base border border-slate-300 dark:border-slate-600 rounded-md',
            'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 dark:disabled:text-slate-600 disabled:cursor-not-allowed',
            error && 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
