import { Box, Typography } from '@mui/material'

const CharCount = ({ str, maxLength }) => {
  return (
    <Box sx={{ marginLeft: 'auto', mt: 0.5 }}>
      <Typography
        sx={{
          fontSize: '13px',
          color: str.length < maxLength - 5 ? '#666' : 'red'
        }}
      >
        {str.length}/{maxLength}
      </Typography>
    </Box>
  )
}

export default CharCount
