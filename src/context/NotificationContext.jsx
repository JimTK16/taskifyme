import { useState, useEffect } from 'react'
import { NotificationContext } from './context'
import { useAuth } from '~/hooks/useAuth'
import { getNotifications } from '~/services'

const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true)
  const { userDetails, isLoading: isLoadingUser } = useAuth()
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length

  useEffect(() => {
    if (isLoadingUser) return
    if (!userDetails || !userDetails.userId) return

    const fetchNotifications = async () => {
      try {
        setIsLoadingNotifications(true)
        const response = await getNotifications()

        setNotifications(response)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingNotifications(false)
      }
    }
    fetchNotifications()
  }, [userDetails, isLoadingUser])

  const value = {
    notifications,
    unreadCount,
    setNotifications,
    isLoadingNotifications
  }
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider
