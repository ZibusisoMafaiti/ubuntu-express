import React, { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import type { LanguageStop } from '../types'

// Named LanguageStopScreen to avoid collision with the LanguageStop type import.

interface Props {
  stop: LanguageStop
  onComplete: () => void
}

type Phase = 'coaching' | 'hello-unlock' | 'interaction' | 'thanks-unlock' | 'complete'

// ── Per-stop audio URLs ────────────────────────────��───────────────────────────
// Defined here rather than in the data file to keep the LanguageStop interface
// clean. All paths follow the convention in PROGRESS.md Audio Architecture.
const AUDIO: Record<string, Partial<{
  coach: string
  helloUnlock: string
  childIdea: string
  specialMoment: string
  wisdom: string
  complete: string
}>> = {
  'victoria-falls': {
    coach:       '/audio/episode-1/vicfalls-coach-hello.mp3',
    helloUnlock: '/audio/episode-1/vicfalls-unlock.mp3',
    childIdea:   '/audio/episode-1/vicfalls-sitwala.mp3',
    wisdom:      '/audio/episode-1/vicfalls-wisdom.mp3',
    complete:    '/audio/episode-1/vicfalls-complete.mp3',
  },
  'khami-ruins': {
    coach:     '/audio/episode-1/khami-coach.mp3',
    childIdea: '/audio/episode-1/khami-thandiwe.mp3',
    wisdom:    '/audio/episode-1/khami-wisdom.mp3',
    complete:  '/audio/episode-1/khami-complete.mp3',
  },
  'matobo-hills': {
    coach:         '/audio/episode-1/matobo-coach.mp3',
    childIdea:     '/audio/episode-1/matobo-nokukhanya.mp3',
    specialMoment: '/audio/episode-1/matobo-totem.mp3',
    wisdom:        '/audio/episode-1/matobo-wisdom.mp3',
    complete:      '/audio/episode-1/matobo-complete.mp3',
  },
  'great-zimbabwe': {
    coach:         '/audio/episode-1/greatzim-coach.mp3',
    helloUnlock:   '/audio/episode-1/greatzim-moment.mp3',
    childIdea:     '/audio/episode-1/greatzim-chiedza.mp3',
    wisdom:        '/audio/episode-1/greatzim-wisdom.mp3',
    complete:      '/audio/episode-1/greatzim-complete.mp3',
  },
}

// ── Small helper: play a Howl and return it for cleanup ─────────���────────────
function playAudio(url: string | undefined): Howl | null {
  if (!url) return null
  const sound = new Howl({ src: [url] })
  sound.play()
  return sound
}

// '#...' → solid colour. Anything else → treated as an image URL.
function stopBg(value: string): React.CSSProperties {
  return value.startsWith('#')
    ? { background: value }
    : { background: `url(${value}) center / cover no-repeat` }
}

export default function LanguageStopScreen({ stop, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('coaching')
  const [flashing, setFlashing] = useState(false)
  const soundRef = useRef<Howl | null>(null)

  // Stop any playing audio when unmounting
  useEffect(() => {
    return () => {
      soundRef.current?.stop()
      soundRef.current?.unload()
    }
  }, [])

  // Play phase-appropriate audio when phase changes
  useEffect(() => {
    soundRef.current?.stop()
    soundRef.current?.unload()

    const audio = AUDIO[stop.id] ?? {}
    let url: string | undefined

    if (phase === 'coaching')      url = audio.coach
    if (phase === 'hello-unlock')  url = audio.helloUnlock
    if (phase === 'interaction')   url = audio.childIdea
    if (phase === 'complete')      url = audio.complete

    soundRef.current = playAudio(url)
  }, [phase, stop.id])

  // ── Phase 1 — Coaching ──────��───────────────────────────────────────────────
  if (phase === 'coaching') {
    return (
      <div
        className="fixed inset-0 flex flex-col"
        style={{ background: '#0A0E1A' }}
      >
        {/* Kesi label */}
        <div className="px-5 pt-10">
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Kesi says
          </p>
          {/* Language badge */}
          <span
            className="inline-block mt-2 px-3 py-1 rounded-full"
            style={{ background: stop.pinColour, fontSize: 13, color: 'white', fontWeight: 600 }}
          >
            {stop.language}
          </span>
        </div>

        {/* Word pair */}
        <div className="flex gap-4 px-5 mt-8">
          {/* Hello — highlighted */}
          <div
            className="flex-1 rounded-2xl p-4"
            style={{ background: stop.pinColour + '30', border: `2px solid ${stop.pinColour}` }}
          >
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Hello</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: 'white', marginTop: 4 }}>{stop.hello}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{stop.helloPronunciation}</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{stop.helloMeaning}</p>
          </div>

          {/* Thanks — greyed */}
          <div
            className="flex-1 rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.12)' }}
          >
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: 1 }}>Thanks</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{stop.thanks}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>{stop.thanksPronunciation}</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 2 }}>{stop.thanksMeaning}</p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="px-5 pb-10">
          <button
            onClick={() => setPhase('hello-unlock')}
            className="w-full rounded-full font-bold"
            style={{ minHeight: 52, fontSize: 18, color: '#0A0E1A', background: '#F0C040' }}
          >
            I've got it — land!
          </button>
        </div>
      </div>
    )
  }

  // ── Phase 2 — Hello unlock ─────────────────────���────────────────────────────
  if (phase === 'hello-unlock') {
    function handleHelloTap() {
      if (flashing) return
      setFlashing(true)
      setTimeout(() => {
        setFlashing(false)
        setPhase('interaction')
      }, 220)
    }

    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center px-5"
        style={{
          ...(flashing ? { background: '#1A4010' } : stopBg(stop.backgroundColour)),
          transition: 'background 200ms ease',
        }}
      >
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
          {stop.localChild.name} is waiting.
        </p>
        <p style={{ fontSize: 18, color: 'white', marginBottom: 40, textAlign: 'center' }}>
          Say hello in {stop.language} to meet them.
        </p>

        <button
          onClick={handleHelloTap}
          className="rounded-2xl font-bold"
          style={{
            minHeight: 80,
            width: '100%',
            fontSize: 36,
            color: 'white',
            background: stop.pinColour,
            letterSpacing: 1,
          }}
        >
          {stop.hello}
        </button>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', marginTop: 10 }}>
          {stop.helloPronunciation}
        </p>
      </div>
    )
  }

  // ── Phase 3 — Interaction ───────────────────────────────────────────────────
  if (phase === 'interaction') {
    const audio = AUDIO[stop.id] ?? {}

    function handleWisdomPlay() {
      soundRef.current?.stop()
      soundRef.current?.unload()
      soundRef.current = playAudio(audio.wisdom)
    }

    function handleSpecialMomentPlay() {
      soundRef.current?.stop()
      soundRef.current?.unload()
      soundRef.current = playAudio(audio.specialMoment)
    }

    return (
      <div
        className="fixed inset-0 flex flex-col overflow-y-auto"
        style={stopBg(stop.backgroundColour)}
      >
        <div className="px-5 pt-10 pb-6">
          {/* Child avatar + speech bubble */}
          <div className="flex items-start gap-3 mb-5">
            <div
              className="rounded-full flex-shrink-0 flex items-center justify-center font-bold"
              style={{
                width: 52,
                height: 52,
                background: stop.localChild.avatarColour,
                color: '#2A1A06',
                fontSize: 16,
              }}
            >
              {stop.localChild.initials}
            </div>

            {/* Speech bubble */}
            <div
              className="flex-1 rounded-2xl rounded-tl-none p-4"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
                {stop.localChild.name}:
              </p>
              <p style={{ fontSize: 18, color: 'white', lineHeight: 1.5 }}>
                {stop.localChild.idea}
              </p>
            </div>
          </div>

          {/* Animal wisdom card */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: 'rgba(0,0,0,0.25)',
              borderLeft: '3px solid rgba(255,255,255,0.35)',
            }}
            onClick={handleWisdomPlay}
          >
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>
              {stop.animalWisdom.animal}:
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>
              {stop.animalWisdom.text}
            </p>
          </div>

          {/* Special moment (Matobo totem / Great Zimbabwe language reflection) */}
          {stop.specialMoment && (
            <div
              className="rounded-xl p-4 mb-4"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              onClick={handleSpecialMomentPlay}
            >
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, fontStyle: 'italic' }}>
                {stop.specialMoment}
              </p>
            </div>
          )}

          <button
            onClick={() => setPhase('thanks-unlock')}
            className="w-full rounded-full font-bold"
            style={{ minHeight: 52, fontSize: 18, color: '#0A0E1A', background: '#F0C040' }}
          >
            Say thank you to {stop.localChild.name}
          </button>
        </div>
      </div>
    )
  }

  // ── Phase 4 — Thanks unlock ─────────────────────────────────────────────────
  if (phase === 'thanks-unlock') {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center px-5"
        style={stopBg(stop.backgroundColour)}
      >
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
          Now say thank you in {stop.language}.
        </p>

        <p style={{ fontSize: 38, fontWeight: 700, color: 'white', textAlign: 'center' }}>
          {stop.thanks}
        </p>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', marginTop: 8, marginBottom: 48 }}>
          {stop.thanksPronunciation}
        </p>

        <button
          onClick={() => setPhase('complete')}
          className="w-full rounded-full font-bold"
          style={{ minHeight: 52, fontSize: 22, color: 'white', background: stop.pinColour }}
        >
          {stop.thanks}
        </button>
      </div>
    )
  }

  // ── Phase 5 — Complete ─────────────────────────────���────────────────────────
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-5"
      style={{ background: '#0D2A0D' }}
    >
      <div
        className="w-full rounded-2xl p-6 mb-6"
        style={{ background: 'rgba(59,109,17,0.35)', border: '2px solid #3B6D11' }}
      >
        <p style={{ fontSize: 22, fontWeight: 700, color: '#A8E06A', marginBottom: 8 }}>
          {stop.name} — complete!
        </p>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 6 }}>
          You learned: <strong>{stop.hello}</strong> and <strong>{stop.thanks}</strong>
        </p>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>
          {stop.localChild.name}'s idea is saved to your collection.
        </p>
      </div>

      <button
        onClick={onComplete}
        className="w-full rounded-full font-bold"
        style={{ minHeight: 52, fontSize: 18, color: '#0A0E1A', background: '#F0C040' }}
      >
        Back to map
      </button>
    </div>
  )
}
