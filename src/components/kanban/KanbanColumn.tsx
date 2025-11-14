'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { KanbanCard as KanbanCardType, KanbanStatus } from '@/types/kanban'
import { KanbanCard } from './KanbanCard'
import { cn } from '@/utils/classnames'

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

  return (
    <div className="flex flex-col h-full min-w-[320px] bg-slate-100 rounded-lg">
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
          {title}
          <span className="ml-2 text-xs font-normal text-slate-500">
            ({cards.length})
          </span>
        </h2>
        <button
          onClick={onAddCard}
          className="p-1.5 rounded-md text-slate-600 hover:text-primary-600 hover:bg-white transition-colors"
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
          isOver && 'bg-primary-50/50'
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
          <div className="flex items-center justify-center h-32 text-sm text-slate-500">
            Drop cards here
          </div>
        )}
      </div>
    </div>
  )
}
