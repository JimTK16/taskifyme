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
import ImageComponent from './ImageComponent'

const Today = () => {
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
            <ImageComponent
              imgSrc={'/src/assets/todayPage.jpg'}
              text='Nothing scheduled for today. Enjoy the calm or seize the chance to spark something new!'
              altText='Group meeting image'
            />
          )}
          <TransitionGroup>
            {!isLoadingTasks &&
              todayTasks.map((task) => {
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
export default Today
