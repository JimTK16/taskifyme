import { Box, Container, Typography, Button, Collapse } from '@mui/material'
import { useContext, useState } from 'react'
import NotificationItem from './NotificationItem'
import { NotificationContext } from '~/context/context'
import { TransitionGroup } from 'react-transition-group'

const ToggleButton = ({ label, isSelected, onClick, unreadCount }) => {
  return (
    <Button
      disableRipple
      sx={{
        color: 'black',
        borderRadius: '100px',
        textTransform: 'none',
        backgroundColor: isSelected ? 'white' : 'transparent'
      }}
      onClick={onClick}
    >
      {label}{' '}
      {unreadCount > 0 && (
        <span style={{ color: 'gray', marginLeft: '4px ' }}>{unreadCount}</span>
      )}
    </Button>
  )
}

const NotificationPage = () => {
  const [selectAll, setSelectAll] = useState(true)
  const { notifications } = useContext(NotificationContext)
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length

  const notificationsToShow = selectAll
    ? notifications
    : notifications.filter((notification) => !notification.isRead)

  return (
    <Container maxWidth='md'>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          Notifications
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 0,
            backgroundColor: '#f5f5f5',
            maxWidth: 'fit-content',
            borderRadius: '100px',
            p: 0.5,
            mt: 2
          }}
        >
          <ToggleButton
            label={'All'}
            isSelected={selectAll}
            onClick={() => setSelectAll(true)}
          />
          <ToggleButton
            label={'Unread'}
            isSelected={!selectAll}
            onClick={() => setSelectAll(false)}
            unreadCount={unreadCount}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TransitionGroup>
            {notificationsToShow.map((notification) => (
              <Collapse key={notification._id}>
                <NotificationItem
                  key={notification._id}
                  listTitle={notification.listTitle}
                  modalTitle={notification.modalTitle}
                  message={notification.message}
                  isRead={notification.isRead}
                  id={notification._id}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </Box>
      </Box>
    </Container>
  )
}
export default NotificationPage
