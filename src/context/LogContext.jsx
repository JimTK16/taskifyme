import { useEffect, useState } from 'react'
import { LogContext } from './context'
import { useAuth } from '~/hooks/useAuth'
import { getLogsAPI } from '~/services'

export const LogContextProvider = ({ children }) => {
  const [logs, setLogs] = useState([])
  const [isLoadingLogs, setIsLoadingLogs] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [total, setTotal] = useState(0)
  const {
    isLoading: isLoadingUser,
    token,
    isSigningIn,
    isGuestSigningIn
  } = useAuth()

  useEffect(() => {
    if (isLoadingUser || isSigningIn || isGuestSigningIn || !token) return
    const fetchLogs = async () => {
      try {
        setIsLoadingLogs(true)
        const response = await getLogsAPI(page, limit)

        setLogs(response.logs)
        setTotal(response.total)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingLogs(false)
      }
    }
    fetchLogs()
  }, [isLoadingUser, isSigningIn, isGuestSigningIn, page, limit])
  const value = { logs, isLoadingLogs, page, setPage, total, limit }
  return <LogContext.Provider value={value}>{children}</LogContext.Provider>
}
