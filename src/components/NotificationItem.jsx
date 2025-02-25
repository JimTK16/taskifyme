import { Box, Typography, Checkbox } from '@mui/material'
import { PanoramaFishEye, Adjust, Campaign } from '@mui/icons-material'
import { useState, useContext, useCallback } from 'react'
import { NotificationContext } from '~/context/context'
import { toggleIsRead } from '~/services'
import { formatRelativeTime } from '~/utils/helpers'

const NotificationItem = ({
  listTitle,
  modalTitle,
  isRead,
  message,
  id,
  createdAt,
  onOpenModal
}) => {
  const [messageRead, setMessageRead] = useState(isRead)
  const { notifications, setNotifications } = useContext(NotificationContext)
  const [isToggling, setIsToggling] = useState(false)
  const handleToggleRead = async (openModal = false) => {
    if (isToggling) return
    if (openModal && messageRead) return
    const newMessageRead = openModal ? true : !messageRead
    setIsToggling(true)
    try {
      const response = await toggleIsRead(id, { isRead: newMessageRead })
      const updatedNotifications = notifications.map((notification) => {
        if (notification._id === response._id) {
          return response
        }
        return notification
      })

      setNotifications(updatedNotifications)
      setMessageRead(newMessageRead)
    } catch (error) {
      console.log(error)
    } finally {
      setIsToggling(false)
    }
  }
  const handleShowNotificationModal = useCallback(() => {
    onOpenModal(message, modalTitle)
    handleToggleRead(true)
  }, [handleToggleRead, message, modalTitle, onOpenModal])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          bgcolor: !messageRead ? '#eee' : 'white',
          mb: 1,
          p: 1,
          cursor: 'pointer',
          borderRadius: '10px',
          borderLeft: !messageRead
            ? '4px solid #39485E'
            : '4px solid transparent',
          borderBottom: !messageRead
            ? '1px solid transparent'
            : '1px solid #eee'
        }}
        onClick={handleShowNotificationModal}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Campaign />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px' }}>{listTitle}</Typography>
          <Typography sx={{ fontSize: '12px', color: '#777' }}>
            {formatRelativeTime(createdAt)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            marginLeft: 'auto',
            alignItems: 'flex-end'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            sx={{ p: 0 }}
            icon={<PanoramaFishEye sx={{ height: '12px', width: '12px' }} />}
            checked={!messageRead}
            onChange={(e) => {
              e.stopPropagation()
              handleToggleRead()
            }}
            checkedIcon={
              <Adjust sx={{ height: '12px', width: '12px', color: 'black' }} />
            }
          />
        </Box>
      </Box>
    </>
  )
}

export default NotificationItem
