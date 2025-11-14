import { LOCAL_STORAGE_KEYS, STORAGE_VERSION } from './constants'

interface StorageData<T> {
  version: number
  data: T
}

export class StorageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'StorageError'
  }
}

/**
 * Get data from localStorage with type safety and error handling
 */
export function getFromStorage<T>(
  key: string,
  defaultValue: T
): T {
  if (typeof window === 'undefined') {
    return defaultValue
  }

  try {
    const item = window.localStorage.getItem(key)
    if (!item) {
      return defaultValue
    }

    const parsed: StorageData<T> = JSON.parse(item)

    // Version check - can implement migrations here
    if (parsed.version !== STORAGE_VERSION) {
      console.warn(`Storage version mismatch for ${key}. Migrating...`)
      // For now, just return default value
      // In future, implement migration logic
      return defaultValue
    }

    return parsed.data
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * Save data to localStorage with versioning
 */
export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const storageData: StorageData<T> = {
      version: STORAGE_VERSION,
      data: value,
    }

    window.localStorage.setItem(key, JSON.stringify(storageData))
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      throw new StorageError(
        'Storage quota exceeded. Please clear some data and try again.'
      )
    }
    throw new StorageError(`Failed to save data: ${error}`)
  }
}

/**
 * Remove data from localStorage
 */
export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error)
  }
}

/**
 * Clear all app data from localStorage
 */
export function clearAllStorage(): void {
  if (typeof window === 'undefined') {
    return
  }

  Object.values(LOCAL_STORAGE_KEYS).forEach((key) => {
    removeFromStorage(key)
  })
}

/**
 * Get storage usage in bytes
 */
export function getStorageSize(): number {
  if (typeof window === 'undefined') {
    return 0
  }

  let total = 0
  for (const key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      total += window.localStorage[key].length + key.length
    }
  }
  return total
}

/**
 * Get storage usage in KB
 */
export function getStorageSizeKB(): string {
  return (getStorageSize() / 1024).toFixed(2)
}
