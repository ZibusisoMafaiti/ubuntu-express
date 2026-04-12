import { useRef, useState } from 'react'

interface Props {
  onPhotoSubmit: (photoUrl: string) => void
}

const CHECKLIST = [
  'Entrance is small and hard to reach',
  'Structure cannot be easily lifted',
  'Colours blend into the surroundings',
]

export default function PhotoCapture({ onPhotoSubmit }: Props) {
  const [checked, setChecked] = useState([false, false, false])
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function toggleCheck(i: number) {
    setChecked(prev => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotoUrl(url)
  }

  function handleSubmit() {
    if (!photoUrl) return
    onPhotoSubmit(photoUrl)
  }

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-y-auto"
      style={{ background: '#F5E8D0' }}
    >
      <div className="px-5 pt-10 pb-8">
        {/* Grown-up banner */}
        <div
          className="rounded-2xl p-4 mb-6 text-center"
          style={{ background: '#FAEEDA', border: '2px solid #D4A017' }}
        >
          <p style={{ fontSize: 20, fontWeight: 700, color: '#412402' }}>
            Do this with a grown-up!
          </p>
          <p style={{ fontSize: 15, color: '#5A3010', marginTop: 4 }}>
            Build your hideout together, then take a photo.
          </p>
        </div>

        {/* Checklist */}
        <p style={{ fontSize: 16, fontWeight: 600, color: '#2A1A06', marginBottom: 12 }}>
          Before you take the photo, check:
        </p>
        <div className="flex flex-col gap-3 mb-8">
          {CHECKLIST.map((item, i) => (
            <button
              key={i}
              onClick={() => toggleCheck(i)}
              className="flex items-center gap-3 rounded-2xl px-4 text-left"
              style={{
                minHeight: 56,
                background: checked[i] ? 'rgba(59,109,17,0.15)' : 'white',
                border: checked[i] ? '2px solid #3B6D11' : '2px solid rgba(42,26,6,0.15)',
                transition: 'all 200ms ease',
              }}
            >
              <div
                className="rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  background: checked[i] ? '#3B6D11' : 'transparent',
                  border: checked[i] ? 'none' : '2px solid rgba(42,26,6,0.3)',
                }}
              >
                {checked[i] && (
                  <span style={{ color: 'white', fontSize: 16, lineHeight: 1 }}>✓</span>
                )}
              </div>
              <p style={{ fontSize: 16, color: '#2A1A06', lineHeight: 1.4 }}>{item}</p>
            </button>
          ))}
        </div>

        {/* Photo capture */}
        <p style={{ fontSize: 16, fontWeight: 600, color: '#2A1A06', marginBottom: 12 }}>
          Take a photo of your hideout:
        </p>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Photo preview or camera button */}
        {photoUrl ? (
          <div className="mb-4">
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{ height: 220, background: '#DDD' }}
            >
              <img
                src={photoUrl}
                alt="Your hideout"
                className="w-full h-full"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <button
              onClick={() => inputRef.current?.click()}
              className="w-full mt-2 rounded-full"
              style={{
                minHeight: 44,
                fontSize: 15,
                color: '#412402',
                background: 'rgba(42,26,6,0.1)',
                border: '1px solid rgba(42,26,6,0.2)',
              }}
            >
              Retake photo
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full rounded-2xl mb-4 flex flex-col items-center justify-center gap-2"
            style={{
              minHeight: 140,
              background: 'white',
              border: '2px dashed rgba(42,26,6,0.3)',
              fontSize: 16,
              color: '#412402',
            }}
          >
            <span style={{ fontSize: 40 }}>📷</span>
            <span>Tap to take a photo</span>
          </button>
        )}

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={!photoUrl}
          className="w-full rounded-full font-bold"
          style={{
            minHeight: 52,
            fontSize: 18,
            color: photoUrl ? '#0A0E1A' : '#999',
            background: photoUrl ? '#F0C040' : '#DDD',
            transition: 'all 300ms ease',
          }}
        >
          Send to Tonde + Nothando
        </button>
      </div>
    </div>
  )
}
