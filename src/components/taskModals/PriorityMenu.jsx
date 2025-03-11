import { Box, FormControl, Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import TourIcon from '@mui/icons-material/Tour'

export const priorityOptions = [
  { value: 'Priority 1', label: 'Priority 1', color: '#ff6600' },
  { value: 'Priority 2', label: 'Priority 2', color: '#0099ff' },
  { value: 'Priority 3', label: 'Priority 3', color: 'gray' }
]

const PriorityMenu = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth size='small'>
        <Select
          displayEmpty
          value={value}
          id='priority-select'
          onChange={handleChange}
          sx={{
            '& .MuiSelect-select': {
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              padding: '4px 8px',
              fontSize: '14px'
            }
          }}
          MenuProps={{
            sx: {
              '& .MuiMenuItem-root': {
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                padding: '4px 8px',
                fontSize: '14px'
              }
            }
          }}
        >
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
                {option.label}
              </ListItemIcon>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default PriorityMenu
