import { CircularProgress } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) {
    return <CircularProgress />
  }
  console.log('isAuthenticated', isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />
}
export default ProtectedRoute
