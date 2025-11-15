'use client'

import { CheckSquare, Kanban, Calendar } from 'lucide-react'

const screenshots = [
  {
    title: 'Todo List',
    description: 'Manage tasks with priorities, filters, and quick actions',
    icon: CheckSquare,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Kanban Board',
    description: 'Drag-and-drop cards across customizable columns',
    icon: Kanban,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Calendar',
    description: 'Schedule events with color-coding and month view',
    icon: Calendar,
    gradient: 'from-green-500 to-emerald-500',
  },
]

export function ScreenshotsSection() {
  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary-600 dark:text-primary-500 mb-3">
            SEE IT IN ACTION
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            A Beautiful Interface You'll Love Using
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Designed for clarity and ease of use. Every pixel crafted with care.
          </p>
        </div>

        {/* Screenshots showcase */}
        <div className="space-y-12">
          {screenshots.map((screenshot, index) => {
            const Icon = screenshot.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-12 items-center`}
              >
                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${screenshot.gradient}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {screenshot.title}
                  </h4>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    {screenshot.description}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Intuitive and easy to learn</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Keyboard shortcuts for power users</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Responsive on all devices</span>
                    </li>
                  </ul>
                </div>

                {/* Screenshot placeholder */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <div className={`bg-gradient-to-br ${screenshot.gradient} p-8 rounded-2xl`}>
                        <Icon className="w-16 h-16 text-white opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
