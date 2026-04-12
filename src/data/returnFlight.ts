import type { StoryPanelData } from '../types'

// 4 return flight panels + 2 landing home panels.
// All text and narration copied exactly from EPISODE1_SCRIPT.md.
// Used together in a single StoryPanel instance in App.tsx.

export const returnFlightPanels: StoryPanelData[] = [
  // ── Return flight ─────────────────────────────────────────────────────────
  {
    background: '#0A0E1A',
    text: 'On the way home, Siya was quiet. She had a lot to think about.',
    narration:
      'On the flight back to Calgary, Siya was mostly quiet. The biggest thing she kept thinking about was the simplest: her dad and his friends had just been kind to a bird. That was all. And look what had come from it.',
    audioUrl: '/audio/episode-1/return-01.mp3',
  },
  {
    background: '#0A0E1A',
    text: '"Baba — does Mama know about all of this?"',
    narration:
      '"Baba," Siya said quietly. "Does Mama know?" Her dad\'s face broke into the biggest smile. "There are no secrets between your mum and me. She knows everything. She has met the whole team. She loves the stories."',
    speaker: 'Siya',
    audioUrl: '/audio/episode-1/return-02.mp3',
  },
  {
    background: '#0A0E1A',
    text: '"Your mum has the greatest solutions," said Sbu. "Never forget that."',
    narration:
      '"Your mum has the greatest solutions," Sbu said. "If you ever get stuck — if you ever run out of ideas — call your mum. Who knows the many tight spots she has saved me from over the years." He shook his head, smiling.',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/return-03.mp3',
  },
  {
    background: '#0A0E1A',
    text: '"The Ubuntu Express has been waiting for you your whole life, maDlamini."',
    narration:
      'Siya looked out the window. Calgary was appearing below — the lights coming back, the snow on the rooftops. Her dad leaned close and said quietly: "The Ubuntu Express has been waiting for you your whole life, maDlamini."',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/return-04.mp3',
  },

  // ── Landing home ──────────────────────────────────────────────────────────
  {
    background: '#0A1428',
    text: 'They watched the Ubuntu Express disappear into the sky.',
    narration:
      'They stood on the porch together and watched the Ubuntu Express rise through the dark sky until it was gone. And the strange thing was: it still looked like the same time they had left. The same stars. The same cold Calgary air. As if the whole adventure had happened in the space between one breath and the next.',
    audioUrl: '/audio/episode-1/landing-01.mp3',
  },
  {
    background: '#0A1428',
    text: '"That\'s a question for another day. Now — beauty sleep."',
    narration:
      '"How is that possible?" Siya asked, looking at the unchanged sky. "That is a question," her dad said, "for another day." He opened the front door. "Right now, maDlamini — you have some beauty sleep to catch up on." Siya went inside. But she was smiling.',
    speaker: 'Sbu',
    audioUrl: '/audio/episode-1/landing-02.mp3',
  },
]
