export default function Logo({ text = true, width }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 200' width={width}>
      {/* Background circle */}
      <circle cx='100' cy='100' r='100' fill='#4A86E8' />

      {/* Inner circle */}
      <circle cx='100' cy='100' r='80' fill='#FFFFFF' />

      {/* Checklist items */}
      <rect x='40' y='60' width='120' height='20' rx='5' fill='#E8E8E8' />
      <rect x='40' y='90' width='120' height='20' rx='5' fill='#E8E8E8' />
      <rect x='40' y='120' width='120' height='20' rx='5' fill='#E8E8E8' />
      {/* <rect x='40' y='150' width='120' height='20' rx='5' fill='#E8E8E8' /> */}

      {/* Checkmarks */}
      <path
        d='M45 70 L55 80 L70 60'
        stroke='#4CAF50'
        strokeWidth='8'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M45 100 L55 110 L70 90'
        stroke='#4CAF50'
        strokeWidth='8'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* App name to the right */}
      {text && (
        <text
          x='400'
          y='130'
          fontFamily='Arial, sans-serif'
          fontSize='80'
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
