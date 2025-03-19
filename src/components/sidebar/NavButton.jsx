import { Button } from '@mui/material'
const NavButton = ({
  icon,
  label,
  onClick,
  navigateTo,
  onNavItemClick,
  isActive
}) => {
  const IconComponent = icon
  return (
    <Button
      sx={{
        color: isActive ? '#4A86E8' : '#202020',
        fontWeight: isActive ? 700 : 500,
        textTransform: 'none',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: isActive ? 'rgba(74, 134, 232, 0.04)' : 'transparent',
        '&:hover': { bgcolor: '#E3F2FD' } // Modern hover effect
      }}
      startIcon={
        <IconComponent
          sx={{
            width: 24,
            height: 24,
            color: isActive ? '#4A86E8' : '#202020'
          }}
        />
      }
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
