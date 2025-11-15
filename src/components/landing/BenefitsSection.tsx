'use client'

import { TrendingUp, Brain, Clock, Target } from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Boost Productivity by 40%',
    description:
      'Users report significant improvements in task completion rates and daily productivity after switching to our integrated approach.',
  },
  {
    icon: Brain,
    title: 'Reduce Mental Clutter',
    description:
      'Stop juggling multiple apps and tabs. Keep everything in one place to free up mental space for what really matters.',
  },
  {
    icon: Clock,
    title: 'Save 2 Hours Weekly',
    description:
      'Streamlined workflows and quick access to all your productivity tools means less time managing and more time doing.',
  },
  {
    icon: Target,
    title: 'Hit Your Goals Faster',
    description:
      'Visual progress tracking and organized task management helps you stay focused and achieve your objectives on time.',
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary-600 dark:text-primary-500 mb-3">
            BENEFITS
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Work Smarter, Not Harder
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Experience the difference when your productivity tools actually work for you.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="flex gap-6 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-500" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional highlight */}
        <div className="mt-16 text-center bg-primary-600 dark:bg-primary-900/50 rounded-2xl p-12">
          <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Join Thousands of Productive Users
          </h4>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Whether you're a student, professional, or entrepreneur—our suite adapts to your workflow.
          </p>
        </div>
      </div>
    </section>
  )
}
