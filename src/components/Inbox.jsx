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
import { TransitionGroup } from 'react-transition-group'
import ImageComponent from './ImageComponent'

const Inbox = () => {
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const tasksToDisplay = tasks.filter(
    (task) => !task.deletedAt && !task.isCompleted
  )
  const tasksCount = `${tasksToDisplay.length} task${
    tasksToDisplay.length > 1 ? 's' : ''
  }`

  return (
    <Container maxWidth='md'>
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
          {tasksToDisplay.length === 0 && (
            <ImageComponent
              imgSrc={'/src/assets/inboxPage.jpg'}
              text='Your inbox awaits fresh ideas — start jotting down your next big thought!'
              altText='Group meeting image'
            />
          )}
          <TransitionGroup>
            {!isLoadingTasks &&
              tasksToDisplay.map((task) => {
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
export default Inbox
