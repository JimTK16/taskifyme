import { useContext, useEffect } from 'react'
import { AuthContext, TaskContext } from '~/context/context'
import { processRetryQueue } from '~/utils/helpers'

const RetryQueueHandler = () => {
  const {
    retryQueue,
    setRetryQueue,
    triggerRetry,
    setTriggerRetry,
    isProcessingQueue
  } = useContext(AuthContext)
  const { setTasks } = useContext(TaskContext)

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

  return null
}

export default RetryQueueHandler
