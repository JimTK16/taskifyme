import { Box, Container, Fade, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { TaskContext } from '~/context/context'
import TaskItem from './TaskItem'

const LabelDetailsPage = () => {
  const { state } = useLocation()
  const label = state.label
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const filteredTasks = tasks.filter(
    (task) => task.labels.includes(label._id) && !task.deletedAt
  )
  const tasksCount = `${filteredTasks.length} task${
    filteredTasks.length > 1 ? 's' : ''
  }`
  return (
    <Container maxWidth='md'>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {label.name}
        </Typography>
        <Stack direction={'row'}>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {isLoadingTasks ? (
              <Skeleton variant='text' width={30} />
            ) : (
              tasksCount
            )}
          </Typography>
        </Stack>
        <Stack sx={{ mt: 4 }} direction='column' spacing={2}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              return <TaskItem key={task._id} task={task} />
            })
          ) : (
            <Typography>No tasks are associated with this label.</Typography>
          )}
        </Stack>
      </Box>
    </Container>
  )
}

export default LabelDetailsPage
