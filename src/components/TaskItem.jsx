import { CheckCircleOutline, PanoramaFishEye } from '@mui/icons-material'
import { Box, Checkbox, Divider, Stack, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import { priorityOptions } from './addTaskModal/PriorityMenu'
import { dateFormatter } from '~/utils/helpers'
import { useState } from 'react'
import DeleteTaskModal from './DeleteTaskModal'
import EditTaskModal from './EditTaskModal'
import { toggleCompletedAPI } from '~/services'

const TaskCircleIcon = ({ iconColor, isCompleted, handleToggleCompleted }) => {
  return (
    <Checkbox
      sx={{ p: 0, mb: 2, color: iconColor }}
      icon={<PanoramaFishEye />}
      onClick={handleToggleCompleted}
      checked={isCompleted}
      checkedIcon={<CheckCircleOutline color='success' />}
    />
  )
}
const TaskItem = ({ task }) => {
  const option = priorityOptions.find(
    (option) => option.value === task.priority
  )
  const iconColor = option ? option.color : 'gray'

  const [showOptions, setShowOptions] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)
  const [isToggling, setIsToggling] = useState(false)
  const handleToggleCompleted = async () => {
    if (isToggling) return
    const newIsCompleted = !isCompleted
    setIsToggling(true)

    try {
      await toggleCompletedAPI(task._id, { isCompleted: newIsCompleted })
      setIsCompleted(newIsCompleted)
    } catch (error) {
      console.error('Error toggling completion:', error)
    } finally {
      setIsToggling(false)
    }
  }
  return (
    <>
      <Stack
        direction={'row'}
        sx={{ cursor: 'pointer' }}
        onMouseOver={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <Box>
          <TaskCircleIcon
            iconColor={iconColor}
            isCompleted={isCompleted}
            handleToggleCompleted={handleToggleCompleted}
          />
        </Box>

        <Stack direction={'column'} sx={{ ml: 1 }}>
          <Typography variant='body1' sx={{ color: 'black' }}>
            {task.title}
          </Typography>
          <Typography variant='body2' sx={{ color: 'gray' }}>
            {task.description}
          </Typography>
          {task.dueDate && (
            <Typography sx={{ color: 'gray', fontSize: '12px' }}>
              {dateFormatter(task.dueDate)}
            </Typography>
          )}
        </Stack>
        {showOptions && (
          <Stack direction={'row'} sx={{ ml: 'auto', color: 'gray', gap: 2 }}>
            <EditOutlinedIcon onClick={() => setShowEditModal(true)} />
            <DeleteSweepOutlinedIcon onClick={() => setShowDeleteModal(true)} />
          </Stack>
        )}
      </Stack>
      <DeleteTaskModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        title={task.title}
        taskId={task._id}
      />
      <EditTaskModal
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
        task={task}
      />
      <Divider />
    </>
  )
}
export default TaskItem
