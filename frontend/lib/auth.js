import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

export const authAPI = {
  register: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password })
    return response.data
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password })
    return response.data
  },

  getMe: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  },

  upgrade: async (token) => {
    const response = await axios.post(`${API_BASE_URL}/auth/upgrade`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  },

  getUsageHistory: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/auth/usage-history`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
}

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token)
  }
}

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
  return null
}

export const setUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user))
  }
}
