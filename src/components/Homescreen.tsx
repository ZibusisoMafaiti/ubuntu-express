interface HomeScreenProps {
  onBegin: () => void
}

export default function HomeScreen({ onBegin }: HomeScreenProps) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#1A0F2E',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      overflow: 'hidden',
      fontFamily: "'Lora', Georgia, serif",
    }}>

      {/* ── STARFIELD ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(1.5px 1.5px at 18% 10%, rgba(255,220,150,0.9) 0%, transparent 100%),
          radial-gradient(1px   1px   at 55%  6%, rgba(255,220,150,0.7) 0%, transparent 100%),
          radial-gradient(2px   2px   at 78% 16%, rgba(255,220,150,0.8) 0%, transparent 100%),
          radial-gradient(1px   1px   at 38%  4%, rgba(255,220,150,0.6) 0%, transparent 100%),
          radial-gradient(1px   1px   at  8% 26%, rgba(255,220,150,0.5) 0%, transparent 100%),
          radial-gradient(1px   1px   at 88%  9%, rgba(255,220,150,0.7) 0%, transparent 100%),
          radial-gradient(1px   1px   at 65% 21%, rgba(255,220,150,0.4) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 30% 33%, rgba(255,220,150,0.3) 0%, transparent 100%),
          radial-gradient(1px   1px   at 50% 14%, rgba(255,220,150,0.5) 0%, transparent 100%),
          radial-gradient(1px   1px   at 92% 35%, rgba(255,220,150,0.4) 0%, transparent 100%)
        `,
        pointerEvents: 'none',
      }} />

      {/* ── MOON ── */}
      <div style={{
        position: 'absolute',
        top: '10%', right: '16%',
        width: 52, height: 52,
        borderRadius: '50%',
        background: '#F5DFA0',
        boxShadow: '0 0 28px rgba(245,223,160,0.5), 0 0 70px rgba(245,223,160,0.15)',
      }} />

      {/* ── HORIZON ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '58%',
        background: 'linear-gradient(180deg, #7B2D1E 0%, #3D1A0A 55%, #1A0A04 100%)',
      }} />

      {/* ── ACACIA LEFT ── */}
      <svg style={{ position: 'absolute', bottom: '23%', left: '4%', width: 72, height: 90 }}
        viewBox="0 0 72 90" fill="none">
        <rect x="32" y="46" width="10" height="44" fill="#2C1810"/>
        <ellipse cx="36" cy="42" rx="34" ry="16" fill="#1A3A2A"/>
        <ellipse cx="18" cy="30" rx="20" ry="11" fill="#1F4A30"/>
        <ellipse cx="54" cy="32" rx="20" ry="11" fill="#1F4A30"/>
      </svg>

      {/* ── ACACIA RIGHT ── */}
      <svg style={{ position: 'absolute', bottom: '22%', right: '2%', width: 56, height: 74 }}
        viewBox="0 0 56 74" fill="none">
        <rect x="25" y="38" width="7" height="36" fill="#2C1810"/>
        <ellipse cx="28" cy="34" rx="26" ry="13" fill="#1A3A2A"/>
        <ellipse cx="13" cy="24" rx="15" ry="8"  fill="#1F4A30"/>
        <ellipse cx="43" cy="26" rx="15" ry="8"  fill="#1F4A30"/>
      </svg>

      {/* ── CONTENT ── */}
      <div style={{
        position: 'relative',
        textAlign: 'center',
        padding: '0 32px',
        marginBottom: '18%',
        zIndex: 1,
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', 'Georgia', serif",
          fontSize: 'clamp(24px, 6vw, 32px)',
          fontWeight: 600,
          color: '#F5DFA0',
          lineHeight: 1.2,
          marginBottom: 8,
          letterSpacing: '-0.3px',
        }}>
          The Ubuntu Express
        </h1>
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: 13,
          fontStyle: 'italic',
          color: 'rgba(245,223,160,0.55)',
          marginBottom: 32,
          letterSpacing: '0.5px',
        }}>
          a story by Zibusiso
        </p>
        <button
          onClick={onBegin}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: '#C4552A',
            color: '#fff',
            fontFamily: "'Lora', serif",
            fontSize: 15,
            padding: '13px 30px',
            borderRadius: 30,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.3px',
          }}
        >
          <span style={{
            width: 0, height: 0,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '10px solid white',
            display: 'inline-block',
          }} />
          Begin the story
        </button>
      </div>

      {/* ── CHAPTER LABEL ── */}
      <div style={{
        position: 'absolute',
        bottom: 24, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: "'Lora', serif",
        fontSize: 9,
        color: 'rgba(245,223,160,0.28)',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
      }}>
        Chapter one &nbsp;·&nbsp; A secret
      </div>

      {/* ── FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Lora:ital,wght@0,400;1,400&display=swap');
      `}</style>
    </div>
  )
}
