import { Box, Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LensBlurOutlinedIcon from '@mui/icons-material/LensBlurOutlined'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserMenu from './UserMenu'
import AddTaskModal from '../addTaskModal/AddTaskModal'
import NotificationIcons from './NotificationIcons'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import NavButton from './NavButton'
import { TaskContext } from '~/context/context'

const SideBar = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const navigate = useNavigate()

  const NAV_ITEMS = [
    { icon: SearchOutlinedIcon, label: 'Search' },
    { icon: InboxOutlinedIcon, label: 'Inbox', navigateTo: '/inbox' },
    { icon: EventAvailableOutlinedIcon, label: 'Today', navigateTo: '/today' },

    {
      icon: CalendarMonthOutlinedIcon,
      label: 'Upcoming',
      navigateTo: '/upcoming'
    },
    {
      icon: TaskAltIcon,
      label: 'Completed Tasks',
      navigateTo: '/completed'
    },
    { icon: LensBlurOutlinedIcon, label: 'Filters & Labels' }
  ]

  return (
    <>
      <nav>
        {/* Sidebar header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <UserMenu />
          <NotificationIcons />
        </Box>

        {/* Add task button */}

        <Button
          sx={{
            color: '#39485e',
            textTransform: 'none',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start'
          }}
          startIcon={<AddCircleIcon sx={{ width: 24, height: 24 }} />}
          onClick={() => setModalOpen(true)}
        >
          Add new task
        </Button>

        {/* Modal */}
        <AddTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
        {/* Main filters */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.label}
              icon={item.icon}
              label={item.label}
              onClick={navigate}
              navigateTo={item.navigateTo}
            />
          ))}
        </Box>

        {/* My projects */}
      </nav>
    </>
  )
}
export default SideBar
