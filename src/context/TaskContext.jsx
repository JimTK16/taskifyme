import { useState, useEffect } from 'react'

import { getTasks } from '~/services'
import { TaskContext } from './context'
import { useAuth } from '~/hooks/useAuth'
import { processRetryQueue } from '~/utils/helpers'

export default function TaskContextProvider({ children }) {
  const {
    isLoading: isLoadingUser,
    isSigningIn,
    isGuestSigningIn,
    token,
    isProcessingQueue,
    retryQueue,
    setRetryQueue,
    triggerRetry,
    setTriggerRetry
  } = useAuth()
  const [editingTask, setEditingTask] = useState(null)
  const [addingTask, setAddingTask] = useState(false)
  const [deletingTask, setDeletingTask] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [lastDeletedTaskId, setLastDeletedTaskId] = useState(null)

  useEffect(() => {
    if (isLoadingUser || isSigningIn || isGuestSigningIn || !token) return
    const fetchTasks = async () => {
      try {
        setIsLoadingTasks(true)
        const response = await getTasks()
        setTasks(response)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingTasks(false)
      }
    }
    fetchTasks()
  }, [isLoadingUser, isSigningIn, isGuestSigningIn, token])

  useEffect(() => {
    if (triggerRetry) {
      isProcessingQueue.current = true
      processRetryQueue(
        retryQueue,
        setRetryQueue,
        setTasks,
        setTriggerRetry,
        isProcessingQueue
      )
    }
  }, [triggerRetry])

  const value = {
    tasks,
    isLoadingTasks,
    setTasks,
    showSnackBar,
    setShowSnackBar,
    lastDeletedTaskId,
    setLastDeletedTaskId,
    editingTask,
    setEditingTask,
    addingTask,
    setAddingTask,
    deletingTask,
    setDeletingTask
  }
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
