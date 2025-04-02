import axios from 'axios'
import { getTasks, updateLabelAPI } from '~/services'

export const validateInputs = (
  email,
  password,
  setEmailError,
  setEmailErrorMessage,
  setPasswordError,
  setPasswordErrorMessage
) => {
  let isValid = true

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    setEmailError(true)
    setEmailErrorMessage('Please enter a valid email address.')
    isValid = false
  } else {
    setEmailError(false)
    setEmailErrorMessage('')
  }

  if (!password || password.length < 6) {
    setPasswordError(true)
    setPasswordErrorMessage('Password must be at least 6 characters long.')
    isValid = false
  } else {
    setPasswordError(false)
    setPasswordErrorMessage('')
  }

  return isValid
}

export const dateFormatter = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

export const isDueToday = (dueDate) => {
  const today = new Date()
  const dueDateObj = new Date(dueDate)
  today.setHours(0, 0, 0, 0)

  return (
    dueDateObj.getFullYear() === today.getFullYear() &&
    dueDateObj.getMonth() === today.getMonth() &&
    dueDateObj.getDate() === today.getDate()
  )
}

export const formatRelativeTime = (createdAt) => {
  // Create dates for now and the created timestamp.
  const now = new Date()
  const createdDate = new Date(createdAt)

  // Calculate the difference in milliseconds.
  const diffInMs = now - createdDate

  // Convert milliseconds into days.
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  // If the notification was created today.
  if (diffInDays === 0) {
    return 'Today'
  }

  // If the notification was created yesterday.
  if (diffInDays === 1) {
    return 'Yesterday'
  }

  // If it's less than a week old, show the number of days.
  if (diffInDays < 7) {
    return `${diffInDays} days ago`
  }

  // Otherwise, calculate how many full weeks have passed.
  const diffInWeeks = Math.floor(diffInDays / 7)
  return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`
}

export const isCriticalRequest = (config) => {
  // Normalize the method to uppercase for consistent comparison
  const method = config.method.toUpperCase()
  const url = config.url

  // Check if the request is a data-modifying method
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    // Exclude authentication-related endpoints
    if (
      url.includes('/users/signout') ||
      url.includes('/users/refresh') ||
      url.includes('/users/signin') ||
      url.includes('/users/signup') ||
      url.includes('/users/guest')
    ) {
      return false
    }
    // If not excluded, it’s a critical request
    return true
  }
  // Non-modifying methods (e.g., GET) are not critical
  return false
}

export const processRetryQueue = async (
  retryQueue,
  setRetryQueue,
  setTasks,
  setTriggerRetry,
  isProcessingQueue,
  setLabels
) => {
  const queue = [...retryQueue]
  setRetryQueue([]) // Clear the queue immediately to avoid duplicate processing
  let shouldFetchTasks = false
  try {
    for (const request of queue) {
      try {
        const response = await axios(request)
        // Check if the request is related to tasks
        if (request.url.includes('/tasks')) {
          const updatedTask = response.data // Assuming the response contains the task data
          setTasks((prevTasks) => {
            const taskId = updatedTask._id // Assuming the task has an '_id' field
            const method = request.method.toUpperCase()

            if (method === 'POST') {
              // For task creation, append the new task
              return [...prevTasks, updatedTask]
            } else if (method === 'PUT' || method === 'PATCH') {
              // For task updates, replace the existing task
              return prevTasks.map((task) =>
                task._id === taskId ? updatedTask : task
              )
            } else if (method === 'DELETE') {
              // For task deletion, remove the task
              return prevTasks.filter((task) => task._id !== taskId)
            }
            return prevTasks // No change if method is unrecognized
          })
        } else if (request.url.includes('/labels')) {
          const updatedLabel = response.data
          setLabels((prevLabels) => {
            const labelId = updatedLabel._id
            const method = request.method.toUpperCase()

            if (method === 'POST') {
              // For task creation, append the new task
              return [...prevLabels, updatedLabel]
            } else if (method === 'PUT' || method === 'PATCH') {
              shouldFetchTasks = true
              return prevLabels.map((label) =>
                label._id === labelId ? updatedLabel : label
              )
            } else if (method === 'DELETE') {
              shouldFetchTasks = true
              return prevLabels.filter((label) => label._id !== labelId)
            }
            return prevLabels // No change if method is unrecognized
          })
        }
      } catch (error) {
        console.error('Retry failed:', error)
        // Optionally, add logic to re-queue or handle persistent failures
      }
    }
    if (shouldFetchTasks) {
      const updatedTasks = await getTasks()
      setTasks(updatedTasks)
    }
  } catch (error) {
    console.error('Error processing retry queue:', error)
  } finally {
    isProcessingQueue.current = false
    setTriggerRetry(false) // Reset the trigger
  }
}
