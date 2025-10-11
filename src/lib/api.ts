import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Для работы с cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor для автоматического добавления токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor для обработки ошибок авторизации
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен истек или недействителен
      // Очищаем токен из localStorage
      localStorage.removeItem('access_token')
      // Не делаем автоматический редирект, чтобы избежать перезагрузки
      console.log('Token expired, cleared from localStorage')
    }
    return Promise.reject(error)
  }
)

export default api
