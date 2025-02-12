import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useState } from 'react'

const currentYear = dayjs().year()

const CustomizedDatePicker = () => {
  const [date, setDate] = useState(null)
  console.log(date)
  const getDateFormat = () => {
    if (!date) return 'MMM D'

    const selectedYear = dayjs(date).year()
    return selectedYear === currentYear ? 'MMM D' : 'MMM D YYYY'
  }
  return (
    <DatePicker
      value={date}
      onChange={(newValue) => {
        setDate(newValue)
      }}
      format={getDateFormat(date)}
      slotProps={{
        textField: {
          placeholder: 'Date',
          size: 'small',
          sx: {
            maxWidth: 200,
            height: '40px',
            '& .MuiInputBase-root': {
              fontSize: '13px',
              height: '40px'
            }
          }
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
