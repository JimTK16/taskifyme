import { Box, Typography, Button } from '@mui/material'
import BaseModal from '../BaseModal'
import { deleteTaskAPI } from '~/services'
import { useContext } from 'react'
import { TaskContext } from '~/context/context'

const DeleteTaskModal = ({ open, onClose }) => {
  const {
    tasks,
    setTasks,
    setShowSnackBar,
    setLastDeletedTaskId,
    deletingTask
  } = useContext(TaskContext)

  const handleDelete = async () => {
    try {
      const response = await deleteTaskAPI(deletingTask._id)
      const updatedTasks = tasks.map((task) => {
        if (task._id.toString() === deletingTask._id) {
          return { ...response }
        }
        return task
      })

      setTasks(updatedTasks)
    } catch (error) {
      console.error('Deletion failed:', error)
    } finally {
      onClose()
      setLastDeletedTaskId(deletingTask._id)
      setShowSnackBar(true)
    }
  }
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      aria-labelledby='delete-modal-title'
      aria-describedby='delete-modal-description'
      maxWidth={480}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant='h6'
          id='delete-modal-title'
          sx={{ fontWeight: 400 }}
        >
          Delete task?
        </Typography>

        <Typography
          variant='body2'
          id='delete-modal-description'
          sx={{ color: '#444', pt: 1 }}
        >
          The <strong>{deletingTask.title}</strong> task will be permanently
          deleted.
        </Typography>
        <Box
          sx={{
            pt: 3,
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
              color: 'white',
              bgcolor: '#39485e',
              position: 'relative',
              '&:hover': {
                bgcolor: '#2a374a'
              }
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </BaseModal>
  )
}

export default DeleteTaskModal
