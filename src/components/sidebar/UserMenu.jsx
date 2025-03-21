import { Avatar, Button, Tooltip } from '@mui/material'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useAuth } from '~/hooks/useAuth'
import { useState } from 'react'

const UserMenu = () => {
  const { userDetails, signOut } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip title={userDetails.email}>
        <Button
          variant='text'
          onClick={handleMenuOpen}
          startIcon={
            <Avatar
              sx={{
                bgcolor: '#4A86E8',
                width: 24,
                height: 24,
                marginRight: 0.5
              }}
            >
              <span style={{ fontSize: '16px' }}>
                {userDetails.email.charAt(0).toUpperCase()}
              </span>
            </Avatar>
          }
          endIcon={
            <KeyboardArrowDownOutlinedIcon
              sx={{
                transistion: 'transform 0.2s ease',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          }
          sx={{
            textTransform: 'none',
            color: '#202020',
            py: 0.5,
            '&:hover': { bgcolor: '#E3F2FD' }, // Updated hover color
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
        PaperProps={{
          elevation: 2,
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: '6px',
            overflow: 'visible',
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
              borderRadius: '4px',
              mx: 0.5,
              my: 0.25,
              transition: 'background-color 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(74, 134, 232, 0.08)'
              }
            }
          }
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => signOut('manual')}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
