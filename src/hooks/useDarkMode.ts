'use client'

import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('darkMode')

    if (saved !== null) {
      const isDarkMode = saved === 'true'
      setIsDark(isDarkMode)
      updateDOM(isDarkMode)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
      updateDOM(prefersDark)
    }
  }, [])

  const updateDOM = (isDarkMode: boolean) => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggle = () => {
    const newValue = !isDark
    setIsDark(newValue)
    localStorage.setItem('darkMode', String(newValue))
    updateDOM(newValue)
  }

  return { isDark, toggle }
}
