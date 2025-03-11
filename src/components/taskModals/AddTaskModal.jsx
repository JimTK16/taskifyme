import {
  Box,
  Button,
  FormControl,
  InputBase,
  Stack,
  Divider,
  Chip
} from '@mui/material'
import { useContext, useState } from 'react'
import { createNewTaskAPI } from '~/services'
import { TaskContext } from '~/context/context'
import BaseModal from '../BaseModal'
import PriorityMenu from './PriorityMenu'
import CustomizedDatePicker from './CustomizedDatePicker'
import LabelSelect from './LabelSelect'

const AddTaskModal = ({ open, onClose }) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [priority, setPriority] = useState('Priority 3')
  const [dueDate, setDueDate] = useState(null)
  const [selectedLabels, setSelectedLabels] = useState([])
  const { tasks, setTasks } = useContext(TaskContext)

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
      const response = await createNewTaskAPI(newTask)
      console.log('Task created:', response)
      setTasks([...tasks, response])
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      handleCloseModal()
    }
  }
  return (
    <BaseModal open={open} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ p: 2 }}>
          <FormControl fullWidth>
            <InputBase
              placeholder='Practice math problems daily'
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
              placeholder='Description'
              sx={{
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
          <Stack spacing={2} direction='row' alignItems='center'>
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
        <Divider sx={{ m: 0 }} />
        <Box
          sx={{
            p: 2,
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
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: 'none',
              color: 'white',
              bgcolor: taskTitle === '' ? 'gray' : '#39485e',
              position: 'relative',
              '&:hover': {
                bgcolor: taskTitle === '' ? 'gray' : '#2a374a'
              },
              cursor: taskTitle === '' ? 'not-allowed' : 'pointer'
            }}
            type='submit'
          >
            Add task
          </Button>
        </Box>
      </form>
    </BaseModal>
  )
}

export default AddTaskModal
