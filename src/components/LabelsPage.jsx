import {
  Box,
  Button,
  Container,
  Fade,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useContext } from 'react'
import { LabelContext } from '~/context/context'
import ImageComponent from './ImageComponent'
import LabelItem from './LabelItem'
import AddIcon from '@mui/icons-material/Add'
import Skeleton from '@mui/material/Skeleton'
import labelPage from '~/assets/labelPage.jpg'
const LabelsPage = () => {
  const { labels, isLoadingLabels, setAddingLabel } = useContext(LabelContext)
  const labelsToDisplay = labels.filter((label) => !label.deleted)
  const labelsCount = `${labelsToDisplay.length} label${
    labelsToDisplay.length > 1 ? 's' : ''
  }`

  const theme = useTheme()
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          py: 2,
          backgroundColor: 'white',
          pl: {
            xs: 0,
            md: 10
          }
        }}
      >
        <Container
          maxWidth='md'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: {
              xs: 'center',
              md: 'flex-start'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMediumUp ? 'space-between' : 'center',
              width: '100%'
            }}
          >
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              Labels
            </Typography>
            {isMediumUp && (
              <Tooltip title='Add new label'>
                <IconButton onClick={() => setAddingLabel(true)}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Stack direction={'row'}>
            <Typography variant='body2' sx={{ color: 'gray' }}>
              {isLoadingLabels ? (
                <Skeleton variant='text' width={30} />
              ) : (
                labelsCount
              )}
            </Typography>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth='md'>
        <Stack sx={{ mt: 4 }} direction='column' spacing={2}>
          {labelsToDisplay.length === 0 && (
            <Fade in={labelsToDisplay.length === 0}>
              <Box>
                <ImageComponent
                  imgSrc={labelPage}
                  text='Your list of labels will show up here.'
                  altText='Group meeting image'
                />
              </Box>
            </Fade>
          )}

          {!isLoadingLabels &&
            labelsToDisplay.map((label) => {
              return <LabelItem key={label._id} label={label} />
            })}
        </Stack>
        {!isMediumUp && (
          <Button fullWidth onClick={() => setAddingLabel(true)}>
            Add label
          </Button>
        )}
      </Container>
    </>
  )
}
export default LabelsPage
