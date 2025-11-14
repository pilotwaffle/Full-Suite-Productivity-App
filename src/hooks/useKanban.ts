import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { KanbanCard, KanbanFormData, KanbanStatus } from '@/types/kanban'
import { LOCAL_STORAGE_KEYS, STORAGE_VERSION } from '@/lib/constants'
import { generateId } from '@/utils/id'

interface KanbanStore {
  cards: KanbanCard[]
  addCard: (data: KanbanFormData, status: KanbanStatus) => void
  updateCard: (id: string, updates: Partial<KanbanCard>) => void
  deleteCard: (id: string) => void
  moveCard: (id: string, newStatus: KanbanStatus, newOrder: number) => void
  reorderCards: (status: KanbanStatus, startIndex: number, endIndex: number) => void
}

export const useKanban = create<KanbanStore>()(
  persist(
    (set) => ({
      cards: [],

      addCard: (data, status) =>
        set((state) => {
          const cardsInColumn = state.cards.filter((c) => c.status === status)
          const maxOrder = cardsInColumn.length > 0
            ? Math.max(...cardsInColumn.map((c) => c.order))
            : -1

          return {
            cards: [
              ...state.cards,
              {
                id: generateId(),
                title: data.title,
                description: data.description,
                priority: data.priority,
                status,
                dueDate: data.dueDate ? data.dueDate.getTime() : undefined,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                order: maxOrder + 1,
              },
            ],
          }
        }),

      updateCard: (id, updates) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id
              ? { ...card, ...updates, updatedAt: Date.now() }
              : card
          ),
        })),

      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        })),

      moveCard: (id, newStatus, newOrder) =>
        set((state) => {
          const card = state.cards.find((c) => c.id === id)
          if (!card) return state

          // Remove card from current position
          let updatedCards = state.cards.filter((c) => c.id !== id)

          // Update orders in target column
          updatedCards = updatedCards.map((c) => {
            if (c.status === newStatus && c.order >= newOrder) {
              return { ...c, order: c.order + 1 }
            }
            return c
          })

          // Add card to new position
          updatedCards.push({
            ...card,
            status: newStatus,
            order: newOrder,
            updatedAt: Date.now(),
          })

          return { cards: updatedCards }
        }),

      reorderCards: (status, startIndex, endIndex) =>
        set((state) => {
          const columnCards = state.cards
            .filter((c) => c.status === status)
            .sort((a, b) => a.order - b.order)

          const [removed] = columnCards.splice(startIndex, 1)
          columnCards.splice(endIndex, 0, removed)

          // Update orders
          const reorderedCards = columnCards.map((card, index) => ({
            ...card,
            order: index,
          }))

          // Merge with other columns
          const otherCards = state.cards.filter((c) => c.status !== status)

          return { cards: [...otherCards, ...reorderedCards] }
        }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.KANBAN_CARDS,
      version: STORAGE_VERSION,
    }
  )
)
