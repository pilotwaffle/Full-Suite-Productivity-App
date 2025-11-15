import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata = {
  title: 'Kanban Board - Productivity Suite',
  description: 'Organize your work with drag-and-drop cards',
}

export default function KanbanPage() {
  return (
    <div className="h-full flex flex-col">
      <Breadcrumbs />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Project Workflow
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Visualize your project progress with our intuitive drag-and-drop kanban board.
        </p>
      </div>

      <KanbanBoard />
    </div>
  )
}