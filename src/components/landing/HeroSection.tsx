'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/shared/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.5))]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
        {/* Main content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
            </span>
            Free & Open Source
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Your All-in-One
            <span className="block text-primary-600 dark:text-primary-500 mt-2">
              Productivity Hub
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Manage tasks, organize projects, and schedule events in one beautiful interface.
            No sign-up required. All your data stays private on your device.
          </p>

          {/* Key benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span className="text-sm font-medium">100% Free</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span className="text-sm font-medium">No Account Needed</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span className="text-sm font-medium">Works Offline</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span className="text-sm font-medium">Dark Mode</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button size="lg" className="text-base px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="secondary" className="text-base px-8 py-6">
                See Features
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-1">3</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Powerful Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-1">0</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-1">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Privacy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
