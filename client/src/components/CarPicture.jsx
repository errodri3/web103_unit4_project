import React from 'react'

const GLASS = 'rgba(160, 210, 255, 0.35)'
const SEAT_COLORS = { cloth: '#6b6f76', leather: '#a8743f', racing: '#d62828' }

const Wheel = ({ cx, type }) => {
  const r = type === 'offroad' ? 27 : 22
  const cy = 146 - r
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill='#141414' />
      {type === 'offroad' && (
        <circle cx={cx} cy={cy} r={r - 2} fill='none' stroke='#3a3a3a' strokeWidth='5' strokeDasharray='5 4' />
      )}
      {type === 'standard' && <circle cx={cx} cy={cy} r={12} fill='#8a8f96' />}
      {type === 'sport' && (
        <g>
          <circle cx={cx} cy={cy} r={15} fill='#d4d8dd' />
          {[0, 72, 144, 216, 288].map(angle => (
            <line key={angle} x1={cx} y1={cy}
              x2={cx + 14 * Math.cos(angle * Math.PI / 180)} y2={cy + 14 * Math.sin(angle * Math.PI / 180)}
              stroke='#2b2b2b' strokeWidth='3' />
          ))}
        </g>
      )}
      {type === 'offroad' && <circle cx={cx} cy={cy} r={11} fill='#5a5f66' stroke='#ffb703' strokeWidth='2' />}
      <circle cx={cx} cy={cy} r={3} fill='#222' />
    </g>
  )
}

const Seat = ({ x, color, top }) => (
  <g fill={color}>
    <rect x={x} y={top} width='11' height='9' rx='3' />
    <rect x={x - 2} y={top + 8} width='15' height={92 - top - 8} rx='3' />
  </g>
)

// side view of the car that changes with the chosen options
const CarPicture = ({ color = '#c1121f', roof = 'hardtop', wheels = 'standard', interior = 'cloth' }) => {
  const seat = SEAT_COLORS[interior] || SEAT_COLORS.cloth
  const lift = wheels === 'offroad' ? -8 : 0
  const isOpen = roof === 'convertible'

  return (
    <svg className='car-picture' viewBox='0 0 320 160' role='img'
      aria-label={`${roof} car with ${wheels} wheels and ${interior} seats`}>
      <ellipse cx='160' cy='148' rx='135' ry='6' fill='rgba(0,0,0,0.45)' />

      <g transform={`translate(0 ${lift})`}>
        {/* roof and windows */}
        {!isOpen && (
          <g>
            <path d='M95 90 L122 50 Q127 45 137 45 L197 45 Q207 45 213 51 L240 90 Z' fill={color} stroke='rgba(0,0,0,0.35)' />
            <path d='M110 88 L130 55 L160 55 L160 88 Z' fill='#16202b' />
            <path d='M168 55 L198 55 L224 88 L168 88 Z' fill='#16202b' />
            <Seat x={142} color={seat} top={60} />
            <Seat x={182} color={seat} top={60} />
            {interior === 'racing' && (
              <path d='M118 88 L134 58 L200 58 L218 88' fill='none' stroke='#c9ced4' strokeWidth='2.5' />
            )}
            <path d='M110 88 L130 55 L160 55 L160 88 Z' fill={GLASS} />
            <path d='M168 55 L198 55 L224 88 L168 88 Z' fill={GLASS} />
            {roof === 'sunroof' && (
              <rect x='140' y='41' width='54' height='6' rx='2' fill='#9fd3ff' stroke='#16202b' />
            )}
          </g>
        )}
        {isOpen && (
          <g>
            <Seat x={142} color={seat} top={62} />
            <Seat x={182} color={seat} top={62} />
            <line x1='212' y1='90' x2='198' y2='58' stroke={GLASS} strokeWidth='6' />
            <line x1='212' y1='90' x2='198' y2='58' stroke='#16202b' strokeWidth='1.5' />
            <rect x='96' y='80' width='32' height='12' rx='5' fill='#2a2a2a' />
          </g>
        )}

        {/* body */}
        <path d='M28 120 Q28 96 55 92 L95 88 L240 88 Q272 90 287 104 Q294 111 292 122 L292 128 Q292 133 286 133 L34 133 Q28 133 28 127 Z'
          fill={color} stroke='rgba(0,0,0,0.4)' strokeWidth='1.5' />
        <line x1='164' y1='92' x2='164' y2='128' stroke='rgba(0,0,0,0.35)' strokeWidth='1.5' />
        <rect x='176' y='104' width='14' height='3' rx='1.5' fill='rgba(0,0,0,0.45)' />
        <ellipse cx='284' cy='108' rx='5' ry='4' fill='#ffe066' />
        <rect x='29' y='102' width='6' height='8' rx='2' fill='#ff4d4d' />
      </g>

      <Wheel cx={85} type={wheels} />
      <Wheel cx={240} type={wheels} />
    </svg>
  )
}

export default CarPicture
