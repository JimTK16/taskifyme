import {
  Box,
  Button,
  Modal,
  Backdrop,
  Fade,
  FormControl,
  InputBase,
  Stack,
  Divider
} from '@mui/material'
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import { useState } from 'react'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: '0 15px 50px 0 rgba(0, 0, 0, 0.35)'
}
const AddTaskModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'transparent' } }
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <form>
            <Box sx={{ p: 2 }}>
              <FormControl fullWidth>
                <InputBase
                  placeholder='Practice math problems daily'
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: 20
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#202020',

                      fontWeight: '600'
                    }
                  }}
                ></InputBase>
              </FormControl>
              <FormControl fullWidth>
                <InputBase
                  placeholder='Description'
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: 13
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#0006',
                      fontWeight: '500'
                    }
                  }}
                ></InputBase>
              </FormControl>
              <Stack spacing={2} direction='row'>
                <Button
                  variant='outlined'
                  startIcon={
                    <CalendarTodayOutlinedIcon
                      style={{ fontSize: 14, marginBottom: 1 }}
                    />
                  }
                  sx={{
                    textTransform: 'none',
                    border: '1px solid #e6e6e6',
                    color: '#666',
                    fontWeight: '400',
                    fontSize: 14
                  }}
                >
                  Date
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  startIcon={
                    <OutlinedFlagOutlinedIcon
                      style={{ fontSize: 14, marginBottom: 1 }}
                    />
                  }
                  sx={{
                    textTransform: 'none',
                    border: '1px solid #e6e6e6',
                    color: '#666',
                    fontWeight: '400'
                  }}
                >
                  Priority
                </Button>
              </Stack>
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
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  textTransform: 'none',
                  color: '#fff',
                  bgcolor: '#a4a9b0'
                }}
              >
                Add task
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

export default AddTaskModal
