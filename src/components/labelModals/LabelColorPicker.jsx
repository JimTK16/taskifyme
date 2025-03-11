import { FormControl, FormLabel, MenuItem, Select } from '@mui/material'

import CircleIcon from '@mui/icons-material/Circle'

const colorOptions = [
  { name: 'Charcoal', color: '#36454F' },
  { name: 'Salmon', color: '#FA8072' },
  { name: 'Olive', color: '#808000' },
  { name: 'Lavender', color: '#E6E6FA' },
  { name: 'Turquoise', color: '#40E0D0' },
  { name: 'Crimson', color: '#DC143C' },
  { name: 'Gold', color: '#FFD700' },
  { name: 'Teal', color: '#008080' },
  { name: 'Coral', color: '#FF7F50' },
  { name: 'SlateBlue', color: '#6A5ACD' }
]

const LabelColorPicker = ({ selectedColor, setSelectedColor }) => {
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value)
  }
  return (
    <FormControl size='small'>
      <FormLabel
        sx={{
          fontSize: '14px',
          fontWeight: '700',
          color: 'black',
          '&.Mui-focused': {
            color: 'black !important'
          }
        }}
      >
        Color
      </FormLabel>
      <Select
        value={selectedColor}
        onChange={handleColorChange}
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
        {colorOptions.map((option) => (
          <MenuItem value={option.color} key={option.name} sx={{ gap: 1 }}>
            <CircleIcon sx={{ color: option.color, width: 12, height: 12 }} />
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LabelColorPicker
