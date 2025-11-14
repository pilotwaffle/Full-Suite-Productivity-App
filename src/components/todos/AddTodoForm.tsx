'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTodos } from '@/hooks/useTodos'
import { Priority } from '@/types/todo'
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'

export function AddTodoForm() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const { addTodo } = useTodos()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim()) {
      addTodo({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      })

      // Reset form
      setTitle('')
      setDescription('')
      setPriority('medium')
      setIsExpanded(false)
    }
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full bg-white border-2 border-dashed border-slate-300 rounded-lg p-4 text-slate-600 hover:border-primary-400 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add new todo
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-lg p-4 space-y-3"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        rows={2}
      />

      <div className="flex items-center gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <div className="flex-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsExpanded(false)
            setTitle('')
            setDescription('')
            setPriority('medium')
          }}
        >
          Cancel
        </Button>
        <Button type="submit" size="sm">
          Add Todo
        </Button>
      </div>
    </form>
  )
}
