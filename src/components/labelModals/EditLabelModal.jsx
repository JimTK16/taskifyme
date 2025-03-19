import {
  Box,
  Button,
  FormControl,
  Divider,
  Typography,
  TextField,
  FormLabel,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useContext, useState } from 'react'
import { LabelContext, TaskContext } from '~/context/context'
import BaseModal from '../BaseModal'
import LabelColorPicker from './LabelColorPicker'
import { updateLabelAPI } from '~/services'
import CharCount from './CharCount'
import { MAX_LABEL_NAME_LENGTH } from '~/utils/constants'

const EditLabelModal = ({ open, onClose, editingLabel }) => {
  const { labels, setLabels, setEditingLabel } = useContext(LabelContext)
  const { tasks, setTasks } = useContext(TaskContext)

  const [labelName, setLabelName] = useState(editingLabel.name)
  const [selectedColor, setSelectedColor] = useState(editingLabel.color)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const labelAlreadyExists = labels
    .filter((label) => label._id !== editingLabel._id)
    .some((label) => label.name === labelName && !label.deleted)

  const handleCloseModal = () => {
    setLabelName('')
    setSelectedColor('#36454F')
    onClose() // setEditingLabel(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (labelName === '') return
    const newLabel = { ...editingLabel, name: labelName, color: selectedColor }
    try {
      setIsSubmitting(true)
      const response = await updateLabelAPI(editingLabel._id, newLabel)
      const updatedLabels = labels.map((label) => {
        if (label._id === response._id) {
          return response
        }
        return label
      })
      const updatedTasks = tasks.map((task) => {
        if (task.labels.includes(editingLabel._id)) {
          return {
            ...task,
            labelDetails: updatedLabels
              .filter((label) => label.deleted === false)
              .map((label) => (task.labels.includes(label._id) ? label : null))
              .filter((label) => label !== null)
          }
        }
        return task
      })
      setTasks(updatedTasks)
      setLabels(updatedLabels)
    } catch (error) {
      console.log('Error saving label:', error)
    } finally {
      setIsSubmitting(false)
      setEditingLabel(null)
    }
  }

  return (
    <BaseModal open={open} onClose={handleCloseModal} maxWidth={480}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1
        }}
      >
        <Typography variant='h6' sx={{ color: '#4A86E8', fontWeight: 600 }}>
          Edit label
        </Typography>
        <IconButton sx={{ p: 0.25 }} onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box component={'form'} onSubmit={handleSubmit}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <FormLabel
                htmlFor='name'
                sx={{ fontSize: '14px', fontWeight: '700', color: 'black' }}
              >
                Name
              </FormLabel>
              {labelAlreadyExists && (
                <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  Label already exists.
                </Typography>
              )}
            </Box>
            <TextField
              autoFocus
              error={labelAlreadyExists}
              size='small'
              id='name'
              name='name'
              value={labelName}
              onChange={(e) => {
                if (e.target.value.length > MAX_LABEL_NAME_LENGTH) return
                setLabelName(e.target.value)
              }}
              sx={{
                '& .MuiInputBase-input': {
                  padding: '4px 8px'
                },
                '& .MuiFormHelperText-root': {
                  marginLeft: 1
                }
              }}
            />
            <CharCount str={labelName} maxLength={MAX_LABEL_NAME_LENGTH} />
          </FormControl>
          <LabelColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </Box>
        <Divider sx={{ m: 0 }} />
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1
          }}
        >
          <Button
            variant='text'
            sx={{
              textTransform: 'none',
              color: '#444',
              fontSize: '14px',
              borderRadius: '4px',
              px: 2,
              py: 0.75,
              transition: 'background-color 0.2s ease',
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.08)'
              }
            }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            disabled={labelAlreadyExists || isSubmitting}
            variant='contained'
            sx={{
              textTransform: 'none',
              color: 'white',
              bgcolor: labelName === '' ? 'rgba(0,0,0,0.3)' : '#4A86E8',
              position: 'relative',
              '&:hover': {
                bgcolor: labelName === '' ? 'rgba(0,0,0,0.3)' : '#3b78e7'
              },
              cursor: labelName === '' ? 'not-allowed' : 'pointer'
            }}
            type='submit'
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>
    </BaseModal>
  )
}

export default EditLabelModal
