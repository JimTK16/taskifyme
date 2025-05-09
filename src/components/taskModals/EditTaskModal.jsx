import {
  Box,
  Button,
  FormControl,
  InputBase,
  Stack,
  Divider,
  Chip,
  Typography,
  IconButton
} from '@mui/material'
import { useContext, useState } from 'react'
import { updateTaskAPI } from '~/services'
import { LabelContext, TaskContext } from '~/context/context'
import BaseModal from '../BaseModal'
import PriorityMenu from './PriorityMenu'
import CustomizedDatePicker from './CustomizedDatePicker'
import dayjs from 'dayjs'
import LabelSelect from './LabelSelect'
import CloseIcon from '@mui/icons-material/Close'

const EditTaskModal = ({ open, onClose, task }) => {
  const { tasks, setTasks, setEditingTask } = useContext(TaskContext)
  const { labels } = useContext(LabelContext)
  const transformedLabels = labels.filter(
    (label) => task.labels.includes(label._id) && label.deleted === false
  )

  const [taskTitle, setTaskTitle] = useState(task.title)
  const [taskDescription, setTaskDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority)
  const [selectedLabels, setSelectedLabels] = useState(transformedLabels)
  const [dueDate, setDueDate] = useState(
    task.dueDate ? dayjs(task.dueDate) : null
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRemoveLabel = (labelId) => {
    setSelectedLabels((prevLabels) =>
      prevLabels.filter((label) => label._id !== labelId)
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (taskTitle === '') return
    const newTask = {
      ...task,
      title: taskTitle,
      description: taskDescription,
      priority,
      labels: selectedLabels.map((label) => label._id),
      dueDate: dueDate ? new Date(dueDate).getTime() : null
    }
    try {
      setIsSubmitting(true)
      const response = await updateTaskAPI(task._id, newTask)
      const updatedTasks = tasks.map((task) => {
        if (task._id === response._id) {
          return response
        }
        return task
      })
      setTasks(updatedTasks)
    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setIsSubmitting(false)
      setEditingTask(null)
    }
  }
  return (
    <BaseModal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Typography variant='h6' sx={{ color: '#4A86E8', fontWeight: 600 }}>
              Edit Task
            </Typography>
            <IconButton onClick={onClose} size='small'>
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
          <FormControl fullWidth>
            <InputBase
              autoFocus
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 20
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#202020',

                  fontWeight: '600'
                }
              }}
              onChange={(e) => setTaskTitle(e.target.value)}
              value={taskTitle}
            ></InputBase>
          </FormControl>
          <FormControl fullWidth>
            <InputBase
              multiline
              minRows={3}
              placeholder='Description'
              sx={{
                border: '1px solid #ccc',
                borderRadius: 1,
                p: 1,
                mt: 1,
                '& .MuiInputBase-input': {
                  fontSize: 13
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#0006',
                  fontWeight: '500'
                },
                mb: 2
              }}
              onChange={(e) => setTaskDescription(e.target.value)}
              value={taskDescription}
            ></InputBase>
          </FormControl>

          {selectedLabels.length > 0 && (
            <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
              {selectedLabels.map((label) => (
                <Chip
                  key={label._id}
                  label={label.name}
                  variant='outlined'
                  size='small'
                  onDelete={() => handleRemoveLabel(label._id)}
                  sx={{
                    borderColor: label.color,
                    fontSize: 13
                  }}
                ></Chip>
              ))}
            </Stack>
          )}

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <CustomizedDatePicker
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
            />
            <PriorityMenu value={priority} onChange={setPriority} />

            <LabelSelect
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
            />
          </Stack>
        </Box>
        <Divider sx={{ m: 0, opacity: 0.6 }} />
        <Box
          sx={{
            p: 2,
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
            sx={{
              textTransform: 'none',
              color: 'white',
              bgcolor: taskTitle === '' ? 'rgba(0,0,0,0.3)' : '#4A86E8',
              position: 'relative',
              '&:hover': {
                bgcolor: taskTitle === '' ? 'rgba(0,0,0,0.3)' : '#3b78e7'
              },
              cursor: taskTitle === '' ? 'not-allowed' : 'pointer'
            }}
            type='submit'
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </form>
    </BaseModal>
  )
}

export default EditTaskModal
