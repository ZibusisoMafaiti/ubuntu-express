import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

interface Props {
  onComplete: () => void
}

// Five pangolin facts from EPISODE1_SCRIPT.md
const FACTS = [
  'Pangolins are the world\'s most trafficked mammal — more are taken illegally each year than any other wild animal on earth.',
  'There are eight species — four in Africa, four in Asia. Zimbabwe is home to two African species.',
  'Their scales are made of keratin — the same material as your fingernails. When curled, even a lion cannot open them.',
  'One pangolin eats up to seventy million ants and termites a year. Without them, insect populations would grow out of control.',
  'Pangolins are in danger because people hunt them illegally. But conservationists across Africa are working hard to protect them — and now, so are you.',
]

// Zimbabwe outline path — same coordinates as ZimbabweMap, used for the stamp
const ZW_PATH =
  'M 80 72 L 148 40 L 212 32 L 268 46 L 328 80 L 358 130 ' +
  'L 352 188 L 325 232 L 288 260 L 220 278 L 150 268 ' +
  'L 92 248 L 58 210 L 48 165 L 54 120 L 68 90 Z'

export default function FactCard({ onComplete }: Props) {
  const [stamped, setStamped] = useState(false)
  const soundRef = useRef<Howl | null>(null)

  // Play episode close narration on mount, then stamp after a short delay
  useEffect(() => {
    const sound = new Howl({ src: ['/audio/episode-1/episode-close.mp3'] })
    soundRef.current = sound
    sound.play()

    const t = setTimeout(() => setStamped(true), 1200)
    return () => {
      clearTimeout(t)
      sound.stop()
      sound.unload()
    }
  }, [])

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-y-auto"
      style={{ background: '#F5E8D0' }}
    >
      <div className="px-5 pt-10 pb-10">
        {/* Heading */}
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#2A1A06', marginBottom: 4 }}>
          Pangolin Facts
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(42,26,6,0.5)', marginBottom: 20 }}>
          What you learned on this mission
        </p>

        {/* Fact cards */}
        <div className="flex flex-col gap-3 mb-8">
          {FACTS.map((fact, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 flex gap-3 items-start"
              style={{ background: 'white', boxShadow: '0 1px 4px rgba(42,26,6,0.1)' }}
            >
              <div
                className="rounded-full flex-shrink-0 flex items-center justify-center font-bold"
                style={{
                  width: 32,
                  height: 32,
                  background: '#3B6D11',
                  color: 'white',
                  fontSize: 14,
                }}
              >
                {i + 1}
              </div>
              <p style={{ fontSize: 16, color: '#2A1A06', lineHeight: 1.55 }}>
                {fact}
              </p>
            </div>
          ))}
        </div>

        {/* Episode summary stats */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{ background: '#2A1A06', color: 'white' }}
        >
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 12, letterSpacing: 1 }}>
            THIS EPISODE
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { value: '4', label: 'languages' },
              { value: '4', label: 'stops' },
              { value: '2', label: 'pangolins safe' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: 28, fontWeight: 700, color: '#F0C040' }}>{value}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zimbabwe journal stamp */}
        <div className="flex flex-col items-center mb-8">
          <p style={{ fontSize: 14, color: 'rgba(42,26,6,0.55)', marginBottom: 12 }}>
            Zimbabwe — Episode 1
          </p>
          <div
            style={{
              transformOrigin: 'center',
              animation: stamped ? 'stampBounce 0.6s ease forwards' : 'none',
              opacity: stamped ? 1 : 0,
            }}
          >
            <svg
              viewBox="48 32 310 248"
              width={110}
              height={88}
              aria-label="Zimbabwe journal stamp"
            >
              {/* Shadow outline */}
              <path d={ZW_PATH} fill="none" stroke="rgba(42,26,6,0.15)" strokeWidth={4} />
              {/* Filled shape */}
              <path d={ZW_PATH} fill="#3B6D11" stroke="#2A5A0A" strokeWidth={2} />
              {/* Star overlay */}
              <text x="205" y="175" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={28}>
                ★
              </text>
            </svg>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(42,26,6,0.5)', marginTop: 8 }}>
            Stamped!
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onComplete}
          className="w-full rounded-full font-bold"
          style={{ minHeight: 52, fontSize: 18, color: '#0A0E1A', background: '#F0C040' }}
        >
          Add to my journal
        </button>
      </div>
    </div>
  )
}
