import { useEffect, useReducer, useRef, useCallback, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import {
  signInAPI,
  signOutAPI,
  refreshTokenAPI,
  signInAsGuestAPI
} from '~/services'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './context'
import { isCriticalRequest } from '~/utils/helpers'
import ServerStatusSnackBar from '~/components/ServerStatusSnackBar'

const INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutes
const TOKEN_REFRESH_MARGIN = 5 * 60 * 1000 // 5 minutes
const MAX_OFFLINE_TIMEOUT = 15 * 60 * 1000 // 15 minutes

// -------------------------------
// 1. Define the Initial State & Reducer
// -------------------------------

const initialState = {
  user: null,
  token: null,
  isLoading: true,
  isSigningIn: false,
  isGuestSigningIn: false,
  signOutReason: null,
  serverStatus: 'online',
  offlineTimestamp: null
}

function authReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE_AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        signOutReason: null
      }
    case 'INITIALIZE_AUTH_FAILURE':
      return { ...state, user: null, token: null, isLoading: false }
    case 'SIGN_IN_REQUEST':
      return { ...state, isSigningIn: true }
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isSigningIn: false,
        signOutReason: null
      }
    case 'SIGN_IN_FAILURE':
      return { ...state, isSigningIn: false }
    case 'GUEST_SIGN_IN_REQUEST':
      return { ...state, isGuestSigningIn: true }
    case 'GUEST_SIGN_IN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isGuestSigningIn: false,
        signOutReason: null
      }
    case 'GUEST_SIGN_IN_FAILURE':
      return { ...state, isGuestSigningIn: false }
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        token: null,
        signOutReason: action.payload
      }
    case 'SERVER_STATUS_CHANGE':
      return {
        ...state,
        serverStatus: action.payload.status,
        offlineTimestamp:
          action.payload.status === 'offline' ? Date.now() : null
      }
    default:
      return state
  }
}
// -------------------------------
// 2. AuthContextProvider Component
// -------------------------------
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const [retryQueue, setRetryQueue] = useState([])
  const [triggerRetry, setTriggerRetry] = useState(false)
  const [serverStatusMessage, setServerStatusMessage] = useState('')
  const tokenRef = useRef(state.token)
  const retryQueueRef = useRef(retryQueue)
  const serverStatusRef = useRef(state.serverStatus)
  const isProcessingQueue = useRef(false)
  const navigate = useNavigate()

  //Keep tokenRef updated with the latest token for our Axios interceptor
  useEffect(() => {
    tokenRef.current = state.token
    retryQueueRef.current = retryQueue
    serverStatusRef.current = state.serverStatus
  }, [state.token, retryQueue, state.serverStatus])

  // -------------------------------
  // 3. Initialize Auth on App Load
  // -------------------------------
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refreshTokenAPI()
        tokenRef.current = response.accessToken
        dispatch({
          type: 'INITIALIZE_AUTH_SUCCESS',
          payload: { user: response.user, token: response.accessToken }
        })
      } catch (error) {
        if (error.response?.status === 401) {
          console.log('No valid refresh token, user must log in')
        } else {
          console.error('Error initializing auth:', error)
          if (error.code === 'ERR_NETWORK' || !error.response) {
            dispatch({
              type: 'SERVER_STATUS_CHANGE',
              payload: { status: 'offline' }
            })
            setServerStatusMessage({
              type: 'warning',
              content:
                'Server unavailable during initialization, please try again later.'
            })
          }
        }
        dispatch({ type: 'INITIALIZE_AUTH_FAILURE' })
      }
    }
    initializeAuth()
  }, [])

  // -------------------------------
  // 4. Action Functions
  // -------------------------------
  const signIn = useCallback(async (email, password) => {
    dispatch({ type: 'SIGN_IN_REQUEST' })
    try {
      const response = await signInAPI({ email, password })
      tokenRef.current = response.accessToken
      dispatch({
        type: 'SIGN_IN_SUCCESS',
        payload: {
          user: response.user,
          token: response.accessToken
        }
      })
    } catch (error) {
      dispatch({ type: 'SIGN_IN_FAILURE' })
      if (error.code === 'ERR_NETWORK' || !!error.response) {
        dispatch({
          type: 'SERVER_STATUS_CHANGE',
          payload: { status: 'offline' }
        })
        setServerStatusMessage({
          type: 'error',
          content: 'Unable to sign in. Server unavailable.'
        })
      }
      throw error
    }
  }, [])

  const guestSignIn = useCallback(async () => {
    dispatch({ type: 'GUEST_SIGN_IN_REQUEST' })
    try {
      const response = await signInAsGuestAPI()
      tokenRef.current = response.accessToken

      dispatch({
        type: 'GUEST_SIGN_IN_SUCCESS',
        payload: {
          user: response.user,
          token: response.accessToken
        }
      })
    } catch (error) {
      dispatch({ type: 'GUEST_SIGN_IN_FAILURE' })
      if (error.code === 'ERR_NETWORK' || !!error.response) {
        dispatch({
          type: 'SERVER_STATUS_CHANGE',
          payload: { status: 'offline' }
        })
        setServerStatusMessage({
          type: 'error',
          content: 'Unable to sign in. Server unavailable.'
        })
      }
      throw error
    }
  }, [])

  const signOut = useCallback(async (reason = 'manual') => {
    // if (state.serverStatus === 'offline' && reason !== 'server_offline') {
    //   dispatch({ type: 'SIGN_OUT', payload: reason })
    //   return
    // }
    try {
      await signOutAPI()
    } catch (error) {
      console.error('Error signing out:', error)
    }
    tokenRef.current = null
    dispatch({ type: 'SIGN_OUT', payload: reason })
  }, [])

  // -------------------------------
  // 5. Setup Axios Interceptor
  // -------------------------------
  useEffect(() => {
    // Attach token to every outgoing request
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const currentToken = tokenRef.current
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`
      }
      return config
    })

    // On 401, try to refresh token. On failure, sign out
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        if (serverStatusRef.current === 'offline') {
          dispatch({
            type: 'SERVER_STATUS_CHANGE',
            payload: { status: 'online' }
          })

          if (!isProcessingQueue.current) {
            isProcessingQueue.current = true
            setTriggerRetry(true)
          } else {
          }
          setServerStatusMessage({
            type: 'success',
            content: 'Server restored'
          })
        }
        return response
      },
      async (error) => {
        const originalRequest = error.config
        if (error.code === 'ERR_NETWORK' || !error.response) {
          dispatch({
            type: 'SERVER_STATUS_CHANGE',
            payload: { status: 'offline' }
          })
          if (
            isCriticalRequest(originalRequest) &&
            retryQueueRef.current.length < 10
          ) {
            setRetryQueue((prev) => [...prev, originalRequest])
          }
          setServerStatusMessage({
            type: 'warning',
            content: 'Server offline. Some actions may be delayed.'
          })
          return Promise.reject(error)
        }
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          tokenRef.current
        ) {
          originalRequest._retry = true
          try {
            const response = await refreshTokenAPI()
            const newToken = response.accessToken
            dispatch({ type: 'SET_TOKEN', payload: newToken })
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return axios(originalRequest)
          } catch (refreshError) {
            if (refreshError.response?.status === 401) {
              dispatch({ type: 'SIGN_OUT', payload: 'refresh_failed' })
            }
            return Promise.reject(refreshError)
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  // -------------------------------
  // 6. Auto-refresh token before expiration
  // -------------------------------
  useEffect(() => {
    if (!state.token) return
    let timeoutId
    try {
      const decodedToken = jwtDecode(state.token)
      const expiresIn = decodedToken.exp * 1000 - Date.now()
      const refreshTime = Math.max(expiresIn - TOKEN_REFRESH_MARGIN, 0)

      timeoutId = setTimeout(async () => {
        try {
          const response = await refreshTokenAPI()
          tokenRef.current = response.accessToken
          dispatch({ type: 'SET_TOKEN', payload: response.accessToken })
        } catch (error) {
          if (error.response?.status === 401) {
            dispatch({ type: 'SIGN_OUT', payload: 'refresh_failed' })
          } else {
            console.error('Error refreshing token:', error)
            dispatch({
              type: 'SERVER_STATUS_CHANGE',
              payload: { status: 'offline' }
            })
          }
        }
      }, refreshTime)
    } catch (error) {
      console.error('Error decoding token:', error)
    }
    return () => clearTimeout(timeoutId)
  }, [state.token])

  // -------------------------------
  // 7. Inactivity Auto logout
  // -------------------------------
  const inactivityTimerRef = useRef()

  const resetTimer = useCallback(() => {
    clearTimeout(inactivityTimerRef.current)
    inactivityTimerRef.current = setTimeout(() => {
      signOut('inactivity')
    }, INACTIVITY_TIMEOUT)
  }, [signOut])

  useEffect(() => {
    if (state.user) {
      const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart']
      const handleInactivity = () => resetTimer()
      events.forEach((event) => addEventListener(event, handleInactivity))
      resetTimer()
      return () => {
        events.forEach((event) => removeEventListener(event, handleInactivity))
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [state.user, resetTimer])

  // -------------------------------
  // 8. Offline Timeout Logout
  // -------------------------------

  useEffect(() => {
    if (state.serverStatus === 'offline' && state.offlineTimestamp) {
      const timer = setTimeout(() => {
        if (state.serverStatus === 'offline') {
          dispatch({ type: 'SIGN_OUT', payload: 'server_offline' })
          setServerStatusMessage({
            type: 'error',
            content: 'Logged out due to extended server unavailability.'
          })
        }
      }, MAX_OFFLINE_TIMEOUT)
      return () => clearTimeout(timer)
    }
  }, [state.serverStatus, state.offlineTimestamp])

  // -------------------------------
  // 9. Redirect after Sign out
  // -------------------------------
  useEffect(() => {
    if (state.signOutReason && !state.token) {
      navigate('/signin', { state: { reason: state.signOutReason } })
    }
  }, [state.signOutReason, state.token, navigate])

  const contextValue = {
    userDetails: state.user,
    token: state.token,
    signIn,
    guestSignIn,
    signOut,
    isAuthenticated: !!state.token,
    isLoading: state.isLoading,
    isSigningIn: state.isSigningIn,
    isGuestSigningIn: state.isGuestSigningIn,
    isProcessingQueue,
    retryQueue,
    setRetryQueue,
    triggerRetry,
    setTriggerRetry,
    serverStatusMessage,
    setServerStatusMessage
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      {serverStatusMessage !== '' && (
        <ServerStatusSnackBar message={serverStatusMessage} />
      )}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
