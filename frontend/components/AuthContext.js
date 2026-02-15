'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI, getToken, setToken, removeToken, getUser, setUser } from '@/lib/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = getToken()
    const savedUser = getUser()
    
    if (token && savedUser) {
      setUserState(savedUser)
      // Optionally refresh user data
      refreshUser(token)
    }
    setLoading(false)
  }, [])

  const refreshUser = async (token) => {
    try {
      const data = await authAPI.getMe(token)
      setUserState(data.user)
      setUser(data.user)
    } catch (error) {
      console.error('Failed to refresh user:', error)
      logout()
    }
  }

  const login = async (email, password) => {
    const data = await authAPI.login(email, password)
    setToken(data.token)
    setUser(data.user)
    setUserState(data.user)
    return data
  }

  const register = async (email, password) => {
    const data = await authAPI.register(email, password)
    setToken(data.token)
    setUser(data.user)
    setUserState(data.user)
    return data
  }

  const logout = () => {
    removeToken()
    setUserState(null)
  }

  const updateCredits = (newCredits) => {
    if (user) {
      const updatedUser = { ...user, credits_remaining: newCredits }
      setUserState(updatedUser)
      setUser(updatedUser)
    }
  }

  const upgrade = async () => {
    const token = getToken()
    const data = await authAPI.upgrade(token)
    setUserState(data.user)
    setUser(data.user)
    return data
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      updateCredits,
      upgrade,
      refreshUser: () => refreshUser(getToken())
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
