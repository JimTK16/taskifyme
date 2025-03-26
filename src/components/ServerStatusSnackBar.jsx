import { Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useContext, useState } from 'react'
import { AuthContext } from '~/context/context'

export default function ServerStatusSnackBar({ message }) {
  const { setServerStatusMessage } = useContext(AuthContext)
  const [open, setOpen] = useState(true)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setServerStatusMessage('')
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={4500}
      onClose={handleClose}
      message={message.content}
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
