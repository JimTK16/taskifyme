import { useState, useCallback, useEffect, useRef } from 'react'
import { signInAPI, signInAsGuestAPI } from '~/services'
import axios from 'axios'
import { AuthContext } from './context'

const AuthContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [token, setToken] = useState(localStorage.getItem('token'))
  const tokenRef = useRef(token)
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isGuestSigningIn, setIsGuestSigningIn] = useState(false)

  useEffect(() => {
    tokenRef.current = token
  }, [token])

  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const currentToken = tokenRef.current

      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`
      }

      return config
    })
    setIsLoading(false)
    return () => {
      axios.interceptors.request.eject(interceptor)
    }
  }, [])

  const storeUserDetails = (response) => {
    const { user, token } = response
    setUserDetails(user)
    setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
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

  const signOut = useCallback(() => {
    setUserDetails(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }, [])

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
