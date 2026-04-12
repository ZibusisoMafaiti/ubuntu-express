# Ubuntu Express — Progress & Build Instructions for Claude Code

> Read this entire file before writing a single line of code.
> This project has an existing codebase. Understand it before adding to it.
> The actual story text for every panel lives in EPISODE1_SCRIPT.md.
> Read both files before you begin.

---

## Who This Is For

React + TypeScript educational adventure web app by Zibusiso Mafaiti.

Two purposes:
1. A personal project — a learning app for his 5-year-old daughter
2. A portfolio project for a Master's programme application

Because of purpose 2, every component you build must be accompanied by
learning documentation. See the LEARNING DOCUMENTATION section at the
end of this file. The developer must be able to explain every part of
this codebase confidently to a professor.

---

## What Has Already Been Built (Sessions 1 and 2)

Built manually in VSCode — not with Claude Code.

Session 1 delivered:
- React + TypeScript project scaffolded with Create React App
- Vercel deployment live at https://ubuntu-express.vercel.app/
- Basic page shell structure
- Git repo at https://github.com/ZibusisoMafaiti/ubuntu-express

Session 2 delivered:
- Landing page with hero section, tagline, CTA button
- Africa SVG map with Zimbabwe highlighted, other countries locked/dimmed
- Basic colour palette applied

Your first action: read the existing codebase before writing anything.

```bash
find src -type f | sort
cat src/App.tsx
cat src/index.tsx
```

Read every component file. Understand the routing approach, naming
conventions, TypeScript strictness, and Tailwind patterns already in use.
Document what you find in LEARNING.md before building anything.

---

## Session 3 — All 17 Tasks Complete ✓

Built with Claude Code. Final build: 0 TypeScript errors, 309 kB JS (95 kB gzipped).

All source files in place. App runs end-to-end through the full episode flow.
Audio plays silently when MP3 files are absent — no errors, no warnings.

Changes from spec:
- `'transition-animation'` added to the Screen union type (not in original spec).
  Needed as a distinct screen state between landing map and cold open.
- Component named `LanguageStopScreen` (not `LanguageStop`) to avoid name
  collision when importing alongside the `LanguageStop` TypeScript type in App.tsx.
- React Router v7 removed entirely. BrowserRouter replaced with useState<Screen>
  routing in App.tsx. Map.tsx updated to use onCountryTap prop instead of useNavigate.
- Howler.js was not in the original package.json despite being listed as "in the
  tech stack". Installed as part of Task 4: `npm install howler @types/howler`.

What still needs the developer's action before going live:
1. Record narration audio → clone voice via ElevenLabs → drop MP3s into
   public/audio/episode-1/ (app handles missing files silently)
2. Test on physical device at 375px, 390px, 360px viewports
3. Push to GitHub → Vercel auto-deploys

---

## The Application

Name: The Ubuntu Express
Primary user: 5-year-old child (the developer's daughter)
Target age range: 5-9
Live URL: https://ubuntu-express.vercel.app/

Core loop:
Child opens app → taps a country → watches illustrated story panels
(parent reads aloud) → learns a local language greeting → taps it to
unlock a local child → collects a hideout idea → repeats for 4 stops →
combines ideas → builds a physical model at home with a parent → takes
a photo → sees it delivered to the pangolins in the closing scene.

Episode 1 country: Zimbabwe
Episode 1 mission: Design a pangolin hideout using ideas collected from
children across Zimbabwe. Save two pangolins from poachers.

Two pangolins:
- Tonde — Gonarezhou National Park, southeast Zimbabwe
- Nothando — Hwange National Park, northwest Zimbabwe (has a young one)
Both receive the child's design in the closing delivery scene.

---

## Critical Design Rules for Age 5

These apply to every screen, every component, every decision.

1. Audio is the primary delivery mechanism, not text.
   A 5-year-old cannot reliably read independently. Text on screen is a
   subtitle. The story is heard, not read. Every panel has a narration
   field for the audio. See Audio Architecture section below.

2. One sentence maximum per screen panel.

3. Single-tap interactions only. No drag, no multi-step gestures.

4. Minimum tap target: 44px height on every interactive element.

5. Minimum font size: 18px story text, 22px for language words being taught.

6. Target session: 12 minutes screen time per session.
   The episode splits naturally: Part 1 ends at the Zimbabwe map.
   Part 2 begins when the child returns after the physical build.

7. The maker activity is designed to require adult help. This is a feature.
   Display "Do this with a grown-up!" prominently on the maker screen.

---

## Two Maps — Important Distinction

There are two maps in this app. They serve completely different purposes.

LANDING PAGE MAP — the Africa continent map already built in Session 2.
Shows all 54 countries. Most are locked/dimmed. Zimbabwe glows.
Tapping Zimbabwe triggers the Transition Animation, then Episode 1 begins.

ZIMBABWE EPISODE MAP — inside Episode 1, after the flight sequence.
Shows Zimbabwe specifically with 4 tappable language stop pins and
2 locked pangolin location pins (Tonde and Nothando).
Child chooses which language stop to visit first.

---

## Two Flight Sequences — Important Distinction

There are two flight sequences. They serve completely different purposes.

TRANSITION ANIMATION — plays immediately when Zimbabwe is tapped on the
landing page map. 10-15 seconds. No dialogue. Only mbira music.
Shows the Ubuntu Express lifting from Calgary and landing in Zimbabwe.
Pure visual excitement. Acts as a decompression ritual between the map
and the story. Leads directly into the cold open panels.

STORY FLIGHT (Part 3 of episode) — a full narrative sequence with panels
that plays after boarding. Contains the time zone lesson and Sbu's
Bulawayo origin story (the Kesi narrative). This is not a transition.
This is 13 panels of emotional story content.

---

## Episode 1 Story Summary

Full panel-by-panel story text is in EPISODE1_SCRIPT.md.
Use that file for all panel text, narration text, and audio file paths.
Do not write your own story content — use the script exactly.

Story beats in order:
1. Transition animation (landing map → episode)
2. Cold open — 13 panels — Siya hears Mama Ndlovu explain the pangolin
   crisis, overhears Sbu say he cannot help alone, falls through the door,
   meets the crew, is invited on the mission
3. Boarding — 4 panels + fabric interactive
4. Story flight — 13 panels — time zones, Bulawayo landing, Sbu's origin
   story about finding Kesi injured, the reason they were chosen (kindness),
   ship rises and continues to Zimbabwe
5. Zimbabwe episode map — child chooses which of 4 stops to visit first
6. Four language stops — Tonga, Kalanga, Ndebele, Shona
7. STEM challenge — unlocked after all 4 stops
8. Maker activity — physical build off-screen with parent
9. Photo capture and submission
10. Delivery notification + closing scene — both pangolins safe
11. Return flight — 4 panels, Sbu's final line
12. Landing home — 2 panels, the porch, the close
13. Fact card + journal stamp

The pangolin crisis is established in Panel 4 of the cold open —
Mama Ndlovu says through the door: "The pangolins are in danger.
Poachers are hunting them for their scales. They are the most hunted
animal in the whole world." This is the first time the child hears the
word pangolin. Do not put any pangolin explanation before this panel.

---

## Build Tasks (In Priority Order)

Work through these in order. Each task has a clear done state.
A task is done when: it builds without TypeScript errors, works at
375px width, all tap targets are 44px minimum, and LEARNING.md
has been updated with the documentation for that component.

---

### TASK 1 — Read the existing codebase ✓ DONE

Run:
```bash
find src -type f | sort
cat src/App.tsx
cat src/index.tsx
```

Read every file. Note: what routing approach is used, what components
exist, what naming conventions are followed, what state management
pattern is in use. Document findings in LEARNING.md before writing
any new code.

---

### TASK 2 — TypeScript interfaces ✓ DONE

File: src/types/index.ts

```typescript
// All screens in the episode
type Screen =
  | 'landing'
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
interface StoryPanelData {
  background: string      // hex colour (placeholder) or image URL
  text: string            // SCREEN TEXT — one sentence, shown in large text
  narration: string       // NARRATION — richer version, read by audio
  speaker?: string        // optional label e.g. "Mama Ndlovu:" or "Sbu:"
  audioUrl?: string       // path to MP3 e.g. '/audio/episode-1/cold-open-01.mp3'
                          // empty string "" when file not yet recorded
                          // component must handle this silently — no errors
}

// A language stop on the Zimbabwe episode map
interface LanguageStop {
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
interface AppState {
  screen: Screen
  completedStops: string[]    // IDs of completed language stops
  collectedIdeas: string[]    // stop IDs whose ideas have been collected
  photoUrl: string | null     // child's submitted photo URL (local, not uploaded)
  currentStop: LanguageStop | null
}
```

---

### TASK 3 — Transition Animation Component ✓ DONE

File: src/components/TransitionAnimation.tsx

This is NOT the story flight. This is the 10-15 second visual that plays
when Zimbabwe is tapped on the landing page Africa map.

Requirements:
- Dark background #0A0E1A
- SVG animated arc from a "Calgary" dot to a "Zimbabwe" dot
- Arc draws itself over 5 seconds using stroke-dashoffset animation
- A simplified Ubuntu Express shape (rectangle with wings) moves along the arc
- Clock on the ship changes from 11:58 PM → 7:14 AM as it travels
- No dialogue. No text panels. Only visual animation.
- Mbira audio file plays on mount: '/audio/episode-1/transition.mp3'
  Handle missing file silently.
- After animation completes (5-6 seconds), calls onComplete automatically
- No button needed — it transitions automatically
- Keep simple. This is a mood-setter, not a technical showcase.

---

### TASK 4 — Story Panel Viewer Component ✓ DONE

File: src/components/StoryPanel.tsx

This component is reused in three places:
- Cold open (13 panels)
- Story flight (13 panels)
- Return flight (4 panels)

Props: panels: StoryPanelData[], onComplete: () => void

Requirements:

DISPLAY:
- One panel at a time, full screen (100vw x 100vh)
- Background fills the screen (colour or image, object-fit: cover)
- Dark semi-transparent overlay at bottom 35% of screen
- Text inside overlay: white, 18px minimum, line-height 1.5
- Speaker label (if present): 13px, muted white, above main text
- Progress dots: small row at very bottom, one per panel

INTERACTION:
- Tap or click anywhere on the screen to advance
- The entire screen is the tap target — not just a button
- CSS opacity fade 400ms between panels
- Last panel tap calls onComplete()

AUDIO:
```typescript
useEffect(() => {
  if (!panel.audioUrl) return
  const sound = new Howl({ src: [panel.audioUrl] })
  sound.play()
  return () => { sound.stop(); sound.unload() }
}, [currentIndex])
```
If panel.audioUrl is empty string or undefined: no sound, no error.

PARENT READING BUTTON:
A small book icon in the bottom-right corner of every panel.
When tapped: a dark overlay slides up from the bottom showing the
panel's narration text in large readable text (20px, high contrast).
A close button (×) dismisses the overlay.
The child does not need to interact with this.
It exists so a parent can read the full narration text alongside the
short screen text, before audio files are recorded.
The overlay does not advance the panel — the parent must dismiss it
first, then tap the main screen to continue.

---

### TASK 5 — Cold Open Content ✓ DONE

File: src/data/coldOpen.ts

Read EPISODE1_SCRIPT.md for the exact text of all 13 panels.
Use SCREEN TEXT → text field.
Use NARRATION → narration field.
Use AUDIO FILE path → audioUrl field.
Use SPEAKER LABEL → speaker field (omit if not present).

The 13 panels cover: Siya hearing voices, the pangolin crisis
explained by Mama Ndlovu, Sbu saying he can't help alone, Siya
falling through the door, the crew introduction, the greetings, and
the invitation. Panel 4 is the pangolin crisis panel — do not move it.

After the last panel: show a full-width button "Board the Ubuntu Express"
that calls onComplete.

---

### TASK 6 — Boarding Content and Screen ✓ DONE

File: src/data/boarding.ts and src/components/BoardingScreen.tsx

Read EPISODE1_SCRIPT.md for the 4 boarding panels.

Panel 3 is the fabric interactive. After panels 1-2, show an
illustrated ship interior with 4 tappable seat areas. Each seat
reveals: fabric name + country of origin when tapped.
Kuba cloth (Congo), Shweshwe (South Africa), Kente (Ghana), Adire (Nigeria).
After all 4 are tapped, panels 3-4 play and the "Buckle up" button appears.

---

### TASK 7 — Flight Animation Component ✓ DONE

File: src/components/FlightAnimation.tsx

This is NOT the Transition Animation from Task 3.
This is the narrative story flight: 13 panels using the StoryPanel
component, covering the time zone explanation and Sbu's Bulawayo origin
story (the Kesi narrative, the kindness qualification, Mama Ndlovu
coming to Sbu's house in Makokoba).

Read EPISODE1_SCRIPT.md for the exact 13 panel texts.

One addition: between panel 3 and 4, briefly show a simple animated
descent — the ship dropping through clouds toward an illustrated
Bulawayo cityscape. 2-3 seconds. Then panel 4 loads automatically.
This makes the Bulawayo landing feel real before Sbu starts talking.

---

### TASK 8 — Zimbabwe Episode Map Component ✓ DONE

File: src/components/ZimbabweMap.tsx

Requirements:
- Reuse Zimbabwe SVG shape from Session 2 if it exists
- Warm earth tones, illustrated/journal-page aesthetic
- 4 tappable language stop pins, colour-coded:
    Victoria Falls: #D85A30 (coral)
    Khami Ruins: #BA7517 (amber)
    Matobo Hills: #534AB7 (purple)
    Great Zimbabwe: #1D9E75 (teal)
- 2 locked grey pins for Tonde (Gonarezhou) and Nothando (Hwange)
  Each locked pin shows a small pangolin silhouette icon
- All pins: minimum 44x44px tap target (visual can be smaller)
- Progress counter: "X of 4 stops visited"
- Progress bar fills as stops complete
- Completed pins: turn green with a checkmark
- Task Card button: locked and grey until all 4 stops done
  When all done: gold colour, one slow pulse animation to draw attention
- One orientation line before child taps (from EPISODE1_SCRIPT.md:
  the map-intro narration)
- Props: completedStops: string[], onSelectStop: (stop: LanguageStop) => void,
  onOpenChallenge: () => void

---

### TASK 9 — Language Stop Component ✓ DONE

File: src/components/LanguageStop.tsx

Manages the 5-phase interactive flow for all 4 language stops.
Uses one component with different data passed as props.

Props: stop: LanguageStop, onComplete: () => void

Phase state: useState<Phase>('coaching')
Phase type: 'coaching' | 'hello-unlock' | 'interaction' |
           'thanks-unlock' | 'complete'

Phase 1 — coaching:
- Kesi label at top
- The language name shown as a pill badge
- Large hello word displayed (22px minimum)
- Phonetic guide below (14px, muted)
- Both words shown side by side: hello (highlighted) and thanks (greyed)
- Button: "I've got it — land!" → sets phase to 'hello-unlock'

Phase 2 — hello unlock:
- Illustrated placeholder background (stop.backgroundColour)
- "[child name] is waiting" text
- "Say hello in [language] to meet them"
- Large button showing the hello word — tapping advances to interaction
- On tap: brief green flash (200ms background flash), then phase change

Phase 3 — interaction:
- Local child avatar (circle with initials, stop.localChild.avatarColour)
- Speech bubble with the child's idea (from EPISODE1_SCRIPT.md)
- Animal wisdom card below (2px left border, smaller text)
- If stop has specialMoment: show it as a quiet secondary text block
  between the wisdom card and the thank you button (no fanfare, small)
- Button: "Say thank you to [child name]" → sets phase to 'thanks-unlock'

Phase 4 — thanks unlock:
- Large thanks word displayed (22px minimum)
- Phonetic guide below
- Button showing thanks word → sets phase to 'complete'

Phase 5 — complete:
- Green success background tint
- "[Stop name] — complete!"
- "You learned: [hello] and [thanks]"
- "[Child name]'s idea is saved to your collection."
- Button: "Back to map" → calls onComplete

---

### TASK 10 — Language Stop Data ✓ DONE

File: src/data/languageStops.ts

Four LanguageStop objects. Full content comes from EPISODE1_SCRIPT.md.

Key fields for each stop:

Victoria Falls:
id: 'victoria-falls', language: 'Tonga', pinColour: '#D85A30'
hello: 'Mwasweni', helloPronunciation: 'mwah-SWAY-nee'
thanks: 'Ndalumba', thanksPronunciation: 'n-dah-LOOM-bah'
localChild: Sitwala, initials 'Si', avatarColour: '#E1F5EE'
addressesCamouflage: true, addressesAnchoring: false

Khami Ruins:
id: 'khami-ruins', language: 'Kalanga', pinColour: '#BA7517'
hello: 'Dumilani', helloPronunciation: 'doo-mee-LAH-nee'
thanks: 'Ndatenda', thanksPronunciation: 'n-dah-TEN-dah'
localChild: Thandiwe, initials 'Th', avatarColour: '#FAEEDA'
addressesCamouflage: false, addressesAnchoring: true

Matobo Hills:
id: 'matobo-hills', language: 'Ndebele', pinColour: '#534AB7'
hello: 'Sawubona', helloPronunciation: 'sah-woo-BOH-nah'
thanks: 'Ngiyabonga', thanksPronunciation: 'n-gee-yah-BON-gah'
localChild: Nokukhanya, initials 'No', avatarColour: '#EEEDFE'
specialMoment: the totem beat — Nokukhanya tells Siya her clan totem
is indlovu (elephant). Mama Ndlovu says nothing but her eyes are warm.
(Full text in EPISODE1_SCRIPT.md)
addressesCamouflage: true, addressesAnchoring: true

Great Zimbabwe:
id: 'great-zimbabwe', language: 'Shona (Karanga)', pinColour: '#1D9E75'
hello: 'Mhoro', helloPronunciation: 'm-HOH-roh'
thanks: 'Ndatenda', thanksPronunciation: 'n-dah-TEN-dah'
localChild: Chiedza, initials 'Ch', avatarColour: '#E1F5EE'
specialMoment: quiet beat where Siya notices Shona feels different
from Ndebele — her home language. One line. (Full text in script.)
addressesCamouflage: true, addressesAnchoring: false

---

### TASK 11 — STEM Challenge Component ✓ DONE

File: src/components/StemChallenge.tsx

Props: collectedIdeas: string[], onComplete: () => void

Display Tonde introduction first (text from EPISODE1_SCRIPT.md).
Then show 4 idea cards — one per completed language stop.

Each card: tappable to select/deselect. Shows child's name and idea text.
Selected state: green border and background tint.

3 constraint indicators at top row:
- Camouflage
- Anchoring
- Local materials (always green once any idea selected)

Constraint logic:
- Camouflage satisfied when: victoria-falls OR matobo-hills OR great-zimbabwe selected
- Anchoring satisfied when: khami-ruins OR matobo-hills selected
- Local materials satisfied when: any idea selected

All 3 green → "Build it at home" button unlocks
Until then → button is grey and disabled

3 hint buttons (tap to reveal/collapse):
Hint 1: pangolin diet (termites near food source)
Hint 2: pangolin movement (low entrance)
Hint 3: poacher behaviour (natural smells)
Full hint text in EPISODE1_SCRIPT.md.

---

### TASK 12 — Photo Capture Component ✓ DONE

File: src/components/PhotoCapture.tsx

Props: onPhotoSubmit: (photoUrl: string) => void

Display: "Build this with a grown-up!" prominent note at top.

Three checklist items. Each has a checkbox the child taps to mark done:
1. Entrance is small and hard to reach
2. Structure cannot be easily lifted
3. Colours blend into the surroundings

Photo capture button:
- Styled as a large, friendly full-width button
- Actually renders a hidden file input:
  <input type="file" accept="image/*" capture="environment" />
- On file select: use URL.createObjectURL to preview the photo
- Show preview in a rounded rectangle

"Send to Tonde + Nothando" button:
- Disabled until photo has been taken
- On tap: calls onPhotoSubmit(photoUrl), then parent sets screen to 'delivery'

---

### TASK 13 — Delivery Scene Component ✓ DONE

File: src/components/DeliveryScene.tsx

Props: photoUrl: string, onComplete: () => void

Stage 1 — notification card:
- Warm amber card: background #FAEEDA, text #412402
- Text: "Muntu, you have a message..."
- Smaller text: "tap to open"
- Tapping the card advances to stage 2

Stage 2 — closing scene:

Section 1 (Tonde, Gonarezhou):
- Illustrated background placeholder (dark green #1A3A2A)
- Lulu avatar illustration on one side
- Polaroid frame component on the other side:
  The Polaroid is a white div with padding 8px 8px 24px 8px
  Inside: child's photo as CSS background-image (cover, centered)
  Width 140px, height 110px — small, like a real Polaroid
  Transform: rotate(-3deg) for realism
- Caption below Polaroid: "Tonde's new home — built by you."
- Narration text from EPISODE1_SCRIPT.md
- Brief pause (1.5 seconds) then auto-advance to Section 2

Section 2 (Nothando, Hwange):
- Same layout, different background (#1A2E3A — slightly different green-blue)
- Caption: "Nothando and her young one — safe inside."
- Narration text from EPISODE1_SCRIPT.md

Quiet moment panel:
- Darker background #0A1A0A
- Simple text: "Sbu and Siya watched. No words needed."
- After 3 seconds: "Head home" button appears
- Tapping calls onComplete

---

### TASK 14 — Return Flight and Landing ✓ DONE

Files: src/data/returnFlight.ts and (reuse StoryPanel component)

4 return flight panels from EPISODE1_SCRIPT.md.
Final panel is Sbu's line:
"The Ubuntu Express has been waiting for you your whole life, maDlamini."

After the 4 panels: 2 landing home panels from EPISODE1_SCRIPT.md.
The porch scene. The close ("beauty sleep").

---

### TASK 15 — Fact Card Component ✓ DONE

File: src/components/FactCard.tsx

5 pangolin facts (from EPISODE1_SCRIPT.md).
Display as stacked cards with a small illustrated icon per fact.
Below facts: episode summary stats (4 languages, 4 stops, 1 habitat).
Zimbabwe journal stamp animation: the outline of Zimbabwe appears,
then a stamp sound, then a coloured fill settles. CSS keyframe animation.
"Add to my journal" button at bottom (calls onComplete to return to map).

---

### TASK 16 — App.tsx Routing and State ✓ DONE

No Redux. No Context API. Props passed directly. Keep simple.

State in App.tsx:
```typescript
const [screen, setScreen] = useState<Screen>('landing')
const [completedStops, setCompletedStops] = useState<string[]>([])
const [collectedIdeas, setCollectedIdeas] = useState<string[]>([])
const [photoUrl, setPhotoUrl] = useState<string | null>(null)
const [currentStop, setCurrentStop] = useState<LanguageStop | null>(null)
```

Render the correct component based on screen value.
Pass onComplete callbacks that set the next screen.

Navigation flow:
landing → [tap Zimbabwe] → transition-animation → cold-open
→ boarding → flight → zimbabwe-map → language-stop (×4 times)
→ stem-challenge → maker-activity → delivery
→ return-flight → fact-card → back to landing

---

### TASK 17 — Mobile Audit and Deploy ✓ DONE (code side)

After all components are built:
1. Test every screen at 375px viewport width (iPhone SE)
2. Test at 390px (iPhone 14) and 360px (Galaxy S)
3. Confirm all tap targets: minimum 44px height
4. Confirm all text: minimum 18px story text, 16px secondary
5. No horizontal overflow anywhere
6. No nested scrolling
7. Run: npm run build — fix all TypeScript errors
8. Push to GitHub — Vercel auto-deploys
9. Open the live URL on your phone and test the full flow

---

## Audio Architecture

### Overview

Howler.js is the audio library. It is already in the tech stack.

Every StoryPanelData has an optional audioUrl field. When present,
Howler plays the MP3 when the panel appears. When absent or empty
string, the panel works completely silently — no errors, no warnings.

Audio is a progressive enhancement. The app must work without it.

### File structure

```
public/
  audio/
    episode-1/
      transition.mp3              ← mbira music for transition animation
      cold-open-01.mp3            ← "It was late at night in Calgary..."
      cold-open-02.mp3
      ...
      cold-open-13.mp3
      boarding-01.mp3
      boarding-02.mp3
      boarding-03.mp3
      boarding-04.mp3
      flight-01.mp3
      ...
      flight-13.mp3
      map-intro.mp3
      vicfalls-coach-hello.mp3
      vicfalls-coach-thanks.mp3
      vicfalls-unlock.mp3
      vicfalls-sitwala.mp3
      vicfalls-wisdom.mp3
      vicfalls-thanks.mp3
      vicfalls-complete.mp3
      khami-coach.mp3
      khami-thandiwe.mp3
      khami-wisdom.mp3
      khami-complete.mp3
      matobo-coach.mp3
      matobo-nokukhanya.mp3
      matobo-totem.mp3
      matobo-wisdom.mp3
      matobo-complete.mp3
      greatzim-coach.mp3
      greatzim-moment.mp3
      greatzim-chiedza.mp3
      greatzim-wisdom.mp3
      greatzim-complete.mp3
      stem-tonde-intro.mp3
      stem-task.mp3
      stem-hint-1.mp3
      stem-hint-2.mp3
      stem-hint-3.mp3
      maker-intro.mp3
      notification.mp3
      delivery-tonde.mp3
      delivery-nothando.mp3
      delivery-quiet.mp3
      return-01.mp3
      return-02.mp3
      return-03.mp3
      return-04.mp3
      landing-01.mp3
      landing-02.mp3
      fact-01.mp3 through fact-05.mp3
      episode-close.mp3
```

### Voice source

The developer will record himself reading the narration text from
EPISODE1_SCRIPT.md and clone his voice via ElevenLabs. ElevenLabs
generates the MP3 files using the cloned voice. Files are then dropped
into public/audio/episode-1/ and the panels pick them up automatically.

### When to add audio

After the first user test. The test validates story and mechanics.
Record audio once the story text is confirmed — not before.

### Howler.js pattern in StoryPanel

```typescript
import { Howl } from 'howler'
import { useEffect, useRef } from 'react'

useEffect(() => {
  const panel = panels[currentIndex]
  if (!panel.audioUrl) return
  const sound = new Howl({ src: [panel.audioUrl] })
  sound.play()
  return () => {
    sound.stop()
    sound.unload()
  }
}, [currentIndex])
```

---

## Parent Reading Button

The StoryPanel component has a small parent reading button on every panel.
A small book icon in the bottom-right corner. When tapped, a slide-up
overlay shows the panel's narration text in large readable type (20px).
A × button dismisses it. This does not advance the panel.

Why it exists: before voice audio is recorded, a parent reading aloud
alongside the child needs to see the full narration text, not just the
short screen text. Once audio is recorded, parents still use this if
they want to read the richer version rather than just listen.

This is also described in a Notion page titled "Episode 1 — Parent Reading
Guide" which the developer's wife will use in the first test session.

---

## Colour Reference

| Name | Hex | Used for |
|---|---|---|
| Night Navy | #0A0E1A | Flight and transition backgrounds |
| Terracotta | #C1692F | Warm story backgrounds |
| Savanna Ochre | #D4A017 | Bulawayo scene, highlights |
| Cape Teal | #1A6B73 | Teal accents |
| Heartbeat Gold | #F0C040 | Stars, progress indicators |
| Vic Falls Coral | #D85A30 | Victoria Falls pin |
| Khami Amber | #BA7517 | Khami Ruins pin |
| Matobo Purple | #534AB7 | Matobo Hills pin |
| Great Zim Teal | #1D9E75 | Great Zimbabwe pin |
| Complete Green | #3B6D11 | Completed stop state |
| Delivery Amber | #FAEEDA | Notification card background |
| Notification Text | #412402 | Notification card text |

---

## File Structure Target

```
src/
  App.tsx                       ← routing and global state
  components/
    TransitionAnimation.tsx     ← 10-15 sec visual, Zimbabwe tap → episode
    StoryPanel.tsx              ← reusable tap-to-advance panel viewer
    BoardingScreen.tsx          ← fabric interactive + boarding panels
    FlightAnimation.tsx         ← 13 narrative panels with Bulawayo descent
    ZimbabweMap.tsx             ← episode map with 4 language stop pins
    LanguageStop.tsx            ← 5-phase language interaction flow
    StemChallenge.tsx           ← idea selector + constraint logic
    PhotoCapture.tsx            ← build checklist + camera
    DeliveryScene.tsx           ← Polaroid frame closing scene
    FactCard.tsx                ← pangolin facts + journal stamp
  data/
    coldOpen.ts                 ← 13 panel objects (text from script)
    boarding.ts                 ← 4 panel objects + fabric data
    returnFlight.ts             ← 4 return panels + 2 landing panels
    languageStops.ts            ← 4 LanguageStop objects
  types/
    index.ts                    ← all TypeScript interfaces
public/
  audio/
    episode-1/                  ← MP3 files (added after voice recording)
PROGRESS.md                     ← this file
EPISODE1_SCRIPT.md              ← full story text, panel by panel
LEARNING.md                     ← generated as you build (mandatory)
```

---

## What NOT to Build in This Session

- User accounts or saved progress (local React state only for now)
- Supabase backend
- Native app / React Native wrapper
- Multiple episodes beyond Zimbabwe Episode 1
- The vehicle builder mechanic
- The Explorer's Journal database
- Real illustrations (use solid colour placeholders throughout)
- The full companion character system from future episodes
- Any content beyond this episode

---

## LEARNING DOCUMENTATION — Mandatory

After building each component, add a section to LEARNING.md.
This file is for the developer to explain every component to a professor
during his Master's programme application.

For each component add:

### 1. What this component does (plain English, 3-5 sentences)
No jargon. Explain as if to someone who has never written code.

### 2. Pseudocode for the main logic
Write core logic in plain English steps before showing code. Example:

```
FUNCTION handlePanelTap:
  IF current index is less than total panels minus 1
    THEN increment index by 1
    THEN if new panel has audioUrl, play it with Howler
  ELSE
    THEN call the onComplete callback
  END IF
END FUNCTION
```

### 3. React concepts used in this component
Name each concept. Explain what problem it solves here specifically.
Cover useState, useEffect, props, TypeScript interfaces, conditional
rendering, event handlers, CSS transitions — as relevant.

### 4. What makes this component interesting or non-trivial
One paragraph. What would a professor find noteworthy? What tradeoffs
were made? What patterns were used? What would you do differently?

### 5. How it connects to the rest of the app
Which components use it? What state does it read? What does it modify?
What callbacks does it call?

---

## Done Means Done

A task is done when:
1. Component renders without TypeScript errors (npm run build passes)
2. Works at 375px viewport width
3. All tap targets are 44px minimum height
4. All story text is 18px minimum
5. No console errors or warnings in the browser
6. LEARNING.md has been updated with this component's documentation
