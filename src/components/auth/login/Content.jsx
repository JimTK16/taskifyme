import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded'
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded'
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded'
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded'
import Logo from './Logo'

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Smart Task Organization',
    description:
      'Effortlessly categorize tasks with smart tags, priority levels, and deadlines. Keep your workflow structured and focused.'
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Collaborative Workspace',
    description:
      'Build team efficiency with shared projects, task delegation, and real-time updates that keep everyone in sync.'
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Zero-Friction Interface',
    description:
      'Get started instantly with our intuitive design that makes task management feel simple and rewarding.'
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Smart Reminders & AI',
    description:
      'Automate routine planning with predictive suggestions and intelligent deadline alerts tailored to your habits.'
  }
]

export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        alignSelf: 'center',
        gap: 4,
        maxWidth: 450,
        animation: 'fadeIn 0.5s ease-in-out',
        '@keyframes fadeIn': {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' }
        }}
      >
        <Logo width={200} />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction='row' sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  )
}
