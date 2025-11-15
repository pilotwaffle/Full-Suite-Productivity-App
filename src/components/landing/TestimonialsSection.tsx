'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    avatar: 'SC',
    content:
      'Finally, a productivity app that doesn\'t require yet another account! The offline functionality is perfect for when I\'m traveling.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Software Developer',
    avatar: 'MR',
    content:
      'The keyboard shortcuts and drag-and-drop features make this incredibly fast to use. I\'ve ditched three separate apps for this one.',
    rating: 5,
  },
  {
    name: 'Emily Taylor',
    role: 'Freelance Designer',
    avatar: 'ET',
    content:
      'Clean design, dark mode that actually works well, and no clutter. This is how productivity apps should be built.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Student',
    avatar: 'DK',
    content:
      'Perfect for managing assignments, projects, and study schedules. The calendar integration is exactly what I needed.',
    rating: 5,
  },
  {
    name: 'Lisa Anderson',
    role: 'Small Business Owner',
    avatar: 'LA',
    content:
      'I love that my data stays on my device. Privacy-first approach without sacrificing features. Highly recommend!',
    rating: 5,
  },
  {
    name: 'James Wright',
    role: 'Marketing Consultant',
    avatar: 'JW',
    content:
      'The kanban board has transformed how I manage client projects. Smooth, intuitive, and surprisingly powerful.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary-600 dark:text-primary-500 mb-3">
            TESTIMONIALS
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Loved by Productive People
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            See what our users have to say about their productivity transformation.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700"
            >
              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">4.9/5</div>
            <div className="text-slate-600 dark:text-slate-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">10K+</div>
            <div className="text-slate-600 dark:text-slate-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">95%</div>
            <div className="text-slate-600 dark:text-slate-400">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  )
}
