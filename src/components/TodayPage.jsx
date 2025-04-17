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
import todayPage from '~/assets/todayPage.jpg'

const TodayPage = () => {
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const todayTasks = tasks.filter(
    (task) => isDueToday(task.dueDate) && !task.deletedAt && !task.isCompleted
  )
  const tasksCount = `${todayTasks.length} task${
    todayTasks.length > 1 ? 's' : ''
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
            Today
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
          {todayTasks.length === 0 && (
            <Fade in={todayTasks.length === 0}>
              <Box>
                <ImageComponent
                  imgSrc={todayPage}
                  text='Nothing scheduled for today. Enjoy the calm or seize the chance to spark something new!'
                  altText='Group meeting image'
                />
              </Box>
            </Fade>
          )}
          {!isLoadingTasks &&
            todayTasks.map((task) => {
              return <TaskItem key={task._id} task={task} />
            })}
        </Stack>
      </Container>
    </>
  )
}
export default TodayPage
