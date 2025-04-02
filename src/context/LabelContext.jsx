import { useState, useEffect, useContext } from 'react'
import { useAuth } from '~/hooks/useAuth'
import { LabelContext, TaskContext } from './context'
import { getLabelsAPI } from '~/services'
import { processRetryQueue } from '~/utils/helpers'

const LabelContextProvider = ({ children }) => {
  const [labels, setLabels] = useState([])
  const [isLoadingLabels, setIsLoadingLabels] = useState(true)
  const [addingLabel, setAddingLabel] = useState(false)
  const [editingLabel, setEditingLabel] = useState(null)
  const [deletingLabel, setDeletingLabel] = useState(null)
  const {
    isLoading: isLoadingUser,
    token,
    isSigningIn,
    isGuestSigningIn,
    isProcessingQueue,
    retryQueue,
    setRetryQueue,
    triggerRetry,
    setTriggerRetry
  } = useAuth()

  const { setTasks } = useContext(TaskContext)
  useEffect(() => {
    if (isLoadingUser || isSigningIn || isGuestSigningIn || !token) return

    const fetchLabels = async () => {
      try {
        setIsLoadingLabels(true)
        const response = await getLabelsAPI()

        setLabels(response)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingLabels(false)
      }
    }
    fetchLabels()
  }, [isLoadingUser, isSigningIn, isGuestSigningIn])

  useEffect(() => {
    if (triggerRetry) {
      isProcessingQueue.current = true
      processRetryQueue(
        retryQueue,
        setRetryQueue,
        setTasks,
        setTriggerRetry,
        isProcessingQueue,
        setLabels
      )
    }
  }, [triggerRetry])
  const value = {
    labels,
    setLabels,
    isLoadingLabels,
    setIsLoadingLabels,
    addingLabel,
    setAddingLabel,
    editingLabel,
    setEditingLabel,
    deletingLabel,
    setDeletingLabel
  }
  return <LabelContext.Provider value={value}>{children}</LabelContext.Provider>
}

export default LabelContextProvider
