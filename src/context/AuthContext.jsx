import { useState, useCallback, useEffect, useRef } from 'react'
import {
  refreshTokenAPI,
  signInAPI,
  signInAsGuestAPI,
  signOutAPI
} from '~/services'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './context'
import { useNavigate } from 'react-router-dom'

const AuthContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null)
  const [token, setToken] = useState(null)
  const tokenRef = useRef(token)
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isGuestSigningIn, setIsGuestSigningIn] = useState(false)
  const [signOutReason, setSignOutReason] = useState(null)
  const navigate = useNavigate()
  console.log(token)
  // Initialize auth on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refreshTokenAPI()
        console.log('Refreshed token:', response)
        storeUserDetails(response)
      } catch (error) {
        if (error.response?.status === 401) {
          console.log('No valid refresh token, user must log in')
          setToken(null)
          setUserDetails(null)
        } else {
          console.error('Error initializing auth:', error)
        }
      } finally {
        setIsLoading(false)
      }
    }
    initializeAuth()
  }, [])
  const signOut = useCallback(async (reason = 'manual') => {
    try {
      await signOutAPI()
    } catch (error) {
      console.error('Error signing out:', error)
    }
    setUserDetails(null)
    setToken(null)
    setSignOutReason(reason)
  }, [])

  useEffect(() => {
    tokenRef.current = token
  }, [token])

  //Axios interceptor
  useEffect(() => {
    // Request interceptor to add Authorization header
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const currentToken = tokenRef.current
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`
      }
      return config
    })

    // Response interceptor to handle 401 errors and refresh token
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          try {
            const { accessToken } = await refreshTokenAPI()
            setToken(accessToken)
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return axios(originalRequest)
          } catch (refreshError) {
            signOut('refresh_failed')
            return Promise.reject(refreshError)
          }
        }
        return Promise.reject(error)
      }
    )

    // setIsLoading(false)

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [signOut])

  //Auto-refreh token before expiration
  useEffect(() => {
    if (!token) return
    const decodedToken = jwtDecode(token)
    const expiresIn = decodedToken.exp * 1000 - Date.now()
    const refreshTime = expiresIn - 300000
    const timeoutId = setTimeout(async () => {
      let attempts = 0
      const maxAttempts = 3
      while (attempts < maxAttempts) {
        try {
          const { accessToken } = await refreshTokenAPI()
          setToken(accessToken)
          break
        } catch (error) {
          attempts++
          if (attempts >= maxAttempts) {
            signOut('refresh_failed')
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        }
      }
    }, refreshTime)
    return () => clearTimeout(timeoutId)
  }, [token])

  //Activity tracking for auto-logout
  useEffect(() => {
    let inactivityTimer
    const resetTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        signOut('inactivity')
      }, 60 * 60 * 1000)
    }

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart']
    events.forEach((event) => {
      window.addEventListener(event, resetTimer)
    })
    resetTimer()
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer)
      })
      clearTimeout(inactivityTimer)
    }
  }, [signOut])

  const storeUserDetails = (response) => {
    const { user, accessToken } = response
    setUserDetails(user)
    setToken(accessToken)
    setSignOutReason(null)
  }

  const signIn = useCallback(async (email, password) => {
    try {
      setIsSigningIn(true)
      const response = await signInAPI({ email, password })
      storeUserDetails(response)
    } catch (error) {
      throw error
    } finally {
      setIsSigningIn(false)
    }
  }, [])

  const guestSignIn = useCallback(async () => {
    try {
      setIsGuestSigningIn(true)
      const response = await signInAsGuestAPI()
      storeUserDetails(response)
    } catch (error) {
      throw error
    } finally {
      setIsGuestSigningIn(false)
    }
  }, [])

  //redirect on signout with reason
  useEffect(() => {
    if (signOutReason) {
      navigate('/signin', { state: { reason: signOutReason } })
    }
  }, [signOutReason, navigate])
  const value = {
    userDetails,
    token,
    signIn,
    signOut,
    guestSignIn,
    isAuthenticated: !!token,
    isLoading,
    isSigningIn,
    isGuestSigningIn
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthContextProvider
