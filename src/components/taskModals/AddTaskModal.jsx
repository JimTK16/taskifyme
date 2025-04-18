import {
  Box,
  Button,
  FormControl,
  InputBase,
  Stack,
  Divider,
  Chip,
  IconButton,
  Typography
} from '@mui/material'
import { useContext, useState } from 'react'
import { createNewTaskAPI } from '~/services'
import { TaskContext } from '~/context/context'
import BaseModal from '../BaseModal'
import PriorityMenu from './PriorityMenu'
import CustomizedDatePicker from './CustomizedDatePicker'
import LabelSelect from './LabelSelect'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

const randomPlaceholders = [
  'Prepare monthly expense report',
  'Call supplier for product update',
  'Schedule annual board meeting',
  'Draft client contract terms',
  'Analyze quarterly sales data',
  'Create team performance review',
  'Organize product launch event',
  'Prepare pitch for new investors',
  'Plan marketing campaign budget',
  'Review competitor market trends',
  'Host training for new employees',
  'Set up vendor negotiations meeting',
  'Evaluate customer feedback survey',
  'Update business growth strategy',
  'Conduct staff performance reviews',
  'Finalize partnership agreement',
  'Approve quarterly marketing spend',
  'Plan team-building activity day',
  'Present yearly growth statistics',
  'Confirm keynote speaker for event',
  'Buy groceries for the week',
  'Clean up the living room',
  'Wash the dishes after dinner',
  'Walk the dog in the evening',
  'Prepare lunch for tomorrow',
  'Water the indoor plants',
  'Do a 30-minute workout',
  'Call a friend to catch up',
  'Make a to-do list for the day',
  'Fold and store clean laundry',
  'Take out the trash and recyclables',
  'Plan meals for the week ahead',
  'Declutter the workspace area',
  'Pay monthly utility bills',
  'Charge phone and laptop overnight',
  'Make the bed in the morning',
  'Read a book before bedtime',
  'Check the mail for letters',
  'Refill the car’s fuel tank',
  'Relax with a cup of tea'
]

const randomPlaceholder = () => {
  const index = Math.floor(Math.random() * randomPlaceholders.length)
  return randomPlaceholders[index]
}
const AddTaskModal = ({ open, onClose }) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [priority, setPriority] = useState('Priority 3')
  const [dueDate, setDueDate] = useState(null)
  const [selectedLabels, setSelectedLabels] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { tasks, setTasks } = useContext(TaskContext)
  let navigate = useNavigate()

  const handleCloseModal = () => {
    onClose()
    setTaskTitle('')
    setTaskDescription('')
    setPriority('Priority 3')
    setDueDate(null)
    setSelectedLabels([])
  }

  const handleRemoveLabel = (labelId) => {
    setSelectedLabels((prevLabels) =>
      prevLabels.filter((label) => label._id !== labelId)
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (taskTitle === '') return
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      labels: selectedLabels.map((label) => label._id),
      priority,
      dueDate: dueDate ? new Date(dueDate).getTime() : null
    }

    try {
      setIsSubmitting(true)
      const response = await createNewTaskAPI(newTask)
      setTasks([...tasks, response])
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setIsSubmitting(false)
      handleCloseModal()
      navigate('/inbox')
    }
  }
  return (
    <BaseModal open={open} onClose={handleCloseModal}>
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
              Add New Task
            </Typography>
            <IconButton onClick={handleCloseModal} size='small'>
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
          <FormControl fullWidth>
            <InputBase
              autoFocus
              placeholder={randomPlaceholder()}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 20,
                  fontWeight: 500
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
            onClick={handleCloseModal}
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
            {isSubmitting ? 'Submitting...' : 'Add task'}
          </Button>
        </Box>
      </form>
    </BaseModal>
  )
}

export default AddTaskModal
