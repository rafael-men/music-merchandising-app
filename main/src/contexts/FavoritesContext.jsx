import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { usersApi } from '../api/users'
import { useAuth } from './AuthContext'

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

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const [favorites, setFavorites] = useState(loadLocal)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setFavorites(loadLocal())
      return
    }
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

    setFavorites((prev) => {
      const isFav = prev.has(productId)
      const next = new Set(prev)
      if (isFav) next.delete(productId)
      else next.add(productId)
      saveLocal(next)

      if (isAuthenticated && user?.id) {
        const call = isFav
          ? usersApi.removeFavorite(user.id, productId)
          : usersApi.addFavorite(user.id, productId)
        call.catch(() => {
          setFavorites((current) => {
            const rolled = new Set(current)
            if (isFav) rolled.add(productId)
            else rolled.delete(productId)
            saveLocal(rolled)
            return rolled
          })
        })
      }

      return next
    })
  }, [isAuthenticated, user?.id])

  const isFavorite = useCallback((productId) => favorites.has(productId), [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
