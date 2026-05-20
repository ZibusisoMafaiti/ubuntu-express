import { useState, useEffect, useRef, useCallback } from 'react'
import type { ChapterScreen } from '../data/chapter1Screens'

interface ChapterPlayerProps {
  screens: ChapterScreen[]
  onComplete: () => void
}

export default function ChapterPlayer({ screens, onComplete }: ChapterPlayerProps) {
  const [currentIndex, setCurrentIndex]   = useState(0)
  const [isPaused, setIsPaused]           = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const audioRef  = useRef<HTMLAudioElement | null>(null)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const synthRef  = useRef<SpeechSynthesisUtterance | null>(null)

  const current = screens[currentIndex]
  const isLast  = currentIndex === screens.length - 1

  // ── Advance to next screen ────────────────────────────────────────────────
  const advance = useCallback(() => {
    if (isLast) {
      onComplete()
      return
    }
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(i => i + 1)
      setIsTransitioning(false)
    }, 400)
  }, [isLast, onComplete])

  // ── Stop all audio/timers ─────────────────────────────────────────────────
  const stopAll = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }, [])

  // ── Play current screen ───────────────────────────────────────────────────
  const playScreen = useCallback((screen: ChapterScreen) => {
    stopAll()

    // If a real audio file exists, use it
    if (screen.audioFile) {
      const audio = new Audio(screen.audioFile)
      audioRef.current = audio
      audio.onended = advance
      audio.play().catch(() => {
        // Audio failed — fall back to timer
        timerRef.current = setTimeout(advance, screen.durationMs)
      })
      return
    }

    // No audio file — use browser TTS as placeholder
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(screen.caption)
      utterance.rate  = 0.85
      utterance.pitch = 1.0
      // Pick a warmer voice if available
      const voices = window.speechSynthesis.getVoices()
      const preferred = voices.find(v =>
        v.name.includes('Samantha') ||
        v.name.includes('Karen')    ||
        v.name.includes('Moira')    ||
        v.name.includes('female')
      )
      if (preferred) utterance.voice = preferred
      utterance.onend = advance
      synthRef.current = utterance
      window.speechSynthesis.speak(utterance)
    } else {
      // No TTS either — just use duration
      timerRef.current = setTimeout(advance, screen.durationMs)
    }
  }, [advance, stopAll])

  // ── Screen change effect ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isPaused) {
      playScreen(current)
    }
    return () => stopAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused])

  // ── Tap to pause / resume ─────────────────────────────────────────────────
  function handleTap() {
    if (isPaused) {
      setIsPaused(false)
      playScreen(current)
    } else {
      stopAll()
      setIsPaused(true)
    }
  }

  // ── Illustration background — real art or placeholder ────────────────────
  

  const isNarratorOut = current.narratorType === 'narrator-out'

  return (
    <div
      onClick={handleTap}
      style={{
        position:   'fixed',
        inset:      0,
        cursor:     'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        fontFamily: "'Lora', Georgia, serif",
        overflow: 'hidden',
      }}
    >
      {/* ── NARRATOR STEP-OUT SCREEN ── */}
      {isNarratorOut ? (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#0D1F15',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 32px',
          textAlign: 'center',
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}>
          {/* Subtle texture */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 30% 25%, rgba(45,106,79,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 75%, rgba(196,85,42,0.15) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            fontFamily: "'Lora', serif",
            fontSize: 10,
            letterSpacing: '3px',
            color: 'rgba(232,151,58,0.55)',
            textTransform: 'uppercase',
            marginBottom: 28,
            position: 'relative',
          }}>
            The narrator
          </div>
          <div style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontSize: 18,
            fontStyle: 'italic',
            color: '#F5EFE0',
            lineHeight: 1.7,
            marginBottom: 32,
            position: 'relative',
            maxWidth: 320,
          }}
            dangerouslySetInnerHTML={{ __html: current.caption.replace(
              /puffer fish|stretcher/gi,
              match => `<em style="color:#E8973A;font-style:normal">${match}</em>`
            )}}
          />
          <div style={{
            width: 40, height: 1,
            background: 'rgba(232,151,58,0.3)',
            margin: '0 auto 24px',
          }} />
          <div style={{
            fontFamily: "'Lora', serif",
            fontSize: 12,
            fontStyle: 'italic',
            color: 'rgba(245,223,160,0.4)',
          }}>
            tap to continue listening
          </div>
        </div>
      ) : (
        /* ── STORY SCREEN ── */
        <>
          {/* Illustration */}
         <div style={{
  position: 'absolute',
  inset: 0,
  background: current.illustrationBg,
  opacity: isTransitioning ? 0 : 1,
  transition: 'opacity 0.4s ease',
}}>
  <img
    src={`/illustrations/${current.illustrationKey}.jpg`}
    alt=""
    style={{
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center top',
    }}
  />
</div>

          {/* Gradient overlay — ensures caption is always readable */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Caption area */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            padding: '24px 28px 40px',
            opacity: isTransitioning ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}>
            {/* Narrator wave — only when playing */}
            {!isPaused && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 12 }}>
                {[8, 14, 10, 16, 8].map((h, i) => (
                  <div key={i} style={{
                    width: 3, height: h,
                    borderRadius: 2,
                    background: '#C4552A',
                    animation: `wave 0.8s ease-in-out ${i * 0.15}s infinite`,
                  }} />
                ))}
                <span style={{
                  fontFamily: "'Lora', serif",
                  fontSize: 9,
                  color: 'rgba(232,151,58,0.5)',
                  marginLeft: 6,
                  letterSpacing: '1px',
                }}>
                  narrator
                </span>
              </div>
            )}
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: 14,
              fontStyle: 'italic',
              color: '#F5EFE0',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {current.caption}
            </p>
          </div>
        </>
      )}

      {/* ── PROGRESS DOTS ── always visible ── */}
      <div style={{
        position: 'absolute',
        top: 14, left: 0, right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 5,
        pointerEvents: 'none',
      }}>
        {screens.map((_, i) => (
          <div key={i} style={{
            height: 5,
            width: i === currentIndex ? 14 : 5,
            borderRadius: i === currentIndex ? 3 : '50%',
            background: i < currentIndex
              ? 'rgba(232,151,58,0.8)'
              : i === currentIndex
                ? '#E8973A'
                : 'rgba(255,255,255,0.18)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* ── PAUSE OVERLAY ── */}
      {isPaused && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(26,10,4,0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}>
          <div style={{
            width: 68, height: 68,
            borderRadius: '50%',
            background: 'rgba(196,85,42,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(245,223,160,0.25)',
          }}>
            <div style={{
              width: 0, height: 0,
              borderTop: '13px solid transparent',
              borderBottom: '13px solid transparent',
              borderLeft: '22px solid white',
              marginLeft: 5,
            }} />
          </div>
          <p style={{
            fontFamily: "'Lora', serif",
            fontSize: 12,
            fontStyle: 'italic',
            color: 'rgba(245,223,160,0.6)',
            margin: 0,
          }}>
            tap anywhere to continue
          </p>
        </div>
      )}

      {/* ── FONT KEYFRAMES ── injected once ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&family=Lora:ital,wght@0,400;1,400&display=swap');
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50%       { transform: scaleY(1);   opacity: 1;   }
        }
      `}</style>
    </div>
  )
}
