'use client'

import Link from 'next/link'
import { Github, Twitter, Heart } from 'lucide-react'

export function LandingFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Productivity Suite
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Your all-in-one productivity hub. Free, private, and open source.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/pilotwaffle/Full-Suite-Productivity-App"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/todos"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  Todo List
                </Link>
              </li>
              <li>
                <Link
                  href="/kanban"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  Kanban Board
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/pilotwaffle/Full-Suite-Productivity-App#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/pilotwaffle/Full-Suite-Productivity-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/pilotwaffle/Full-Suite-Productivity-App/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  Report Bug
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/pilotwaffle/Full-Suite-Productivity-App/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  Request Feature
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/pilotwaffle/Full-Suite-Productivity-App/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  License (MIT)
                </a>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by the community
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} Full Suite Productivity App. Open source under MIT License.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
