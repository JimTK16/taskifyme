import { Box, Stack, Typography, Chip, Tooltip, useTheme } from '@mui/material'
import { Plus, Edit, Trash2, CheckCircle, Calendar } from 'lucide-react'

// Helper functions for date formatting
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const getFullDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  })
}

// Function to determine action details with Lucide icons
const getActionDetails = (action) => {
  switch (action) {
    case 'created':
      return {
        icon: Plus,
        color: '#10b981',
        bgColor: '#d1fae5',
        label: 'Created'
      }
    case 'updated':
      return {
        icon: Edit,
        color: '#3b82f6',
        bgColor: '#dbeafe',
        label: 'Updated'
      }
    case 'deleted':
      return {
        icon: Trash2,
        color: '#ef4444',
        bgColor: '#fee2e2',
        label: 'Deleted'
      }
    case 'completed':
      return {
        icon: CheckCircle,
        color: '#8b5cf6',
        bgColor: '#ede9fe',
        label: 'Completed'
      }
    default:
      return {
        icon: Calendar,
        color: '#6b7280',
        bgColor: '#f3f4f6',
        label: 'Unknown'
      }
  }
}

// LogItem component
const LogItem = ({ log }) => {
  const {
    icon: ActionIcon,
    color,
    bgColor,
    label
  } = getActionDetails(log.action)

  return (
    <Box
      sx={{
        p: '12px',
        borderRadius: '8px',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: '#eaf4fb80',
          borderColor: '#eaf4fb'
        },
        border: '1px solid transparent'
      }}
    >
      <Stack direction='row' spacing={3} alignItems='flex-start'>
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
        >
          <ActionIcon style={{ color, height: '16px', width: '16px' }} />
        </Box>
        <Stack spacing={1}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='body2'>
              <Box component='span' sx={{ fontWeight: 'medium' }}>
                You {log.action}
              </Box>{' '}
              a task:{' '}
              <Box component='span' sx={{ fontWeight: 'bold', ml: 0.5 }}>
                {log.taskTitle}
              </Box>
            </Typography>
            <Chip
              label={label}
              sx={{ color: color, borderColor: bgColor }}
              variant='outlined'
              size='small'
            />
          </Stack>
          <Tooltip title={getFullDate(log.createdAt)}>
            <Typography
              color='text.secondary'
              sx={{
                margin: 0,
                fontSize: '0.75rem',
                lineHeight: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                width: 'fit-content'
              }}
            >
              <Calendar
                style={{
                  height: '0.75rem',
                  width: '0.75rem',
                  verticalAlign: 'middle'
                }}
              />
              {formatDate(log.createdAt)}
            </Typography>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  )
}

export default LogItem
