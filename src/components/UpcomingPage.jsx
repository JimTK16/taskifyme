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
import { isDueToday } from '~/utils/helpers'
import ImageComponent from './ImageComponent'
import upcomingPage from '~/assets/upcomingPage.jpg'

const UpcomingPage = () => {
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
        </Container>
      </Box>
      <Container maxWidth='md' sx={{ mt: 1 }}>
        <Stack sx={{ mt: 4 }} direction='column' spacing={2}>
          {upcomingTasks.length === 0 && (
            <Fade in={upcomingTasks.length === 0}>
              <Box>
                <ImageComponent
                  imgSrc={upcomingPage}
                  text='Your future is waiting. Plan your next steps and make the most of your time!'
                  altText='Group meeting image'
                />
              </Box>
            </Fade>
          )}
          {!isLoadingTasks &&
            upcomingTasks.map((task) => {
              return <TaskItem key={task._id} task={task} />
            })}
        </Stack>
      </Container>
    </>
  )
}
export default UpcomingPage
