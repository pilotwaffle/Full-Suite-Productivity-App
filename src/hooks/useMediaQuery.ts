import { useState, useEffect } from 'react'

/**
 * Custom hook for responsive design breakpoints
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return
    }

    const media = window.matchMedia(query)

    // Set initial value
    setMatches(media.matches)

    // Create event listener
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Add listener (with fallback for older browsers)
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    } else {
      // Fallback for Safari < 14
      media.addListener(listener)
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener)
      } else {
        media.removeListener(listener)
      }
    }
  }, [query])

  return matches
}

// Tailwind breakpoint helpers
export const useIsMobile = () => useMediaQuery('(max-width: 640px)')
export const useIsTablet = () => useMediaQuery('(max-width: 1024px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
