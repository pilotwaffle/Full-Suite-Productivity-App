'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Calendar, CheckSquare, Columns3, Clock, ExternalLink } from 'lucide-react'
import { cn } from '@/utils/classnames'
import { useTodos } from '@/hooks/useTodos'
import { useKanban } from '@/hooks/useKanban'
import { useCalendar } from '@/hooks/useCalendar'
import { Button } from '@/components/shared/Button'

interface SearchResult {
  id: string
  type: 'todo' | 'kanban' | 'calendar'
  title: string
  description?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  metadata?: string
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const todos = useTodos((state) => state.todos)
  const cards = useKanban((state) => state.cards)
  const events = useCalendar((state) => state.events)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()

    // Search todos
    const todoResults = todos
      .filter(todo =>
        todo.title.toLowerCase().includes(searchQuery) ||
        todo.description?.toLowerCase().includes(searchQuery)
      )
      .map(todo => ({
        id: todo.id,
        type: 'todo' as const,
        title: todo.title,
        description: todo.description,
        href: '/todos',
        icon: CheckSquare,
        metadata: todo.priority ? `Priority: ${todo.priority}` : undefined
      }))

    // Search kanban cards
    const kanbanResults = cards
      .filter(card =>
        card.title.toLowerCase().includes(searchQuery) ||
        card.description?.toLowerCase().includes(searchQuery)
      )
      .map(card => ({
        id: card.id,
        type: 'kanban' as const,
        title: card.title,
        description: card.description,
        href: '/kanban',
        icon: Columns3,
        metadata: card.status ? `Status: ${card.status}` : undefined
      }))

    // Search calendar events
    const calendarResults = events
      .filter(event =>
        event.title.toLowerCase().includes(searchQuery) ||
        event.description?.toLowerCase().includes(searchQuery)
      )
      .map(event => ({
        id: event.id,
        type: 'calendar' as const,
        title: event.title,
        description: event.description,
        href: '/calendar',
        icon: Calendar,
        metadata: event.startDate ? new Date(event.startDate).toLocaleDateString() : undefined
      }))

    const allResults = [...todoResults, ...kanbanResults, ...calendarResults]
    setResults(allResults.slice(0, 8)) // Limit to 8 results
    setSelectedIndex(0)
  }, [query, todos, cards, events])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % results.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev === 0 ? results.length - 1 : prev - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (results[selectedIndex]) {
          window.location.href = results[selectedIndex].href
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false)
    setQuery('')
    window.location.href = result.href
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors min-w-0"
      >
        <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        <span className="text-slate-600 dark:text-slate-300 truncate">Search...</span>
        <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-700 rounded text-slate-500 dark:text-slate-400">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-start justify-center pt-[20vh]">
          <div className="w-full max-w-2xl mx-4">
            {/* Search Input */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search todos, kanban cards, or calendar events..."
                    className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                    autoComplete="off"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Esc
                  </Button>
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {query.trim() && results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result, index) => {
                      const Icon = result.icon
                      return (
                        <button
                          key={`${result.type}-${result.id}`}
                          onClick={() => handleResultClick(result)}
                          className={cn(
                            'w-full flex items-start gap-3 p-3 rounded-md text-left transition-colors',
                            index === selectedIndex
                              ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                          )}
                        >
                          <div className={cn(
                            'p-2 rounded-md',
                            result.type === 'todo' && 'bg-blue-100 dark:bg-blue-900/30',
                            result.type === 'kanban' && 'bg-purple-100 dark:bg-purple-900/30',
                            result.type === 'calendar' && 'bg-green-100 dark:bg-green-900/30'
                          )}>
                            <Icon className={cn(
                              'w-4 h-4',
                              result.type === 'todo' && 'text-blue-600 dark:text-blue-400',
                              result.type === 'kanban' && 'text-purple-600 dark:text-purple-400',
                              result.type === 'calendar' && 'text-green-600 dark:text-green-400'
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium text-slate-900 dark:text-white truncate">
                                {result.title}
                              </h4>
                              <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-1" />
                            </div>
                            {result.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                                {result.description}
                              </p>
                            )}
                            {result.metadata && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {result.metadata}
                              </p>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : query.trim() ? (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Try searching with different keywords
                    </p>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Start typing to search
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Search across todos, kanban cards, and calendar events
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}