export default function Logo({ text = true, width }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 300' width={width}>
      {/* Background circle */}
      <circle cx='150' cy='150' r='140' fill='#4A86E8' />

      {/* Inner circle */}
      <circle cx='150' cy='150' r='120' fill='#FFFFFF' />

      {/* Checklist items */}
      <rect x='90' y='100' width='120' height='20' rx='5' fill='#E8E8E8' />
      <rect x='90' y='130' width='120' height='20' rx='5' fill='#E8E8E8' />
      <rect x='90' y='160' width='120' height='20' rx='5' fill='#E8E8E8' />
      <rect x='90' y='190' width='120' height='20' rx='5' fill='#E8E8E8' />

      {/* Checkmarks */}
      <path
        d='M105 105 L115 115 L130 95'
        stroke='#4CAF50'
        strokeWidth='5'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M105 135 L115 145 L130 125'
        stroke='#4CAF50'
        strokeWidth='5'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* App name to the right */}
      {text && (
        <text
          x='440'
          y='160'
          fontFamily='Arial, sans-serif'
          fontSize='60'
          fontWeight='bold'
          textAnchor='middle'
          fill='#4A86E8'
        >
          TaskifyMe
        </text>
      )}
    </svg>
  )
}
