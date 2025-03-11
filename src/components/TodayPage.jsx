import {
  Box,
  Collapse,
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

const TodayPage = () => {
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const todayTasks = tasks.filter(
    (task) => isDueToday(task.dueDate) && !task.deletedAt && !task.isCompleted
  )
  const tasksCount = `${todayTasks.length} task${
    todayTasks.length > 1 ? 's' : ''
  }`

  return (
    <Container maxWidth='md'>
      <Box>
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
        <Stack sx={{ mt: 4 }} direction='column' spacing={2}>
          {todayTasks.length === 0 && (
            <Fade in={todayTasks.length === 0}>
              <Box>
                <ImageComponent
                  imgSrc={'/src/assets/todayPage.jpg'}
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
      </Box>
    </Container>
  )
}
export default TodayPage
