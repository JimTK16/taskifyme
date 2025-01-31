import { CircularProgress, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Redirecting = () => {
  let navigate = useNavigate()
  setTimeout(() => {
    navigate('/signin')
  }, 3500)
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
      <Typography variant='h5'>Redirecting to the Sign in page.....</Typography>
      <CircularProgress color='primary' />
    </Container>
  )
}

export default Redirecting
