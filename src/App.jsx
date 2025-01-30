import './App.css'
import SideBar from './components/SideBar'
import { Grid2 } from '@mui/material'
import { BrowserRouter, Route, Outlet, Routes, Navigate } from 'react-router'
import Today from './components/Today'
import Upcoming from './components/Upcoming'
import Inbox from './components/Inbox'
import Login from './components/auth/login/SignIn'
import Register from './components/auth/signup/SignUp'
import ProtectedRoute from './components/auth/ProtectedRoute'
import SignIn from './components/auth/login/SignIn'
const Layout = () => {
  return (
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
  )
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
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
  )
}

export default App
