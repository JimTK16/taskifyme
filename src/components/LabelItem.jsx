import { Box, Divider, Stack, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import { useContext, useState } from 'react'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import { LabelContext } from '~/context/context'

const LabelItem = ({ label }) => {
  const iconColor = label.color
  const [showOptions, setShowOptions] = useState(false)
  const { setEditingLabel, setDeletingLabel } = useContext(LabelContext)
  return (
    <Box>
      <Stack
        direction={'row'}
        sx={{ cursor: 'pointer' }}
        onMouseOver={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SellOutlinedIcon
            sx={{ color: iconColor, transform: 'rotate(90deg)' }}
          />
          <Typography sx={{ fontSize: '14px' }}>{label.name}</Typography>
        </Box>
        {showOptions && (
          <Stack direction={'row'} sx={{ ml: 'auto', color: 'gray', gap: 2 }}>
            <EditOutlinedIcon onClick={() => setEditingLabel(label)} />
            <DeleteSweepOutlinedIcon onClick={() => setDeletingLabel(label)} />
          </Stack>
        )}
      </Stack>
      <Divider sx={{ mt: 1 }} />
    </Box>
  )
}
export default LabelItem
