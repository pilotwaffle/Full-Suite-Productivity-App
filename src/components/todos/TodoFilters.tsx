'use client'

import { TodoFilter } from '@/types/todo'
import { cn } from '@/utils/classnames'

interface TodoFiltersProps {
  activeFilter: TodoFilter
  onFilterChange: (filter: TodoFilter) => void
  counts: {
    all: number
    active: number
    completed: number
  }
}

export function TodoFilters({
  activeFilter,
  onFilterChange,
  counts,
}: TodoFiltersProps) {
  const filters: { value: TodoFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'active', label: 'Active', count: counts.active },
    { value: 'completed', label: 'Completed', count: counts.completed },
  ]

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all',
            activeFilter === filter.value
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          )}
        >
          {filter.label}
          <span className="ml-1.5 text-xs text-slate-500">
            ({filter.count})
          </span>
        </button>
      ))}
    </div>
  )
}
