'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { CheckCircle2, Plus, ListTodo } from 'lucide-react'
import { TodoFilter } from '@/types/todo'
import { useTodos } from '@/hooks/useTodos'
import { TodoItem } from './TodoItem'
import { TodoFilters } from './TodoFilters'
import { AddTodoForm } from './AddTodoForm'
import { EnhancedEmptyState } from '@/components/shared/EnhancedEmptyState'
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

  const getEmptyStateProps = () => {
    if (filter === 'completed') {
      return {
        icon: CheckCircle2,
        title: 'No completed tasks yet',
        description: 'Complete some tasks to see them here',
        secondaryActions: [{
          label: 'View Active Tasks',
          href: '/todos?filter=active',
          icon: ListTodo
        }]
      }
    } else if (filter === 'active') {
      return {
        icon: ListTodo,
        title: 'All tasks completed!',
        description: 'Great job! You\'ve completed all your tasks.',
        secondaryActions: [{
          label: 'View Completed',
          href: '/todos?filter=completed',
          icon: CheckCircle2
        }]
      }
    } else {
      return {
        icon: ListTodo,
        title: 'Start organizing your tasks',
        description: 'Create your first task and begin your productivity journey.',
        primaryAction: {
          label: 'Create First Task',
          icon: Plus,
          variant: 'primary' as const
        },
        secondaryActions: [{
          label: 'Import from Kanban',
          href: '/kanban',
          icon: Plus
        }]
      }
    }
  }

  const emptyStateProps = getEmptyStateProps()

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
        <EnhancedEmptyState {...emptyStateProps} />
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