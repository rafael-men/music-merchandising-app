import { useState, useCallback } from 'react'

const STORAGE_KEY = 'favorites'

const load = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

const save = (set) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(load)

  const toggle = useCallback((productId) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
      } else {
        next.add(productId)
      }
      save(next)
      return next
    })
  }, [])

  const isFavorite = useCallback((productId) => favorites.has(productId), [favorites])

  return { favorites, toggle, isFavorite }
}
