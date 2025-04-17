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
import completedPage from '~/assets/completedPage.jpg'

const CompletedTasksPage = () => {
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const tasksToDisplay = tasks.filter(
    (task) => task.isCompleted && !task.deletedAt
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
            Completed Tasks
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
        <Stack sx={{ mt: 4 }} direction='column' spacing={3}>
          {tasksToDisplay.length === 0 && (
            <Fade in={tasksToDisplay.length === 0}>
              <Box>
                <ImageComponent
                  imgSrc={completedPage}
                  text='Your success story starts here. Complete a task to see your progress shine!'
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
      </Container>
    </>
  )
}
export default CompletedTasksPage
