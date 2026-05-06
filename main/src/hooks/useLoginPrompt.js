import { useState, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'

export const useLoginPrompt = () => {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState({})

  const requireAuth = useCallback(
    (action, promptConfig = {}) => {
      if (isAuthenticated) {
        action?.()
        return true
      }
      setConfig(promptConfig)
      setOpen(true)
      return false
    },
    [isAuthenticated]
  )

  const close = useCallback(() => setOpen(false), [])

  return { requireAuth, open, close, config }
}
