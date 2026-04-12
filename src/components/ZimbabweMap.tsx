import { useEffect, useRef } from 'react'
import { Howl } from 'howler'
import { languageStops } from '../data/languageStops'
import type { LanguageStop } from '../types'

interface Props {
  completedStops: string[]
  onSelectStop: (stop: LanguageStop) => void
  onOpenChallenge: () => void
}

// ── Zimbabwe SVG outline ───────────────────────────────────────────────────────
// Simplified polygon traced clockwise from northwest. ViewBox 0 0 400 320.
const ZIMBABWE_PATH =
  'M 80 72 L 148 40 L 212 32 L 268 46 L 328 80 L 358 130 L 352 188 ' +
  'L 325 232 L 288 260 L 220 278 L 150 268 L 92 248 L 58 210 ' +
  'L 48 165 L 54 120 L 68 90 Z'

// ── Language stop pin positions (SVG coords, geographically approximate) ──────
const STOP_POSITIONS: Record<string, { x: number; y: number }> = {
  'victoria-falls': { x: 80, y: 82 },
  'khami-ruins':    { x: 122, y: 194 },
  'matobo-hills':   { x: 152, y: 224 },
  'great-zimbabwe': { x: 278, y: 228 },
}

// ── Locked pangolin pins ───────────────────────────────────────────────────────
const PANGOLIN_PINS = [
  { id: 'nothando', name: 'Nothando', subtext: 'Hwange',      x: 78,  y: 138 },
  { id: 'tonde',    name: 'Tonde',    subtext: 'Gonarezhou',  x: 312, y: 250 },
]

const MAP_INTRO_AUDIO = '/audio/episode-1/map-intro.mp3'

export default function ZimbabweMap({ completedStops, onSelectStop, onOpenChallenge }: Props) {
  const audioRef = useRef<Howl | null>(null)
  const allDone = completedStops.length === languageStops.length

  // Play map orientation narration on mount
  useEffect(() => {
    const sound = new Howl({ src: [MAP_INTRO_AUDIO] })
    audioRef.current = sound
    sound.play()
    return () => {
      sound.stop()
      sound.unload()
    }
  }, [])

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: '#F5E8D0' }}
    >
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="px-5 pt-8 pb-3">
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#2A1A06',
            marginBottom: 4,
          }}
        >
          Zimbabwe
        </h1>

        {/* Progress bar */}
        <div
          className="rounded-full overflow-hidden"
          style={{ height: 6, background: 'rgba(42,26,6,0.15)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${(completedStops.length / languageStops.length) * 100}%`,
              background: '#3B6D11',
              transition: 'width 400ms ease',
            }}
          />
        </div>

        <p
          style={{
            fontSize: 13,
            color: 'rgba(42,26,6,0.6)',
            marginTop: 5,
          }}
        >
          {completedStops.length} of {languageStops.length} stops visited
        </p>
      </div>

      {/* ── Map SVG ───────────────────────────────────────────────────── */}
      <div className="flex-1 relative px-2">
        <svg
          viewBox="0 0 400 320"
          style={{ width: '100%', height: '100%' }}
          aria-label="Map of Zimbabwe"
        >
          {/* Country fill */}
          <path
            d={ZIMBABWE_PATH}
            fill="#8FBA6A"
            stroke="#5A8A3A"
            strokeWidth={1.5}
          />

          {/* ── Language stop pins ──────────────────────────────────── */}
          {languageStops.map(stop => {
            const pos = STOP_POSITIONS[stop.id]
            if (!pos) return null
            const done = completedStops.includes(stop.id)

            return (
              <g
                key={stop.id}
                onClick={() => !done && onSelectStop(stop)}
                style={{ cursor: done ? 'default' : 'pointer' }}
              >
                {/* Invisible enlarged tap target (44×44px centred on pin) */}
                <circle cx={pos.x} cy={pos.y} r={22} fill="transparent" />

                {/* Pin circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={14}
                  fill={done ? '#3B6D11' : stop.pinColour}
                  stroke="white"
                  strokeWidth={2}
                />

                {/* Checkmark or number */}
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={done ? 14 : 12}
                  fontWeight="bold"
                >
                  {done ? '✓' : languageStops.indexOf(stop) + 1}
                </text>

                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y + 30}
                  textAnchor="middle"
                  fill="#2A1A06"
                  fontSize={9}
                  fontWeight="600"
                >
                  {stop.name}
                </text>
              </g>
            )
          })}

          {/* ── Locked pangolin pins ────────────────────────────────── */}
          {PANGOLIN_PINS.map(pin => (
            <g key={pin.id}>
              <circle cx={pin.x} cy={pin.y} r={11} fill="#AAAAAA" stroke="white" strokeWidth={1.5} />
              {/* Lock icon (simplified) */}
              <rect x={pin.x - 4} y={pin.y - 2} width={8} height={6} rx={1} fill="white" opacity={0.8} />
              <path
                d={`M ${pin.x - 2.5} ${pin.y - 2} a 2.5 2.5 0 0 1 5 0`}
                fill="none"
                stroke="white"
                strokeWidth={1.5}
                opacity={0.8}
              />
              <text
                x={pin.x}
                y={pin.y + 26}
                textAnchor="middle"
                fill="#666"
                fontSize={8}
              >
                {pin.name}
              </text>
              <text
                x={pin.x}
                y={pin.y + 36}
                textAnchor="middle"
                fill="#888"
                fontSize={7}
              >
                {pin.subtext}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* ── Task Card button ────────────────────────────────────────── */}
      <div className="px-5 pb-8">
        <button
          onClick={() => allDone && onOpenChallenge()}
          className="w-full rounded-full font-bold"
          style={{
            minHeight: 52,
            fontSize: 18,
            color: allDone ? '#0A0E1A' : '#999',
            background: allDone ? '#F0C040' : '#DDDDDD',
            animation: allDone ? 'slowPulse 2s ease-in-out infinite' : 'none',
            transition: 'background 400ms ease',
          }}
          disabled={!allDone}
          aria-disabled={!allDone}
        >
          {allDone ? 'Design the Hideout' : `Visit all 4 stops first (${completedStops.length}/4)`}
        </button>
      </div>
    </div>
  )
}
