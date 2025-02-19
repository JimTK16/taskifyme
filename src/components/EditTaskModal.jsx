import {
  Box,
  Button,
  FormControl,
  InputBase,
  Stack,
  Divider
} from '@mui/material'
import { useContext, useState } from 'react'
import { updateTaskAPI } from '~/services'
import { TaskContext } from '~/context/context'
import BaseModal from './BaseModal'
import PriorityMenu from './addTaskModal/PriorityMenu'
import CustomizedDatePicker from './addTaskModal/CustomizedDatePicker'
import dayjs from 'dayjs'

const EditTaskModal = ({ showEditModal, setShowEditModal, task }) => {
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [taskDescription, setTaskDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority)
  const [dueDate, setDueDate] = useState(
    task.dueDate ? dayjs(task.dueDate) : null
  )
  const { tasks, setTasks } = useContext(TaskContext)

  const handleCancel = () => {
    setShowEditModal(false)
    setTaskTitle(task.title)
    setTaskDescription(task.description)
    setPriority(task.priority)
    setDueDate(task.dueDate ? dayjs(task.dueDate) : null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (taskTitle === '') return
    const newTask = {
      ...task,
      title: taskTitle,
      description: taskDescription,
      priority,
      dueDate: dueDate ? new Date(dueDate).getTime() : null
    }
    try {
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
      setShowEditModal(false)
    }
  }
  return (
    <BaseModal open={showEditModal} onClose={handleCancel}>
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
          <Stack spacing={2} direction='row' alignItems='center'>
            <CustomizedDatePicker
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
            />
            <PriorityMenu value={priority} onChange={setPriority} />
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
            onClick={handleCancel}
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
            Save
          </Button>
        </Box>
      </form>
    </BaseModal>
  )
}

export default EditTaskModal
