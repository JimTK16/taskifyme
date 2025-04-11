import { IconButton, Tooltip } from '@mui/material';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';

const ToggleSideBarButton = ({ showSideBar, onToggle }) => {
  return (
    <Tooltip title="Toggle Sidebar">
      <IconButton
        aria-label="toggle sidebar"
        sx={(theme) => ({
          position: 'fixed',
          left: showSideBar ? `calc(280px - ${theme.spacing(4)})` : theme.spacing(5),
          top: theme.spacing(2),
          zIndex: 1300,
          borderRadius: '10%',
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { backgroundColor: 'action.hover' },
          p: 0,
          width: 32,
          height: 32,
        })}
        onClick={onToggle}
      >
        <ViewSidebarOutlinedIcon fontSize="small" sx={{ color: '#424242' }} />
      </IconButton>
    </Tooltip>
  );
};

export default ToggleSideBarButton;