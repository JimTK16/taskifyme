import { Badge, Box, IconButton, Tooltip } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { NotificationContext } from '~/context/context'

const NotificationIcons = ({ onNavItemClick }) => {
  const navigate = useNavigate()
  const { unreadCount } = useContext(NotificationContext)
  return (
    <Box>
      <Tooltip title='Notifications'>
        <IconButton
          aria-label='notification'
          sx={{
            borderRadius: '10%',
            marginRight: '30px',
            p: 0,
            width: 32,
            height: 32
          }}
          onClick={() => {
            navigate('/notifications')
            onNavItemClick()
          }}
        >
          <Badge variant='dot' color='warning' invisible={unreadCount === 0}>
            <NotificationsNoneOutlinedIcon
              fontSize='small'
              sx={{ color: '#424242' }}
            />
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default NotificationIcons
