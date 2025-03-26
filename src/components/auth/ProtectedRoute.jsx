import { Box, CircularProgress } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />
}
export default ProtectedRoute
