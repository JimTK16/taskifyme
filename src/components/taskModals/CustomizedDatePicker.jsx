import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const currentYear = dayjs().year()

const CustomizedDatePicker = ({ value, onChange }) => {
  const getDateFormat = () => {
    if (!value) return 'MMM D'

    const selectedYear = dayjs(value).year()
    return selectedYear === currentYear ? 'MMM D' : 'MMM D YYYY'
  }

  const [cleared, setCleared] = useState(false)

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false)
      }, 1500)
      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [cleared])
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      format={getDateFormat(value)}
      disablePast={false}
      slotProps={{
        textField: {
          placeholder: 'Date',
          size: 'small',
          sx: {
            maxWidth: 180,
            '& .MuiInputBase-input': {
              fontSize: '14px',
              padding: '4px 8px'
            }
          }
        },
        field: {
          clearable: true,
          onClear: () => setCleared(true)
        },

        openPickerIcon: {
          sx: {
            width: 24,
            height: 24
          }
        }
      }}
    />
  )
}

export default CustomizedDatePicker
