import { CheckCircleOutline, PanoramaFishEye } from '@mui/icons-material'
import { Box, Checkbox, Divider, Stack, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import { priorityOptions } from './addTaskModal/PriorityMenu'
import { dateFormatter } from '~/utils/helpers'
import { useContext, useState } from 'react'
import DeleteTaskModal from './DeleteTaskModal'
import EditTaskModal from './EditTaskModal'
import { toggleCompletedAPI } from '~/services'
import { TaskContext } from '~/context/context'

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
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [isCompleted, setIsCompleted] = useState(task.isCompleted)
  const [isToggling, setIsToggling] = useState(false)

  const { tasks, setTasks, setEditingTask } = useContext(TaskContext)

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
    <Box>
      <Stack
        direction={'row'}
        sx={{ cursor: 'pointer' }}
        onMouseOver={() => !inSearchModal && setShowOptions(true)}
        onMouseLeave={() => !inSearchModal && setShowOptions(false)}
        onClick={() => {
          if (inSearchModal) {
            handleCloseSearchModal()
            setEditingTask(task)
          }
        }}
      >
        <Box>
          <TaskCircleIcon
            iconColor={iconColor}
            isCompleted={isCompleted}
            handleToggleCompleted={handleToggleCompleted}
          />
        </Box>

        <Stack direction={'column'} sx={{ ml: 1, gap: 0.25 }}>
          <Typography sx={{ color: 'black', fontSize: '14px' }}>
            {task.title}
          </Typography>
          <Typography sx={{ color: 'gray', fontSize: '12px' }}>
            {task.description}
          </Typography>
          {task.dueDate && !inSearchModal && (
            <Typography sx={{ color: 'gray', fontSize: '12px' }}>
              {dateFormatter(task.dueDate)}
            </Typography>
          )}
        </Stack>
        {showOptions && (
          <Stack direction={'row'} sx={{ ml: 'auto', color: 'gray', gap: 2 }}>
            <EditOutlinedIcon onClick={() => setEditingTask(task)} />
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
      {/* <EditTaskModal
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
        task={task}
      /> */}
      {!inSearchModal && <Divider sx={{ mt: 1 }} />}
    </Box>
  )
}
export default TaskItem
