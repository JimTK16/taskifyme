import { CheckCircleOutline, PanoramaFishEye } from '@mui/icons-material'
import { Box, Checkbox, Stack, Typography } from '@mui/material'
import { priorityOptions } from './sidebar/addTaskModal/PriorityMenu'
import { dateFormatter } from '~/utils/helpers'

const TaskCircleIcon = ({ iconColor }) => {
  return (
    <Checkbox
      sx={{ p: 0, mb: 2, color: iconColor }}
      icon={<PanoramaFishEye />}
      checkedIcon={<CheckCircleOutline color='success' />}
    />
  )
}
const TaskItem = ({ task }) => {
  const option = priorityOptions.find(
    (option) => option.value === task.priority
  )
  const iconColor = option ? option.color : 'gray'
  return (
    <Stack direction={'row'}>
      <Box>
        <TaskCircleIcon iconColor={iconColor} />
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
    </Stack>
  )
}
export default TaskItem
