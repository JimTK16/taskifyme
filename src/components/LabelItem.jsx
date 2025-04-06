import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import { LabelContext } from '~/context/context'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

const LabelItem = ({ label }) => {
  const navigate = useNavigate()
  const iconColor = label.color
  const [showOptions, setShowOptions] = useState(false)
  const { setEditingLabel, setDeletingLabel } = useContext(LabelContext)
  return (
    <Box
      sx={{
        p: '12px',
        borderRadius: '8px',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: '#eaf4fb80',
          borderColor: '#eaf4fb'
        },
        border: '1px solid transparent'
      }}
      onMouseOver={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      onClick={() => navigate(`/labels/${label._id}`, { state: { label } })}
    >
      <Stack direction={'row'}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SellOutlinedIcon
            sx={{ color: iconColor, transform: 'rotate(90deg)' }}
          />
          <Typography sx={{ fontSize: '14px' }}>{label.name}</Typography>
        </Box>
        {showOptions && (
          <Stack direction={'row'} sx={{ ml: 'auto', color: 'gray', gap: 2 }}>
            <Tooltip title='Edit Label'>
              <Pencil
                onClick={(e) => {
                  e.stopPropagation()
                  setEditingLabel(label)
                }}
                style={{ width: '20px', height: '20px', color: '#3b82f6' }}
              />
            </Tooltip>
            <Tooltip title='Delete Label'>
              <Trash2
                onClick={(e) => {
                  e.stopPropagation()
                  setDeletingLabel(label)
                }}
                style={{ width: '20px', height: '20px', color: '#ef4444' }}
              />
            </Tooltip>
          </Stack>
        )}
      </Stack>
      <Divider sx={{ mt: 1 }} />
    </Box>
  )
}
export default LabelItem
