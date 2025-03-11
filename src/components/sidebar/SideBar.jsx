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
import NotificationIcons from './NotificationIcons'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import NavButton from './NavButton'
import SearchModal from '../SearchModal'
import { TaskContext } from '~/context/context'

const SideBar = ({ onNavItemClick }) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const { setEditingTask, setAddingTask } = useContext(TaskContext)

  const navigate = useNavigate()

  const NAV_ITEMS = [
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
    { icon: LensBlurOutlinedIcon, label: 'Labels', navigateTo: '/labels' }
  ]

  return (
    <>
      <nav>
        {/* Sidebar header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <UserMenu />
          <NotificationIcons onNavItemClick={onNavItemClick} />
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
          onClick={() => setAddingTask(true)}
        >
          Add new task
        </Button>

        {/* Search Button */}
        <Button
          sx={{
            color: '#202020',
            textTransform: 'none',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start'
          }}
          startIcon={<SearchOutlinedIcon sx={{ width: 24, height: 24 }} />}
          onClick={() => setSearchModalOpen(true)}
        >
          Search
        </Button>

        {/* Modals */}

        <SearchModal
          open={searchModalOpen}
          onClose={() => {
            setSearchModalOpen(false)
            onNavItemClick()
          }}
          setSearchModalOpen={setSearchModalOpen}
          onEditTask={setEditingTask}
        />

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
              onNavItemClick={onNavItemClick}
            />
          ))}
        </Box>

        {/* My projects */}
      </nav>
    </>
  )
}
export default SideBar
