import { Box, Skeleton, Stack, Typography } from '@mui/material'
import TaskItem from './TaskItem'
import { useContext, useEffect } from 'react'
import { TaskContext } from '~/context/context'

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
