import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import StoryPanel from './StoryPanel'
import { boardingPanels, fabricSeats, FABRIC_AUDIO_URL } from '../data/boarding'

interface Props {
  onComplete: () => void
}

type Phase = 'intro' | 'fabric' | 'outro'

export default function BoardingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [tapped, setTapped] = useState<Set<string>>(new Set())
  const audioRef = useRef<Howl | null>(null)

  const allTapped = tapped.size === fabricSeats.length

  // Clean up fabric narration audio if component unmounts mid-play
  useEffect(() => {
    return () => {
      audioRef.current?.stop()
      audioRef.current?.unload()
    }
  }, [])

  function handleSeatTap(id: string) {
    if (tapped.has(id)) return
    const next = new Set(tapped)
    next.add(id)
    setTapped(next)

    // When the 4th seat is tapped: play the fabric narration audio
    if (next.size === fabricSeats.length) {
      audioRef.current?.stop()
      audioRef.current?.unload()
      const sound = new Howl({ src: [FABRIC_AUDIO_URL] })
      audioRef.current = sound
      sound.play()
    }
  }

  // ── Phase: intro — panels 1 & 2 ────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <StoryPanel
        panels={boardingPanels.slice(0, 2)}
        onComplete={() => setPhase('fabric')}
      />
    )
  }

  // ── Phase: outro — panel 4 only ─────────────────────────────────────────────
  // Panel 3's interactive has already played. Jump straight to panel 4.
  if (phase === 'outro') {
    return (
      <StoryPanel
        panels={boardingPanels.slice(3)}
        onComplete={onComplete}
        completionLabel="Buckle up!"
      />
    )
  }

  // ── Phase: fabric interactive ──────────────────────────────────────────────
  const panel3 = boardingPanels[2]

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-y-auto"
      style={{ background: '#1B3A2E' }}
    >
      {/* ── Header: instruction + progress ─────────────────────────── */}
      <div className="px-5 pt-10 pb-4">
        <p
          style={{
            fontSize: 20,
            color: 'white',
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          {panel3.text}
        </p>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            marginTop: 8,
          }}
        >
          {tapped.size} of {fabricSeats.length} discovered
        </p>
      </div>

      {/* ── Seat grid — 2 × 2 ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 px-5">
        {fabricSeats.map(seat => {
          const isTapped = tapped.has(seat.id)
          return (
            <button
              key={seat.id}
              onClick={() => handleSeatTap(seat.id)}
              className="flex flex-col items-center justify-center rounded-2xl"
              style={{
                minHeight: 130,
                backgroundColor: seat.colour,
                border: isTapped
                  ? '2px solid rgba(255,255,255,0.45)'
                  : '2px solid rgba(255,255,255,0.1)',
                opacity: isTapped ? 1 : 0.82,
                transition: 'opacity 200ms ease, border-color 200ms ease',
                padding: '16px 12px',
                gap: 6,
              }}
            >
              {isTapped ? (
                <>
                  {/* Checkmark */}
                  <span
                    style={{
                      fontSize: 20,
                      color: 'rgba(255,255,255,0.9)',
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: 'white',
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    {seat.name}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    from {seat.country}
                  </span>
                </>
              ) : (
                <span
                  style={{
                    fontSize: 32,
                    color: 'rgba(255,255,255,0.35)',
                    lineHeight: 1,
                  }}
                >
                  ?
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Narration + Continue — appears after all 4 are tapped ──── */}
      {allTapped && (
        <div className="px-5 pt-6 pb-12">
          {/* Narration text */}
          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.65,
              marginBottom: 24,
            }}
          >
            {panel3.narration}
          </p>

          {/* Continue button */}
          <button
            onClick={() => setPhase('outro')}
            className="w-full rounded-full font-bold"
            style={{
              padding: '16px 24px',
              minHeight: 52,
              fontSize: 18,
              color: '#0A0E1A',
              background: '#F0C040',
            }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}
