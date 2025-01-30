import { CheckCircleOutline, PanoramaFishEye } from '@mui/icons-material'
import { Checkbox, Stack, Typography } from '@mui/material'

const TaskCircleIcon = () => {
  return (
    <Checkbox
      sx={{ p: 0, mb: 2 }}
      icon={<PanoramaFishEye />}
      checkedIcon={<CheckCircleOutline color='success' />}
    />
  )
}
const TaskItem = ({ task }) => {
  return (
    <Stack direction={'row'}>
      <TaskCircleIcon />
      <Stack direction={'column'} sx={{ ml: 1 }}>
        <Typography variant='body1' sx={{ color: 'black' }}>
          {task.title}
        </Typography>
        <Typography variant='body2' sx={{ color: 'gray' }}>
          {task.description}
        </Typography>
      </Stack>
    </Stack>
  )
}
export default TaskItem
