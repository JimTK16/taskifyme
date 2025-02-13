import {
  Box,
  Button,
  Modal,
  Backdrop,
  Fade,
  FormControl,
  InputBase,
  Stack,
  Divider
} from '@mui/material'
import { useContext, useState } from 'react'
import { createNewTaskAPI } from '~/services'
import { TaskContext } from '~/context/context'
import PriorityMenu from './PriorityMenu'
import CustomizedDatePicker from './CustomizedDatePicker'
import dayjs from 'dayjs'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 280,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: '0 15px 50px 0 rgba(0, 0, 0, 0.35)'
}
const AddTaskModal = ({ open, onClose }) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [priority, setPriority] = useState('Priority 3')
  const [dueDate, setDueDate] = useState(null)
  const { tasks, setTasks } = useContext(TaskContext)

  const handleCloseModal = () => {
    onClose()
    setTaskTitle('')
    setTaskDescription('')
    setPriority('Priority 3')
    setDueDate(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (taskTitle === '') return
    console.log('Task submitted:', taskTitle, taskDescription)
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      priority,
      dueDate: dueDate ? dayjs(dueDate).toISOString() : null
    }
    const response = await createNewTaskAPI(newTask)
    setTasks([...tasks, response])
    handleCloseModal()
  }
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'transparent' } }
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
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
        </Box>
      </Fade>
    </Modal>
  )
}

export default AddTaskModal
