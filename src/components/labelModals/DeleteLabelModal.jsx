import { Box, Typography, Button, IconButton } from '@mui/material'
import BaseModal from '../BaseModal'
import { deleteLabelAPI } from '~/services'
import { useContext, useState } from 'react'
import { LabelContext, TaskContext } from '~/context/context'
import CloseIcon from '@mui/icons-material/Close'

const DeleteLabelModal = ({ open, onClose, deletingLabel }) => {
  const { labels, setLabels } = useContext(LabelContext)
  const { tasks, setTasks } = useContext(TaskContext)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsSubmitting(true)
      const response = await deleteLabelAPI(deletingLabel._id)

      const updatedLabels = labels.map((label) => {
        if (label._id === deletingLabel._id) {
          return { ...response }
        }
        return label
      })

      const updatedTasks = tasks.map((task) => {
        if (task.labels.includes(deletingLabel._id)) {
          return {
            ...task,
            labelDetails: updatedLabels
              .filter((label) => label.deleted === false)
              .map((label) => (task.labels.includes(label._id) ? label : null))
              .filter((label) => label !== null)
          }
        }
        return task
      })
      setLabels(updatedLabels)
      setTasks(updatedTasks)
    } catch (error) {
      console.error('Deletion failed:', error)
    } finally {
      setIsSubmitting(false)
      onClose()
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
            Delete label?
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
          The <strong>{deletingLabel.name}</strong> label will be permanently
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

export default DeleteLabelModal
