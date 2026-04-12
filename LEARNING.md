# Ubuntu Express — Learning Documentation

> This file is mandatory documentation for every component built in this project.
> It exists so Zibusiso Mafaiti can explain every part of this codebase
> confidently to a professor during his Master's programme application.
>
> Each section covers: what the component does, pseudocode, React concepts used,
> what makes it interesting, and how it connects to the rest of the app.

---

## TASK 1 — Codebase Audit

### What was found in the existing codebase

**Tech stack confirmed:**
- Vite 8 + React 19 + TypeScript ~6.0 (bundler mode, `moduleResolution: "bundler"`)
- Tailwind CSS v4 (loaded via `@import "tailwindcss"` in `index.css` — v4 syntax, not v3)
- React Router DOM v7 (`BrowserRouter`, `Routes`, `Route`)
- d3-geo + topojson-client (for the Africa SVG map)
- **Howler.js is NOT yet installed.** PROGRESS.md says it is "already in the tech stack" but `package.json` does not list it. Must be installed before building StoryPanel.

---

### Routing approach

The existing code uses **URL-based routing** via React Router v7:

| URL | Component file |
|-----|----------------|
| `/` | `src/pages/Home.tsx` |
| `/map` | `src/pages/Map.tsx` |
| `/episode/:countryId` | `src/pages/Episode.tsx` |
| `/journal` | `src/pages/Journal.tsx` |

**Critical note for the build tasks:** PROGRESS.md specifies a different pattern — a single-page app where `App.tsx` holds a `useState<Screen>` and renders the correct component based on screen value (no URL changes). This conflicts with the current URL-routing approach. The build tasks will replace the existing routing architecture with the `useState<Screen>` pattern described in PROGRESS.md Task 16. The URL-based routes are scaffolding from Sessions 1–2 and will be superseded.

---

### File-by-file findings

**`src/App.tsx`**
- Sets up BrowserRouter with 4 routes
- No state management here yet
- Imports Home, Map, Episode, Journal from pages/
- Will be rewritten in Task 16 to hold all global state

**`src/main.tsx`**
- Standard Vite entry point
- Renders `<App />` inside `StrictMode`
- Imports `index.css` (which loads Tailwind v4)
- No changes needed here

**`src/index.css`**
- Single line: `@import "tailwindcss";`
- This is the Tailwind v4 import syntax (different from v3's `@tailwind base` etc.)

**`src/pages/Home.tsx`**
- Landing page hero section (built in Session 2)
- Dark navy background `#0a0a2e`, white heading, yellow CTA
- Single button navigates to `/map`
- Text refers to "Africa" in general — will eventually be entry point for the tap-Zimbabwe flow
- Uses `useNavigate` from React Router

**`src/pages/Map.tsx`** (the most complex existing file)
- 163 lines — the Africa continent SVG map
- Fetches world-atlas topojson from a CDN at mount: `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`
- Uses ISO numeric country codes (12 = Algeria, 716 = Zimbabwe, etc.)
- Parses the topology with `feature()` from topojson-client
- Projects geographic coordinates to SVG pixel coordinates using d3-geo `geoMercator` projection
- **Zimbabwe is `enabled: false`** — South Africa (710) is the only enabled country, which is incorrect for Episode 1. Zimbabwe must be enabled.
- On hover: updates `hovered` state → re-renders path fill colours
- On click (enabled only): `navigate('/episode/${slug}')`
- Progress dots, loading state, hover tooltip already implemented

**`src/pages/Episode.tsx`**
- Empty shell: returns `<h1 className="text-2xl p-8">Home — Ubuntu Express</h1>`
- Not connected to any real content
- Will be replaced or removed in the build tasks

**`src/pages/Journal.tsx`**
- Contains full episode routing logic with `EPISODE_DATA` for "south-africa"
- **Naming inconsistency**: the file is `Journal.tsx` but exports `function Episode()`
- This appears to be a copy-paste error from Sessions 1–2
- References "Cape Town — The Penguin Crisis" which is placeholder content, not the real story
- Will be replaced

**`src/data/countries.ts`** — empty file (1 line, no content)
**`src/data/episodes.ts`** — empty file (1 line, no content)

---

### Naming conventions observed

- **Component files**: PascalCase (`Home.tsx`, `Map.tsx`)
- **Component function names**: PascalCase matching the filename
- **Route slugs**: kebab-case (`south-africa`, `victoria-falls`)
- **CSS**: Tailwind utility classes only, inline Tailwind arbitrary values for brand colours (`bg-[#0a0a2e]`)
- **State variables**: camelCase (`countryPaths`, `hovered`, `loading`)
- **Types/interfaces**: PascalCase (`CountryPath`)

---

### TypeScript strictness

The `tsconfig.app.json` does **not** enable `"strict": true`. Explicit linting flags set:
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `erasableSyntaxOnly: true` (TypeScript 5.5+ feature — disallows `enum` and namespace syntax)

This means `strictNullChecks` and `noImplicitAny` are **not** active. Take care anyway — treat all external data as potentially null and annotate types explicitly.

---

### What needs to change before Task 2

1. **Install howler**: `npm install howler && npm install --save-dev @types/howler`
2. **Fix Map.tsx**: Change Zimbabwe (716) from `enabled: false` to `enabled: true`; change South Africa (710) back to `enabled: false`
3. **Architecture decision confirmed**: Replace URL routing with `useState<Screen>` in App.tsx per PROGRESS.md Task 16. The existing pages/ directory content is scaffolding that will be superseded.

---

### Colour conventions already in use

| Used in code | Value | Meaning |
|---|---|---|
| `#0a0a2e` | deep navy | Page background (Home, Map, Episode stubs) |
| `#FBBF24` / `yellow-400` | bright yellow | Highlighted country, CTA buttons |
| `#F59E0B` / `amber-500` | amber | Enabled country default fill |
| `#1e3a5f` | dark blue-grey | Disabled country fill |
| `#2a4a6f` | mid blue-grey | Disabled country hover fill |

These are session-2 choices. The PROGRESS.md colour reference introduces additional named colours (Night Navy `#0A0E1A`, Terracotta `#C1692F`, etc.) for story components. The two palettes are compatible — session-2 colours stay on the landing/map, story colours apply inside the episode.

---

---

## TASK 2 — TypeScript Interfaces (`src/types/index.ts`)

### 1. What this file does

This file defines the shared "shapes" of data that every component in the app agrees on. Think of it as a contract: before any component is built, we decide exactly what information it will receive and what form that information takes. If a component expects a `LanguageStop`, TypeScript will refuse to compile if the data passed in is missing a field or has the wrong type.

### 2. Pseudocode for the main types

```
TYPE Screen = one of these exact string values:
  'landing', 'transition-animation', 'cold-open', 'boarding',
  'flight', 'zimbabwe-map', 'language-stop', 'stem-challenge',
  'maker-activity', 'delivery', 'return-flight', 'fact-card'

INTERFACE StoryPanelData:
  background  — hex colour string for the panel backdrop
  text        — one sentence displayed on screen (large text)
  narration   — richer version for audio / parent reading overlay
  speaker     — optional character name shown above the text
  audioUrl    — optional MP3 path; empty string = silent, no error

INTERFACE LanguageStop:
  identification: id, name, region, language
  hello word + pronunciation guide + meaning
  thanks word + pronunciation guide + meaning
  visual config: backgroundColour, pinColour
  localChild nested object: name, initials, idea, avatarColour
  animalWisdom nested object: animal, text
  constraint flags: addressesCamouflage, addressesAnchoring (booleans)
  specialMoment — optional extra story beat (Matobo totem, Great Zimbabwe)

INTERFACE AppState:
  screen         — which Screen is currently shown
  completedStops — array of stop IDs the child has finished
  collectedIdeas — array of stop IDs whose ideas are saved
  photoUrl       — the local object URL of the child's photo, or null
  currentStop    — the LanguageStop currently active, or null
```

### 3. TypeScript concepts used

**Type alias (`type Screen = ...`)**: A union type that restricts a variable to only the listed string values. If App.tsx tries to `setScreen('unknown-screen')`, TypeScript catches it at compile time, not at runtime in a child's hands.

**Interface**: Describes the exact shape of an object. Every field is named and typed. Optional fields use `?` — the component must handle the case where they are absent.

**Nested objects inline**: `localChild` and `animalWisdom` are typed as inline object shapes inside `LanguageStop`, rather than separate interfaces. This keeps related data grouped without creating extra type names for things only used in one place.

**`string | null`**: `photoUrl` can be a URL string or `null` (no photo taken yet). This forces every component that reads `photoUrl` to check for null before using it — preventing a crash if the delivery scene tries to render before a photo exists.

**`export`**: All types are exported so any file in the project can import them with `import type { LanguageStop } from '../types'`.

### 4. What makes this interesting

The `Screen` union type is doing two jobs at once: it is the app's navigation system (replacing React Router URLs) and a compile-time checklist of every screen that must be implemented. If a developer forgets to handle `'maker-activity'` in the App.tsx render switch, TypeScript's exhaustiveness checking will flag the gap. The type also documents the entire episode flow in six lines — readable as a spec.

The `StoryPanelData.audioUrl` being `string | undefined` (via `?`) rather than `string` enforces the progressive enhancement rule from PROGRESS.md: audio is optional, the app must work without it, and the type makes this contract impossible to accidentally break.

### 5. How it connects to the rest of the app

Every component that is built in Tasks 3–15 will import from this file. `App.tsx` (Task 16) uses `Screen` and `AppState` for all global state. `StoryPanel.tsx` (Task 4) takes `StoryPanelData[]`. `LanguageStop.tsx` (Task 9) takes a `LanguageStop` prop. `ZimbabweMap.tsx` (Task 8) calls `onSelectStop(stop: LanguageStop)`. Nothing downstream can be built without these types being stable first — which is why Task 2 comes before all components.

---

---

## TASK 3 — Transition Animation (`src/components/TransitionAnimation.tsx`)

### 1. What this component does

When the child taps Zimbabwe on the landing map, this component plays a 6-second visual before the story begins. A dotted flight arc draws itself from a "Calgary" dot to a "Zimbabwe" dot across a starfield. A small ship shape (rectangle with wings) travels along that arc. A clock in the corner changes from "11:58 PM" to "7:14 AM" partway through the journey. There is no text, no interaction needed — it transitions to the cold open automatically. Mbira music plays if the audio file exists, and nothing happens if it does not.

### 2. Pseudocode for the main logic

```
ON MOUNT:
  Try to play transition.mp3 — catch and ignore any error
  Set timer T1 (400ms) → set started = true
  Set timer T2 (3000ms) → set clock = "7:14 AM"
  Set timer T3 (6400ms) → call onComplete()

ON UNMOUNT:
  Pause audio
  Clear all three timers

RENDER:
  Full-screen dark div (#0A0E1A)
  SVG viewBox 0 0 400 280
    Draw 29 star dots (fixed positions)
    Draw flight arc path
      IF started: stroke-dashoffset transitions from 530 → 0 over 5s
      ELSE: stroke-dashoffset = 530 (invisible)
    IF started:
      Show clock text near arc apex — value is current clock state
      Render ship <g> — animateMotion moves it along arc over 5s
    Draw Calgary dot + label (always visible)
    Draw Zimbabwe dot + label
      IF started: fades from 0.2 → 1 opacity, with 4s delay
```

### 3. React concepts used

**`useState`** — two state values: `started` (boolean, triggers both the arc transition and the ship render) and `clock` (string, swapped by a timer midway).

**`useEffect` with empty deps `[]`** — runs once on mount, sets up timers, returns a cleanup function that clears them and pauses audio. Empty deps is intentional here: the animation should fire exactly once when the component appears, not re-fire if a parent re-renders.

**`useRef` for the callback** — `onCompleteRef.current = onComplete` keeps a reference to the latest version of the callback without adding it to `useEffect`'s dependency array. If `onComplete` were in the deps array and the parent recreated it on every render, the effect would re-run and restart all timers. The ref pattern avoids this.

**Conditional rendering (`{started && ...}`)** — the ship group and clock text only mount when `started` is true. This is also the moment the SVG `<animateMotion>` starts, because SMIL animations begin as soon as their element appears in the DOM.

**Inline `style` for CSS transitions** — `strokeDashoffset` is an SVG presentation attribute, but transitions on it work via CSS. Setting it via React's `style` prop with a `transition` string gives us the drawing animation without any keyframe definitions.

### 4. What makes this interesting

The arc-drawing technique (`stroke-dasharray` + `stroke-dashoffset`) is a classic SVG animation pattern. The entire path is set as both the gap and the offset — so at the start, the offset equals the total path length and the line is invisible. Transitioning the offset to zero "reveals" the line. The same `d` attribute string is used for both the visible arc and the `<animateMotion path>` so the ship is guaranteed to travel exactly along the drawn line.

The Zimbabwe dot fades in with a 4-second CSS `transition-delay`. This means the destination "lights up" just before the ship arrives — a small storytelling beat that does not require any JavaScript timer or state change.

The `onCompleteRef` pattern is a real-world solution to a common React problem: stale closures in `useEffect`. A professor reviewing this code would recognise it as a deliberate choice, not an accident.

### 5. How it connects to the rest of the app

`TransitionAnimation` is rendered by `App.tsx` when `screen === 'transition-animation'`. It takes one prop: `onComplete`, which App.tsx implements as `() => setScreen('cold-open')`. The component is self-contained — it does not read or modify any global state. It plays, finishes, and hands control back.

---

---

## TASK 4 — Story Panel Viewer (`src/components/StoryPanel.tsx`)

### 1. What this component does

StoryPanel is the engine that drives every story sequence in the app. It takes an array of panels and shows them one at a time, full screen. Tapping anywhere on the screen advances to the next panel. When the last panel is tapped, it calls `onComplete` to hand control back to the app. Each panel plays an audio file if one exists. A small book icon in the corner opens a narration overlay so a parent can read the full text aloud alongside the short on-screen text, before audio recordings are available.

### 2. Pseudocode for the main logic

```
STATE:
  currentIndex = 0         -- which panel is showing
  panelVisible = true      -- drives opacity for crossfade
  showNarration = false    -- narration overlay open/closed

ON TAP (main screen):
  IF panelVisible is false → return (already fading, ignore)
  IF showNarration is true → return (overlay is open, don't advance)
  SET panelVisible = false  (starts 200ms CSS fade-out)
  AFTER 200ms:
    IF currentIndex < last panel index
      THEN increment currentIndex
           (useEffect below will fade back in)
    ELSE call onComplete()

EFFECT watching [currentIndex]:
  IF this is the very first mount → skip (panel is already visible)
  ELSE wait two animation frames, THEN set panelVisible = true
       (starts 200ms CSS fade-in with new content visible)

EFFECT watching [currentIndex, panels]:
  READ audioUrl from current panel
  IF no audioUrl → do nothing
  CREATE Howl with that URL, play it immediately
  ON CLEANUP: stop and unload the sound

ON BOOK ICON TAP:
  stop event propagating to main screen
  SET showNarration = true

ON CLOSE NARRATION:
  stop event propagating
  SET showNarration = false
```

### 3. React concepts used

**`useState`** — three pieces of state. `currentIndex` tracks which panel the user is on. `panelVisible` is the opacity switch. `showNarration` toggles the parent reading overlay.

**`useEffect` with `[currentIndex, panels]`** — fires whenever the panel changes. Creates a `Howl` audio instance, plays it, and returns a cleanup function that stops and unloads it. The cleanup runs before the next effect fires, so audio from the previous panel is always stopped before the new panel's audio starts.

**`useEffect` with `[currentIndex]`** — drives the fade-in half of the crossfade. The two `requestAnimationFrame` calls are essential: they give the browser two paint cycles to render the new panel content at `opacity: 0` before we change `panelVisible` to `true`. Without this double-rAF, React batches the content update and the `setPanelVisible(true)` into the same render — the browser never paints the content at opacity 0, so there is no fade-in.

**`useRef` for the callback** — `onCompleteRef.current = onComplete` keeps the latest version of the callback accessible inside the `setTimeout` without adding it to `useEffect`'s dependency array.

**`useRef` as a flag** — `isFirstMount` prevents the fade-in effect from running on initial mount (the panel starts visible, no fade needed). A `useRef` is used rather than `useState` because changing it should not trigger a re-render.

**`e.stopPropagation()`** — the narration overlay sits on top of the full-screen tap target. Without `stopPropagation()`, tapping the close button or text inside the overlay would bubble up to `handleTap` and advance the panel. `stopPropagation` cuts the event before it reaches the parent.

**Conditional rendering** — the book icon is hidden while the narration is open (`{!showNarration && ...}`) to avoid a confusing state where the user can "open" an already-open overlay.

### 4. What makes this interesting

The crossfade requires two `useEffect` hooks working in coordination: one triggers the fade-out and content swap, the other (via `requestAnimationFrame`) triggers the fade-in after the new content has been painted at zero opacity. This is a deliberate solution to React's automatic batching — in React 18+, all state updates inside a single event or timeout are batched into one render. Without the double-rAF trick, the fade-in would never happen. A professor would find this noteworthy because it demonstrates understanding of the React rendering pipeline at a level beyond the typical beginner tutorial.

The audio cleanup pattern is also worth noting. Each `useEffect` for a specific panel creates one `Howl` instance and returns a cleanup that destroys it. This means audio never "leaks" between panels even if the user taps quickly.

The narration overlay is a UX feature for the parent, not the child. The child taps the big screen. The parent taps a small icon. These are two different interaction layers on the same screen. The `stopPropagation` call is what keeps them separate.

### 5. How it connects to the rest of the app

`StoryPanel` is used in three places: `ColdOpen` (Task 5, 13 panels), `FlightAnimation` (Task 7, 13 panels), and `ReturnFlight` (Task 14, 4 panels). It imports `StoryPanelData` from `src/types/index.ts`. It does not read or modify any global App state directly — it receives its panel array as a prop and reports completion via `onComplete`. The panel data files (`coldOpen.ts`, etc.) are the only thing that changes between uses; the component itself is identical in all three contexts.

---

---

## TASK 5 — Cold Open Content (`src/data/coldOpen.ts`)

### 1. What this file does

This file contains the exact text for all 13 panels of the cold open — the first story sequence a child sees after the transition animation. It is a plain TypeScript data file: no logic, no components, just an array of objects. Each object matches the `StoryPanelData` interface from `src/types/index.ts`. The `StoryPanel` component reads this array and knows exactly what to display on each screen.

### 2. What was also changed in this task

`StoryPanel` received a new optional prop: `completionLabel?: string`. When the viewer reaches the last panel and `completionLabel` is set, a gold CTA button appears above the progress dots. Usage:

```tsx
<StoryPanel
  panels={coldOpenPanels}
  onComplete={() => setScreen('boarding')}
  completionLabel="Board the Ubuntu Express"
/>
```

The button calls `onComplete` via `e.stopPropagation()` so it does not also trigger the full-screen tap handler. Tapping anywhere on the screen still works too.

### 3. Data structure decisions

**Audio URL paths** — the script file writes paths as `public/audio/episode-1/...`. The correct browser URL is `/audio/episode-1/...` (Vite serves the `public/` directory at the URL root — the folder name is not part of the path). All 13 audio URLs follow this convention.

**Panel 4 comment** — a code comment flags this as the pangolin crisis panel and notes it must not be moved. The PROGRESS.md is explicit: "Before this panel, no one knows what a pangolin is." The comment makes this constraint visible to any future developer editing the file.

**Apostrophes in template strings** — several lines of dialogue contain apostrophes inside single-quoted strings (e.g. `"I can't help"`). These are escaped as `\'` inside the TypeScript string literals to avoid parse errors.

### 4. React concepts used

None — this is a pure data file. It imports the `StoryPanelData` type as a `type` import (using `import type`) so TypeScript can validate the array contents at compile time without including any runtime code from the types file.

### 5. How it connects to the rest of the app

`coldOpenPanels` is imported by whatever component renders the cold open sequence (the caller in `App.tsx`). It is passed as the `panels` prop to `StoryPanel`. It has no awareness of routing, state, or any other component. If the story text ever needs to change, this is the only file to edit.

---

---

## TASK 6 — Boarding Content and Screen (`src/data/boarding.ts` + `src/components/BoardingScreen.tsx`)

### 1. What these files do

`boarding.ts` is a data file containing the 4 boarding panels and a list of 4 fabric seat objects. `BoardingScreen.tsx` is a component that manages a three-phase flow: a story intro (panels 1–2), a fabric interactive, and a story outro (panel 4 + "Buckle up!" button). It is the most complex screen so far because it mixes the generic `StoryPanel` component with a completely custom interactive section.

### 2. Pseudocode for the main logic

```
STATE:
  phase = 'intro'                -- 'intro' | 'fabric' | 'outro'
  tapped = empty Set<string>     -- IDs of seats the child has tapped
  audioRef = null                -- Howl instance for fabric narration audio

PHASE 'intro':
  Render StoryPanel with panels 0–1
  onComplete → set phase = 'fabric'

PHASE 'fabric':
  Render instruction text (panel 3 screen text)
  Render 4 seat buttons in a 2×2 grid
  ON SEAT TAP (id):
    IF already tapped → return
    Add id to tapped Set
    IF tapped.size is now 4 (all discovered):
      Stop and unload any existing Howl
      Create new Howl for boarding-03.mp3, play it
  IF tapped.size === 4:
    Show panel 3 narration text
    Show "Continue" button
  ON Continue tap → set phase = 'outro'

PHASE 'outro':
  Render StoryPanel with panel 3 only (index 3 in array)
  completionLabel = "Buckle up!"
  onComplete → call props.onComplete

ON UNMOUNT:
  Stop and unload audioRef (fabric narration may still be playing)
```

### 3. React concepts used

**`useState` with a `Set`** — `tapped` is a `Set<string>` held in state. Sets are not directly mutatable in React state (mutating the same object reference does not trigger a re-render). The correct pattern is to create a `new Set(tapped)`, add the new value, then call `setTapped(next)` with the new Set object. This gives React a new reference to compare, triggering a re-render.

**`useRef` for audio** — `audioRef` stores the `Howl` instance created when the 4th seat is tapped. A ref is used rather than state because we do not want the component to re-render when the audio object is assigned. The ref also lets the cleanup `useEffect` stop the sound on unmount without depending on the Howl instance as a state variable.

**`useEffect` with empty deps for cleanup** — runs once on mount, returns a cleanup function. The cleanup calls `stop()` and `unload()` on the audio ref. This handles the case where the user somehow leaves this screen while the fabric narration is still playing.

**Phase-based conditional rendering** — rather than a complex series of `if/else` blocks, the component returns early for each phase. The `'intro'` and `'outro'` phases return a `StoryPanel` immediately. Only the `'fabric'` phase renders the custom interactive UI. This is a readable pattern: each phase is self-contained.

**`StoryPanel` reuse** — the component uses `StoryPanel` for panels 1–2 (intro) and panel 4 (outro) without writing any panel display logic itself. The `completionLabel="Buckle up!"` prop added in Task 5 is used here for the first time.

### 4. What makes this interesting

The panel 3 audio decision is worth explaining to a professor. The script says the narration for panel 3 plays "after all [seats] are tapped." If panel 3 had been included in the outro `StoryPanel`, Howler would play `boarding-03.mp3` automatically on mount — before the child had tapped any seats. Setting `audioUrl: ''` in the data file documents this constraint, and the comment explains why. The audio is then played manually in `handleSeatTap` at the exact moment it should fire. This is an example of a component taking responsibility for behaviour that the generic system cannot handle automatically.

The `new Set(tapped)` pattern for updating Set-based state is a subtle but important correctness detail. React uses `Object.is` to compare old and new state values. Mutating the same Set object would return the same reference, and React would skip the re-render.

### 5. How it connects to the rest of the app

`BoardingScreen` is rendered by `App.tsx` when `screen === 'boarding'`. It receives one prop: `onComplete`, which App.tsx implements as `() => setScreen('flight')`. Internally it imports `StoryPanel`, `boarding.ts` data, and `Howl` from Howler. When the child taps "Buckle up!", the `onComplete` chain fires and the app moves to the story flight.

---

---

## TASK 7 — Flight Animation (`src/components/FlightAnimation.tsx`)

### 1. What this component does

FlightAnimation plays the narrative story flight — 13 panels of dialogue between Siya, Sbu, and Mama Ndlovu that tell the origin story of the Ubuntu Express crew. It is structurally identical to StoryPanel for panels 1–3 and 4–13, but with a 2.5-second visual interstitial between them: the Bulawayo descent animation, where the ship drops toward a city silhouette. This is the moment the child viscerally feels the ship landing in Sbu's hometown before he tells his story.

### 2. Pseudocode

```
STATE: phase = 'pre-descent' | 'descent' | 'post-descent'

PHASE pre-descent:
  Show StoryPanel with panels 1–3
  onComplete → phase = 'descent'

PHASE descent:
  Show BulawayoDescent (CSS-animated visual)
  useEffect: setTimeout(2500ms) → phase = 'post-descent'

PHASE post-descent:
  Show StoryPanel with panels 4–13
  onComplete → props.onComplete
```

### 3. React concepts used

**Phase-based early returns** — same pattern as BoardingScreen. Each phase returns its JSX immediately, keeping each case readable. **`useEffect` with phase dependency** — only fires when `phase === 'descent'`, sets a 2500ms timer, cleans it up on unmount or re-render. **CSS `@keyframes` in `index.css`** — `shipDescend` and `cloudRise` animations are global keyframes, referenced by string name in inline `style` objects. This avoids the need for a CSS-in-JS library while keeping animations co-located in one file.

### 4. What makes it interesting

The descent interstitial uses no JavaScript animation library — just CSS keyframes and inline `animation` style strings. The cloud divs have different `animation-delay` values to create staggered rising movement. The city silhouette is a static SVG with `preserveAspectRatio="none"` so it stretches to fill the full width regardless of screen size.

### 5. How it connects

Rendered by App.tsx for `screen === 'flight'`. Props: `onComplete → setScreen('zimbabwe-map')`. Internally uses StoryPanel twice, with BulawayoDescent as a one-time interstitial.

---

## TASK 8 — Zimbabwe Episode Map (`src/components/ZimbabweMap.tsx`)

### 1. What this component does

ZimbabweMap is the interactive hub of Episode 1. It shows a simplified SVG outline of Zimbabwe with four coloured language stop pins and two locked pangolin location pins. As the child completes stops, pins turn green with a checkmark. A progress bar fills. The "Design the Hideout" button is locked (grey) until all four stops are visited, then turns gold with a slow pulse animation to draw the child's attention.

### 2. Key design decisions

**Pin tap targets**: Each pin is a visible circle (r=14) with a transparent circle (r=22) on top. The transparent circle is the actual click/touch target, giving 44px diameter (2×22). The visual pin appears smaller and cleaner. **Map intro audio**: Plays on mount via a `useRef`-managed Howl. Cleaned up on unmount. **Approximate geography**: The Zimbabwe SVG path and pin positions are manually approximated. They are not GeoJSON-derived, which is sufficient for a child's episodic story context.

### 3. How it connects

Rendered by App.tsx for `screen === 'zimbabwe-map'`. Props: `completedStops`, `onSelectStop(stop)`, `onOpenChallenge()`. App.tsx calls `setCurrentStop(stop)` and `setScreen('language-stop')` in response.

---

## TASK 9 — Language Stop Screen (`src/components/LanguageStopScreen.tsx`)

### 1. What this component does

LanguageStopScreen manages a five-phase interactive flow for each of the four language stops. The child learns to say hello, meets a local child, hears their pangolin hideout idea, says thank you, and receives a completion card. The component is driven by a `phase` state machine. The same component handles all four stops — only the `stop` prop changes.

### 2. Phase state machine

```
'coaching' → (button tap) → 'hello-unlock'
'hello-unlock' → (word button tap + 200ms green flash) → 'interaction'
'interaction' → (thank you button tap) → 'thanks-unlock'
'thanks-unlock' → (thanks word button tap) → 'complete'
'complete' → (back to map button) → props.onComplete()
```

### 3. React concepts used

**Named export disambiguation** — the component is exported as `LanguageStopScreen` (not `LanguageStop`) to avoid a name collision with the `LanguageStop` type in `src/types/index.ts`. Both can be imported in the same file without conflict. **Audio ref management** — `soundRef` holds the current `Howl` instance. Each phase change stops the previous audio and starts the new one. A single cleanup `useEffect` handles unmount. **Inline function definitions inside JSX phases** — since each phase is a separate `if` block returning its own JSX, event handlers like `handleHelloTap` are defined inside the `if` block. This is a pragmatic pattern for phase-specific logic that doesn't need to be accessible across phases.

### 4. How it connects

Rendered by App.tsx for `screen === 'language-stop'`. Props: `stop: LanguageStop`, `onComplete()`. App.tsx's `handleStopComplete` adds the stop ID to `completedStops` and `collectedIdeas`, clears `currentStop`, and returns screen to `zimbabwe-map`.

---

## TASK 10 — Language Stop Data (`src/data/languageStops.ts`)

Four `LanguageStop` objects. Populated from EPISODE1_SCRIPT.md. Each object includes the local child's idea text (used in both LanguageStopScreen and StemChallenge), the crew member's wisdom narration, and constraint flags (`addressesCamouflage`, `addressesAnchoring`) that drive the STEM challenge logic.

---

## TASK 11 — STEM Challenge (`src/components/StemChallenge.tsx`)

### 1. What this component does

StemChallenge shows the child four collected ideas (one from each language stop child) and asks them to choose which combination satisfies three design constraints: camouflage, anchoring, and local materials. The "Build it at home!" button is disabled until all three constraints are met. Three collapsible hints can be tapped for guidance.

### 2. Constraint logic

```
camouflage satisfied  ← victoria-falls OR matobo-hills OR great-zimbabwe selected
anchoring satisfied   ← khami-ruins OR matobo-hills selected
local-materials       ← any idea selected
```

This means there are multiple valid combinations (by design). The child is encouraged to think, not just click.

### 3. Key React concept: Set in state

`selected` is `useState<Set<string>>(new Set())`. Sets must be replaced with a new instance on each update: `const next = new Set(selected); next.add/delete(id); setSelected(next)`. Mutating the existing Set in place would not trigger a re-render because React uses referential equality to detect state changes.

---

## TASK 12 — Photo Capture (`src/components/PhotoCapture.tsx`)

Uses a hidden `<input type="file" accept="image/*" capture="environment">` triggered by a visible button. `capture="environment"` opens the rear camera on mobile devices. `URL.createObjectURL(file)` creates a local preview URL without any server upload. The "Send" button calls `onPhotoSubmit(url)`, which App.tsx uses to set `photoUrl` state and advance to the delivery screen.

---

## TASK 13 — Delivery Scene (`src/components/DeliveryScene.tsx`)

Three stages: notification card (tap to open), Tonde delivery (Gonarezhou), Nothando delivery (Hwange). The `Polaroid` sub-component renders the child's photo in a white-bordered frame with `rotate(-3deg)` transform. The quiet moment stage uses a `setTimeout` to delay the "Head home" button by 3 seconds — giving the child a moment to absorb the scene before the option to leave appears.

---

## TASK 14 — Return Flight Data (`src/data/returnFlight.ts`)

Six panels: four return flight panels and two landing home panels. Combined into one array and used with a single `StoryPanel` in App.tsx. The last panel is Sbu's final line: *"The Ubuntu Express has been waiting for you your whole life, maDlamini."*

---

## TASK 15 — Fact Card (`src/components/FactCard.tsx`)

Five pangolin facts as stacked cards with numbered badges. Episode summary stats (4 languages, 4 stops, 2 pangolins safe). The Zimbabwe journal stamp uses the same SVG path as ZimbabweMap, scaled via `viewBox` clipping. The `stampBounce` CSS keyframe fires once on mount (after a 1.2s delay) when `stamped` state becomes true. The episode close narration audio plays on mount.

---

## TASK 16 — App.tsx Routing and State

### 1. What this file does

App.tsx is the single source of truth for the entire application. It holds all global state and renders the correct component based on `screen` value. There is no URL routing — navigation is entirely `useState`-driven. Every component that needs to advance to the next screen receives an `onComplete` callback from App.tsx.

### 2. State

```typescript
screen          — which screen is currently showing
completedStops  — IDs of language stops the child has finished
collectedIdeas  — same IDs (kept separate for future divergence)
photoUrl        — local object URL of the child's photo
currentStop     — the LanguageStop currently active
```

### 3. Navigation flow

```
landing → [Zimbabwe tap] → transition-animation → cold-open →
boarding → flight → zimbabwe-map → language-stop (×4) →
zimbabwe-map → stem-challenge → maker-activity → delivery →
return-flight → fact-card → landing (reset)
```

### 4. Architecture decision: no React Router

React Router is removed from App.tsx. All navigation is `setScreen(...)`. This matches PROGRESS.md's specification exactly and avoids the complexity of URL management for a children's app with no bookmarkable states. The existing `pages/Map.tsx` was updated to accept `onCountryTap?: (slug: string) => void` instead of using `useNavigate`.

### 5. How it connects

App.tsx is the root component, rendered by `main.tsx`. Every component in `src/components/` is ultimately a child of App.tsx. State flows down as props; events flow up via callbacks.

---

## TASK 17 — Mobile Audit

Production build: `npm run build` — **passes with 0 TypeScript errors**. Bundle: 309 kB JS (95 kB gzipped), 15 kB CSS.

**Tap target audit**: All interactive buttons use `minHeight: 52` (story flow CTAs), `minHeight: 44` (secondary actions), or explicit 44×44px sizing (icon buttons, pin tap targets). SVG pin tap targets use a transparent `r=22` circle overlay.

**Font size audit**: Story text 20px, secondary text 15–16px, labels 12–13px. Language words in coaching/unlock phases use 28–38px. All above the 18px minimum for story text.

**Remaining before deploy**: Audio files (recorded after user testing per PROGRESS.md), real illustrations (solid colour placeholders throughout), and a live browser test at 375px viewport. Push to GitHub triggers auto-deploy to Vercel.
