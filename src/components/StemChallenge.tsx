import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import { languageStops } from '../data/languageStops'
import type { LanguageStop } from '../types'

interface Props {
  collectedIdeas: string[]   // stop IDs
  onComplete: () => void
}

type Phase = 'intro' | 'challenge'

// Hint content from EPISODE1_SCRIPT.md
const HINTS = [
  {
    label: 'Hint 1 — Food',
    text: 'What does Tonde eat? Ants and termites — seventy million a year. The hideout must be near their home. A termite mound shape is not just camouflage. It is also near his food.',
    audioUrl: '/audio/episode-1/stem-hint-1.mp3',
  },
  {
    label: 'Hint 2 — Movement',
    text: 'How does Tonde move? Low to the ground. The entrance must be low and narrow — wide enough for Tonde, too small for a human hand.',
    audioUrl: '/audio/episode-1/stem-hint-2.mp3',
  },
  {
    label: 'Hint 3 — Poachers',
    text: 'What do poachers look for? Movement. Smell. Anything out of place. Use materials that smell like the bush — already part of nature.',
    audioUrl: '/audio/episode-1/stem-hint-3.mp3',
  },
]

function checkCamouflage(selected: Set<string>) {
  return selected.has('victoria-falls') || selected.has('matobo-hills') || selected.has('great-zimbabwe')
}
function checkAnchoring(selected: Set<string>) {
  return selected.has('khami-ruins') || selected.has('matobo-hills')
}

export default function StemChallenge({ collectedIdeas, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [openHint, setOpenHint] = useState<number | null>(null)
  const soundRef = useRef<Howl | null>(null)

  useEffect(() => {
    return () => {
      soundRef.current?.stop()
      soundRef.current?.unload()
    }
  }, [])

  function playAudio(url: string) {
    soundRef.current?.stop()
    soundRef.current?.unload()
    const sound = new Howl({ src: [url] })
    soundRef.current = sound
    sound.play()
  }

  function toggleIdea(id: string) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  function toggleHint(i: number) {
    if (openHint === i) {
      setOpenHint(null)
    } else {
      setOpenHint(i)
      playAudio(HINTS[i].audioUrl)
    }
  }

  const camouflageOk   = checkCamouflage(selected)
  const anchoringOk    = checkAnchoring(selected)
  const localMatsOk    = selected.size > 0
  const allConstraints = camouflageOk && anchoringOk && localMatsOk

  // Build idea cards from collected stop IDs
  const ideaCards: LanguageStop[] = collectedIdeas
    .map(id => languageStops.find(s => s.id === id))
    .filter((s): s is LanguageStop => s !== undefined)

  // ── Phase: intro ──────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div
        className="fixed inset-0 flex flex-col px-5 overflow-y-auto"
        style={{ background: '#1A2E1A' }}
      >
        <div className="pt-10 pb-6">
          <img
            src="/images/episode-1/tonde-walking.jpg"
            alt="Tonde the pangolin"
            style={{
              width: '100%',
              borderRadius: 16,
              objectFit: 'cover',
              maxHeight: 220,
              marginBottom: 16,
            }}
          />
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Meet Tonde
          </p>
          <p style={{ fontSize: 20, color: 'white', fontWeight: 600, marginTop: 8, lineHeight: 1.45 }}>
            He curls into a ball when frightened — but poachers just pick him up.
          </p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginTop: 16, lineHeight: 1.6 }}>
            This is Tonde. He lives in Gonarezhou National Park. Tonde is shy and gentle.
            When frightened, he curls into a tight ball — his scales protect him from almost
            anything. Almost. A poacher can just pick up the whole ball and carry him away.
            That is what your hideout must stop.
          </p>

          <div
            className="rounded-2xl p-4 mt-6"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.55 }}>
              You have four ideas. Now design Tonde's hideout.
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 8, lineHeight: 1.5 }}>
              Your hideout must do three things: hide in its surroundings, stay in one place,
              and be built from what nature provides. Choose the ideas that solve all three.
              Then go build it.
            </p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="pb-10">
          <button
            onClick={() => setPhase('challenge')}
            className="w-full rounded-full font-bold"
            style={{ minHeight: 52, fontSize: 18, color: '#0A0E1A', background: '#F0C040' }}
          >
            See the ideas
          </button>
        </div>
      </div>
    )
  }

  // ── Phase: challenge ───────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 flex flex-col overflow-y-auto"
      style={{ background: '#0F1A0F' }}
    >
      <div className="px-5 pt-8 pb-6">
        {/* Constraint indicators */}
        <div className="flex gap-2 mb-6">
          {[
            { label: 'Camouflage',      ok: camouflageOk },
            { label: 'Anchoring',       ok: anchoringOk },
            { label: 'Local materials', ok: localMatsOk },
          ].map(({ label, ok }) => (
            <div
              key={label}
              className="flex-1 rounded-xl py-2 px-1 text-center"
              style={{
                background: ok ? 'rgba(59,109,17,0.4)' : 'rgba(255,255,255,0.07)',
                border: ok ? '1.5px solid #3B6D11' : '1.5px solid rgba(255,255,255,0.12)',
                transition: 'all 300ms ease',
              }}
            >
              <p style={{ fontSize: 18, marginBottom: 2 }}>{ok ? '✓' : '○'}</p>
              <p style={{ fontSize: 10, color: ok ? '#A8E06A' : 'rgba(255,255,255,0.45)', lineHeight: 1.3 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Idea cards */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 10, letterSpacing: 0.5 }}>
          TAP TO SELECT IDEAS
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {ideaCards.map(stop => {
            const isSelected = selected.has(stop.id)
            return (
              <button
                key={stop.id}
                onClick={() => toggleIdea(stop.id)}
                className="w-full rounded-2xl p-4 text-left"
                style={{
                  background: isSelected ? 'rgba(59,109,17,0.35)' : 'rgba(255,255,255,0.07)',
                  border: isSelected ? '2px solid #3B6D11' : '2px solid rgba(255,255,255,0.1)',
                  transition: 'all 250ms ease',
                  minHeight: 44,
                }}
              >
                <p style={{ fontSize: 13, color: isSelected ? '#A8E06A' : 'rgba(255,255,255,0.45)', marginBottom: 4 }}>
                  {stop.localChild.name} — {stop.name}
                </p>
                <p style={{ fontSize: 16, color: 'white', lineHeight: 1.5 }}>
                  {stop.localChild.idea}
                </p>
              </button>
            )
          })}
        </div>

        {/* Hint buttons */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 8, letterSpacing: 0.5 }}>
          HINTS
        </p>
        <div className="flex flex-col gap-2 mb-6">
          {HINTS.map((hint, i) => (
            <div key={i}>
              <button
                onClick={() => toggleHint(i)}
                className="w-full rounded-xl px-4 text-left"
                style={{
                  minHeight: 44,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.7)',
                  padding: '12px 16px',
                }}
              >
                {hint.label} {openHint === i ? '▲' : '▼'}
              </button>
              {openHint === i && (
                <div
                  className="rounded-b-xl px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}>
                    {hint.text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Build button */}
        <button
          onClick={() => allConstraints && onComplete()}
          disabled={!allConstraints}
          className="w-full rounded-full font-bold"
          style={{
            minHeight: 52,
            fontSize: 18,
            color: allConstraints ? '#0A0E1A' : '#888',
            background: allConstraints ? '#F0C040' : '#2A2A2A',
            transition: 'all 300ms ease',
          }}
        >
          {allConstraints ? 'Build it at home!' : 'Select ideas to satisfy all 3 constraints'}
        </button>
      </div>
    </div>
  )
}
