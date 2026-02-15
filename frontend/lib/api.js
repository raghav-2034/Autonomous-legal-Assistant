import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

const getAuthHeader = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
  return {}
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to all requests
api.interceptors.request.use((config) => {
  const authHeaders = getAuthHeader()
  config.headers = { ...config.headers, ...authHeaders }
  return config
})

export const legalChat = async (message) => {
  const response = await api.post('/legal-chat', { message })
  return response.data
}

export const describeProblem = async (problem) => {
  const response = await api.post('/describe-problem', { problem })
  return response.data
}

export const analyzeRisk = async (document) => {
  const response = await api.post('/risk-radar', { document })
  return response.data
}

export const generateStrategy = async (situation) => {
  const response = await api.post('/strategy', { situation })
  return response.data
}

export const analyzeRights = async (scenario) => {
  const response = await api.post('/rights', { scenario })
  return response.data
}

export const explainConstitution = async (query) => {
  const response = await api.post('/constitution', { query })
  return response.data
}

export default api
