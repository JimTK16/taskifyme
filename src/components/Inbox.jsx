import { Box, Container, Skeleton, Stack, Typography } from '@mui/material'
import TaskItem from './TaskItem'
import { useContext } from 'react'
import { TaskContext } from '~/context/context'

const Inbox = () => {
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const tasksToDisplay = tasks.filter((task) => !task.deletedAt)
  const tasksCount = `${tasksToDisplay.length} task${
    tasksToDisplay.length > 1 ? 's' : ''
  }`

  return (
    <Container maxWidth='lg'>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          Inbox
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
            tasksToDisplay.map((task) => {
              return <TaskItem key={task._id} task={task} />
            })}
        </Stack>
      </Box>
    </Container>
  )
}
export default Inbox
