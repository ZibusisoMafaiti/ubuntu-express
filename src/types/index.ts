// All screens in the episode
export type Screen =
  | 'landing'
  | 'transition-animation'
  | 'cold-open'
  | 'boarding'
  | 'flight'
  | 'zimbabwe-map'
  | 'language-stop'
  | 'stem-challenge'
  | 'maker-activity'
  | 'delivery'
  | 'return-flight'
  | 'fact-card'

// A single illustrated panel in a story sequence
export interface StoryPanelData {
  background: string    // hex colour (placeholder) or image URL
  text: string          // SCREEN TEXT — one sentence, shown in large text
  narration: string     // NARRATION — richer version, read by audio
  speaker?: string      // optional label e.g. "Mama Ndlovu" or "Sbu"
  audioUrl?: string     // path to MP3 e.g. '/audio/episode-1/cold-open-01.mp3'
                        // empty string "" when file not yet recorded
                        // component must handle this silently — no errors
}

// A language stop on the Zimbabwe episode map
export interface LanguageStop {
  id: string
  name: string
  region: string
  language: string
  hello: string
  helloMeaning: string
  helloPronunciation: string
  thanks: string
  thanksMeaning: string
  thanksPronunciation: string
  backgroundColour: string
  pinColour: string
  localChild: {
    name: string
    initials: string
    idea: string
    avatarColour: string
    portraitUrl?: string
  }
  animalWisdom: {
    animal: string
    text: string
  }
  addressesCamouflage: boolean
  addressesAnchoring: boolean
  specialMoment?: string  // optional extra story beat (Matobo + Great Zimbabwe)
}

// Global app state — all lives in App.tsx
export interface AppState {
  screen: Screen
  completedStops: string[]    // IDs of completed language stops
  collectedIdeas: string[]    // stop IDs whose ideas have been collected
  photoUrl: string | null     // child's submitted photo URL (local, not uploaded)
  currentStop: LanguageStop | null
}
