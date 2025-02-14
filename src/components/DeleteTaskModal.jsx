import { Box, Button, Modal, Backdrop, Fade, Typography } from '@mui/material'

const modalStyle = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 300,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: '0 15px 50px 0 rgba(0, 0, 0, 0.35)'
}
const DeleteTaskModal = ({ showDeleteModal, setShowDeleteModal, title }) => {
  return (
    <Modal
      open={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: { invisible: true }
      }}
      aria-labelledby='delete-modal-title'
      aria-describedby='delete-modal-description'
      closeAfterTransition
    >
      <Fade in={showDeleteModal}>
        <Box sx={modalStyle}>
          <Box sx={{ p: 2 }}>
            <Typography
              variant='h6'
              id='delete-modal-title'
              sx={{ fontWeight: 400 }}
            >
              Delete task?
            </Typography>

            <Typography
              variant='body2'
              id='delete-modal-description'
              sx={{ color: '#444', pt: 1 }}
            >
              The <strong>{title}</strong> task will be permanently deleted.
            </Typography>
            <Box
              sx={{
                pt: 3,
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
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  textTransform: 'none',
                  color: 'white',
                  bgcolor: '#39485e',
                  position: 'relative',
                  '&:hover': {
                    bgcolor: '#2a374a'
                  }
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default DeleteTaskModal
