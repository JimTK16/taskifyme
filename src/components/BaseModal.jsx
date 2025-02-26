import { Box, Modal, Backdrop, Fade } from '@mui/material'

const modalStyle = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 280,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: '0 15px 50px 0 rgba(0, 0, 0, 0.35)'
}

const BaseModal = ({
  open,
  onClose,
  children,
  ariaLabelledBy,
  ariaDescribedBy
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
