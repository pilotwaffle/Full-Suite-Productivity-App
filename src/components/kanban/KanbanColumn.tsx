'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus, ArrowRight } from 'lucide-react'
import { KanbanCard as KanbanCardType, KanbanStatus } from '@/types/kanban'
import { KanbanCard } from './KanbanCard'
import { cn } from '@/utils/classnames'
import { Button } from '@/components/shared/Button'

interface KanbanColumnProps {
  id: KanbanStatus
  title: string
  cards: KanbanCardType[]
  onAddCard: () => void
  onEditCard: (card: KanbanCardType) => void
  onDeleteCard: (id: string) => void
}

export function KanbanColumn({
  id,
  title,
  cards,
  onAddCard,
  onEditCard,
  onDeleteCard,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  const getEmptyStateContent = () => {
    switch (id) {
      case 'todo':
        return {
          message: 'No tasks to do',
          submessage: 'Create your first task or drag cards here',
          actionLabel: 'Add Task'
        }
      case 'in-progress':
        return {
          message: 'No work in progress',
          submessage: 'Move tasks here when you start working on them',
          actionLabel: 'Start Task'
        }
      case 'done':
        return {
          message: 'No completed tasks',
          submessage: 'Move completed tasks here to track your progress',
          actionLabel: 'Complete Task'
        }
      default:
        return {
          message: 'Drop cards here',
          submessage: '',
          actionLabel: 'Add Card'
        }
    }
  }

  const emptyState = getEmptyStateContent()

  return (
    <div className="flex flex-col h-full min-w-[320px] bg-slate-100 dark:bg-slate-800 rounded-lg">
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
          {title}
          <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">
            ({cards.length})
          </span>
        </h2>
        <button
          onClick={onAddCard}
          className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"
          aria-label={`Add card to ${title}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Cards Container */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 p-3 space-y-3 overflow-y-auto',
          isOver && 'bg-primary-50/50 dark:bg-primary-900/20'
        )}
      >
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onEdit={onEditCard}
              onDelete={onDeleteCard}
            />
          ))}
        </SortableContext>

        {cards.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {emptyState.message}
            </p>
            {emptyState.submessage && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {emptyState.submessage}
              </p>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={onAddCard}
              className="mt-2"
            >
              {emptyState.actionLabel}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}