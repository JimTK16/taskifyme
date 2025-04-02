import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import { useContext, useState } from 'react'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import { LabelContext } from '~/context/context'
import { useNavigate } from 'react-router-dom'

const LabelItem = ({ label }) => {
  const navigate = useNavigate()
  const iconColor = label.color
  const [showOptions, setShowOptions] = useState(false)
  const { setEditingLabel, setDeletingLabel } = useContext(LabelContext)
  return (
    <Box
      sx={{
        cursor: 'pointer',
        p: 0.5,
        borderRadius: 1,
        '&:hover': { bgcolor: 'action.hover' },
        transition: 'background-color 0.2s'
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
              <EditOutlinedIcon
                onClick={(e) => {
                  e.stopPropagation()
                  setEditingLabel(label)
                }}
              />
            </Tooltip>
            <Tooltip title='Delete Label'>
              <DeleteSweepOutlinedIcon
                onClick={(e) => {
                  e.stopPropagation()
                  setDeletingLabel(label)
                }}
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
