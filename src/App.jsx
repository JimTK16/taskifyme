import './App.css'
import SideBar from './components/sidebar/SideBar'
import { Grid2 } from '@mui/material'
import { BrowserRouter, Route, Outlet, Routes, Navigate } from 'react-router'
import Today from './components/Today'
import Upcoming from './components/Upcoming'
import Inbox from './components/Inbox'
import Register from './components/auth/signup/SignUp'
import ProtectedRoute from './components/auth/ProtectedRoute'
import SignIn from './components/auth/login/SignIn'
import Redirecting from './components/auth/signup/Redirecting'
import AuthContextProvider from './context/AuthContext'
import TaskContextProvider from './context/TaskContext'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AppSnackBar from './components/AppSnackBar'
import { useContext } from 'react'
import { TaskContext } from './context/context'
const Layout = () => {
  const { setShowSnackBar, showSnackBar } = useContext(TaskContext)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid2 container>
        <Grid2
          sx={{
            p: 1,
            height: '100vh',
            width: 280,
            bgcolor: '#FAFAFA',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          <SideBar />
        </Grid2>
        <Grid2 sx={{ flexGrow: 1, p: 4 }}>
          <Outlet />
        </Grid2>
      </Grid2>
      <AppSnackBar
        setShowSnackBar={setShowSnackBar}
        showSnackBar={showSnackBar}
      />
    </LocalizationProvider>
  )
}
function App() {
  return (
    <AuthContextProvider>
      <TaskContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/redirect' element={<Redirecting />} />
            <Route path='/signup' element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Layout />}>
                <Route index element={<Navigate to='today' replace />} />
                <Route path='upcoming' element={<Upcoming />} />
                <Route path='today' element={<Today />} />
                <Route path='inbox' element={<Inbox />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskContextProvider>
    </AuthContextProvider>
  )
}

export default App
