import { Outlet } from 'react-router-dom'
import { Fade, Grid2, Slide, useMediaQuery, useTheme } from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { AuthContext, LabelContext, TaskContext } from '~/context/context'
import SideBar from './sidebar/SideBar'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import EditLabelModal from './labelModals/EditLabelModal'
import DeleteLabelModal from './labelModals/DeleteLabelModal'
import AddTaskModal from './taskModals/AddTaskModal'
import EditTaskModal from './taskModals/EditTaskModal'
import DeleteTaskModal from './taskModals/DeleteTaskModal'
import DeleteSnackBar from './DeleteSnackBar'
import ServerStatusSnackBar from './ServerStatusSnackBar'
import ToggleSideBarButton from './sidebar/ToggleSideBarButton'
import AddLabelModal from './labelModals/AddLabelModal'
const Layout = () => {
  const {
    setShowSnackBar,
    showSnackBar,
    editingTask,
    setEditingTask,
    addingTask,
    setAddingTask,
    deletingTask,
    setDeletingTask
  } = useContext(TaskContext)
  const {
    addingLabel,
    setAddingLabel,
    editingLabel,
    setEditingLabel,
    deletingLabel,
    setDeletingLabel
  } = useContext(LabelContext)

  const { serverStatusMessage } = useContext(AuthContext)
  const [showSideBar, setShowSideBar] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSideBarToggle = () => {
    setShowSideBar(!showSideBar)
  }

  const handleNavItemClick = () => {
    if (isMobile) {
      setShowSideBar(false)
    }
  }

  useEffect(() => {
    if (isMobile) {
      setShowSideBar(false)
    } else {
      setShowSideBar(true)
    }
  }, [isMobile])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid2 container>
        <ToggleSideBarButton
          showSideBar={showSideBar}
          onToggle={handleSideBarToggle}
        />

        {/* Backdrop for mobile */}
        {isMobile && showSideBar && (
          <Fade in={showSideBar} mountOnEnter unmountOnExit>
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1199
              }}
              onClick={handleSideBarToggle}
            />
          </Fade>
        )}
        <Slide
          in={showSideBar}
          direction='right'
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 250, exit: 200 }}
        >
          <Grid2
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.04)',
              p: 1,
              height: '100vh',
              width: 280,
              bgcolor: '#F0F7FF',
              zIndex: 1200,
              ...(isMobile && {
                position: 'fixed',
                marginLeft: 0,
                transform: showSideBar ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              })
            }}
          >
            <SideBar onNavItemClick={handleNavItemClick} />
          </Grid2>
        </Slide>

        {/* Main content */}
        <Grid2
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflowY: 'auto',
            px: 0,
            pt: 0,
            marginLeft: {
              xs: 0,
              sm: showSideBar ? '280px' : 0
            },
            transition: (theme) =>
              theme.transitions.create('margin-left', {
                duration: theme.transitions.duration.standard
              })
          }}
        >
          <Outlet />
        </Grid2>
      </Grid2>
      <DeleteSnackBar
        setShowSnackBar={setShowSnackBar}
        showSnackBar={showSnackBar}
      />
      {serverStatusMessage !== '' && (
        <ServerStatusSnackBar message={serverStatusMessage} />
      )}
      {addingLabel && (
        <AddLabelModal open={true} onClose={() => setAddingLabel(false)} />
      )}
      {editingLabel && (
        <EditLabelModal
          open={true}
          onClose={() => setEditingLabel(null)}
          editingLabel={editingLabel}
        />
      )}
      {deletingLabel && (
        <DeleteLabelModal
          open={true}
          onClose={() => setDeletingLabel(null)}
          deletingLabel={deletingLabel}
        />
      )}
      {editingTask && (
        <EditTaskModal
          open={true}
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
      {addingTask && (
        <AddTaskModal open={true} onClose={() => setAddingTask(false)} />
      )}
      {deletingTask && (
        <DeleteTaskModal open={true} onClose={() => setDeletingTask(null)} />
      )}
    </LocalizationProvider>
  )
}

export default Layout
