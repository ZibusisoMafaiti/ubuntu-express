import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'

interface Props {
  photoUrl: string
  onComplete: () => void
}

type Stage = 'notification' | 'tonde' | 'nothando' | 'quiet'

// Polaroid frame component — white border, slight rotation, child's photo inside
function Polaroid({ src, caption }: { src: string; caption: string }) {
  return (
    <div style={{ display: 'inline-block' }}>
      <div
        style={{
          background: 'white',
          padding: '8px 8px 24px 8px',
          borderRadius: 4,
          transform: 'rotate(-3deg)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          width: 140,
        }}
      >
        <div
          style={{
            width: 124,
            height: 110,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      <p
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.75)',
          textAlign: 'center',
          marginTop: 8,
          maxWidth: 140,
          lineHeight: 1.4,
        }}
      >
        {caption}
      </p>
    </div>
  )
}

export default function DeliveryScene({ photoUrl, onComplete }: Props) {
  const [stage, setStage] = useState<Stage>('notification')
  const [showHeadHome, setShowHeadHome] = useState(false)
  const soundRef = useRef<Howl | null>(null)

  function playAudio(url: string) {
    soundRef.current?.stop()
    soundRef.current?.unload()
    const sound = new Howl({ src: [url] })
    soundRef.current = sound
    sound.play()
  }

  useEffect(() => {
    return () => {
      soundRef.current?.stop()
      soundRef.current?.unload()
    }
  }, [])

  // When stage changes to 'nothando' auto-advance after audio plays (~5s);
  // when 'quiet', show head-home button after 3s
  useEffect(() => {
    if (stage === 'nothando') {
      playAudio('/audio/episode-1/delivery-nothando.mp3')
    }
    if (stage === 'quiet') {
      playAudio('/audio/episode-1/delivery-quiet.mp3')
      const t = setTimeout(() => setShowHeadHome(true), 3000)
      return () => clearTimeout(t)
    }
  }, [stage])

  // ── Stage: notification card ─────────────────────────────────────────────
  if (stage === 'notification') {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center px-6"
        style={{ background: '#0A0E1A' }}
        onClick={() => {
          playAudio('/audio/episode-1/notification.mp3')
          setStage('tonde')
        }}
      >
        <div
          className="w-full rounded-3xl p-8 text-center"
          style={{ background: '#FAEEDA', maxWidth: 340 }}
        >
          <p style={{ fontSize: 22, fontWeight: 700, color: '#412402', marginBottom: 8 }}>
            Muntu, you have a message...
          </p>
          <p style={{ fontSize: 15, color: 'rgba(65,36,2,0.6)' }}>tap to open</p>
        </div>
      </div>
    )
  }

  // ── Stage: Tonde / Gonarezhou ────────────────────────────────────────────
  if (stage === 'tonde') {
    return (
      <div
        className="fixed inset-0 flex flex-col"
        style={{
          backgroundImage: 'url(/images/episode-1/gonarezhou-landscape.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex-1 flex flex-col justify-end px-5 pb-8">
          {/* Delivery scene content */}
          <p
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Gonarezhou National Park
          </p>

          <div className="flex items-end gap-6 mb-8">
            <img
              src="/images/episode-1/delivery-lulu.jpg"
              alt="Lulu"
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            />

            <Polaroid src={photoUrl} caption="Tonde's new home — built by you." />
          </div>

          <p style={{ fontSize: 18, color: 'white', lineHeight: 1.55, marginBottom: 6 }}>
            The Ubuntu Express delivered your design to Gonarezhou.
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, marginBottom: 28 }}>
            Lulu carried your design — just like this. Tonde came to investigate.
            He sniffed the entrance. Crawled inside. Curled into his tight ball.
            And he was safe. The entrance was too narrow for any hand to reach through.
          </p>

          <button
            onClick={() => setStage('nothando')}
            className="w-full rounded-full font-bold"
            style={{ minHeight: 52, fontSize: 18, color: '#0A0E1A', background: '#F0C040' }}
          >
            Continue to Hwange
          </button>
        </div>
      </div>
    )
  }

  // ── Stage: Nothando / Hwange ─────────────────────────────────────────────
  if (stage === 'nothando') {
    return (
      <div
        className="fixed inset-0 flex flex-col"
        style={{
          backgroundImage: 'url(/images/episode-1/hwange-landscape.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex-1 flex flex-col justify-end px-5 pb-8">
          <p
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Hwange National Park
          </p>

          <div className="flex items-end gap-6 mb-8">
            <img
              src="/images/episode-1/delivery-lulu.jpg"
              alt="Lulu"
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            />

            <Polaroid src={photoUrl} caption="Nothando and her young one — safe inside." />
          </div>

          <img
            src="/images/episode-1/nothando-pair.jpg"
            alt="Nothando and her young one"
            style={{
              width: '100%',
              borderRadius: 12,
              objectFit: 'cover',
              maxHeight: 180,
              marginBottom: 16,
            }}
          />
          <p style={{ fontSize: 18, color: 'white', lineHeight: 1.55, marginBottom: 6 }}>
            Then they flew to Hwange — to Nothando and her young one.
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, marginBottom: 28 }}>
            Nothando was waiting. She was not alone — she had a young one with her.
            They both went inside. Both safe. One design. Two pangolins protected.
          </p>

          <button
            onClick={() => setStage('quiet')}
            className="w-full rounded-full font-bold"
            style={{ minHeight: 52, fontSize: 18, color: '#0A0E1A', background: '#F0C040' }}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  // ── Stage: Quiet moment ──────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{ background: '#0A1A0A' }}
    >
      <p
        style={{
          fontSize: 20,
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center',
          lineHeight: 1.6,
          marginBottom: 48,
        }}
      >
        Sbu and Siya watched. No words needed.
      </p>

      {showHeadHome && (
        <button
          onClick={onComplete}
          className="w-full rounded-full font-bold"
          style={{
            minHeight: 52,
            fontSize: 18,
            maxWidth: 360,
            color: '#0A0E1A',
            background: '#F0C040',
          }}
        >
          Head home
        </button>
      )}
    </div>
  )
}
