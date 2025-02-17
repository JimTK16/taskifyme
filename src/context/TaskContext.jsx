import { useState, useEffect, useContext } from 'react'

import { getTasks } from '~/services'
import { TaskContext } from './context'
import { useAuth } from '~/hooks/useAuth'

export default function TaskContextProvider({ children }) {
  const { userDetails, isLoading } = useAuth()

  const [tasks, setTasks] = useState([])
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [lastDeletedTaskId, setLastDeletedTaskId] = useState(null)

  useEffect(() => {
    if (isLoading) return
    if (!userDetails || !userDetails.userId) return

    const fetchTasks = async () => {
      try {
        setIsLoadingTasks(true)
        const response = await getTasks(userDetails.userId)
        setTasks(response)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingTasks(false)
      }
    }
    fetchTasks()
  }, [userDetails, isLoading])

  const value = {
    tasks,
    isLoadingTasks,
    setTasks,
    showSnackBar,
    setShowSnackBar,
    lastDeletedTaskId,
    setLastDeletedTaskId
  }
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
