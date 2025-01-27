import './App.css'
import SideBar from './components/SideBar'
import { Grid2 } from '@mui/material'
import { BrowserRouter, Route, Outlet, Routes, Navigate } from 'react-router'
import Today from './components/Today'
import Upcoming from './components/Upcoming'
import Inbox from './components/Inbox'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProtectedRoute from './components/auth/ProtectedRoute'
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="today" replace />} />
            <Route path="upcoming" element={<Upcoming />} />
            <Route path="today" element={<Today />} />
            <Route path="inbox" element={<Inbox />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
