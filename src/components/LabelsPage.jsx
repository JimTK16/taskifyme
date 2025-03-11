import {
  Box,
  Container,
  Fade,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { useContext } from 'react'
import { LabelContext } from '~/context/context'
import ImageComponent from './ImageComponent'
import LabelItem from './LabelItem'
import AddIcon from '@mui/icons-material/Add'
const LabelsPage = () => {
  const { labels, isLoadingLabels, setAddingLabel } = useContext(LabelContext)
  const labelsToDisplay = labels.filter((label) => !label.deleted)
  const labelsCount = `${labelsToDisplay.length} label${
    labelsToDisplay.length > 1 ? 's' : ''
  }`

  return (
    <Container maxWidth='md'>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Labels
          </Typography>
          <Tooltip title='Add new label'>
            <IconButton onClick={() => setAddingLabel(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
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
        <Stack sx={{ mt: 4 }} direction='column' spacing={2}>
          {labelsToDisplay.length === 0 && (
            <Fade in={labelsToDisplay.length === 0}>
              <Box>
                <ImageComponent
                  imgSrc={'/src/assets/labelPage.jpg'}
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
      </Box>
    </Container>
  )
}
export default LabelsPage
