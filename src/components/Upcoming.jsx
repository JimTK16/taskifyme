import {
  Box,
  Collapse,
  Container,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import TaskItem from './TaskItem'
import { useContext } from 'react'
import { TaskContext } from '~/context/context'
import { isDueToday } from '~/utils/helpers'
import { TransitionGroup } from 'react-transition-group'

const Upcoming = () => {
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.dueDate &&
        !isDueToday(task.dueDate) &&
        !task.deletedAt &&
        !task.isCompleted
    )
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

  const tasksCount = `${upcomingTasks.length} task${
    upcomingTasks.length > 1 ? 's' : ''
  }`

  return (
    <Container maxWidth='md'>
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
          <TransitionGroup>
            {!isLoadingTasks &&
              upcomingTasks.map((task) => {
                return (
                  <Collapse key={task._id}>
                    <TaskItem key={task._id} task={task} />
                  </Collapse>
                )
              })}
          </TransitionGroup>
        </Stack>
      </Box>
    </Container>
  )
}
export default Upcoming
