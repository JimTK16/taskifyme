import { Box, Typography } from '@mui/material'

const ImageComponent = ({ imgSrc, text, altText }) => {
  return (
    <>
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
    </>
  )
}

export default ImageComponent
