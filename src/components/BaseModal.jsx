import { Box, Modal, Backdrop, Fade } from '@mui/material'

const modalStyle = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  // maxWidth: 650,
  minWidth: 300,
  maxHeight: '80vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '8px',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease'
}

const BaseModal = ({
  open,
  onClose,
  children,
  ariaLabelledBy,
  ariaDescribedBy,
  maxWidth = 650
}) => {
  modalStyle.maxWidth = maxWidth
  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return
    }
    onClose()
  }

  return (
    <Modal
      disableRestoreFocus
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
      closeAfterTransition={false}
      slotProps={{
        backdrop: { invisible: true }
      }}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>{children}</Box>
      </Fade>
    </Modal>
  )
}

export default BaseModal
