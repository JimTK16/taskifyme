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
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          py: 2,
          backgroundColor: 'white',
          pl: {
            xs: 0,
            md: 10
          }
        }}
      >
        <Container
          maxWidth='md'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: {
              xs: 'center',
              md: 'flex-start'
            }
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Inbox
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {isLoadingTasks ? (
              <Skeleton variant='text' width={30} />
            ) : (
              tasksCount
            )}
          </Typography>
        </Container>
      </Box>

      {/* Task List */}
      <Container maxWidth='md' sx={{ mt: 1 }}>
        <Stack direction='column' spacing={2}>
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
            tasksToDisplay.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
        </Stack>
      </Container>
    </>
  )
}

export default InboxPage
