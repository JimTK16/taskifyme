import { Box, Typography, Button, IconButton } from '@mui/material'
import BaseModal from '../BaseModal'
import { deleteTaskAPI } from '~/services'
import { useContext, useState } from 'react'
import { TaskContext } from '~/context/context'
import CloseIcon from '@mui/icons-material/Close'

const DeleteTaskModal = ({ open, onClose }) => {
  const {
    tasks,
    setTasks,
    setShowSnackBar,
    setLastDeletedTaskId,
    deletingTask
  } = useContext(TaskContext)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleDelete = async () => {
    try {
      setIsSubmitting(true)
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
      setIsSubmitting(false)
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography
            variant='h6'
            id='delete-modal-title'
            sx={{ color: '#4A86E8', fontWeight: 600 }}
          >
            Delete task?
          </Typography>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>

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
            variant='text'
            sx={{
              textTransform: 'none',
              color: '#444',
              fontSize: '14px',
              borderRadius: '4px',
              px: 2,
              py: 0.75,
              transition: 'background-color 0.2s ease',
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.08)'
              }
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isSubmitting}
            variant='contained'
            color='error'
            sx={{
              textTransform: 'none'
            }}
            onClick={handleDelete}
          >
            {isSubmitting ? 'Deleting...' : 'Delete'}
          </Button>
        </Box>
      </Box>
    </BaseModal>
  )
}

export default DeleteTaskModal
