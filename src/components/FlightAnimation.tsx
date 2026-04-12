import { useEffect, useState } from 'react'
import StoryPanel from './StoryPanel'
import type { StoryPanelData } from '../types'

// ── Panel data ────────────────────────────────────────────────────────────────
// Panels 1–3 play before the Bulawayo descent; panels 4–13 play after.
// Text and narration copied exactly from EPISODE1_SCRIPT.md.

const PRE_DESCENT: StoryPanelData[] = [
  {
    background: '#0A0E1A',
    text: 'Below them, Calgary disappeared into the dark.',
    narration:
      'Below the ship, the lights of Calgary grew smaller and smaller, until they looked like stars on the ground. Siya pressed her face against the window.',
    audioUrl: '/audio/episode-1/flight-01.mp3',
  },
  {
    background: '#0A0E1A',
    text: '"It is almost midnight here. But Zimbabwe is already waking up."',
    narration:
      '"It is almost midnight here in Calgary," Mama Ndlovu said. "But in Zimbabwe, the sun is already rising. We are flying toward it." Siya watched the clock on the panel change — 11:58 PM, then 1:00, then 4:00 — as if time itself was moving faster than she was.',
    speaker: 'Mama Ndlovu',
    audioUrl: '/audio/episode-1/flight-02.mp3',
  },
  {
    background: '#C1692F',
    text: "The ship began to descend — and a smile spread across Sbu's face.",
    narration:
      "Then the Ubuntu Express began to descend — not toward Zimbabwe in general, but toward a specific place. And Siya looked at her father and saw something she had never quite seen before. A smile that was also something else. Something closer to home.",
    audioUrl: '/audio/episode-1/flight-03.mp3',
  },
]

const POST_DESCENT: StoryPanelData[] = [
  {
    background: '#D4A017',
    text: '"Do you remember this?" Mama Ndlovu asked.',
    narration:
      'The ship landed gently on a dusty soccer field in Entumbane, in the city of Bulawayo. Mama Ndlovu\'s voice came over the speaker: "Do you remember this place, Sibusiso?"',
    speaker: 'Mama Ndlovu',
    audioUrl: '/audio/episode-1/flight-04.mp3',
  },
  {
    background: '#D4A017',
    text: '"How could I forget? This is where it all began."',
    narration:
      'Sbu laughed — a real, full, surprised laugh. "How could I forget? This is where it all began." He looked at Siya. "Sit down. I am going to tell you a story."',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/flight-05.mp3',
  },
  {
    background: '#2D4A22',
    text: '"We were playing soccer — Bheki, Rumbi, Kgomotso, and me."',
    narration:
      '"We were playing soccer right here — uBheki, uRumbi, uKgomotso, and me. I kicked the ball too hard. It went into the bushes. So I ran to get it. And that is when I found her."',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/flight-06.mp3',
  },
  {
    background: '#2D4A22',
    text: 'A bird. Hurt. Lying very still in the long grass.',
    narration:
      'A bird — lying very still in the long grass. A crowned crane with a broken wing. She was hurt and she could not fly and she was alone. I shouted to the others and they all came running.',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/flight-07.mp3',
  },
  {
    background: '#1B3A2E',
    text: 'They bandaged her wing. They brought her their lunch. They came back every day.',
    narration:
      'We found a stick to keep her wing in place and wrapped it the best we could. Every day after school we came back with whatever food we had from our lunch boxes. Bread, mostly. She got stronger. And stronger. And one day, she flew away.',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/flight-08.mp3',
  },
  {
    background: '#1B3A2E',
    text: "They didn't know it then — but that bird was Kesi.",
    narration:
      "What we didn't know — not then — was that this bird was Kesi. And Kesi was not just any bird. She had been sent to Bulawayo by the Ubuntu Express, looking for children with the right qualities. She got hurt in an accident along the way.",
    audioUrl: '/audio/episode-1/flight-09.mp3',
  },
  {
    background: '#2A1A06',
    text: 'A few days later, there was an elephant in the living room.',
    narration:
      'A few days later, I came home to our house in Makokoba and found my mother and father sitting very still in the living room, speaking with an elephant. Mama Ndlovu had come to ask my parents if I could join the Ubuntu Express.',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/flight-10.mp3',
  },
  {
    background: '#0F1E2A',
    text: '"The reason they chose us was kindness."',
    narration:
      '"The reason they chose us," Sbu said quietly, "was not because we were the smartest or the bravest. It was because we had been kind to a bird in its time of need. That is all. Umuntu ngumuntu ngabantu — a person is a person because of other people. That is the Ubuntu way."',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/flight-11.mp3',
  },
  {
    background: '#1B3A2E',
    text: 'At the same time, Baba Kobe and Zuri were visiting the other boys.',
    narration:
      'At the same time I was meeting Mama Ndlovu, Baba Kobe was at Kgomotso\'s house. And Zuri was at Rumbi\'s. All of our parents were scared at first — but Mama Ndlovu has a way of calming anxious people. And they all said yes.',
    audioUrl: '/audio/episode-1/flight-12.mp3',
  },
  {
    background: '#0A0E1A',
    text: 'The Ubuntu Express lifted off and continued toward Zimbabwe.',
    narration:
      'The Ubuntu Express rose up from the soccer field in Entumbane. Siya was quiet. She had a lot to think about. Her dad had always just been her dad. She had not known he was also this.',
    audioUrl: '/audio/episode-1/flight-13.mp3',
  },
]

// ── Descent animation between panels 3 and 4 ─────────────────────────────────
// 2.5-second visual: ship drops toward a Bulawayo cityscape silhouette.
// No interaction needed — auto-advances.

const CLOUD_POSITIONS = [
  { left: '15%', top: '35%', width: 80, delay: '0s' },
  { left: '55%', top: '45%', width: 110, delay: '0.4s' },
  { left: '30%', top: '55%', width: 70, delay: '0.8s' },
  { left: '70%', top: '40%', width: 90, delay: '0.2s' },
]

function BulawawyoDescent() {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0A0E1A 0%, #1A1200 60%, #D4A017 100%)',
      }}
    >
      {/* Clouds rising upward */}
      {CLOUD_POSITIONS.map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: c.left,
            top: c.top,
            width: c.width,
            height: c.width * 0.45,
            background: 'rgba(255,255,255,0.18)',
            animation: `cloudRise 2.5s ease-in ${c.delay} forwards`,
          }}
        />
      ))}

      {/* Ship descending */}
      <div
        className="absolute left-1/2"
        style={{
          top: 0,
          animation: 'shipDescend 2.5s ease-in forwards',
        }}
      >
        <svg width="48" height="22" viewBox="-24 -11 48 22" aria-hidden="true">
          <rect x="-12" y="-5" width="24" height="10" rx="2" fill="#C1692F" />
          <polygon points="-3,-5 -3,-11 7,-5" fill="#D4A017" />
          <polygon points="-3,5 -3,11 7,5" fill="#D4A017" />
          <polygon points="12,-3 20,0 12,3" fill="#F0C040" />
        </svg>
      </div>

      {/* Bulawayo cityscape silhouette */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Buildings of varying heights */}
        <rect x="0"   y="60"  width="35"  height="40" fill="#1A0A02" />
        <rect x="40"  y="30"  width="28"  height="70" fill="#1A0A02" />
        <rect x="72"  y="50"  width="40"  height="50" fill="#1A0A02" />
        <rect x="116" y="20"  width="22"  height="80" fill="#1A0A02" />
        <rect x="142" y="45"  width="50"  height="55" fill="#1A0A02" />
        <rect x="196" y="35"  width="30"  height="65" fill="#1A0A02" />
        <rect x="230" y="55"  width="45"  height="45" fill="#1A0A02" />
        <rect x="280" y="25"  width="25"  height="75" fill="#1A0A02" />
        <rect x="310" y="48"  width="38"  height="52" fill="#1A0A02" />
        <rect x="352" y="38"  width="48"  height="62" fill="#1A0A02" />
        {/* Ground fill */}
        <rect x="0" y="95" width="400" height="5" fill="#1A0A02" />
      </svg>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

type Phase = 'pre-descent' | 'descent' | 'post-descent'

interface Props {
  onComplete: () => void
}

export default function FlightAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('pre-descent')

  useEffect(() => {
    if (phase !== 'descent') return
    const t = setTimeout(() => setPhase('post-descent'), 2500)
    return () => clearTimeout(t)
  }, [phase])

  if (phase === 'pre-descent') {
    return (
      <StoryPanel
        panels={PRE_DESCENT}
        onComplete={() => setPhase('descent')}
      />
    )
  }

  if (phase === 'descent') {
    return <BulawawyoDescent />
  }

  return (
    <StoryPanel
      panels={POST_DESCENT}
      onComplete={onComplete}
    />
  )
}
