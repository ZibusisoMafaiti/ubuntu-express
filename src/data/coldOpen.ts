import type { StoryPanelData } from '../types'

// 13 panels for the cold open — Calgary, Siya's house, night.
// Text and narration are copied exactly from EPISODE1_SCRIPT.md.
// audioUrl paths use /audio/... (Vite serves public/ at the root).
// Empty string "" means file not yet recorded — StoryPanel handles this silently.

export const coldOpenPanels: StoryPanelData[] = [
  // ── Panel 1 ──────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-01.jpg',
    text: 'Siya could hear voices downstairs.',
    narration:
      'It was late at night in Calgary, and Siya could hear voices coming from downstairs — quiet, serious voices that definitely did not belong to the television.',
    audioUrl: '/audio/episode-1/cold-open-01.mp3',
  },

  // ── Panel 2 ──────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-02.jpg',
    text: 'She tiptoed down — but the stairs were an obstacle course.',
    narration:
      "She tiptoed down the steps as carefully as she could — which was quite the obstacle course, because she had to step over the toys, the paint, and the paper she hadn't cleaned up after yesterday.",
    audioUrl: '/audio/episode-1/cold-open-02.mp3',
  },

  // ── Panel 3 ──────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-03.jpg',
    text: 'She crept behind the door to listen.',
    narration:
      'She hopped over her final obstacle — a very flat tube of purple paint — and crept up behind the door. Since it was partly open, she could just make out the words.',
    audioUrl: '/audio/episode-1/cold-open-03.mp3',
  },

  // ── Panel 4 — THE PANGOLIN CRISIS ────────────────────────────────────────
  // First time the child hears the word "pangolin". Do not move this panel.
  {
    background: '/images/episode-1/cold-open-04.jpg',
    text: '"The pangolins are in danger," said a deep, warm voice. "Poachers are hunting them."',
    narration:
      '"The pangolins are in danger," a deep, warm voice said through the door. "Poachers are hunting them for their scales. They are the most hunted animal in the whole world, Sibusiso. There are very few of them left. They need a safe place to hide — and they need it now."',
    speaker: 'Mama Ndlovu',
    audioUrl: '/audio/episode-1/cold-open-04.mp3',
  },

  // ── Panel 5 ──────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-05.jpg',
    text: '"I can\'t help without my team," her dad said.',
    narration:
      '"Ngiyaxolisa Mama Ndlovu," she heard her dad say, "but I can\'t help without my team. uBheki is in Prague, uRumbi is in Tokyo, and Kgomotso is in New York. I can\'t do it by myself — I need my team."',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/cold-open-05.mp3',
  },

  // ── Panel 6 ──────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-06.jpg',
    text: '"But who will help the pangolins?" said Mama Ndlovu.',
    narration:
      'The deep voice answered — slow and serious. "Aye manje. Who is going to help the pangolins?" There was a long pause. Siya leaned in a little closer to hear what came next.',
    speaker: 'Mama Ndlovu',
    audioUrl: '/audio/episode-1/cold-open-06.mp3',
  },

  // ── Panel 7 ──────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-07.jpg',
    text: 'Siya leaned in too close — and fell right through the door!',
    narration:
      "She leaned in just a little too close — and the door swung wide open. She fell face-first onto the floor right in front of her dad's feet.",
    audioUrl: '/audio/episode-1/cold-open-07.mp3',
  },

  // ── Panel 8 ──────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-08.jpg',
    text: '"Siya! I thought you were sleeping!"',
    narration:
      'Her dad looked down at her. "Siya — I thought you were still sleeping. What are you doing awake?" Siya slowly stood up, dusting off her pyjamas, with a very shy look on her face.',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/cold-open-08.mp3',
  },

  // ── Panel 9 ──────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-09.jpg',
    text: '"I might as well introduce you to my friends," he smiled.',
    narration:
      'Her dad smiled and put his arm around her. "I might as well introduce you to my friends," he said. And Siya looked up — and saw them for the first time.',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/cold-open-09.mp3',
  },

  // ── Panel 10 — THE CREW REVEAL ───────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-10.jpg',
    text: '"Sawubona, maDlamini!" they all said together.',
    narration:
      '"This is Mama Ndlovu — she is the captain. Kesi. Jabari. Zuri. Baba Kobe. And Lulu." They all turned to look at Siya. And then, all at once, they said — "Sawubona, maDlamini!"',
    speaker: 'The crew',
    audioUrl: '/audio/episode-1/cold-open-10.mp3',
  },

  // ── Panel 11 ─────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-11.jpg',
    text: 'Siya froze. How did they know her name?',
    narration:
      "Siya froze. She had seen the extraordinary ship from her window. But she hadn't known there were talking animals inside it. And how did they know to call her maDlamini? Only her dad called her that.",
    audioUrl: '/audio/episode-1/cold-open-11.mp3',
  },

  // ── Panel 12 ─────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/cold-open-12.jpg',
    text: '"You have questions. I know. You always do."',
    narration:
      'Her dad squeezed her shoulder gently. "You have questions," he said. "I know you do — you always do. And I am here to answer them when I can." He looked at Mama Ndlovu. And then he smiled his biggest smile.',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/cold-open-12.mp3',
  },

  // ── Panel 13 — THE INVITATION ────────────────────────────────────────────
  // Last panel. StoryPanel shows "Board the Ubuntu Express" button here.
  {
    background: '/images/episode-1/cold-open-13.jpg',
    text: '"Let\'s go save the pangolins. We have a new team — Siya and Dlamini."',
    narration:
      '"You know what, Mama Ndlovu — let\'s go save the pangolins. We have a new team." He looked down at Siya. "Siya and Dlamini."',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/cold-open-13.mp3',
  },
]
