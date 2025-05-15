/**
 * Utility functions for working with localStorage
 */

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

/**
 * Save data to localStorage
 * @param key The key to store the data under
 * @param data The data to store
 * @returns true if successful, false otherwise
 */
export const saveToStorage = <T,>(key: string, data: T): boolean => {
  if (!isBrowser) return false

  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
    return true
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return false
  }
}

/**
 * Load data from localStorage
 * @param key The key to retrieve data from
 * @returns The data if found, null otherwise
 */
export const loadFromStorage = <T,>(key: string): T | null => {
  if (!isBrowser) return null

  try {
    const serializedData = localStorage.getItem(key)
    if (serializedData === null) return null
    return JSON.parse(serializedData) as T
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return null
  }
}

/**
 * Remove data from localStorage
 * @param key The key to remove
 * @returns true if successful, false otherwise
 */
export const removeFromStorage = (key: string): boolean => {
  if (!isBrowser) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing from localStorage:", error)
    return false
  }
}

/**
 * Check if a key exists in localStorage
 * @param key The key to check
 * @returns true if the key exists, false otherwise
 */
export const hasStorageItem = (key: string): boolean => {
  if (!isBrowser) return false
  return localStorage.getItem(key) !== null
}

/**
 * Clear all data from localStorage
 * @returns true if successful, false otherwise
 */
export const clearStorage = (key: string): boolean => {
  if (!isBrowser) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error clearing localStorage:", error)
    return false
  }
}
