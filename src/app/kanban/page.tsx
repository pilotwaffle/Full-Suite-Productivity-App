import { KanbanBoard } from '@/components/kanban/KanbanBoard'

export default function KanbanPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Kanban Board</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Organize your work with drag-and-drop cards.
        </p>
      </div>

      <KanbanBoard />
    </div>
  )
}
