import { Box, Button, FormControl, InputLabel, Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import FlagIcon from '@mui/icons-material/Flag'
import TourIcon from '@mui/icons-material/Tour'
import { useState } from 'react'

const priorityOptions = [
  { value: 'Priority 1', color: '#ff6600' },
  { value: 'Priority 2', color: '#0099ff' },
  { value: 'Priority 3', color: 'gray' }
]

const PriorityMenu = () => {
  const [priority, setPriority] = useState('')
  const handleChange = (event) => {
    setPriority(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth size='small'>
        <Select
          displayEmpty
          value={priority}
          id='priority-select'
          onChange={handleChange}
          sx={{ fontSize: '13px' }}
        >
          <MenuItem value=''>Priority</MenuItem>
          {priorityOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <ListItemIcon
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: option.color
                }}
              >
                <TourIcon fontSize='small' />
                {option.value}
              </ListItemIcon>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default PriorityMenu
