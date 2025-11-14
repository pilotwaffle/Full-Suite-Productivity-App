import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Todo, TodoFormData } from '@/types/todo'
import { LOCAL_STORAGE_KEYS, STORAGE_VERSION } from '@/lib/constants'
import { generateId } from '@/utils/id'

interface TodoStore {
  todos: Todo[]
  addTodo: (data: TodoFormData) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  clearCompleted: () => void
}

export const useTodos = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (data) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: generateId(),
              title: data.title,
              description: data.description,
              priority: data.priority,
              completed: false,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          ],
        })),

      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: Date.now() }
              : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  completed: !todo.completed,
                  completedAt: !todo.completed ? Date.now() : undefined,
                  updatedAt: Date.now(),
                }
              : todo
          ),
        })),

      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: LOCAL_STORAGE_KEYS.TODOS,
      version: STORAGE_VERSION,
    }
  )
)
