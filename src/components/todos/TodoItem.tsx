'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Trash2, Edit2, X } from 'lucide-react'
import { Todo } from '@/types/todo'
import { useTodos } from '@/hooks/useTodos'
import { cn } from '@/utils/classnames'
import { PRIORITY_COLORS } from '@/lib/constants'
import { Input } from '@/components/shared/Input'
import { Textarea } from '@/components/shared/Textarea'
import { Select } from '@/components/shared/Select'
import { Button } from '@/components/shared/Button'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')
  const [editPriority, setEditPriority] = useState(todo.priority)

  const { toggleTodo, deleteTodo, updateTodo } = useTodos()

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setEditPriority(todo.priority)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4"
      >
        <div className="space-y-3">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Todo title"
            autoFocus
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <Select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as any)}
            options={[
              { value: 'low', label: 'Low Priority' },
              { value: 'medium', label: 'Medium Priority' },
              { value: 'high', label: 'High Priority' },
            ]}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        'group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow',
        todo.completed && 'opacity-60'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleTodo(todo.id)}
          className={cn(
            'mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
            todo.completed
              ? 'bg-primary-600 border-primary-600'
              : 'border-slate-300 dark:border-slate-600 hover:border-primary-500'
          )}
        >
          {todo.completed && <Check className="w-3 h-3 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'text-base font-medium text-slate-900 dark:text-white',
              todo.completed && 'line-through text-slate-500 dark:text-slate-400'
            )}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{todo.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                PRIORITY_COLORS[todo.priority]
              )}
            >
              {todo.priority}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-md text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            aria-label="Edit todo"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 rounded-md text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            aria-label="Delete todo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
