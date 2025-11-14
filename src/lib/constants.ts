export const LOCAL_STORAGE_KEYS = {
  KANBAN_CARDS: 'productivity_kanban_cards',
  TODOS: 'productivity_todos',
  CALENDAR_EVENTS: 'productivity_calendar_events',
  USER_PREFERENCES: 'productivity_preferences',
} as const

export const STORAGE_VERSION = 1

export const KANBAN_COLUMNS = [
  { id: 'todo' as const, title: 'To Do' },
  { id: 'in-progress' as const, title: 'In Progress' },
  { id: 'done' as const, title: 'Done' },
]

export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const

export const PRIORITY_COLORS = {
  low: 'text-slate-600 bg-slate-100',
  medium: 'text-primary-600 bg-primary-100',
  high: 'text-accent-600 bg-accent-100',
} as const
