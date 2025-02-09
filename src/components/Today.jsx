import { Box, Skeleton, Stack, Typography } from '@mui/material'
import TaskItem from './TaskItem'
import { useContext, useEffect } from 'react'
import { TaskContext } from '~/context/context'

// const tasks = [
//   {
//     id: 1,
//     title: 'Finish React project',
//     description: 'Complete the UI and routing for the app.',
//     dueDate: '2025-01-15',
//     completed: false
//   },
//   {
//     id: 2,
//     title: 'Grocery shopping list',
//     description: 'Buy fruits, vegetables, and snacks for the week.',
//     dueDate: '2025-01-13',
//     completed: false
//   },
//   {
//     id: 3,
//     title: 'Doctor appointment',
//     description: 'Annual check-up with Dr. Smith.',
//     dueDate: '2025-01-14',
//     completed: false
//   },
//   {
//     id: 4,
//     title: 'Read new book',
//     description: 'Start reading "The Great Gatsby".',
//     dueDate: '2025-01-17',
//     completed: false
//   },
//   {
//     id: 5,
//     title: 'Workout session',
//     description: 'Go for a 30-minute run in the park.',
//     dueDate: '2025-01-13',
//     completed: false
//   }
// ]

const Today = () => {
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const tasksCount = `${tasks.length} task${tasks.length > 1 ? 's' : ''}`

  return (
    <>
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
          {!isLoadingTasks &&
            tasks.map((task) => <TaskItem key={task._id} task={task} />)}
        </Stack>
      </Box>
    </>
  )
}
export default Today
