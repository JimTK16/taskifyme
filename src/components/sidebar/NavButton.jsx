import { Button } from '@mui/material'
const NavButton = ({ icon, label, onClick, navigateTo, onNavItemClick }) => {
  const IconComponent = icon
  return (
    <Button
      sx={{
        color: '#202020',
        textTransform: 'none',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        '&:hover': { bgcolor: '#f0f0f0' }
      }}
      startIcon={<IconComponent sx={{ width: 24, height: 24 }} />}
      onClick={() => {
        if (navigateTo) {
          onClick(navigateTo)
          onNavItemClick()
        }
      }}
    >
      {label}
    </Button>
  )
}
export default NavButton
