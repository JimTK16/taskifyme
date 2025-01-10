import './App.css'
import SideBar from './components/SideBar'
import MainView from './components/MainView'
import { Grid2 } from '@mui/material'

function App() {
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
        <MainView />
      </Grid2>
    </Grid2>
  )
}

export default App
