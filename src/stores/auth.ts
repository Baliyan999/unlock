import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/lib/api'
import type { User, LoginCredentials, RegisterData } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // Система ограничений попыток входа
  const failedAttempts = ref(0)
  const maxAttempts = 10
  const lockoutTime = 5 * 60 * 1000 // 5 минут в миллисекундах
  const lockoutUntil = ref<number | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isLockedOut = computed(() => {
    if (!lockoutUntil.value) return false
    return Date.now() < lockoutUntil.value
  })
  const remainingLockoutTime = computed(() => {
    if (!lockoutUntil.value) return 0
    return Math.max(0, lockoutUntil.value - Date.now())
  })

  const setUser = (userData: User | null) => {
    user.value = userData
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }
  
  const resetFailedAttempts = () => {
    failedAttempts.value = 0
    lockoutUntil.value = null
    // Очищаем из localStorage
    localStorage.removeItem('failed_attempts')
    localStorage.removeItem('lockout_until')
  }
  
  const formatTimeRemaining = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / (60 * 1000))
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Загружаем состояние блокировки из localStorage
  const loadLockoutState = () => {
    const savedAttempts = localStorage.getItem('failed_attempts')
    const savedLockout = localStorage.getItem('lockout_until')
    
    if (savedAttempts) {
      failedAttempts.value = parseInt(savedAttempts)
    }
    
    if (savedLockout) {
      const lockoutTime = parseInt(savedLockout)
      // Проверяем, не истекла ли блокировка
      if (Date.now() < lockoutTime) {
        lockoutUntil.value = lockoutTime
      } else {
        // Блокировка истекла, очищаем
        resetFailedAttempts()
      }
    }
  }

  // Сохраняем состояние блокировки в localStorage
  const saveLockoutState = () => {
    localStorage.setItem('failed_attempts', failedAttempts.value.toString())
    if (lockoutUntil.value) {
      localStorage.setItem('lockout_until', lockoutUntil.value.toString())
    } else {
      localStorage.removeItem('lockout_until')
    }
  }

  const login = async (credentials: LoginCredentials) => {
    // Загружаем состояние блокировки
    loadLockoutState()
    
    // Проверяем блокировку
    if (isLockedOut.value) {
      const remainingMinutes = Math.ceil(remainingLockoutTime.value / (60 * 1000))
      error.value = `Слишком много неудачных попыток. Попробуйте снова через ${remainingMinutes} минут.`
      throw new Error('Аккаунт заблокирован')
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/login', credentials)
      
      // Успешный вход - сбрасываем счетчик попыток
      resetFailedAttempts()
      
      // Store the access token
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
        // Set default authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
      }
      // Fetch user data
      await fetchUser()
      return response.data
    } catch (err: any) {
      // Увеличиваем счетчик неудачных попыток
      failedAttempts.value++
      
      // Проверяем, нужно ли заблокировать аккаунт
      if (failedAttempts.value >= maxAttempts) {
        lockoutUntil.value = Date.now() + lockoutTime
        const remainingMinutes = Math.ceil(lockoutTime / (60 * 1000))
        error.value = `Слишком много неудачных попыток. Аккаунт заблокирован на ${remainingMinutes} минут.`
      } else {
        const remainingAttempts = maxAttempts - failedAttempts.value
        let errorMessage = err.response?.data?.detail || 'Ошибка входа'
        
        // Переводим сообщения на русский
        if (errorMessage === 'Incorrect email or password') {
          errorMessage = 'Неверный email или пароль'
        } else if (errorMessage === 'Email already registered') {
          errorMessage = 'Email уже зарегистрирован'
        } else if (errorMessage === 'Could not validate credentials') {
          errorMessage = 'Не удалось проверить учетные данные'
        }
        
        error.value = `${errorMessage} (осталось попыток: ${remainingAttempts})`
      }
      
      // Сохраняем состояние блокировки
      saveLockoutState()
      
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData: RegisterData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/register', userData)
      // Store the access token
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
        // Set default authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
      }
      // Fetch user data
      await fetchUser()
      return response.data
    } catch (err: any) {
      let errorMessage = err.response?.data?.detail || 'Ошибка регистрации'
      
      // Переводим сообщения на русский
      if (errorMessage === 'Email already registered') {
        errorMessage = 'Email уже зарегистрирован'
      } else if (errorMessage === 'Incorrect email or password') {
        errorMessage = 'Неверный email или пароль'
      } else if (errorMessage === 'Could not validate credentials') {
        errorMessage = 'Не удалось проверить учетные данные'
      }
      
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear token and user data
      localStorage.removeItem('access_token')
      delete api.defaults.headers.common['Authorization']
      user.value = null
      isLoading.value = false
    }
  }

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me')
      user.value = response.data
    } catch (err) {
      user.value = null
    }
  }

  const checkAuth = async () => {
    try {
      // Загружаем состояние блокировки
      loadLockoutState()
      
      // Load token from localStorage if available
      const token = localStorage.getItem('access_token')
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      
      if (!user.value) {
        await fetchUser()
      }
    } catch (error) {
      console.log('Auth check failed:', error)
      // Очищаем невалидный токен
      localStorage.removeItem('access_token')
      delete api.defaults.headers.common['Authorization']
      user.value = null
    }
  }


  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    isLockedOut,
    remainingLockoutTime,
    failedAttempts,
    maxAttempts,
    setUser,
    setError,
    clearError,
    resetFailedAttempts,
    formatTimeRemaining,
    loadLockoutState,
    saveLockoutState,
    login,
    register,
    logout,
    fetchUser,
    checkAuth
  }
})