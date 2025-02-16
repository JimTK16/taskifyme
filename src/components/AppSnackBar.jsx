import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export default function AppSnackBar({ showSnackBar, setShowSnackBar }) {
  const handleClose = () => {
    setShowSnackBar(false)
  }

  const action = (
    <>
      <Button sx={{ color: 'gray' }} size='small' onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  )

  return (
    <Snackbar
      open={showSnackBar}
      autoHideDuration={160000}
      onClose={handleClose}
      message='1 task deleted'
      action={action}
      ContentProps={{
        sx: {}
      }}
    />
  )
}
