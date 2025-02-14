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
