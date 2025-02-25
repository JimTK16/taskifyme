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
