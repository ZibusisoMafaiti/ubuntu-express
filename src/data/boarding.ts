import type { StoryPanelData } from '../types'

// ── Fabric seat data ──────────────────────────────────────────────────────────
// Each seat in the ship interior is covered in a fabric from a different country.
// Colours are representative of each fabric's characteristic palette.

export interface FabricSeat {
  id: string
  name: string
  country: string
  colour: string        // characteristic colour for the seat placeholder
}

export const fabricSeats: FabricSeat[] = [
  { id: 'kuba',      name: 'Kuba cloth', country: 'Congo',        colour: '#7B3D2A' },
  { id: 'shweshwe',  name: 'Shweshwe',   country: 'South Africa', colour: '#1C3A72' },
  { id: 'kente',     name: 'Kente',      country: 'Ghana',        colour: '#B8860B' },
  { id: 'adire',     name: 'Adire',      country: 'Nigeria',      colour: '#1A2050' },
]

// ── Boarding panels ───────────────────────────────────────────────────────────
// Text and narration copied exactly from EPISODE1_SCRIPT.md.
// Panel 3 (index 2) is the fabric interactive. Its audioUrl is empty because
// BoardingScreen plays boarding-03.mp3 manually after all 4 seats are tapped.

export const FABRIC_AUDIO_URL = '/audio/episode-1/boarding-03.mp3'

export const boardingPanels: StoryPanelData[] = [
  // ── Panel 1 ────────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/ubuntu-express-ext.jpg',
    text: 'The Ubuntu Express was unlike anything Siya had ever seen.',
    narration:
      'Walking up the ramp, Siya saw that the Ubuntu Express was unlike anything she had ever seen — the body of a rocket, wings like an aeroplane, wheels like the biggest truck in the world. And on the outside, in big bold letters: UBUNTU EXPRESS.',
    audioUrl: '/audio/episode-1/boarding-01.mp3',
  },

  // ── Panel 2 ────────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/ubuntu-express-int.jpg',
    text: 'Inside, the seats were covered in the most beautiful fabrics.',
    narration:
      'Inside, the seats were covered in the most beautiful fabrics Siya had ever seen — rich patterns in gold and red and indigo and green. Siya ran her hand along the nearest seat. The cloth was smooth and warm.',
    audioUrl: '/audio/episode-1/boarding-02.mp3',
  },

  // ── Panel 3 — FABRIC INTERACTIVE ──────────────────────────────────────────
  // Screen text is shown as the instruction on the interactive screen.
  // Narration text is shown after all 4 seats are tapped.
  // Audio is played manually by BoardingScreen — NOT by StoryPanel.
  {
    background: '/images/episode-1/ubuntu-express-int.jpg',
    text: 'Tap each seat to find out where its cloth comes from.',
    narration:
      '"Kuba cloth from Congo. Shweshwe from South Africa. Kente from Ghana. Adire from Nigeria. Every seat on this ship comes from somewhere on the continent." Siya got the window seat — right in the middle.',
    audioUrl: '', // played manually in BoardingScreen after all seats tapped
  },

  // ── Panel 4 ────────────────────────────────────────────────────────────────
  {
    background: '/images/episode-1/ubuntu-express-int.jpg',
    text: '"Seatbelts on for takeoff," said Mama Ndlovu on the speaker.',
    narration:
      'The seatbelt clicked on by itself. Then Mama Ndlovu\'s voice came over the speaker — deep and calm and certain. She said one word in Ndebele. Then in English: "Hold on. We are going home."',
    speaker: 'Mama Ndlovu',
    audioUrl: '/audio/episode-1/boarding-04.mp3',
  },
]
