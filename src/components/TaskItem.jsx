import { CheckCircleOutline, PanoramaFishEye } from '@mui/icons-material'
import { Pencil } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import {
  Box,
  Checkbox,
  Divider,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { priorityOptions } from './taskModals/PriorityMenu'
import { dateFormatter } from '~/utils/helpers'
import { useContext, useState } from 'react'
import { toggleCompletedAPI } from '~/services'
import { TaskContext } from '~/context/context'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
const TaskCircleIcon = ({ iconColor, isCompleted, handleToggleCompleted }) => {
  return (
    <Checkbox
      sx={{ p: 0, color: iconColor }}
      icon={<PanoramaFishEye />}
      onClick={handleToggleCompleted}
      checked={isCompleted}
      checkedIcon={<CheckCircleOutline color='success' />}
    />
  )
}
const TaskItem = ({ task, inSearchModal, handleCloseSearchModal }) => {
  const option = priorityOptions.find(
    (option) => option.value === task.priority
  )
  const iconColor = option ? option.color : 'gray'
  const [showOptions, setShowOptions] = useState(false)
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)
  const [isToggling, setIsToggling] = useState(false)

  const { tasks, setTasks, setEditingTask, setDeletingTask } =
    useContext(TaskContext)

  const handleToggleCompleted = async () => {
    if (isToggling) return
    const newIsCompleted = !isCompleted
    setIsToggling(true)

    try {
      const response = await toggleCompletedAPI(task._id, {
        isCompleted: newIsCompleted
      })
      const updatedTasks = tasks.map((task) => {
        if (task._id === response._id) {
          return response
        }
        return task
      })
      setTasks(updatedTasks)
      setIsCompleted(newIsCompleted)
    } catch (error) {
      console.error('Error toggling completion:', error)
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <Box
      sx={{
        p: '12px',
        borderRadius: '8px',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: '#eaf4fb80',
          borderColor: '#eaf4fb'
        },
        border: '1px solid transparent'
      }}
      onMouseOver={() => !inSearchModal && setShowOptions(true)}
      onMouseLeave={() => !inSearchModal && setShowOptions(false)}
      onClick={() => {
        if (inSearchModal) {
          handleCloseSearchModal()
          setEditingTask(task)
        }
      }}
    >
      <Stack direction={'row'}>
        <Box>
          <TaskCircleIcon
            iconColor={iconColor}
            isCompleted={isCompleted}
            handleToggleCompleted={handleToggleCompleted}
          />
        </Box>

        <Stack direction={'column'} sx={{ ml: 1, gap: 0.25 }}>
          <Typography
            sx={{ fontSize: '14px', fontWeight: '500' }}
            variant='body1'
          >
            {task.title}
          </Typography>
          <Typography
            sx={{ color: 'text.secondary', fontSize: '12px' }}
            variant='body2'
          >
            {task.description}
          </Typography>
          {task.dueDate && !inSearchModal && (
            <Typography
              variant='body2'
              sx={{ color: 'text.secondary', fontSize: '12px' }}
            >
              {dateFormatter(task.dueDate)}
            </Typography>
          )}
          {task.labelDetails?.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, mt: 0.25 }}>
              {task.labelDetails?.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: 'flex',
                    gap: 0.5,
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}
                >
                  <SellOutlinedIcon
                    sx={{
                      color: item.color,
                      transform: 'rotate(90deg)',
                      width: '14px',
                      height: '14px'
                    }}
                  />
                  <Typography sx={{ fontSize: '12px' }}>{item.name}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Stack>
        {showOptions && (
          <Stack
            direction={'row'}
            sx={{ ml: 'auto', color: 'action.active', gap: 2 }}
          >
            <Tooltip title='Edit Task'>
              <Pencil
                onClick={() => setEditingTask(task)}
                style={{ width: '20px', height: '20px', color: '#3b82f6' }}
              />
            </Tooltip>
            <Tooltip title='Delete Task'>
              <Trash2
                onClick={() => setDeletingTask(task)}
                style={{ width: '20px', height: '20px', color: '#ef4444' }}
              />
            </Tooltip>
          </Stack>
        )}
      </Stack>

      {!inSearchModal && <Divider sx={{ mt: 1 }} />}
    </Box>
  )
}
export default TaskItem
