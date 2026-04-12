import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import type { StoryPanelData } from '../types'

interface Props {
  panels: StoryPanelData[]
  onComplete: () => void
  // Optional CTA shown on the last panel (e.g. "Board the Ubuntu Express")
  // When set, a full-width button appears above the progress dots.
  // Tapping the button OR tapping the screen both call onComplete.
  completionLabel?: string
}

export default function StoryPanel({ panels, onComplete, completionLabel }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  // panelVisible drives the opacity transition.
  // false → 0 (fade out), then content swaps, then true → 1 (fade in).
  const [panelVisible, setPanelVisible] = useState(true)
  const [showNarration, setShowNarration] = useState(false)

  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Skip the initial mount so the useEffect below doesn't fire on load
  const isFirstMount = useRef(true)

  const panel = panels[currentIndex]

  // ── Audio ──────────────────────────────────────────────────────────────────
  // Exactly the pattern specified in PROGRESS.md.
  // audioUrl empty string or undefined → no sound, no error.
  useEffect(() => {
    const url = panels[currentIndex]?.audioUrl
    if (!url) return
    const sound = new Howl({ src: [url] })
    sound.play()
    return () => {
      sound.stop()
      sound.unload()
    }
  }, [currentIndex, panels])

  // ── Fade-in after content swap ─────────────────────────────────────────────
  // When currentIndex changes: content has loaded at opacity 0.
  // Two requestAnimationFrames guarantee the DOM has painted at opacity 0
  // before we trigger the CSS transition back to opacity 1.
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPanelVisible(true)
      })
    })
  }, [currentIndex])

  // ── Interaction ─────────────────────────────────────────────────────────────
  function handleTap() {
    // Block tap while fading or while narration overlay is open
    if (!panelVisible || showNarration) return

    // Start fade-out
    setPanelVisible(false)

    // After 200ms (fade-out complete): swap content or finish
    setTimeout(() => {
      if (currentIndex < panels.length - 1) {
        setCurrentIndex(i => i + 1)
        // fade-in is triggered by the useEffect above watching currentIndex
      } else {
        onCompleteRef.current()
        // Component unmounts — no further state updates needed
      }
    }, 200)
  }

  function handleBookTap(e: React.MouseEvent | React.TouchEvent) {
    e.stopPropagation()
    setShowNarration(true)
  }

  function handleCloseNarration(e: React.MouseEvent) {
    e.stopPropagation()
    setShowNarration(false)
  }

  // ── Background ──────────────────────────────────────────────────────────────
  // '#...' → solid colour.  Anything else → treated as an image URL.
  const isImageUrl = !panel.background.startsWith('#')
  const bgStyle = isImageUrl
    ? {
        backgroundImage: `url(${panel.background})`,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center' as const,
      }
    : { backgroundColor: panel.background }

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={bgStyle}
      onClick={handleTap}
    >
      {/* ── Panel content — fades between panels ─────────────────── */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{
          opacity: panelVisible ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      >
        {/* Dark gradient — bottom 40% */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '45%',
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 55%)',
          }}
        />

        {/* Text block */}
        <div className="relative px-5 pb-16" style={{ zIndex: 1 }}>
          {panel.speaker && (
            <p
              className="mb-1"
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.4,
              }}
            >
              {panel.speaker}:
            </p>
          )}
          <p
            style={{
              fontSize: 20,
              color: 'white',
              lineHeight: 1.55,
              fontWeight: 500,
            }}
          >
            {panel.text}
          </p>
        </div>

        {/* CTA button on the last panel */}
        {completionLabel && currentIndex === panels.length - 1 && (
          <button
            className="relative mx-5 mb-3 w-auto rounded-full font-bold"
            style={{
              fontSize: 18,
              color: '#0A0E1A',
              background: '#F0C040',
              padding: '14px 24px',
              minHeight: 52,
              zIndex: 2,
            }}
            onClick={e => { e.stopPropagation(); onCompleteRef.current() }}
          >
            {completionLabel}
          </button>
        )}

        {/* Progress dots — one per panel */}
        <div
          className="absolute bottom-5 left-0 right-0 flex gap-2 justify-center pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {panels.map((_, i) => (
            <div
              key={i}
              className="rounded-full flex-shrink-0"
              style={{
                width: 6,
                height: 6,
                backgroundColor:
                  i === currentIndex
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Book icon — parent reading button ────────────────────── */}
      {/* Hidden while narration is open to avoid confusion */}
      {!showNarration && (
        <button
          className="absolute flex items-center justify-center rounded-full"
          style={{
            right: 16,
            bottom: 56,
            width: 44,
            height: 44,
            background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.2)',
            zIndex: 2,
          }}
          onClick={handleBookTap}
          aria-label="Parent reading view"
        >
          <BookIcon />
        </button>
      )}

      {/* ── Narration overlay — slides up from bottom ─────────────── */}
      {/* stopPropagation prevents taps inside the overlay advancing the panel */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          zIndex: 10,
          background: 'rgba(8, 12, 22, 0.97)',
          borderRadius: '16px 16px 0 0',
          padding: '20px 20px 48px',
          maxHeight: '68%',
          overflowY: 'auto',
          transform: showNarration ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 320ms ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button — 44px tap target */}
        <button
          className="absolute flex items-center justify-center rounded-full"
          style={{
            top: 14,
            right: 16,
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.1)',
            fontSize: 24,
            color: 'white',
            lineHeight: 1,
          }}
          onClick={handleCloseNarration}
          aria-label="Close narration"
        >
          ×
        </button>

        {/* Narration label */}
        <p
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          Narration
        </p>

        {panel.speaker && (
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 8,
            }}
          >
            {panel.speaker}:
          </p>
        )}

        {/* Full narration text — 20px as specified */}
        <p
          style={{
            fontSize: 20,
            color: 'white',
            lineHeight: 1.65,
            paddingRight: 52, // clear of close button
          }}
        >
          {panel.narration}
        </p>
      </div>
    </div>
  )
}

// ── Book icon SVG ────────────────────────────────────────────────────────────
// Open-book shape: two pages meeting at the spine.
function BookIcon() {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      aria-hidden="true"
    >
      {/* Left page */}
      <path
        d="M10 15.5V3C10 3 7.5 2 3.5 3.5V16C7.5 14.5 10 15.5 10 15.5Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Right page */}
      <path
        d="M10 15.5V3C10 3 12.5 2 16.5 3.5V16C12.5 14.5 10 15.5 10 15.5Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
