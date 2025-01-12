import './App.css'
import SideBar from './components/SideBar'
import { Grid2 } from '@mui/material'
import { BrowserRouter, Route, Outlet, Routes } from 'react-router'
import Today from './components/Today'
import Upcoming from './components/Upcoming'
import Inbox from './components/Inbox'

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
      <Grid2>
        <Outlet />
      </Grid2>
    </Grid2>
  )
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Today />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="inbox" element={<Inbox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
