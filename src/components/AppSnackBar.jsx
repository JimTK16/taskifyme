import { Snackbar, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { updateTaskAPI } from '~/services'
import { useContext } from 'react'
import { TaskContext } from '~/context/context'

export default function AppSnackBar({ showSnackBar, setShowSnackBar }) {
  const { lastDeletedTaskId, setLastDeletedTaskId, tasks, setTasks } =
    useContext(TaskContext)
  const handleClose = () => setShowSnackBar(false)

  const handleUndo = async () => {
    try {
      const undoneTask = await updateTaskAPI(
        lastDeletedTaskId,
        {
          deletedAt: null,
          updatedAt: Date.now()
        },
        true
      )

      const updatedTasks = tasks.map((task) => {
        if (task._id === undoneTask._id) {
          return { ...undoneTask }
        }
        return task
      })
      setTasks(updatedTasks)
    } catch (error) {
      console.error('Undo failed:', error)
    } finally {
      setShowSnackBar(false)
      setLastDeletedTaskId(null)
    }
  }

  return (
    <Snackbar
      open={showSnackBar}
      autoHideDuration={6000}
      onClose={handleClose}
      message='1 task deleted'
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
          <Button
            sx={{
              color: '#ffffff !important',
              minWidth: '60px',
              fontSize: '0.8rem'
            }}
            onClick={handleUndo}
          >
            UNDO
          </Button>
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
