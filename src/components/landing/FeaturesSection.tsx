'use client'

import { CheckSquare, Kanban, Calendar, Zap, Shield, Palette } from 'lucide-react'

const features = [
  {
    icon: CheckSquare,
    title: 'Smart Todo Lists',
    description:
      'Organize tasks with priority levels, descriptions, and filters. Mark items as complete and track your progress effortlessly.',
    color: 'text-blue-600 dark:text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: Kanban,
    title: 'Drag-and-Drop Kanban',
    description:
      'Visualize your workflow with customizable boards. Move cards between To Do, In Progress, and Done with smooth animations.',
    color: 'text-purple-600 dark:text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    icon: Calendar,
    title: 'Event Calendar',
    description:
      'Schedule events and appointments with an intuitive month view. Color-code events and manage your time effectively.',
    color: 'text-green-600 dark:text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built with modern technology for instant loading and smooth interactions. No lag, no waiting—just pure productivity.',
    color: 'text-amber-600 dark:text-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'All data stored locally in your browser. No servers, no tracking, no accounts. Your information never leaves your device.',
    color: 'text-red-600 dark:text-red-500',
    bg: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description:
      'Clean, minimal interface with dark mode support. Designed for focus and usability without unnecessary distractions.',
    color: 'text-pink-600 dark:text-pink-500',
    bg: 'bg-pink-100 dark:bg-pink-900/30',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary-600 dark:text-primary-500 mb-3">
            FEATURES
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need to Stay Productive
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Three powerful tools working together seamlessly to help you organize your work and life.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700"
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-5`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* Content */}
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
