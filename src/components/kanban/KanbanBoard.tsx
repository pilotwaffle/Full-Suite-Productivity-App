'use client'

import { useState, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard as KanbanCardComponent } from './KanbanCard'
import { AddCardDialog } from './AddCardDialog'
import { useKanban } from '@/hooks/useKanban'
import { KanbanCard, KanbanStatus } from '@/types/kanban'
import { KANBAN_COLUMNS } from '@/lib/constants'

export function KanbanBoard() {
  const { cards, moveCard, deleteCard, reorderCards } = useKanban()
  const [activeCard, setActiveCard] = useState<KanbanCard | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogStatus, setDialogStatus] = useState<KanbanStatus>('todo')
  const [editCard, setEditCard] = useState<KanbanCard | null>(null)

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Organize cards by column
  const cardsByColumn = useMemo(() => {
    const organized: Record<KanbanStatus, KanbanCard[]> = {
      todo: [],
      'in-progress': [],
      done: [],
    }

    cards.forEach((card) => {
      organized[card.status].push(card)
    })

    // Sort by order
    Object.keys(organized).forEach((status) => {
      organized[status as KanbanStatus].sort((a, b) => a.order - b.order)
    })

    return organized
  }, [cards])

  const handleDragStart = (event: DragStartEvent) => {
    const card = cards.find((c) => c.id === event.active.id)
    if (card) {
      setActiveCard(card)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeCard = cards.find((c) => c.id === activeId)
    if (!activeCard) return

    // Check if dragging over a column
    const overColumn = KANBAN_COLUMNS.find((col) => col.id === overId)
    if (overColumn && activeCard.status !== overColumn.id) {
      // Move to new column at the end
      const targetCards = cardsByColumn[overColumn.id]
      moveCard(activeId, overColumn.id, targetCards.length)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)

    if (!over || active.id === over.id) return

    const activeCard = cards.find((c) => c.id === active.id)
    const overCard = cards.find((c) => c.id === over.id)

    if (!activeCard) return

    // If dropped on another card in the same column, reorder
    if (overCard && activeCard.status === overCard.status) {
      const columnCards = cardsByColumn[activeCard.status]
      const activeIndex = columnCards.findIndex((c) => c.id === active.id)
      const overIndex = columnCards.findIndex((c) => c.id === over.id)

      if (activeIndex !== overIndex) {
        reorderCards(activeCard.status, activeIndex, overIndex)
      }
    }
  }

  const handleAddCard = (status: KanbanStatus) => {
    setDialogStatus(status)
    setEditCard(null)
    setDialogOpen(true)
  }

  const handleEditCard = (card: KanbanCard) => {
    setEditCard(card)
    setDialogStatus(card.status)
    setDialogOpen(true)
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 h-[calc(100vh-12rem)] overflow-x-auto pb-4">
          {KANBAN_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              cards={cardsByColumn[column.id]}
              onAddCard={() => handleAddCard(column.id)}
              onEditCard={handleEditCard}
              onDeleteCard={deleteCard}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard && (
            <div className="rotate-3 opacity-90">
              <KanbanCardComponent
                card={activeCard}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <AddCardDialog
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setEditCard(null)
        }}
        status={dialogStatus}
        editCard={editCard}
      />
    </>
  )
}
