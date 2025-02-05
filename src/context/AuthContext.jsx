import { useState, useCallback, createContext } from 'react'
import { signInAPI, signInAsGuestAPI } from '~/services'

export const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  const storeUserDetails = (response) => {
    const { user, token } = response
    setUser(user)
    setToken(token)
    localStorage.setItem('token', token)
  }

  const signIn = useCallback(async (email, password) => {
    try {
      const response = await signInAPI({ email, password })
      storeUserDetails(response)
    } catch (error) {
      throw error
    }
  }, [])

  const guestSignIn = useCallback(async () => {
    try {
      const response = await signInAsGuestAPI()
      storeUserDetails(response)
    } catch (error) {
      throw error
    }
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }, [])

  const value = {
    user,
    token,
    signIn,
    signOut,
    guestSignIn,
    isAuthenticated: !!token
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthContextProvider
