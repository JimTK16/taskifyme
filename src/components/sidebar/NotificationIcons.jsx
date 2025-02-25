import { Box, IconButton } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined'
import { useNavigate } from 'react-router-dom'

const NotificationIcons = () => {
  const navigate = useNavigate()
  return (
    <Box>
      <IconButton
        aria-label='notification'
        sx={{ borderRadius: '10%' }}
        onClick={() => {
          navigate('/notifications')
        }}
      >
        <NotificationsNoneOutlinedIcon fontSize='small' />
      </IconButton>
      <IconButton aria-label='toggle sidebar' sx={{ borderRadius: '10%' }}>
        <ViewSidebarOutlinedIcon fontSize='small' />
      </IconButton>
    </Box>
  )
}

export default NotificationIcons
