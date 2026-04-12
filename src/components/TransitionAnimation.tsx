import { useEffect, useRef, useState } from 'react'

interface Props {
  onComplete: () => void
}

// SVG viewBox: 400 × 280
// Calgary: bottom-left  Zimbabwe: middle-right
const ARC = 'M 65 205 Q 200 35 335 170'

// Approximate path length — used for stroke-dashoffset animation.
// Exact value not needed; must be >= true path length so the arc
// starts fully hidden. Computed empirically for this bezier.
const ARC_LENGTH = 530

const ARC_DURATION_S = 5   // seconds the arc takes to draw
const START_DELAY_MS = 400 // brief pause before anything moves
const CLOCK_FLIP_MS  = START_DELAY_MS + 2600  // ~midpoint of arc
const COMPLETE_MS    = START_DELAY_MS + ARC_DURATION_S * 1000 + 1000

// Stars: [cx, cy] across the sky quadrant
const STARS: [number, number][] = [
  [30, 18], [78, 10], [138, 26], [198, 7], [252, 20],
  [308, 15], [362, 38], [388, 11], [17, 52], [108, 45],
  [172, 58], [238, 50], [293, 65], [348, 53], [10, 92],
  [70, 82], [128, 105], [342, 90], [390, 75], [48, 137],
  [158, 128], [278, 122], [378, 112], [92, 158], [302, 152],
  [220, 90], [330, 110], [155, 165], [42, 170],
]

export default function TransitionAnimation({ onComplete }: Props) {
  const [started, setStarted] = useState(false)
  const [clock, setClock] = useState('11:58 PM')
  // Keep a stable ref so timers don't retrigger if parent re-renders
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    // Play mbira audio; silently ignore if file is missing
    const audio = new Audio('/audio/episode-1/transition.mp3')
    audio.play().catch(() => {})

    const t1 = setTimeout(() => setStarted(true), START_DELAY_MS)
    const t2 = setTimeout(() => setClock('7:14 AM'), CLOCK_FLIP_MS)
    const t3 = setTimeout(() => onCompleteRef.current(), COMPLETE_MS)

    return () => {
      audio.pause()
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, []) // intentional: runs once on mount

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: '#0A0E1A' }}
    >
      <svg
        viewBox="0 0 400 280"
        style={{ width: '100%', maxWidth: 480, height: 'auto' }}
        aria-hidden="true"
      >
        {/* ── Stars ─────────────────────────────────────────────── */}
        {STARS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={1.2} fill="white" opacity={0.6} />
        ))}

        {/* ── Flight arc — draws itself via stroke-dashoffset ────── */}
        <path
          d={ARC}
          fill="none"
          stroke="#F0C040"
          strokeWidth={1.5}
          strokeDasharray={ARC_LENGTH}
          strokeDashoffset={started ? 0 : ARC_LENGTH}
          opacity={0.55}
          style={{
            transition: started
              ? `stroke-dashoffset ${ARC_DURATION_S}s linear`
              : 'none',
          }}
        />

        {/* ── Clock — appears near arc apex, flips mid-journey ─────── */}
        {started && (
          <text
            x={200}
            y={26}
            fill="#F0C040"
            fontSize={11}
            textAnchor="middle"
            opacity={0.85}
            style={{ fontFamily: 'monospace', letterSpacing: 1 }}
          >
            {clock}
          </text>
        )}

        {/* ── Ubuntu Express ship — moves along arc ──────────────── */}
        {started && (
          <g>
            {/* Body */}
            <rect x={-12} y={-5} width={24} height={10} rx={2} fill="#C1692F" />
            {/* Top wing */}
            <polygon points="-3,-5 -3,-11 7,-5" fill="#D4A017" />
            {/* Bottom wing */}
            <polygon points="-3,5 -3,11 7,5" fill="#D4A017" />
            {/* Nose cone */}
            <polygon points="12,-3 20,0 12,3" fill="#F0C040" />

            {/* Moves the whole <g> along the arc path.
                rotate="auto" keeps the nose pointed forward. */}
            <animateMotion
              path={ARC}
              dur={`${ARC_DURATION_S}s`}
              fill="freeze"
              rotate="auto"
            />
          </g>
        )}

        {/* ── Calgary origin dot + label ──────────────────────────── */}
        <circle cx={65} cy={205} r={4} fill="#4A9ECA" />
        <text x={65} y={220} fill="#7A9BB0" fontSize={10} textAnchor="middle">
          Calgary
        </text>

        {/* ── Zimbabwe destination dot + label ───────────────────── */}
        {/* Fades in just before the ship arrives (delay = 4s after start) */}
        <circle
          cx={335}
          cy={170}
          r={5}
          fill="#3B6D11"
          style={{
            opacity: started ? 1 : 0.2,
            transition: started ? 'opacity 1.2s ease 4s' : 'none',
          }}
        />
        <text
          x={335}
          y={186}
          fill="#7A9BB0"
          fontSize={10}
          textAnchor="middle"
          style={{
            opacity: started ? 1 : 0.2,
            transition: started ? 'opacity 1.2s ease 4s' : 'none',
          }}
        >
          Zimbabwe
        </text>
      </svg>
    </div>
  )
}
