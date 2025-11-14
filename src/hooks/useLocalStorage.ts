import { useState, useEffect, useCallback } from 'react'
import { getFromStorage, saveToStorage } from '@/lib/storage'

/**
 * Custom hook for syncing state with localStorage
 * Handles cross-tab synchronization and debounced writes
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  debounceMs: number = 300
): [T, (value: T | ((prev: T) => T)) => void] {
  // Initialize state with value from localStorage or initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getFromStorage(key, initialValue)
  })

  // Debounce timer ref
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  )

  // Update localStorage when state changes (debounced)
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    const timer = setTimeout(() => {
      saveToStorage(key, storedValue)
    }, debounceMs)

    setDebounceTimer(timer)

    return () => {
      if (timer) clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedValue, key])

  // Listen for changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          setStoredValue(parsed.data)
        } catch (error) {
          console.error('Error parsing storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  // Wrapper for setState to match useState signature
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value
        return newValue
      })
    },
    []
  )

  return [storedValue, setValue]
}
