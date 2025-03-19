import {
  Box,
  Container,
  Fade,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import TaskItem from './TaskItem'
import { useContext } from 'react'
import { TaskContext } from '~/context/context'
import ImageComponent from './ImageComponent'
import inboxPage from '~/assets/inboxPage.jpg'
const InboxPage = () => {
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
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {isLoadingTasks ? (
              <Skeleton variant='text' width={30} />
            ) : (
              tasksCount
            )}
          </Typography>
        </Stack>
        <Stack sx={{ mt: 4 }} direction='column' spacing={2}>
          {tasksToDisplay.length === 0 && (
            <Fade in={tasksToDisplay.length === 0}>
              <Box>
                <ImageComponent
                  imgSrc={inboxPage}
                  text='Your inbox awaits fresh ideas — start jotting down your next big thought!'
                  altText='Group meeting image'
                />
              </Box>
            </Fade>
          )}

          {!isLoadingTasks &&
            tasksToDisplay.map((task) => {
              return <TaskItem key={task._id} task={task} />
            })}
        </Stack>
      </Box>
    </Container>
  )
}
export default InboxPage
