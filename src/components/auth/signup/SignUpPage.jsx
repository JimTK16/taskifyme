import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import AppTheme from '../login/AppTheme'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signUpAPI } from '~/services/index'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { validateInputs } from '~/utils/helpers'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px'
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
  })
}))

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

const SignUpPage = (props) => {
  let navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

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
      const data = { email, password }
      try {
        await signUpAPI(data)

        navigate('/redirect')
      } catch (error) {
        setEmailError(true)
        setEmailErrorMessage('Email already exists.')
      }
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

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <SignUpContainer direction='column' justifyContent='space-between'>
        <Card variant='outlined'>
          <Typography
            component='h1'
            variant='h4'
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                required
                fullWidth
                id='email'
                placeholder='your@email.com'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
                variant='outlined'
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <TextField
                required
                fullWidth
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••'
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='new-password'
                variant='outlined'
                error={passwordError}
                helperText={passwordErrorMessage}
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

            <Button type='submit' fullWidth variant='contained'>
              Sign up
            </Button>
          </Box>

          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link href='/signin' variant='body2' sx={{ alignSelf: 'center' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  )
}

export default SignUpPage
