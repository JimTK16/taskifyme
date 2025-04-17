import {
  Box,
  Container,
  Pagination,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import { useContext } from 'react'
import { LogContext } from '~/context/context'
import LogItem from './LogItem'
const ActivityLogsPage = () => {
  const { logs, isLoadingLogs, page, setPage, total, limit } =
    useContext(LogContext)
  const totalPages = Math.ceil(total / limit)

  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)
  const showingText =
    total > 0 ? `Showing ${start} to ${end} of ${total} logs` : ''
  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          py: 2,
          backgroundColor: 'white',
          width: '100%',
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
            Activity Logs
          </Typography>

          <Stack direction='row' justifyContent='space-between' sx={{ mt: 2 }}>
            <Typography variant='body2' sx={{ color: 'gray' }}>
              {isLoadingLogs ? (
                <Skeleton variant='text' width={100} />
              ) : (
                showingText
              )}
            </Typography>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth='md' sx={{ px: 0 }}>
        <Stack sx={{ mt: 4 }} direction='column' spacing={2}>
          {isLoadingLogs ? (
            <Stack direction='column' spacing={2}>
              {[...Array(limit)].map((_, index) => (
                <Skeleton key={index} variant='rectangular' height={60} />
              ))}
            </Stack>
          ) : logs.length === 0 ? (
            <Typography variant='body2' sx={{ color: 'gray' }}>
              No logs found
            </Typography>
          ) : (
            logs.map((log) => <LogItem key={log._id} log={log} />)
          )}
        </Stack>
        {total > 0 && (
          <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color='primary'
            />
          </Box>
        )}
      </Container>
    </>
  )
}
export default ActivityLogsPage
