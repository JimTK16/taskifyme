import { Box, Container, Skeleton, Stack, Typography } from '@mui/material'
import TaskItem from './TaskItem'
import { useContext } from 'react'
import { TaskContext } from '~/context/context'
import { isDueToday } from '~/utils/helpers'

const Upcoming = () => {
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const upcomingTasks = tasks
    .filter((task) => task.dueDate && !isDueToday(task.dueDate))
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

  const tasksCount = `${upcomingTasks.length} task${
    upcomingTasks.length > 1 ? 's' : ''
  }`

  return (
    <Container maxWidth='lg'>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          Upcoming
        </Typography>
        <Stack direction={'row'}>
          <Typography variant='body2' sx={{ color: 'gray' }}>
            {isLoadingTasks ? (
              <Skeleton variant='text' width={30} />
            ) : (
              tasksCount
            )}
          </Typography>
        </Stack>
        <Stack sx={{ mt: 4 }} direction='column' spacing={2}>
          {!isLoadingTasks &&
            upcomingTasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
        </Stack>
      </Box>
    </Container>
  )
}
export default Upcoming
