import { Box, Typography, Button } from '@mui/material'
import BaseModal from '../BaseModal'
import { deleteLabelAPI } from '~/services'
import { useContext } from 'react'
import { LabelContext, TaskContext } from '~/context/context'

const DeleteLabelModal = ({ open, onClose, deletingLabel }) => {
  const { labels, setLabels } = useContext(LabelContext)

  const { tasks, setTasks } = useContext(TaskContext)
  const handleDelete = async () => {
    try {
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
        <Typography
          variant='h6'
          id='delete-modal-title'
          sx={{ fontWeight: 400 }}
        >
          Delete label?
        </Typography>

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

export default DeleteLabelModal
