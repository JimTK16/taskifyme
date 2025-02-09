import { Box, IconButton } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined'

const NotificationIcons = () => {
  return (
    <Box>
      <IconButton aria-label='notification' sx={{ borderRadius: '10%' }}>
        <NotificationsNoneOutlinedIcon fontSize='small' />
      </IconButton>
      <IconButton aria-label='toggle sidebar' sx={{ borderRadius: '10%' }}>
        <ViewSidebarOutlinedIcon fontSize='small' />
      </IconButton>
    </Box>
  )
}

export default NotificationIcons
