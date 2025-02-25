import { Box, Typography, Checkbox } from '@mui/material'
import { PanoramaFishEye, Adjust, Campaign } from '@mui/icons-material'
import { useState, useContext } from 'react'
import { NotificationContext } from '~/context/context'
import { toggleIsRead } from '~/services'

const NotificationItem = ({ listTitle, modalTitle, isRead, message, id }) => {
  const [messageRead, setMessageRead] = useState(isRead)
  const { notifications, setNotifications } = useContext(NotificationContext)
  const [isToggling, setIsToggling] = useState(false)
  const handleToggleRead = async () => {
    if (isToggling) return
    const newMessageeRead = !messageRead
    setIsToggling(true)
    try {
      const response = await toggleIsRead(id, { isRead: newMessageeRead })
      const updatedNotifications = notifications.map((notification) => {
        if (notification._id === response._id) {
          return response
        }
        return notification
      })

      setNotifications(updatedNotifications)
      setMessageRead(newMessageeRead)
    } catch (error) {
      console.log(error)
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        bgcolor: !messageRead ? '#eee' : 'white',
        mb: 1,
        p: 1,
        borderRadius: '10px',
        borderLeft: !messageRead
          ? '4px solid #39485E'
          : '4px solid transparent',
        borderBottom: !messageRead ? '1px solid transparent' : '1px solid #eee'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Campaign />
      </Box>
      <Box>
        <Typography>{listTitle}</Typography>
        <Typography>Today</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          marginLeft: 'auto',
          alignItems: 'flex-end'
        }}
      >
        <Checkbox
          sx={{ p: 0 }}
          icon={<PanoramaFishEye sx={{ height: '12px', width: '12px' }} />}
          checked={!messageRead}
          onChange={handleToggleRead}
          checkedIcon={
            <Adjust sx={{ height: '12px', width: '12px', color: 'black' }} />
          }
        />
      </Box>
    </Box>
  )
}

export default NotificationItem
