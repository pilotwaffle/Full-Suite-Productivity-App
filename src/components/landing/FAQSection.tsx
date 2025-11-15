'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/classnames'

const faqs = [
  {
    question: 'Is this really free? Are there any hidden costs?',
    answer:
      'Yes, it\'s completely free! There are no subscriptions, no premium tiers, and no hidden costs. This is an open-source project built to help people stay productive without breaking the bank.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'Nope! No account required. Just open the app and start using it immediately. All your data is stored locally in your browser, so you maintain complete control and privacy.',
  },
  {
    question: 'Will my data be safe and private?',
    answer:
      'Absolutely. Your data never leaves your device—everything is stored locally in your browser using localStorage. We don\'t have servers collecting your information, so your productivity data remains 100% private.',
  },
  {
    question: 'Can I use this offline?',
    answer:
      'Yes! Once loaded, the app works completely offline. Since all data is stored locally, you can manage your tasks, kanban boards, and calendar even without an internet connection.',
  },
  {
    question: 'Does it work on mobile devices?',
    answer:
      'Yes, the app is fully responsive and works great on smartphones and tablets. The interface adapts to your screen size for a seamless experience on any device.',
  },
  {
    question: 'Can I export or backup my data?',
    answer:
      'Currently, all data is stored in your browser\'s localStorage. While we\'re working on import/export features, you can use browser backup tools or developer tools to access your data in the meantime.',
  },
  {
    question: 'What browsers are supported?',
    answer:
      'The app works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience.',
  },
  {
    question: 'Can I sync data across multiple devices?',
    answer:
      'Since data is stored locally, it doesn\'t automatically sync between devices. However, this is a feature we\'re considering for future updates while maintaining our privacy-first approach.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-primary-600 dark:text-primary-500 mb-3">
            FAQ
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Got questions? We've got answers.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="font-semibold text-lg text-slate-900 dark:text-white pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0 transition-transform',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Still have questions?
          </h4>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Check out our documentation or visit our GitHub repository for more information.
          </p>
          <a
            href="https://github.com/pilotwaffle/Full-Suite-Productivity-App"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 font-medium"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}
