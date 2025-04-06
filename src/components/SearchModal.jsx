import { Box, Divider, IconButton, InputBase, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import BaseModal from './BaseModal'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { TaskContext } from '~/context/context'
import TaskItem from './TaskItem'

const navigationItems = [
  { icon: InboxOutlinedIcon, text: 'Go to Inbox', navigateTo: '/inbox' },
  {
    icon: EventAvailableOutlinedIcon,
    text: 'Go to Today',
    navigateTo: '/today'
  },
  {
    icon: CalendarMonthOutlinedIcon,
    text: 'Go to Upcoming',
    navigateTo: '/upcoming'
  },
  { icon: TaskAltIcon, text: 'Go to Completed Tasks', navigateTo: '/completed' }
]

const NavItemComponent = ({ icon, text, navigateTo, onClick }) => {
  let navigate = useNavigate()
  const IconComponent = icon
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        pl: 2,
        gap: 1,
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#eaf4fb80' }
      }}
      onClick={() => {
        onClick()
        navigate(navigateTo)
      }}
    >
      <IconComponent sx={{ width: 22, height: 22 }} />
      <Typography sx={{ fontSize: 14 }}>{text}</Typography>
    </Box>
  )
}

const SearchModal = ({ open, onClose }) => {
  const { tasks } = useContext(TaskContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }
    const lowerSearchTerm = searchTerm.toLowerCase()
    const results = tasks.filter(
      (task) =>
        (task.title.toLowerCase().includes(lowerSearchTerm) ||
          task.description?.toLowerCase().includes(lowerSearchTerm)) &&
        !task.deletedAt
    )
    setSearchResults(results)
  }, [tasks, searchTerm])

  const handleCloseSearchModal = () => {
    setSearchTerm('')
    onClose()
  }
  return (
    <BaseModal open={open} onClose={handleCloseSearchModal}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              maxWidth: 650
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              autoFocus
            />
          </Box>
          <IconButton onClick={handleCloseSearchModal} size='small'>
            <CloseIcon fontSize='small' />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
          {searchTerm.trim() && (
            <>
              <Divider />
              <Box>
                <Typography sx={{ fontSize: 14, pl: 2.25, mt: 1 }}>
                  Search Results:
                </Typography>
                {searchResults.length > 0 ? (
                  <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {searchResults.map((task) => (
                      <Box key={task._id} sx={{ px: 2, py: 1 }}>
                        <TaskItem
                          task={task}
                          inSearchModal={true}
                          handleCloseSearchModal={handleCloseSearchModal}
                        />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ fontSize: 14, pl: 2.25, my: 1 }}>
                    No tasks found.
                  </Typography>
                )}
              </Box>
            </>
          )}
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              pb: 2,
              width: '100%'
            }}
          >
            <Typography sx={{ fontSize: 14, pl: 2.25, mt: 1 }}>
              Navigation
            </Typography>
            {navigationItems.map((item) => (
              <NavItemComponent
                key={item.text}
                icon={item.icon}
                text={item.text}
                onClick={onClose}
                navigateTo={item.navigateTo}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </BaseModal>
  )
}

export default SearchModal
