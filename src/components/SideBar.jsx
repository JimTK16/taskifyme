import {
  Box,
  Avatar,
  Button,
  IconButton,
  Modal,
  Typography,
  Backdrop
} from '@mui/material'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LensBlurOutlinedIcon from '@mui/icons-material/LensBlurOutlined'
import { red } from '@mui/material/colors'
import { useState } from 'react'

const mainFiltersStyle = {
  textTransform: 'none',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  color: '#202020'
}

const iconStyle = {
  width: 24,
  height: 24
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}
const SideBar = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <nav>
      {/* Sidebar header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="text"
          startIcon={
            <Avatar
              sx={{
                bgcolor: red[500],
                width: 24,
                height: 24,
                marginRight: 0.5
              }}
            >
              J
            </Avatar>
          }
          endIcon={<KeyboardArrowDownOutlinedIcon />}
          sx={{
            textTransform: 'none',
            color: 'gray',
            '&:hover': { bgcolor: '#f0f0f0' },
            fontSize: 13
          }}
        >
          Duy
        </Button>
        <Box>
          <IconButton aria-label="notification" sx={{ borderRadius: '10%' }}>
            <NotificationsNoneOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="toggle sidebar" sx={{ borderRadius: '10%' }}>
            <ViewSidebarOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Add task button */}

      <Button
        sx={{
          color: '#39485e',
          textTransform: 'none',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start'
        }}
        startIcon={<AddCircleIcon sx={iconStyle} />}
        onClick={handleOpen}
      >
        Add new task
      </Button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: { sx: { backgroundColor: 'transparent' } }
        }}
      >
        <Box sx={modalStyle}>
          <Typography>Modal</Typography>
        </Box>
      </Modal>
      {/* Main filters */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Button
          sx={mainFiltersStyle}
          startIcon={<SearchOutlinedIcon sx={iconStyle} />}
        >
          Search
        </Button>
        <Button
          sx={mainFiltersStyle}
          startIcon={<InboxOutlinedIcon sx={iconStyle} />}
        >
          Inbox
        </Button>
        <Button
          sx={mainFiltersStyle}
          startIcon={<EventAvailableOutlinedIcon sx={iconStyle} />}
        >
          Today
        </Button>
        <Button
          sx={mainFiltersStyle}
          startIcon={<CalendarMonthOutlinedIcon sx={iconStyle} />}
        >
          Upcoming
        </Button>
        <Button
          sx={mainFiltersStyle}
          startIcon={<LensBlurOutlinedIcon sx={iconStyle} />}
        >
          Filters & Labels{' '}
        </Button>
      </Box>
      {/* My projects */}
    </nav>
  )
}
export default SideBar
