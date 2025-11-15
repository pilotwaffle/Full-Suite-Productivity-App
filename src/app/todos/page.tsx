import { TodoList } from '@/components/todos/TodoList'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata = {
  title: 'Todos - Productivity Suite',
  description: 'Manage your tasks and track your progress',
}

export default function TodosPage() {
  return (
    <div>
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Task Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Organize and track your daily tasks with priorities and due dates.
        </p>
      </div>

      <TodoList />
    </div>
  )
}