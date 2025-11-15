'use client'

import { useState } from 'react'
import { CheckSquare, Columns3, Calendar, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react'
import { cn } from '@/utils/classnames'
import { useTodos } from '@/hooks/useTodos'
import { useKanban } from '@/hooks/useKanban'
import { useCalendar } from '@/hooks/useCalendar'
import { Button } from '@/components/shared/Button'

type SyncMode = 'manual' | 'todos-to-kanban' | 'kanban-to-todos' | null

export function CrossFeatureSync() {
  const [syncMode, setSyncMode] = useState<SyncMode>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')

  const todos = useTodos((state) => state.todos)
  const cards = useKanban((state) => state.cards)
  const addCard = useKanban((state) => state.addCard)
  const addTodo = useTodos((state) => state.addTodo)

  // Find todos that could be synced to kanban (incomplete todos without corresponding cards)
  const todosToSync = todos.filter(todo => {
    if (todo.completed) return false
    const hasCard = cards.some(card =>
      card.title.toLowerCase().trim() === todo.title.toLowerCase().trim()
    )
    return !hasCard
  })

  // Find kanban cards that could be synced to todos (todo cards without corresponding todos)
  const cardsToSync = cards.filter(card => {
    if (card.status === 'done') return false
    const hasTodo = todos.some(todo =>
      todo.title.toLowerCase().trim() === card.title.toLowerCase().trim()
    )
    return !hasTodo
  })

  const syncTodosToKanban = async () => {
    setIsSyncing(true)
    setSyncMessage(`Syncing ${todosToSync.length} todos to Kanban board...`)

    try {
      for (const todo of todosToSync) {
        addCard(
          {
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
            dueDate: undefined
          },
          'todo'
        )
      }

      setSyncMessage(`Successfully synced ${todosToSync.length} todos to Kanban board!`)
      setTimeout(() => {
        setSyncMessage('')
        setSyncMode(null)
      }, 2000)
    } catch (error) {
      setSyncMessage('Error syncing todos. Please try again.')
      setTimeout(() => setSyncMessage(''), 3000)
    } finally {
      setIsSyncing(false)
    }
  }

  const syncKanbanToTodos = async () => {
    setIsSyncing(true)
    setSyncMessage(`Syncing ${cardsToSync.length} kanban cards to Todos...`)

    try {
      for (const card of cardsToSync) {
        addTodo({
          title: card.title,
          description: card.description,
          priority: card.priority
        })
      }

      setSyncMessage(`Successfully synced ${cardsToSync.length} kanban cards to Todos!`)
      setTimeout(() => {
        setSyncMessage('')
        setSyncMode(null)
      }, 2000)
    } catch (error) {
      setSyncMessage('Error syncing kanban cards. Please try again.')
      setTimeout(() => setSyncMessage(''), 3000)
    } finally {
      setIsSyncing(false)
    }
  }

  if (todosToSync.length === 0 && cardsToSync.length === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <CheckSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-medium text-green-800 dark:text-green-200">All in sync!</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Your todos and kanban cards are perfectly synchronized.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            Cross-Feature Sync
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Keep your tasks consistent across all features
          </p>
        </div>
      </div>

      {syncMessage && (
        <div className={cn(
          "mb-4 p-3 rounded-lg flex items-center gap-2",
          syncMessage.includes('Error')
            ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
            : "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
        )}>
          {syncMessage.includes('Error') ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <CheckSquare className="w-4 h-4" />
          )}
          <p className="text-sm">{syncMessage}</p>
        </div>
      )}

      {syncMode === null && (
        <div className="space-y-4">
          {/* Todos to Kanban */}
          {todosToSync.length > 0 && (
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    {todosToSync.length} todos can be synced to Kanban
                  </h4>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSyncMode('todos-to-kanban')}
                  disabled={isSyncing}
                >
                  Sync Todos <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-2">
                {todosToSync.slice(0, 3).map(todo => (
                  <div key={todo.id} className="text-sm text-slate-600 dark:text-slate-400 pl-7">
                    • {todo.title}
                    {todo.priority && (
                      <span className="ml-2 text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {todo.priority}
                      </span>
                    )}
                  </div>
                ))}
                {todosToSync.length > 3 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 pl-7">
                    ... and {todosToSync.length - 3} more
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Kanban to Todos */}
          {cardsToSync.length > 0 && (
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Columns3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    {cardsToSync.length} kanban cards can be synced to Todos
                  </h4>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSyncMode('kanban-to-todos')}
                  disabled={isSyncing}
                >
                  Sync Cards <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-2">
                {cardsToSync.slice(0, 3).map(card => (
                  <div key={card.id} className="text-sm text-slate-600 dark:text-slate-400 pl-7">
                    • {card.title}
                    {card.status && (
                      <span className="ml-2 text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {card.status}
                      </span>
                    )}
                  </div>
                ))}
                {cardsToSync.length > 3 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 pl-7">
                    ... and {cardsToSync.length - 3} more
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {syncMode === 'todos-to-kanban' && (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              Syncing Todos to Kanban Board
            </h4>
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
              {todosToSync.length} todos will be created as cards in the "To Do" column
            </p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={syncTodosToKanban}
                disabled={isSyncing}
              >
                {isSyncing ? 'Syncing...' : 'Confirm Sync'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSyncMode(null)}
                disabled={isSyncing}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {syncMode === 'kanban-to-todos' && (
        <div className="space-y-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
              Syncing Kanban Cards to Todos
            </h4>
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-4">
              {cardsToSync.length} kanban cards will be created as todos
            </p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={syncKanbanToTodos}
                disabled={isSyncing}
              >
                {isSyncing ? 'Syncing...' : 'Confirm Sync'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSyncMode(null)}
                disabled={isSyncing}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}