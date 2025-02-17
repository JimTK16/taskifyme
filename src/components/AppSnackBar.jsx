import { Snackbar, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function AppSnackBar({ showSnackBar, setShowSnackBar }) {
  const handleClose = () => setShowSnackBar(false)

  return (
    <Snackbar
      open={showSnackBar}
      autoHideDuration={1600000}
      onClose={handleClose}
      message='1 task deleted'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      ContentProps={{
        sx: {
          boxSizing: 'border-box !important',
          minWidth: '240px !important',
          bgcolor: '#39485e',
          color: 'white',
          flexWrap: 'nowrap',
          flexGrow: 1
        }
      }}
      action={
        <>
          <Button
            sx={{
              color: '#ffffff !important',
              minWidth: '60px',
              fontSize: '0.8rem'
            }}
            onClick={handleClose}
          >
            UNDO
          </Button>
          <IconButton
            size='small'
            sx={{ color: '#ffffff !important' }}
            onClick={handleClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </>
      }
    />
  )
}
