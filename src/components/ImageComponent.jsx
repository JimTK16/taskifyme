import { Box, Typography } from '@mui/material'

const ImageComponent = ({ imgSrc, text, altText }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img src={imgSrc} alt={altText} style={{ maxWidth: '240px' }} />
      </Box>
      <Typography
        variant='body1'
        sx={{
          textAlign: 'center',
          fontSize: '14px ',
          color: '#666'
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}

export default ImageComponent
