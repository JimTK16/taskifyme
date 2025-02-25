import { Box, Button, Divider, Typography } from '@mui/material'
import BaseModal from './BaseModal'

const NotificationModal = ({
  modalTitle,
  message,
  showNotificationModal,
  handleCloseNotificationModal
}) => {
  return (
    <BaseModal
      open={showNotificationModal}
      onClose={handleCloseNotificationModal}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography sx={{ fontSize: '20px' }}>{modalTitle}</Typography>
        <Typography sx={{ fontSize: '14px', color: '#808080' }}>
          {message}
        </Typography>
      </Box>
      <Divider sx={{ m: 0 }} />
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1
        }}
      >
        <Button
          sx={{
            textTransform: 'none',
            color: '#444',
            bgcolor: '#f5f5f5'
          }}
          onClick={handleCloseNotificationModal}
        >
          Close
        </Button>
      </Box>
    </BaseModal>
  )
}

export default NotificationModal
