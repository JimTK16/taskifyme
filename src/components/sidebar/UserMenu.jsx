import { Avatar, Button, Tooltip } from '@mui/material'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useAuth } from '~/hooks/useAuth'
import { useState } from 'react'
import { red } from '@mui/material/colors'

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
    </>
  )
}

export default UserMenu
