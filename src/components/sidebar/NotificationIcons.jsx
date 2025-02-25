import { Badge, Box, IconButton } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { NotificationContext } from '~/context/context'

const NotificationIcons = () => {
  const navigate = useNavigate()
  const { unreadCount } = useContext(NotificationContext)
  return (
    <Box>
      <IconButton
        aria-label='notification'
        sx={{ borderRadius: '10%' }}
        onClick={() => {
          navigate('/notifications')
        }}
      >
        <Badge variant='dot' color='warning' invisible={unreadCount === 0}>
          <NotificationsNoneOutlinedIcon fontSize='small' />
        </Badge>
      </IconButton>
      <IconButton aria-label='toggle sidebar' sx={{ borderRadius: '10%' }}>
        <ViewSidebarOutlinedIcon fontSize='small' />
      </IconButton>
    </Box>
  )
}

export default NotificationIcons
