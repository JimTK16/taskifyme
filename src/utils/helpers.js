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
