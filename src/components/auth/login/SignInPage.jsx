import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import ForgotPassword from './ForgotPassword'
import AppTheme from './AppTheme'
import { useEffect, useState } from 'react'
import { CircularProgress, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { validateInputs } from '~/utils/helpers'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px'
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
  })
}))

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
    })
  }
}))

export default function SignInPage(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [rememberMe, setRememberMe] = useState(() => {
    return JSON.parse(localStorage.getItem('rememberMePreference')) || false
  })

  const { signIn, guestSignIn, isSigningIn, isGuestSigningIn } = useAuth()

  let navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (localStorage.getItem('rememberedEmail')) {
      setEmail(localStorage.getItem('rememberedEmail'))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('rememberMePreference', JSON.stringify(rememberMe))
  }, [rememberMe])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (
      validateInputs(
        email,
        password,
        setEmailError,
        setEmailErrorMessage,
        setPasswordError,
        setPasswordErrorMessage
      )
    ) {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }

      try {
        await signIn(email, password)
        navigate('/')
      } catch (error) {
        setEmailError(true)
        setEmailErrorMessage('Invalid email or password.')
      }
    }
  }

  const handleGuestSignIn = async (event) => {
    event.preventDefault()
    try {
      await guestSignIn()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickShowPassword = () =>
    setShowPassword((prevState) => !prevState)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event) => {
    event.preventDefault()
  }

  const handleRememberMeClick = () => {
    setRememberMe(!rememberMe)
  }
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction='column' justifyContent='space-between'>
        <Card variant='outlined'>
          <Typography
            component='h1'
            variant='h4'
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2
            }}
          >
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id='email'
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='your@email.com'
                autoComplete='email'
                autoFocus
                required
                fullWidth
                variant='outlined'
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name='password'
                placeholder='••••••'
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
                autoFocus
                required
                fullWidth
                variant='outlined'
                color={passwordError ? 'error' : 'primary'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          sx={{
                            color: '#cccccc',
                            border: 'none',
                            backgroundColor: 'transparent',
                            '&:hover': {
                              backgroundColor: 'transparent'
                            }
                          }}
                          aria-label={
                            showPassword
                              ? 'hide the password'
                              : 'display the password'
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  value='remember'
                  color='primary'
                  onChange={handleRememberMeClick}
                  checked={rememberMe}
                />
              }
              label='Remember me'
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={isSigningIn || isGuestSigningIn}
              sx={{
                '&:disabled': {
                  color: 'white'
                }
              }}
            >
              {isSigningIn ? (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <CircularProgress sx={{ color: 'white' }} size={14} />
                  <span>Signing in...</span>
                </Box>
              ) : (
                'Sign in'
              )}
            </Button>

            <Button
              fullWidth
              variant='outlined'
              onClick={handleGuestSignIn}
              disabled={isGuestSigningIn || isSigningIn}
              sx={{
                '&:disabled': {
                  color: 'black'
                }
              }}
            >
              {isGuestSigningIn ? (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <CircularProgress sx={{ color: 'black' }} size={14} />
                  <span>Signing in...</span>
                </Box>
              ) : (
                'Sign in as a guest'
              )}
            </Button>
            <Link
              component='button'
              type='button'
              onClick={handleClickOpen}
              variant='body2'
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link href='/signup' variant='body2' sx={{ alignSelf: 'center' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  )
}
