import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import ForgotPassword from './ForgotPassword'
import { useEffect, useState } from 'react'
import { CircularProgress, IconButton, InputAdornment } from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material'
import { validateInputs } from '~/utils/helpers'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'
import Logo from './Logo'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px'
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
  }),
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  }
}))

export default function SignInCard(props) {
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
    <Card variant='outlined' sx={{ maxWidth: '450px' }}>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'flex-start'
        }}
      >
        <Logo width={150} />
      </Box>
      <Typography
        component='h1'
        variant='h4'
        sx={{
          width: '100%',
          fontSize: 'clamp(2rem, 10vw, 2.15rem)',
          fontWeight: 'bold'
        }}
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
          gap: 3
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
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon
                      sx={{
                        color: 'text.secondary',
                        height: 20,
                        width: 20
                      }}
                    />
                  </InputAdornment>
                )
              }
            }}
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
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon
                      sx={{
                        color: 'text.secondary',
                        height: 20,
                        width: 20
                      }}
                    />
                  </InputAdornment>
                ),
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
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: 2
            },
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
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: 2
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
      <Divider sx={{ my: 2, color: 'text.secondary' }}>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link href='/signup' variant='body2' sx={{ alignSelf: 'center' }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Card>
  )
}
