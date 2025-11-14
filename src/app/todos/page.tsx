import { TodoList } from '@/components/todos/TodoList'

export default function TodosPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Todos</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your tasks and track your progress.
        </p>
      </div>

      <TodoList />
    </div>
  )
}
