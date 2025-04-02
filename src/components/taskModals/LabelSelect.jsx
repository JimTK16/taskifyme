import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useContext } from 'react'
import { LabelContext } from '~/context/context'
import { createNewLabelAPI } from '~/services'
import { MAX_LABEL_NAME_LENGTH } from '~/utils/constants'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />
const filter = createFilterOptions()

export default function LabelSelect({ selectedLabels, setSelectedLabels }) {
  const { labels, setLabels } = useContext(LabelContext)
  const labelsToDisplay = labels.filter((label) => !label.deleted)

  const handleChange = async (event, newValue) => {
    try {
      const processedValues = []
      for (const value of newValue) {
        // Handle string input (user pressed Enter)
        if (typeof value === 'string') {
          const existingLabel = labelsToDisplay.find(
            (label) => label.name === value
          )
          if (existingLabel) {
            processedValues.push(existingLabel)
          } else {
            const newLabel = await createNewLabelAPI({
              name: value,
              color: '#36454F'
            })
            setLabels((prev) => [...prev, newLabel])
            processedValues.push(newLabel)
          }
        }
        // Handle "Add new label" option
        else if (value.inputValue) {
          const labelName = value.inputValue
          const existingLabel = labelsToDisplay.find(
            (label) => label.name === labelName
          )
          if (existingLabel) {
            processedValues.push(existingLabel)
          } else {
            const newLabel = await createNewLabelAPI({
              name: labelName,
              color: '#36454F'
            })
            setLabels((prev) => [...prev, newLabel])
            processedValues.push(newLabel)
          }
        }
        // Existing label object
        else {
          processedValues.push(value)
        }
      }
      setSelectedLabels(processedValues)
    } catch (error) {
      console.error('Error creating label:', error)
    }
  }

  return (
    <Autocomplete
      multiple
      freeSolo
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
      value={selectedLabels}
      onChange={handleChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)

        const { inputValue } = params
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Create "${inputValue}" label`
          })
        }

        return filtered
      }}
      id='checkboxes-tags-demo'
      options={labelsToDisplay}
      disableCloseOnSelect
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue
        }
        // Regular option
        return option.name
      }}
      renderTags={() => null}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props
        return (
          <li key={key} {...optionProps}>
            {/* Only show checkbox for existing labels */}
            {!option.inputValue && (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
            )}
            {/* Display different text styling for new label option */}
            {option.inputValue ? (
              <span style={{ fontStyle: 'italic', color: '#666' }}>
                {option.name}
              </span>
            ) : (
              option.name
            )}
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Labels'
          placeholder='Select or create labels'
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              maxLength: MAX_LABEL_NAME_LENGTH
            }
          }}
        />
      )}
      size='small'
      sx={{
        flexGrow: 1,
        '& .MuiFormControl-root': {
          display: 'flex',
          alignItems: 'center'
        },
        '& .MuiInputBase-root': {
          padding: '1.475px !important'
        },
        '& .MuiInputBase-input': {
          fontSize: '14px',
          padding: '4px 8px !important'
        },
        '& .MuiFormLabel-root': {
          fontSize: '14px',
          transform: 'translate(12px, 7px) scale(1)',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
            padding: '0 4px'
          }
        }
      }}
    />
  )
}
