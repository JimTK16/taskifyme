import {
  Box,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LabelContext, TaskContext } from '~/context/context'
import TaskItem from './TaskItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Pencil, Trash2 } from 'lucide-react'

const LabelDetailsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const { state } = useLocation()
  const label = state.label
  const { tasks, isLoadingTasks } = useContext(TaskContext)
  const { setEditingLabel, setDeletingLabel } = useContext(LabelContext)
  const filteredTasks = tasks.filter(
    (task) => task.labels.includes(label._id) && !task.deletedAt
  )
  const tasksCount = `${filteredTasks.length} task${
    filteredTasks.length > 1 ? 's' : ''
  }`
  const theme = useTheme()
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'))
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
            alignItems: 'flex-start'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%'
            }}
          >
            <Tooltip title='More options'>
              <IconButton onClick={handleMenuOpen}>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              sx={{ mt: 1 }}
              PaperProps={{
                elevation: 2,
                sx: {
                  mt: 1,
                  minWidth: 180,
                  borderRadius: '6px',
                  overflow: 'visible',
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1,
                    borderRadius: '4px',
                    mx: 0.5,
                    my: 0.25,
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(74, 134, 232, 0.08)'
                    }
                  }
                }
              }}
            >
              <MenuItem
                onClick={() => {
                  setEditingLabel(label)
                }}
              >
                <ListItemIcon>
                  <Pencil style={{ height: 16, width: 16, color: '#3b82f6' }} />
                </ListItemIcon>
                Edit
              </MenuItem>
              <MenuItem onClick={() => setDeletingLabel(label)}>
                <ListItemIcon>
                  <Trash2 style={{ height: 16, width: 16, color: '#ef4444' }} />
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMediumUp ? 'flex-start' : 'center',
              width: '100%'
            }}
          >
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              {label.name}
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
          </Box>
        </Container>
      </Box>
      <Container maxWidth='md'>
        <Stack sx={{ mt: isMediumUp ? 2 : 3 }} direction='column' spacing={2}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              return <TaskItem key={task._id} task={task} />
            })
          ) : (
            <Typography>No tasks are associated with this label.</Typography>
          )}
        </Stack>
      </Container>
    </>
  )
}

export default LabelDetailsPage
