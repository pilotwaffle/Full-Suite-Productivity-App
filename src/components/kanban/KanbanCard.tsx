'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Edit2, Calendar as CalendarIcon } from 'lucide-react'
import { KanbanCard as KanbanCardType } from '@/types/kanban'
import { cn } from '@/utils/classnames'
import { PRIORITY_COLORS } from '@/lib/constants'
import { formatDate } from '@/utils/dates'

interface KanbanCardProps {
  card: KanbanCardType
  onEdit: (card: KanbanCardType) => void
  onDelete: (id: string) => void
}

export function KanbanCard({ card, onEdit, onDelete }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group bg-white border border-slate-200 rounded-lg p-4 cursor-default hover:shadow-md transition-shadow',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-start gap-2">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Drag card"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-slate-900 mb-1">
            {card.title}
          </h3>
          {card.description && (
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
              {card.description}
            </p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                PRIORITY_COLORS[card.priority]
              )}
            >
              {card.priority}
            </span>
            {card.dueDate && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                <CalendarIcon className="w-3 h-3" />
                {formatDate(card.dueDate, 'MMM d')}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(card)}
            className="p-1.5 rounded-md text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            aria-label="Edit card"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Delete card"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
