import { CircularProgress, Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RedirectingPage = () => {
  let navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signin')
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigate])
  return (
    <Container
      sx={{
        textAlign: 'center',
        pt: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }}
    >
      <Typography variant='h4'>Your account has been created.</Typography>
      <Typography variant='h5' aria-live='polite'>
        Redirecting to the Sign In page...
      </Typography>
      <CircularProgress color='primary' role='status' />
    </Container>
  )
}

export default RedirectingPage
