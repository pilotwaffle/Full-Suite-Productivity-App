'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { TodoFilter } from '@/types/todo'
import { useTodos } from '@/hooks/useTodos'
import { TodoItem } from './TodoItem'
import { TodoFilters } from './TodoFilters'
import { AddTodoForm } from './AddTodoForm'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/shared/Button'

export function TodoList() {
  const [filter, setFilter] = useState<TodoFilter>('all')
  const { todos, clearCompleted } = useTodos()

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed)
      case 'completed':
        return todos.filter((t) => t.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <TodoFilters
          activeFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />
        {counts.completed > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCompleted}>
            Clear Completed
          </Button>
        )}
      </div>

      {/* Add Todo Form */}
      <AddTodoForm />

      {/* Todo List */}
      {filteredTodos.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title={
            filter === 'completed'
              ? 'No completed todos'
              : filter === 'active'
              ? 'No active todos'
              : 'No todos yet'
          }
          description={
            filter === 'all'
              ? 'Create your first todo to get started!'
              : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
