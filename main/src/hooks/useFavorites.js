import { useState, useCallback, useEffect } from 'react'
import { usersApi } from '../api/users'
import { useAuth } from '../contexts/AuthContext'

const STORAGE_KEY = 'favorites'

const loadLocal = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

const saveLocal = (set) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
}

export const useFavorites = () => {
  const { user, isAuthenticated } = useAuth()
  const [favorites, setFavorites] = useState(loadLocal)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return
    let cancelled = false
    setLoading(true)
    usersApi
      .favorites(user.id)
      .then((ids) => {
        if (cancelled) return
        const set = new Set(ids || [])
        setFavorites(set)
        saveLocal(set)
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [isAuthenticated, user?.id])

  const toggle = useCallback((productId) => {
    if (!productId) return
    const isFav = favorites.has(productId)

    setFavorites((prev) => {
      const next = new Set(prev)
      if (isFav) next.delete(productId)
      else next.add(productId)
      saveLocal(next)
      return next
    })

    if (isAuthenticated && user?.id) {
      const call = isFav
        ? usersApi.removeFavorite(user.id, productId)
        : usersApi.addFavorite(user.id, productId)
      call.catch(() => {
        setFavorites((prev) => {
          const next = new Set(prev)
          if (isFav) next.add(productId)
          else next.delete(productId)
          saveLocal(next)
          return next
        })
      })
    }
  }, [favorites, isAuthenticated, user?.id])

  const isFavorite = useCallback((productId) => favorites.has(productId), [favorites])

  return { favorites, toggle, isFavorite, loading }
}
