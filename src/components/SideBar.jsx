import {
  Box,
  Avatar,
  Button,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  FormControl,
  InputBase,
  Stack,
  Divider,
  Tooltip
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
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { red } from '@mui/material/colors'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'

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
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: '0 15px 50px 0 rgba(0, 0, 0, 0.35)'
}
const SideBar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const { userDetails, signOut } = useAuth()
  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  const navigate = useNavigate()
  return (
    <nav>
      {/* Sidebar header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tooltip title={userDetails.email}>
          <Button
            variant='text'
            startIcon={
              <Avatar
                sx={{
                  bgcolor: red[500],
                  width: 24,
                  height: 24,
                  marginRight: 0.5
                }}
              >
                {userDetails.email.charAt(0).toUpperCase()}
              </Avatar>
            }
            endIcon={<KeyboardArrowDownOutlinedIcon onClick={handleMenuOpen} />}
            sx={{
              textTransform: 'none',
              color: 'gray',
              '&:hover': { bgcolor: '#f0f0f0' },
              fontSize: 13
            }}
          >
            {`${userDetails.email.slice(0, 6)}.....`}
          </Button>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id='account-menu'
          open={open}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          sx={{ mt: 1 }}
        >
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        <Box>
          <IconButton aria-label='notification' sx={{ borderRadius: '10%' }}>
            <NotificationsNoneOutlinedIcon fontSize='small' />
          </IconButton>
          <IconButton aria-label='toggle sidebar' sx={{ borderRadius: '10%' }}>
            <ViewSidebarOutlinedIcon fontSize='small' />
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
        onClick={handleModalOpen}
      >
        Add new task
      </Button>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: { sx: { backgroundColor: 'transparent' } }
        }}
      >
        <Fade in={modalOpen}>
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
                  onClick={handleModalClose}
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
          onClick={() => navigate('/inbox')}
        >
          Inbox
        </Button>
        <Button
          sx={mainFiltersStyle}
          startIcon={<EventAvailableOutlinedIcon sx={iconStyle} />}
          onClick={() => navigate('/today')}
        >
          Today
        </Button>
        <Button
          sx={mainFiltersStyle}
          startIcon={<CalendarMonthOutlinedIcon sx={iconStyle} />}
          onClick={() => navigate('/upcoming')}
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
