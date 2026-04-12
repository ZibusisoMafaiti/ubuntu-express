import { useState } from 'react'
import type { Screen, LanguageStop } from './types'

import Map                  from './pages/Map'
import TransitionAnimation  from './components/TransitionAnimation'
import StoryPanel           from './components/StoryPanel'
import BoardingScreen       from './components/BoardingScreen'
import FlightAnimation      from './components/FlightAnimation'
import ZimbabweMap          from './components/ZimbabweMap'
import LanguageStopScreen   from './components/LanguageStopScreen'
import StemChallenge        from './components/StemChallenge'
import PhotoCapture         from './components/PhotoCapture'
import DeliveryScene        from './components/DeliveryScene'
import FactCard             from './components/FactCard'

import { coldOpenPanels }      from './data/coldOpen'
import { returnFlightPanels }  from './data/returnFlight'

export default function App() {
  const [screen, setScreen]               = useState<Screen>('landing')
  const [completedStops, setCompletedStops] = useState<string[]>([])
  const [collectedIdeas, setCollectedIdeas] = useState<string[]>([])
  const [photoUrl, setPhotoUrl]           = useState<string | null>(null)
  const [currentStop, setCurrentStop]     = useState<LanguageStop | null>(null)

  function handleCountryTap(slug: string) {
    if (slug === 'zimbabwe') setScreen('transition-animation')
  }

  function handleSelectStop(stop: LanguageStop) {
    setCurrentStop(stop)
    setScreen('language-stop')
  }

  function handleStopComplete() {
    if (!currentStop) return
    const id = currentStop.id
    setCompletedStops(prev => prev.includes(id) ? prev : [...prev, id])
    setCollectedIdeas(prev => prev.includes(id) ? prev : [...prev, id])
    setCurrentStop(null)
    setScreen('zimbabwe-map')
  }

  function handlePhotoSubmit(url: string) {
    setPhotoUrl(url)
    setScreen('delivery')
  }

  // ── Screen router ─────────────────────────────────────────────────────────

  if (screen === 'landing') {
    return (
      <Map onCountryTap={handleCountryTap} />
    )
  }

  if (screen === 'transition-animation') {
    return (
      <TransitionAnimation onComplete={() => setScreen('cold-open')} />
    )
  }

  if (screen === 'cold-open') {
    return (
      <StoryPanel
        panels={coldOpenPanels}
        onComplete={() => setScreen('boarding')}
        completionLabel="Board the Ubuntu Express"
      />
    )
  }

  if (screen === 'boarding') {
    return (
      <BoardingScreen onComplete={() => setScreen('flight')} />
    )
  }

  if (screen === 'flight') {
    return (
      <FlightAnimation onComplete={() => setScreen('zimbabwe-map')} />
    )
  }

  if (screen === 'zimbabwe-map') {
    return (
      <ZimbabweMap
        completedStops={completedStops}
        onSelectStop={handleSelectStop}
        onOpenChallenge={() => setScreen('stem-challenge')}
      />
    )
  }

  if (screen === 'language-stop' && currentStop) {
    return (
      <LanguageStopScreen
        stop={currentStop}
        onComplete={handleStopComplete}
      />
    )
  }

  if (screen === 'stem-challenge') {
    return (
      <StemChallenge
        collectedIdeas={collectedIdeas}
        onComplete={() => setScreen('maker-activity')}
      />
    )
  }

  if (screen === 'maker-activity') {
    return (
      <PhotoCapture onPhotoSubmit={handlePhotoSubmit} />
    )
  }

  if (screen === 'delivery' && photoUrl) {
    return (
      <DeliveryScene
        photoUrl={photoUrl}
        onComplete={() => setScreen('return-flight')}
      />
    )
  }

  if (screen === 'return-flight') {
    return (
      <StoryPanel
        panels={returnFlightPanels}
        onComplete={() => setScreen('fact-card')}
      />
    )
  }

  if (screen === 'fact-card') {
    return (
      <FactCard
        onComplete={() => {
          // Reset state and return to the landing map
          setCompletedStops([])
          setCollectedIdeas([])
          setPhotoUrl(null)
          setCurrentStop(null)
          setScreen('landing')
        }}
      />
    )
  }

  // Fallback — should not be reached in normal flow
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: '#0A0E1A' }}
    >
      <p style={{ color: 'white', fontSize: 18 }}>Loading…</p>
    </div>
  )
}
