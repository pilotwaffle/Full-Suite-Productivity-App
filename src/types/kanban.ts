export type KanbanStatus = 'todo' | 'in-progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface KanbanCard {
  id: string
  title: string
  description?: string
  status: KanbanStatus
  priority: Priority
  tags?: string[]
  assignee?: string
  dueDate?: number
  createdAt: number
  updatedAt: number
  order: number
}

export interface KanbanColumn {
  id: KanbanStatus
  title: string
  cards: KanbanCard[]
}

export interface KanbanFormData {
  title: string
  description?: string
  priority: Priority
  dueDate?: Date
}
