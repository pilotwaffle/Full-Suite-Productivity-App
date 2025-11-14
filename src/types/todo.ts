export type Priority = 'low' | 'medium' | 'high'

export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: Priority
  tags?: string[]
  createdAt: number
  updatedAt: number
  completedAt?: number
}

export type TodoFilter = 'all' | 'active' | 'completed'

export interface TodoFormData {
  title: string
  description?: string
  priority: Priority
}
