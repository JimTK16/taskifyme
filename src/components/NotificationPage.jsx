import {
  Box,
  Container,
  Typography,
  Button,
  Collapse,
  Fade
} from '@mui/material'
import { useContext, useState } from 'react'
import NotificationItem from './NotificationItem'
import { NotificationContext } from '~/context/context'
import NotificationModal from './NotificationModal'
import ImageComponent from './ImageComponent'
import notificationPage from '~/assets/notificationPage.jpg'

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
  const [activeModal, setActiveModal] = useState({
    isOpen: false,
    message: null,
    modalTitle: null
  })
  const { notifications, unreadCount } = useContext(NotificationContext)

  const notificationsToShow = selectAll
    ? notifications
    : notifications.filter((notification) => !notification.isRead)

  const handleOpenModal = (message, modalTitle) => {
    setActiveModal({ isOpen: true, message, modalTitle })
  }

  const handleCloseModal = () => {
    setActiveModal({ isOpen: false, message: null, modalTitle: null })
  }
  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          py: 2,
          backgroundColor: 'white',
          pl: 0
        }}
      >
        <Container
          maxWidth='md'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: {
              xs: 'center',
              md: 'flex-start'
            }
          }}
        >
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
        </Container>
      </Box>
      <Container maxWidth='md' sx={{ mt: 2 }}>
        <Box sx={{ mt: 2 }}>
          {unreadCount === 0 && !selectAll && (
            <Fade in={unreadCount === 0 && !selectAll}>
              <Box>
                <ImageComponent
                  imgSrc={notificationPage}
                  text={"Nice work! You're all caught up!"}
                  altText={'Group of colorful trees'}
                />
              </Box>
            </Fade>
          )}

          {notificationsToShow.map((notification) => (
            <NotificationItem
              key={notification._id}
              listTitle={notification.listTitle}
              modalTitle={notification.modalTitle}
              message={notification.message}
              isRead={notification.isRead}
              id={notification._id}
              createdAt={notification.createdAt}
              onOpenModal={handleOpenModal}
            />
          ))}
        </Box>
        <NotificationModal
          modalTitle={activeModal.modalTitle}
          message={activeModal.message}
          showNotificationModal={activeModal.isOpen}
          handleCloseNotificationModal={handleCloseModal}
        />
      </Container>
    </>
  )
}
export default NotificationPage
